/**
 * Regenerates the pixelated avatar from the source photograph.
 *   npm run avatar
 */
import { writeFile } from 'node:fs/promises';
import { pixelate } from '../lib/pixelate.ts';

const SOURCE = 'public/img/avatar.jpeg';
const TARGET = 'public/img/avatar-pixel.png';

const out = await pixelate(SOURCE, { size: 72 });
await writeFile(TARGET, out);
console.log(`${SOURCE} -> ${TARGET} (${out.length} bytes)`);
