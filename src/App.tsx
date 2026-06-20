import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { Heart, Landmark, Clock, MapPin, Sparkles, MessageSquareHeart } from 'lucide-react';
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
      {/* 1. Hero / Screen-Fill Top Section */}
      <HeroSection 
        weddingDate={weddingDate} 
        onScrollToCalendar={handleScrollToCalendar} 
      />

      {/* 2. Transition Divider Floral Accent */}
      <div className="flex justify-center items-center py-10 opacity-60">
        <span className="h-[1px] w-24 bg-gradient-to-r from-transparent to-gold-400"></span>
        <Heart className="w-5 h-5 mx-4 text-gold-500 fill-gold-200 animate-pulse" />
        <span className="h-[1px] w-24 bg-gradient-to-r from-gold-400 to-transparent"></span>
      </div>

      {/* 3. Interactive Calendar Section (Below the fold) */}
      <div ref={calendarRef} className="scroll-mt-10">
        <CalendarSection weddingDate={weddingDate} />
      </div>

      {/* 4. Elegant Event Schedule & Celebrations Section */}
      <section className="max-w-4xl mx-auto px-4 py-12" id="wedding-schedule-section">
        <div className="text-center space-y-3 mb-12">
          <Landmark className="w-5 h-5 text-gold-600 mx-auto" />
          <h2 className="text-3xl md:text-4xl font-serif text-slate-900 font-light gold-underline">
            Wedding Celebration Schedule
          </h2>
          <p className="text-stone-500 text-sm max-w-sm mx-auto italic">
            Join us in celebrating Yosef Chaim &amp; Brachi's union
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl luxury-glass border border-gold-200/20 bg-white/70 shadow-sm text-center flex flex-col items-center space-y-4 group hover:scale-[1.02] transition-transform duration-300">
            <div className="w-10 h-10 rounded-full bg-gold-50 flex items-center justify-center text-gold-600 border border-gold-200">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-gold-800 font-bold font-sans">6:00 PM</p>
              <h4 className="font-serif text-lg font-bold text-slate-900 mt-1">Kabbalat Panim</h4>
              <p className="text-stone-500 text-xs italic mt-2 font-serif">
                Reception of guests, light appetizers, and pre-ceremony blessings as the bride &amp; groom prepare.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl luxury-glass border border-gold-300 bg-white/80 shadow-md text-center flex flex-col items-center space-y-4 relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
            {/* Highlighted Chuppah design */}
            <div className="absolute top-0 right-0 p-1.5 bg-gold-500 text-white rounded-bl-xl text-[9px] uppercase tracking-widest font-bold">
              Highlight
            </div>
            <div className="w-12 h-12 rounded-full bg-gold-100 flex items-center justify-center text-gold-700 border border-gold-300 animate-pulse">
              <Heart className="w-5 h-5 text-gold-600 fill-gold-200" />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wider text-gold-900 font-extrabold font-sans">7:00 PM</p>
              <h4 className="font-serif text-xl font-bold text-gold-950 mt-1">The Chuppah</h4>
              <p className="text-stone-600 text-xs italic mt-2 font-serif font-medium">
                The sacred marriage ceremony under the wedding canopy (כ"ז באב תשפ"ו). Sanctification, blessings, and vows.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl luxury-glass border border-gold-200/20 bg-white/70 shadow-sm text-center flex flex-col items-center space-y-4 group hover:scale-[1.02] transition-transform duration-300">
            <div className="w-10 h-10 rounded-full bg-gold-50 flex items-center justify-center text-gold-600 border border-gold-200">
              <Sparkles className="w-4 h-4 text-gold-600" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-gold-800 font-bold font-sans">8:30 PM Onwards</p>
              <h4 className="font-serif text-lg font-bold text-slate-900 mt-1">Festive Dinner &amp; Dancing</h4>
              <p className="text-stone-500 text-xs italic mt-2 font-serif">
                Join us in the grand ballroom for a magnificent dinner, joyful dancing, and celebratory cheers for the newlyweds!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Heartfelt Wishes & Blessings board */}
      <section className="max-w-4xl mx-auto px-4 py-12" id="wishes-board">
        <div className="p-8 md:p-12 rounded-3xl luxury-glass border border-gold-200/30 bg-white/75 shadow-lg relative overflow-hidden">
          <div className="absolute right-0 top-0 opacity-5 pointer-events-none select-none">
            <MessageSquareHeart className="w-64 h-64 text-gold-900" />
          </div>

          <div className="max-w-2xl mx-auto text-center space-y-6">
            <MessageSquareHeart className="w-8 h-8 text-gold-600 mx-auto" />
            <h3 className="text-3xl font-serif text-slate-900 font-bold">
              Send Your Blessings
            </h3>
            <p className="text-stone-600 text-sm font-serif italic">
              "עוד ישמע בערי יהודה ובחוצות ירושלים קול ששון וקול שמחה קול חתן וקול כלה"
            </p>
            <p className="text-stone-500 text-xs italic max-w-lg mx-auto leading-relaxed">
              We are so excited to celebrate our wedding. Share your warm wishes, mazal tov notes, or sweet memories directly with Yosef Chaim &amp; Brachi!
            </p>

            <form 
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thank you so much! Your heartfelt blessing has been recorded locally (Simulated). We will review it as we approach the big day!");
              }}
              className="space-y-4 pt-4"
              id="wishes-form"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="Your Name(s)" 
                  required
                  className="w-full px-4 py-3 text-xs bg-white/70 border border-gold-200 hover:border-gold-300 focus:border-gold-500 focus:outline-none rounded-xl transition-all text-neutral-800 font-medium"
                />
                <input 
                  type="email" 
                  placeholder="Your Email Address" 
                  required
                  className="w-full px-4 py-3 text-xs bg-white/70 border border-gold-200 hover:border-gold-300 focus:border-gold-500 focus:outline-none rounded-xl transition-all text-neutral-800 font-medium"
                />
              </div>
              <textarea 
                rows={3}
                placeholder="Write your wishes, blessings, or Mazal Tov notes..." 
                required
                className="w-full p-4 text-xs bg-white/70 border border-gold-200 hover:border-gold-300 focus:border-gold-500 focus:outline-none rounded-xl resize-none transition-all text-neutral-800 font-medium"
              />
              <button
                type="submit"
                className="px-8 py-3 bg-gold-600 text-white rounded-xl text-xs font-semibold hover:bg-gold-700 transition-all shadow-md active:scale-95 cursor-pointer uppercase tracking-wider"
              >
                Send Blessings
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 6. Simple aesthetic Footer */}
      <footer className="text-center text-[10px] tracking-wider uppercase text-stone-500 pt-12 pb-4 pointer-events-none select-none">
        <p>© 2026 Yosef Chaim &amp; Brachi's Countdown Website</p>
        <p className="text-[9px] text-stone-400 mt-1">כ"ז באב תשפ"ו • August 10, 2026</p>
      </footer>
    </BackgroundOverlay>
  );
}
