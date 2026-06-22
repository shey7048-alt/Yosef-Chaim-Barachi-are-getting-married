import React from 'react';

export default function DailyQuoteCalendar() {
  return (
    <div 
      id="desktop-desk-calendar"
      className="fixed top-8 left-8 z-[45] pointer-events-auto select-none"
    >
      {/* 
        3D Viewport Scene
        Applying custom CSS perspective to align perfectly with the camera angle of the uploaded image.
      */}
      <div 
        className="relative w-[300px] h-[230px] transition-all duration-500 hover:scale-[1.03] hover:translate-y-[-2px]"
        style={{
          perspective: '1500px',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* ================= PART 1: KRAFT EARTHEN CARDBOARD CARD STAND ================= */}
        {/* 
          1A. The Main Cardboard Backboard Front Plane.
          Matches the natural, warm matte kraft-paper color (#b69d84 / #c0aa93) of the uploaded reference.
        */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-[#c8b19a] via-[#baa188] to-[#ab9279] border border-[#a68c73] rounded-sm shadow-[0_16px_36px_rgba(0,0,0,0.35),0_3px_12px_rgba(0,0,0,0.2)]"
          style={{
            transform: 'rotateX(14deg) rotateY(24deg) rotateZ(-3deg)',
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
          }}
        >
          {/* Subtle horizontal carton fibers / paper texture lines */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:100%_4px] opacity-40 mix-blend-overlay rounded-sm" />
          
          {/* Highlight along the card top edge */}
          <div className="absolute top-0 inset-x-0 h-[1.5px] bg-[#dfcbba] opacity-50" />
          
          {/* Double thickness bevel at bottom of cardboard edge */}
          <div className="absolute bottom-0 inset-x-0 h-3.5 bg-gradient-to-t from-[#8d755f] to-[#baa188] border-t border-[#9d846b] rounded-b-sm" />
        </div>

        {/* 
          1B. Visible Left Triangular Support Fold (Easel Wing).
          In the uploaded image, the calendar is angled such that the left folding support board is highly visible.
          Using custom skew and rotations to align perfectly with the left face of the easel.
        */}
        <div 
          className="absolute left-[-21px] top-[14px] bottom-[3px] w-[46px] bg-gradient-to-r from-[#ab9279] via-[#baa188] to-[#baa188] border-r border-[#967c64] shadow-inner"
          style={{
            transform: 'rotateX(14deg) rotateY(-66deg) rotateZ(-3deg) skewY(14deg)',
            transformOrigin: 'right center',
            borderRadius: '2px 0 0 2px',
          }}
        >
          {/* Distinct darker shadows representing the hollow inside of the folding easel A-frame support */}
          <div className="absolute inset-0 bg-gradient-to-l from-black/40 via-black/10 to-transparent pointer-events-none" />
          
          {/* Paper thickness fold ridge representation */}
          <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-[#dfcbba]/30" />
          
          {/* Tiny subtle inner hinge crease */}
          <div className="absolute left-3 top-[10%] bottom-[10%] w-[1.5px] border-l border-dashed border-[#8d755f]/60 opacity-40" />
        </div>

        {/* ================= PART 2: PREMIUM TEXTURED CARD STOCK PAGES ================= */}
        {/* 
          Layered effect to show the realistic thickness of notebook pages (stacked appearance on the bottom/right).
        */}
        {/* Layer 2 (Slightly offset back page shadow representation) */}
        <div 
          className="absolute inset-x-3.5 top-4.5 bottom-8.5 bg-[#e3ded4] rounded-sm border border-stone-300 opacity-90 shadow-sm"
          style={{
            transform: 'rotateX(14deg) rotateY(24deg) rotateZ(-3deg) translateZ(3px)',
          }}
        />

        {/* Layer 1 (Primary Front Calendar Page Card) */}
        {/* Beautiful high-grain heavy watercolor paper texture with rounded bottom edges */}
        <div 
          className="absolute inset-x-3.5 top-4 bottom-8 bg-gradient-to-br from-[#faf9f6] via-[#f5f2eb] to-[#eceae0] rounded-[3px] border-b-[2px] border-r border-[#d4cfc1] shadow-[0_10px_22px_rgba(0,0,0,0.22),inset_0_1.5px_2px_rgba(255,255,255,0.95)] overflow-hidden flex flex-col"
          style={{
            transform: 'rotateX(14deg) rotateY(24deg) rotateZ(-3deg) translateZ(6px)',
          }}
        >
          {/* Premium Fine Art Paper fiber overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:3px_3px] opacity-[0.03] mix-blend-multiply pointer-events-none" />
          
          {/* Row of clean circular punch binder holes at the top of the sheet */}
          <div className="h-[26px] bg-[#f5f2eb] border-b border-[#e5e1d5] flex items-center justify-between px-4 relative">
            <div className="absolute -top-[1px] inset-x-2.5 flex justify-between">
              {Array.from({ length: 16 }).map((_, i) => (
                <div 
                  key={i} 
                  className="w-1.5 h-2 bg-gradient-to-b from-stone-900 via-stone-950 to-[#baa188]/30 rounded-full border-b border-white/50 shadow-inner" 
                />
              ))}
            </div>

            {/* Subtle calendar page brand title watermark in gold tint */}
            <div className="w-full flex justify-between items-center text-[7.5px] text-[#baa188] font-mono tracking-widest mt-1 opacity-70">
              <span>EST. COURT PAPERS</span>
              <span>№ 10.08.26</span>
            </div>
            
            {/* Visual dashed tear line indicating high quality craftsmanship */}
            <div className="absolute bottom-0 inset-x-0 h-[1px] border-b border-dashed border-stone-300" />
          </div>

          {/* Blank watercolor paper center workspace */}
          <div className="flex-1 p-4 flex flex-col justify-between items-center relative">
            {/* Subtle elegant border frame imprint on the watercolor book plate */}
            <div className="absolute inset-2 border border-[#eae6db] rounded-sm pointer-events-none" />
            
            {/* Soft decorative shadow gradient giving the paper card curvature depth */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#000]/[0.02] via-transparent to-[#fff]/40 pointer-events-none" />

            <div className="flex-1 flex flex-col items-center justify-center p-2 z-10">
              {/* Gold foiled decorative line divider */}
              <div className="w-8 h-[1px] bg-gradient-to-r from-transparent via-[#cfae8f] to-transparent mb-2" />
              <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#cfae8f] to-transparent opacity-60" />
            </div>
          </div>
        </div>

        {/* ================= PART 3: HEAVY METAL SPIRAL BINDING DUAL-RINGS ================= */}
        {/* 
          Dual metal wire loop ring elements running through paper punch holes.
          Perfect silver/gold shiny chrome highlights reflecting natural desk lighting.
        */}
        <div 
          className="absolute -top-[5px] left-[18px] right-[20px] h-[21px] flex justify-between z-30"
          style={{
            transform: 'rotateX(14deg) rotateY(24deg) rotateZ(-3deg) translateZ(11px)',
          }}
        >
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="relative w-3.5 h-full flex gap-[1.5px]">
              {/* Primary binder coil wire */}
              <div 
                className="w-[2.5px] h-full rounded-full border-t border-l border-b border-[#a8a195] bg-gradient-to-b from-zinc-200 via-zinc-400 to-[#736e65] shadow-md"
                style={{
                  transform: 'rotateY(16deg)',
                }}
              />
              {/* Double wire spiral offset loop wire matching the reference photo */}
              <div 
                className="w-[2.5px] h-full rounded-full border-t border-l border-b border-[#9c9488] bg-gradient-to-b from-zinc-100 via-zinc-450 to-[#666158] shadow-md -ml-[1.5px]"
                style={{
                  transform: 'rotateY(-16deg)',
                }}
              />
            </div>
          ))}
        </div>

        {/* ================= PART 4: DESK AMBIENT DROP SHADOW ================= */}
        {/* Realistic heavy diffuse drop shadow onto the desk surface below */}
        <div 
          className="absolute bottom-[-14px] left-[-15px] right-2 h-7 bg-black/45 blur-lg rounded-full pointer-events-none"
          style={{
            transform: 'rotateX(80deg) rotateY(5deg) rotateZ(16deg) scaleX(1.2) scaleY(0.9)',
            zIndex: -1,
          }}
        />
      </div>
    </div>
  );
}
