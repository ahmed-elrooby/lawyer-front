
"use client";

import React, { useContext } from "react";
import { FaBell, FaTrash, FaTimes, FaExclamationTriangle } from "react-icons/fa";

import { AdminContext } from "../../../../../Providers/AdminContext/Admin.js";

const HandleDeleteNotification = ({ selectedNotification }) => {
  const {
    openDeleteNotification,
    setOpenDeleteNotification,
    handleDeleteNotificationFun,
  } = useContext(AdminContext);

  if (!openDeleteNotification) return null;




  return (
    <div
      dir="rtl"
      className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm"
      onClick={()=>{
        setOpenDeleteNotification(false)
      }}
    >
      <div
        className="w-full max-w-md overflow-hidden bg-white border shadow-2xl rounded-2xl border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 text-red-600 bg-red-50 rounded-xl">
              <FaTrash className="text-sm" />
            </div>

            <div>
              <h2 className="text-base font-bold text-slate-800">
                حذف الإشعار
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                تأكيد حذف الإشعار من القائمة
              </p>
            </div>
          </div>

          <button
            type="button"
 onClick={()=>{
        setOpenDeleteNotification(false)
      }}            className="flex items-center justify-center transition-colors w-9 h-9 text-slate-400 rounded-xl hover:bg-slate-100 hover:text-slate-600"
          >
            <FaTimes className="text-sm" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          <div className="flex gap-4 p-4 border border-amber-100 bg-amber-50/70 rounded-2xl">
            <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-amber-600 bg-amber-100 rounded-xl">
              <FaExclamationTriangle className="text-sm" />
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-800">
                هل أنت متأكد من حذف هذا الإشعار؟
              </h3>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                لن تتمكن من استعادة الإشعار بعد حذفه.
              </p>
            </div>
          </div>

          {/* Notification Preview */}
          {selectedNotification && (
            <div className="p-4 mt-4 border rounded-2xl border-slate-200 bg-slate-50">
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center flex-shrink-0 text-blue-600 bg-blue-100 w-9 h-9 rounded-xl">
                  <FaBell className="text-xs" />
                </div>

                <div className="min-w-0">
                  <h4 className="text-sm font-bold truncate text-slate-700">
                    {selectedNotification?.title || "إشعار"}
                  </h4>

                  <p className="mt-1 text-xs leading-5 text-slate-500 line-clamp-2">
                    {selectedNotification?.message ||
                      "لا يوجد وصف للإشعار"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-100 bg-slate-50/70">
          <button
            type="button"
 onClick={()=>{
        setOpenDeleteNotification(false)
      }}            className="px-5 py-2.5 text-xs font-bold transition-colors border text-slate-600 border-slate-200 bg-white rounded-xl hover:bg-slate-100"
          >
            إلغاء
          </button>

          <button
            type="button"
            onClick={()=>{
                handleDeleteNotificationFun(selectedNotification?._id)
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white transition-all bg-red-600 rounded-xl hover:bg-red-700 active:scale-[0.98]"
          >
            <FaTrash className="text-[10px]" />
            حذف الإشعار
          </button>
        </div>
      </div>
    </div>
  );
};

export default HandleDeleteNotification;
