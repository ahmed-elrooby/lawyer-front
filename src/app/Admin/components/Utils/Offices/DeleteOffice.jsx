"use client";

import React, { useContext, useState } from "react";
import {
  FaTrash,
  FaExclamationTriangle,
  FaTimes,
  FaBuilding,
  FaSpinner,
} from "react-icons/fa";

import { AdminContext } from "../../../../../Providers/AdminContext/Admin.js";

const DeleteOffice = ({ office }) => {
  const { openDeleteOffice, setOpenDeleteOffice, handleDeleteOfficeFun } =
    useContext(AdminContext);

  const [loading, setLoading] = useState(false);

  if (!openDeleteOffice) return null;

  const handleClose = () => {
    if (loading) return;
    setOpenDeleteOffice(false);
  };

  const handleDelete = async () => {
    if (!office?._id) return;

    try {
      setLoading(true);

      await handleDeleteOfficeFun(office._id);

      setOpenDeleteOffice(false);
    } catch (error) {
      console.error("Delete Office Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/50 px-4 py-6 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
    >
      <div
        dir="rtl"
        className="relative w-full max-w-md overflow-hidden bg-white border border-gray-200 shadow-2xl rounded-3xl"
      >
        {/* Top Line */}
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-red-500 via-rose-500 to-red-400" />

        {/* Close */}
        <button
          type="button"
          onClick={handleClose}
          disabled={loading}
          className="absolute flex items-center justify-center text-gray-400 transition-all bg-gray-100 left-5 top-5 h-9 w-9 rounded-xl hover:bg-gray-200 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <FaTimes className="text-xs" />
        </button>

        <div className="p-6 sm:p-7">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-red-50">
              <div className="absolute border border-red-100 rounded-full inset-2" />

              <div className="flex items-center justify-center text-red-500 bg-red-100 shadow-sm h-14 w-14 rounded-2xl">
                <FaTrash className="text-xl" />
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="mt-5 text-center">
            <h2 className="text-xl font-bold text-gray-800">حذف المكتب</h2>

            <p className="max-w-sm mx-auto mt-2 text-sm leading-6 text-gray-500">
              هل أنت متأكد أنك تريد حذف هذا المكتب؟
              <br />
              لا يمكن التراجع عن هذا الإجراء بعد إتمامه.
            </p>
          </div>

          {/* Office Info */}
          <div className="p-4 mt-6 border border-gray-200 rounded-2xl bg-gray-50/70">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center text-blue-600 bg-white shadow-sm h-11 w-11 shrink-0 rounded-xl ring-1 ring-gray-100">
                <FaBuilding />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-medium text-gray-400">
                  المكتب المحدد
                </p>

                <h3 className="mt-1 text-sm font-bold text-gray-800 truncate">
                  {office?.name || "مكتب بدون اسم"}
                </h3>

                <div className="mt-1 flex items-center gap-2 text-[11px] text-gray-400">
                  {office?.city && <span>{office.city}</span>}

                  {office?.phone && (
                    <>
                      <span>•</span>
                      <span dir="ltr">{office.phone}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Warning */}
          <div className="mt-4 flex items-start gap-3 rounded-2xl border border-amber-100 bg-amber-50 p-3.5">
            <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-amber-500 shadow-sm">
              <FaExclamationTriangle className="text-xs" />
            </div>

            <div>
              <p className="text-xs font-bold text-amber-700">تنبيه</p>

              <p className="mt-1 text-[11px] leading-5 text-amber-600">
                سيتم حذف بيانات المكتب نهائيًا من النظام، وقد لا يمكن استعادتها
                بعد تنفيذ العملية.
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex flex-col-reverse gap-2.5 sm:flex-row">
            {/* Cancel */}
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="flex items-center justify-center flex-1 h-12 text-sm font-bold text-gray-600 transition-all bg-white border border-gray-200 rounded-xl hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              إلغاء
            </button>

            {/* Delete */}
            <button
              type="button"
              onClick={handleDelete}
              disabled={loading || !office?._id}
              className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 text-sm font-bold text-white shadow-lg shadow-red-500/20 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-red-500/25 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  جاري الحذف...
                </>
              ) : (
                <>
                  <FaTrash className="text-xs" />
                  نعم، حذف المكتب
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteOffice;
