import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Calendar, Heart, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';
import { DayInfo } from '../types';

interface CalendarSectionProps {
  weddingDate: Date;
}

// Hebrew month dates mapper for summer 2026 to provide beautifully authentic Hebrew dates
const getHebrewDateLabel = (date: Date): string => {
  const m = date.getMonth(); // 0-indexed
  const d = date.getDate();
  const y = date.getFullYear();

  if (y !== 2026) return '';

  // August 2026 (Month 7) mapping
  if (m === 7) {
    const abMapping: Record<number, string> = {
      1: "י\"ח באב",
      2: "י\"ט באב",
      3: "כ' באב",
      4: "כ\"א באב",
      5: "כ\"ב באב",
      6: "כ\"ג באב",
      7: "כ\"ד באב",
      8: "כ\"ה באב",
      9: "כ\"ו באב",
      10: "כ\"ז באב", // Wedding
      11: "כ\"ח באב",
      12: "כ\"ט באב",
      13: "ל' באב",
      14: "א' באלול",
      15: "ב' באלול",
      16: "ג' באלול",
      17: "ד' באלול",
      18: "ה' באלול",
      19: "ו' באלול",
      20: "ז' באלול",
      21: "ח' באלול",
      22: "ט' באלול",
      23: "י' באלול",
      24: "י\"א באלול",
      25: "י\"ב באלול",
      26: "י\"ג באלול",
      27: "י\"ה באלול",
      28: "י\"ו באלול",
      29: "י\"ז באלול",
      30: "י\"ח באלול",
      31: "י\"ט באלול",
    };
    return abMapping[d] || '';
  }

  // July 2026 (Month 6) mapping
  if (m === 6) {
    const tammuzAbMapping: Record<number, string> = {
      1: "י\"ו בתמוז",
      2: "י\"ז בתמוז",
      3: "י\"ח בתמוז",
      4: "י\"ט בתמוז",
      5: "כ' בתמוז",
      6: "כ\"א בתמוז",
      7: "כ\"ב בתמוז",
      8: "כ\"ג בתמוז",
      9: "כ\"ד בתמוז",
      10: "כ\"ה בתמוז",
      11: "כ\"ו בתמוז",
      12: "כ\"ז בתמוז",
      13: "כ\"ח בתמוז",
      14: "כ\"ט בתמוז",
      15: "א' באב", // Rosh Chodesh Ab
      16: "ב' באב",
      17: "ג' באב",
      18: "ד' באב",
      19: "ה' באב",
      20: "ו' באב",
      21: "ז' באב",
      22: "ח' באב",
      23: "ט' באב",
      24: "י' באב",
      25: "י\"א באב",
      26: "י\"ב באב",
      27: "י\"ג באב",
      28: "י\"ה באב",
      29: "י\"ו באב",
      30: "י\"ז באב",
      31: "י\"ח באב",
    };
    return tammuzAbMapping[d] || '';
  }

  // June 2026 (Month 5) mapping
  if (m === 5) {
    const sivanTammuzMapping: Record<number, string> = {
      1: "י\"ו בסיוון",
      2: "י\"ז בסיוון",
      3: "י\"ח בסיוון",
      4: "י\"ט בסיוון",
      5: "כ' בסיוון",
      6: "כ\"א בסיוון",
      7: "כ\"ב בסיוון",
      8: "כ\"ג בסיוון",
      9: "כ\"ד בסיוון",
      10: "כ\"ה בסיוון",
      11: "כ\"ו בסיוון",
      12: "כ\"ז בסיוון",
      13: "כ\"ח בסיוון",
      14: "כ\"ט בסיוון",
      15: "ל' בסיוון",
      16: "א' בתמוז", // Rosh Chodesh Tammuz
      17: "ב' בתמוז",
      18: "ג' בתמוז",
      19: "ד' בתמוז",
      20: "ה' בתמוז",
      21: "ו' בתמוז",
      22: "ז' בתמוז",
      23: "ח' בתמוז",
      24: "ט' בתמוז",
      25: "י' בתמוז",
      26: "י\"א בתמוז",
      27: "י\"ב בתמוז",
      28: "י\"ג בתמוז",
      29: "י\"ד בתמוז",
      30: "י\"ו בתמוז",
    };
    return sivanTammuzMapping[d] || '';
  }

  return '';
};

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function CalendarSection({ weddingDate }: CalendarSectionProps) {
  // Current virtual date state to allow testing of progression (defaults to June 20, 2026, as specified in prompt metadata)
  const [useVirtualDate, setUseVirtualDate] = useState(false);
  const [simulatedTodayStr, setSimulatedTodayStr] = useState("2026-06-20");
  
  const today = useMemo(() => {
    if (useVirtualDate) {
      const parts = simulatedTodayStr.split('-');
      return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
    }
    return new Date();
  }, [useVirtualDate, simulatedTodayStr]);

  // Calendar month/year focus state (initially set to August 2026 since it's the wedding month)
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(7); // August is 7

  // Day click note feedback
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);

  // Grid builder
  const daysInGrid = useMemo(() => {
    const days: DayInfo[] = [];
    const dateOfFirst = new Date(currentYear, currentMonth, 1);
    const firstDayOfWeek = dateOfFirst.getDay(); // 0 is Sunday
    const totalDaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    // Add padding days from the previous month
    const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    const daysInPrevMonth = new Date(prevYear, prevMonth + 1, 0).getDate();

    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const dayNum = daysInPrevMonth - i;
      const d = new Date(prevYear, prevMonth, dayNum);
      const isWedding = d.getFullYear() === weddingDate.getFullYear() &&
                        d.getMonth() === weddingDate.getMonth() &&
                        d.getDate() === weddingDate.getDate();
      
      // Determine if this date is strictly before "today" (passed)
      const isPassed = d.getTime() < today.setHours(0, 0, 0, 0);

      days.push({
        date: d,
        dayNumber: dayNum,
        isWeddingDay: isWedding,
        isPassed: isPassed,
        isCurrentMonth: false,
        isToday: d.toDateString() === today.toDateString(),
        formattedHebrewDate: getHebrewDateLabel(d),
      });
    }

    // Add days of the current month
    for (let dayNum = 1; dayNum <= totalDaysInMonth; dayNum++) {
      const d = new Date(currentYear, currentMonth, dayNum);
      const isWedding = d.getFullYear() === weddingDate.getFullYear() &&
                        d.getMonth() === weddingDate.getMonth() &&
                        d.getDate() === weddingDate.getDate();

      const isPassed = d.getTime() < today.setHours(0, 0, 0, 0);

      days.push({
        date: d,
        dayNumber: dayNum,
        isWeddingDay: isWedding,
        isPassed: isPassed,
        isCurrentMonth: true,
        isToday: d.toDateString() === today.toDateString(),
        formattedHebrewDate: getHebrewDateLabel(d),
      });
    }

    // Add padding days from the next month to complete the grid (multiples of 7)
    const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
    const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;
    const remainingPowerOfSeven = (7 - (days.length % 7)) % 7;
    for (let i = 1; i <= remainingPowerOfSeven; i++) {
      const d = new Date(nextYear, nextMonth, i);
      const isWedding = d.getFullYear() === weddingDate.getFullYear() &&
                        d.getMonth() === weddingDate.getMonth() &&
                        d.getDate() === weddingDate.getDate();

      const isPassed = d.getTime() < today.setHours(0, 0, 0, 0);

      days.push({
        date: d,
        dayNumber: i,
        isWeddingDay: isWedding,
        isPassed: isPassed,
        isCurrentMonth: false,
        isToday: d.toDateString() === today.toDateString(),
        formattedHebrewDate: getHebrewDateLabel(d),
      });
    }

    return days;
  }, [currentYear, currentMonth, today, weddingDate]);

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    setSelectedDay(null);
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    setSelectedDay(null);
  };

  const handleSnapToWeddingMonth = () => {
    setCurrentMonth(weddingDate.getMonth());
    setCurrentYear(weddingDate.getFullYear());
    setSelectedDay(null);
  };

  // Check how many days of the month have elements already passed
  const passedDaysCountMemo = useMemo(() => {
    return daysInGrid.filter(d => d.isCurrentMonth && d.isPassed).length;
  }, [daysInGrid]);

  const totalCurrentMonthDays = useMemo(() => {
    return daysInGrid.filter(d => d.isCurrentMonth).length;
  }, [daysInGrid]);

  const weddingNoteText = useMemo(() => {
    if (!selectedDay) return '';
    const isWeddingSelection = selectedDay.getFullYear() === weddingDate.getFullYear() &&
                               selectedDay.getMonth() === weddingDate.getMonth() &&
                               selectedDay.getDate() === weddingDate.getDate();
    if (isWeddingSelection) {
      return "The Golden Day! Yosef Chaim & Brachi's Chuppah ceremony is scheduled for 7:00 PM (כ\"ז באב תשפ\"ו). Live beautiful memories!";
    }

    const diffTime = selectedDay.getTime() - weddingDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return "Wedding day!";
    } else if (diffDays < 0) {
      return `${Math.abs(diffDays)} days remaining before Yosef Chaim and Brachi stand under the Chuppah. Every day brings us closer!`;
    } else {
      return `${diffDays} days after the wedding celebration. A beautiful chapter of eternal joy has started!`;
    }
  }, [selectedDay, weddingDate]);

  return (
    <div 
      className="max-w-4xl mx-auto px-4 py-16"
      id="calendar-destination"
    >
      <div className="text-center space-y-3 mb-12">
        <div className="inline-flex p-2 bg-gold-50 text-gold-600 rounded-full border border-gold-200">
          <Calendar className="w-5 h-5 text-gold-600" />
        </div>
        <h2 className="text-3xl md:text-4xl font-serif text-slate-900 font-light">
          Wedding Progression Calendar
        </h2>
        <p className="text-stone-500 max-w-lg mx-auto text-sm italic">
          Keep track of the remaining steps as our days counting down are visually crossed off, pointing gracefully towards August 10.
        </p>
      </div>

      {/* Date progression simulation bar (Great visual touch for demonstrating how days are crossed off!) */}
      <div className="mb-8 p-4 rounded-2xl bg-white/50 border border-gold-200/20 backdrop-blur-sm shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <input 
            type="checkbox" 
            id="virtual-date"
            checked={useVirtualDate} 
            onChange={(e) => setUseVirtualDate(e.target.checked)}
            className="w-4 h-4 text-gold-600 focus:ring-gold-500 border-gold-300 rounded cursor-pointer"
          />
          <label htmlFor="virtual-date" className="text-xs font-semibold text-stone-700 cursor-pointer">
            Activate Calendar Progression Simulator
          </label>
        </div>

        {useVirtualDate && (
          <div className="flex items-center gap-2.5 animate-in fade-in slide-in-from-top-1 duration-200">
            <span className="text-xs text-stone-500">Set Simulated Today:</span>
            <input 
              type="date" 
              value={simulatedTodayStr}
              onChange={(e) => setSimulatedTodayStr(e.target.value)}
              className="px-2.5 py-1 text-xs border border-gold-200 bg-white rounded-lg focus:outline-none focus:ring-1 focus:ring-gold-500 font-mono text-stone-700"
              min="2026-05-01"
              max="2026-09-01"
            />
          </div>
        )}

        <div className="text-xs font-medium text-stone-500 bg-gold-100/50 px-3 py-1.5 rounded-full flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-gold-600" />
          <span>
            {passedDaysCountMemo} of {totalCurrentMonthDays} days passed in this month grid
          </span>
        </div>
      </div>

      {/* Calendar visual container */}
      <div className="bg-white/80 rounded-3xl shadow-xl border border-gold-100/40 p-5 md:p-8 backdrop-blur-lg">
        {/* Calendar Nav Headers */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-stone-100">
          <div className="flex items-center gap-1.5">
            <button 
              onClick={handlePrevMonth}
              className="p-2 hover:bg-gold-50 text-stone-600 hover:text-gold-800 rounded-full transition-colors cursor-pointer"
              aria-label="Previous Month"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={handleNextMonth}
              className="p-2 hover:bg-gold-50 text-stone-600 hover:text-gold-800 rounded-full transition-colors cursor-pointer"
              aria-label="Next Month"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="text-center">
            <h3 className="text-xl md:text-2xl font-serif text-slate-900 font-bold">
              {MONTH_NAMES[currentMonth]} {currentYear}
            </h3>
          </div>

          <div>
            {(currentMonth !== weddingDate.getMonth() || currentYear !== weddingDate.getFullYear()) ? (
              <button
                onClick={handleSnapToWeddingMonth}
                className="text-xs font-semibold px-3 py-1.5 bg-gold-50 text-gold-700 border border-gold-200 rounded-full hover:bg-gold-100 transition-all flex items-center gap-1 cursor-pointer shadow-sm active:scale-95"
              >
                <Sparkles className="w-3 h-3 text-gold-500" />
                <span>Wedding Month</span>
              </button>
            ) : (
              <div className="text-xs px-3 py-1.5 bg-gold-100 text-gold-900 rounded-full flex items-center gap-1.5 font-bold">
                <Heart className="w-3 h-3 text-red-500 fill-red-500 animate-pulse" />
                <span>Wedding Month</span>
              </div>
            )}
          </div>
        </div>

        {/* Days of Week Headers */}
        <div className="grid grid-cols-7 gap-1 md:gap-3 text-center mb-4">
          {WEEKDAYS.map(day => (
            <div key={day} className="text-xs md:text-sm font-semibold tracking-wider text-stone-400 uppercase py-1">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Dates Grid */}
        <div className="grid grid-cols-7 gap-1 md:gap-3">
          {daysInGrid.map((day, idx) => {
            const isSelected = selectedDay && day.date.toDateString() === selectedDay.toDateString();
            
            return (
              <div
                key={`${day.date.toDateString()}-${idx}`}
                onClick={() => setSelectedDay(day.date)}
                className={`
                  relative aspect-square rounded-xl md:rounded-2xl flex flex-col justify-between p-1.5 md:p-3 cursor-pointer select-none transition-all duration-300 border
                  ${day.isCurrentMonth ? 'bg-white/40' : 'bg-stone-50/10 text-stone-300 opacity-30'}
                  ${day.isToday ? 'ring-2 ring-gold-500 bg-gold-50/20' : ''}
                  ${isSelected ? 'border-gold-500 scale-[1.03] shadow-md bg-gold-50/10' : 'border-stone-100 hover:border-gold-200 hover:bg-gold-50/10'}
                `}
                id={`calendar-day-${day.date.getDate()}-${day.isCurrentMonth ? 'current' : 'outside'}`}
              >
                {/* Visual strike-through line for passed dates */}
                {day.isPassed && (
                  <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none rounded-xl md:rounded-2xl">
                    <div className="w-[141%] h-[1.5px] bg-gradient-to-r from-transparent via-red-300/60 to-transparent rotate-45 transform" />
                    <div className="absolute inset-0 bg-stone-100/20 backdrop-brightness-95 rounded-xl md:rounded-2xl" />
                  </div>
                )}

                {/* Day Number / Highlight Icon on Wedding Day */}
                <div className="flex justify-between items-start w-full">
                  <span className={`
                    text-sm md:text-lg font-mono font-light tracking-tight
                    ${day.isPassed ? 'text-stone-300 line-through decoration-transparent' : 'text-[#3c362f]'}
                    ${day.isWeddingDay ? 'text-gold-800 font-semibold' : ''}
                    ${day.isToday ? 'text-gold-950 font-bold' : ''}
                  `}>
                    {day.dayNumber}
                  </span>

                  {day.isWeddingDay && (
                    <motion.div
                      animate={{ scale: [1, 1.12, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <Heart className="w-3.5 h-3.5 md:w-5 md:h-5 text-red-500 fill-red-500" />
                    </motion.div>
                  )}
                </div>

                {/* Hebrew Date Text (Bottom-Left) */}
                <span className={`
                  text-[9px] md:text-[10px] text-right font-serif truncate max-w-full
                  ${day.isPassed ? 'text-stone-300' : 'text-stone-500'}
                  ${day.isWeddingDay ? 'text-gold-700 font-medium' : ''}
                  ${isSelected ? 'text-gold-800' : ''}
                `}>
                  {day.formattedHebrewDate && day.formattedHebrewDate.split(' ')[0] /* just show Hebrew date chunk or full on layout width */}
                  <span className="hidden md:inline"> {day.formattedHebrewDate && day.formattedHebrewDate.split(' ')[1]}</span>
                </span>

                {/* Micro circle indicator for simulated today */}
                {day.isToday && (
                  <span className="absolute bottom-1 right-1 font-sans text-[7px] bg-gold-600 text-white rounded px-1 scale-90 md:scale-100">
                    TODAY
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Day Note Panel */}
      <AnimatePresence mode="wait">
        {selectedDay && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="mt-6 p-5 rounded-2xl luxury-glass border border-gold-300 bg-white/90 shadow-md flex items-start gap-4"
            id="day-detail-panel"
          >
            <div className="p-3 bg-gold-50 rounded-xl text-gold-700 border border-gold-100 shrink-0">
              {selectedDay.getFullYear() === weddingDate.getFullYear() &&
               selectedDay.getMonth() === weddingDate.getMonth() &&
               selectedDay.getDate() === weddingDate.getDate() ? (
                <Sparkles className="w-5 h-5 text-gold-600 animate-spin" style={{ animationDuration: '6s' }} />
              ) : (
                <Calendar className="w-5 h-5 text-gold-600" />
              )}
            </div>
            <div className="space-y-1">
              <h4 className="font-serif text-base text-slate-900 font-bold">
                {MONTH_NAMES[selectedDay.getMonth()]} {selectedDay.getDate()}, {selectedDay.getFullYear()}
                {getHebrewDateLabel(selectedDay) && (
                  <span className="text-gold-600 font-serif text-sm font-medium block md:inline md:ml-2">
                    ({getHebrewDateLabel(selectedDay)})
                  </span>
                )}
              </h4>
              <p className="text-stone-600 text-sm italic font-serif">
                {weddingNoteText}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
