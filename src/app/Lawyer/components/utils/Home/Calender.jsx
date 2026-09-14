"use client";

import React, { useMemo, useState } from "react";

import {
  FaCalendarAlt,
  FaChevronRight,
  FaChevronLeft,
  FaCircle,
} from "react-icons/fa";

const Calendar = () => {
  const today = new Date();

  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );

  // أيام الجلسات - Static حاليًا
  // بعدين نستبدلها بالـ Sessions API
  const sessionsDays = [5, 12, 18, 22, 28];

  const monthNames = [
    "يناير",
    "فبراير",
    "مارس",
    "أبريل",
    "مايو",
    "يونيو",
    "يوليو",
    "أغسطس",
    "سبتمبر",
    "أكتوبر",
    "نوفمبر",
    "ديسمبر",
  ];

  const weekDays = ["أحد", "إثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة", "سبت"];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const firstDay = new Date(year, month, 1).getDay();

  const days = useMemo(() => {
    const calendarDays = [];

    // الفراغات قبل أول يوم في الشهر
    for (let i = 0; i < firstDay; i++) {
      calendarDays.push(null);
    }

    // أيام الشهر
    for (let day = 1; day <= daysInMonth; day++) {
      calendarDays.push(day);
    }

    return calendarDays;
  }, [firstDay, daysInMonth]);

  const isToday = (day) => {
    if (!day) return false;

    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };

  const hasSession = (day) => {
    return day && sessionsDays.includes(day);
  };

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1));
  };

  return (
    <div className="overflow-hidden transition-all duration-300 border shadow-sm bg-slate-800 rounded-2xl border-slate-700 hover:shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 text-blue-600 bg-blue-100 rounded-xl">
            <FaCalendarAlt className="w-5 h-5" />
          </div>

          <div>
            <h2 className="text-lg font-bold text-white">التقويم القضائي</h2>

            <p className="mt-1 text-xs text-slate-400">
              مواعيد الجلسات والأحداث القادمة
            </p>
          </div>
        </div>

        {/* Today Button */}
        <button
          type="button"
          onClick={goToToday}
          className="px-3 py-1.5 text-xs font-medium text-blue-400 transition-colors rounded-lg bg-blue-500/10 hover:bg-blue-500/20"
        >
          اليوم
        </button>
      </div>

      {/* Calendar Header */}
      <div className="p-5">
        <div className="flex items-center justify-between mb-5">
          {/* Previous */}
          <button
            type="button"
            onClick={goToPreviousMonth}
            className="flex items-center justify-center transition-all rounded-lg w-9 h-9 text-slate-400 bg-slate-700 hover:text-white hover:bg-slate-600"
          >
            <FaChevronRight className="w-3.5 h-3.5" />
          </button>

          {/* Month */}
          <div className="text-center">
            <h3 className="text-base font-bold text-white">
              {monthNames[month]} {year}
            </h3>
          </div>

          {/* Next */}
          <button
            type="button"
            onClick={goToNextMonth}
            className="flex items-center justify-center transition-all rounded-lg w-9 h-9 text-slate-400 bg-slate-700 hover:text-white hover:bg-slate-600"
          >
            <FaChevronLeft className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Week Days */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map((day) => (
            <div
              key={day}
              className="py-2 text-xs font-semibold text-center text-slate-500"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Days */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => {
            const todayActive = isToday(day);
            const sessionActive = hasSession(day);

            if (!day) {
              return <div key={`empty-${index}`} className="aspect-square" />;
            }

            return (
              <button
                type="button"
                key={day}
                className={`
                  relative flex flex-col items-center justify-center
                  aspect-square rounded-lg text-sm transition-all
                  ${
                    todayActive
                      ? "bg-blue-600 text-white font-bold shadow-md shadow-blue-600/20"
                      : sessionActive
                        ? "bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/40 hover:bg-emerald-500/20"
                        : "text-slate-300 hover:bg-slate-700"
                  }
                `}
              >
                {day}

                {sessionActive && (
                  <FaCircle
                    className={`
                      absolute bottom-1 w-1 h-1
                      ${todayActive ? "text-white" : "text-emerald-400"}
                    `}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-center gap-5 p-3 mt-5 text-xs rounded-lg bg-slate-700/50">
          <div className="flex items-center gap-2 text-slate-400">
            <span className="w-2.5 h-2.5 bg-blue-600 rounded-full" />
            اليوم
          </div>

          <div className="flex items-center gap-2 text-slate-400">
            <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full" />
            يوجد جلسة
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
