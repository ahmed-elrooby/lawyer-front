"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import {
  FaBell,
  FaCalendarAlt,
  FaFileAlt,
  FaGavel,
  FaUser,
  FaCheck,
} from "react-icons/fa";
import { OwnerContext } from "../../../../Providers/LawyerOwner/OwnerProvider.js";
import { useRouter } from "next/navigation.js";

const NotificationsDropdown = () => {
  const {
    notifications = [],
    handleReadNotificationFun,
    handleReadNoteFun,
  } = useContext(OwnerContext);
const router =useRouter()
  const [open, setOpen] = useState(false);

  const notificationRef = useRef(null);

  const getNotificationIcon = (notification) => {
    const type = notification?.type || "";

    if (type.includes("session")) {
      return {
        icon: FaCalendarAlt,
        iconBg: "bg-blue-50",
        iconColor: "text-blue-500",
      };
    }

    if (type.includes("document")) {
      return {
        icon: FaFileAlt,
        iconBg: "bg-purple-50",
        iconColor: "text-purple-500",
      };
    }

    if (type.includes("case")) {
      return {
        icon: FaGavel,
        iconBg: "bg-emerald-50",
        iconColor: "text-emerald-500",
      };
    }

    if (type.includes("client")) {
      return {
        icon: FaUser,
        iconBg: "bg-emerald-50",
        iconColor: "text-emerald-500",
      };
    }

    return {
      icon: FaBell,
      iconBg: "bg-slate-100",
      iconColor: "text-slate-500",
    };
  };

  const getRelativeTime = (date) => {
    if (!date) return "";

    const createdAt = new Date(date);
    const now = new Date();

    const diffInSeconds = Math.floor(
      (now - createdAt) / 1000
    );

    if (diffInSeconds < 60) {
      return "منذ أقل من دقيقة";
    }

    const diffInMinutes = Math.floor(
      diffInSeconds / 60
    );

    if (diffInMinutes < 60) {
      return `منذ ${diffInMinutes} دقيقة`;
    }

    const diffInHours = Math.floor(
      diffInMinutes / 60
    );

    if (diffInHours < 24) {
      return `منذ ${diffInHours} ساعة`;
    }

    const diffInDays = Math.floor(
      diffInHours / 24
    );

    if (diffInDays === 1) {
      return "أمس";
    }

    if (diffInDays < 7) {
      return `منذ ${diffInDays} أيام`;
    }

    return createdAt.toLocaleDateString("ar-EG");
  };

  const unreadNotifications = notifications.filter(
    (notification) => !notification?.isRead
  );

  const handleRead = (notification) => {
    if (notification?.isRead) return;

    if (handleReadNotificationFun) {
      handleReadNotificationFun(notification._id);
      return;
    }

    if (handleReadNoteFun) {
      handleReadNoteFun(notification._id);
    }
  };

  const handleReadAll = () => {
    unreadNotifications.forEach((notification) => {
      if (handleReadNotificationFun) {
        handleReadNotificationFun(notification._id);
      } else if (handleReadNoteFun) {
        handleReadNoteFun(notification._id);
      }
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
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
        {unreadNotifications.length > 0 && (
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
        )}
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
                لديك {unreadNotifications.length} إشعارات غير مقروءة
              </p>
            </div>

            {unreadNotifications.length > 0 && (
              <button
                type="button"
                onClick={handleReadAll}
                className="text-[9px] font-semibold text-blue-600 transition hover:text-blue-700"
              >
                تحديد الكل كمقروء
              </button>
            )}
          </div>

          {/* Notifications */}
          <div className="max-h-[360px] overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.slice(0, 5).map((notification) => {
                const {
                  icon: Icon,
                  iconBg,
                  iconColor,
                } = getNotificationIcon(notification);

                const isUnread = !notification?.isRead;

                return (
                  <button
                    key={notification._id}
                    type="button"
                    onClick={() => handleRead(notification)}
                    className={`group flex w-full gap-3 border-b border-slate-50 px-4 py-3 text-right transition hover:bg-slate-50 ${
                      isUnread
                        ? "bg-blue-50/30"
                        : "bg-white"
                    }`}
                  >
                    {/* Icon */}
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${iconBg}`}
                    >
                      <Icon
                        size={13}
                        className={iconColor}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <p
                          className={`truncate text-[10px] text-slate-700 ${
                            isUnread
                              ? "font-bold"
                              : "font-semibold"
                          }`}
                        >
                          {notification?.title}
                        </p>

                        {isUnread && (
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                        )}
                      </div>

                      <p className="mt-1 line-clamp-2 text-[8px] leading-4 text-slate-400">
                        {notification?.message}
                      </p>

                      <p className="mt-1 text-[7px] text-slate-300">
                        {getRelativeTime(
                          notification?.createdAt
                        )}
                      </p>
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="flex flex-col items-center justify-center px-4 py-10">
                <FaBell
                  size={20}
                  className="text-slate-300"
                />

                <p className="mt-3 text-[9px] font-semibold text-slate-400">
                  لا توجد إشعارات
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => {
                router.push("/Lawyer_Owner/Notifications");
                setOpen(false);
              }}
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