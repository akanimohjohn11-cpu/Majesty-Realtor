import React from 'react';
import Link from 'next/link';

interface BrandLogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  href?: string;
}

export default function BrandLogo({
  className = '',
  variant = 'light',
  size = 'md',
  showSubtitle = true,
  href,
}: BrandLogoProps) {
  const isLight = variant === 'light'; // Light text for dark backgrounds (navbar, footer, dark admin sidebar)
  const isDark = variant === 'dark'; // Dark text for white/cream backgrounds
  const isGold = variant === 'gold';

  const sizeClasses = {
    sm: {
      emblem: 'w-7 h-7',
      title: 'text-lg',
      sub: 'text-[9px]',
      gap: 'gap-2',
    },
    md: {
      emblem: 'w-9 h-9',
      title: 'text-xl',
      sub: 'text-[10px]',
      gap: 'gap-2.5',
    },
    lg: {
      emblem: 'w-12 h-12',
      title: 'text-2xl sm:text-3xl',
      sub: 'text-[11px] sm:text-xs',
      gap: 'gap-3.5',
    },
  }[size];

  const content = (
    <div className={`flex items-center ${sizeClasses.gap} ${className} group`}>
      {/* Befitting Luxury Brand Medallion / Architectural Crest */}
      <div
        className={`${sizeClasses.emblem} relative rounded-xl flex items-center justify-center shrink-0 shadow-md transition-transform duration-300 group-hover:scale-105 overflow-hidden`}
        style={{
          background: 'linear-gradient(135deg, #104C38 0%, #08281D 50%, #061F16 100%)',
          border: '1.5px solid rgba(223, 190, 108, 0.45)',
          boxShadow: '0 4px 12px -2px rgba(13, 74, 54, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.2)',
        }}
      >
        {/* Subtle radial gold glow inside the crest */}
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 50% 30%, rgba(223, 190, 108, 0.6) 0%, transparent 70%)',
          }}
        />

        {/* Polished Architectural Crown / Monogram Crest SVG */}
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[72%] h-[72%] relative z-10"
        >
          {/* Subtle Outer Diamond Trim */}
          <path
            d="M20 3L35 18L20 33L5 18L20 3Z"
            stroke="url(#crestGoldGrad)"
            strokeWidth="0.75"
            strokeDasharray="2 1.5"
            strokeOpacity="0.6"
          />

          {/* Architectural Pediment / Crown Crest */}
          <path
            d="M12 28H28M13 25H27"
            stroke="url(#crestGoldGrad)"
            strokeWidth="1.2"
            strokeLinecap="round"
          />

          {/* Majestic Pillars / Monogram M */}
          <path
            d="M14 24V14L20 20L26 14V24"
            stroke="url(#crestGoldGrad)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Crown Jewels / Star Finials */}
          <circle cx="14" cy="11.5" r="1.5" fill="#DFBE6C" />
          <circle cx="20" cy="8" r="1.8" fill="#FBF5DF" />
          <circle cx="26" cy="11.5" r="1.5" fill="#DFBE6C" />

          {/* Center Royal Keystone */}
          <path
            d="M20 4.5L21.5 7.5H18.5L20 4.5Z"
            fill="url(#crestGoldGrad)"
          />

          {/* Definitions */}
          <defs>
            <linearGradient id="crestGoldGrad" x1="5" y1="5" x2="35" y2="35" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FBF5DF" />
              <stop offset="0.45" stopColor="#DFBE6C" />
              <stop offset="0.85" stopColor="#C99E38" />
              <stop offset="1" stopColor="#8F6C1E" />
            </linearGradient>
          </defs>
        </svg>

        {/* Fine gold border shimmer */}
        <div className="absolute inset-0 rounded-xl border border-white/10 pointer-events-none" />
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col leading-none">
        <div className="flex items-baseline gap-1.5">
          <span
            className={`font-serif font-black tracking-[0.14em] uppercase ${sizeClasses.title} ${
              isDark
                ? 'text-[#0D4A36]'
                : isGold
                ? 'text-[#DFBE6C]'
                : 'text-white'
            }`}
            style={{
              textShadow: isLight ? '0 1px 3px rgba(0,0,0,0.3)' : undefined,
            }}
          >
            <span
              className={
                isDark
                  ? 'text-[#0D4A36]'
                  : 'bg-gradient-to-r from-[#FFF5D6] via-[#DFBE6C] to-[#E2C376] bg-clip-text text-transparent'
              }
            >
              MAJESTY
            </span>
          </span>
        </div>

        {showSubtitle && (
          <span
            className={`font-sans tracking-[0.26em] uppercase font-semibold mt-1 ${sizeClasses.sub} ${
              isDark ? 'text-[#5C6E66]' : 'text-[#DFBE6C]/90'
            }`}
          >
            Realty & Construction
          </span>
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block transition-opacity hover:opacity-95">
        {content}
      </Link>
    );
  }

  return content;
}
