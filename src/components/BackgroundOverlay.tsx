import React from 'react';

interface BackgroundOverlayProps {
  children: React.ReactNode;
}

export default function BackgroundOverlay({ children }: BackgroundOverlayProps) {
  // Lock to a beautiful elegant default champagne gradient and soft watercolor circles
  const defaultBackgroundStyle = {
    backgroundImage: `radial-gradient(circle at top right, rgba(238, 216, 171, 0.4) 0%, transparent 40%),
                      radial-gradient(circle at bottom left, rgba(200, 157, 85, 0.25) 0%, transparent 50%),
                      radial-gradient(circle at 50% 50%, rgba(254, 252, 248, 1) 0%, rgba(251, 246, 234, 0.95) 100%)`,
  };

  return (
    <div 
      className="relative min-h-screen champagne-gradient transition-all duration-700 ease-in-out"
      dir="rtl" // Right-to-Left Hebrew alignment
    >
      {/* Background layer: Locked to exquisite elegant defaults */}
      <div 
        className="fixed inset-0 bg-cover bg-center transition-all duration-500 z-0" 
        style={defaultBackgroundStyle}
      />

      {/* Decorative premium floral watermark patterns underneath the main UI */}
      <div className="fixed inset-0 pointer-events-none opacity-8 select-none z-0 overflow-hidden">
        <svg className="absolute -top-12 -left-12 w-96 h-96 text-gold-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="0.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.727l.707-.707M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <svg className="absolute -bottom-24 -right-24 w-[32rem] h-[32rem] text-gold-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="0.3">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 111.063.852l-.041.02a.75.75 0 11-1.063-.852zM12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm0 14.25a4.5 4.5 0 100-9 4.5 4.5 0 000 9z" />
        </svg>
      </div>

      {/* Main Content App Shell */}
      <div className="relative z-10 w-full select-text pb-20">
        {children}
      </div>
    </div>
  );
}
