/**
 * The escape-wheel mark — the site's identity anchor (plan §25).
 * One tooth is rendered in paper white: the tooth that was released. Exactly once.
 */
export function Mark({
  size = 24,
  className,
  tile = false,
}: {
  size?: number;
  className?: string;
  tile?: boolean;
}) {
  const teeth = [0, 45, 90, 135, 180, 225, 270, 315];
  const spokes = [22.5, 112.5, 202.5, 292.5];

  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {tile && <rect width="64" height="64" rx="13" fill="var(--void)" />}
      <circle cx="32" cy="32" r="17.5" fill="none" stroke="currentColor" strokeWidth="3.5" />
      <g fill="currentColor">
        {teeth.map((deg, i) => (
          <path
            key={deg}
            d="M29.8 7.5 L36.6 14.6 L27.9 14.1 Z"
            transform={deg ? `rotate(${deg} 32 32)` : undefined}
            fill={i === 0 ? 'var(--paper)' : 'currentColor'}
          />
        ))}
        {spokes.map((deg) => (
          <rect
            key={deg}
            x="30.4"
            y="15"
            width="3.2"
            height="17"
            transform={`rotate(${deg} 32 32)`}
          />
        ))}
        <circle cx="32" cy="32" r="6" />
      </g>
      <circle cx="32" cy="32" r="2.4" fill="var(--void)" />
    </svg>
  );
}
