import crypto from 'node:crypto';

const KEY_LENGTH = 64;

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const derivedKey = crypto.scryptSync(password, salt, KEY_LENGTH);
  return `${salt}:${derivedKey.toString('hex')}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, storedHashHex] = stored.split(':');
  if (!salt || !storedHashHex) return false;

  const storedHash = Buffer.from(storedHashHex, 'hex');
  const derivedKey = crypto.scryptSync(password, salt, KEY_LENGTH);

  if (storedHash.length !== derivedKey.length) return false;
  return crypto.timingSafeEqual(storedHash, derivedKey);
}
