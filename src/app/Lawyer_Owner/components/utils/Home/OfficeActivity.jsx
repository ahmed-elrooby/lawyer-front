
"use client";

import React from "react";

const OfficeActivity = () => {
  const activities = [
    {
      initial: "أ",
      name: "أحمد علي",
      action: "أضاف قضية جديدة",
      caseNumber: "#1089",
      time: "منذ 5 دقائق",
      type: "قضية مدنية",
      avatarClass: "bg-slate-900 text-white",
    },
    {
      initial: "س",
      name: "سارة محمود",
      action: "رفعت ملفًا للقضية",
      caseNumber: "#1038",
      time: "منذ 18 دقيقة",
      type: "مستندات قانونية",
      avatarClass: "bg-amber-100 text-amber-700",
    },
    {
      initial: "م",
      name: "محمد حسن",
      action: "حدّث حالة القضية",
      caseNumber: "#1021",
      status: "مغلقة",
      time: "منذ 32 دقيقة",
      type: "تحديث القضية",
      avatarClass: "bg-blue-100 text-blue-700",
    },
    {
      initial: "أ",
      name: "أحمد الروبي",
      action: "أضاف محاميًا جديدًا للفريق",
      time: "منذ ساعة",
      type: "إدارة المكتب",
      avatarClass: "bg-yellow-100 text-yellow-700",
    },
  ];

  return (
    <div className="col-span-2 p-4 bg-white rounded-2xl shadow-soft fade-border">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-xs font-extrabold text-slate-900">
            نشاط المكتب (سجل العمليات)
          </h3>

          <p className="mt-1 text-[8px] text-slate-400">
            آخر الأنشطة التي تمت داخل المكتب
          </p>
        </div>

        <span className="flex items-center gap-1 text-[7px] text-emerald-600">
          <i className="h-1.5 w-1.5 rounded-full bg-emerald-500"></i>
          مباشر
        </span>
      </div>

      {/* Activities */}
      <div className="space-y-1.5">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="flex items-start gap-2 rounded-xl bg-slate-50 p-2.5"
          >
            <span
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[8px] ${activity.avatarClass}`}
            >
              {activity.initial}
            </span>

            <div className="flex-1">
              <div className="text-[8px] leading-4 text-slate-700">
                <b>{activity.name}</b>{" "}
                {activity.action}{" "}
                {activity.caseNumber && (
                  <span className="text-blue-600">
                    {activity.caseNumber}
                  </span>
                )}{" "}
                {activity.status && (
                  <>
                    إلى{" "}
                    <b className="text-emerald-600">
                      {activity.status}
                    </b>
                  </>
                )}
              </div>

              <div className="text-[7px] text-slate-400">
                {activity.time} • {activity.type}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <button
        type="button"
        className="mt-3 text-[8px] font-bold text-slate-600"
      >
        عرض سجل النشاط بالكامل ←
      </button>
    </div>
  );
};

export default OfficeActivity;
