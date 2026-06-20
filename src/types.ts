export interface CountdownTime {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalMs: number;
  isWeddingDay: boolean;
  isAfterWedding: boolean;
}

export interface DayInfo {
  date: Date;
  dayNumber: number;
  isWeddingDay: boolean;
  isPassed: boolean;
  isCurrentMonth: boolean;
  isToday: boolean;
  formattedHebrewDate?: string;
}
