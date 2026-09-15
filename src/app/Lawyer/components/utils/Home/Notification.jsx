
"use client";

import React, { useContext } from "react";
import Link from "next/link";

import {
  FaBell,
  FaCalendarAlt,
  FaFileAlt,
  FaCheckCircle,
  FaExclamationCircle,
  FaArrowLeft,
} from "react-icons/fa";

import { LawyerContext } from "../../../../../Providers/LawyerContext/lawyer.js";

const Notification = () => {
  const { notifications = [] } = useContext(LawyerContext);

  const notificationStyles = {
    warning: {
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
      icon: FaCalendarAlt,
    },

    info: {
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      icon: FaFileAlt,
    },

    success: {
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      icon: FaCheckCircle,
    },

    danger: {
      iconBg: "bg-rose-100",
      iconColor: "text-rose-600",
      icon: FaExclamationCircle,
    },
  };

  const getNotificationStyle = (notification) => {
    const type = notification?.type || "info";

    return notificationStyles[type] || notificationStyles.info;
  };

  const formatTime = (date) => {
    if (!date) return "";

    const notificationDate = new Date(date);
    const now = new Date();

    const diffInSeconds = Math.floor(
      (now.getTime() - notificationDate.getTime()) / 1000
    );

    if (diffInSeconds < 60) {
      return "منذ لحظات";
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);

    if (diffInMinutes < 60) {
      return `منذ ${diffInMinutes} دقيقة`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);

    if (diffInHours < 24) {
      return `منذ ${diffInHours} ساعة`;
    }

    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInDays === 1) {
      return "أمس";
    }

    if (diffInDays < 7) {
      return `منذ ${diffInDays} أيام`;
    }

    return notificationDate.toLocaleDateString("ar-EG", {
      day: "numeric",
      month: "short",
    });
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

          {notifications.some((notification) => !notification?.isRead) && (
            <span className="absolute w-2.5 h-2.5 bg-rose-500 rounded-full -top-1 -right-1 border-2 border-slate-800" />
          )}
        </div>
      </div>

      {/* Notifications */}
      <div className="p-3">
        {notifications.length > 0 ? (
          notifications.slice(0, 4).map((notification) => {
            const style = getNotificationStyle(notification);
            const Icon = style.icon;

            return (
              <div
                key={notification?._id}
                className={`flex items-start gap-3 p-4 transition-all duration-200 border-b border-slate-700 last:border-b-0 rounded-xl hover:bg-slate-700/40 ${
                  !notification?.isRead ? "bg-blue-500/5" : ""
                }`}
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
                    <div className="flex items-center min-w-0 gap-2">
                      {!notification?.isRead && (
                        <span className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full" />
                      )}

                      <h3 className="text-sm font-semibold text-white truncate">
                        {notification?.title || "إشعار جديد"}
                      </h3>
                    </div>

                    <span className="flex-shrink-0 text-[11px] text-slate-500">
                      {formatTime(notification?.createdAt)}
                    </span>
                  </div>

                  <p className="mt-1 text-xs leading-5 text-slate-400 line-clamp-2">
                    {notification?.message ||
                      notification?.description ||
                      "لديك إشعار جديد"}
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
            href="/Lawyer/Notification"
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
