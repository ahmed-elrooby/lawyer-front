
"use client";

import React, { useContext } from "react";
import {
  FaBell,
  FaCheckCircle,
  FaCircle,
  FaClock,
  FaUser,
  FaBuilding,
  FaCog,
  FaExclamationTriangle,
} from "react-icons/fa";

import { AdminContext } from "../../../../../Providers/AdminContext/Admin.js";

const Table = () => {
  const { notifications } = useContext(AdminContext);

  const notificationList = Array.isArray(notifications)
    ? notifications
    : [];

  const getNotificationIcon = (type) => {
    switch (type) {
      case "user":
      case "users":
        return {
          icon: FaUser,
          wrapper: "bg-violet-50 text-violet-600",
        };

      case "office":
      case "offices":
        return {
          icon: FaBuilding,
          wrapper: "bg-emerald-50 text-emerald-600",
        };

      case "system":
        return {
          icon: FaCog,
          wrapper: "bg-slate-100 text-slate-600",
        };

      case "important":
        return {
          icon: FaExclamationTriangle,
          wrapper: "bg-red-50 text-red-600",
        };

      default:
        return {
          icon: FaBell,
          wrapper: "bg-blue-50 text-blue-600",
        };
    }
  };

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("ar-EG", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="overflow-hidden bg-white border shadow-sm rounded-2xl border-slate-200/70">
      {/* Header */}
      <div className="flex flex-col gap-3 px-6 py-5 border-b border-slate-100 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-800">
            قائمة الإشعارات
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            جميع الإشعارات والتنبيهات الخاصة بالنظام
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-500 bg-slate-50 rounded-xl">
          <FaBell className="text-blue-500" />
          <span>{notificationList.length} إشعار</span>
        </div>
      </div>

      {/* Notifications */}
      {notificationList.length > 0 ? (
        <div className="divide-y divide-slate-100">
          {notificationList.map((notification, index) => {
            const {
              icon: Icon,
              wrapper,
            } = getNotificationIcon(notification?.type);

            const isRead = notification?.isRead;

            return (
              <div
                key={notification?._id || notification?.id || index}
                className={`relative flex gap-4 px-6 py-5 transition-colors duration-200 hover:bg-slate-50/70 ${
                  !isRead ? "bg-blue-50/30" : "bg-white"
                }`}
              >
                {/* Unread Indicator */}
                {!isRead && (
                  <span className="absolute top-0 right-0 w-1 h-full bg-blue-600" />
                )}

                {/* Icon */}
                <div
                  className={`flex items-center justify-center flex-shrink-0 w-11 h-11 rounded-xl ${wrapper}`}
                >
                  <Icon className="text-sm" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <h3
                        className={`text-sm truncate ${
                          !isRead
                            ? "font-bold text-slate-800"
                            : "font-semibold text-slate-700"
                        }`}
                      >
                        {notification?.title || "إشعار جديد"}
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-slate-500">
                        {notification?.message ||
                          notification?.description ||
                          "لا يوجد وصف للإشعار"}
                      </p>
                    </div>

                    <div className="flex items-center flex-shrink-0 gap-1.5 text-xs text-slate-400">
                      <FaClock className="text-[10px]" />

                      <span>
                        {formatDate(
                          notification?.createdAt ||
                            notification?.created_at
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Bottom Meta */}
                  <div className="flex flex-wrap items-center gap-3 mt-3">
                    {notification?.type && (
                      <span className="px-2.5 py-1 text-[11px] font-semibold text-slate-500 bg-slate-100 rounded-lg">
                        {notification.type}
                      </span>
                    )}

                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold rounded-lg ${
                        isRead
                          ? "text-emerald-600 bg-emerald-50"
                          : "text-blue-600 bg-blue-50"
                      }`}
                    >
                      {isRead ? (
                        <FaCheckCircle className="text-[10px]" />
                      ) : (
                        <FaCircle className="text-[7px]" />
                      )}

                      {isRead ? "مقروء" : "غير مقروء"}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
          <div className="flex items-center justify-center w-16 h-16 text-blue-500 bg-blue-50 rounded-2xl">
            <FaBell className="text-2xl" />
          </div>

          <h3 className="mt-5 text-base font-bold text-slate-700">
            لا توجد إشعارات
          </h3>

          <p className="max-w-sm mt-2 text-sm leading-6 text-slate-400">
            لا توجد إشعارات جديدة لعرضها حاليًا.
          </p>
        </div>
      )}
    </div>
  );
};

export default Table;
