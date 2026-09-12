"use client";

import React, { useContext } from "react";
import {
  FaExclamationTriangle,
  FaTrash,
  FaTimes,
  FaUserTie,
} from "react-icons/fa";

import { AdminContext } from "../../../../../Providers/AdminContext/Admin.js";

const DeleteLaywer = ({ lawyer }) => {
  const { handleDeleteLawyerFun, openDeleteLawyer, setOpenDeleteLawyer } =
    useContext(AdminContext);
  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
      onClick={() => setOpenDeleteLawyer(false)}
    >
      <div
        className="relative w-full max-w-md overflow-hidden bg-white border shadow-2xl rounded-3xl border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Glow */}
        <div className="absolute top-0 h-32 -translate-x-1/2 rounded-full left-1/2 w-72 bg-red-500/10 blur-3xl" />

        {/* Close */}
        <button
          type="button"
          onClick={() => setOpenDeleteLawyer(false)}
          className="absolute z-10 flex items-center justify-center transition left-4 top-4 h-9 w-9 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700"
        >
          <FaTimes className="text-sm" />
        </button>

        <div className="relative p-7">
          {/* Warning Icon */}
          <div className="flex justify-center">
            <div className="flex items-center justify-center w-16 h-16 text-red-500 shadow-sm rounded-2xl bg-red-50">
              <FaExclamationTriangle className="text-2xl" />
            </div>
          </div>

          {/* Title */}
          <div className="mt-5 text-center">
            <h2 className="text-xl font-extrabold text-slate-800">
              حذف المحامي
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              هل أنت متأكد أنك تريد حذف هذا المحامي؟
              <br />
              هذا الإجراء لا يمكن التراجع عنه.
            </p>
          </div>

          {/* Lawyer Info */}
          <div className="flex items-center gap-3 p-4 mt-6 border rounded-2xl border-slate-100 bg-slate-50">
            <div className="flex items-center justify-center w-12 h-12 overflow-hidden text-blue-600 bg-blue-100 shrink-0 rounded-xl">
              {lawyer?.profileImage?.url ? (
                <img
                  src={lawyer.profileImage.url}
                  alt={lawyer?.name || "المحامي"}
                  className="object-cover w-full h-full"
                />
              ) : (
                <FaUserTie className="text-lg" />
              )}
            </div>

            <div className="min-w-0">
              <p className="text-sm font-bold truncate text-slate-800">
                {lawyer?.name || "اسم المحامي غير متوفر"}
              </p>

              <p className="mt-1 text-xs truncate text-slate-400">
                {lawyer?.email || "لا يوجد بريد إلكتروني"}
              </p>
            </div>
          </div>

          {/* Warning */}
          <div className="px-4 py-3 mt-4 border border-red-100 rounded-xl bg-red-50">
            <p className="text-xs font-medium leading-5 text-red-600">
              ⚠️ سيتم حذف بيانات المحامي نهائيًا من النظام.
            </p>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-3 mt-6">
            <button
              type="button"
              onClick={() => setOpenDeleteLawyer(false)}
              className="text-sm font-bold transition bg-white border h-11 rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50"
            >
              إلغاء
            </button>

            <button
              type="button"
              onClick={() => {
                handleDeleteLawyerFun(lawyer?._id);
              }}
              className="flex items-center justify-center gap-2 text-sm font-bold text-white transition bg-red-500 shadow-lg h-11 rounded-xl shadow-red-500/20 hover:bg-red-600"
            >
              <FaTrash className="text-xs" />
              حذف المحامي
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteLaywer;
