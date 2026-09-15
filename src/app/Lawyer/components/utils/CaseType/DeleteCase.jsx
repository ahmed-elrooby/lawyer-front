"use client";

import React, { useContext, useState } from "react";
import {
  FaTrash,
  FaTimes,
  FaExclamationTriangle,
} from "react-icons/fa";

import { LawyerContext } from "../../../../../Providers/LawyerContext/lawyer.js";

const DeleteCase = ({ selectCaseType }) => {
  const {
    handleDeleteCaseTypeFun,
    openDeleteCaseType,
    setOpenDeleteCaseType,
    loadding
  } = useContext(LawyerContext);


  if (!openDeleteCaseType) return null;

  const handleClose = () => {
   

    setOpenDeleteCaseType(false);
  };

  

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-md overflow-hidden border shadow-2xl rounded-2xl border-slate-700 bg-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center text-red-400 rounded-xl w-11 h-11 bg-red-500/10">
              <FaTrash className="text-base" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-white">
                حذف نوع القضية
              </h2>

              <p className="mt-0.5 text-xs text-slate-500">
                تأكيد حذف البيانات
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="flex items-center justify-center transition-colors rounded-lg w-9 h-9 text-slate-500 hover:bg-slate-700 hover:text-slate-200 disabled:opacity-50"
          >
            <FaTimes className="text-sm" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          <div className="flex items-start gap-4 p-4 border rounded-xl border-amber-500/20 bg-amber-500/10">
            <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-lg text-amber-400 bg-amber-500/10">
              <FaExclamationTriangle className="text-sm" />
            </div>

            <div>
              <p className="text-sm font-semibold leading-6 text-slate-200">
                هل أنت متأكد من حذف نوع القضية؟
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-400">
                سيتم حذف نوع القضية

                <span className="mx-1 font-bold text-slate-200">
                  "{selectCaseType?.name || "—"}"
                </span>

                ولا يمكن التراجع عن هذا الإجراء.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-700 bg-slate-900/40">
          <button
            type="button"
            onClick={handleClose}
            className="px-5 py-2.5 text-sm font-semibold transition-colors border rounded-xl border-slate-700 text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white disabled:opacity-50"
          >
            إلغاء
          </button>

          <button
            type="button"
            onClick={()=>{
              handleDeleteCaseTypeFun(selectCaseType?._id)
            }}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white transition-all bg-red-600 shadow-lg rounded-xl shadow-red-600/20 hover:bg-red-500 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            <FaTrash className="text-xs" />

            {loadding ? "جاري الحذف..." : "تأكيد الحذف"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCase;