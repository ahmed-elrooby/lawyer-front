"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  FaBell,
  FaCalendarAlt,
  FaFileAlt,
  FaGavel,
  FaCheck,
} from "react-icons/fa";

const NotificationsDropdown = () => {
  const [open, setOpen] = useState(false);

  const notificationRef = useRef(null);

  const notifications = [
    {
      id: 1,
      title: "جلسة قريبة",
      description: "جلسة قضية شركة النور التجارية تبدأ بعد 30 دقيقة.",
      time: "منذ 10 دقائق",
      icon: FaCalendarAlt,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-500",
      unread: true,
    },
    {
      id: 2,
      title: "تم إضافة مستند",
      description: "تم إضافة مستند جديد إلى قضية أحمد محمود.",
      time: "منذ ساعة",
      icon: FaFileAlt,
      iconBg: "bg-purple-50",
      iconColor: "text-purple-500",
      unread: true,
    },
    {
      id: 3,
      title: "تحديث حالة القضية",
      description: "تم تحديث حالة القضية رقم #1048.",
      time: "منذ ساعتين",
      icon: FaGavel,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-500",
      unread: false,
    },
    {
      id: 4,
      title: "جلسة تم تأجيلها",
      description: "تم تأجيل جلسة القضية رقم #1082.",
      time: "منذ 3 ساعات",
      icon: FaCalendarAlt,
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
      unread: false,
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={notificationRef}>
      {/* Notification Button */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="relative flex items-center justify-center transition-all duration-200 bg-white border shadow-sm h-9 w-9 rounded-xl border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-900 active:scale-95"
        aria-label="الإشعارات"
      >
        <FaBell size={13} />

        {/* Unread Badge */}
        <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute left-0 top-[calc(100%+8px)] z-50 w-[250px] md:w-[340px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_12px_35px_rgba(15,23,42,0.12)]">
          
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
            <div>
              <h3 className="text-[12px] font-bold text-slate-800">
                الإشعارات
              </h3>

              <p className="mt-0.5 text-[8px] text-slate-400">
                لديك 2 إشعارات غير مقروءة
              </p>
            </div>

            <button
              type="button"
              className="text-[9px] font-semibold text-blue-600 transition hover:text-blue-700"
            >
              تحديد الكل كمقروء
            </button>
          </div>

          {/* Notifications */}
          <div className="max-h-[360px] overflow-y-auto">
            {notifications.map((notification) => {
              const Icon = notification.icon;

              return (
                <button
                  key={notification.id}
                  type="button"
                  className={`group flex w-full gap-3 border-b border-slate-50 px-4 py-3 text-right transition hover:bg-slate-50 ${
                    notification.unread ? "bg-blue-50/30" : "bg-white"
                  }`}
                >
                  {/* Icon */}
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${notification.iconBg}`}
                  >
                    <Icon
                      size={13}
                      className={notification.iconColor}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="truncate text-[10px] font-bold text-slate-700">
                        {notification.title}
                      </p>

                      {notification.unread && (
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                      )}
                    </div>

                    <p className="mt-1 line-clamp-2 text-[8px] leading-4 text-slate-400">
                      {notification.description}
                    </p>

                    <p className="mt-1 text-[7px] text-slate-300">
                      {notification.time}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Footer */}
          <div className="p-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-[9px] font-bold text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
            >
              عرض جميع الإشعارات
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsDropdown;