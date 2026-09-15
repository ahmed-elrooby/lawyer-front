
"use client";

import React, { useContext } from "react";
import { FaTrash, FaTimes, FaExclamationTriangle } from "react-icons/fa";

import { LawyerContext } from "../../../../../Providers/LawyerContext/lawyer.js";

const DeleteNote = ({ selectNote }) => {
  const {
    handleDeleteNoteFun,
    openDeleteNote,
    setOpenDeleteNote,
  } = useContext(LawyerContext);

  if (!openDeleteNote) return null;



  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={() => setOpenDeleteNote(false)}
    >
      <div
        className="w-full max-w-md overflow-hidden border shadow-2xl rounded-2xl border-slate-700/50 bg-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-700/50">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-red-500/10">
              <FaTrash className="text-red-400" />
            </div>

            <div>
              <h2 className="text-base font-semibold text-white">
                حذف الملاحظة
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                تأكيد حذف الملاحظة
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOpenDeleteNote(false)}
            className="flex items-center justify-center transition rounded-lg h-9 w-9 text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <FaTimes />
          </button>
        </div>

        {/* Body */}
        <div className="p-5">
          <div className="flex items-start gap-3 p-4 mb-4 border rounded-xl border-amber-500/20 bg-amber-500/5">
            <FaExclamationTriangle className="mt-0.5 shrink-0 text-amber-400" />

            <p className="text-sm leading-6 text-slate-300">
              هل أنت متأكد أنك تريد حذف هذه الملاحظة؟ لا يمكن التراجع عن هذا
              الإجراء بعد الحذف.
            </p>
          </div>

          {selectNote?.content && (
            <div className="p-4 border rounded-xl border-slate-700/50 bg-slate-800/40">
              <p className="mb-2 text-xs font-medium text-slate-500">
                محتوى الملاحظة
              </p>

              <p className="text-sm leading-6 line-clamp-3 text-slate-200">
                {selectNote.content}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-5 py-4 border-t border-slate-700/50 bg-slate-950/30">
          <button
            type="button"
            onClick={() => setOpenDeleteNote(false)}
            className="rounded-xl border border-slate-700 bg-slate-800 px-5 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-slate-700 hover:text-white"
          >
            إلغاء
          </button>

          <button
            type="button"
            onClick={()=>{
                handleDeleteNoteFun(selectNote?._id)
            }}
            className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-700"
          >
            <FaTrash className="text-xs" />
            حذف الملاحظة
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteNote;
