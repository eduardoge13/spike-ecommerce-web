import crypto from 'node:crypto';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getDb } from '@/lib/db';
import { hashPassword, verifyPassword } from '@/lib/password';

const SESSION_COOKIE = 'admin_session';
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

export interface AdminUser {
  id: string;
  email: string;
}

interface UserRow {
  id: string;
  email: string;
  password_hash: string;
  created_at: string;
}

function getSessionSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET?.trim();

  if (!secret) {
    throw new Error(
      'ADMIN_SESSION_SECRET no está configurado. Define esta variable de entorno antes de usar el panel de administración.',
    );
  }

  return secret;
}

function sign(payload: string): string {
  return crypto.createHmac('sha256', getSessionSecret()).update(payload).digest('hex');
}

function createSessionToken(userId: string): string {
  const expiresAt = Date.now() + SESSION_TTL_MS;
  const payload = `${userId}.${expiresAt}`;
  const signature = sign(payload);
  return `${payload}.${signature}`;
}

function verifySessionToken(token: string): { userId: string } | null {
  const parts = token.split('.');
  if (parts.length !== 3) {
    return null;
  }

  const [userId, expiresAtRaw, signature] = parts;
  const payload = `${userId}.${expiresAtRaw}`;
  const expectedSignature = sign(payload);

  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (
    signatureBuffer.length !== expectedBuffer.length ||
    !crypto.timingSafeEqual(signatureBuffer, expectedBuffer)
  ) {
    return null;
  }

  const expiresAt = Number(expiresAtRaw);
  if (!Number.isFinite(expiresAt) || Date.now() > expiresAt) {
    return null;
  }

  return { userId };
}

function getUserById(id: string): AdminUser | undefined {
  const row = getDb().prepare('SELECT id, email FROM users WHERE id = ?').get(id) as
    | Pick<UserRow, 'id' | 'email'>
    | undefined;

  return row ? { id: row.id, email: row.email } : undefined;
}

export async function login(email: string, password: string): Promise<AdminUser | null> {
  const row = getDb()
    .prepare('SELECT * FROM users WHERE email = ?')
    .get(email.trim().toLowerCase()) as UserRow | undefined;

  if (!row) return null;
  if (!verifyPassword(password, row.password_hash)) return null;

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, createSessionToken(row.id), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_TTL_MS / 1000,
  });

  return { id: row.id, email: row.email };
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function getCurrentUser(): Promise<AdminUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const session = verifySessionToken(token);
  if (!session) return null;

  return getUserById(session.userId) ?? null;
}

export async function requireAdmin(): Promise<AdminUser> {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/admin/login');
  }
  return user;
}

export function listUsers(): AdminUser[] {
  const rows = getDb()
    .prepare('SELECT id, email FROM users ORDER BY created_at ASC')
    .all() as Pick<UserRow, 'id' | 'email'>[];

  return rows.map((row) => ({ id: row.id, email: row.email }));
}

export function createUser(email: string, password: string): AdminUser {
  const normalizedEmail = email.trim().toLowerCase();
  const id = crypto.randomUUID();

  getDb()
    .prepare('INSERT INTO users (id, email, password_hash, created_at) VALUES (?, ?, ?, ?)')
    .run(id, normalizedEmail, hashPassword(password), new Date().toISOString());

  return { id, email: normalizedEmail };
}

export function deleteUser(id: string): boolean {
  const result = getDb().prepare('DELETE FROM users WHERE id = ?').run(id);
  return result.changes > 0;
}

export function countUsers(): number {
  const { count } = getDb().prepare('SELECT COUNT(*) as count FROM users').get() as {
    count: number;
  };
  return count;
}
