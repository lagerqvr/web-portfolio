/**
 * Generates the value for ADMIN_PASSWORD_HASH.
 *   npm run hash-password -- 'your password here'
 */
import { randomBytes, scrypt as scryptCb } from 'node:crypto';
import { promisify } from 'node:util';

const scrypt = promisify(scryptCb) as (p: string, s: Buffer, k: number) => Promise<Buffer>;

const password = process.argv[2];
if (!password || password.length < 12) {
  console.error('Usage: npm run hash-password -- \'<password, 12+ characters>\'');
  process.exit(1);
}

const salt = randomBytes(16);
const derived = await scrypt(password, salt, 64);

console.log('\nAdd these to your environment:\n');
console.log(`ADMIN_PASSWORD_HASH="scrypt:${salt.toString('base64')}:${derived.toString('base64')}"`);
console.log(`AUTH_SECRET="${randomBytes(32).toString('base64')}"`);
console.log('');
