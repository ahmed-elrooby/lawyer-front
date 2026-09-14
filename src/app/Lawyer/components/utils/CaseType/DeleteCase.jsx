"use client";

import React, { useContext, useState } from "react";
import { FaTrash, FaTimes, FaExclamationTriangle } from "react-icons/fa";

import { LawyerContext } from "../../../../../Providers/LawyerContext/lawyer.js";

const DeleteCase = ({ selectCaseType }) => {
  const { handleDeleteCaseTypeFun,openDeleteCaseType, setOpenDeleteCaseType} =
    useContext(LawyerContext);

  const [isDeleting, setIsDeleting] = useState(false);

  if (!openDeleteCaseType) return null;

  const handleClose = () => {
    if (isDeleting) return;

    setOpenDeleteCaseType(false);
  };

  const handleDelete = async () => {
    if (!selectCaseType?._id || isDeleting) return;

    try {
      setIsDeleting(true);

      await handleDeleteCaseTypeFun(selectCaseType._id);

      setOpenDeleteCaseType(false);
    } catch (error) {
      // Context مسؤول عن عرض الخطأ
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-md overflow-hidden bg-white shadow-2xl rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center text-red-500 w-11 h-11 rounded-xl bg-red-50">
              <FaTrash className="text-base" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-800">
                حذف نوع القضية
              </h2>

              <p className="mt-0.5 text-xs text-slate-400">
                تأكيد حذف البيانات
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={isDeleting}
            className="flex items-center justify-center transition-colors rounded-lg w-9 h-9 text-slate-400 hover:bg-slate-100 hover:text-slate-600 disabled:opacity-50"
          >
            <FaTimes className="text-sm" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          <div className="flex items-start gap-4 p-4 border rounded-2xl border-amber-100 bg-amber-50/70">
            <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-amber-600 rounded-xl bg-amber-100">
              <FaExclamationTriangle className="text-sm" />
            </div>

            <div>
              <p className="text-sm font-semibold leading-6 text-slate-700">
                هل أنت متأكد من حذف نوع القضية؟
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                سيتم حذف نوع القضية
                <span className="mx-1 font-bold text-slate-700">
                  "{selectCaseType?.name || "—"}"
                </span>
                ولا يمكن التراجع عن هذا الإجراء.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-100 bg-slate-50/50">
          <button
            type="button"
            onClick={handleClose}
            disabled={isDeleting}
            className="px-5 py-2.5 text-sm font-semibold transition-colors border rounded-xl border-slate-200 text-slate-600 bg-white hover:bg-slate-50 disabled:opacity-50"
          >
            إلغاء
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white transition-all bg-red-500 shadow-lg rounded-xl shadow-red-500/20 hover:bg-red-600 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            <FaTrash className="text-xs" />

            {isDeleting ? "جاري الحذف..." : "تأكيد الحذف"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCase;
