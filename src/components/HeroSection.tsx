import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Clock, Heart, ChevronDown } from 'lucide-react';
import { CountdownTime } from '../types';

interface HeroSectionProps {
  weddingDate: Date;
  onScrollToCalendar: () => void;
}

export default function HeroSection({ weddingDate, onScrollToCalendar }: HeroSectionProps) {
  const [timeLeft, setTimeLeft] = useState<CountdownTime>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalMs: 0,
    isWeddingDay: false,
    isAfterWedding: false,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const differenceMs = weddingDate.getTime() - now.getTime();
      
      // Determine if it's the wedding day (August 10, 2026, from 00:00 until 23:59:59)
      const isSameDate = 
        now.getFullYear() === weddingDate.getFullYear() &&
        now.getMonth() === weddingDate.getMonth() &&
        now.getDate() === weddingDate.getDate();

      const isAfterWedding = differenceMs < 0 && !isSameDate;

      if (differenceMs <= 0) {
        // If it's today (the wedding day)
        if (isSameDate) {
          setTimeLeft({
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            totalMs: differenceMs,
            isWeddingDay: true,
            isAfterWedding: false,
          });
        } else {
          // Wedding has passed
          setTimeLeft({
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            totalMs: differenceMs,
            isWeddingDay: false,
            isAfterWedding: true,
          });
        }
        return;
      }

      const days = Math.floor(differenceMs / (1000 * 60 * 60 * 24));
      const hours = Math.floor((differenceMs / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((differenceMs / 1000 / 60) % 60);
      const seconds = Math.floor((differenceMs / 1000) % 60);

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
  }, [weddingDate]);

  // Framer-motion layout variables
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } }
  };

  const countBoxVariants = {
    hover: { 
      y: -6, 
      boxShadow: "0 20px 25px -5px rgba(219, 161, 83, 0.1), 0 10px 10px -5px rgba(219, 161, 83, 0.04)" ,
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
          <motion.div variants={itemVariants} className="space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-gold-700 font-medium font-sans">
              Save the Date
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-slate-900 tracking-tight leading-none px-2 font-light">
              Yosef Chaim <span className="text-gold-500 font-normal italic">&amp;</span> Brachi
            </h1>
            <div className="flex items-center justify-center gap-2 mt-4">
              <span className="h-[1px] w-8 bg-gold-300"></span>
              <p className="text-md sm:text-lg font-serif italic text-stone-600 font-medium">
                Are getting married!
              </p>
              <span className="h-[1px] w-8 bg-gold-300"></span>
            </div>
          </motion.div>

          {/* Core Date & Time Header */}
          <motion.div variants={itemVariants} className="inline-flex flex-wrap items-center justify-center gap-4 py-3 px-6 rounded-full bg-white/40 border border-gold-300/30 backdrop-blur-md shadow-sm">
            <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold tracking-wide text-gold-900">
              <Calendar className="w-4 h-4 text-gold-500" />
              <span>August 10, 2026</span>
            </div>
            <span className="text-gold-300 hidden sm:inline">|</span>
            <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold tracking-wide text-gold-900">
              <span className="font-serif">כ"ז באב תשפ"ו</span>
            </div>
            <span className="text-gold-300 hidden sm:inline">|</span>
            <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold tracking-wide text-gold-900">
              <Clock className="w-4 h-4 text-gold-500" />
              <span>Chuppah at 7:00 PM</span>
            </div>
          </motion.div>

          {/* Real-time Ticking Countdown Block */}
          <motion.div variants={itemVariants} className="w-full">
            <AnimatePresence mode="wait">
              {timeLeft.isWeddingDay ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="mx-auto max-w-xl p-8 rounded-3xl luxury-glass shadow-xl border-gold-300 bg-white/70 flex flex-col items-center justify-center relative overflow-hidden group"
                  id="wedding-day-announcement"
                >
                  <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full bg-gold-100 opacity-50 blur-lg group-hover:bg-gold-200 transition-colors" />
                  <Heart className="w-12 h-12 text-gold-500 fill-gold-400 animate-bounce mb-3" />
                  <h3 className="font-serif text-3xl md:text-4xl text-gold-900 font-bold mb-1">
                    Today is the Big Day!
                  </h3>
                  <p className="text-stone-600 font-serif italic text-lg max-w-md">
                    Yosef Chaim and Brachi are stepping under the Chuppah tonight at 7:00 PM. Wishing them a lifetime of joy, laughter & endless blessings!
                  </p>
                </motion.div>
              ) : timeLeft.isAfterWedding ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="mx-auto max-w-xl p-8 rounded-3xl luxury-glass shadow-xl border-gold-300 bg-white/70 flex flex-col items-center justify-center"
                  id="wedding-day-passed"
                >
                  <Heart className="w-12 h-12 text-gold-600 fill-gold-100 mb-3" />
                  <h3 className="font-serif text-3xl md:text-4xl text-gold-950 font-semibold mb-1">
                    Happily Married!
                  </h3>
                  <p className="text-stone-600 font-serif italic text-lg pb-1">
                    Yosef Chaim &amp; Brachi were married on August 10, 2026.
                  </p>
                  <div className="w-12 h-[1px] bg-gold-400 my-2"></div>
                  <p className="text-xs tracking-wider uppercase text-gold-800 font-medium">
                    Congratulations to the beautiful couple!
                  </p>
                </motion.div>
              ) : (
                <div 
                  className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
                  id="countdown-grid"
                >
                  {/* Countdown Box Utility Helper */}
                  {[
                    { label: 'Days', value: timeLeft.days },
                    { label: 'Hours', value: timeLeft.hours },
                    { label: 'Minutes', value: timeLeft.minutes },
                    { label: 'Seconds', value: timeLeft.seconds },
                  ].map((item, index) => (
                    <motion.div
                      key={item.label}
                      variants={countBoxVariants}
                      whileHover="hover"
                      className="flex flex-col justify-center items-center p-5 md:p-6 rounded-2xl md:rounded-3xl luxury-glass shadow-md bg-white/70 transition-all border border-gold-200/30"
                      id={`countdown-${item.label.toLowerCase()}`}
                    >
                      <span className="font-mono text-4xl sm:text-5xl md:text-6xl font-extralight text-gold-900 tracking-tight select-all">
                        {String(item.value).padStart(2, '0')}
                      </span>
                      <span className="text-[10px] md:text-xs uppercase tracking-widest text-[#696053] font-sans font-semibold mt-2">
                        {item.label}
                      </span>
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Mini details summary block to anchor the countdown design */}
          <motion.div variants={itemVariants} className="flex justify-center">
            <div className="max-w-md text-stone-600 space-y-2 mt-4">
              <p className="text-xs tracking-wide uppercase text-[#736a5c] font-semibold">
                Venue Location Holder
              </p>
              <p className="font-serif text-sm italic">
                A gorgeous local hall to celebrate their dynamic connection. Join us for kabbalat panim and the sacred bond.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bounce-Down Indicator */}
      <motion.button
        onClick={onScrollToCalendar}
        className="flex flex-col items-center gap-1.5 p-3 hover:text-gold-600 group text-stone-500 transition-all duration-300 font-medium pointer-events-auto mt-auto cursor-pointer"
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        id="scroll-to-calendar-btn"
      >
        <span className="text-xs uppercase tracking-[0.2em] font-sans text-[#7a746a] font-bold group-hover:text-gold-700">
          View Interactive Calendar
        </span>
        <ChevronDown className="w-5 h-5 text-gold-500 group-hover:text-gold-650" />
      </motion.button>
    </section>
  );
}
