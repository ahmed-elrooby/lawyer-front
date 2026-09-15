
"use client";

import React, { useContext } from "react";
import { FaExclamationTriangle, FaTrash, FaTimes } from "react-icons/fa";
import { LawyerContext } from "../../../../../Providers/LawyerContext/lawyer.js";

const DeleteFile = ({ selectFile }) => {
  const {
    handleDeleteDocumentFun,
    openDeleteDocument,
    setOpenDeleteDocument,
  } = useContext(LawyerContext);

  if (!openDeleteDocument) return null;

  
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 px-4 backdrop-blur-sm"
    >
      <div className="w-full max-w-md overflow-hidden border shadow-2xl rounded-2xl border-slate-700 bg-slate-900">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 text-red-400 rounded-xl bg-red-500/10">
              <FaTrash />
            </div>

            <div>
              <h2 className="text-base font-bold text-white">
                حذف الملف
              </h2>

              <p className="mt-0.5 text-xs text-slate-400">
                تأكيد حذف المستند
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOpenDeleteDocument(false)}
            className="p-2 transition rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <FaTimes />
          </button>
        </div>

        {/* Content */}
        <div className="px-5 py-6">
          <div className="flex justify-center mb-5">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-500/10">
              <FaExclamationTriangle className="text-2xl text-red-400" />
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-lg font-bold text-white">
              هل أنت متأكد من حذف هذا الملف؟
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              سيتم حذف الملف نهائيًا ولا يمكن استرجاعه بعد ذلك.
            </p>

            {selectFile?.name && (
              <div className="px-4 py-3 mt-4 border rounded-xl border-slate-700 bg-slate-800/50">
                <p className="text-sm font-semibold truncate text-slate-200">
                  {selectFile.name}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-5 py-4 border-t border-slate-800 bg-slate-950/30">
          <button
            type="button"
            onClick={() => setOpenDeleteDocument(false)}
            className="flex-1 rounded-xl border border-slate-700 px-4 py-2.5 text-sm font-semibold text-slate-300 transition hover:bg-slate-800 hover:text-white"
          >
            إلغاء
          </button>

          <button
            type="button"
            onClick={()=>{
                handleDeleteDocumentFun(selectFile?._id)
            }}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600"
          >
            <FaTrash className="text-xs" />
            حذف الملف
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteFile;
