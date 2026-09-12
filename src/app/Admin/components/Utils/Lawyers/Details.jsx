"use client";

import React from "react";
import {
  FaTimes,
  FaUserTie,
  FaEnvelope,
  FaPhone,
  FaBuilding,
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaIdCard,
  FaUserShield,
} from "react-icons/fa";

const Details = ({ lawyer, openDetails, setOpenDetails }) => {
  if (!openDetails || !lawyer) return null;

  const isActive =
    lawyer?.isActive === true ||
    lawyer?.isActive === "true" ||
    lawyer?.status === "active";

  const profileImage = lawyer?.profileImage?.url;

  const formatDate = (date) => {
    if (!date) return "غير متوفر";

    return new Date(date).toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getInitials = (name) => {
    if (!name) return "م";

    return name
      .split(" ")
      .slice(0, 2)
      .map((word) => word.charAt(0))
      .join("");
  };

  const closeModal = () => {
    setOpenDetails(false);
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-950/60 p-3 backdrop-blur-sm sm:p-4">
      {/* Overlay */}
      <button
        type="button"
        aria-label="إغلاق"
        onClick={closeModal}
        className="absolute inset-0 cursor-default"
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-2xl overflow-hidden bg-white border shadow-2xl rounded-3xl border-white/60 shadow-slate-900/20">
        {/* Top Gradient */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-l from-blue-600 via-indigo-500 to-blue-400" />

        {/* Header */}
        <div className="relative px-5 pb-5 border-b border-slate-100 pt-7 sm:px-7">
          <div className="absolute rounded-full -left-10 -top-10 h-28 w-28 bg-blue-500/5 blur-2xl" />
          <div className="absolute top-0 rounded-full -right-10 h-28 w-28 bg-indigo-500/5 blur-2xl" />

          <div className="relative flex items-start justify-between gap-4">
            <div className="flex items-center min-w-0 gap-4">
              <div className="flex items-center justify-center shadow-lg h-14 w-14 shrink-0 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-blue-500/20">
                <FaUserTie className="text-xl text-white" />
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-lg font-bold tracking-tight text-slate-800 sm:text-xl">
                    تفاصيل المحامي
                  </h2>

                  <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[9px] font-bold text-blue-600 sm:text-[10px]">
                    LAWYER PROFILE
                  </span>
                </div>

                <p className="mt-1.5 text-xs text-slate-500 sm:text-sm">
                  عرض البيانات الأساسية للمحامي
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={closeModal}
              className="flex items-center justify-center w-10 h-10 transition-all bg-white border shrink-0 rounded-xl border-slate-200 text-slate-400 hover:border-red-200 hover:bg-red-50 hover:text-red-500"
            >
              <FaTimes />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="max-h-[70vh] overflow-y-auto px-5 py-6 sm:px-7">
          {/* Profile */}
          <div className="relative p-5 overflow-hidden border rounded-2xl border-slate-200 bg-gradient-to-br from-slate-50 via-white to-blue-50/40">
            <div className="absolute rounded-full -right-10 -top-10 h-28 w-28 bg-blue-500/5 blur-2xl" />

            <div className="relative flex flex-col items-center gap-5 sm:flex-row">
              {/* Avatar */}
              <div className="relative shrink-0">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt={lawyer?.name || "المحامي"}
                    className="object-cover w-24 h-24 shadow-lg rounded-2xl ring-4 ring-white"
                  />
                ) : (
                  <div className="flex items-center justify-center w-24 h-24 text-2xl font-bold text-white shadow-lg rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 ring-4 ring-white">
                    {getInitials(lawyer?.name)}
                  </div>
                )}

                {/* Status */}
                <span
                  className={`absolute -bottom-2 -right-2 flex items-center gap-1 rounded-full border-2 border-white px-2.5 py-1 text-[10px] font-bold shadow-sm ${
                    isActive
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-red-50 text-red-600"
                  }`}
                >
                  {isActive ? (
                    <FaCheckCircle className="text-[9px]" />
                  ) : (
                    <FaTimesCircle className="text-[9px]" />
                  )}

                  {isActive ? "نشط" : "غير نشط"}
                </span>
              </div>

              {/* Name */}
              <div className="flex-1 min-w-0 text-center sm:text-right">
                <h3 className="text-xl font-bold text-slate-800">
                  {lawyer?.name || "بدون اسم"}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  {lawyer?.email || "لا يوجد بريد إلكتروني"}
                </p>

                <div className="flex flex-wrap justify-center gap-2 mt-3 sm:justify-start">
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-600">
                    <FaUserShield />
                    محامي
                  </span>

                  {lawyer?.officeId && (
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                      <FaBuilding />
                      مرتبط بمكتب
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Information */}
          <div className="mt-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 rounded-full h-7 bg-gradient-to-b from-blue-600 to-indigo-600" />

              <h3 className="text-sm font-bold text-slate-800">
                البيانات الأساسية
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {/* Name */}
              <div className="p-4 transition bg-white border rounded-2xl border-slate-200 hover:border-blue-200 hover:shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 text-blue-600 shrink-0 rounded-xl bg-blue-50">
                    <FaIdCard />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[11px] font-medium text-slate-400">
                      الاسم
                    </p>

                    <p className="mt-1 text-sm font-bold truncate text-slate-700">
                      {lawyer?.name || "غير متوفر"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="p-4 transition bg-white border rounded-2xl border-slate-200 hover:border-blue-200 hover:shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 text-indigo-600 shrink-0 rounded-xl bg-indigo-50">
                    <FaEnvelope />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[11px] font-medium text-slate-400">
                      البريد الإلكتروني
                    </p>

                    <p
                      className="mt-1 text-sm font-bold truncate text-slate-700"
                      dir="ltr"
                    >
                      {lawyer?.email || "غير متوفر"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="p-4 transition bg-white border rounded-2xl border-slate-200 hover:border-blue-200 hover:shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 shrink-0 rounded-xl bg-emerald-50 text-emerald-600">
                    <FaPhone />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[11px] font-medium text-slate-400">
                      رقم الهاتف
                    </p>

                    <p
                      className="mt-1 text-sm font-bold text-slate-700"
                      dir="ltr"
                    >
                      {lawyer?.phone || "غير متوفر"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Role */}
              <div className="p-4 transition bg-white border rounded-2xl border-slate-200 hover:border-blue-200 hover:shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 shrink-0 rounded-xl bg-violet-50 text-violet-600">
                    <FaUserTie />
                  </div>

                  <div>
                    <p className="text-[11px] font-medium text-slate-400">
                      الصلاحية
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-700">
                      {lawyer?.role === "lawyer"
                        ? "محامي"
                        : lawyer?.role || "غير محدد"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 rounded-full h-7 bg-gradient-to-b from-blue-600 to-indigo-600" />

              <h3 className="text-sm font-bold text-slate-800">
                معلومات الحساب
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {/* Created */}
              <div className="flex items-center gap-3 p-4 border rounded-2xl border-slate-200 bg-slate-50/70">
                <div className="flex items-center justify-center w-10 h-10 text-blue-600 bg-white shadow-sm shrink-0 rounded-xl">
                  <FaCalendarAlt />
                </div>

                <div>
                  <p className="text-[11px] font-medium text-slate-400">
                    تاريخ إنشاء الحساب
                  </p>

                  <p className="mt-1 text-sm font-bold text-slate-700">
                    {formatDate(lawyer?.createdAt)}
                  </p>
                </div>
              </div>

              {/* Updated */}
              <div className="flex items-center gap-3 p-4 border rounded-2xl border-slate-200 bg-slate-50/70">
                <div className="flex items-center justify-center w-10 h-10 text-indigo-600 bg-white shadow-sm shrink-0 rounded-xl">
                  <FaCalendarAlt />
                </div>

                <div>
                  <p className="text-[11px] font-medium text-slate-400">
                    آخر تحديث
                  </p>

                  <p className="mt-1 text-sm font-bold text-slate-700">
                    {formatDate(lawyer?.updatedAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end px-5 py-4 bg-white border-t border-slate-100 sm:px-7">
          <button
            type="button"
            onClick={closeModal}
            className="rounded-xl bg-slate-900 px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-slate-800 active:scale-95"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};

export default Details;
