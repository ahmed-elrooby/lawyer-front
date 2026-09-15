"use client";

import React, { useContext } from "react";
import {
  FaTimes,
  FaTrash,
  FaExclamationTriangle,
} from "react-icons/fa";

import { LawyerContext } from "../../../../../Providers/LawyerContext/lawyer.js";

const DeleteCase = ({ selectCase }) => {
  const {
    handleDeleteCaseFun,
    openDeleteCase,
    setOpenDeleteCase,
    loadding,
  } = useContext(LawyerContext);

  if (!openDeleteCase || !selectCase) {
    return null;
  }

  const handleDelete = async () => {
    try {
      await handleDeleteCaseFun(selectCase._id);

      setOpenDeleteCase(false);
    } catch (error) {
      // الـ Context مسؤول عن التعامل مع الخطأ
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={() => setOpenDeleteCase(false)}
    >
      <div
        className="w-full max-w-md overflow-hidden border shadow-2xl rounded-2xl border-slate-700/70 bg-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-700/60">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 text-red-400 rounded-xl bg-red-500/10">
              <FaTrash className="text-sm" />
            </div>

            <div>
              <h2 className="text-base font-bold text-white">
                حذف القضية
              </h2>

              <p className="mt-0.5 text-xs text-slate-500">
                تأكيد حذف القضية
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOpenDeleteCase(false)}
            disabled={loadding}
            className="flex items-center justify-center w-8 h-8 transition-colors rounded-lg text-slate-500 hover:bg-slate-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            <FaTimes className="text-xs" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="p-4 border rounded-xl border-slate-700/60 bg-slate-800/30">
            <div className="flex gap-3">
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400">
                <FaExclamationTriangle className="text-xs" />
              </div>

              <div>
                <p className="text-sm font-medium text-slate-200">
                  هل أنت متأكد من حذف هذه القضية؟
                </p>

                <p className="mt-1.5 text-xs leading-6 text-slate-500">
                  سيتم حذف القضية نهائيًا ولا يمكن التراجع عن
                  هذا الإجراء.
                </p>
              </div>
            </div>
          </div>

          {/* Case Info */}
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between rounded-lg bg-slate-800/30 px-3 py-2.5">
              <span className="text-xs text-slate-500">
                رقم القضية
              </span>

              <span className="text-xs font-semibold text-slate-300">
                {selectCase.caseNumber || "—"}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4 rounded-lg bg-slate-800/30 px-3 py-2.5">
              <span className="text-xs shrink-0 text-slate-500">
                اسم القضية
              </span>

              <span className="text-xs font-semibold truncate text-slate-300">
                {selectCase.title || "—"}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-5 py-4 border-t border-slate-700/60 bg-slate-900">
          <button
            type="button"
            onClick={() => setOpenDeleteCase(false)}
            disabled={loadding}
            className="rounded-xl border border-slate-700/70 px-5 py-2.5 text-sm font-medium text-slate-400 transition-colors hover:bg-slate-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            إلغاء
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={loadding}
            className="inline-flex min-w-[110px] items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loadding ? (
              <>
                <span className="w-4 h-4 border-2 rounded-full animate-spin border-white/30 border-t-white" />
                جاري الحذف...
              </>
            ) : (
              <>
                <FaTrash className="text-xs" />
                حذف القضية
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCase;
