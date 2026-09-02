import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexWrap: 'wrap',
          background: '#08090A',
        }}
      >
        {BAYER.map((v, i) => (
          <div
            key={i}
            style={{
              width: 8,
              height: 8,
              background: '#E8E9EA',
              opacity: (v + 1) / 17,
            }}
          />
        ))}
      </div>
    ),
    size,
  );
}
