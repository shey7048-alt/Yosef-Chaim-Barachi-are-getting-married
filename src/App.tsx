import React, { useRef } from 'react';
import { Heart } from 'lucide-react';
import BackgroundOverlay from './components/BackgroundOverlay';
import HeroSection from './components/HeroSection';
import CalendarSection from './components/CalendarSection';

export default function App() {
  // Target Wedding Date: August 10, 2026, at 7:00 PM (19:00:00)
  const weddingDate = new Date('2026-08-10T19:00:00');
  
  const calendarRef = useRef<HTMLDivElement>(null);

  const handleScrollToCalendar = () => {
    calendarRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <BackgroundOverlay>
      {/* 1. Hero / Screen-Fill Top Section with live real-time countdown widget */}
      <HeroSection 
        weddingDate={weddingDate} 
        onScrollToCalendar={handleScrollToCalendar} 
      />

      {/* 2. Transition Divider Floral Accent */}
      <div className="flex justify-center items-center py-10 opacity-60">
        <span className="h-[1px] w-24 bg-gradient-to-r from-transparent to-gold-400"></span>
        <Heart className="w-5 h-5 mx-4 text-gold-500 fill-gold-250 animate-pulse" />
        <span className="h-[1px] w-24 bg-gradient-to-r from-gold-400 to-transparent"></span>
      </div>

      {/* 3. Interactive Progression Calendar Section (Below the fold / on scroll) */}
      <div ref={calendarRef} className="scroll-mt-10">
        <CalendarSection weddingDate={weddingDate} />
      </div>

      {/* 4. Elegant, minimal Hebrew Footer */}
      <footer className="text-center text-[11px] tracking-wider text-stone-500 pt-16 pb-8 pointer-events-none select-none border-t border-gold-200/10">
        <p>© 2026 אתר החתונה של יוסף חיים &amp; ברכי</p>
        <p className="text-[10px] text-stone-400 mt-1.5">כ"ז באב ה'תשפ"ו • 10.08.2026</p>
      </footer>
    </BackgroundOverlay>
  );
}
