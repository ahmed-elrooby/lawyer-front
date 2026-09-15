
"use client";

import React, { useContext, useMemo } from "react";
import {
  FaBell,
  FaCheckCircle,
  FaRegCircle,
  FaTrash,
  FaEnvelopeOpen,
} from "react-icons/fa";

import { LawyerContext } from "../../../../../Providers/LawyerContext/lawyer.js";

const Table = () => {
  const {
    notifications = [],
    handleReadNotificationFun,
  } = useContext(LawyerContext);

  const notificationList = useMemo(() => {
    return [...notifications].sort(
      (a, b) => new Date(b?.createdAt) - new Date(a?.createdAt)
    );
  }, [notifications]);

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("ar-EG", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleTimeString("ar-EG", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

 
 

  if (!notificationList.length) {
    return (
      <div className="p-10 text-center border bg-slate-900 border-slate-700/50 rounded-2xl">
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-slate-800">
          <FaBell className="text-2xl text-slate-500" />
        </div>

        <h3 className="mb-2 text-lg font-bold text-white">
          لا توجد إشعارات
        </h3>

        <p className="text-sm text-slate-400">
          لا يوجد لديك أي إشعارات في الوقت الحالي
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 overflow-hidden border bg-slate-900 border-slate-700/50 rounded-2xl">
      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-700/50">
        <h2 className="text-lg font-bold text-white">
          جميع الإشعارات
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          آخر الإشعارات والتحديثات الخاصة بك
        </p>
      </div>

      {/* Notifications */}
      <div className="divide-y divide-slate-700/50">
        {notificationList.map((notification) => {
          const isUnread = !notification?.isRead;

          return (
            <div
              key={notification?._id}
              className={`p-5 transition ${
                isUnread
                  ? "bg-slate-800/40"
                  : "bg-slate-900 hover:bg-slate-800/30"
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div
                  className={`w-11 h-11 shrink-0 rounded-xl flex items-center justify-center ${
                    isUnread
                      ? "bg-blue-500/10 text-blue-400"
                      : "bg-slate-800 text-slate-500"
                  }`}
                >
                  <FaBell />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3
                        className={`text-sm font-bold ${
                          isUnread
                            ? "text-white"
                            : "text-slate-300"
                        }`}
                      >
                        {notification?.title || "إشعار جديد"}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-slate-400">
                        {notification?.message ||
                          notification?.description ||
                          "لديك إشعار جديد"}
                      </p>
                    </div>

                    {/* Status */}
                    <div className="shrink-0">
                      {isUnread ? (
                        <FaRegCircle className="text-xs text-blue-400" />
                      ) : (
                        <FaCheckCircle className="text-xs text-emerald-400" />
                      )}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mt-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-500">
                        {formatDate(notification?.createdAt)}
                      </span>

                      <span className="text-xs text-slate-600">
                        •
                      </span>

                      <span className="text-xs text-slate-500">
                        {formatTime(notification?.createdAt)}
                      </span>

                      {isUnread && (
                        <span className="px-2 py-1 rounded-lg bg-blue-500/10 text-blue-400 text-[11px] font-semibold">
                          غير مقروء
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      {/* Read Button */}
                      {isUnread && (
                        <button
                          type="button"
                          onClick={() =>
                            handleReadNotificationFun(notification?._id)
                          }
                          className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-blue-400 transition rounded-lg bg-blue-500/10 hover:bg-blue-500/20 hover:text-blue-300"
                          title="تحديد كمقروء"
                        >
                          <FaEnvelopeOpen />
                          <span>قراءة</span>
                        </button>
                      )}

                      {/* Delete Button */}
                     
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Table;

