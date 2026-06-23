import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowLeft, ArrowRight, Quote, Calendar as CalendarIcon, Heart, X, Copy } from 'lucide-react';

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

const MONTHS_HEBREW = [
  'ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני',
  'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'
];

export default function DailyQuoteCalendar({ timeOffset = 0 }: DailyQuoteCalendarProps) {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [activeQuoteIndex, setActiveQuoteIndex] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Compute number of days passed since start date June 22, 2026
  const getDaysSinceStart = (date: Date): number => {
    // Month 5 is June (0-indexed)
    const start = new Date(2026, 5, 22);
    const today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const diffTime = today.getTime() - start.getTime();
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  };

  // Synchronize clock and determine daily deterministic quote active index
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

    // Starting from today (June 22, 2026), select 1 quote per day. Limit to max 17 quotes (index 16)
    const diffDays = getDaysSinceStart(resolvedDate);
    const resolvedIndex = Math.min(Math.max(0, diffDays), 16);
    setActiveQuoteIndex(resolvedIndex);

    return () => clearInterval(timer);
  }, [timeOffset]);

  const maxUnlockedIndex = Math.min(Math.max(0, getDaysSinceStart(currentDate)), 16);

  // Gentle synth flap sound using browser HTML5 web oscillators
  const playPageFlipSound = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(500, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.15);
      
      gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      osc.start();
      osc.stop(audioCtx.currentTime + 0.16);
    } catch (e) {
      // Audio context might be initially blocked or unsupported, degrade silently
    }
  };

  const handleManualFlipNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFlipped) return;
    if (activeQuoteIndex >= maxUnlockedIndex) return; // Prevent unlocking future days' proverbs beforehand
    
    playPageFlipSound();
    setIsFlipped(true);

    setTimeout(() => {
      setActiveQuoteIndex((prev) => Math.min(prev + 1, maxUnlockedIndex));
      setIsFlipped(false);
    }, 350);
  };

  const handleManualFlipPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFlipped) return;
    if (activeQuoteIndex <= 0) return; // Cannot flip below Day 1
    
    playPageFlipSound();
    setIsFlipped(true);

    setTimeout(() => {
      setActiveQuoteIndex((prev) => Math.max(0, prev - 1));
      setIsFlipped(false);
    }, 350);
  };

  const handleCopy = (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const activeQuote = WEDDING_QUOTES[activeQuoteIndex];
  
  // Date details
  const dayName = currentDate.toLocaleDateString('he-IL', { weekday: 'long' });
  const dayNumber = currentDate.getDate();
  const monthName = MONTHS_HEBREW[currentDate.getMonth()];
  const yearNumber = currentDate.getFullYear();

  return (
    <>
      {/* Viewport fixed outer container - Top-Left */}
      <div 
        id="desktop-desk-calendar"
        className="fixed top-5 left-5 z-[45] pointer-events-auto select-none"
      >
        {/* Responsive view for small/mobile devices: turns into a tiny responsive tab */}
        <div className="block lg:hidden">
          <button
            id="mobile-calendar-badge"
            onClick={() => setShowModal(true)}
            className="flex items-center justify-center w-12 h-12 rounded-xl bg-stone-900 border border-amber-500/35 text-amber-200 shadow-xl backdrop-blur-md active:scale-95 duration-200 cursor-pointer"
            title="יומן ציפייה יומי"
          >
            <div className="relative flex flex-col items-center justify-center">
              <span className="text-[8px] font-bold text-amber-400 uppercase leading-none">{monthName.slice(0, 3)}</span>
              <span className="text-base font-extrabold text-white mt-0.5 leading-none">{dayNumber}</span>
              <span className="absolute -bottom-1 h-1 w-1 rounded-full bg-rose-500 animate-pulse" />
            </div>
          </button>
        </div>

        {/* Premium Authentic 3D Isometric Desktop Desk Calendar */}
        <div className="hidden lg:block relative group">
          
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

          {/* Interactive tilted fine stationary paper binder */}
          <div 
            id="tilted-paper-pad"
            onClick={() => setShowModal(true)}
            className="relative w-[190px] h-[210px] bg-stone-900/95 border border-stone-800 rounded-xl overflow-hidden shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer flex flex-col"
            style={{
              perspective: '800px',
              transform: 'perspective(800px) rotateX(12deg) rotateY(-12deg) rotateZ(1deg)',
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Elegant red line status indicator tab */}
            <div className="h-5 bg-gradient-to-r from-red-800 via-rose-600 to-red-800 border-b border-stone-950 flex items-center justify-between px-3 text-[9px] text-stone-200 font-sans tracking-wide">
              <span>השראה יומית</span>
              <div className="flex gap-1">
                <span className="w-1 h-1 rounded-full bg-white/50" />
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              </div>
            </div>

            {/* Calendar Main plate body */}
            <div className="flex-1 p-3.5 flex flex-col justify-between items-center text-center relative select-none">
              
              {/* Month / Year header row with delicate fonts */}
              <div className="w-full flex justify-between items-center text-[10px] text-stone-400 font-bold border-b border-stone-800/80 pb-1.5 font-serif">
                <span className="font-sans text-stone-500 text-[9px]">{yearNumber}</span>
                <span className="text-amber-300 font-medium">{monthName}</span>
              </div>

              {/* Day Plate numbers with flipping effect */}
              <div className={`my-1 flex flex-col items-center justify-center transition-all duration-300 ${isFlipped ? 'scale-y-0 opacity-0 rotate-x-90' : 'scale-y-100 opacity-100 rotate-x-0'}`}>
                <span className="text-[10px] text-amber-500 font-sans tracking-wide mb-0.5 uppercase">
                  {activeQuote.source}
                </span>
                <span className="text-3xl font-black text-amber-50 font-serif tracking-tighter leading-none">
                  {dayNumber}
                </span>
                <span className="text-[10px] text-stone-400 font-sans mt-0.5">
                  {dayName}
                </span>
                <div className="w-8 h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent my-1" />
              </div>

              {/* Mini daily quote preview in the box - centered beautifully */}
              <div className={`flex-1 flex flex-col justify-center max-h-[70px] overflow-hidden px-1 transition-all duration-300 ${isFlipped ? 'scale-y-0 opacity-0 translate-y-2' : 'scale-y-100 opacity-100 translate-y-0'}`}>
                <Quote className="w-2 mx-auto mb-1 text-amber-500/35" />
                <p className="text-[10px] text-stone-200 leading-normal font-sans font-medium tracking-tight line-clamp-3 text-center px-0.5" dir="rtl">
                  {activeQuote.quote}
                </p>
              </div>

              {/* Hover responsive paginator controls */}
              <div className="absolute inset-x-0 bottom-1 flex justify-between px-2.5 bg-gradient-to-t from-stone-900 via-stone-900/95 to-stone-900/40 pt-4 pb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  id="calendar-flip-prev-arrow"
                  onClick={handleManualFlipPrev}
                  disabled={activeQuoteIndex <= 0}
                  className={`p-1 rounded-full bg-stone-950 border border-stone-800 text-amber-450 hover:text-white hover:scale-110 active:scale-95 duration-200 cursor-pointer ${activeQuoteIndex <= 0 ? 'opacity-30 pointer-events-none' : ''}`}
                  title="הקודם"
                >
                  <ArrowRight className="w-3 h-3" />
                </button>

                <span className="text-[8px] text-stone-400 flex items-center font-bold">
                  דפדוף ביומן ({activeQuoteIndex + 1}/17)
                </span>

                <button
                  id="calendar-flip-next-arrow"
                  onClick={handleManualFlipNext}
                  disabled={activeQuoteIndex >= maxUnlockedIndex}
                  className={`p-1 rounded-full bg-stone-950 border border-stone-800 text-amber-450 hover:text-white hover:scale-110 active:scale-95 duration-200 cursor-pointer ${activeQuoteIndex >= maxUnlockedIndex ? 'opacity-30 pointer-events-none' : ''}`}
                  title="הבא"
                >
                  <ArrowLeft className="w-3 h-3" />
                </button>
              </div>
            </div>
            
            {/* Glossy highlight line reflection across physical paper */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent pointer-events-none rounded-xl" />
          </div>
        </div>
      </div>

      {/* Panoramic full detailed Modal Showcase viewer */}
      {showModal && (
        <div 
          id="detailed-quote-cabinet"
          className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div 
            id="quote-cabinet-body"
            className="w-full max-w-xl bg-gradient-to-b from-stone-900 to-stone-950 border border-amber-500/35 rounded-3xl p-6 sm:p-10 text-center relative shadow-2xl shadow-amber-500/10 select-none animate-fade-in-up"
          >
            {/* Title / Close top strip */}
            <div className="flex items-center justify-between border-b border-stone-800/80 pb-4 mb-6">
              <div className="flex items-center gap-2 text-amber-400">
                <CalendarIcon className="w-5 h-5 text-amber-400" />
                <span className="text-xs sm:text-sm font-semibold font-sans tracking-wide text-amber-200">יומן השראה יומי למשפחה</span>
              </div>
              <button 
                id="close-quote-cabinet-btn"
                onClick={() => setShowModal(false)}
                className="text-stone-400 hover:text-white p-2 rounded-full cursor-pointer hover:bg-stone-800/80 transition"
                title="סגור חלון"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Glowing theme illustration card */}
            <div className="mx-auto w-14 h-14 rounded-full bg-gradient-to-tr from-stone-800 to-stone-900 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-6 shadow-md">
              {activeQuote.theme === 'love' && <Heart className="w-6 h-6 text-rose-400 fill-rose-500/20 animate-pulse" />}
              {activeQuote.theme === 'joy' && <Sparkles className="w-6 h-6 text-amber-300 animate-spin [animation-duration:10s]" />}
              {activeQuote.theme === 'peace' && <Quote className="w-6 h-6 text-emerald-300" />}
              {activeQuote.theme === 'hope' && <Quote className="w-6 h-6 text-sky-400" />}
              {activeQuote.theme === 'eternity' && <Heart className="w-6 h-6 text-amber-400 fill-amber-300/15" />}
            </div>

            {/* Core Display Quote content */}
            <div className="space-y-6">
              <span className="text-xs uppercase text-amber-400 tracking-widest font-bold font-sans">
                {activeQuote.source}
              </span>
              <Quote className="w-8 h-8 text-amber-400/20 mx-auto -mb-2" />
              
              <h1 className="font-serif text-2xl sm:text-3xl lg:text-3xl text-amber-100 font-bold leading-relaxed px-2 sm:px-4 text-center max-w-lg mx-auto" dir="rtl">
                {activeQuote.quote}
              </h1>

              <div className="flex items-center justify-center gap-2 text-stone-500 text-xs font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500/65 animate-pulse" />
                <span>יומן ציפייה זוגי</span>
              </div>
            </div>

            {/* Footer navigation controls */}
            <div className="flex items-center justify-between border-t border-stone-800/80 pt-6 mt-8">
              <button
                id="calendar-cabinet-prev"
                onClick={handleManualFlipPrev}
                disabled={activeQuoteIndex <= 0}
                className={`flex items-center gap-1 px-4 py-2 text-xs font-semibold text-stone-400 hover:text-white rounded-lg hover:bg-stone-900 cursor-pointer transition select-none ${activeQuoteIndex <= 0 ? 'opacity-20 pointer-events-none' : ''}`}
              >
                <ArrowRight className="w-4 h-4 ml-1" />
                <span>הקודם</span>
              </button>

              <div className="flex gap-3">
                <button
                  id="calendar-copy-btn"
                  onClick={(e) => handleCopy(e, `"${activeQuote.quote}" - ${activeQuote.source}`)}
                  className="p-2.5 rounded-full bg-stone-950 border border-stone-800 text-stone-300 hover:text-white cursor-pointer hover:border-amber-500/40 transition shadow-inner"
                  title="העתק ציטוט"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <span className="text-xs text-stone-450 font-medium self-center">
                  {copied ? 'הועתק בהצלחה! 🤍' : `${activeQuoteIndex + 1} / 17`}
                </span>
              </div>

              <button
                id="calendar-cabinet-next"
                onClick={handleManualFlipNext}
                disabled={activeQuoteIndex >= maxUnlockedIndex}
                className={`flex items-center gap-1 px-4 py-2 text-xs font-semibold text-stone-400 hover:text-white rounded-lg hover:bg-stone-900 cursor-pointer transition select-none ${activeQuoteIndex >= maxUnlockedIndex ? 'opacity-20 pointer-events-none' : ''}`}
              >
                <span>הבא</span>
                <ArrowLeft className="w-4 h-4 mr-1" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
