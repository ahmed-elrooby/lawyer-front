"use client";

import React, { useContext } from "react";
import {
  FaTimes,
  FaExchangeAlt,
} from "react-icons/fa";
import { LawyerContext } from "../../../../../Providers/LawyerContext/lawyer.js";

const ChangeStatus = ({ selectTask }) => {
  const { handleChangeStatusFun, loadding,openChange, setOpenChange } =
    useContext(LawyerContext);


const handleSubmit = (status) => {
  if (status === selectTask.status) {
    setOpenChange(false);
    return;
  }

  handleChangeStatusFun({
    id: selectTask._id,
    status,
  });

  setOpenChange(false);
};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-sm sm:p-4">
      <div className="w-full max-w-md overflow-hidden border shadow-2xl rounded-2xl border-slate-800 bg-slate-900">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 border rounded-xl border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
              <FaExchangeAlt />
            </div>

            <div>
              <h2 className="text-base font-bold text-white">
                تغيير حالة المهمة
              </h2>
              <p className="mt-1 text-[11px] text-slate-500">
                اختر الحالة الجديدة للمهمة
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOpenChange(false)}
            className="flex items-center justify-center transition rounded-lg w-9 h-9 text-slate-400 bg-slate-800 hover:bg-slate-700 hover:text-white"
          >
            <FaTimes className="text-sm" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="p-4 mb-5 border rounded-xl border-slate-800 bg-slate-950/30">
            <p className="text-xs text-slate-500">
              المهمة
            </p>

            <p className="mt-1 text-sm font-semibold text-white">
              {selectTask.title}
            </p>
          </div>

          <div className="space-y-3">
            <button
              type="button"
              disabled={loadding}
              onClick={() => handleSubmit("todo")}
              className="flex items-center justify-between w-full px-4 py-3 text-sm font-semibold transition border rounded-xl border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-50"
            >
              <span>لم تبدأ</span>

              {selectTask.status === "todo" && (
                <span className="text-xs text-emerald-400">
                  الحالة الحالية
                </span>
              )}
            </button>

            <button
              type="button"
              disabled={loadding}
              onClick={() => handleSubmit("in_progress")}
              className="flex items-center justify-between w-full px-4 py-3 text-sm font-semibold text-blue-400 transition border rounded-xl border-blue-500/20 bg-blue-500/10 hover:bg-blue-500/20 disabled:opacity-50"
            >
              <span>قيد التنفيذ</span>

              {selectTask.status === "in_progress" && (
                <span className="text-xs text-emerald-400">
                  الحالة الحالية
                </span>
              )}
            </button>

            <button
              type="button"
              disabled={loadding}
              onClick={() => handleSubmit("completed")}
              className="flex items-center justify-between w-full px-4 py-3 text-sm font-semibold transition border rounded-xl border-emerald-500/20 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 disabled:opacity-50"
            >
              <span>مكتملة</span>

              {selectTask.status === "completed" && (
                <span className="text-xs text-emerald-400">
                  الحالة الحالية
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end px-5 py-4 border-t border-slate-800">
          <button
            type="button"
            onClick={() => setOpenChange(false)}
            className="px-5 py-2.5 text-sm font-semibold text-white transition rounded-lg bg-slate-800 hover:bg-slate-700"
          >
            إلغاء
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeStatus;