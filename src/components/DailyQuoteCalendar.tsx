import React from 'react';

export default function DailyQuoteCalendar() {
  return (
    <div 
      id="desktop-desk-calendar"
      className="fixed top-8 left-8 z-[45] pointer-events-auto select-none"
    >
      {/* 
        3D Viewport Scene
        Applying perspective to match the exact physical camera angle in the uploaded image.
      */}
      <div 
        className="relative w-[320px] h-[256px] transition-transform duration-500 hover:scale-[1.03]"
        style={{
          perspective: '1500px',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* ================= PART 1: THE RECYCLED BROWN-GREY KRAFT STAND ================= */}
        {/* 
          1A. The Backing Board (matte cardboard surface).
          Matches the exact earthy charcoal-toned grey-brown cardboard in the image.
        */}
        <div 
          className="absolute inset-[4px] bottom-0 bg-gradient-to-br from-[#534e48] via-[#48433d] to-[#3a3631] rounded-[4px] border border-[#5d5751] shadow-[0_12px_32px_rgba(0,0,0,0.4),0_3px_8px_rgba(0,0,0,0.2)]"
          style={{
            transform: 'rotateX(14deg) rotateY(22deg) rotateZ(-2.5deg)',
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
          }}
        >
          {/* Subtle horizontal cardboard matte grain texture */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:6px_6px] opacity-[0.03] mix-blend-overlay rounded-[4px]" />
          
          {/* Beveled edge lines for physical thickness */}
          <div className="absolute top-0 inset-x-0 h-[1.5px] bg-[#6d6761] opacity-40" />
          
          {/* Tall Cardboard Base footer below the page sheet (just like in the photo) */}
          <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-[#2a2724] to-[#433e38] border-t border-[#36322e] rounded-b-[4px]" />
        </div>

        {/* 
          1B. The Left Triangular A-Frame fold (Highly visible on the left in the photo).
          Specially angled skew to represent the hollow folder stand.
        */}
        <div 
          className="absolute left-[-22px] top-[14px] bottom-[3px] w-[50px] bg-gradient-to-r from-[#312e2a] via-[#433f3a] to-[#4c4741] border-r border-[#3a3632] shadow-inner"
          style={{
            transform: 'rotateX(14deg) rotateY(-68deg) rotateZ(-2.5deg) skewY(13.5deg)',
            transformOrigin: 'right center',
            borderRadius: '3px 0 0 3px',
          }}
        >
          {/* Cast shadow in the triangular folder pocket */}
          <div className="absolute inset-0 bg-gradient-to-l from-black/50 via-black/20 to-transparent" />
          
          {/* Cardboard fold line reflection */}
          <div className="absolute right-0 top-0 bottom-0 w-[1.5px] bg-white/10" />
        </div>

        {/* ================= PART 2: THE LAID TEXTURED WATERCOLOR PAPER PACK ================= */}
        {/* 
          2A. Stack layer behind standard page for realistic thick paper depth
        */}
        <div 
          className="absolute left-5 right-3 top-[18px] bottom-12 bg-[#dfdbd3] rounded-sm opacity-90 shadow-sm"
          style={{
            transform: 'rotateX(14deg) rotateY(22deg) rotateZ(-2.5deg) translateZ(3px)',
          }}
        />

        {/* 
          2B. The Principal Calendar Page Sheet.
          Warm, clean ivory-white cardstock paper with thick build quality.
        */}
        <div 
          className="absolute left-4.5 right-2.5 top-4 bottom-11 bg-gradient-to-b from-[#fbfbfa] via-[#faf7f0] to-[#f3efe4] rounded-sm border border-[#cfcbc0] shadow-[0_8px_18px_rgba(0,0,0,0.25),inset_0_1px_2px_rgba(255,255,255,0.9)] overflow-hidden flex flex-col"
          style={{
            transform: 'rotateX(14deg) rotateY(22deg) rotateZ(-2.5deg) translateZ(6px)',
          }}
        >
          {/* Exquisite watercolor fiber grain texture pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:4px_4px] opacity-[0.02] mix-blend-multiply pointer-events-none" />

          {/* Bound punched holes header block */}
          <div className="h-[28px] bg-[#fdfdfc] border-b border-[#e7e3d8] flex items-center justify-between px-4 relative">
            <div className="absolute -top-[1.5px] inset-x-2 flex justify-between">
              {Array.from({ length: 22 }).map((_, i) => (
                <div 
                  key={i} 
                  className="w-[5px] h-2.5 bg-gradient-to-b from-[#1c1917] via-[#2a2521] to-[#443e38]/30 rounded-full border-b border-white/50 shadow-inner" 
                />
              ))}
            </div>

            {/* Micro-perforated page line */}
            <div className="absolute bottom-0 inset-x-0 h-[1px] border-b border-dashed border-[#d1cdc0]/60" />
          </div>

          {/* Center Matte Blank Sheet Presentation Area */}
          <div className="flex-1 p-5 flex flex-col justify-between items-center relative">
            <div className="absolute inset-2 border border-[#f0ece0]/80 rounded-sm pointer-events-none" />
            
            {/* Ambient gradients across the physical paper sheet */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#000000]/[0.01] via-transparent to-white/30 pointer-events-none" />

            <div className="flex-1 flex flex-col items-center justify-center p-3 opacity-35">
              <div className="w-10 h-[1.5px] bg-gradient-to-r from-transparent via-[#b4ae9d] to-transparent mb-2" />
              <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#b4ae9d] to-transparent opacity-60" />
            </div>
          </div>
        </div>

        {/* ================= PART 3: SILVER COIL SPRING SYSTEM ================= */}
        {/* 
          Matches the silver metal loop wire rings from the uploaded reference photo, 
          which double-loop and curve continuously across the top punch holes.
        */}
        <div 
          className="absolute -top-[6px] left-[26px] right-[24px] h-[22px] flex justify-between z-30 pointer-events-none"
          style={{
            transform: 'rotateX(14deg) rotateY(22deg) rotateZ(-2.5deg) translateZ(12px)',
          }}
        >
          {Array.from({ length: 22 }).map((_, i) => (
            <div key={i} className="relative w-[10px] h-full flex gap-[1px]">
              {/* Outer Wire Ring */}
              <div 
                className="w-[2px] h-full rounded-full border-t border-l border-b border-[#b1aba0] bg-gradient-to-b from-white via-zinc-400 to-[#504c45] shadow-sm"
                style={{
                  transform: 'rotateY(14deg)',
                }}
              />
              {/* Secondary loop coil representing the dual metal binding style */}
              <div 
                className="w-[2px] h-full rounded-full border-t border-l border-b border-[#9c968c] bg-gradient-to-b from-zinc-100 via-zinc-350 to-[#4a463f] shadow-sm -ml-[1.5px]"
                style={{
                  transform: 'rotateY(-14deg)',
                }}
              />
            </div>
          ))}
        </div>

        {/* ================= PART 4: DESK AMBIENT DROP SHADOW ================= */}
        {/* Shadow cast on the desktop floor plane */}
        <div 
          className="absolute bottom-[-16px] left-[-16px] right-2 h-[30px] bg-black/50 blur-xl rounded-full pointer-events-none"
          style={{
            transform: 'rotateX(78deg) rotateY(6deg) rotateZ(16deg) scaleX(1.15) scaleY(0.85)',
            zIndex: -1,
          }}
        />
      </div>
    </div>
  );
}
