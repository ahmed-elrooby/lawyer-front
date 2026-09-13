"use client";

import React, { useContext, useState } from "react";
import {
  FaTrash,
  FaTimes,
  FaExclamationTriangle,
} from "react-icons/fa";

import { AdminContext } from "../../../../../Providers/AdminContext/Admin.js";

const HandleDeleteFileCategory = ({ selectedCategory }) => {
  const {
    openDeleteCategory,
    setOpenDeleteCategory,
    handleDeleteCategoryFun,loadding
  } = useContext(AdminContext);


  if (!openDeleteCategory) return null;

 



  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm"
      onClick={() => setOpenDeleteCategory(false)}
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
                حذف تصنيف الملف
              </h2>

              <p className="mt-0.5 text-xs text-slate-400">
                تأكيد حذف التصنيف
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOpenDeleteCategory(false)}
            className="flex items-center justify-center transition-colors rounded-lg w-9 h-9 text-slate-400 hover:bg-slate-100 hover:text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
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
                هل أنت متأكد من حذف تصنيف الملف؟
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                سيتم حذف تصنيف الملف
                <span className="mx-1 font-bold text-slate-700">
                  "{selectedCategory?.name || "—"}"
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
            onClick={() => setOpenDeleteCategory(false)}
            className="px-5 py-2.5 text-sm font-semibold transition-colors border rounded-xl border-slate-200 text-slate-600 bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            إلغاء
          </button>

          <button
            type="button"
            onClick={()=>{
                handleDeleteCategoryFun(selectedCategory._id);
            }}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white transition-all bg-red-500 shadow-lg rounded-xl shadow-red-500/20 hover:bg-red-600 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
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