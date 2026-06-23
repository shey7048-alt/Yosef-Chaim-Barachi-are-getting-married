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

  // Compute number of days passed since start date June 22, 2026
  // This makes sure Day 1 starts precisely on June 22, 2026, and transitions cleanly, one day at a time!
  const getDaysSinceStart = (date: Date): number => {
    const start = (date.getFullYear() >= 2026) ? new Date(2026, 5, 22) : getFallbackStartDate(date);
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
  const dayName = currentDate.toLocaleDateString('he-IL', { weekday: 'long' });

  return (
    <div 
      id="desktop-desk-calendar"
      className="fixed top-4 left-4 z-[45] pointer-events-none select-none scale-90 sm:scale-100 origin-top-left"
    >
      {/* Premium Authentic 3D Isometric Desktop Desk Calendar */}
      <div className="relative group">
        
        {/* Real 3D physical support easel shadow casting back onto desk floor */}
        <div className="absolute -inset-x-2 bottom-0 top-3 bg-black/50 rounded-2xl filter blur-md transform translate-y-3 -translate-x-1 rotate-3 pointer-events-none" />
        
        {/* Main Tilted support easel board backdrop */}
        <div className="absolute inset-0 bg-gradient-to-br from-stone-950 via-stone-900 to-stone-950 border-b-4 border-r-2 border-stone-850 rounded-2xl shadow-xl pointer-events-none transform -skew-x-2" />

        {/* Golden Spiral brass-style Binding rings along the top */}
        <div className="absolute -top-3.5 left-0 right-0 flex justify-around px-6 z-20 pointer-events-none">
          <div className="w-1.5 h-6 bg-gradient-to-b from-stone-600 via-amber-300 to-stone-800 rounded-full shadow-md transform rotate-12" />
          <div className="w-1.5 h-6 bg-gradient-to-b from-stone-600 via-amber-300 to-stone-800 rounded-full shadow-md transform -rotate-6" />
          <div className="w-1.5 h-6 bg-gradient-to-b from-stone-600 via-amber-300 to-stone-800 rounded-full shadow-md transform rotate-3" />
          <div className="w-1.5 h-6 bg-gradient-to-b from-stone-600 via-amber-300 to-stone-800 rounded-full shadow-md transform -rotate-12" />
        </div>

        {/* Beautiful non-interactive tilted fine stationary paper binder */}
        <div 
          id="tilted-paper-pad"
          className="relative w-[215px] h-[225px] bg-gradient-to-b from-stone-900 via-stone-950 to-stone-900 border border-stone-800/80 rounded-xl overflow-hidden shadow-2xl flex flex-col pointer-events-none"
          style={{
            perspective: '1000px',
            transform: 'perspective(1000px) rotateX(11deg) rotateY(-11deg) rotateZ(1.5deg)',
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Elegant top red-stitched faux header binder edge */}
          <div className="h-1 bg-gradient-to-r from-red-800 via-rose-600 to-red-800 opacity-85" />

          {/* Calendar Main plate body with delicate gold-tinted inner border */}
          <div className="flex-1 p-3.5 m-1.5 border border-amber-500/10 rounded-lg bg-stone-900/40 flex flex-col justify-between items-center text-center relative">
            
            {/* Split Top Header - Left: Weekday in Hebrew (small), Right: Fine metadata */}
            <div className="w-full flex justify-between items-center pb-1.5 border-b border-stone-800/80">
              {/* Day of the week correctly written small above, aligned to the left */}
              <span className="text-amber-400 font-semibold font-sans text-[11px] text-left uppercase tracking-wider">
                {dayName}
              </span>
              
              {/* Discrete heart decoration on the right side */}
              <div className="flex gap-1 items-center">
                {activeQuote.theme === 'love' && <Heart className="w-2.5 h-2.5 text-rose-500/80 fill-rose-500/20" />}
                {activeQuote.theme !== 'love' && <Sparkles className="w-2.5 h-2.5 text-amber-500/80" />}
              </div>
            </div>

            {/* Central Quote / Display layout - elegant font layout, with NO date of entry/numbers */}
            <div className="flex-1 flex flex-col justify-center my-2">
              <Quote className="w-3.5 h-3.5 text-amber-500/15 mx-auto mb-2" />
              <p 
                className="text-amber-50 font-serif text-[12.5px] sm:text-[13.5px] font-medium leading-relaxed tracking-wide text-center px-1.5 max-w-[185px] mx-auto select-none" 
                dir="rtl"
              >
                {activeQuote.quote}
              </p>
              <div className="w-8 h-[1px] bg-gradient-to-r from-transparent via-amber-500/15 to-transparent mx-auto mt-2" />
            </div>


          </div>
          
          {/* Subtle glossy layout reflection */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-transparent pointer-events-none rounded-xl" />
        </div>
      </div>
    </div>
  );
}
