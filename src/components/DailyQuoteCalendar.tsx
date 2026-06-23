import React, { useState, useEffect } from 'react';
import { Quote, Sparkles, Heart } from 'lucide-react';

interface DailyQuoteCalendarProps {
  timeOffset?: number;
}

interface QuoteItem {
  quote: string;
  source: string;
  theme: 'love' | 'joy' | 'peace' | 'hope' | 'eternity';
}

// Exactly 17 proverbs as provided by the user.
const WEDDING_QUOTES: QuoteItem[] = [
  {
    quote: "עוד מעט, והציפייה תהפוך למציאות שבה אנחנו צועדים יחד כל החיים",
    source: "יום 1 לציפייה",
    theme: 'love'
  },
  {
    quote: "הבית שנבנה הוא השתקפות של כל הציפיות והתפילות שאנחנו נושאים היום",
    source: "יום 2 לציפייה",
    theme: 'eternity'
  },
  {
    quote: "כל רגע של ציפייה הוא תפילה שקטה לזכות לבנות בית נאמן בישראל",
    source: "יום 3 לציפייה",
    theme: 'peace'
  },
  {
    quote: "הלב שלי סופר את הדקות, לא רק את הימים, לקראת היום שבו נהיה שותפים",
    source: "יום 4 לציפייה",
    theme: 'love'
  },
  {
    quote: "הציפייה היא גשר של תפילות שמחבר בין החלום למציאות",
    source: "יום 5 לציפייה",
    theme: 'hope'
  },
  {
    quote: "ימי הציפייה הם ימי ההתקדשות שקודמים למתן תורה הפרטי שלנו",
    source: "יום 6 לציפייה",
    theme: 'eternity'
  },
  {
    quote: "אנו מצפים ליום שבו נתחיל לכתוב את הפרק המשותף והכי יפה בחיים שלנו",
    source: "יום 7 לציפייה",
    theme: 'joy'
  },
  {
    quote: "הציפייה היא כמו ניגון עדין שמתנגן בלב ומלווה את כל היום",
    source: "יום 8 לציפייה",
    theme: 'peace'
  },
  {
    quote: "בכל בוקר, הציפייה מעניקה לי כוח ומשמעות ליום החדש שנפתח",
    source: "יום 9 לציפייה",
    theme: 'hope'
  },
  {
    quote: "40 יום של ציפייה הם המתנה הכי יפה שהענקנו לעצמנו עוד לפני שהתחלנו",
    source: "יום 10 לציפייה",
    theme: 'eternity'
  },
  {
    quote: "לעיתים ההמתנה קשה, אך הידיעה על הבית שייבנה הופכת אותה למתוקה",
    source: "יום 11 לציפייה",
    theme: 'peace'
  },
  {
    quote: "הלב שלי מלא בהכרת הטוב על הדרך שעברנו ועל הדרך שלפנינו",
    source: "יום 12 לציפייה",
    theme: 'love'
  },
  {
    quote: "הציפייה מזכירה לי כמה היקר הזה חשוב וראוי לכל רגע של המתנה",
    source: "יום 13 לציפייה",
    theme: 'eternity'
  },
  {
    quote: "כל יום שעובר הוא סימן לכך שהחלום הופך למציאות בהירה",
    source: "יום 14 לציפייה",
    theme: 'hope'
  },
  {
    quote: "הלב פועם בתדר של שמחה וציפייה ליום הגדול והקדוש",
    source: "יום 15 לציפייה",
    theme: 'joy'
  },
  {
    quote: "תודה על הזכות לצפות, לחכות ולבנות יחד",
    source: "יום 16 לציפייה",
    theme: 'love'
  },
  {
    quote: "נמשיך לצפות, נמשיך להתפלל, עד ליום המאושר",
    source: "יום 17 לציפייה",
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

  // Compute number of days passed since start date (June 23, 2026 starts Day 1)
  const getDaysSinceStart = (date: Date): number => {
    const start = (date.getFullYear() >= 2026) ? new Date(2026, 5, 23) : getFallbackStartDate(date);
    const today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const diffTime = today.getTime() - start.getTime();
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
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
    const resolvedIndex = Math.min(Math.max(0, diffDays), 16);
    setActiveQuoteIndex(resolvedIndex);

    return () => clearInterval(timer);
  }, [timeOffset]);

  const activeQuote = WEDDING_QUOTES[activeQuoteIndex];
  const dayName = currentDate.toLocaleDateString('he-IL', { weekday: 'long' });

  return (
    <div 
      id="desktop-desk-calendar"
      className="fixed top-4 left-4 z-[45] pointer-events-none select-none scale-90 sm:scale-100 origin-top-left"
    >
      {/* Premium Authentic 3D Isometric Desktop Desk Calendar */}
      <div className="relative group">
        
        {/* Real 3D physical support easel shadow casting back onto desk floor */}
        <div className="absolute -inset-x-2 bottom-0 top-3 bg-black/40 rounded-2xl filter blur-md transform translate-y-3 -translate-x-1 rotate-3 pointer-events-none" />
        
        {/* Main Tilted support easel board backdrop */}
        <div className="absolute inset-0 bg-gradient-to-br from-stone-950 to-stone-900 border-b-4 border-r-2 border-stone-850 rounded-2xl shadow-lg pointer-events-none transform -skew-x-2" />

        {/* Golden Spiral brass-style Binding rings along the top */}
        <div className="absolute -top-3 left-0 right-0 flex justify-around px-5 z-20 pointer-events-none">
          <div className="w-1.5 h-6 bg-gradient-to-b from-stone-500 via-amber-300 to-stone-700 rounded-full shadow-md transform rotate-12" />
          <div className="w-1.5 h-6 bg-gradient-to-b from-stone-500 via-amber-300 to-stone-700 rounded-full shadow-md transform -rotate-6" />
          <div className="w-1.5 h-6 bg-gradient-to-b from-stone-500 via-amber-300 to-stone-700 rounded-full shadow-md transform rotate-3" />
          <div className="w-1.5 h-6 bg-gradient-to-b from-stone-500 via-amber-300 to-stone-700 rounded-full shadow-md transform -rotate-12" />
        </div>

        {/* Beautiful non-interactive tilted fine stationary paper binder */}
        <div 
          id="tilted-paper-pad"
          className="relative w-[190px] h-[215px] bg-stone-900/95 border border-stone-800 rounded-xl overflow-hidden shadow-2xl flex flex-col pointer-events-none"
          style={{
            perspective: '800px',
            transform: 'perspective(800px) rotateX(12deg) rotateY(-12deg) rotateZ(1deg)',
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Elegant header tab */}
          <div className="h-5 bg-gradient-to-r from-stone-950 via-stone-900 to-stone-950 border-b border-stone-800/60 flex items-center justify-between px-3 text-[9px] text-amber-500/80 font-sans tracking-wide">
            <span>השראה יומית</span>
            <div className="flex gap-1 items-center">
              {activeQuote.theme === 'love' && <Heart className="w-2 h-2 text-rose-500 fill-rose-500/20" />}
              {activeQuote.theme !== 'love' && <Sparkles className="w-2 h-2 text-amber-400" />}
            </div>
          </div>

          {/* Calendar Main plate body */}
          <div className="flex-1 p-3.5 flex flex-col justify-between items-center text-center relative">
            
            {/* Split Top Header - Left: Weekday in Hebrew, Right: Quote Day Label */}
            <div className="w-full flex justify-between items-center text-[10px] pb-1.5 border-b border-stone-850/80">
              {/* Day name name written on the left in small elegant styling */}
              <span className="text-amber-400 font-medium font-sans tracking-tight">
                {dayName}
              </span>
              
              {/* Proverb Day indicator represented discreetly on the right */}
              <span className="text-stone-500 font-sans text-[9px] font-bold">
                {activeQuote.source}
              </span>
            </div>

            {/* Central Quote / Judgment layout - Elegant Display size word pairing */}
            <div className="flex-1 flex flex-col justify-center my-1">
              <Quote className="w-3 h-3 text-amber-500/20 mx-auto mb-1.5" />
              <p 
                className="text-stone-100 font-serif text-[11px] sm:text-xs font-semibold leading-relaxed tracking-wide text-center max-w-[165px] mx-auto" 
                dir="rtl"
              >
                {activeQuote.quote}
              </p>
              <div className="w-6 h-[1px] bg-gradient-to-r from-transparent via-amber-500/20 to-transparent mx-auto mt-2" />
            </div>

            {/* Aesthetic Fine footer caption */}
            <div className="w-full text-[8.5px] text-stone-550 font-sans border-t border-stone-850/60 pt-1.5 flex justify-between">
              <span>משפחה מאושרת</span>
              <span>תשפ״ו 🤍</span>
            </div>
          </div>
          
          {/* Glossy highlight line reflection across physical paper */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-transparent pointer-events-none rounded-xl" />
        </div>
      </div>
    </div>
  );
}
