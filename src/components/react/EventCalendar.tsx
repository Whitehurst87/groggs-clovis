import React, { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Event {
  title: string;
  date: Date;
  recurrence?: string;
}

interface EventCalendarProps {
  events: Event[];
}

const EventCalendar: React.FC<EventCalendarProps> = ({ events }) => {
  // Use current date as initial month
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const calendarDays = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  return (
    <div className="rounded-lg border border-white/10 bg-[#1a1a1a] overflow-hidden shadow-2xl">
      <div className="flex items-center justify-between p-4 bg-[#141414] border-b border-white/5">
        <h2 className="text-xl font-cinzel text-[#d4af37] uppercase tracking-wider">
          {format(currentMonth, "MMMM yyyy")}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={prevMonth}
            className="p-2 hover:bg-white/5 rounded-full text-white/70 hover:text-white transition-all"
            aria-label="Previous Month"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-white/5 rounded-full text-white/70 hover:text-white transition-all"
            aria-label="Next Month"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 bg-[#1a1a1a]">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="py-3 text-center text-[10px] font-bold text-white/40 uppercase tracking-widest border-b border-white/5"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {calendarDays.map((day, idx) => {
          const dayEvents = events.filter((event) => isSameDay(event.date, day));

          return (
            <div
              key={idx}
              className={`min-h-[120px] p-2 border-r border-b border-white/5 last:border-r-0 relative group transition-colors hover:bg-white/[0.02] ${
                !isSameMonth(day, monthStart) ? "opacity-20" : ""
              }`}
            >
              <span
                className={`text-xs font-lato ${
                  isSameDay(day, new Date())
                    ? "bg-[#2d5a27] text-white w-6 h-6 flex items-center justify-center rounded-full -ml-1 -mt-1"
                    : "text-white/50"
                }`}
              >
                {format(day, "d")}
              </span>
              <div className="mt-2 space-y-1">
                {dayEvents.map((event, eventIdx) => (
                  <div
                    key={eventIdx}
                    className="text-[10px] leading-tight p-1.5 bg-[#2d5a27]/20 border-l-2 border-[#2d5a27] text-white/90 truncate cursor-default hover:bg-[#2d5a27]/30 transition-colors"
                    title={event.title}
                  >
                    {event.title}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EventCalendar;
