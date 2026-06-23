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
      {/* Elegant, minimalist floating glassmorphic container with custom outer gradient border */}
      <div className="relative w-[230px] h-[180px] rounded-2xl p-[1px] bg-gradient-to-br from-amber-400/25 via-white/5 to-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] backdrop-blur-[12px]">
        
        {/* Inner layout container with elegant luxury dark background feel */}
        <div className="w-full h-full rounded-[15px] bg-stone-950/65 p-4 flex flex-col justify-between border border-white/5 relative overflow-hidden">
          
          {/* Subtle gold decoration glowing gradients */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-400/5 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-amber-400/5 rounded-full blur-2xl pointer-events-none" />

          {/* Top Row: Weekday (Small, left aligned) & Mini Ornament (Right aligned) */}
          <div className="flex justify-between items-center pb-2 border-b border-white/10">
            {/* Weekday name on the left in clean thin typography */}
            <span className="text-amber-400/90 font-light font-sans text-xs tracking-wider" dir="rtl">
              {dayNameRaw}
            </span>

            {/* Small Elegant Sparkle / Heart Icon on the right */}
            <div className="flex items-center justify-center">
              {activeQuote.theme === 'love' ? (
                <Heart className="w-3.5 h-3.5 text-amber-400/85 fill-amber-400/10" />
              ) : (
                <Sparkles className="w-3.5 h-3.5 text-amber-400/85" />
              )}
            </div>
          </div>

          {/* Central Main Quote - Large premium wedding-style font */}
          <div className="flex-1 flex flex-col justify-center py-2 relative">
            {/* Tiny elegant quote icon decoration */}
            <Quote className="w-3.5 h-3.5 text-amber-400/10 absolute -top-1 right-0" />
            
            <p 
              className="text-white font-serif text-[14.5px] sm:text-[15.5px] font-light leading-relaxed tracking-wide text-center px-1 max-h-[100px] overflow-hidden select-none" 
              dir="rtl"
              style={{
                fontFamily: "'Playfair Display', 'Inter', serif",
                textShadow: '0 2px 4px rgba(0,0,0,0.5)'
              }}
            >
              {activeQuote.quote}
            </p>
          </div>

          {/* Fine Aesthetic Bottom Gold Accent Divider */}
          <div className="w-full flex justify-center items-center">
            <div className="w-8 h-[1px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
          </div>

        </div>

        {/* Glossy light sweep overlay on the card */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent pointer-events-none rounded-2xl" />
      </div>
    </div>
  );
}
