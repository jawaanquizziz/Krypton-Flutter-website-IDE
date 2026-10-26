import React from 'react';

interface KryptonLogoProps {
  size?: number;
  className?: string;
  showWordmark?: boolean;
}

export function KryptonLogo({
  size = 24,
  className = '',
  showWordmark = true,
}: KryptonLogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Geometric mark — works at 16px, 24px, 32px */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Outer hexagonal frame */}
        <path
          d="M16 2L28 9V23L16 30L4 23V9L16 2Z"
          stroke="#3d8ef8"
          strokeWidth="1.5"
          fill="none"
        />
        {/* Inner K shape */}
        <path
          d="M11 10V22M11 16L20 10M11 16L20 22"
          stroke="#3d8ef8"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {showWordmark && (
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600,
            fontSize: size * 0.75,
            letterSpacing: '-0.02em',
            color: '#e8eaed',
            lineHeight: 1,
          }}
        >
          Krypton
        </span>
      )}
    </div>
  );
}
