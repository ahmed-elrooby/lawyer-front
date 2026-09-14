"use client";

import React from "react";
import Link from "next/link";

import {
  FaBell,
  FaCalendarAlt,
  FaFileAlt,
  FaCheckCircle,
  FaExclamationCircle,
  FaArrowLeft,
} from "react-icons/fa";

const Notification = () => {
  const notifications = [
    {
      id: 1,
      title: "جلسة قادمة غداً",
      description: "لديك جلسة في قضية أحمد محمد ضد شركة النور",
      time: "منذ ساعتين",
      type: "warning",
      icon: FaCalendarAlt,
    },
    {
      id: 2,
      title: "تم تحديث قضية",
      description: "تم تحديث حالة القضية رقم #2026-1024",
      time: "منذ 4 ساعات",
      type: "info",
      icon: FaFileAlt,
    },
    {
      id: 3,
      title: "تم تسجيل جلسة",
      description: "تم تسجيل حضور جلسة القضية رقم #2026-1022",
      time: "أمس",
      type: "success",
      icon: FaCheckCircle,
    },
    {
      id: 4,
      title: "تذكير بموعد جلسة",
      description: "جلسة قضية محمد علي بعد يومين",
      time: "أمس",
      type: "danger",
      icon: FaExclamationCircle,
    },
  ];

  const notificationStyles = {
    warning: {
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
    },
    info: {
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    success: {
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
    },
    danger: {
      iconBg: "bg-rose-100",
      iconColor: "text-rose-600",
    },
  };

  return (
    <div className="h-full overflow-hidden transition-all duration-300 border shadow-sm bg-slate-800 rounded-2xl border-slate-700 hover:shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-slate-700">
        <div>
          <h2 className="text-lg font-bold text-white">التنبيهات</h2>

          <p className="mt-1 text-xs text-slate-400">
            آخر التنبيهات والتحديثات
          </p>
        </div>

        <div className="relative flex items-center justify-center w-10 h-10 text-blue-600 bg-blue-100 rounded-xl">
          <FaBell className="w-5 h-5" />

          <span className="absolute w-2.5 h-2.5 bg-rose-500 rounded-full -top-1 -right-1 border-2 border-slate-800" />
        </div>
      </div>

      {/* Notifications */}
      <div className="p-3">
        {notifications.length > 0 ? (
          notifications.map((notification) => {
            const Icon = notification.icon;
            const style = notificationStyles[notification.type];

            return (
              <div
                key={notification.id}
                className="flex items-start gap-3 p-4 transition-all duration-200 border-b border-slate-700 last:border-b-0 rounded-xl hover:bg-slate-700/40"
              >
                {/* Icon */}
                <div
                  className={`flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-xl ${style.iconBg} ${style.iconColor}`}
                >
                  <Icon className="w-4 h-4" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-sm font-semibold text-white">
                      {notification.title}
                    </h3>

                    <span className="flex-shrink-0 text-[11px] text-slate-500">
                      {notification.time}
                    </span>
                  </div>

                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    {notification.description}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="flex items-center justify-center mb-3 rounded-full w-14 h-14 bg-slate-700">
              <FaBell className="w-6 h-6 text-slate-400" />
            </div>

            <h3 className="text-sm font-semibold text-white">
              لا توجد تنبيهات
            </h3>

            <p className="mt-1 text-xs text-slate-400">
              لا توجد تنبيهات جديدة حالياً
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      {notifications.length > 0 && (
        <div className="px-5 py-3 border-t border-slate-700">
          <Link
            href="/User/Notifications"
            className="flex items-center justify-center w-full gap-2 text-sm font-medium text-blue-500 transition-colors hover:text-blue-400"
          >
            عرض كل التنبيهات
            <FaArrowLeft className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default Notification;
