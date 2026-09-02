/**
 * Brand mark: the Bayer 4x4 threshold matrix that drives the hero's dithering,
 * rendered as sixteen cells. The site's own logic used as its signature —
 * abstract, monochrome, and legible down to a 16px favicon.
 */
const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

export function Mark({ size = 22, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      className={className}
      role="img"
      aria-label="lagerqvr"
      shapeRendering="crispEdges"
    >
      {BAYER.map((v, i) => (
        <rect
          key={i}
          x={(i % 4) * 4}
          y={Math.floor(i / 4) * 4}
          width={4}
          height={4}
          fill="currentColor"
          opacity={(v + 1) / 17}
        />
      ))}
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={`group inline-flex items-center gap-2.5 ${className ?? ''}`}>
      <Mark className="text-text transition-opacity duration-150 ease-[steps(4,end)] group-hover:opacity-60" />
      <span className="label text-text">lagerqvr</span>
    </span>
  );
}
