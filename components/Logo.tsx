import React from 'react';

interface SunMarkProps {
  size?: number;
  className?: string;
}

// Rising sun over a horizon line. The horizon uses currentColor so the mark
// adapts to light (nav) and dark (footer) surfaces from the parent's text color.
export const SunMark: React.FC<SunMarkProps> = ({ size = 40, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    className={className}
    aria-hidden="true"
  >
    <path d="M8 24 A12 12 0 0 1 32 24 Z" fill="#D4621E" />
    {/* Rays sit at a uniform distance from the dome: each inner endpoint is ~15
        from the sun's center (20,24) — i.e. a constant 3-unit gap beyond the
        radius-12 dome — so top and side rays clear the ball evenly. */}
    <g stroke="#C4973C" strokeWidth="2.5" strokeLinecap="round">
      <line x1="9.4" y1="13.4" x2="5.1" y2="9.1" />
      <line x1="20" y1="9" x2="20" y2="3" />
      <line x1="30.6" y1="13.4" x2="34.9" y2="9.1" />
    </g>
    <line x1="3" y1="24" x2="37" y2="24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

interface LogoProps {
  variant?: 'dark' | 'light';
  size?: 'md' | 'sm';
}

export const Logo: React.FC<LogoProps> = ({ variant = 'dark', size = 'md' }) => {
  const textColor = variant === 'dark' ? 'text-gray-900' : 'text-white';
  const descColor = variant === 'dark' ? 'text-[#9C6B2E]' : 'text-secondary';
  const markSize = size === 'md' ? 46 : 36;
  const titleSize = size === 'md' ? 'text-2xl' : 'text-xl';
  return (
    <div className={`flex items-center gap-2.5 ${textColor}`}>
      <SunMark size={markSize} />
      <div className="flex flex-col leading-none">
        <span className={`font-display font-extrabold ${titleSize} tracking-tight`}>Costa Rica</span>
        <span className={`font-sans font-semibold uppercase tracking-[0.18em] text-[10px] mt-1 ${descColor}`}>
          Rentals · Santa Teresa
        </span>
      </div>
    </div>
  );
};
