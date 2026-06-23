import React, { useState, useEffect } from 'react';
import { Quote, Sparkles, Heart } from 'lucide-react';

interface DailyQuoteCalendarProps {
  timeOffset?: number;
}

interface QuoteItem {
  quote: string;
  theme: 'love' | 'joy' | 'peace' | 'hope' | 'eternity';
}

// Exactly 17 proverbs as provided by the user.
const WEDDING_QUOTES: QuoteItem[] = [
  {
    quote: "עוד מעט, והציפייה תהפוך למציאות שבה אנחנו צועדים יחד כל החיים",
    theme: 'love'
  },
  {
    quote: "הבית שנבנה הוא השתקפות של כל הציפיות והתפילות שאנחנו נושאים היום",
    theme: 'eternity'
  },
  {
    quote: "כל רגע של ציפייה הוא תפילה שקטה לזכות לבנות בית נאמן בישראל",
    theme: 'peace'
  },
  {
    quote: "הלב שלי סופר את הדקות, לא רק את הימים, לקראת היום שבו נהיה שותפים",
    theme: 'love'
  },
  {
    quote: "הציפייה היא גשר של תפילות שמחבר בין החלום למציאות",
    theme: 'hope'
  },
  {
    quote: "ימי הציפייה הם ימי ההתקדשות שקודמים למתן תורה הפרטי שלנו",
    theme: 'eternity'
  },
  {
    quote: "אנו מצפים ליום שבו נתחיל לכתוב את הפרק המשותף והכי יפה בחיים שלנו",
    theme: 'joy'
  },
  {
    quote: "הציפייה היא כמו ניגון עדין שמתנגן בלב ומלווה את כל היום",
    theme: 'peace'
  },
  {
    quote: "בכל בוקר, הציפייה מעניקה לי כוח ומשמעות ליום החדש שנפתח",
    theme: 'hope'
  },
  {
    quote: "40 יום של ציפייה הם המתנה הכי יפה שהענקנו לעצמנו עוד לפני שהתחלנו",
    theme: 'eternity'
  },
  {
    quote: "לעיתים ההמתנה קשה, אך הידיעה על הבית שייבנה הופכת אותה למתוקה",
    theme: 'peace'
  },
  {
    quote: "הלב שלי מלא בהכרת הטוב על הדרך שעברנו ועל הדרך שלפנינו",
    theme: 'love'
  },
  {
    quote: "הציפייה מזכירה לי כמה היקר הזה חשוב וראוי לכל רגע של המתנה",
    theme: 'eternity'
  },
  {
    quote: "כל יום שעובר הוא סימן לכך שהחלום הופך למציאות בהירה",
    theme: 'hope'
  },
  {
    quote: "הלב פועם בתדר של שמחה וציפייה ליום הגדול והקדוש",
    theme: 'joy'
  },
  {
    quote: "תודה על הזכות לצפות, לחכות ולבנות יחד",
    theme: 'love'
  },
  {
    quote: "נמשיך לצפות, נמשיך להתפלל, עד ליום המאושר",
    theme: 'hope'
  }
];

