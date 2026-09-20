
"use client";

import React, { useContext, useEffect, useRef, useState } from "react";

import {
  Bell,
  ChevronDown,
  User,
  Settings,
  LogOut,
  Check,
  X,
} from "lucide-react";

import { authContext } from "../../../../Providers/AuthProvider/Auth.js";
import { LawyerContext } from "../../../../Providers/LawyerContext/lawyer.js";

const Header = () => {
  const [openProfile, setOpenProfile] = useState(false);
  const [openNotifications, setOpenNotifications] = useState(false);

  const profileRef = useRef(null);
  const notificationRef = useRef(null);

  const { profile, handleLogoutFun } = useContext(authContext);

  const {
    notifications = [],
    handleReadNotificationFun,
    unreadNotifications,
  } = useContext(LawyerContext);

  const user = profile?.user;

  // إغلاق الـ dropdown عند الضغط خارجها
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setOpenProfile(false);
      }

      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setOpenNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // تنسيق التاريخ
  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("ar-EG", {
      day: "numeric",
      month: "short",
    });
  };

  // الانتقال لصفحة الإشعارات
  const handleGoToNotifications = () => {
    setOpenNotifications(false);
    window.location.href = "/Lawyer/Notification";
  };

  // الانتقال للملف الشخصي
  const handleGoToProfile = () => {
    setOpenProfile(false);
    window.location.href = "/Lawyer/Profile";
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-4 px-4 py-3 border-b border-slate-700 bg-slate-800 sm:px-6">
      {/* =========================
          Welcome
      ========================== */}
      <div className="min-w-0">
        <h1 className="text-sm font-bold text-white sm:text-base">
          أهلاً بك، {user?.name || "مستخدم"} 👋
        </h1>

        <p className="hidden mt-1 text-xs text-slate-400 sm:block">
          نتمنى لك يوماً مليئاً بالإنجاز والنجاح
        </p>
      </div>

      {/* =========================
          Right Side
      ========================== */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* =========================
            Notifications
        ========================== */}
        <div
          className="relative"
          ref={notificationRef}
        >
          {/* Notification Button */}
          <button
            type="button"
            onClick={() => {
              setOpenNotifications((prev) => !prev);
              setOpenProfile(false);
            }}
            className="relative flex items-center justify-center w-10 h-10 transition rounded-xl hover:bg-slate-700"
          >
            <Bell className="w-5 h-5 text-white" />

            {/* Notification Count */}
            <span className="absolute flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold text-white bg-red-500 border-2 rounded-full -top-0.5 -right-0.5 border-slate-800">
              {unreadNotifications?.count > 9
                ? "9+"
                : unreadNotifications?.count || 0}
            </span>
          </button>

          {/* =========================
              Notifications Dropdown
          ========================== */}
          {openNotifications && (
            <div className="absolute left-0 mt-3 overflow-hidden border shadow-2xl w-80 sm:w-96 bg-slate-900 border-slate-700 rounded-2xl">
              {/* Dropdown Header */}
              <div className="flex items-center justify-between px-4 py-4 border-b border-slate-700">
                <div>
                  <h3 className="font-bold text-white">
                    الإشعارات
                  </h3>

                  <p className="mt-1 text-xs text-slate-400">
                    {unreadNotifications?.count > 0
                      ? `لديك ${unreadNotifications.count} إشعار غير مقروء`
                      : "لا توجد إشعارات جديدة"}
                  </p>
                </div>

                {/* Close */}
                <button
                  type="button"
                  onClick={() => setOpenNotifications(false)}
                  className="p-2 transition rounded-lg hover:bg-slate-800"
                >
                  <X className="w-4 h-4 text-slate-400" />
                </button>
              </div>

              {/* =========================
                  Notifications List
              ========================== */}
              <div className="overflow-y-auto add-case-scrollbar max-h-80">
                {notifications.length > 0 ? (
                  notifications.slice(0, 5).map((notification) => (
                    <div
                      key={notification?._id}
                      className={`flex items-start gap-3 p-4 border-b border-slate-800 transition hover:bg-slate-800/70 ${
                        !notification?.isRead
                          ? "bg-blue-500/5"
                          : ""
                      }`}
                    >
                      {/* Notification Icon */}
                      <div className="flex items-center justify-center flex-shrink-0 rounded-lg w-9 h-9 bg-blue-500/10">
                        <Bell className="w-4 h-4 text-blue-400" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-white">
                          {notification?.title || "إشعار جديد"}
                        </p>

                        <p className="mt-1 text-xs leading-5 text-slate-400 line-clamp-2">
                          {notification?.message ||
                            notification?.description ||
                            "لديك إشعار جديد"}
                        </p>

                        {/* Date */}
                        <p className="mt-2 text-[10px] text-slate-500">
                          {formatDate(notification?.createdAt)}
                        </p>
                      </div>

                      {/* =========================
                          Mark As Read
                      ========================== */}
                      {!notification?.isRead && (
                        <button
                          type="button"
                          title="تحديد كمقروء"
                          onClick={() =>
                            handleReadNotificationFun(
                              notification?._id
                            )
                          }
                          className="flex items-center justify-center flex-shrink-0 w-8 h-8 mt-1 text-blue-400 transition rounded-lg bg-blue-500/10 hover:bg-blue-500/20 hover:text-blue-300"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))
                ) : (
                  /* Empty State */
                  <div className="flex flex-col items-center justify-center px-4 py-10">
                    <div className="flex items-center justify-center w-12 h-12 mb-3 rounded-full bg-slate-800">
                      <Bell className="w-5 h-5 text-slate-500" />
                    </div>

                    <p className="text-sm font-medium text-slate-400">
                      لا توجد إشعارات
                    </p>
                  </div>
                )}
              </div>

              {/* =========================
                  View All Notifications
              ========================== */}
              {notifications.length > 5 && (
                <div className="p-3 border-t border-slate-700">
                  <button
                    type="button"
                    onClick={handleGoToNotifications}
                    className="w-full py-2.5 text-xs font-semibold text-blue-400 transition rounded-xl bg-blue-500/5 hover:bg-blue-500/10 hover:text-blue-300"
                  >
                    عرض كل الإشعارات
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* =========================
            Profile
        ========================== */}
        <div
          className="relative"
          ref={profileRef}
        >
          {/* Profile Button */}
          <button
            type="button"
            onClick={() => {
              setOpenProfile((prev) => !prev);
              setOpenNotifications(false);
            }}
            className="flex items-center gap-2 p-1.5 transition rounded-xl hover:bg-slate-700"
          >
            {/* Profile Image */}
            <div className="flex items-center justify-center overflow-hidden border-2 rounded-full w-9 h-9 bg-slate-700 border-emerald-500">
              {user?.profileImage?.url ? (
                <img
                  src={user.profileImage.url}
                  alt={user?.name || "profile"}
                  className="object-cover w-full h-full"
                />
              ) : (
                <User className="w-4 h-4 text-slate-400" />
              )}
            </div>

            {/* User Info */}
            <div className="hidden text-right lg:block">
              <p className="text-xs font-semibold text-white">
                {user?.name || "-"}
              </p>

              <p className="mt-0.5 text-[10px] text-slate-400">
                {user?.role === "lawyer"
                  ? "محامي"
                  : user?.role === "office_owner"
                  ? "مالك مكتب"
                  : "مدير النظام"}
              </p>
            </div>

            {/* Arrow */}
            <ChevronDown
              className={`hidden w-4 h-4 text-slate-400 transition-transform lg:block ${
                openProfile ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* =========================
              Profile Dropdown
          ========================== */}
          {openProfile && (
            <div className="absolute left-0 w-64 mt-3 overflow-hidden border shadow-2xl top-full bg-slate-900 border-slate-700 rounded-2xl">
              {/* Profile Info */}
              <div className="p-4 border-b border-slate-700">
                <div className="flex items-center gap-3">
                  {/* Image */}
                  <div className="flex items-center justify-center overflow-hidden border-2 rounded-full w-11 h-11 bg-slate-800 border-emerald-500">
                    {user?.profileImage?.url ? (
                      <img
                        src={user.profileImage.url}
                        alt={user?.name || "profile"}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <User className="w-5 h-5 text-slate-400" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-white truncate">
                      {user?.name || "-"}
                    </p>

                    <p className="mt-1 text-xs truncate text-slate-400">
                      {user?.email || "-"}
                    </p>
                  </div>
                </div>
              </div>

              {/* =========================
                  Profile Menu
              ========================== */}
              <div className="p-2">
                {/* Profile */}
                <button
                  type="button"
                  onClick={handleGoToProfile}
                  className="flex items-center w-full gap-3 px-3 py-2.5 text-sm text-slate-300 transition rounded-xl hover:bg-slate-800 hover:text-white"
                >
                  <User className="w-4 h-4 text-slate-400" />

                  <span>الملف الشخصي</span>
                </button>

                {/* Settings */}
             
              </div>

              {/* =========================
                  Logout
              ========================== */}
              <div className="p-2 border-t border-slate-700">
                <button
                  type="button"
                  onClick={handleLogoutFun}
                  className="flex items-center w-full gap-3 px-3 py-2.5 text-sm font-semibold text-red-400 transition rounded-xl hover:bg-red-500/10"
                >
                  <LogOut className="w-4 h-4" />

                  <span>تسجيل الخروج</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
