import React, { useId } from 'react';

function Logo({ size = 32, glow = false, className = '' }) {
  const reactId = useId();
  const id = reactId.replace(/:/g, '');
  const gradId = `lg-${id}`;
  const glowId = `lgw-${id}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`ra-logo ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradId} x1="4" y1="4" x2="46" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#c4b5fd" />
          <stop offset="0.5" stopColor="#a78bfa" />
          <stop offset="1" stopColor="#6366f1" />
        </linearGradient>
        {glow && (
          <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="0 0 0 0 0.38  0 0 0 0 0.33  0 0 0 0 0.95  0 0 0 0.55 0"
              result="glow"
            />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        )}
      </defs>

      <g filter={glow ? `url(#${glowId})` : undefined}>
        {/* Triangle fill — very subtle, gives depth */}
        <path
          d="M8 5L36 24L8 43Z"
          fill={`url(#${gradId})`}
          fillOpacity="0.07"
        />

        {/* Triangle edges — the "play/run" shape */}
        <path
          d="M8 5L36 24L8 43Z"
          stroke={`url(#${gradId})`}
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
          fill="none"
        />

        {/* Branch edges — the "algorithm/tree" paths */}
        <line x1="36" y1="24" x2="44" y2="13" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" opacity="0.55" />
        <line x1="36" y1="24" x2="44" y2="35" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" opacity="0.55" />

        {/* Cross-branch — subtle graph connection */}
        <line x1="44" y1="13" x2="44" y2="35" stroke="#a78bfa" strokeWidth="1.2" strokeLinecap="round" opacity="0.2" />

        {/* Main nodes */}
        <circle cx="8" cy="5" r="3.5" fill={`url(#${gradId})`} />
        <circle cx="36" cy="24" r="4" fill={`url(#${gradId})`} />
        <circle cx="8" cy="43" r="3.5" fill={`url(#${gradId})`} />

        {/* Branch nodes */}
        <circle cx="44" cy="13" r="2.5" fill="#a78bfa" opacity="0.7" />
        <circle cx="44" cy="35" r="2.5" fill="#a78bfa" opacity="0.7" />

        {/* Center accent — tiny highlight at triangle centroid */}
        <circle cx="17" cy="24" r="1.5" fill="#c4b5fd" opacity="0.35" />
      </g>
    </svg>
  );
}

export default Logo;
