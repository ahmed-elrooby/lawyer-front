"use client";

import React from "react";
import { Calendar as CalendarIcon } from "lucide-react";

const Calendar = () => {
  // توليد أيام الشهر (هنا نموذج لشهر مايو 2026)
  const days = [
    null, null, null, null, null, // فراغات لبداية الشهر (حسب اليوم الأول)
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ];
  const weekDays = ["أحد", "إثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة", "سبت"];
  const sessionsDays = [20, 22, 25, 28]; // أيام فيها جلسات

  return (
    <div className="p-5 transition-all duration-300 border shadow-sm bg-slate-800 rounded-2xl border-slate-700 hover:shadow-md">
      <h3 className="flex items-center gap-2 mb-4 text-lg font-semibold text-white">
        <CalendarIcon className="w-5 h-5 text-blue-400" />
        التقويم القضائي
      </h3>
      <div className="grid grid-cols-7 gap-1 mb-2 text-center">
        {weekDays.map((day) => (
          <div key={day} className="p-1 text-xs font-bold text-slate-400">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, idx) => {
          if (day === null) {
            return <div key={idx} className="p-2 text-center text-slate-500"></div>;
          }
          const isToday = day === 15;
          const hasSession = sessionsDays.includes(day);
          return (
            <div
              key={idx}
              className={`
                p-2 text-center text-sm rounded-lg transition-all cursor-pointer
                ${isToday ? "bg-blue-600 text-white font-bold shadow-md" : "text-slate-300 hover:bg-slate-700"}
                ${hasSession && !isToday ? "bg-green-900/40 text-green-300 font-medium ring-1 ring-green-700" : ""}
              `}
            >
              {day}
              {hasSession && !isToday && (
                <div className="w-1 h-1 mx-auto mt-1 bg-green-400 rounded-full"></div>
              )}
            </div>
          );
        })}
      </div>
      <div className="p-2 mt-4 text-xs text-center rounded-lg text-slate-400 bg-slate-700/50">
        الأيام الملونة تحتوي على جلسات قضائية
      </div>
    </div>
  );
};

export default Calendar;