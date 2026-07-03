'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { countUsers, createUser, deleteUser, requireAdmin } from '@/lib/auth';

export async function createUserAction(formData: FormData) {
  await requireAdmin();

  const email = String(formData.get('email') ?? '').trim();
  const password = String(formData.get('password') ?? '');

  if (!email || password.length < 8) {
    redirect(
      `/admin/users?error=${encodeURIComponent('Correo válido y contraseña de al menos 8 caracteres.')}`,
    );
  }

  let failed = false;
  try {
    createUser(email, password);
  } catch {
    failed = true;
  }

  if (failed) {
    redirect(`/admin/users?error=${encodeURIComponent('Ese correo ya está registrado.')}`);
  }

  revalidatePath('/admin/users');
  redirect('/admin/users');
}

export async function deleteUserAction(id: string) {
  const currentUser = await requireAdmin();

  if (currentUser.id === id) {
    redirect(`/admin/users?error=${encodeURIComponent('No puedes eliminar tu propia cuenta.')}`);
  }

  if (countUsers() <= 1) {
    redirect(`/admin/users?error=${encodeURIComponent('Debe quedar al menos un usuario.')}`);
  }

  deleteUser(id);
  revalidatePath('/admin/users');
}
