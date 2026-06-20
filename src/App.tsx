import React, { useRef, useState, useEffect } from 'react';
import { Heart, Wifi } from 'lucide-react';
import BackgroundOverlay from './components/BackgroundOverlay';
import HeroSection from './components/HeroSection';
import CalendarSection from './components/CalendarSection';

export default function App() {
  // Target Wedding Date: August 10, 2026, at 7:00 PM (19:00:00)
  const weddingDate = new Date('2026-08-10T19:00:00');
  
  const calendarRef = useRef<HTMLDivElement>(null);

  // Time-Sync state: computes difference between official API time for Jerusalem and client's device clock
  const [timeOffset, setTimeOffset] = useState<number>(0);
  const [syncStatus, setSyncStatus] = useState<'syncing' | 'synced' | 'local'>('syncing');

  useEffect(() => {
    let active = true;
    
    const fetchExactTime = async () => {
      try {
        // Primary Attempt: WorldTimeAPI (Jerusalem time)
        const res = await fetch('https://worldtimeapi.org/api/timezone/Asia/Jerusalem');
        if (!res.ok) throw new Error('WorldTimeAPI response not OK');
        const data = await res.json();
        
        if (data && typeof data.unixtime === 'number') {
          const apiTimeMs = data.unixtime * 1000;
          const localTimeMs = Date.now();
          const offset = apiTimeMs - localTimeMs;
          
          if (active) {
            setTimeOffset(offset);
            setSyncStatus('synced');
            console.log(`[TimeSync] Successfully synced with Jerusalem standard time via WorldTimeAPI. Offset: ${offset}ms`);
            return;
          }
        }
      } catch (err) {
        console.warn('[TimeSync] WorldTimeAPI failed, trying fallback API...', err);
        
        try {
          // Secondary Attempt: TimeAPI.io
          const res = await fetch('https://timeapi.io/api/Time/current/zone?timeZone=Asia/Jerusalem');
          if (!res.ok) throw new Error('TimeAPI fallback not OK');
          const data = await res.json();
          
          if (data && data.milliSeconds) { // check fallback properties
            const apiTimeMs = data.milliSeconds;
            const offset = apiTimeMs - Date.now();
            if (active) {
              setTimeOffset(offset);
              setSyncStatus('synced');
              console.log(`[TimeSync] Synced via TimeAPI fallback. Offset: ${offset}ms`);
              return;
            }
          } else if (data && data.dateTime) {
            const apiTimeMs = new Date(data.dateTime).getTime();
            const offset = apiTimeMs - Date.now();
            if (active) {
              setTimeOffset(offset);
              setSyncStatus('synced');
              console.log(`[TimeSync] Synced via TimeAPI (dateTime) fallback. Offset: ${offset}ms`);
              return;
            }
          }
        } catch (errFallback) {
          console.error('[TimeSync] All time API attempts failed. Falling back gracefully to client clock.', errFallback);
          if (active) {
            setSyncStatus('local');
          }
        }
      }
    };

    fetchExactTime();

    // Re-verify periodically every 5 minutes to stay accurate
    const interval = setInterval(fetchExactTime, 5 * 60 * 1000);

    return () => {
      active = false;
      clearInterval(interval);
    };
  }, []);

  const handleScrollToCalendar = () => {
    calendarRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <BackgroundOverlay>
      {/* Live Time Sync Subtle Indicator */}
      <div className="fixed bottom-4 right-4 z-50 pointer-events-none select-none">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-900/90 text-white text-[10px] font-sans font-bold shadow-lg backdrop-blur-xs">
          <Wifi className={`w-3 h-3 ${syncStatus === 'synced' ? 'text-emerald-400 animate-pulse' : syncStatus === 'syncing' ? 'text-amber-400 animate-spin' : 'text-stone-400'}`} />
          <span>
            {syncStatus === 'synced' ? 'שעון מסונכרן לשרת' : syncStatus === 'syncing' ? 'מסנכרן שעון...' : 'שעון מקומי פעיל (לא מקוון)'}
          </span>
        </div>
      </div>

      {/* 1. Hero / Screen-Fill Top Section with live real-time countdown widget */}
      <HeroSection 
        weddingDate={weddingDate} 
        timeOffset={timeOffset}
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
        <CalendarSection 
          weddingDate={weddingDate} 
          timeOffset={timeOffset}
        />
      </div>

      {/* 4. Elegant, minimal Hebrew Footer */}
      <footer className="text-center text-[11px] tracking-wider text-stone-500 pt-16 pb-8 pointer-events-none select-none border-t border-gold-200/10">
        <p>© 2026 אתר החתונה של יוסף חיים &amp; ברכי</p>
        <p className="text-[10px] text-stone-400 mt-1.5">כ"ז באב ה'תשפ"ו • 10.08.2026</p>
      </footer>
    </BackgroundOverlay>
  );
}
