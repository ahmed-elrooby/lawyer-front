"use client";

import React from "react";
import {
  FaHistory,
  FaBriefcase,
  FaCalendarAlt,
  FaFileAlt,
  FaUser,
  FaArrowLeft,
} from "react-icons/fa";
import Link from "next/link";

const TimeLine = () => {
  const timeline = [
    {
      id: 1,
      title: "تمت إضافة قضية جديدة",
      description: "تم إضافة قضية أحمد محمد ضد شركة النور",
      time: "منذ ساعتين",
      icon: FaBriefcase,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      id: 2,
      title: "تم تسجيل جلسة جديدة",
      description: "تم تسجيل جلسة للقضية رقم #2026-1024",
      time: "منذ 4 ساعات",
      icon: FaCalendarAlt,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
    },
    {
      id: 3,
      title: "تم إضافة مستند",
      description: "تم رفع مستند جديد إلى ملف القضية",
      time: "أمس",
      icon: FaFileAlt,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      id: 4,
      title: "تم تحديث بيانات العميل",
      description: "تم تعديل بيانات العميل أحمد محمد",
      time: "أمس",
      icon: FaUser,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
    },
  ];

  return (
    <div className="h-full overflow-hidden transition-all duration-300 border shadow-sm bg-slate-800 rounded-2xl border-slate-700 hover:shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-slate-700">
        <div>
          <h2 className="text-lg font-bold text-white">النشاط الأخير</h2>

          <p className="mt-1 text-xs text-slate-400">آخر العمليات والتحديثات</p>
        </div>

        <div className="flex items-center justify-center w-10 h-10 text-purple-600 bg-purple-100 rounded-xl">
          <FaHistory className="w-5 h-5" />
        </div>
      </div>

      {/* Timeline */}
      <div className="p-5">
        {timeline.length > 0 ? (
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute top-2 bottom-2 right-[19px] w-px bg-slate-700" />

            <div className="space-y-6">
              {timeline.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.id}
                    className="relative flex items-start gap-4"
                  >
                    {/* Icon */}
                    <div
                      className={`relative z-10 flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-xl ${item.iconBg} ${item.iconColor}`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 pt-0.5">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-sm font-semibold text-white">
                          {item.title}
                        </h3>

                        <span className="flex-shrink-0 text-[11px] text-slate-500">
                          {item.time}
                        </span>
                      </div>

                      <p className="mt-1 text-xs leading-5 text-slate-400">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="flex items-center justify-center mb-3 rounded-full w-14 h-14 bg-slate-700">
              <FaHistory className="w-6 h-6 text-slate-400" />
            </div>

            <h3 className="text-sm font-semibold text-white">لا يوجد نشاط</h3>

            <p className="mt-1 text-xs text-slate-400">
              لا توجد عمليات أو تحديثات حديثة
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      {timeline.length > 0 && (
        <div className="px-5 py-3 border-t border-slate-700">
          <Link
            href="/User/Timeline"
            className="flex items-center justify-center w-full gap-2 text-sm font-medium text-purple-500 transition-colors hover:text-purple-400"
          >
            عرض النشاط بالكامل
            <FaArrowLeft className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default TimeLine;
