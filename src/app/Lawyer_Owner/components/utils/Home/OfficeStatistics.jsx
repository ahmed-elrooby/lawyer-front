
"use client";

import React from "react";

const OfficeStatistics = () => {
  const statistics = [
    {
      value: "72%",
      title: "معدل إغلاق القضايا",
      subtitle: "تحسن 4.1%",
      valueClass: "text-emerald-600",
    },
    {
      value: "10.6",
      title: "متوسط القضايا لكل محامي",
      subtitle: "من أصل 12 محامي",
      valueClass: "text-slate-900",
    },
    {
      value: "94%",
      title: "معدل حضور الجلسات",
      subtitle: "آخر 30 يوم",
      valueClass: "text-amber-600",
    },
    {
      value: "89%",
      title: "نشاط الفريق",
      subtitle: "معدل النشاط الحالي",
      valueClass: "text-blue-600",
    },
  ];

  return (
    <section className="mb-6 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
      {statistics.map((stat) => (
        <div
          key={stat.title}
          className="p-3 text-center bg-white rounded-xl shadow-soft fade-border"
        >
          <div
            className={`text-lg font-extrabold ${stat.valueClass}`}
          >
            {stat.value}
          </div>

          <div className="text-[8px] font-bold text-slate-700">
            {stat.title}
          </div>

          <div className="mt-1 text-[7px] text-slate-400">
            {stat.subtitle}
          </div>
        </div>
      ))}
    </section>
  );
};

export default OfficeStatistics;
