
"use client";

import React from "react";
import {
  FaTimes,
  FaCalendarAlt,
  FaClock,
  FaGavel,
  FaMapMarkerAlt,
  FaFileAlt,
  FaStickyNote,
  FaCheckCircle,
} from "react-icons/fa";

const Details = ({ openDetails, setOpenDetails, selectSession }) => {
  if (!openDetails || !selectSession) return null;

  const statusMap = {
    scheduled: {
      label: "مجدولة",
      className: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    },
    attended: {
      label: "تم الحضور",
      className: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    },
    postponed: {
      label: "مؤجلة",
      className: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    },
    completed: {
      label: "مكتملة",
      className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    },
    cancelled: {
      label: "ملغاة",
      className: "bg-red-500/10 text-red-400 border-red-500/20",
    },
  };

  const status = statusMap[selectSession.status] || {
    label: selectSession.status || "غير محدد",
    className: "bg-slate-500/10 text-slate-400 border-slate-500/20",
  };

  const formatDate = (date) => {
    if (!date) return "غير محدد";

    return new Date(date).toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={() => setOpenDetails(false)}
    >
      <div
        className="max-h-[80vh] w-full max-w-2xl add-case-scrollbar  overflow-y-auto rounded-2xl border border-slate-700/50 bg-slate-900 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-4 border-b border-slate-700/50 bg-slate-900">
          <div>
            <h2 className="text-lg font-bold text-white">
              تفاصيل الجلسة
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              {selectSession.title || "بدون عنوان"}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setOpenDetails(false)}
            className="flex items-center justify-center transition rounded-lg h-9 w-9 bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white"
          >
            <FaTimes />
          </button>
        </div>

        <div className="p-5 space-y-5">
          {/* Status */}
          <div className="flex items-center justify-between p-4 border rounded-xl border-slate-700/50 bg-slate-800/40">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-cyan-500/10 text-cyan-400">
                <FaGavel />
              </div>

              <div>
                <p className="text-xs text-slate-500">حالة الجلسة</p>
                <p className="mt-1 font-semibold text-white">
                  حالة الجلسة الحالية
                </p>
              </div>
            </div>

            <span
              className={`rounded-full border px-3 py-1 text-xs font-medium ${status.className}`}
            >
              {status.label}
            </span>
          </div>

          {/* Session Info */}
          <div>
            <h3 className="mb-3 text-sm font-bold text-white">
              بيانات الجلسة
            </h3>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <InfoItem
                icon={FaCalendarAlt}
                label="تاريخ الجلسة"
                value={formatDate(selectSession.sessionDate)}
              />

              <InfoItem
                icon={FaClock}
                label="وقت الجلسة"
                value={selectSession.sessionTime || "غير محدد"}
              />

              <InfoItem
                icon={FaGavel}
                label="القضية"
                value={
                  selectSession.caseId?.title ||
                  "غير مرتبطة بقضية"
                }
              />

              <InfoItem
                icon={FaFileAlt}
                label="رقم القضية"
                value={selectSession.caseId?.caseNumber || "غير محدد"}
              />

              <InfoItem
                icon={FaMapMarkerAlt}
                label="المحكمة"
                value={selectSession.caseId?.court || "غير محددة"}
              />

              <InfoItem
                icon={FaCheckCircle}
                label="الجلسة القادمة"
                value={
                  selectSession.nextSessionDate
                    ? formatDate(selectSession.nextSessionDate)
                    : "لا توجد"
                }
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <FaStickyNote className="text-amber-400" />

              <h3 className="text-sm font-bold text-white">
                الملاحظات
              </h3>
            </div>

            <div className="min-h-[80px] rounded-xl border border-slate-700/50 bg-slate-800/40 p-4 text-sm leading-7 text-slate-300">
              {selectSession.notes?.trim()
                ? selectSession.notes
                : "لا توجد ملاحظات"}
            </div>
          </div>

          {/* Decision */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <FaGavel className="text-cyan-400" />

              <h3 className="text-sm font-bold text-white">
                القرار
              </h3>
            </div>

            <div className="min-h-[80px] rounded-xl border border-slate-700/50 bg-slate-800/40 p-4 text-sm leading-7 text-slate-300">
              {selectSession.decision?.trim()
                ? selectSession.decision
                : "لا يوجد قرار مسجل"}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-slate-700/50 bg-slate-900">
          <button
            type="button"
            onClick={() => setOpenDetails(false)}
            className="w-full rounded-xl bg-slate-800 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ icon: Icon, label, value }) => {
  return (
    <div className="p-4 border rounded-xl border-slate-700/50 bg-slate-800/40">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center rounded-lg h-9 w-9 shrink-0 bg-slate-700/50 text-cyan-400">
          <Icon className="text-sm" />
        </div>

        <div className="min-w-0">
          <p className="text-xs text-slate-500">{label}</p>

          <p className="mt-1 text-sm font-medium truncate text-slate-200">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Details;
