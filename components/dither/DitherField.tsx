'use client';

import { useEffect, useRef } from 'react';

/**
 * Ordered-dither wave field.
 *
 * Renders an animated sine band into a deliberately tiny backing buffer (one
 * cell per `pixelSize` CSS pixels), quantises it through a Bayer 4x4 matrix to
 * four grey levels, then blits it up with smoothing disabled. Because the
 * buffer is ~1/6 scale the per-frame cost is a few tens of thousands of writes
 * even on a desktop viewport, which is what keeps this smooth on a phone.
 *
 * Pointer input injects decaying radial ripples into the same field, so the
 * interaction is expressed in the pixel language rather than as an overlay.
 */

/** Bayer 4x4 threshold matrix, normalised to 0..1. */
const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);

/** Four-step ramp from ground to near-text. */
const RAMP: ReadonlyArray<readonly [number, number, number]> = [
  [8, 9, 10],
  [38, 41, 45],
  [96, 102, 108],
  [186, 190, 194],
];

type Ripple = { x: number; y: number; born: number };

export interface DitherFieldProps {
  className?: string;
  /** CSS pixels per dither cell. Larger = chunkier and cheaper. */
  pixelSize?: number;
  /** Overall brightness of the band, 0..1. */
  intensity?: number;
  /** Interaction target; defaults to the canvas's parent element. */
  interactive?: boolean;
}

export default function DitherField({
  className,
  pixelSize = 6,
  intensity = 1,
  interactive = true,
}: DitherFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ripplesRef = useRef<Ripple[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const buffer = document.createElement('canvas');
    const bctx = buffer.getContext('2d', { alpha: false });
    if (!bctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

    let bw = 0;
    let bh = 0;
    let image: ImageData | null = null;
    let raf = 0;
    let visible = true;
    let start = performance.now();

    function resize() {
      if (!canvas || !host || !ctx || !bctx) return;
      const rect = host.getBoundingClientRect();
      const cssW = Math.max(1, Math.floor(rect.width));
      const cssH = Math.max(1, Math.floor(rect.height));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(cssW * dpr);
      canvas.height = Math.floor(cssH * dpr);
      canvas.style.width = `${cssW}px`;
      canvas.style.height = `${cssH}px`;

      bw = Math.max(2, Math.ceil(cssW / pixelSize));
      bh = Math.max(2, Math.ceil(cssH / pixelSize));
      buffer.width = bw;
      buffer.height = bh;
      image = bctx.createImageData(bw, bh);

      ctx.imageSmoothingEnabled = false;
    }

    function draw(now: number) {
      if (!image || !ctx || !bctx) return;
      const time = (now - start) / 1000;
      const data = image.data;
      const ripples = ripplesRef.current;

      for (let y = 0; y < bh; y++) {
        const ny = y / bh;

        for (let x = 0; x < bw; x++) {
          const nx = x / bw;

          // Travelling band: two detuned sines so the crest never repeats
          // cleanly across the viewport.
          const crest =
            0.5 +
            0.26 * Math.sin(nx * Math.PI * 2.2 + time * 0.32) * Math.cos(nx * Math.PI * 0.55 - time * 0.11) +
            0.05 * Math.sin(nx * Math.PI * 5.1 - time * 0.5);

          const dist = Math.abs(ny - crest);
          const thickness = 0.105 + 0.03 * Math.sin(nx * Math.PI * 1.7 + time * 0.22);

          let v = Math.max(0, 1 - dist / thickness);
          v = v * v * (3 - 2 * v); // smoothstep

          // Ripples displace the field outward from the pointer.
          for (let i = 0; i < ripples.length; i++) {
            const r = ripples[i]!;
            const age = (now - r.born) / 1000;
            const dx = nx - r.x;
            const dy = (ny - r.y) * (bh / bw); // keep rings circular
            const d = Math.sqrt(dx * dx + dy * dy);
            const front = age * 0.55;
            const band = Math.exp(-Math.abs(d - front) * 26);
            v += Math.sin((d - front) * 34) * band * Math.exp(-age * 1.6) * 0.85;
          }

          // Static grain keeps flat regions from banding.
          const grain = ((x * 73856093) ^ (y * 19349663)) % 97;
          v = v * intensity * (0.9 + (grain / 97) * 0.2);
          v = v < 0 ? 0 : v > 1 ? 1 : v;

          // Ordered dither to the four-tone ramp.
          const scaled = v * (RAMP.length - 1);
          const lo = Math.floor(scaled);
          const threshold = BAYER[(y & 3) * 4 + (x & 3)]!;
          const level = Math.min(RAMP.length - 1, lo + (scaled - lo > threshold ? 1 : 0));
          const tone = RAMP[level]!;

          const o = (y * bw + x) * 4;
          data[o] = tone[0];
          data[o + 1] = tone[1];
          data[o + 2] = tone[2];
          data[o + 3] = 255;
        }
      }

      bctx.putImageData(image, 0, 0);
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(buffer, 0, 0, canvas!.width, canvas!.height);

      // Retire ripples that have decayed below visibility.
      if (ripples.length) {
        ripplesRef.current = ripples.filter((r) => (now - r.born) / 1000 < 3.2);
      }
    }

    function loop(now: number) {
      draw(now);
      raf = requestAnimationFrame(loop);
    }

    function stop() {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    }

    function play() {
      if (raf || reduced.matches || !visible) return;
      raf = requestAnimationFrame(loop);
    }

    function restart() {
      stop();
      resize();
      if (reduced.matches) {
        // One static frame, no RAF loop.
        ripplesRef.current = [];
        draw(performance.now());
      } else {
        play();
      }
    }

    function onPointer(event: PointerEvent) {
      if (!interactive || reduced.matches) return;
      const rect = canvas!.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      if (x < 0 || x > 1 || y < 0 || y > 1) return;
      // Cap concurrent ripples — the inner loop is O(pixels x ripples).
      const next = [...ripplesRef.current, { x, y, born: performance.now() }];
      ripplesRef.current = next.slice(-4);
    }

    function onVisibility() {
      if (document.hidden) stop();
      else play();
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry?.isIntersecting ?? false;
        if (visible) play();
        else stop();
      },
      { threshold: 0 },
    );
    observer.observe(host);

    const resizeObserver = new ResizeObserver(restart);
    resizeObserver.observe(host);

    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('visibilitychange', onVisibility);
    reduced.addEventListener('change', restart);

    start = performance.now();
    restart();

    return () => {
      stop();
      observer.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('visibilitychange', onVisibility);
      reduced.removeEventListener('change', restart);
    };
  }, [pixelSize, intensity, interactive]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{ display: 'block', width: '100%', height: '100%' }}
    />
  );
}
