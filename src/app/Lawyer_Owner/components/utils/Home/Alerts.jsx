
"use client";

import React from "react";
import {
  FaCircle,
  FaArrowLeft,
} from "react-icons/fa";

const alerts = [
  {
    type: "danger",
    title: "5 قضايا تحتاج إلى تحديث",
    description: "لم يتم تحديث بياناتها منذ أكثر من أسبوع.",
    button: "عرض التفاصيل",
  },
  {
    type: "warning",
    title: "3 جلسات غدًا تحتاج مراجعة",
    description: "تأكد من تجهيز الملفات والمستندات.",
    button: "عرض الجلسات",
  },
  {
    type: "info",
    title: "ملفان ناقصان بيانات",
    description: "يرجى استكمال البيانات المطلوبة.",
    button: "استكمال الآن",
  },
  {
    type: "team",
    title: "محاميان لديهما ضغط عمل مرتفع",
    description: "راجع توزيع القضايا على الفريق.",
    button: "إدارة الفريق",
  },
];

const styles = {
  danger: {
    wrapper: "bg-red-50",
    icon: "text-red-500",
    button: "text-red-600",
  },

  warning: {
    wrapper: "bg-amber-50",
    icon: "text-amber-600",
    button: "text-amber-700",
  },

  info: {
    wrapper: "bg-blue-50",
    icon: "text-blue-600",
    button: "text-blue-700",
  },

  team: {
    wrapper: "bg-indigo-50",
    icon: "text-indigo-600",
    button: "text-indigo-700",
  },
};

const AttentionAlerts = () => {
  return (
    <div
      
      className="p-4 bg-white rounded-2xl shadow-soft fade-border"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-xs font-extrabold text-slate-900">
            يحتاج إلى انتباهك
          </h3>

          <p className="mt-1 text-[8px] text-slate-400">
            أهم التنبيهات التي تحتاج إجراء
          </p>
        </div>

        <span className="rounded-full bg-red-50 px-2 py-1 text-[7px] font-bold text-red-500">
          {alerts.length} تنبيهات
        </span>
      </div>

      {/* Alerts */}
      <div className="space-y-2">
        {alerts.map((alert, index) => {
          const style = styles[alert.type];

          return (
            <div
              key={index}
              className={`rounded-xl p-2.5 ${style.wrapper}`}
            >
              <div className="flex gap-2">
                {/* Dot */}
                <span className={`pt-0.5 ${style.icon}`}>
                  <FaCircle size={7} />
                </span>

                {/* Content */}
                <div className="flex-1">
                  <div className="text-[9px] font-bold text-slate-800">
                    {alert.title}
                  </div>

                  <p className="mt-1 text-[7px] leading-4 text-slate-500">
                    {alert.description}
                  </p>

                  <button
                    type="button"
                    className={`mt-1.5 rounded-md bg-white px-2 py-1 text-[7px] ${style.button}`}
                  >
                    {alert.button}

                    <FaArrowLeft
                      className="inline-block mr-1"
                      size={6}
                    />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AttentionAlerts;

