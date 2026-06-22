import React from 'react';

export default function DailyQuoteCalendar() {
  return (
    <div 
      id="desktop-desk-calendar"
      className="fixed top-8 left-8 z-[45] pointer-events-auto select-none"
    >
      {/* 
        3D Viewport Scene 
        Applying high CSS perspective to establish a realistic rendering space
      */}
      <div 
        className="relative w-[280px] h-[220px] transition-transform duration-500 hover:scale-[1.02]"
        style={{
          perspective: '1200px',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* ================= PART 1: THE 3D A-FRAME MATE STAND (TENT STRUCTURE) ================= */}
        {/* 
          1A. Front Supporting Backboard Slide
          Using complex transformations and border bevels to simulate thick dense cardboard material
        */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-stone-800 via-stone-850 to-stone-900 border border-stone-750 rounded-lg shadow-[0_12px_28px_rgba(0,0,0,0.5),0_2px_8px_rgba(0,0,0,0.3)]"
          style={{
            transform: 'rotateX(15deg) rotateY(-22deg) rotateZ(1.5deg)',
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
          }}
        >
          {/* Beveled heavy paperboard thickness styling at the bottom fold */}
          <div className="absolute bottom-0 inset-x-0 h-4 bg-gradient-to-t from-stone-950 to-stone-900 border-t border-stone-800 rounded-b-md" />
          
          {/* Internal shadow representation representing the hinge depth */}
          <div className="absolute top-0 bottom-4 left-0 w-[1px] bg-gradient-to-b from-stone-700/20 via-transparent to-stone-900/50" />
        </div>

        {/* 
          1B. Isometric Side Profile Triangle (Easel Hinge)
          This visual represents the actual 3-dimensional shape, displaying the folded triangular cardboard profile
        */}
        <div 
          className="absolute right-[-14px] top-[14px] bottom-[3px] w-[32px] bg-gradient-to-l from-stone-900 via-stone-850 to-stone-800 border-l border-b border-stone-700/60"
          style={{
            transform: 'rotateX(15deg) rotateY(68deg) rotateZ(1.5deg) skewY(-14.5deg)',
            transformOrigin: 'left center',
            borderRadius: '0 4px 4px 0',
          }}
        >
          {/* Subtle inside shadow indicating the folded dark canvas texture */}
          <div className="absolute inset-0.5 border-r border-stone-700/40 opacity-20" />
        </div>

        {/* ================= PART 2: THE PREMIUM PAPER CALENDAR PACKET (THE PAGES) ================= */}
        {/* 
          2A. The Hanging Premium Card Paper Page Block
          Slightly offset forward in 3D space (using translateZ) and rotated with custom shadows for high depth
        */}
        <div 
          className="absolute inset-x-3.5 top-4 bottom-8 bg-gradient-to-br from-neutral-50 via-amber-50/50 to-stone-100 rounded border-b-2 border-r border-stone-300 shadow-[0_8px_20px_rgba(0,0,0,0.3),inset_0_1px_2px_white]"
          style={{
            transform: 'rotateX(15deg) rotateY(-22deg) rotateZ(1.5deg) translateZ(8px)',
          }}
        >
          {/* 
            Binder punched holes along the top of the white paper page 
          */}
          <div className="absolute top-1 inset-x-3 flex justify-between">
            {Array.from({ length: 14 }).map((_, i) => (
              <div 
                key={i} 
                className="w-1.5 h-1.5 bg-stone-900 rounded-full border-b border-white/60 shadow-inner opacity-90" 
              />
            ))}
          </div>

          {/* Minimal visual representation of a premium blank page texture background */}
          <div className="absolute inset-0 p-3 mt-3 flex flex-col justify-between opacity-40">
            {/* Soft water-mark lines simulating expensive high-grain premium stationary stock */}
            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-stone-300/40 to-transparent" />
            <div className="h-[2px] w-3/4 bg-gradient-to-r from-transparent via-stone-300/30 to-transparent mx-auto" />
            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-stone-300/40 to-transparent" />
          </div>
        </div>

        {/* ================= PART 3: TOP WIRE SPIRAL BINDING ASSEMBLY ================= */}
        {/* 
          Steel dual-rings along the top connecting backboard stand and front pages.
          Offset in space to perfectly align between stand and container planes.
        */}
        <div 
          className="absolute -top-[6px] left-[20px] right-[24px] h-[22px] flex justify-between z-30"
          style={{
            transform: 'rotateX(15deg) rotateY(-22deg) rotateZ(1.5deg) translateZ(12px)',
          }}
        >
          {Array.from({ length: 14 }).map((_, i) => (
            <div key={i} className="relative w-3 h-full flex gap-[1px]">
              {/* Individual metal spiral loop */}
              <div 
                className="w-[3px] h-full rounded-full border-t border-l border-b border-stone-400 bg-gradient-to-b from-zinc-300 via-amber-100/35 to-stone-500 shadow-md"
                style={{
                  transform: 'rotateY(12deg)',
                }}
              />
              <div 
                className="w-[2px] h-full rounded-full border-t border-l border-b border-stone-450 bg-gradient-to-b from-zinc-200 via-transparent to-stone-600 shadow-md -ml-[1px]"
                style={{
                  transform: 'rotateY(-12deg)',
                }}
              />
            </div>
          ))}
        </div>

        {/* ================= PART 4: CAST AMBIENT FLOOR SHADOW ================= */}
        {/* Realistic drop-shadow on the desktop base representation */}
        <div 
          className="absolute bottom-[-16px] left-[-10px] right-2 h-8 bg-black/40 blur-md rounded-full pointer-events-none"
          style={{
            transform: 'rotateX(82deg) rotateY(-5deg) rotateZ(-18deg) scaleX(1.15)',
            zIndex: -1,
          }}
        />
      </div>
    </div>
  );
}
