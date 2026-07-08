'use server';

import crypto from 'node:crypto';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { requireAdmin } from '@/lib/auth';
import { createProduct, deleteProduct, getProductById, updateProduct } from '@/lib/products';
import { deleteUploadedImage, saveUploadedImage, UploadError } from '@/lib/uploads';
import { slugify } from '@/lib/slugify';
import { archiveStripeProduct, syncProductToStripe } from '@/lib/stripe-sync';

function toCents(value: FormDataEntryValue | null): number | undefined {
  if (!value) return undefined;
  const num = Number(value);
  if (!Number.isFinite(num) || num <= 0) return undefined;
  return Math.round(num * 100);
}

function parseCommonFields(formData: FormData) {
  return {
    name: String(formData.get('name') ?? '').trim(),
    slug: slugify(String(formData.get('slug') ?? '').trim()) || undefined,
    description: String(formData.get('description') ?? '').trim(),
    price: toCents(formData.get('price')),
    originalPrice: toCents(formData.get('originalPrice')),
    category: String(formData.get('category') ?? '').trim() || undefined,
    stock: formData.get('stock') ? Number(formData.get('stock')) : undefined,
    isNew: formData.get('isNew') === 'on',
    badgeText: String(formData.get('badgeText') ?? '').trim() || undefined,
    whatsappMessage: String(formData.get('whatsappMessage') ?? '').trim() || undefined,
  };
}

export async function createProductAction(formData: FormData) {
  await requireAdmin();

  const fields = parseCommonFields(formData);

  if (!fields.name || !fields.description || !fields.price) {
    redirect(
      `/admin/products/new?error=${encodeURIComponent('Nombre, descripción y precio son obligatorios.')}`,
    );
  }

  const files = formData
    .getAll('images')
    .filter((entry): entry is File => entry instanceof File && entry.size > 0);

  if (files.length === 0) {
    redirect(`/admin/products/new?error=${encodeURIComponent('Sube al menos una foto.')}`);
  }

  let images: string[];
  try {
    images = await Promise.all(files.map((file) => saveUploadedImage(file)));
  } catch (error) {
    const message = error instanceof UploadError ? error.message : 'No se pudieron subir las imágenes.';
    redirect(`/admin/products/new?error=${encodeURIComponent(message)}`);
  }

  const baseSlug = slugify(fields.name) || 'producto';
  const id = `${baseSlug}-${crypto.randomUUID().slice(0, 6)}`;

  const created = createProduct({ id, ...fields, price: fields.price!, images });
  await syncProductToStripe(created);

  revalidatePath('/');
  revalidatePath('/admin');
  redirect('/admin');
}

export async function updateProductAction(id: string, formData: FormData) {
  await requireAdmin();

  const existing = getProductById(id);
  if (!existing) {
    redirect(`/admin?error=${encodeURIComponent('Ese producto ya no existe.')}`);
  }

  const fields = parseCommonFields(formData);

  if (!fields.name || !fields.description || !fields.price) {
    redirect(
      `/admin/products/${id}/edit?error=${encodeURIComponent('Nombre, descripción y precio son obligatorios.')}`,
    );
  }

  const keepImages = formData.getAll('keepImages').map(String);
  const newFiles = formData
    .getAll('newImages')
    .filter((entry): entry is File => entry instanceof File && entry.size > 0);

  let newImagePaths: string[];
  try {
    newImagePaths = await Promise.all(newFiles.map((file) => saveUploadedImage(file)));
  } catch (error) {
    const message = error instanceof UploadError ? error.message : 'No se pudieron subir las imágenes.';
    redirect(`/admin/products/${id}/edit?error=${encodeURIComponent(message)}`);
  }

  const images = [...keepImages, ...newImagePaths];

  if (images.length === 0) {
    redirect(
      `/admin/products/${id}/edit?error=${encodeURIComponent('El producto debe tener al menos una foto.')}`,
    );
  }

  const updated = updateProduct(id, { ...fields, price: fields.price!, images });
  if (updated) {
    await syncProductToStripe(updated);
  }

  const removedImages = (existing!.images ?? []).filter((img) => !keepImages.includes(img));
  await Promise.all(removedImages.map((img) => deleteUploadedImage(img)));

  revalidatePath('/');
  revalidatePath('/admin');
  redirect('/admin');
}

export async function deleteProductAction(id: string) {
  await requireAdmin();

  const existing = getProductById(id);
  await archiveStripeProduct(id);
  deleteProduct(id);

  if (existing?.images) {
    await Promise.all(existing.images.map((img) => deleteUploadedImage(img)));
  }

  revalidatePath('/');
  revalidatePath('/admin');
}
