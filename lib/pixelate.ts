import sharp from 'sharp';

/**
 * Runs an image through the same ordered dither as the hero field, so uploaded
 * avatars and project logos land in the site's visual language automatically
 * instead of relying on whoever uploaded them to prepare the asset.
 */
const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);

/** Cool five-step ramp, ground through text. */
const RAMP: ReadonlyArray<readonly [number, number, number]> = [
  [10, 11, 13],
  [42, 46, 50],
  [92, 98, 104],
  [154, 160, 166],
  [222, 224, 226],
];

export interface PixelateOptions {
  /** Output edge length in real pixels; kept small so the blocks stay visible. */
  size?: number;
  /** Crop to a square before dithering. */
  square?: boolean;
}

export async function pixelate(
  input: Buffer | string,
  { size = 72, square = true }: PixelateOptions = {},
): Promise<Buffer> {
  const pipeline = sharp(input)
    .resize(size, square ? size : undefined, {
      fit: square ? 'cover' : 'inside',
      kernel: 'nearest',
      position: 'attention',
    })
    .greyscale()
    .normalise();

  const { data, info } = await pipeline.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const out = Buffer.alloc(width * height * 3);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const v = data[(y * width + x) * channels]! / 255;
      const scaled = v * (RAMP.length - 1);
      const lo = Math.floor(scaled);
      const threshold = BAYER[(y & 3) * 4 + (x & 3)]!;
      const level = Math.min(RAMP.length - 1, lo + (scaled - lo > threshold ? 1 : 0));
      const tone = RAMP[level]!;

      const o = (y * width + x) * 3;
      out[o] = tone[0];
      out[o + 1] = tone[1];
      out[o + 2] = tone[2];
    }
  }

  return sharp(out, { raw: { width, height, channels: 3 } })
    .png({ compressionLevel: 9, palette: true })
    .toBuffer();
}
