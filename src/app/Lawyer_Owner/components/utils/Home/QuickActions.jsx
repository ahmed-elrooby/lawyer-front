
"use client";

import React from "react";

const QuickActions = () => {
  const actions = [
    {
      title: "إضافة قضية جديدة",
      primary: true,
    },
    {
      title: "إضافة محامي للفريق",
    },
    {
      title: "إضافة عميل",
    },
    {
      title: "جدولة جلسة جديدة",
    },
    {
      title: "رفع ملف قانوني",
    },
    {
      title: "إعدادات المكتب والفريق",
    },
  ];

  return (
    <div className="p-4 bg-white rounded-2xl shadow-soft fade-border">
      {/* Header */}
      <div className="mb-3">
        <h3 className="text-xs font-extrabold text-slate-900">
          إجراءات سريعة
        </h3>

        <p className="mt-1 text-[8px] text-slate-400">
          الوصول السريع للمهام المتكررة
        </p>
      </div>

      {/* Actions */}
      <div className="space-y-1.5">
        {actions.map((action) => (
          <button
            key={action.title}
            type="button"
            className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-[8px] ${
              action.primary
                ? "bg-slate-900 font-bold text-white"
                : "bg-slate-50 text-slate-700"
            }`}
          >
            <span>{action.title}</span>
            <span>←</span>
          </button>
        ))}
      </div>

      {/* Data Health */}
      <div className="mt-3 rounded-xl bg-emerald-50 p-2 text-center text-[7px] text-emerald-700">
        <b>نسبة صحة بيانات المكتب 100%</b>
      </div>
    </div>
  );
};

export default QuickActions;
