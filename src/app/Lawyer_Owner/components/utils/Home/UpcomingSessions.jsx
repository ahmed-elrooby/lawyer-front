
"use client";

import React from "react";

const sessions = [
  {
    time: "09:30",
    timeStyle: "bg-red-100 text-red-600",
    caseNumber: "#1024",
    court: "محكمة بني سويف",
    lawyer: "المحامي: أحمد علي",
    date: "اليوم",
  },
  {
    time: "11:00",
    timeStyle: "bg-blue-100 text-blue-600",
    caseNumber: "#1038",
    court: "محكمة القاهرة",
    lawyer: "المحامية: سارة محمود",
    date: "اليوم",
  },
  {
    time: "01:30",
    timeStyle: "bg-amber-100 text-amber-700",
    caseNumber: "#1051",
    court: "محكمة الجيزة",
    lawyer: "المحامي: محمد حسن",
    date: "غدًا",
  },
];

const UpcomingSessions = () => {
  return (
    <div
      className="p-4 bg-white rounded-2xl shadow-soft fade-border"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-xs font-extrabold text-slate-900">
            الجلسات القضائية القادمة
          </h3>

          <p className="mt-1 text-[8px] text-slate-400">
            أقرب الجلسات المجدولة داخل المكتب
          </p>
        </div>

        <span className="rounded-full bg-amber-50 px-2 py-1 text-[7px] text-amber-600">
          هذا الأسبوع
        </span>
      </div>

      {/* Sessions */}
      <div className="space-y-2">
        {sessions.map((session) => (
          <div
            key={session.caseNumber}
            className="relative p-3 pr-10 rounded-xl bg-slate-50"
          >
            {/* Time */}
            <span
              className={`absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full text-[7px] ${session.timeStyle}`}
            >
              {session.time}
            </span>

            {/* Case */}
            <div className="text-[8px] font-bold text-slate-800">
              قضية {session.caseNumber} — {session.court}
            </div>

            {/* Lawyer + Date */}
            <div className="mt-1 text-[7px] text-slate-400">
              {session.lawyer} • {session.date}
            </div>

            {/* Button */}
            <button
              type="button"
              className="mt-2 rounded-md bg-white px-2 py-1 text-[7px] text-slate-600"
            >
              مراجعة الجلسة
            </button>
          </div>
        ))}
      </div>

      {/* All Sessions */}
      <button
        type="button"
        className="mt-3 text-[8px] font-bold text-slate-600"
      >
        عرض جدول كل الجلسات (47 جلسة) ←
      </button>
    </div>
  );
};

export default UpcomingSessions;
