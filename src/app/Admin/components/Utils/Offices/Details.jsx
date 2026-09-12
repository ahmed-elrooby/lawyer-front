"use client";

import React from "react";
import {
  FaBuilding,
  FaTimes,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaGlobe,
  FaUserTie,
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaIdCard,
} from "react-icons/fa";

const Details = ({ office, setOpenDetails, openDetails }) => {
  if (!openDetails || !office) return null;

  const formatDate = (date) => {
    if (!date) return "غير متوفر";

    return new Date(date).toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleClose = () => {
    setOpenDetails(false);
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/50 px-4 py-6 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
    >
      <div
        dir="rtl"
        className="relative max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl"
      >
        {/* Top Line */}
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-400" />

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 sm:px-7">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 text-white shadow-lg rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-blue-500/20">
              <FaBuilding className="text-lg" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-800">تفاصيل المكتب</h2>

              <p className="mt-0.5 text-xs text-gray-400">
                عرض بيانات المكتب بالكامل
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="flex items-center justify-center text-gray-400 transition-all bg-gray-100 h-9 w-9 rounded-xl hover:bg-gray-200 hover:text-gray-700"
          >
            <FaTimes className="text-xs" />
          </button>
        </div>

        {/* Content */}
        <div className="max-h-[calc(90vh-90px)] overflow-y-auto p-6 sm:p-7">
          {/* Office Identity */}
          <div className="relative p-5 overflow-hidden border border-blue-100 rounded-2xl bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            <div className="absolute w-24 h-24 rounded-full -left-8 -top-8 bg-blue-500/5 blur-2xl" />

            <div className="relative flex items-center gap-4">
              <div className="flex items-center justify-center w-16 h-16 text-blue-600 bg-white shadow-sm shrink-0 rounded-2xl ring-1 ring-blue-100">
                <FaBuilding className="text-2xl" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg font-bold text-gray-800 truncate">
                    {office.name || "مكتب بدون اسم"}
                  </h3>

                  {office.isActive ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-600">
                      <FaCheckCircle className="text-[9px]" />
                      نشط
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-[10px] font-bold text-red-500">
                      <FaTimesCircle className="text-[9px]" />
                      غير نشط
                    </span>
                  )}
                </div>

                <p className="mt-1 text-xs text-gray-400">
                  بيانات المكتب المسجلة على المنصة
                </p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mt-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-5 bg-blue-600 rounded-full" />

              <h3 className="text-sm font-bold text-gray-800">
                معلومات التواصل
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {/* Phone */}
              <div className="p-4 transition-all border border-gray-100 rounded-2xl bg-gray-50/70 hover:border-blue-100 hover:bg-blue-50/30">
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-10 h-10 text-blue-600 shrink-0 rounded-xl bg-blue-50">
                    <FaPhone className="text-sm" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[10px] font-medium text-gray-400">
                      رقم الهاتف
                    </p>

                    <p
                      dir="ltr"
                      className="mt-1 text-sm font-semibold text-gray-700 truncate"
                    >
                      {office.phone || "غير متوفر"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="p-4 transition-all border border-gray-100 rounded-2xl bg-gray-50/70 hover:border-blue-100 hover:bg-blue-50/30">
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-10 h-10 text-indigo-600 shrink-0 rounded-xl bg-indigo-50">
                    <FaEnvelope className="text-sm" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[10px] font-medium text-gray-400">
                      البريد الإلكتروني
                    </p>

                    <p
                      dir="ltr"
                      className="mt-1 text-sm font-semibold text-gray-700 truncate"
                    >
                      {office.email || "غير متوفر"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="mt-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-5 bg-indigo-600 rounded-full" />

              <h3 className="text-sm font-bold text-gray-800">الموقع</h3>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {/* Address */}
              <div className="p-4 bg-white border border-gray-100 shadow-sm rounded-2xl">
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-blue-500" />

                  <span className="text-[10px] font-medium text-gray-400">
                    العنوان
                  </span>
                </div>

                <p className="mt-2 text-sm font-semibold text-gray-700">
                  {office.address || "غير متوفر"}
                </p>
              </div>

              {/* City */}
              <div className="p-4 bg-white border border-gray-100 shadow-sm rounded-2xl">
                <div className="flex items-center gap-2">
                  <FaGlobe className="text-indigo-500" />

                  <span className="text-[10px] font-medium text-gray-400">
                    المدينة
                  </span>
                </div>

                <p className="mt-2 text-sm font-semibold text-gray-700">
                  {office.city || "غير متوفر"}
                </p>
              </div>

              {/* Country */}
              <div className="p-4 bg-white border border-gray-100 shadow-sm rounded-2xl">
                <div className="flex items-center gap-2">
                  <FaGlobe className="text-sky-500" />

                  <span className="text-[10px] font-medium text-gray-400">
                    الدولة
                  </span>
                </div>

                <p className="mt-2 text-sm font-semibold text-gray-700">
                  {office.country || "غير متوفر"}
                </p>
              </div>
            </div>
          </div>

          {/* Owner */}
          <div className="mt-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-5 bg-purple-600 rounded-full" />

              <h3 className="text-sm font-bold text-gray-800">مالك المكتب</h3>
            </div>

            <div className="p-4 border border-gray-100 rounded-2xl bg-gray-50/70">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center text-purple-600 h-11 w-11 rounded-xl bg-purple-50">
                  <FaUserTie />
                </div>

                <div>
                  <p className="text-[10px] font-medium text-gray-400">
                    صاحب المكتب
                  </p>

                  <p className="mt-1 text-sm font-bold text-gray-700">
                    {office.Owner_id?.name || "لم يتم تعيين مالك"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Dates */}
          <div className="mt-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-5 bg-gray-500 rounded-full" />

              <h3 className="text-sm font-bold text-gray-800">
                معلومات النظام
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {/* Created */}
              <div className="flex items-center gap-3 p-4 border border-gray-100 rounded-2xl bg-gray-50/70">
                <div className="flex items-center justify-center w-10 h-10 text-gray-500 bg-white shadow-sm rounded-xl">
                  <FaCalendarAlt />
                </div>

                <div>
                  <p className="text-[10px] font-medium text-gray-400">
                    تاريخ التسجيل
                  </p>

                  <p className="mt-1 text-sm font-semibold text-gray-700">
                    {formatDate(office.createdAt)}
                  </p>
                </div>
              </div>

              {/* Updated */}
              <div className="flex items-center gap-3 p-4 border border-gray-100 rounded-2xl bg-gray-50/70">
                <div className="flex items-center justify-center w-10 h-10 text-gray-500 bg-white shadow-sm rounded-xl">
                  <FaCalendarAlt />
                </div>

                <div>
                  <p className="text-[10px] font-medium text-gray-400">
                    آخر تحديث
                  </p>

                  <p className="mt-1 text-sm font-semibold text-gray-700">
                    {formatDate(office.updatedAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ID */}
          <div className="p-4 mt-5 border border-gray-200 border-dashed rounded-2xl bg-gray-50/50">
            <div className="flex items-center gap-3">
              <FaIdCard className="text-gray-400" />

              <div className="min-w-0">
                <p className="text-[10px] font-medium text-gray-400">
                  معرف المكتب
                </p>

                <p
                  dir="ltr"
                  className="mt-1 font-mono text-xs text-gray-500 truncate"
                >
                  {office._id || "غير متوفر"}
                </p>
              </div>
            </div>
          </div>

          {/* Close Button */}
          <button
            type="button"
            onClick={handleClose}
            className="mt-6 h-12 w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-500/25 active:translate-y-0"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};

export default Details;
