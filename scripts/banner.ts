/**
 * Renders the site's hero dither field as a LinkedIn profile banner.
 *   npm run banner
 *
 * This is a direct port of components/dither/DitherField.tsx — same Bayer 4x4
 * matrix, same wave field, same four-tone ramp — evaluated at a single instant
 * and at LinkedIn's 1584x396 instead of animated in a canvas. The point is that
 * the banner and the site are demonstrably the same artwork.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);

const RAMP: ReadonlyArray<readonly [number, number, number]> = [
  [8, 9, 10],
  [38, 41, 45],
  [96, 102, 108],
  [186, 190, 194],
];

export interface FieldOptions {
  width: number;
  height: number;
  pixelSize: number;
  time: number;
  intensity: number;
  /** Band half-height as a fraction of the image height. */
  thickness: number;
  /** Vertical travel of the crest, as a fraction of the image height. */
  amplitude: number;
  /** Horizontal frequency of the crest. Higher means more peaks across the width. */
  frequency: number;
}

function renderField(o: FieldOptions): { data: Buffer; bw: number; bh: number } {
  const bw = Math.ceil(o.width / o.pixelSize);
  const bh = Math.ceil(o.height / o.pixelSize);
  const out = Buffer.alloc(bw * bh * 3);
  const t = o.time;

  for (let y = 0; y < bh; y++) {
    const ny = y / bh;
    for (let x = 0; x < bw; x++) {
      const nx = x / bw;

      const f = o.frequency;
      const crest =
        0.5 +
        o.amplitude * Math.sin(nx * Math.PI * f + t * 0.32) * Math.cos(nx * Math.PI * (f * 0.25) - t * 0.11) +
        (o.amplitude / 3.4) * Math.sin(nx * Math.PI * (f * 2.3) - t * 0.5);

      const dist = Math.abs(ny - crest);
      const thickness = o.thickness + o.thickness * 0.28 * Math.sin(nx * Math.PI * 1.7 + t * 0.22);

      let v = Math.max(0, 1 - dist / thickness);
      v = v * v * (3 - 2 * v);

      const grain = ((x * 73856093) ^ (y * 19349663)) % 97;
      v = v * o.intensity * (0.9 + (grain / 97) * 0.2);
      v = v < 0 ? 0 : v > 1 ? 1 : v;

      const scaled = v * (RAMP.length - 1);
      const lo = Math.floor(scaled);
      const level = Math.min(RAMP.length - 1, lo + (scaled - lo > BAYER[(y & 3) * 4 + (x & 3)]! ? 1 : 0));
      const tone = RAMP[level]!;

      const i = (y * bw + x) * 3;
      out[i] = tone[0];
      out[i + 1] = tone[1];
      out[i + 2] = tone[2];
    }
  }
  return { data: out, bw, bh };
}

/** Upscale with nearest-neighbour so the dither cells stay hard-edged. */
export async function banner(o: FieldOptions): Promise<Buffer> {
  const { data, bw, bh } = renderField(o);
  return sharp(data, { raw: { width: bw, height: bh, channels: 3 } })
    .resize(o.width, o.height, { kernel: 'nearest' })
    .png()
    .toBuffer();
}

const W = 1584;
const H = 396;

// The crest sits in the upper half here on purpose: LinkedIn overlays the
// profile photo across the lower-left corner, so that area is left quiet.
// Chunkier cells and a more aggressive crest than the hero: the banner is seen
// small in a feed, so it needs to read as a wave at a glance.
const base: FieldOptions = {
  width: W,
  height: H,
  pixelSize: 16,
  intensity: 1,
  time: 0,
  thickness: 0.19,
  amplitude: 0.38,
  frequency: 4.0,
};

/**
 * Bayer mark plus wordmark, set in the top-right. That corner is the reliably
 * quiet one: the crest runs through the middle band and LinkedIn drops the
 * profile photo over the lower left.
 */
function markOverlay(): Buffer {
  const cell = 12;
  const pad = 52;
  const markX = W - pad - cell * 4 - 210;
  const markY = pad;
  const rects = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5]
    .map((v, i) => {
      const x = markX + (i % 4) * cell;
      const y = markY + Math.floor(i / 4) * cell;
      return `<rect x="${x}" y="${y}" width="${cell}" height="${cell}" fill="#E8E9EA" fill-opacity="${(v + 1) / 17}"/>`;
    })
    .join('');

  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">${rects}` +
      `<text x="${markX + cell * 4 + 24}" y="${markY + cell * 2 + 11}" fill="#E8E9EA" ` +
      `font-family="Menlo, ui-monospace, monospace" font-size="30" letter-spacing="5">lagerqvr</text>` +
      `</svg>`,
  );
}

await mkdir('banner', { recursive: true });

// Contact sheet of candidate settings, coarsest to finest.
const candidates: Array<[string, Partial<FieldOptions>]> = [
  ['1', { pixelSize: 11, amplitude: 0.30, frequency: 3.0, thickness: 0.16 }],
  ['2', { pixelSize: 13, amplitude: 0.34, frequency: 3.4, thickness: 0.17 }],
  ['3', { pixelSize: 16, amplitude: 0.38, frequency: 4.0, thickness: 0.19 }],
  ['4', { pixelSize: 20, amplitude: 0.40, frequency: 4.6, thickness: 0.22 }],
];

const sheet: Buffer[] = [];
for (const [name, over] of candidates) {
  const buf = await banner({ ...base, ...over });
  await writeFile(`banner/candidate-${name}.png`, buf);
  sheet.push(buf);
}
await sharp({ create: { width: W, height: H * sheet.length, channels: 3, background: { r: 8, g: 9, b: 10 } } })
  .composite(sheet.map((input, i) => ({ input, top: i * H, left: 0 })))
  .png()
  .toFile('banner/contact-sheet.png');

const plain = await banner(base);
await writeFile('banner/linkedin-banner.png', plain);
await sharp(plain).composite([{ input: markOverlay() }]).png().toFile('banner/linkedin-banner-mark.png');

for (const [name, over] of [
  ['alt-1', { time: 4.2 }],
  ['alt-2', { time: 14.5 }],
] as Array<[string, Partial<FieldOptions>]>) {
  await writeFile(`banner/linkedin-${name}.png`, await banner({ ...base, ...over }));
}

console.log('wrote banner/candidate-{1..4}.png, contact-sheet.png, linkedin-banner*.png');
