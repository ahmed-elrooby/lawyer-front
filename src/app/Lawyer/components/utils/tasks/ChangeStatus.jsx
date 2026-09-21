"use client";

import React, { useContext } from "react";
import {
  FaTimes,
  FaExchangeAlt,
  FaClock,
  FaSpinner,
  FaCheckCircle,
} from "react-icons/fa";
import { LawyerContext } from "../../../../../Providers/LawyerContext/lawyer.js";

const ChangeStatus = ({ selectTask }) => {
  const {
    handleChangeStatusFun,
    loadding,
    openChange,
    setOpenChange,
  } = useContext(LawyerContext);

  const statuses = [
    {
      value: "todo",
      label: "لم تبدأ",
      description: "لم يتم البدء في تنفيذ المهمة",
      icon: FaClock,
      style: "text-slate-300 bg-slate-800 border-slate-700",
      activeStyle:
        "border-slate-500 bg-slate-800 ring-2 ring-slate-500/20",
    },
    {
      value: "in_progress",
      label: "قيد التنفيذ",
      description: "المهمة قيد التنفيذ حاليًا",
      icon: FaSpinner,
      style: "text-blue-400 bg-blue-500/10 border-blue-500/20",
      activeStyle:
        "border-blue-500/50 bg-blue-500/10 ring-2 ring-blue-500/10",
    },
    {
      value: "completed",
      label: "مكتملة",
      description: "تم الانتهاء من تنفيذ المهمة",
      icon: FaCheckCircle,
      style:
        "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      activeStyle:
        "border-emerald-500/50 bg-emerald-500/10 ring-2 ring-emerald-500/10",
    },
  ];

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
                اختر الحالة الحالية للمهمة
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
              المهمة الحالية
            </p>

            <p className="mt-1 text-sm font-semibold leading-6 text-white">
              {selectTask.title}
            </p>
          </div>

          <div className="space-y-3">
            {statuses.map((status) => {
              const Icon = status.icon;
              const isActive = selectTask.status === status.value;

              return (
                <button
                  key={status.value}
                  type="button"
                  disabled={loadding}
                  onClick={() => handleSubmit(status.value)}
                  className={`flex items-center w-full gap-4 p-4 text-right transition border rounded-xl ${
                    isActive
                      ? status.activeStyle
                      : "border-slate-800 bg-slate-950/20 hover:bg-slate-800/70 hover:border-slate-700"
                  } disabled:opacity-50`}
                >
                  <div
                    className={`flex items-center justify-center flex-shrink-0 w-11 h-11 border rounded-xl ${status.style}`}
                  >
                    <Icon className="text-base" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-white">
                        {status.label}
                      </span>

                      {isActive && (
                        <span className="px-2 py-0.5 text-[10px] font-semibold text-emerald-400 border rounded-full border-emerald-500/20 bg-emerald-500/10">
                          الحالية
                        </span>
                      )}
                    </div>

                    <p className="mt-1 text-xs text-slate-500">
                      {status.description}
                    </p>
                  </div>

                  <div
                    className={`flex items-center justify-center flex-shrink-0 w-5 h-5 border rounded-full ${
                      isActive
                        ? "border-emerald-400 bg-emerald-400"
                        : "border-slate-600 bg-transparent"
                    }`}
                  >
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-slate-900" />
                    )}
                  </div>
                </button>
              );
            })}
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