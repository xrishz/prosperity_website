'use client';

import { useId } from 'react';

type Props = { vehicle: 'plane' | 'bus'; className?: string };

/** A visible, authored counterpart to the optional WebGL scene. */
export function TransportFallback({ vehicle, className }: Props) {
  const id = useId().replaceAll(':', '');
  const shadow = `${id}-transport-shadow`;

  return (
    <svg
      className={className}
      viewBox="0 0 500 360"
      width="100%"
      height="100%"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <filter id={shadow} x="-35%" y="-50%" width="170%" height="220%">
          <feDropShadow dx="0" dy="14" stdDeviation="12" floodColor="#073c42" floodOpacity=".17" />
        </filter>
      </defs>
      {vehicle === 'plane' ? (
        <g transform="translate(255 180) rotate(-21)" filter={`url(#${shadow})`}>
          <path d="M-50-8 -78-91 -110-99 -95 0Z" fill="#7dcfd5" />
          <path d="M-129-5 -150-47 -179-52 -166 8Z" fill="#ffd066" />
          <path d="M-136 5 -169 34 -130 36 -103 11Z" fill="#0b605c" />
          <path d="M-178 1C-140-8-118-18-73-21L91-21C133-21 166-6 175 3 159 21 126 26 84 25L-91 23C-130 19-158 10-178 1Z" fill="#fafcf5" stroke="#d7e5df" strokeWidth="1.5" />
          <path d="M-166 6C-115 21-62 20 84 21 129 21 156 13 172 4 158 22 127 28 84 28L-91 26C-127 23-153 14-166 6Z" fill="#d8ebe7" />
          <path d="M117-16 136-12 149-5 126-3 111-7Z" fill="#0b5057" />
          <g fill="#0b605c">
            {[-95, -72, -49, -26, -3, 20, 43, 66, 89].map((x) => <rect key={x} x={x} y="-7" width="8" height="9" rx="3" />)}
          </g>
          <path d="M-68 6 8 86 -22 99 -101 13Z" fill="#62c4ce" />
          <path d="M8 86 18 79 2 95 -22 99Z" fill="#ffd066" />
          <path d="M-54 35C-47 31-33 31-25 36L-16 49C-18 57-35 64-48 58L-61 45Z" fill="#fafcf5" />
          <ellipse cx="-24" cy="48" rx="8" ry="10" transform="rotate(-27 -24 48)" fill="#0b5057" />
          <path d="M-86-34C-77-39-65-38-60-33L-57-23C-63-15-77-14-84-20Z" fill="#e4f1ed" />
          <path d="M-135-9 -148-44 -151-45 -142-5Z" fill="#fff0b5" />
        </g>
      ) : (
        <g filter={`url(#${shadow})`}>
          <path d="M58 251 155 205 443 250 346 309Z" fill="#b8e4df" />
          <path d="M58 251 346 300 443 250 443 259 346 309 58 259Z" fill="#6ebdb9" />
          <path d="M95 147Q95 136 109 138L334 172 334 282 107 248Q95 246 95 231Z" fill="#ffcf5c" />
          <path d="M334 172 402 140Q411 138 411 154L411 242Q411 251 400 255L334 282Z" fill="#eab23a" />
          <path d="M101 139 172 111Q180 108 190 110L402 140 334 172Z" fill="#ffdf84" />
          <path d="M105 211 334 245 334 264 105 229Z" fill="#117d7a" />
          <g fill="#104c57">
            {[0, 1, 2, 3, 4].map((n) => <path key={n} d={`M${110 + n * 43} ${153 + n * 6.5}l34 5v47l-34-5Z`} />)}
            <path d="M344 184 400 158 400 204 344 231Z" />
          </g>
          <path d="M345 186 397 162 397 172 345 198Z" fill="#68c8cc" opacity=".75" />
          <path d="M114 156 140 160 140 168 114 164Z" fill="#68c8cc" opacity=".75" />
          <path d="M299 181V243" stroke="#d59623" strokeWidth="3" />
          <g>
            <ellipse cx="149" cy="248" rx="22" ry="26" fill="#103535" />
            <ellipse cx="149" cy="248" rx="11" ry="14" fill="#d5eddf" />
            <ellipse cx="296" cy="271" rx="22" ry="26" fill="#103535" />
            <ellipse cx="296" cy="271" rx="11" ry="14" fill="#d5eddf" />
          </g>
          <path d="M347 247 361 241 361 252 347 258Z" fill="#fff8df" />
          <path d="M386 230 400 224 400 235 386 241Z" fill="#fff8df" />
          <path d="M344 267 403 240" stroke="#0e605f" strokeWidth="5" strokeLinecap="round" />
          <path d="M335 182 329 177 329 170" fill="none" stroke="#0e605f" strokeWidth="5" strokeLinecap="round" />
        </g>
      )}
    </svg>
  );
}
