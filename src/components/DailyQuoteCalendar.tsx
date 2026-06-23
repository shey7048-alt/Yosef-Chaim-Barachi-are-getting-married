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
        
        {/* Underlayer 3: Warm deep clay/sand paper layer */}
        <div 
          className="absolute inset-x-7 bottom-5 top-5 bg-[#E6DCC3] border border-stone-300/40 shadow-sm pointer-events-none opacity-60"
          style={{
            borderRadius: '16px 12px 14px 18px / 14px 16px 13px 15px',
            transform: 'rotate(0.5deg) translate(0px, 4px)'
          }}
        />

        {/* Underlayer 2: Warm antique cream handmade page */}
        <div 
          className="absolute inset-x-6 bottom-5 top-5 bg-[#EFE9D5]/90 border border-stone-300/50 shadow-md pointer-events-none opacity-90"
          style={{
            borderRadius: '13px 17px 12px 16px / 16px 13px 17px 12px',
            transform: 'rotate(-1deg) translate(1px, 2px)'
          }}
        />

        {/* Underlayer 1: Soft tactile ivory paper layer */}
        <div 
          className="absolute inset-x-5 bottom-5 top-5 bg-[#F6F1E0] border border-stone-300/70 shadow-lg pointer-events-none"
          style={{
            borderRadius: '15px 13px 18px 14px / 12px 15px 14px 16px',
            transform: 'rotate(1.5deg) translate(-1px, 1px)'
          }}
        />

        {/* Top Primary Keepsake Sheet: Warm ivory-cream handmade deckled-edge textured paper */}
        <div 
          className="absolute inset-x-5 bottom-5 top-5 bg-[#FDF9EE] border border-[#E9DFCB]/90 shadow-[4px_12px_28px_rgba(45,30,15,0.22)] p-4 flex flex-col justify-between pointer-events-none overflow-hidden"
          style={{
            borderRadius: '14px 11px 16px 12px / 11px 16px 12px 15px',
            transform: 'rotate(-4deg) translate(-3px, -1px)',
            backgroundImage: 'radial-gradient(#F5ECD2 0.7px, transparent 0.7px), radial-gradient(#F5ECD2 0.7px, #FDF9EE 0.7px)',
            backgroundSize: '24px 24px',
            backgroundPosition: '0 0, 12px 12px'
          }}
        >
          {/* Deckled Edge Fibers/Fraying Overlay simulation on margins */}
          <div className="absolute inset-y-0 left-0 w-[4px] bg-gradient-to-r from-stone-400/5 via-stone-300/10 to-transparent" />
          <div className="absolute inset-y-0 right-0 w-[4px] bg-gradient-to-l from-stone-400/5 via-stone-300/10 to-transparent" />
          <div className="absolute inset-x-0 top-0 h-[4px] bg-gradient-to-b from-stone-400/5 via-stone-300/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-[4px] bg-gradient-to-t from-stone-400/5 via-stone-300/10 to-transparent" />

          {/* Top Row: Weekday Name (Soft Bronze/Copper) & Ornament (Vintage Heart/Sparkle) */}
          <div className="flex justify-between items-center pb-2 border-b border-[#EADFC7]/60 w-full mt-0.5">
            {/* Elegant, clean modern bronze-style weekday heading */}
            <span 
              className="font-sans font-medium text-[11px] tracking-wider text-[#A37B5C] uppercase pl-1"
              style={{ letterSpacing: '0.08em' }}
            >
              {dayNameRaw}
            </span>

            {/* Micro Vintage Keepsake Ornament */}
            <div className="flex items-center">
              {activeQuote.theme === 'love' ? (
                <Heart className="w-3.5 h-3.5 text-[#B28264]/80 fill-[#B28264]/10" />
              ) : (
                <Sparkles className="w-3.5 h-3.5 text-[#B28264]/80" />
              )}
            </div>
          </div>

          {/* Central Quote Body - Rendered in a Delicate Brushed Rose Gold / Soft Bronze */}
          <div className="flex-1 flex flex-col justify-center py-2 relative">
            <Quote className="w-4 h-4 text-[#C09A7F]/15 absolute -top-1 right-0" />
            
            <p 
              className="bg-gradient-to-br from-[#8C5239] via-[#C98E72] to-[#733F27] bg-clip-text text-transparent font-serif text-[13.5px] sm:text-[14.5px] font-bold leading-relaxed text-center px-1 max-h-[90px] overflow-hidden select-none" 
              dir="rtl"
              style={{
                fontFamily: "'Playfair Display', 'Inter', serif",
                filter: 'drop-shadow(0.5px 0.7px 0.7px rgba(255,255,255,0.55))'
              }}
            >
              {activeQuote.quote}
            </p>
          </div>

          {/* Delicate Soft Bronze Central Footer Accent Divider */}
          <div className="w-full flex justify-center items-center pb-1">
            <div className="w-8 h-[1px] bg-gradient-to-r from-transparent via-[#C09A7F]/30 to-transparent" />
          </div>

        </div>

        {/* Artisanal detailed vintage gold & pearl rose pushpin on the top-left */}
        <div 
          className="absolute top-2 left-2 z-50 pointer-events-none drop-shadow-[2.5px_4px_4.5px_rgba(45,30,15,0.45)] flex flex-col items-center"
          style={{ transform: 'rotate(-3deg)' }}
        >
          {/* Detailed romantic floral bloom design with layered golden petals and a central lustrous pearl */}
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform rotate-[12deg]">
            <defs>
              {/* Luxury Brushed Gold/Rose Gold Gradient */}
              <radialGradient id="rose-gold-petal" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#FFF2E6" />   {/* Highlight glint */}
                <stop offset="30%" stopColor="#E0B094" />  {/* Warm Rose Gold */}
                <stop offset="70%" stopColor="#B37C5D" />  {/* Saturation shadow */}
                <stop offset="100%" stopColor="#6E442D" /> {/* Antique copper depth */}
              </radialGradient>
              
              {/* Pearl Center Luster Gradient */}
              <radialGradient id="pearl-luster" cx="30%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="25%" stopColor="#FFF5F2" />
                <stop offset="75%" stopColor="#EAD2C9" />
                <stop offset="100%" stopColor="#CBB1A7" />
              </radialGradient>
            </defs>

            {/* Overlapping organic floral petals */}
            {/* Outer Petals */}
            <path d="M14 14 C12 4, 16 4, 14 14 Z" fill="url(#rose-gold-petal)" stroke="#59341E" strokeWidth="0.4" />
            <path d="M14 14 C24 12, 24 16, 14 14 Z" fill="url(#rose-gold-petal)" stroke="#59341E" strokeWidth="0.4" />
            <path d="M14 14 C16 24, 12 24, 14 14 Z" fill="url(#rose-gold-petal)" stroke="#59341E" strokeWidth="0.4" />
            <path d="M14 14 C4 16, 4 12, 14 14 Z" fill="url(#rose-gold-petal)" stroke="#59341E" strokeWidth="0.4" />

            {/* Intermediate Diagonal Petals (Off-center rotation for a highly organic, natural floral look) */}
            <path d="M14 14 C7.5 7.5, 10.5 6, 14 14 Z" fill="url(#rose-gold-petal)" stroke="#59341E" strokeWidth="0.4" />
            <path d="M14 14 C20.5 7.5, 22 10.5, 14 14 Z" fill="url(#rose-gold-petal)" stroke="#59341E" strokeWidth="0.4" />
            <path d="M14 14 C20.5 20.5, 17.5 22, 14 14 Z" fill="url(#rose-gold-petal)" stroke="#59341E" strokeWidth="0.4" />
            <path d="M14 14 C7.5 20.5, 6 17.5, 14 14 Z" fill="url(#rose-gold-petal)" stroke="#59341E" strokeWidth="0.4" />

            {/* Inner tiny rose bud ring */}
            <path d="M14 14 C11 9, 17 9, 14 14 Z" fill="url(#rose-gold-petal)" opacity="0.9" stroke="#422413" strokeWidth="0.3" />
            <path d="M14 14 C19 11, 19 17, 14 14 Z" fill="url(#rose-gold-petal)" opacity="0.9" stroke="#422413" strokeWidth="0.3" />
            <path d="M14 14 C17 19, 11 19, 14 14 Z" fill="url(#rose-gold-petal)" opacity="0.9" stroke="#422413" strokeWidth="0.3" />
            <path d="M14 14 C9 17, 9 11, 14 14 Z" fill="url(#rose-gold-petal)" opacity="0.9" stroke="#422413" strokeWidth="0.3" />

            {/* Central Romantic Pearl Jewel bead */}
            <circle cx="14" cy="14" r="3.2" fill="url(#pearl-luster)" stroke="#6E5045" strokeWidth="0.45" />
            {/* Luminous gloss highlight */}
            <circle cx="12.8" cy="12.8" r="0.8" fill="#FFFFFF" opacity="0.8" />
          </svg>
          
          {/* Detailed brass needle shaft casting a shadow beneath */}
          <div className="w-[1.8px] h-4 bg-gradient-to-b from-[#59341E] via-stone-800 to-transparent -mt-[1.5px] transform rotate-[15deg] origin-top" />
        </div>

      </div>
    </div>
  );
}
