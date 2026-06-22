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
    <path d="M11 25 A9 9 0 0 1 29 25 Z" fill="#D4621E" />
    <g stroke="#C4973C" strokeWidth="2" strokeLinecap="round">
      <line x1="12" y1="18" x2="9" y2="15" />
      <line x1="20" y1="13" x2="20" y2="9" />
      <line x1="28" y1="18" x2="31" y2="15" />
    </g>
    <line x1="6" y1="25" x2="34" y2="25" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

interface LogoProps {
  variant?: 'dark' | 'light';
  size?: 'md' | 'sm';
}

export const Logo: React.FC<LogoProps> = ({ variant = 'dark', size = 'md' }) => {
  const textColor = variant === 'dark' ? 'text-gray-900' : 'text-white';
  const descColor = variant === 'dark' ? 'text-[#9C6B2E]' : 'text-secondary';
  const markSize = size === 'md' ? 40 : 32;
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
