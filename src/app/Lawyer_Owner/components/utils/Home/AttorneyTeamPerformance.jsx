"use client";

import React from "react";

const lawyers = [
{
initial: "أ",
name: "أحمد علي",
role: "محامي أول",
cases: 24,
activeCases: 15,
percentage: 82,
performance: "ممتاز",
progressColor: "bg-emerald-600",
avatarStyle: "bg-slate-900 text-white",
status: "متصل",
statusStyle: "bg-emerald-50 text-emerald-600",
},
{
initial: "س",
name: "سارة محمود",
role: "محامية",
cases: 31,
activeCases: 18,
percentage: 91,
performance: "ممتاز",
progressColor: "bg-emerald-600",
avatarStyle: "bg-amber-100 text-amber-700",
status: "متصل",
statusStyle: "bg-emerald-50 text-emerald-600",
},
{
initial: "ع",
name: "عمر سمير",
role: "محامي",
cases: 22,
activeCases: 14,
percentage: 85,
performance: "جيد",
progressColor: "bg-blue-600",
avatarStyle: "bg-blue-100 text-blue-700",
status: "متصل",
statusStyle: "bg-emerald-50 text-emerald-600",
},
{
initial: "م",
name: "محمد حسن",
role: "محامي",
cases: 19,
activeCases: 12,
percentage: 76,
performance: "جيد",
progressColor: "bg-blue-600",
avatarStyle: "bg-indigo-100 text-indigo-700",
status: "غير متصل",
statusStyle: "bg-slate-100 text-slate-500",
},
{
initial: "ي",
name: "يوسف أحمد",
role: "محامي",
cases: 17,
activeCases: 11,
percentage: 68,
performance: "متوسط",
progressColor: "bg-amber-600",
avatarStyle: "bg-yellow-100 text-yellow-700",
status: "غير متصل",
statusStyle: "bg-slate-100 text-slate-500",
},
];

const AttorneyTeamPerformance = () => {
return ( <div

   className="col-span-2 p-4 bg-white rounded-2xl shadow-soft fade-border"
 >
{/* Header */} <div className="flex items-center justify-between mb-3"> <div> <h3 className="text-xs font-extrabold text-slate-900">
أداء فريق المحامين </h3>


      <p className="mt-1 text-[8px] text-slate-400">
        نظرة سريعة على توزيع العمل وأداء الفريق
      </p>
    </div>

    <span className="rounded-lg bg-blue-50 px-2 py-1 text-[8px] text-blue-600">
      5 من 12 محامي
    </span>
  </div>

  {/* Table Header */}
  <div className="grid grid-cols-[1.2fr_.65fr_.65fr_1.1fr_.5fr] gap-2 border-b border-slate-100 pb-2 text-[7px] text-slate-400">
    <span>المحامي</span>
    <span>القضايا</span>
    <span>النشطة</span>
    <span>نسبة الإنجاز</span>
    <span>الحالة</span>
  </div>

  {/* Lawyers */}
  <div className="space-y-1">
    {lawyers.map((lawyer) => (
      <div
        key={lawyer.name}
        className="grid grid-cols-[1.2fr_.65fr_.65fr_1.1fr_.5fr] items-center gap-2 border-b border-slate-50 py-2.5 text-[8px] last:border-b-0"
      >
        {/* Lawyer */}
        <div className="flex items-center gap-2">
          <span
            className={`flex h-7 w-7 items-center justify-center rounded-full ${lawyer.avatarStyle}`}
          >
            {lawyer.initial}
          </span>

          <span>
            <b>{lawyer.name}</b>

            <small className="block text-[6px] text-slate-400">
              {lawyer.role}
            </small>
          </span>
        </div>

        {/* Cases */}
        <b>{lawyer.cases}</b>

        {/* Active Cases */}
        <span>{lawyer.activeCases}</span>

        {/* Progress */}
        <div>
          <div className="mb-1 flex justify-between text-[7px]">
            <span>{lawyer.percentage}%</span>
            <span>{lawyer.performance}</span>
          </div>

          <div className="progress-track">
            <div
              className={`h-full rounded-full ${lawyer.progressColor}`}
              style={{
                width: `${lawyer.percentage}%`,
              }}
            ></div>
          </div>
        </div>

        {/* Status */}
        <span
          className={`w-fit rounded-full px-1.5 py-0.5 text-[6px] ${lawyer.statusStyle}`}
        >
          ● {lawyer.status}
        </span>
      </div>
    ))}
  </div>

  {/* Footer */}
  <button className="mt-3 text-[8px] font-bold text-slate-600">
    عرض كل فريق المحامين ←
  </button>
</div>


);
};

export default AttorneyTeamPerformance;
