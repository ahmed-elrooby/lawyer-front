
"use client";

import React, { useContext, useState } from "react";
import {
  FaBell,
  FaCheck,
  FaCheckDouble,
  FaClock,
  FaTrash,
  FaUser,
  FaBuilding,
  FaCog,
  FaExclamationTriangle,
  FaCircle,
  FaCheckCircle,
} from "react-icons/fa";

import { AdminContext } from "../../../../../Providers/AdminContext/Admin.js";
import HandleDeleteNotification from "./HandleDeleteNotification.jsx";

const Table = () => {
  const {
    notifications,
    unreadNotifications,
    handleMarkAsReadFun,
    handleReadAllNotificationsFun,
    openDeleteNotification,
    setOpenDeleteNotification,
  } = useContext(AdminContext);

  const [selectedNotification, setSelectedNotification] = useState(null);

  // =========================
  // Pagination
  // =========================
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const notificationList = Array.isArray(notifications)
    ? notifications
    : [];

  const totalPages = Math.ceil(
    notificationList.length / itemsPerPage
  );

  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentNotifications = notificationList.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const unreadCount =
    typeof unreadNotifications === "number"
      ? unreadNotifications
      : notificationList.filter((item) => !item?.isRead).length;

  const getNotificationConfig = (type) => {
    switch (type) {
      case "user_created":
        return {
          icon: FaUser,
          label: "مستخدم جديد",
          wrapper: "bg-violet-50 text-violet-600",
        };

      case "user_updated":
        return {
          icon: FaUser,
          label: "تحديث مستخدم",
          wrapper: "bg-blue-50 text-blue-600",
        };

      case "user_deleted":
        return {
          icon: FaUser,
          label: "حذف مستخدم",
          wrapper: "bg-red-50 text-red-600",
        };

      case "office":
      case "offices":
        return {
          icon: FaBuilding,
          label: "مكتب",
          wrapper: "bg-emerald-50 text-emerald-600",
        };

      case "system":
        return {
          icon: FaCog,
          label: "النظام",
          wrapper: "bg-slate-100 text-slate-600",
        };

      case "important":
        return {
          icon: FaExclamationTriangle,
          label: "مهم",
          wrapper: "bg-amber-50 text-amber-600",
        };

      default:
        return {
          icon: FaBell,
          label: "إشعار",
          wrapper: "bg-blue-50 text-blue-600",
        };
    }
  };

  const formatDate = (date) => {
    if (!date) return "—";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "—";
    }

    return parsedDate.toLocaleDateString("ar-EG", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (date) => {
    if (!date) return "";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "";
    }

    return parsedDate.toLocaleTimeString("ar-EG", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      {openDeleteNotification && (
        <HandleDeleteNotification
          selectedNotification={selectedNotification}
        />
      )}

      <div
        className="overflow-hidden bg-white border shadow-sm rounded-2xl border-slate-200"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Title */}
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-50 rounded-2xl">
                <FaBell className="text-lg text-blue-600" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-slate-800">
                    الإشعارات
                  </h2>

                  {unreadCount > 0 && (
                    <span className="flex items-center justify-center h-6 px-2 text-xs font-bold text-blue-700 bg-blue-100 rounded-full min-w-6">
                      {unreadCount}
                    </span>
                  )}
                </div>

                <p className="mt-1 text-sm text-slate-500">
                  متابعة آخر التنبيهات والتحديثات الخاصة بالنظام
                </p>
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-2 text-xs font-semibold border rounded-xl text-slate-500 bg-slate-50 border-slate-200">
                <FaBell className="text-blue-500" />

                <span>
                  {notificationList.length}{" "}
                  {notificationList.length === 1
                    ? "إشعار"
                    : "إشعارات"}
                </span>
              </div>

              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={handleReadAllNotificationsFun}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-blue-600 transition-all border border-blue-100 bg-blue-50 rounded-xl hover:bg-blue-100 active:scale-[0.98]"
                >
                  <FaCheckDouble className="text-sm" />
                  تحديد الكل كمقروء
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Notifications */}
        {notificationList.length > 0 ? (
          <>
            <div className="divide-y divide-slate-100">
              {currentNotifications?.map((notification, index) => {
                const {
                  icon: Icon,
                  label,
                  wrapper,
                } = getNotificationConfig(notification?.type);

                const isRead = Boolean(notification?.isRead);

                const notificationId =
                  notification?._id || notification?.id;

                return (
                  <div
                    key={notificationId || index}
                    className={`relative px-5 py-5 sm:px-6 transition-all duration-200 group ${
                      !isRead
                        ? "bg-blue-50/40 hover:bg-blue-50/70"
                        : "bg-white hover:bg-slate-50/70"
                    }`}
                  >
                    {/* Unread indicator */}
                    {!isRead && (
                      <span className="absolute top-0 right-0 w-1 h-full bg-blue-600" />
                    )}

                    <div className="flex gap-4">
                      {/* Icon */}
                      <div
                        className={`flex items-center justify-center flex-shrink-0 w-11 h-11 rounded-xl ${wrapper}`}
                      >
                        <Icon className="text-sm" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                          {/* Main info */}
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3
                                className={`text-sm ${
                                  isRead
                                    ? "font-semibold text-slate-700"
                                    : "font-bold text-slate-900"
                                }`}
                              >
                                {notification?.title || "إشعار جديد"}
                              </h3>

                              {!isRead && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold text-blue-700 bg-blue-100 rounded-full">
                                  <FaCircle className="text-[5px]" />
                                  جديد
                                </span>
                              )}
                            </div>

                            <p className="mt-2 text-sm leading-6 text-slate-500">
                              {notification?.message ||
                                notification?.description ||
                                "لا يوجد وصف للإشعار"}
                            </p>
                          </div>

                          {/* Date */}
                          <div className="flex items-center flex-shrink-0 gap-2 text-xs text-slate-400">
                            <FaClock className="text-[11px]" />

                            <div className="flex flex-col items-start">
                              <span>
                                {formatDate(
                                  notification?.createdAt ||
                                    notification?.created_at
                                )}
                              </span>

                              <span className="mt-0.5 text-[10px] text-slate-300">
                                {formatTime(
                                  notification?.createdAt ||
                                    notification?.created_at
                                )}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Meta + Actions */}
                        <div className="flex flex-wrap items-center justify-between gap-3 mt-4">
                          {/* Meta */}
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="inline-flex items-center px-2.5 py-1 text-[11px] font-semibold text-slate-500 bg-slate-100 rounded-lg">
                              {label}
                            </span>

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
                                <FaCircle className="text-[6px]" />
                              )}

                              {isRead ? "مقروء" : "غير مقروء"}
                            </span>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-2">
                            {!isRead && (
                              <button
                                type="button"
                                onClick={() =>
                                  handleMarkAsReadFun(notification?._id)
                                }
                                className="inline-flex items-center gap-2 px-3 py-2 text-xs font-bold text-blue-600 transition-all border border-blue-100 bg-blue-50 rounded-xl hover:bg-blue-100 active:scale-[0.97]"
                                title="تحديد كمقروء"
                              >
                                <FaCheck className="text-[10px]" />

                                <span className="hidden sm:inline">
                                  تحديد كمقروء
                                </span>
                              </button>
                            )}

                            <button
                              type="button"
                              onClick={() => {
                                setSelectedNotification(notification);
                                setOpenDeleteNotification(true);
                              }}
                              className="inline-flex items-center justify-center w-9 h-9 text-red-500 transition-all border border-red-100 bg-red-50 rounded-xl hover:bg-red-100 active:scale-[0.97]"
                              title="حذف الإشعار"
                            >
                              <FaTrash className="text-xs" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col items-center justify-between gap-4 px-6 py-4 border-t border-slate-100 sm:flex-row">
                {/* Count */}
                <p className="text-xs text-slate-400">
                  عرض{" "}
                  <span className="font-bold text-slate-600">
                    {startIndex + 1}
                  </span>{" "}
                  إلى{" "}
                  <span className="font-bold text-slate-600">
                    {Math.min(
                      startIndex + itemsPerPage,
                      notificationList.length
                    )}
                  </span>{" "}
                  من{" "}
                  <span className="font-bold text-slate-600">
                    {notificationList.length}
                  </span>{" "}
                  إشعار
                </p>

                {/* Pages */}
                <div className="flex items-center gap-2" dir="ltr">
                  <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() =>
                      setCurrentPage((prev) =>
                        Math.max(prev - 1, 1)
                      )
                    }
                    className="px-3 py-2 text-xs font-bold transition-all bg-white border rounded-xl text-slate-600 border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    السابق
                  </button>

                  <div className="flex items-center gap-1">
                    {Array.from(
                      { length: totalPages },
                      (_, index) => index + 1
                    ).map((page) => (
                      <button
                        key={page}
                        type="button"
                        onClick={() => setCurrentPage(page)}
                        className={`flex items-center justify-center w-9 h-9 text-xs font-bold transition-all rounded-xl ${
                          currentPage === page
                            ? "text-white bg-blue-600 shadow-sm"
                            : "text-slate-500 bg-white border border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    disabled={currentPage === totalPages}
                    onClick={() =>
                      setCurrentPage((prev) =>
                        Math.min(prev + 1, totalPages)
                      )
                    }
                    className="px-3 py-2 text-xs font-bold transition-all bg-white border rounded-xl text-slate-600 border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    التالي
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
            <div className="relative flex items-center justify-center w-20 h-20 bg-slate-50 rounded-3xl">
              <FaBell className="text-2xl text-slate-300" />

              <span className="absolute w-3 h-3 border-2 border-white rounded-full bg-emerald-400 top-2 right-2" />
            </div>

            <h3 className="mt-5 text-base font-bold text-slate-700">
              لا توجد إشعارات
            </h3>

            <p className="max-w-md mt-2 text-sm leading-6 text-slate-400">
              لا توجد إشعارات متاحة حاليًا. ستظهر هنا جميع
              التنبيهات والتحديثات الجديدة الخاصة بالنظام.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Table;

