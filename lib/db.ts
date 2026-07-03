import Database from 'better-sqlite3';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import productsSeedData from '@/data/products.json';
import { hashPassword } from '@/lib/password';

interface SeedProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  category?: string;
  stock?: number;
  isNew?: boolean;
  whatsappMessage?: string;
}

const productsSeed = productsSeedData as SeedProduct[];

const DB_PATH = process.env.STORE_DB_PATH ?? path.join(process.cwd(), '.data', 'db', 'store.db');

let dbInstance: Database.Database | null = null;

function ensureDirExists(filePath: string) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function seedProducts(db: Database.Database) {
  const { count } = db.prepare('SELECT COUNT(*) as count FROM products').get() as {
    count: number;
  };

  if (count > 0) return;

  const insert = db.prepare(`
    INSERT INTO products (
      id, name, description, price, original_price, category, stock,
      is_new, badge_text, whatsapp_message, images_json, created_at, updated_at
    ) VALUES (
      @id, @name, @description, @price, @originalPrice, @category, @stock,
      @isNew, @badgeText, @whatsappMessage, @imagesJson, @createdAt, @updatedAt
    )
  `);

  const now = new Date().toISOString();

  const insertMany = db.transaction((items: SeedProduct[]) => {
    for (const item of items) {
      const images = item.images && item.images.length > 0 ? item.images : [item.image];
      insert.run({
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        originalPrice: item.originalPrice ?? null,
        category: item.category ?? null,
        stock: item.stock ?? null,
        isNew: item.isNew ? 1 : 0,
        badgeText: null,
        whatsappMessage: item.whatsappMessage ?? null,
        imagesJson: JSON.stringify(images),
        createdAt: now,
        updatedAt: now,
      });
    }
  });

  insertMany(productsSeed);
}

function seedAdminUser(db: Database.Database) {
  const { count } = db.prepare('SELECT COUNT(*) as count FROM users').get() as {
    count: number;
  };

  if (count > 0) return;

  const seedEmail = process.env.ADMIN_SEED_EMAIL?.trim();
  const seedPassword = process.env.ADMIN_SEED_PASSWORD?.trim();

  if (!seedEmail || !seedPassword) {
    console.warn(
      '[db] No ADMIN_SEED_EMAIL/ADMIN_SEED_PASSWORD set — no admin user was created. Set these env vars and restart to bootstrap the first admin.',
    );
    return;
  }

  const now = new Date().toISOString();

  db.prepare(
    `INSERT INTO users (id, email, password_hash, created_at) VALUES (?, ?, ?, ?)`,
  ).run(crypto.randomUUID(), seedEmail.toLowerCase(), hashPassword(seedPassword), now);

  console.log(`[db] Seeded initial admin user: ${seedEmail}`);
}

function initSchema(db: Database.Database) {
  db.pragma('journal_mode = WAL');

  db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      price INTEGER NOT NULL,
      original_price INTEGER,
      category TEXT,
      stock INTEGER,
      is_new INTEGER NOT NULL DEFAULT 0,
      badge_text TEXT,
      whatsapp_message TEXT,
      images_json TEXT NOT NULL DEFAULT '[]',
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
  `);
}

export function getDb(): Database.Database {
  if (dbInstance) return dbInstance;

  ensureDirExists(DB_PATH);
  const db = new Database(DB_PATH);
  initSchema(db);
  seedProducts(db);
  seedAdminUser(db);

  dbInstance = db;
  return dbInstance;
}
