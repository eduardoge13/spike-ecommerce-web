import { Product } from '@/types/product';
import { getDb } from '@/lib/db';

interface ProductRow {
  id: string;
  name: string;
  description: string;
  price: number;
  original_price: number | null;
  category: string | null;
  stock: number | null;
  is_new: number;
  badge_text: string | null;
  whatsapp_message: string | null;
  images_json: string;
  created_at: string;
  updated_at: string;
}

function rowToProduct(row: ProductRow): Product {
  const images = JSON.parse(row.images_json) as string[];

  return {
    id: row.id,
    name: row.name,
    description: row.description,
    price: row.price,
    originalPrice: row.original_price ?? undefined,
    image: images[0] ?? '',
    images,
    category: row.category ?? undefined,
    stock: row.stock ?? undefined,
    isNew: row.is_new === 1,
    badgeText: row.badge_text ?? undefined,
    whatsappMessage: row.whatsapp_message ?? undefined,
  };
}

export function getAllProducts(): Product[] {
  const rows = getDb()
    .prepare('SELECT * FROM products ORDER BY created_at DESC')
    .all() as ProductRow[];

  return rows.map(rowToProduct);
}

export function getProductById(id: string): Product | undefined {
  const row = getDb().prepare('SELECT * FROM products WHERE id = ?').get(id) as
    | ProductRow
    | undefined;

  return row ? rowToProduct(row) : undefined;
}

export function getProductsByCategory(category: string): Product[] {
  const rows = getDb()
    .prepare('SELECT * FROM products WHERE category = ? ORDER BY created_at DESC')
    .all(category) as ProductRow[];

  return rows.map(rowToProduct);
}

export interface ProductInput {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category?: string;
  stock?: number;
  isNew?: boolean;
  badgeText?: string;
  whatsappMessage?: string;
  images: string[];
}

export function createProduct(input: ProductInput): Product {
  const now = new Date().toISOString();

  getDb()
    .prepare(
      `INSERT INTO products (
        id, name, description, price, original_price, category, stock,
        is_new, badge_text, whatsapp_message, images_json, created_at, updated_at
      ) VALUES (
        @id, @name, @description, @price, @originalPrice, @category, @stock,
        @isNew, @badgeText, @whatsappMessage, @imagesJson, @createdAt, @updatedAt
      )`,
    )
    .run({
      id: input.id,
      name: input.name,
      description: input.description,
      price: input.price,
      originalPrice: input.originalPrice ?? null,
      category: input.category ?? null,
      stock: input.stock ?? null,
      isNew: input.isNew ? 1 : 0,
      badgeText: input.badgeText ?? null,
      whatsappMessage: input.whatsappMessage ?? null,
      imagesJson: JSON.stringify(input.images),
      createdAt: now,
      updatedAt: now,
    });

  return getProductById(input.id)!;
}

export function updateProduct(id: string, input: Omit<ProductInput, 'id'>): Product | undefined {
  const now = new Date().toISOString();

  const result = getDb()
    .prepare(
      `UPDATE products SET
        name = @name,
        description = @description,
        price = @price,
        original_price = @originalPrice,
        category = @category,
        stock = @stock,
        is_new = @isNew,
        badge_text = @badgeText,
        whatsapp_message = @whatsappMessage,
        images_json = @imagesJson,
        updated_at = @updatedAt
      WHERE id = @id`,
    )
    .run({
      id,
      name: input.name,
      description: input.description,
      price: input.price,
      originalPrice: input.originalPrice ?? null,
      category: input.category ?? null,
      stock: input.stock ?? null,
      isNew: input.isNew ? 1 : 0,
      badgeText: input.badgeText ?? null,
      whatsappMessage: input.whatsappMessage ?? null,
      imagesJson: JSON.stringify(input.images),
      updatedAt: now,
    });

  return result.changes > 0 ? getProductById(id) : undefined;
}

export function deleteProduct(id: string): boolean {
  const result = getDb().prepare('DELETE FROM products WHERE id = ?').run(id);
  return result.changes > 0;
}
