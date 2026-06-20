import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Calendar, Heart, Sparkles, CheckCircle2 } from 'lucide-react';
import { DayInfo } from '../types';

interface CalendarSectionProps {
  weddingDate: Date;
  timeOffset?: number;
}

interface HebrewMonthData {
  name: string;
  year: string;
  startGregorian: Date;
  daysCount: number;
  startDayOfWeek: number; // 0 is Sunday, 1 Monday, etc.
}

const HEBREW_MONTHS: HebrewMonthData[] = [
  {
    name: "סיוון",
    year: "ה'תשפ\"ו",
    startGregorian: new Date('2026-05-17T00:00:00'),
    daysCount: 30,
    startDayOfWeek: 0, // May 17, 2026 is Sunday
  },
  {
    name: "תמוז",
    year: "ה'תשפ\"ו",
    startGregorian: new Date('2026-06-16T00:00:00'),
    daysCount: 29,
    startDayOfWeek: 2, // June 16, 2026 is Tuesday
  },
  {
    name: "אב",
    year: "ה'תשפ\"ו",
    startGregorian: new Date('2026-07-15T00:00:00'),
    daysCount: 30,
    startDayOfWeek: 3, // July 15, 2026 is Wednesday (Day 27 is Aug 10)
  },
  {
    name: "אלול",
    year: "ה'תשפ\"ו",
    startGregorian: new Date('2026-08-14T00:00:00'),
    daysCount: 29,
    startDayOfWeek: 5, // August 14, 2026 is Friday
  }
];

const WEEKDAYS = ["א'", "ב'", "ג'", "ד'", "ה'", "ו'", "ש'"];

const getHebDateLetter = (dayNum: number): string => {
  const letters: Record<number, string> = {
    1: "א'", 2: "ב'", 3: "ג'", 4: "ד'", 5: "ה'", 6: "ו'", 7: "ז'", 8: "ח'", 9: "ט'", 10: "י'",
    11: "י\"א", 12: "י\"ב", 13: "י\"ג", 14: "י\"ד", 15: "ט\"ו", 16: "ט\"ז", 17: "י\"ז", 18: "י\"ח", 19: "י\"ט", 20: "כ'",
    21: "כ\"א", 22: "כ\"ב", 23: "כ\"ג", 24: "כ\"ד", 25: "כ\"ה", 26: "כ\"ו", 27: "כ\"ז", 28: "כ\"ח", 29: "כ\"ט", 30: "ל'"
  };
  return letters[dayNum] || String(dayNum);
};

// Formats a Gregorian date nicely in Hebrew
const formatGregorianDaySimple = (date: Date): string => {
  const d = String(date.getDate()).padStart(2, '0');
  const m = String(date.getMonth() + 1).padStart(2, '0');
  return `${d}.${m}`;
};

