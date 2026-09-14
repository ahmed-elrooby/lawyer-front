
"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  FaBell,
  FaCheckDouble,
  FaUser,
  FaCog,
  FaBuilding,
  FaExclamationTriangle,
  FaChevronLeft,
  FaCircle,
} from "react-icons/fa";

const NotificationsDropdown = ({
  notifications = [],
  unreadNotifications = 0,
  handleMarkAsReadFun,
  handleReadAllNotificationsFun,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getConfig = (type) => {
    const config = {
      user_created: [FaUser, "bg-violet-50 text-violet-600"],
      user_updated: [FaUser, "bg-blue-50 text-blue-600"],
      user_deleted: [FaUser, "bg-red-50 text-red-600"],
      office: [FaBuilding, "bg-emerald-50 text-emerald-600"],
      offices: [FaBuilding, "bg-emerald-50 text-emerald-600"],
      important: [
        FaExclamationTriangle,
        "bg-amber-50 text-amber-600",
      ],
      system: [FaCog, "bg-slate-100 text-slate-600"],
    };

    return config[type] || config.system;
  };

  const formatDate = (date) => {
    if (!date) return "";

    const value = new Date(date);

    if (Number.isNaN(value.getTime())) return "";

    return value.toLocaleDateString("ar-EG", {
      day: "numeric",
      month: "short",
    });
  };

  const latest = notifications.slice(0, 5);

  const handleClick = (notification) => {
    if (!notification?.isRead && notification?._id) {
      handleMarkAsReadFun(notification._id);
    }

    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      {/* Bell */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="relative flex items-center justify-center w-10 h-10 text-gray-600 rounded-xl hover:bg-blue-50 hover:text-blue-600"
      >
        <FaBell />

        <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-5 h-5 px-1 text-[9px] font-bold text-white bg-red-500 border-2 border-white rounded-full">
          {unreadNotifications > 99 ? "99+" : unreadNotifications}
        </span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute left-0 top-[calc(100%+12px)] z-[100] w-[calc(100vw-24px)] max-w-[390px] overflow-hidden bg-white border border-slate-200 rounded-2xl shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-800">
                  الإشعارات
                </h3>

                <span className="px-1.5 py-1 text-[9px] font-bold text-blue-700 bg-blue-50 rounded-full">
                  {unreadNotifications}
                </span>
              </div>

              <p className="mt-1 text-[11px] text-slate-400">
                آخر التنبيهات والتحديثات
              </p>
            </div>

            {unreadNotifications > 0 && (
              <button
                type="button"
                onClick={handleReadAllNotificationsFun}
                className="flex items-center gap-1.5 px-2.5 py-2 text-[10px] font-bold text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100"
              >
                <FaCheckDouble />
                قراءة الكل
              </button>
            )}
          </div>

          {/* List */}
          <div className="max-h-[390px] overflow-y-auto">
            {latest.length ? (
              latest.map((notification, index) => {
                const [Icon, iconStyle] = getConfig(notification?.type);
                const isRead = Boolean(notification?.isRead);

                return (
                  <button
                    key={notification?._id || index}
                    type="button"
                    onClick={() => handleClick(notification)}
                    className={`relative flex items-start w-full gap-3 px-5 py-4 text-right border-b border-slate-100 ${
                      isRead
                        ? "bg-white hover:bg-slate-50"
                        : "bg-blue-50/50 hover:bg-blue-50"
                    }`}
                  >
                    {!isRead && (
                      <span className="absolute top-0 right-0 w-1 h-full bg-blue-600" />
                    )}

                    <div
                      className={`flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-xl ${iconStyle}`}
                    >
                      <Icon className="text-xs" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-xs font-bold truncate text-slate-800">
                          {notification?.title || "إشعار جديد"}
                        </h4>

                        {!isRead && (
                          <FaCircle className="flex-shrink-0 text-[6px] text-blue-600" />
                        )}
                      </div>

                      <p className="mt-1 text-[11px] leading-5 text-slate-400 line-clamp-2">
                        {notification?.message || "لا يوجد وصف للإشعار"}
                      </p>

                      <span className="block mt-1 text-[9px] text-slate-300">
                        {formatDate(notification?.createdAt)}
                      </span>
                    </div>

                    <FaChevronLeft className="mt-3 text-[9px] text-slate-300" />
                  </button>
                );
              })
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <FaBell className="text-2xl text-slate-200" />

                <p className="mt-3 text-sm font-bold text-slate-700">
                  لا توجد إشعارات
                </p>

                <p className="mt-1 text-[11px] text-slate-400">
                  لا توجد تنبيهات جديدة حاليًا
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-slate-100 bg-slate-50/70">
            <Link
              href="/Admin/Notifications"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center w-full gap-2 py-2.5 text-xs font-bold text-blue-600 bg-white border border-blue-100 rounded-xl hover:bg-blue-50"
            >
              عرض جميع الإشعارات
              <FaChevronLeft className="text-[9px]" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsDropdown;

