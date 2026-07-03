import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';

const UPLOADS_DIR = process.env.STORE_UPLOADS_DIR ?? path.join(process.cwd(), '.data', 'uploads');

const ALLOWED_MIME_TO_EXT: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
};

const MAX_FILE_SIZE_BYTES = 8 * 1024 * 1024; // 8MB

export class UploadError extends Error {}

async function ensureUploadsDir() {
  await fs.mkdir(UPLOADS_DIR, { recursive: true });
}

export async function saveUploadedImage(file: File): Promise<string> {
  const extension = ALLOWED_MIME_TO_EXT[file.type];

  if (!extension) {
    throw new UploadError('Formato de imagen no permitido. Usa JPG, PNG o WEBP.');
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    throw new UploadError('La imagen es demasiado grande. El máximo es 8MB.');
  }

  await ensureUploadsDir();

  const filename = `${crypto.randomUUID()}.${extension}`;
  const filePath = path.join(UPLOADS_DIR, filename);
  const buffer = Buffer.from(await file.arrayBuffer());

  await fs.writeFile(filePath, buffer);

  return `/media/${filename}`;
}

export async function deleteUploadedImage(publicPath: string): Promise<void> {
  if (!publicPath.startsWith('/media/')) return;

  const filename = publicPath.slice('/media/'.length);

  if (filename.includes('/') || filename.includes('..')) return;

  const filePath = path.join(UPLOADS_DIR, filename);

  await fs.unlink(filePath).catch(() => {
    // File may already be gone — safe to ignore.
  });
}

export function getUploadsDir(): string {
  return UPLOADS_DIR;
}
