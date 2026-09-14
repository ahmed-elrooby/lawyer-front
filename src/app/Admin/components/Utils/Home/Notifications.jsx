
"use client";

import React, { useContext } from "react";
import Link from "next/link";
import {
  FaBell,
  FaUserPlus,
  FaHourglassHalf,
  FaChartLine,
  FaGavel,
  FaCog,
  FaChevronLeft,
} from "react-icons/fa";

import { AdminContext } from "../../../../../Providers/AdminContext/Admin.js";

const Notifications = () => {
  const { notifications = [] } = useContext(AdminContext);

  const getNotificationConfig = (type) => {
    const config = {
      user_created: {
        icon: FaUserPlus,
        iconColor: "text-blue-500",
        bgColor: "bg-blue-50",
      },

      user_updated: {
        icon: FaUserPlus,
        iconColor: "text-indigo-500",
        bgColor: "bg-indigo-50",
      },

      subscription: {
        icon: FaHourglassHalf,
        iconColor: "text-orange-500",
        bgColor: "bg-orange-50",
      },

      report: {
        icon: FaChartLine,
        iconColor: "text-emerald-500",
        bgColor: "bg-emerald-50",
      },

      case: {
        icon: FaGavel,
        iconColor: "text-purple-500",
        bgColor: "bg-purple-50",
      },

      system: {
        icon: FaCog,
        iconColor: "text-slate-500",
        bgColor: "bg-slate-100",
      },
    };

    return config[type] || config.system;
  };

  const formatTime = (date) => {
    if (!date) return "";

    const notificationDate = new Date(date);

    if (Number.isNaN(notificationDate.getTime())) {
      return "";
    }

    return notificationDate.toLocaleDateString("ar-EG", {
      day: "numeric",
      month: "short",
    });
  };

  // آخر 5 إشعارات فقط
  const latestNotifications = Array.isArray(notifications)
    ? notifications.slice(0, 5)
    : [];

  return (
    <div
      dir="rtl"
      className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-2xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100 md:px-5">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 text-amber-500 rounded-xl bg-amber-50">
            <FaBell className="text-sm" />
          </div>

          <div>
            <h2 className="text-sm font-bold text-gray-800 md:text-base">
              الإشعارات
            </h2>

            <p className="mt-0.5 text-[10px] text-gray-400 md:text-[11px]">
              آخر التحديثات والتنبيهات
            </p>
          </div>
        </div>

        {notifications.length > 0 && (
          <span className="px-2.5 py-1 text-[10px] font-bold text-blue-600 bg-blue-50 rounded-full">
            {notifications.length} إشعار
          </span>
        )}
      </div>

      {/* Notifications */}
      <div className="divide-y divide-gray-100">
        {latestNotifications.length > 0 ? (
          latestNotifications.map((notification, index) => {
            const { icon: Icon, iconColor, bgColor } =
              getNotificationConfig(notification?.type);

            return (
              <div
                key={notification?._id || notification?.id || index}
                className="
                  group
                  flex items-start gap-3
                  px-4 py-3.5
                  transition-all duration-200
                  hover:bg-gray-50/80
                "
              >
                {/* Icon */}
                <div
                  className={`
                    flex items-center justify-center
                    flex-shrink-0
                    w-9 h-9
                    rounded-xl
                    ${bgColor}
                    ${iconColor}
                  `}
                >
                  <Icon className="text-xs" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-xs font-semibold leading-5 text-gray-700">
                      {notification?.title || "إشعار جديد"}
                    </p>

                    {!notification?.isRead && (
                      <span className="flex-shrink-0 w-2 h-2 mt-1.5 bg-blue-500 rounded-full" />
                    )}
                  </div>

                  <p className="mt-0.5 text-[11px] leading-5 text-gray-400 line-clamp-2">
                    {notification?.message || "لا يوجد وصف للإشعار"}
                  </p>

                  <p className="mt-1 text-[9px] text-gray-300">
                    {formatTime(notification?.createdAt)}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center px-5 py-12 text-center">
            <div className="flex items-center justify-center text-gray-300 w-14 h-14 rounded-2xl bg-gray-50">
              <FaBell className="text-xl" />
            </div>

            <h3 className="mt-4 text-sm font-bold text-gray-700">
              لا توجد إشعارات
            </h3>

            <p className="mt-1 text-[11px] text-gray-400">
              لا توجد تنبيهات جديدة حاليًا
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      {notifications.length > 0 && (
        <div className="p-3 border-t border-gray-100 bg-gray-50/50">
          <Link
            href="/Admin/Notifications"
            className="
              flex items-center justify-center gap-2
              w-full
              py-2.5
              text-xs
              font-bold
              text-blue-600
              bg-white
              border border-blue-100
              rounded-xl
              transition-all duration-200
              hover:bg-blue-50
              hover:border-blue-200
            "
          >
            <span>عرض جميع الإشعارات</span>

            <FaChevronLeft className="text-[9px] transition-transform duration-200 group-hover:-translate-x-1" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default Notifications;