export default function DailyQuoteCalendar({ timeOffset = 0 }: DailyQuoteCalendarProps) {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [activeQuoteIndex, setActiveQuoteIndex] = useState<number>(0);

  // Fallback testing start date for development (before 2026)
  const getFallbackStartDate = (now: Date): Date => {
    const stored = localStorage.getItem('wedding_quotes_start_date');
    if (stored) {
      const parsed = new Date(stored);
      if (!isNaN(parsed.getTime())) {
        return parsed;
      }
    }
    const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    localStorage.setItem('wedding_quotes_start_date', todayMidnight.toISOString());
    return todayMidnight;
  };

  // Compute number of days passed since start date June 23, 2026
  // This makes sure Day 1 starts precisely on June 23, 2026, and transitions cleanly, one day at a time!
  const getDaysSinceStart = (date: Date): number => {
    const start = (date.getFullYear() >= 2026) ? new Date(2026, 5, 23) : getFallbackStartDate(date);
    const today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const diffTime = today.getTime() - start.getTime();
    return Math.max(0, Math.floor(diffTime / (1000 * 60 * 60 * 24)));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      if (timeOffset) {
        setCurrentDate(new Date(now.getTime() + timeOffset));
      } else {
        setCurrentDate(now);
      }
    }, 1000);

    const initialNow = new Date();
    const resolvedDate = timeOffset ? new Date(initialNow.getTime() + timeOffset) : initialNow;
    setCurrentDate(resolvedDate);

    // Get number of days since start date to yield current daily quote index (0-16)
    const diffDays = getDaysSinceStart(resolvedDate);
    const resolvedIndex = Math.min(diffDays, 16);
    setActiveQuoteIndex(resolvedIndex);

    return () => clearInterval(timer);
  }, [timeOffset]);

  const activeQuote = WEDDING_QUOTES[activeQuoteIndex];
  const dayNameRaw = currentDate.toLocaleDateString('he-IL', { weekday: 'long' });

  return (
    <div 
      id="desktop-desk-calendar"
      className="fixed top-5 left-5 z-[45] pointer-events-none select-none scale-95 sm:scale-100 origin-top-left animate-fade-in"
    >
      {/* Clean floating wrapper holding the beautiful handmade paper sheets (no outer grey halo/frosted backdrop) */}
      <div className="relative w-[265px] h-[225px] flex items-center justify-center overflow-visible">
        
        {/* Underlayer 3: Deep charcoal black paper layer */}
        <div 
          className="absolute inset-x-7 bottom-5 top-5 bg-[#0D0D0E] border border-white/5 shadow-sm pointer-events-none opacity-60"
          style={{
            borderRadius: '16px 12px 14px 18px / 14px 16px 13px 15px',
            transform: 'rotate(0.5deg) translate(0px, 4px)'
          }}
        />

        {/* Underlayer 2: Dark carbon black handmade page */}
        <div 
          className="absolute inset-x-6 bottom-5 top-5 bg-[#121214] border border-white/5 shadow-md pointer-events-none opacity-90"
          style={{
            borderRadius: '13px 17px 12px 16px / 16px 13px 17px 12px',
            transform: 'rotate(-1deg) translate(1px, 2px)'
          }}
        />

        {/* Underlayer 1: Soft tactile onyx paper layer */}
        <div 
          className="absolute inset-x-5 bottom-5 top-5 bg-[#161619] border border-white/10 shadow-lg pointer-events-none"
          style={{
            borderRadius: '15px 13px 18px 14px / 12px 15px 14px 16px',
            transform: 'rotate(1.5deg) translate(-1px, 1px)'
          }}
        />

        {/* Top Primary Keepsake Sheet: Luxurious matte-black deckled-edge textured paper */}
        <div 
          className="absolute inset-x-5 bottom-5 top-5 bg-[#1A1A1E] border border-white/15 shadow-[4px_12px_28px_rgba(0,0,0,0.7)] p-4 flex flex-col justify-between pointer-events-none overflow-hidden"
          style={{
            borderRadius: '14px 11px 16px 12px / 11px 16px 12px 15px',
            transform: 'rotate(-4deg) translate(-3px, -1px)',
            backgroundImage: 'radial-gradient(#2A2A30 0.8px, transparent 0.8px), radial-gradient(#2A2A30 0.8px, #1A1A1E 0.8px)',
            backgroundSize: '24px 24px',
            backgroundPosition: '0 0, 12px 12px'
          }}
        >
          {/* Deckled Edge Fibers/Fraying Overlay simulation on margins */}
          <div className="absolute inset-y-0 left-0 w-[4px] bg-gradient-to-r from-white/5 via-white/10 to-transparent" />
          <div className="absolute inset-y-0 right-0 w-[4px] bg-gradient-to-l from-white/5 via-white/10 to-transparent" />
          <div className="absolute inset-x-0 top-0 h-[4px] bg-gradient-to-b from-white/5 via-white/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-[4px] bg-gradient-to-t from-white/5 via-white/10 to-transparent" />

          {/* Top Row: Weekday Name (Brilliant Gold) & Ornament (Elegant Gold Heart/Sparkle) */}
          <div className="flex justify-between items-center pb-2 border-b border-white/10 w-full mt-0.5">
            {/* Elegant, clean modern gold weekday heading */}
            <span 
              className="font-sans font-medium text-[11px] tracking-wider text-amber-400 uppercase pl-1"
              style={{ letterSpacing: '0.08em' }}
            >
              {dayNameRaw}
            </span>

            {/* Micro Gold Keepsake Ornament */}
            <div className="flex items-center">
              {activeQuote.theme === 'love' ? (
                <Heart className="w-3.5 h-3.5 text-amber-400 fill-amber-400/10" />
              ) : (
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              )}
            </div>
          </div>

          {/* Central Quote Body - Rendered in a Stunning Golden Foil hot-stamped look */}
          <div className="flex-1 flex flex-col justify-center py-2 relative">
            <Quote className="w-4 h-4 text-amber-400/10 absolute -top-1 right-0" />
            
            <p 
              className="bg-gradient-to-br from-[#FFF3D1] via-[#E2B755] to-[#B88E2F] bg-clip-text text-transparent font-serif text-[13.5px] sm:text-[14.5px] font-bold leading-relaxed text-center px-1 max-h-[90px] overflow-hidden select-none" 
              dir="rtl"
              style={{
                fontFamily: "'Playfair Display', 'Inter', serif",
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.9))'
              }}
            >
              {activeQuote.quote}
            </p>
          </div>

          {/* Delicate Soft Gold Central Footer Accent Divider */}
          <div className="w-full flex justify-center items-center pb-1">
            <div className="w-8 h-[1px] bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />
          </div>

        </div>

      </div>
    </div>
  );
}
