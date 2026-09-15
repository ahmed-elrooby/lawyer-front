
"use client";

import React, { useContext } from "react";
import { FaExclamationTriangle, FaTimes, FaTrash } from "react-icons/fa";

import { LawyerContext } from "../../../../../Providers/LawyerContext/lawyer.js";

const DeleteSession = ({ selectSession }) => {
  const {
    handleDeleteSessionFun,
    openDeleteSession,
    setOpenDeleteSession,
    loadding,
  } = useContext(LawyerContext);

  if (!openDeleteSession || !selectSession) return null;



  return (
    <div
    
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={() => setOpenDeleteSession(false)}
    >
      <div
        className="w-full max-w-md border shadow-2xl rounded-2xl border-slate-700/50 bg-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-700/50">
          <h2 className="text-lg font-bold text-white">
            حذف الجلسة
          </h2>

          <button
            type="button"
            onClick={() => setOpenDeleteSession(false)}
            disabled={loadding}
            className="flex items-center justify-center transition rounded-lg h-9 w-9 bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            <FaTimes />
          </button>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center justify-center w-16 h-16 text-red-400 rounded-full bg-red-500/10">
              <FaExclamationTriangle className="text-2xl" />
            </div>

            <h3 className="mt-4 text-lg font-bold text-white">
              هل أنت متأكد من حذف الجلسة؟
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              سيتم حذف الجلسة نهائيًا، ولا يمكن التراجع عن هذا الإجراء.
            </p>

            {selectSession?.title && (
              <div className="w-full p-3 mt-4 border rounded-xl border-slate-700/50 bg-slate-800/50">
                <p className="text-xs text-slate-500">
                  الجلسة
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-200">
                  {selectSession.title}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-5 py-4 border-t border-slate-700/50">
          <button
            type="button"
            onClick={() => setOpenDeleteSession(false)}
            disabled={loadding}
            className="flex-1 px-4 py-3 text-sm font-medium transition rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            إلغاء
          </button>

          <button
            type="button"
            onClick={()=>{
                handleDeleteSessionFun(selectSession?._id)
            }}
            disabled={loadding}
            className="flex items-center justify-center flex-1 gap-2 px-4 py-3 text-sm font-semibold text-white transition bg-red-600 rounded-xl hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <FaTrash />

            {loadding ? "جاري الحذف..." : "حذف الجلسة"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteSession;
