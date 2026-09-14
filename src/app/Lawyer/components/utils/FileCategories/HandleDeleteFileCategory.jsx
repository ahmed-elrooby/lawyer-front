"use client";

import React, { useContext } from "react";
import {
  FaTrash,
  FaTimes,
  FaExclamationTriangle,
} from "react-icons/fa";

import { LawyerContext } from "../../../../../Providers/LawyerContext/lawyer.js";

const HandleDeleteFileCategory = ({ selectedCategory }) => {
  const {
    openDeleteCategory,
    setOpenDeleteCategory,
    handleDeleteCategoryFun,
    loadding,
  } = useContext(LawyerContext);

  if (!openDeleteCategory) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4  bg-slate-950/80 backdrop-blur-sm"
      onClick={() => !loadding && setOpenDeleteCategory(false)}
    >
      <div
        className="w-full max-w-md overflow-hidden border shadow-2xl  bg-slate-900 border-slate-700/60 shadow-black/30 rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-700/60">
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center text-red-400 border  w-11 h-11 rounded-xl bg-red-500/10 border-red-500/20"
            >
              <FaTrash className="text-base" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-white">
                حذف تصنيف الملف
              </h2>

              <p className="mt-0.5 text-xs text-slate-500">
                تأكيد حذف التصنيف
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOpenDeleteCategory(false)}
            disabled={loadding}
            className="flex items-center justify-center transition-colors rounded-lg  w-9 h-9 text-slate-400 hover:bg-slate-800 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaTimes className="text-sm" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          <div
            className="flex items-start gap-4 p-4 border  rounded-2xl border-amber-500/20 bg-amber-500/5"
          >
            <div
              className="flex items-center justify-center flex-shrink-0 w-10 h-10 border  rounded-xl bg-amber-500/10 border-amber-500/20 text-amber-400"
            >
              <FaExclamationTriangle className="text-sm" />
            </div>

            <div>
              <p className="text-sm font-semibold leading-6 text-slate-200">
                هل أنت متأكد من حذف تصنيف الملف؟
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-400">
                سيتم حذف تصنيف الملف
                <span className="mx-1 font-bold text-white">
                  "{selectedCategory?.name || "—"}"
                </span>
                ولا يمكن التراجع عن هذا الإجراء.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-end gap-3 px-6 py-4 border-t  border-slate-700/60 bg-slate-800/40"
        >
          {/* Cancel */}
          <button
            type="button"
            onClick={() => setOpenDeleteCategory(false)}
            disabled={loadding}
            className="
              px-5 py-2.5
              text-sm font-semibold
              rounded-xl
              border border-slate-700
              bg-slate-800
              text-slate-300
              transition-all duration-200
              hover:bg-slate-700
              hover:text-white
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            إلغاء
          </button>

          {/* Delete */}
          <button
            type="button"
            disabled={loadding}
            onClick={() => {
              handleDeleteCategoryFun(selectedCategory?._id);
            }}
            className="
              inline-flex items-center justify-center
              gap-2
              px-5 py-2.5
              text-sm font-semibold
              text-white
              rounded-xl
              bg-red-500
              shadow-lg shadow-red-500/20
              transition-all duration-200
              hover:bg-red-600
              hover:-translate-y-0.5
              active:translate-y-0
              disabled:opacity-60
              disabled:cursor-not-allowed
              disabled:hover:translate-y-0
            "
          >
            <FaTrash className="text-xs" />

            {loadding ? "جاري الحذف..." : "تأكيد الحذف"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HandleDeleteFileCategory;