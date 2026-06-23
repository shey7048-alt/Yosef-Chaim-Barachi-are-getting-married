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
      className="fixed top-5 left-5 z-[45] pointer-events-none select-none scale-90 sm:scale-100 origin-top-left animate-fade-in"
    >
      {/* Frosted Glass Background Panel */}
      <div className="relative w-[250px] h-[210px] rounded-2xl p-4 bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.4)] flex items-center justify-center overflow-visible">
        
        {/* The tidy, perfectly straight remaining stack of sheets underneath */}
        <div className="absolute inset-x-6 bottom-4 top-4 bg-[#f1f0ea] border border-stone-200/60 rounded-lg shadow-sm transform translate-y-2 translate-x-0 opacity-40 pointer-events-none" />
        <div className="absolute inset-x-5 bottom-4 top-4 bg-[#f6f5ee] border border-stone-200/60 rounded-lg shadow-md transform translate-y-1 translate-x-0 opacity-80 pointer-events-none" />
        <div className="absolute inset-x-4 bottom-4 top-4 bg-[#faf9f3] border border-stone-200/60 rounded-lg shadow-lg transform translate-y-0 translate-x-0 pointer-events-none" />

        {/* Top Dynamic Sheet - Rotated slightly to the left, with torn/frayed aesthetic edges */}
        <div 
          className="absolute inset-x-4 bottom-4 top-4 bg-[#fcfbfa] border border-stone-300/80 rounded-lg shadow-[4px_10px_25px_rgba(0,0,0,0.22)] transform rotate-[-3.5deg] -translate-x-1 p-3 flex flex-col justify-between pointer-events-none overflow-hidden"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,0,0,0.01) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.01) 1px, transparent 1px)',
            backgroundSize: '12px 12px'
          }}
        >
          {/* Subtle textured paper frayed fiber simulation on left/right borders */}
          <div className="absolute inset-y-0 left-0 w-[2px] bg-gradient-to-r from-stone-200/20 to-transparent" />
          <div className="absolute inset-y-0 right-0 w-[2px] bg-gradient-to-l from-stone-200/20 to-transparent" />

          {/* Miniature Binder Perforations (Tear-off dots at the very top) */}
          <div className="absolute top-1.5 left-2.5 right-2.5 flex justify-between opacity-25">
            {[...Array(11)].map((_, i) => (
              <div key={i} className="w-[3px] h-[3px] bg-stone-500 rounded-full" />
            ))}
          </div>

          {/* Top Row: Weekday (Golden modern sans-serif typography, left-aligned) & Icon (Right-aligned) */}
          <div className="flex justify-between items-center mt-1.5 pb-1.5 border-b border-stone-200/60 w-full">
            {/* Elegant, small, modern golden sans-serif weekday text */}
            <span className="text-amber-600 font-sans font-semibold text-[11.5px] tracking-wider uppercase pl-0.5">
              {dayNameRaw}
            </span>

            {/* Micro Gold Ornament (Sparkle or Heart) */}
            <div className="flex items-center">
              {activeQuote.theme === 'love' ? (
                <Heart className="w-3 h-3 text-amber-500/70 fill-amber-500/10" />
              ) : (
                <Sparkles className="w-3 h-3 text-amber-500/70" />
              )}
            </div>
          </div>

          {/* Central Quote Area - Luxury High-Contrast Font Rendering */}
          <div className="flex-1 flex flex-col justify-center py-2 relative">
            <Quote className="w-3.5 h-3.5 text-stone-300/30 absolute -top-1.5 right-0" />
            
            <p 
              className="text-stone-800 font-serif text-[12.5px] sm:text-[13.5px] font-normal leading-relaxed text-center px-1 max-h-[85px] overflow-hidden select-none" 
              dir="rtl"
              style={{
                fontFamily: "'Playfair Display', 'Inter', serif",
                textShadow: '0.5px 0.5px 1px rgba(0,0,0,0.05)'
              }}
            >
              {activeQuote.quote}
            </p>
          </div>

          {/* Delicate bottom accent line */}
          <div className="w-full flex justify-center items-center pb-0.5">
            <div className="w-6 h-[1px] bg-amber-500/20" />
          </div>

        </div>

        {/* Elegant Golden Push-Pin in the top-left corner holding the sheet */}
        <div className="absolute top-2.5 left-2.5 z-50 pointer-events-none drop-shadow-[2px_5px_4px_rgba(0,0,0,0.38)] flex flex-col items-center">
          {/* Metallic Pin Head (3D dome with luxury gold glint) */}
          <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-amber-100 via-amber-400 to-amber-700 border border-amber-300/40 relative flex items-center justify-center">
            {/* White light reflection */}
            <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-white/75 rounded-full blur-[0.2px]" />
            {/* Inner tack pin core */}
            <div className="w-1.5 h-1.5 rounded-full bg-amber-600/25" />
          </div>
          {/* Fine Pin shaft casting a realistic tiny shadow onto the paper */}
          <div className="w-[1.5px] h-3 bg-gradient-to-b from-amber-600 via-stone-800 to-transparent -mt-[1px] transform rotate-[12deg]" />
        </div>

      </div>
    </div>
  );
}