export default function CalendarSection({ weddingDate, timeOffset = 0 }: CalendarSectionProps) {
  // Calendar System Mode - toggle between Hebrew Calendar structure (default) and standard Gregorian
  const [calendarMode, setCalendarMode] = useState<'hebrew' | 'gregorian'>('hebrew');

  // Interactive Virtual Date Simulation
  const [useVirtualDate, setUseVirtualDate] = useState(false);
  const [simulatedTodayStr, setSimulatedTodayStr] = useState("2026-06-20");

  const today = useMemo(() => {
    if (useVirtualDate) {
      const parts = simulatedTodayStr.split('-');
      return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
    }
    // High-precision server offset computed dynamically
    return new Date(Date.now() + timeOffset);
  }, [useVirtualDate, simulatedTodayStr, timeOffset]);

  // Selected Month Focus
  const [hebrewMonthIndex, setHebrewMonthIndex] = useState(2); // Initially focus "אב" (Aug Index 2)
  const [gregorianMonth, setGregorianMonth] = useState(7); // August is index 7
  const [gregorianYear, setGregorianYear] = useState(2026);

  // Click Details Panel state
  const [selectedDay, setSelectedDay] = useState<{
    date: Date;
    hebrewLabel: string;
    dayNumHebrew: number;
    isWedding: boolean;
  } | null>(null);

  // 1. Build HEBREW Calendar Grid
  const hebrewGridDays = useMemo(() => {
    const selectedMonth = HEBREW_MONTHS[hebrewMonthIndex];
    const days: Array<{
      date: Date;
      hebrewDayNum: number;
      hebrewDayLetter: string;
      isCurrentMonth: boolean;
      isToday: boolean;
      isPassed: boolean;
      isWeddingDay: boolean;
    }> = [];

    const startOfWeek = selectedMonth.startDayOfWeek;
    
    // Previous Hebrew month data
    const prevMonthIdx = hebrewMonthIndex === 0 ? HEBREW_MONTHS.length - 1 : hebrewMonthIndex - 1;
    const prevMonth = HEBREW_MONTHS[prevMonthIdx];

    // Padding from previous Hebrew Month
    for (let i = startOfWeek - 1; i >= 0; i--) {
      const dayNum = prevMonth.daysCount - i;
      const d = new Date(prevMonth.startGregorian.getTime());
      d.setDate(d.getDate() + (dayNum - 1));

      const todayDateOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const checkDateOnly = new Date(d.getFullYear(), d.getMonth(), d.getDate());
      const isPassed = checkDateOnly.getTime() < todayDateOnly.getTime();

      const isWedding = d.getFullYear() === weddingDate.getFullYear() &&
                        d.getMonth() === weddingDate.getMonth() &&
                        d.getDate() === weddingDate.getDate();

      days.push({
        date: d,
        hebrewDayNum: dayNum,
        hebrewDayLetter: getHebDateLetter(dayNum),
        isCurrentMonth: false,
        isToday: d.toDateString() === today.toDateString(),
        isPassed,
        isWeddingDay: isWedding
      });
    }

    // Days in of Current Hebrew Month
    for (let dayNum = 1; dayNum <= selectedMonth.daysCount; dayNum++) {
      const d = new Date(selectedMonth.startGregorian.getTime());
      d.setDate(d.getDate() + (dayNum - 1));

      const todayDateOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const checkDateOnly = new Date(d.getFullYear(), d.getMonth(), d.getDate());
      const isPassed = checkDateOnly.getTime() < todayDateOnly.getTime();

      const isWedding = d.getFullYear() === weddingDate.getFullYear() &&
                        d.getMonth() === weddingDate.getMonth() &&
                        d.getDate() === weddingDate.getDate();

      days.push({
        date: d,
        hebrewDayNum: dayNum,
        hebrewDayLetter: getHebDateLetter(dayNum),
        isCurrentMonth: true,
        isToday: d.toDateString() === today.toDateString(),
        isPassed,
        isWeddingDay: isWedding
      });
    }

    // Next Hebrew Month Padding 
    const nextMonthIdx = hebrewMonthIndex === HEBREW_MONTHS.length - 1 ? 0 : hebrewMonthIndex + 1;
    const nextMonth = HEBREW_MONTHS[nextMonthIdx];
    const remainingCount = (7 - (days.length % 7)) % 7;

    for (let i = 1; i <= remainingCount; i++) {
      const d = new Date(nextMonth.startGregorian.getTime());
      d.setDate(d.getDate() + (i - 1));

      const todayDateOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const checkDateOnly = new Date(d.getFullYear(), d.getMonth(), d.getDate());
      const isPassed = checkDateOnly.getTime() < todayDateOnly.getTime();

      const isWedding = d.getFullYear() === weddingDate.getFullYear() &&
                        d.getMonth() === weddingDate.getMonth() &&
                        d.getDate() === weddingDate.getDate();

      days.push({
        date: d,
        hebrewDayNum: i,
        hebrewDayLetter: getHebDateLetter(i),
        isCurrentMonth: false,
        isToday: d.toDateString() === today.toDateString(),
        isPassed,
        isWeddingDay: isWedding
      });
    }

    return days;
  }, [hebrewMonthIndex, today, weddingDate]);

  // 2. Fallback Gregorian Custom Mapping (Used to resolve general Month lookup if requested)
  const getHebrewLabelForGregorian = (date: Date): string => {
    // Elegant mapper for quick resolution
    const timestamp = date.getTime();
    for (let i = 0; i < HEBREW_MONTHS.length; i++) {
      const m = HEBREW_MONTHS[i];
      const start = m.startGregorian.getTime();
      const end = start + (m.daysCount * 24 * 60 * 60 * 1000);
      if (timestamp >= start && timestamp < end) {
        const daysDiff = Math.floor((timestamp - start) / (24 * 60 * 60 * 1000));
        return `${getHebDateLetter(daysDiff + 1)} ב${m.name}`;
      }
    }
    return '';
  };

  const gregorianGridDays = useMemo(() => {
    const days: DayInfo[] = [];
    const dateOfFirst = new Date(gregorianYear, gregorianMonth, 1);
    const startOfWeek = dateOfFirst.getDay();
    const totalDays = new Date(gregorianYear, gregorianMonth + 1, 0).getDate();

    const prevMonthIdx = gregorianMonth === 0 ? 11 : gregorianMonth - 1;
    const prevYear = gregorianMonth === 0 ? gregorianYear - 1 : gregorianYear;
    const daysInPrev = new Date(prevYear, prevMonthIdx + 1, 0).getDate();

    for (let i = startOfWeek - 1; i >= 0; i--) {
      const dayNum = daysInPrev - i;
      const d = new Date(prevYear, prevMonthIdx, dayNum);
      const isWedding = d.getFullYear() === weddingDate.getFullYear() &&
                        d.getMonth() === weddingDate.getMonth() &&
                        d.getDate() === weddingDate.getDate();
      days.push({
        date: d,
        dayNumber: dayNum,
        isWeddingDay: isWedding,
        isPassed: d.getTime() < today.setHours(0, 0, 0, 0),
        isCurrentMonth: false,
        isToday: d.toDateString() === today.toDateString(),
        formattedHebrewDate: getHebrewLabelForGregorian(d)
      });
    }

    for (let dayNum = 1; dayNum <= totalDays; dayNum++) {
      const d = new Date(gregorianYear, gregorianMonth, dayNum);
      const isWedding = d.getFullYear() === weddingDate.getFullYear() &&
                        d.getMonth() === weddingDate.getMonth() &&
                        d.getDate() === weddingDate.getDate();
      days.push({
        date: d,
        dayNumber: dayNum,
        isWeddingDay: isWedding,
        isPassed: d.getTime() < today.setHours(0, 0, 0, 0),
        isCurrentMonth: true,
        isToday: d.toDateString() === today.toDateString(),
        formattedHebrewDate: getHebrewLabelForGregorian(d)
      });
    }

    const remaining = (7 - (days.length % 7)) % 7;
    const nextMonthIdx = gregorianMonth === 11 ? 0 : gregorianMonth + 1;
    const nextYear = gregorianMonth === 11 ? gregorianYear + 1 : gregorianYear;
    for (let i = 1; i <= remaining; i++) {
      const d = new Date(nextYear, nextMonthIdx, i);
      const isWedding = d.getFullYear() === weddingDate.getFullYear() &&
                        d.getMonth() === weddingDate.getMonth() &&
                        d.getDate() === weddingDate.getDate();
      days.push({
        date: d,
        dayNumber: i,
        isWeddingDay: isWedding,
        isPassed: d.getTime() < today.setHours(0, 0, 0, 0),
        isCurrentMonth: false,
        isToday: d.toDateString() === today.toDateString(),
        formattedHebrewDate: getHebrewLabelForGregorian(d)
      });
    }

    return days;
  }, [gregorianMonth, gregorianYear, today, weddingDate]);

  // Counts for the feedback bar
  const currentHebewMonthObj = HEBREW_MONTHS[hebrewMonthIndex];
  const passedDaysCount = useMemo(() => {
    if (calendarMode === 'hebrew') {
      return hebrewGridDays.filter(d => d.isCurrentMonth && d.isPassed).length;
    } else {
      return gregorianGridDays.filter(d => d.isCurrentMonth && d.isPassed).length;
    }
  }, [calendarMode, hebrewGridDays, gregorianGridDays]);

  const totalCurrentGridDays = useMemo(() => {
    if (calendarMode === 'hebrew') {
      return currentHebewMonthObj.daysCount;
    } else {
      return new Date(gregorianYear, gregorianMonth + 1, 0).getDate();
    }
  }, [calendarMode, hebrewMonthIndex, gregorianMonth, gregorianYear]);

  // Note text resolution
  const detailNoteText = useMemo(() => {
    if (!selectedDay) return '';
    
    if (selectedDay.isWedding) {
      return `היום המאושר בחייהם! טקס החופה המקודש של יוסף חיים וברכי יתקיים אי"ה בשעה 19:00 באולמי "היכל הנגינה", רחוב רשב"י 21, מודיעין עילית.`;
    }

    const tSelected = new Date(selectedDay.date.getFullYear(), selectedDay.date.getMonth(), selectedDay.date.getDate());
    const tWedding = new Date(weddingDate.getFullYear(), weddingDate.getMonth(), weddingDate.getDate());
    const diffTime = tSelected.getTime() - tWedding.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return "יום החתונה הגדול והמאושר!";
    } else if (diffDays < 0) {
      return `עוד ${Math.abs(diffDays)} ימים לחתונה הגדולה של יוסף חיים וברכי! כל יום מקרב אותנו לקראת שמחת הנישואין המרגשת תחת החופה.`;
    } else {
      return `עברו כבר ${diffDays} ימים מאז החתונה המרגשת. אנו מאחלים לזוג היקר בניין עדי עד, שמחה, הצלחה ושפע ברכות בביתם החדש!`;
    }
  }, [selectedDay, weddingDate]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-16" id="calendar-destination">
      {/* HEADER SECTION */}
      <div className="text-center space-y-4 mb-10">
        <div className="inline-flex p-2.5 bg-gold-50 text-gold-650 rounded-full border border-gold-200">
          <Calendar className="w-5 h-5 text-gold-650 animate-pulse" />
        </div>
        <h2 className="text-3xl md:text-4xl font-serif text-stone-900 font-medium tracking-tight">
          לוח למעקב התקדמות החתונה
        </h2>
        <p className="text-stone-500 max-w-xl mx-auto text-sm leading-relaxed">
          גלו לוח שנה עברי מקורי המציג את שלבי הזמן לפי חודשי הירח העבריים. הימים שחלפו נמחקים אוטומטית לקראת יום החופה המרגש ב-כ"ז באב.
        </p>
      </div>

      {/* MODE SELECTOR (Proper Hebrew Months vs Gregorian Conversion) */}
      <div className="flex justify-center mb-8">
        <div className="p-1 rounded-full bg-stone-100 border border-stone-200/50 inline-flex">
          <button
            onClick={() => {
              setCalendarMode('hebrew');
              setSelectedDay(null);
            }}
            className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
              calendarMode === 'hebrew'
                ? 'bg-white text-gold-950 shadow-xs'
                : 'text-stone-500 hover:text-stone-800'
            }`}
            id="mode-hebrew-btn"
          >
            לוח שנה עברי (חודשי ירח)
          </button>
          <button
            onClick={() => {
              setCalendarMode('gregorian');
              setSelectedDay(null);
            }}
            className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
              calendarMode === 'gregorian'
                ? 'bg-white text-gold-950 shadow-xs'
                : 'text-stone-500 hover:text-stone-800'
            }`}
            id="mode-gregorian-btn"
          >
            לוח לועזי (חודשי אוגוסט)
          </button>
        </div>
      </div>

      {/* PROGRESSION SIMULATOR WITH SYSTEM TIME SYNC */}
      <div className="mb-8 p-4 rounded-2xl bg-white/60 border border-gold-200/20 backdrop-blur-md shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <input 
            type="checkbox" 
            id="virtual-date"
            checked={useVirtualDate} 
            onChange={(e) => {
              setUseVirtualDate(e.target.checked);
              setSelectedDay(null);
            }}
            className="w-4 h-4 text-gold-650 focus:ring-gold-500 border-stone-300 rounded cursor-pointer"
          />
          <label htmlFor="virtual-date" className="text-xs font-bold text-stone-700 cursor-pointer">
            סנכרון מדומה / בדיקת התקדמות הלוח (סימולטור)
          </label>
        </div>

        {useVirtualDate ? (
          <div className="flex items-center gap-2 animate-in fade-in slide-in-from-top-1 duration-200">
            <span className="text-xs text-stone-500">תאריך סימולציה:</span>
            <input 
              type="date" 
              value={simulatedTodayStr}
              onChange={(e) => {
                setSimulatedTodayStr(e.target.value);
                setSelectedDay(null);
              }}
              className="px-2.5 py-1 text-xs border border-gold-200 bg-white rounded-lg focus:outline-none focus:ring-1 focus:ring-gold-500 font-mono text-stone-700"
              min="2026-05-01"
              max="2026-09-01"
            />
          </div>
        ) : (
          <div className="text-xs text-stone-500 flex items-center gap-1">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span>סנכרון חי מול שעון המערכת והמשתמש פעיל</span>
          </div>
        )}

        <div className="text-xs font-bold text-gold-900 bg-gold-100/50 px-3 py-1.5 rounded-full flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-gold-650" />
          <span>
            {passedDaysCount} מתוך {totalCurrentGridDays} ימים עברו כבר במחזור הנוכחי
          </span>
        </div>
      </div>

      {/* RENDER CALENDAR CONTAINER */}
      <div className="bg-white/85 rounded-3xl shadow-xl border border-gold-100/40 p-5 md:p-8 backdrop-blur-md">
        
        {/* MONTH HEADER - HEBREW MODE */}
        {calendarMode === 'hebrew' ? (
          <div className="flex flex-col space-y-4 mb-8">
            {/* Quick Lunar tabs */}
            <div className="grid grid-cols-4 gap-1.5 md:gap-3">
              {HEBREW_MONTHS.map((m, idx) => {
                const isActive = hebrewMonthIndex === idx;
                const isWeddingMonth = idx === 2; // אב
                return (
                  <button
                    key={m.name}
                    onClick={() => {
                      setHebrewMonthIndex(idx);
                      setSelectedDay(null);
                    }}
                    className={`py-3 px-1 md:px-3 rounded-2xl text-[11px] md:text-sm font-bold tracking-wide transition-all border ${
                      isActive 
                        ? 'bg-gold-500 text-white border-gold-600 shadow-md transform -y-1' 
                        : 'bg-white text-stone-600 hover:text-stone-900 hover:bg-gold-50/20 border-stone-200/60'
                    } flex flex-col items-center justify-center relative cursor-pointer`}
                  >
                    <span>{m.name}</span>
                    <span className={`text-[9px] font-normal tracking-normal ${isActive ? 'text-gold-100' : 'text-stone-400'}`}>
                      {m.year}
                    </span>
                    {isWeddingMonth && (
                      <span className="absolute -top-1.5 -right-1 flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            
            <div className="text-center pt-2">
              <span className="text-xs text-stone-400 tracking-wider">
                חודש {currentHebewMonthObj.name} מקביל בעיקרו לטווח התאריכים {formatGregorianDaySimple(currentHebewMonthObj.startGregorian)} - {formatGregorianDaySimple(new Date(currentHebewMonthObj.startGregorian.getTime() + (currentHebewMonthObj.daysCount - 1) * 24 * 60 * 60 * 1000))}
              </span>
            </div>
          </div>
        ) : (
          /* MONTH HEADER - GREGORIAN MODE */
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-stone-100">
            <div className="flex items-center gap-1">
              <button 
                onClick={() => {
                  if (gregorianMonth === 0) {
                    setGregorianMonth(11);
                    setGregorianYear(gregorianYear - 1);
                  } else {
                    setGregorianMonth(gregorianMonth - 1);
                  }
                  setSelectedDay(null);
                }}
                className="p-2 hover:bg-gold-50 text-stone-600 hover:text-gold-800 rounded-full cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => {
                  if (gregorianMonth === 11) {
                    setGregorianMonth(0);
                    setGregorianYear(gregorianYear + 1);
                  } else {
                    setGregorianMonth(gregorianMonth + 1);
                  }
                  setSelectedDay(null);
                }}
                className="p-2 hover:bg-gold-50 text-stone-600 hover:text-gold-800 rounded-full cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>

            <div className="text-center font-bold">
              <h3 className="text-xl md:text-2xl font-serif text-stone-950">
                {["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"][gregorianMonth]} {gregorianYear}
              </h3>
            </div>

            <div>
              {(gregorianMonth !== weddingDate.getMonth() || gregorianYear !== weddingDate.getFullYear()) ? (
                <button
                  onClick={() => {
                    setGregorianMonth(weddingDate.getMonth());
                    setGregorianYear(weddingDate.getFullYear());
                    setSelectedDay(null);
                  }}
                  className="text-xs font-bold px-3 py-1.5 bg-gold-50 text-gold-700 border border-gold-200 rounded-full hover:bg-gold-100 transition-all flex items-center gap-1 cursor-pointer"
                >
                  <Sparkles className="w-3 h-3 text-gold-500" />
                  <span>חודש החתונה</span>
                </button>
              ) : (
                <div className="text-xs px-3 py-1.5 bg-gold-100 text-gold-900 rounded-full flex items-center gap-1.5 font-bold">
                  <Heart className="w-3 h-3 text-red-500 fill-red-500 animate-pulse" />
                  <span>אוגוסט 2026</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Days of Week Headers */}
        <div className="grid grid-cols-7 gap-1 md:gap-3 text-center mb-4">
          {WEEKDAYS.map(day => (
            <div key={day} className="text-xs md:text-sm font-bold tracking-wider text-stone-400 py-1">
              ישבת {day === "ש'" ? '' : 'יום ' + day.replace("'", "")}
            </div>
          ))}
        </div>

        {/* 3. CALENDAR DAYS GRID LAYOUT */}
        <div className="grid grid-cols-7 gap-1 md:gap-3 animate-fade-in duration-300">
          
          {/* HEBREW INTERACTIVE GRID */}
          {calendarMode === 'hebrew' ? (
            hebrewGridDays.map((day, idx) => {
              const isSelected = selectedDay && day.date.toDateString() === selectedDay.date.toDateString();
              
              return (
                <div
                  key={`${day.date.toDateString()}-${idx}`}
                  onClick={() => setSelectedDay({
                    date: day.date,
                    hebrewLabel: `${day.hebrewDayLetter} ב${HEBREW_MONTHS[hebrewMonthIndex].name}`,
                    dayNumHebrew: day.hebrewDayNum,
                    isWedding: day.isWeddingDay
                  })}
                  className={`
                    relative aspect-square rounded-xl md:rounded-2xl flex flex-col justify-between p-1.5 md:p-3 cursor-pointer select-none transition-all duration-300 border
                    ${day.isCurrentMonth ? 'bg-white/40' : 'bg-stone-50/10 text-stone-300 opacity-20'}
                    ${day.isToday ? 'ring-2 ring-gold-500 bg-gold-50/20' : ''}
                    ${isSelected ? 'border-gold-500 scale-[1.03] shadow-md bg-gold-50/10' : 'border-stone-100 hover:border-gold-200 hover:bg-gold-50/10'}
                  `}
                >
                  {/* Visual Cross Off for Passed Days */}
                  {day.isPassed && (
                    <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none rounded-xl md:rounded-2xl">
                      <div className="w-[141%] h-[1.5px] bg-gradient-to-r from-transparent via-red-300/40 to-transparent rotate-45 transform" />
                      <div className="absolute inset-0 bg-stone-100/10 backdrop-brightness-95 rounded-xl md:rounded-2xl" />
                    </div>
                  )}

                  {/* Day Label in Letters */}
                  <div className="flex justify-between items-start w-full">
                    <span className={`
                      text-xs md:text-sm font-bold tracking-tight
                      ${day.isPassed ? 'text-stone-300 line-through decoration-transparent' : 'text-stone-850'}
                      ${day.isWeddingDay ? 'text-red-600 font-extrabold' : ''}
                      ${day.isToday ? 'text-gold-950 font-black' : ''}
                    `}>
                      {day.hebrewDayLetter}
                    </span>

                    {day.isWeddingDay && (
                      <motion.div
                        animate={{ scale: [1, 1.15, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="shrink-0"
                      >
                        <Heart className="w-4 h-4 md:w-5 md:h-5 text-red-500 fill-red-500" />
                      </motion.div>
                    )}
                  </div>

                  {/* Gregorian Date representation corresponding at bottom */}
                  <span className={`
                    text-[9px] md:text-[10px] text-right font-mono font-medium
                    ${day.isPassed ? 'text-stone-300' : 'text-stone-500'}
                    ${isSelected ? 'text-gold-950' : ''}
                  `}>
                    {formatGregorianDaySimple(day.date)}
                  </span>

                  {day.isToday && (
                    <span className="absolute bottom-1 left-1 pointer-events-none font-sans text-[7px] md:text-[8px] bg-gold-600 text-white font-bold rounded px-1 transform scale-90 origin-bottom-left">
                      היום
                    </span>
                  )}
                </div>
              );
            })
          ) : (
            /* GREGORIAN INTERACTIVE GRID */
            gregorianGridDays.map((day, idx) => {
              const isSelected = selectedDay && day.date.toDateString() === selectedDay.date.toDateString();
              
              return (
                <div
                  key={`${day.date.toDateString()}-${idx}`}
                  onClick={() => setSelectedDay({
                    date: day.date,
                    hebrewLabel: day.formattedHebrewDate || '',
                    dayNumHebrew: parseInt(day.formattedHebrewDate?.split(' ')[0] || '1'),
                    isWedding: day.isWeddingDay
                  })}
                  className={`
                    relative aspect-square rounded-xl md:rounded-2xl flex flex-col justify-between p-1.5 md:p-3 cursor-pointer select-none transition-all duration-300 border
                    ${day.isCurrentMonth ? 'bg-white/40' : 'bg-stone-50/10 text-stone-300 opacity-20'}
                    ${day.isToday ? 'ring-2 ring-gold-500 bg-gold-50/20' : ''}
                    ${isSelected ? 'border-gold-500 scale-[1.03] shadow-md bg-gold-50/10' : 'border-stone-100 hover:border-gold-200 hover:bg-gold-50/10'}
                  `}
                >
                  {/* Strike-through for passed */}
                  {day.isPassed && (
                    <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none rounded-xl md:rounded-2xl">
                      <div className="w-[141%] h-[1.5px] bg-gradient-to-r from-transparent via-red-300/40 to-transparent rotate-45 transform" />
                      <div className="absolute inset-0 bg-stone-100/10 backdrop-brightness-95 rounded-xl md:rounded-2xl" />
                    </div>
                  )}

                  <div className="flex justify-between items-start w-full">
                    <span className={`
                      text-sm md:text-lg font-mono font-medium tracking-tight
                      ${day.isPassed ? 'text-stone-300 line-through' : 'text-stone-800'}
                      ${day.isWeddingDay ? 'text-gold-950 font-bold' : ''}
                      ${day.isToday ? 'text-gold-950 font-black' : ''}
                    `}>
                      {day.dayNumber}
                    </span>

                    {day.isWeddingDay && (
                      <motion.div
                        animate={{ scale: [1, 1.15, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="shrink-0"
                      >
                        <Heart className="w-4 h-4 md:w-5 md:h-5 text-red-500 fill-red-500" />
                      </motion.div>
                    )}
                  </div>

                  <span className={`
                    text-[9px] md:text-xs text-right truncate max-w-full font-serif font-semibold
                    ${day.isPassed ? 'text-stone-300' : 'text-gold-800'}
                    ${isSelected ? 'text-stone-900' : ''}
                  `}>
                    {day.formattedHebrewDate?.split(' ')[0]}
                  </span>

                  {day.isToday && (
                    <span className="absolute bottom-1 left-1 pointer-events-none font-sans text-[7px] md:text-[8px] bg-gold-600 text-white font-bold rounded px-1 scale-90">
                      היום
                    </span>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* 4. DETAIL PANEL POPUP FOR ACTIVE DAYS */}
      <AnimatePresence mode="wait">
        {selectedDay && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="mt-6 p-5 rounded-2xl luxury-glass border border-gold-300 bg-white/95 shadow-xs flex items-start gap-4"
            id="day-detail-panel"
          >
            <div className="p-3 bg-gold-50 rounded-xl text-gold-700 border border-gold-100 shrink-0">
              {selectedDay.isWedding ? (
                <Sparkles className="w-5 h-5 text-gold-650 animate-spin" style={{ animationDuration: '6s' }} />
              ) : (
                <Calendar className="w-5 h-5 text-gold-650" />
              )}
            </div>
            <div className="space-y-1">
              <h4 className="font-serif text-lg text-stone-900 font-bold">
                {selectedDay.date.getDate()} ב{["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"][selectedDay.date.getMonth()]} {selectedDay.date.getFullYear()}
                {selectedDay.hebrewLabel && (
                  <span className="text-gold-700 font-serif text-sm font-bold block md:inline md:mr-2">
                     ({selectedDay.hebrewLabel})
                  </span>
                )}
              </h4>
              <p className="text-stone-650 text-sm leading-relaxed mt-1">
                {detailNoteText}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
