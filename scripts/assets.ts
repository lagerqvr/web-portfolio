/**
 * Regenerates the derived image assets.
 *   npm run assets
 *
 * Everything here runs through the same ordered dither as the hero field, so
 * the avatar, the favicon and the photographs all share one visual language.
 */
import { writeFile } from 'node:fs/promises';
import sharp from 'sharp';
import { pixelate } from '../lib/pixelate.ts';

/** The Bayer 4x4 matrix that drives the dither, drawn as the brand mark. */
const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

async function mark(size: number, background: { r: number; g: number; b: number; alpha: number }) {
  const cell = size / 4;
  const rects = BAYER.map((v, i) => {
    const x = (i % 4) * cell;
    const y = Math.floor(i / 4) * cell;
    return `<rect x="${x}" y="${y}" width="${cell}" height="${cell}" fill="#E8E9EA" fill-opacity="${(v + 1) / 17}"/>`;
  }).join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" shape-rendering="crispEdges">${rects}</svg>`;
  return sharp(Buffer.from(svg)).flatten({ background }).png().toBuffer();
}

const ground = { r: 8, g: 9, b: 10, alpha: 1 };

// Favicons. Static files rather than an ImageResponse route: with two route
// groups each owning a root layout, a top-level app/icon.tsx has no layout to
// resolve against and 404s.
await writeFile('app/icon.png', await mark(64, ground));
await writeFile('app/apple-icon.png', await mark(180, ground));

// Avatar: 72px of real pixels for the site, plus a nearest-neighbour blow-up
// that stays crisp as a GitHub/LinkedIn profile picture.
const avatar = await pixelate('public/img/avatar.jpeg', { size: 72 });
await writeFile('public/img/avatar-pixel.png', avatar);
await writeFile(
  'avatar-pixel-512.png',
  await sharp(avatar).resize(512, 512, { kernel: 'nearest' }).png().toBuffer(),
);

// The pizza. Cropped to the pie itself first — the automatic crop kept too much
// worktop and the dither turned it to mud. Dithered like everything else, which
// is precisely the joke.
const pizzaMeta = await sharp('public/img/pizza.jpeg').metadata();
const pizzaW = pizzaMeta.width!;
const pizzaH = pizzaMeta.height!;
// The pie sits low in a tall portrait frame; centre the square crop on it
// rather than starting the crop at its top edge.
const pizzaSide = Math.round(pizzaW * 0.78);
const pizzaLeft = Math.round((pizzaW - pizzaSide) / 2);
const pizzaTop = Math.min(
  Math.max(0, Math.round(pizzaH * 0.615 - pizzaSide / 2)),
  pizzaH - pizzaSide,
);
const pizzaCrop = await sharp('public/img/pizza.jpeg')
  .extract({ left: pizzaLeft, top: pizzaTop, width: pizzaSide, height: pizzaSide })
  .modulate({ brightness: 1.12 })
  .toBuffer();
await writeFile('public/img/pizza-pixel.png', await pixelate(pizzaCrop, { size: 96 }));

console.log('wrote app/icon.png, app/apple-icon.png, public/img/avatar-pixel.png,');
console.log('      avatar-pixel-512.png (repo root, for GitHub), public/img/pizza-pixel.png');
