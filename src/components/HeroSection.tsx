import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Clock, Heart, ChevronDown, MapPin, MailOpen } from 'lucide-react';
import { CountdownTime } from '../types';
import InvitationModal from './InvitationModal';

interface HeroSectionProps {
  weddingDate: Date;
  timeOffset?: number; // Calculated dynamic offset (Jerusalem standard time - client system clock)
  onScrollToCalendar: () => void;
}

export default function HeroSection({ weddingDate, timeOffset = 0, onScrollToCalendar }: HeroSectionProps) {
  const [isInvitationOpen, setIsInvitationOpen] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<CountdownTime>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalMs: 0,
    isWeddingDay: false,
    isAfterWedding: false,
  });

  const [daysRounded, setDaysRounded] = useState<number>(0);

  useEffect(() => {
    const calculateTimeLeft = () => {
      // Calculate current live date adjusted with the high-precision offset fetched from API
      const now = new Date(Date.now() + timeOffset);
      const differenceMs = weddingDate.getTime() - now.getTime();
      
      // Determine if it's the wedding day
      const isSameDate = 
         now.getFullYear() === weddingDate.getFullYear() &&
         now.getMonth() === weddingDate.getMonth() &&
         now.getDate() === weddingDate.getDate();

      const isAfterWedding = differenceMs < 0 && !isSameDate;

      // Rounded days calculation for the text "עוד X ימים לחתונה!"
      const oneDayMs = 24 * 60 * 60 * 1000;
      const daysLeftCalc = Math.max(0, Math.ceil((weddingDate.getTime() - now.getTime()) / oneDayMs));
      setDaysRounded(daysLeftCalc);

      if (differenceMs <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          totalMs: differenceMs,
          isWeddingDay: isSameDate,
          isAfterWedding: !isSameDate,
        });
        return;
      }

      // Calculate Day, Hour, Minute, Second values exactly
      const totalSeconds = Math.floor(differenceMs / 1000);
      const days = Math.floor(totalSeconds / (3600 * 24));
      const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        totalMs: differenceMs,
        isWeddingDay: false,
        isAfterWedding: false,
      });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [weddingDate, timeOffset]);

  // Framer-motion layout variables
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } }
  };

  const countBoxVariants = {
    hover: { 
      y: -6, 
      boxShadow: "0 20px 25px -5px rgba(219, 161, 83, 0.12), 0 10px 10px -5px rgba(219, 161, 83, 0.05)" ,
      transition: { duration: 0.3 }
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-between px-4 py-8 md:py-12 select-none">
      {/* Decorative floral spacer header */}
      <div className="absolute top-0 inset-x-0 h-10 flex justify-center items-center pointer-events-none opacity-40">
        <div className="w-1/4 h-[1px] bg-gradient-to-r from-transparent to-gold-400"></div>
        <Heart className="w-4 h-4 mx-3 text-gold-500 fill-gold-100" />
        <div className="w-1/4 h-[1px] bg-gradient-to-r from-gold-400 to-transparent"></div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center max-w-4xl w-full text-center mt-12 mb-8">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8 md:space-y-10"
        >
          {/* Couple's Names */}
          <motion.div variants={itemVariants} className="space-y-4">
            <span className="text-xs uppercase tracking-[0.3em] text-gold-700 font-bold font-sans">
              שמרו את התאריך
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-stone-900 tracking-tight leading-none px-2 font-medium">
              יוסף חיים <span className="text-gold-500 font-light italic">&amp;</span> ברכי
            </h1>
            <div className="flex items-center justify-center gap-2 mt-4">
              <span className="h-[1px] w-10 bg-gold-300"></span>
              <p className="text-lg sm:text-xl font-serif italic text-stone-600 font-medium">
                מתחתנים!
              </p>
              <span className="h-[1px] w-10 bg-gold-300"></span>
            </div>
          </motion.div>

          {/* Clean text display required by customer: "עוד X ימים לחתונה!" */}
          <motion.div variants={itemVariants}>
            <AnimatePresence mode="wait">
              {!timeLeft.isWeddingDay && !timeLeft.isAfterWedding && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-block px-5 py-2 rounded-full border border-gold-200/40 bg-gold-50/70 text-gold-900 text-sm font-bold shadow-xs tracking-wide animate-pulse"
                >
                  עוד {daysRounded} ימים לחתונה הגדולה!
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Real-time Ticking Countdown Block - Single Continuous Chronological Row representation with year at far left */}
          <motion.div variants={itemVariants} className="w-full">
            <AnimatePresence mode="wait">
              {timeLeft.isWeddingDay ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="mx-auto max-w-xl p-8 rounded-3xl luxury-glass shadow-xl border-gold-300 bg-white/75 flex flex-col items-center justify-center relative overflow-hidden group"
                  id="wedding-day-announcement"
                >
                  <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full bg-gold-100 opacity-50 blur-lg group-hover:bg-gold-200 transition-colors" />
                  <Heart className="w-12 h-12 text-red-500 fill-red-400 animate-bounce mb-3" />
                  <h3 className="font-serif text-3xl md:text-4xl text-gold-950 font-bold mb-1">
                    היום הגדול הגיע!
                  </h3>
                  <p className="text-stone-700 font-serif text-lg max-w-md mt-2 leading-relaxed">
                    יוסף חיים וברכי נכנסים מתחת לחופה הערב בשעה 19:00. מאחלים להם חיים מלאי שמחה, אהבה, ברכה והצלחה בביתם החדש!
                  </p>
                </motion.div>
              ) : timeLeft.isAfterWedding ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="mx-auto max-w-xl p-8 rounded-3xl luxury-glass shadow-xl border-gold-300 bg-white/75 flex flex-col items-center justify-center"
                  id="wedding-day-passed"
                >
                  <Heart className="w-12 h-12 text-gold-650 fill-gold-100 mb-3" />
                  <h3 className="font-serif text-3xl md:text-4xl text-gold-950 font-bold mb-1">
                    נשואים באושר!
                  </h3>
                  <p className="text-stone-700 font-serif text-lg pb-1 mt-2">
                    החתונה המרגשת של יוסף חיים &amp; ברכי התקיימה ביום שישי, כ"ב בניסן ה'תשפ"ו.
                  </p>
                  <div className="w-12 h-[1px] bg-gold-400 my-3"></div>
                  <p className="text-xs tracking-wider uppercase text-gold-800 font-bold">
                    מזל טוב ענק לזוג המקסים!
                  </p>
                </motion.div>
              ) : (
                <div 
                  className="max-w-3xl mx-auto p-4 sm:p-6 rounded-3xl luxury-glass shadow-lg bg-white/80 border border-gold-200/30"
                  id="countdown-container"
                >
                  <div className="text-[10px] uppercase tracking-[0.25em] text-stone-500 font-bold mb-3 md:mb-5 text-center">
                    הזמן הנותר לחתונה המרגשת
                  </div>
                  <div dir="ltr" className="grid grid-cols-4 gap-2.5 sm:gap-4 text-center">
                    {/* Days */}
                    <div className="bg-white/60 p-3 sm:p-5 rounded-2xl border border-gold-100/60 shadow-xs">
                      <span className="text-stone-900 font-mono text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight block">
                        {String(timeLeft.days).padStart(2, '0')}
                      </span>
                      <span className="text-[10px] sm:text-xs text-stone-500 font-extrabold uppercase mt-1 block">
                        ימים
                      </span>
                    </div>

                    {/* Hours */}
                    <div className="bg-white/60 p-3 sm:p-5 rounded-2xl border border-gold-100/60 shadow-xs">
                      <span className="text-stone-900 font-mono text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight block">
                        {String(timeLeft.hours).padStart(2, '0')}
                      </span>
                      <span className="text-[10px] sm:text-xs text-stone-500 font-extrabold uppercase mt-1 block">
                        שעות
                      </span>
                    </div>

                    {/* Minutes */}
                    <div className="bg-white/60 p-3 sm:p-5 rounded-2xl border border-gold-100/60 shadow-xs">
                      <span className="text-stone-900 font-mono text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight block">
                        {String(timeLeft.minutes).padStart(2, '0')}
                      </span>
                      <span className="text-[10px] sm:text-xs text-stone-500 font-extrabold uppercase mt-1 block">
                        דקות
                      </span>
                    </div>

                    {/* Seconds */}
                    <div className="bg-white/60 p-3 sm:p-5 rounded-2xl border border-gold-100/60 shadow-xs">
                      <span className="text-stone-900 font-mono text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight block">
                        {String(timeLeft.seconds).padStart(2, '0')}
                      </span>
                      <span className="text-[10px] sm:text-xs text-stone-500 font-extrabold uppercase mt-1 block">
                        שניות
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Core Venue Block */}
          <motion.div variants={itemVariants} className="flex flex-col items-center justify-center gap-4">
            <div className="w-full max-w-md text-stone-700 space-y-2 mt-4 bg-white/40 backdrop-blur-xs p-4 rounded-2xl border border-gold-200/10 shadow-xs transition-all hover:bg-white/50">
              <p className="text-xs tracking-wider uppercase text-gold-800 font-bold flex items-center justify-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-gold-650" />
                <span>מקום האירוע</span>
              </p>
              <p className="font-serif text-lg font-bold text-stone-900 leading-tight">
                אולמי "היכל הנגינה"
              </p>
              <p className="text-xs text-stone-500 font-medium">
                רחוב רשב"י 21, מודיעין עילית
              </p>
            </div>

            {/* Elegant invitation button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsInvitationOpen(true)}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-700 hover:to-gold-600 text-white font-sans text-xs md:text-sm font-bold py-3 px-8 rounded-full shadow-md shadow-gold-600/15 hover:shadow-lg hover:shadow-gold-600/20 transition-all cursor-pointer border border-gold-400"
            >
              <MailOpen className="w-4 h-4 text-white" />
              <span>פתחו את הזמנת החתונה הרשמית</span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Bounce-Down Indicator */}
      <motion.button
        onClick={onScrollToCalendar}
        className="flex flex-col items-center gap-1.5 p-3 hover:text-gold-650 group text-stone-500 transition-all duration-300 font-medium pointer-events-auto mt-auto cursor-pointer"
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        id="scroll-to-calendar-btn"
      >
        <span className="text-xs uppercase tracking-widest text-[#7a746a] font-bold group-hover:text-gold-800">
          מעבר ללוח השנה האינטראקטיבי
        </span>
        <ChevronDown className="w-5 h-5 text-gold-500 group-hover:text-gold-650" />
      </motion.button>
      <InvitationModal 
        isOpen={isInvitationOpen} 
        onClose={() => setIsInvitationOpen(false)} 
      />
    </section>
  );
}
