"use client";

import React, { useContext } from "react";
import { FaTimes, FaTrash, FaExclamationTriangle } from "react-icons/fa";
import { OwnerContext } from "../../../../../Providers/LawyerOwner/OwnerProvider.js";

const Delete = ({ selectTask }) => {
  const {
    openDeleteTask,
    setOpenDeleteTask,
    handleDeleteTaskFun,
    loadding,
  } = useContext(OwnerContext);

  if (!openDeleteTask || !selectTask) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-md overflow-hidden bg-white border shadow-2xl rounded-2xl border-[#E7EBF2]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-[#E7EBF2]">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#F8EDED] text-[#A04A4A]">
              <FaTrash />
            </div>

            <div>
              <h2 className="text-lg font-bold text-[#0B1C30]">
                حذف المهمة
              </h2>

              <p className="mt-1 text-xs text-[#45464D]">
                تأكيد حذف المهمة
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOpenDeleteTask(false)}
            disabled={loadding}
            className="flex items-center justify-center transition rounded-lg w-9 h-9 text-[#45464D] bg-[#F8F9FB] hover:bg-[#E7EBF2] disabled:opacity-50"
          >
            <FaTimes className="text-sm" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6">
          <div className="flex items-start gap-3 p-4 border rounded-xl border-[#E8D1D1] bg-[#F8EDED]">
            <FaExclamationTriangle className="mt-0.5 shrink-0 text-[#A04A4A]" />

            <div>
              <p className="text-sm font-semibold text-[#0B1C30]">
                هل أنت متأكد من حذف هذه المهمة؟
              </p>

              <p className="mt-2 text-xs leading-5 text-[#45464D]">
                سيتم حذف المهمة
                <span className="mx-1 font-semibold text-[#0B1C30]">
                  "{selectTask.title}"
                </span>
                نهائيًا ولا يمكن التراجع عن هذا الإجراء.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={() => setOpenDeleteTask(false)}
              disabled={loadding}
              className="px-5 py-2.5 text-sm font-semibold transition rounded-lg border border-[#E7EBF2] text-[#45464D] bg-white hover:bg-[#F8F9FB] disabled:opacity-50"
            >
              إلغاء
            </button>

            <button
              type="button"
              onClick={() => handleDeleteTaskFun(selectTask._id)}
              disabled={loadding}
              className="px-5 py-2.5 text-sm font-semibold text-white transition rounded-lg bg-[#A04A4A] hover:bg-[#8E3F3F] disabled:opacity-60"
            >
              {loadding ? "جاري الحذف..." : "حذف المهمة"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Delete;