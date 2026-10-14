import React from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { getFormattedDate, TODAY, YESTERDAY, TOMORROW } from '../data/mockData';

interface DateRibbonProps {
  selectedDate: string;
  onSelectDate: (date: string) => void;
  matchesByDateCount: Record<string, number>;
}

export const DateRibbon: React.FC<DateRibbonProps> = ({
  selectedDate,
  onSelectDate,
  matchesByDateCount
}) => {
  // Generate a week of date objects around today
  const dateOptions = [-2, -1, 0, 1, 2, 3].map((offset) => {
    const dateStr = getFormattedDate(offset);
    const dateObj = new Date();
    dateObj.setDate(dateObj.getDate() + offset);

    let label = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
    if (offset === -1) label = 'Yesterday';
    if (offset === 0) label = 'Today';
    if (offset === 1) label = 'Tomorrow';

    const dayNumber = dateObj.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });

    return {
      dateStr,
      label,
      dayNumber,
      isToday: offset === 0,
      count: matchesByDateCount[dateStr] || 0
    };
  });

  return (
    <div className="bg-slate-900/60 p-2 sm:p-2.5 rounded-2xl border border-slate-800/80 mb-5 flex items-center justify-between gap-1 sm:gap-2">
      <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar w-full">
        {dateOptions.map((opt) => {
          const isSelected = selectedDate === opt.dateStr;

          return (
            <button
              key={opt.dateStr}
              onClick={() => onSelectDate(opt.dateStr)}
              className={`flex-1 min-w-[85px] sm:min-w-[100px] py-2 px-2 rounded-xl text-center transition-all ${
                isSelected
                  ? 'bg-emerald-600 text-white font-bold shadow-lg shadow-emerald-950/40 ring-1 ring-emerald-400/50'
                  : 'bg-slate-800/50 hover:bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center justify-center gap-1 text-[11px] font-semibold">
                <span>{opt.label}</span>
                {opt.isToday && !isSelected && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                )}
              </div>
              <div className={`text-xs mt-0.5 ${isSelected ? 'text-emerald-100' : 'text-slate-300'}`}>
                {opt.dayNumber}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
