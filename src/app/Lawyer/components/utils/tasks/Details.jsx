"use client";

import React, { useContext } from "react";
import {
  FaTimes,
  FaTasks,
  FaCalendarAlt,
  FaUserTie,
  FaUser,
  FaExchangeAlt,
} from "react-icons/fa";
import { LawyerContext } from "../../../../../Providers/LawyerContext/lawyer.js";

const Details = ({ selectTask, setOpenDetails, openDetails }) => {
  const { handleUpdateTaskStatusFun, loadding } =
    useContext(LawyerContext);

  if (!openDetails || !selectTask) return null;

  const priorityMap = {
    high: {
      label: "عالية",
      style:
        "text-orange-400 bg-orange-500/10 border-orange-500/20",
    },
    medium: {
      label: "متوسطة",
      style:
        "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
    },
    low: {
      label: "منخفضة",
      style:
        "text-slate-300 bg-slate-800 border-slate-700",
    },
  };

  const statusMap = {
    todo: {
      label: "لم تبدأ",
      style:
        "text-slate-300 bg-slate-800 border-slate-700",
    },
    in_progress: {
      label: "قيد التنفيذ",
      style:
        "text-blue-400 bg-blue-500/10 border-blue-500/20",
    },
    completed: {
      label: "مكتملة",
      style:
        "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    },
  };

  const priority = priorityMap[selectTask.priority];
  const status = statusMap[selectTask.status];

  const handleStatusChange = (e) => {
    handleUpdateTaskStatusFun(selectTask._id, e.target.value);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-sm sm:p-4">
      <div className="w-full max-w-2xl dark-scrollbar max-h-[92vh] overflow-y-auto border shadow-2xl rounded-2xl border-slate-800 bg-slate-900">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center border w-11 h-11 rounded-xl border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
              <FaTasks />
            </div>

            <div>
              <h2 className="text-base font-bold text-white sm:text-lg">
                تفاصيل المهمة
              </h2>
              <p className="mt-1 text-[11px] text-slate-500 sm:text-xs">
                عرض تفاصيل المهمة وتحديث حالتها
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOpenDetails(false)}
            className="flex items-center justify-center transition rounded-lg w-9 h-9 text-slate-400 bg-slate-800 hover:bg-slate-700 hover:text-white"
          >
            <FaTimes className="text-sm" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-5 sm:p-6">
          {/* Title */}
          <div>
            <p className="mb-2 text-xs font-medium text-slate-500">
              عنوان المهمة
            </p>

            <h3 className="text-lg font-bold text-white">
              {selectTask.title}
            </h3>
          </div>

          {/* Description */}
          <div className="p-4 border rounded-xl border-slate-800 bg-slate-950/30">
            <p className="mb-2 text-xs font-medium text-slate-500">
              وصف المهمة
            </p>

            <p className="text-sm leading-7 text-slate-300">
              {selectTask.description || "لا يوجد وصف للمهمة"}
            </p>
          </div>

          {/* Info */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Priority */}
            <div className="p-4 border rounded-xl border-slate-800 bg-slate-950/30">
              <p className="mb-2 text-xs font-medium text-slate-500">
                الأولوية
              </p>

              <span
                className={`inline-flex items-center px-3 py-1.5 text-xs font-semibold border rounded-full ${priority?.style}`}
              >
                {priority?.label || "غير محددة"}
              </span>
            </div>

            {/* Due Date */}
            <div className="p-4 border rounded-xl border-slate-800 bg-slate-950/30">
              <p className="mb-2 text-xs font-medium text-slate-500">
                تاريخ الاستحقاق
              </p>

              <div className="flex items-center gap-2 text-sm text-slate-300">
                <FaCalendarAlt className="text-emerald-400" />

                {selectTask.dueDate
                  ? new Date(
                      selectTask.dueDate
                    ).toLocaleDateString("ar-EG", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  : "بدون موعد"}
              </div>
            </div>
          </div>

          {/* Assigned By */}
          <div className="p-4 border rounded-xl border-slate-800 bg-slate-950/30">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 border rounded-xl border-slate-700 bg-slate-800 text-slate-300">
                <FaUserTie />
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  تم إرسال المهمة بواسطة
                </p>

                <p className="mt-1 text-sm font-semibold text-white">
                  {selectTask.assignedBy?.name || "إدارة المكتب"}
                </p>
              </div>
            </div>
          </div>

          {/* Status */}
<div className="p-4 border rounded-xl border-emerald-500/10 bg-emerald-500/5">
  <div className="flex items-center gap-2 mb-3">
    <FaExchangeAlt className="text-emerald-400" />

    <label className="text-sm font-semibold text-white">
      الحالة الحالية
    </label>
  </div>

  <span
    className={`inline-flex items-center px-3 py-2 text-xs font-semibold border rounded-lg ${status?.style}`}
  >
    {status?.label || "غير محددة"}
  </span>
</div>
        </div>

        {/* Footer */}
        <div className="flex justify-end px-5 py-4 border-t border-slate-800 sm:px-6">
          <button
            type="button"
            onClick={() => setOpenDetails(false)}
            className="px-5 py-2.5 text-sm font-semibold text-white transition rounded-lg bg-slate-800 hover:bg-slate-700"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};

export default Details;