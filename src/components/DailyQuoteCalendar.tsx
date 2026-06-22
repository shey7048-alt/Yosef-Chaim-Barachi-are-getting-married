import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowLeft, ArrowRight, Quote, Calendar as CalendarIcon, Heart, X, Volume2, Copy } from 'lucide-react';

interface DailyQuoteCalendarProps {
  timeOffset?: number;
}

interface QuoteItem {
  quote: string;
  source: string;
  author: string;
  translation: string;
  theme: 'love' | 'joy' | 'peace' | 'hope' | 'eternity';
}

const WEDDING_QUOTES: QuoteItem[] = [
  {
    quote: "מצא אישה מצא טוב, ויפק רצון מה׳",
    source: "משלי יח, כב",
    author: "שלמה המלך",
    translation: "He who finds a wife finds what is good and receives favor from the LORD.",
    theme: 'love'
  },
  {
    quote: "אני לדודי ודודי לי, הרעה בשושנים",
    source: "שיר השירים ו, ג",
    author: "שיר השירים",
    translation: "I am my beloved's and my beloved is mine; he browses among the lilies.",
    theme: 'love'
  },
  {
    quote: "עוד ישמע בערי יהודה ובחוצות ירושלים קול ששון וקול שמחה קול חתן וקול כלה",
    source: "ירמיהו לג, יא",
    author: "ירמיהו הנביא",
    translation: "Yet again there shall be heard the voice of joy and the voice of gladness, the voice of the bridegroom and the voice of the bride.",
    theme: 'joy'
  },
  {
    quote: "מים רבים לא יוכלו לכבות את האהבה, ונהרות לא ישטפוה",
    source: "שיר השירים ח, ז",
    author: "שיר השירים",
    translation: "Many waters cannot quench love, neither can floods drown it.",
    theme: 'eternity'
  },
  {
    quote: "על כן יעזב איש את אביו ואת אמו ודבק באשתו והיו לבשר אחד",
    source: "בראשית ב, כד",
    author: "תורתנו הקדושה",
    translation: "Therefore a man shall leave his father and his mother and hold fast to his wife, and they shall become one flesh.",
    theme: 'eternity'
  },
  {
    quote: "ואהבת עולם אהבתיך, על כן משכתיך חסד",
    source: "ירמיהו לא, ב",
    author: "ירמיהו הנביא",
    translation: "I have loved you with an everlasting love; I have drawn you with unfailing kindness.",
    theme: 'love'
  },
  {
    quote: "ואהבתו עלי דגל, סמכוני באשישות רפדוני בתפוחים כי חולת אהבה אני",
    source: "שיר השירים ב, ד-ה",
    author: "שיר השירים",
    translation: "His banner over me is love. Sustain me with raisins; refresh me with apples, for I am faint with love.",
    theme: 'love'
  },
  {
    quote: "דרכיה דרכי נעם, וכל נתיבותיה שלום",
    source: "משלי ג, יז",
    author: "שלמה המלך",
    translation: "Her ways are pleasant ways, and all her paths are peace.",
    theme: 'peace'
  },
  {
    quote: "שימני כחותר על לבך, כחומר על זרועך, כי עזה כמות אהבה",
    source: "שיר השירים ח, ו",
    author: "שיר השירים",
    translation: "Place me like a seal over your heart, like a seal on your arm; for love is as strong as death.",
    theme: 'eternity'
  },
  {
    quote: "זה דודי וזה רעי, בנות ירושלים",
    source: "שיר השירים ה, טז",
    author: "שיר השירים",
    translation: "This is my beloved, this is my friend.",
    theme: 'love'
  },
  {
    quote: "כי אל אשר תלכי אלך, ובאשר תליני אלין, עמך עמי ואלוקיך אלוקי",
    source: "רות א, טז",
    author: "מגילת רות",
    translation: "For where you go I will go, and where you lodge I will lodge. Your people shall be my people, and your God my God.",
    theme: 'hope'
  },
  {
    quote: "קול דודי הנה זה בא, מדלג על ההרים מקפץ על הגבעות",
    source: "שיר השירים ב, ח",
    author: "שיר השירים",
    translation: "Listen! My beloved! Look! Here he comes, leaping across the mountains, bounding over the hills.",
    theme: 'joy'
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

  // Derive today's dynamic date with simulated offset support if any
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

    // Dynamic Daily Quote index calculation based on the day of the year
    const startOfYear = new Date(resolvedDate.getFullYear(), 0, 1);
    const diffMs = resolvedDate.getTime() - startOfYear.getTime();
    const dayOfYear = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    // Choose starting index deterministically
    setActiveQuoteIndex(Math.abs(dayOfYear) % WEDDING_QUOTES.length);

    return () => clearInterval(timer);
  }, [timeOffset]);

  // Paper flip crunch sound utilizing simple HTML5 Web Audio API
  const playPageFlipSound = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(550, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, audioCtx.currentTime + 0.14);
      
      gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.14);
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      osc.start();
      osc.stop(audioCtx.currentTime + 0.15);
    } catch (e) {
      // Audio context may be blocked initially, degrade gracefully
    }
  };

  const handleManualFlipNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFlipped) return;
    
    playPageFlipSound();
    setIsFlipped(true);

    setTimeout(() => {
      setActiveQuoteIndex((prev) => (prev + 1) % WEDDING_QUOTES.length);
      setIsFlipped(false);
    }, 400);
  };

  const handleManualFlipPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFlipped) return;
    
    playPageFlipSound();
    setIsFlipped(true);

    setTimeout(() => {
      setActiveQuoteIndex((prev) => (prev - 1 + WEDDING_QUOTES.length) % WEDDING_QUOTES.length);
      setIsFlipped(false);
    }, 400);
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
      {/* 1. Viewport Outer Container - Fixed Left Top */}
      <div 
        id="desktop-desk-calendar"
        className="fixed top-5 left-5 z-[45] pointer-events-auto select-none"
      >
        {/* Responsive Mobile Charm View (collapses elegantly on mobile, fully details on md+) */}
        <div className="block lg:hidden">
          <button
            id="mobile-calendar-badge"
            onClick={() => setShowModal(true)}
            className="flex items-center justify-center w-11 h-11 rounded-xl bg-stone-900/95 border border-amber-500/40 text-amber-200 shadow-xl backdrop-blur-md active:scale-95 duration-200 cursor-pointer"
            title="יומן יומי • קרא השראה"
          >
            <div className="relative flex flex-col items-center justify-center">
              <span className="text-[9px] -mt-1 font-bold text-amber-400 font-sans">{monthName.slice(0, 3)}</span>
              <span className="text-sm font-black -mt-0.5 font-serif text-white">{dayNumber}</span>
              <span className="absolute -bottom-1 h-1 w-1 rounded-full bg-rose-500 animate-pulse" />
            </div>
          </button>
        </div>

        {/* Desktop Sophisticated 3D Isometric View */}
        <div className="hidden lg:block relative group">
          {/* Real 3D physical backing support leg projection (Easel backing representation) */}
          <div className="absolute -inset-x-2 bottom-0 top-3 bg-stone-950/45 rounded-2xl filter blur-md transform translate-y-3 -translate-x-1 rotate-3 pointer-events-none" />
          
          {/* Main Tilted support easel board */}
          <div className="absolute inset-0 bg-gradient-to-br from-stone-950 to-stone-900 border-b-4 border-r-2 border-stone-800 rounded-2xl shadow-lg pointer-events-none transform -skew-x-2 select-none" />

          {/* Golden Spiral Binding rings at the top */}
          <div className="absolute -top-3 left-0 right-0 flex justify-around px-5 z-20 pointer-events-none">
            <div className="w-1.5 h-6 bg-gradient-to-b from-stone-500 via-amber-300 to-stone-700 rounded-full shadow-md transform rotate-12" />
            <div className="w-1.5 h-6 bg-gradient-to-b from-stone-500 via-amber-300 to-stone-700 rounded-full shadow-md transform -rotate-6" />
            <div className="w-1.5 h-6 bg-gradient-to-b from-stone-500 via-amber-300 to-stone-700 rounded-full shadow-md transform rotate-3" />
            <div className="w-1.5 h-6 bg-gradient-to-b from-stone-500 via-amber-300 to-stone-700 rounded-full shadow-md transform -rotate-12" />
          </div>

          {/* Interactive tilted paper binder layout */}
          <div 
            id="tilted-paper-pad"
            onClick={() => setShowModal(true)}
            className={`relative w-44 h-48 bg-stone-900/95 border border-stone-800 rounded-xl overflow-hidden shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer flex flex-col`}
            style={{
              perspective: '800px',
              transform: 'perspective(800px) rotateX(12deg) rotateY(-12deg) rotateZ(1deg)',
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Top red daily line tab */}
            <div className="h-4 bg-gradient-to-r from-red-800 via-red-600 to-red-800 border-b border-stone-950 flex items-center justify-between px-2 text-[8px] text-stone-300 font-sans tracking-tight">
              <span>השראה יומית</span>
              <div className="flex gap-0.5">
                <span className="w-1 h-1 rounded-full bg-white/40" />
                <span className="w-1 h-1 rounded-full bg-white/40" />
              </div>
            </div>

            {/* Calendar body plate */}
            <div className="flex-1 p-3 flex flex-col justify-between items-center text-center relative select-none">
              {/* Month/Year row */}
              <div className="w-full flex justify-between items-center text-[10px] text-stone-400 font-bold border-b border-stone-800 pb-1 font-serif">
                <span>{yearNumber}</span>
                <span className="text-amber-300">{monthName}</span>
              </div>

              {/* Day Plate area */}
              <div className={`my-1.5 flex flex-col items-center justify-center transition-all duration-300 ${isFlipped ? 'scale-y-0 opacity-0 rotate-x-90' : 'scale-y-100 opacity-100 rotate-x-0'}`}>
                <span className="text-3xl font-black text-amber-50 font-serif tracking-tighter leading-none">
                  {dayNumber}
                </span>
                <span className="text-[9px] text-stone-400 font-sans mt-0.5">
                  {dayName}
                </span>
                <div className="w-6 h-0.5 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent my-1" />
              </div>

              {/* Dynamic Daily Small quote preview */}
              <div className={`flex-1 flex flex-col justify-center max-h-[64px] overflow-hidden px-1 transition-all duration-300 ${isFlipped ? 'scale-y-0 opacity-0 translate-y-2' : 'scale-y-100 opacity-100 translate-y-0'}`}>
                <Quote className="w-2.5 h-2.5 text-amber-400/30 mb-0.5 mx-auto" />
                <p className="text-[10px] text-stone-200 leading-normal font-sans tracking-tight line-clamp-2" dir="rtl">
                  {activeQuote.quote}
                </p>
                <span className="text-[8px] text-amber-500/60 mt-0.5 font-light">
                  {activeQuote.source}
                </span>
              </div>

              {/* Mini Interactive arrows overlay on desktop hover */}
              <div className="absolute inset-x-0 bottom-1 flex justify-between px-2 bg-gradient-to-t from-stone-900 to-transparent pt-3 pb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  id="calendar-flip-prev-arrow"
                  onClick={handleManualFlipPrev}
                  className="p-1 rounded-full bg-stone-950 border border-stone-800 text-amber-400 hover:text-white cursor-pointer hover:scale-110 active:scale-95 duration-200"
                  title="עבור להשראה הקודמת"
                >
                  <ArrowRight className="w-3 h-3" />
                </button>

                <span className="text-[8px] text-stone-500 flex items-center font-bold">
                  העבר דף
                </span>

                <button
                  id="calendar-flip-next-arrow"
                  onClick={handleManualFlipNext}
                  className="p-1 rounded-full bg-stone-950 border border-stone-800 text-amber-400 hover:text-white cursor-pointer hover:scale-110 active:scale-95 duration-200"
                  title="עבור להשראה הבאה"
                >
                  <ArrowLeft className="w-3 h-3" />
                </button>
              </div>
            </div>
            
            {/* Elegant metal clip reflection light gloss layer */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none rounded-xl" />
          </div>
        </div>
      </div>

      {/* 2. Panoramic Dialog Overlay Modal displaying the Quote with absolute aesthetics */}
      {showModal && (
        <div 
          id="detailed-quote-cabinet"
          className="fixed inset-0 z-[1000] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div 
            id="quote-cabinet-body"
            className="w-full max-w-xl bg-gradient-to-b from-stone-900 to-stone-950 border border-amber-500/30 rounded-3xl p-6 sm:p-10 text-center relative shadow-2xl shadow-amber-500/5 select-none animate-fade-in-up"
          >
            {/* Floating top header ribbons */}
            <div className="flex items-center justify-between border-b border-stone-800 pb-4 mb-6">
              <div className="flex items-center gap-2 text-amber-400">
                <CalendarIcon className="w-5 h-5" />
                <span className="text-xs sm:text-sm font-semibold font-sans tracking-wide">לוח השראה יומי למשפחה</span>
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

            {/* Glowing Theme icon card */}
            <div className="mx-auto w-14 h-14 rounded-full bg-gradient-to-tr from-stone-800 to-stone-900 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-6 shadow-md">
              {activeQuote.theme === 'love' && <Heart className="w-6 h-6 text-rose-400 fill-rose-500/20 animate-pulse" />}
              {activeQuote.theme === 'joy' && <Sparkles className="w-6 h-6 text-amber-300 animate-spin [animation-duration:10s]" />}
              {activeQuote.theme === 'peace' && <Quote className="w-6 h-6 text-emerald-300" />}
              {activeQuote.theme === 'hope' && <Quote className="w-6 h-6 text-sky-400" />}
              {activeQuote.theme === 'eternity' && <Heart className="w-6 h-6 text-amber-400 fill-amber-300/15" />}
            </div>

            {/* Full-size Quote Text */}
            <div className="space-y-6">
              <Quote className="w-8 h-8 text-amber-400/20 mx-auto -mb-2" />
              
              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-amber-100 font-bold leading-relaxed px-2 sm:px-4" dir="rtl">
                {activeQuote.quote}
              </h1>

              <div className="flex items-center justify-center gap-2 text-stone-400 text-xs sm:text-sm font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500/60" />
                <span>{activeQuote.source}</span>
                {activeQuote.author && (
                  <>
                    <span className="text-stone-600">|</span>
                    <span className="text-amber-400/80">{activeQuote.author}</span>
                  </>
                )}
              </div>

              {/* Translation sub-clause */}
              {activeQuote.translation && (
                <div className="bg-stone-950/70 border border-stone-800 rounded-2xl p-4 max-w-md mx-auto">
                  <p className="text-xs sm:text-sm text-stone-300 italic font-sans leading-relaxed tracking-wide">
                    "{activeQuote.translation}"
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Actions footer */}
            <div className="flex items-center justify-between border-t border-stone-800 pt-6 mt-8">
              <button
                id="calendar-cabinet-prev"
                onClick={handleManualFlipPrev}
                className="flex items-center gap-1 px-4 py-2 text-xs font-semibold text-stone-400 hover:text-white rounded-lg hover:bg-stone-900 cursor-pointer transition"
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
                <span className="text-xs text-stone-500 font-medium self-center">
                  {copied ? 'הועתק בהצלחה! השתמש לשיתוף 🤍' : `${activeQuoteIndex + 1} / ${WEDDING_QUOTES.length}`}
                </span>
              </div>

              <button
                id="calendar-cabinet-next"
                onClick={handleManualFlipNext}
                className="flex items-center gap-1 px-4 py-2 text-xs font-semibold text-stone-400 hover:text-white rounded-lg hover:bg-stone-900 cursor-pointer transition"
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
