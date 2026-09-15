
"use client";

import React, { useContext } from "react";
import {
  FaFolderOpen,
  FaThLarge,
  FaUpload,
  FaArrowLeft,
} from "react-icons/fa";
import { LawyerContext } from "../../../../../Providers/LawyerContext/lawyer.js";
import UploadFile from "./UploadFile.jsx";

const SubHeader = () => {
  const {openAddDocument, setOpenAddDocument}=useContext(LawyerContext)
  return <>
  {
    openAddDocument && <UploadFile />
  }
  
    <div className="relative px-6 py-5 mb-6 overflow-hidden border shadow-xl rounded-2xl border-slate-700/60 bg-slate-800/60 shadow-black/10">
      {/* Background Glow */}
      <div className="absolute w-40 h-40 rounded-full -right-20 -top-20 bg-blue-500/5 blur-3xl" />
      <div className="absolute w-40 h-40 rounded-full -bottom-20 -left-20 bg-indigo-500/5 blur-3xl" />

      <div className="relative z-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        {/* Title */}
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center text-blue-400 border h-14 w-14 shrink-0 rounded-2xl border-blue-500/20 bg-blue-500/10">
            <FaFolderOpen className="text-xl" />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold tracking-tight text-white">
                إدارة الملفات
              </h1>

              <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-2.5 py-1 text-[10px] font-semibold text-blue-400">
                الملفات
              </span>
            </div>

            <p className="text-sm text-slate-400">
              إدارة وتنظيم جميع ملفاتك ومستنداتك بسهولة
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-3">
        

          <button
            type="button"
            onClick={()=>{
              setOpenAddDocument(true)
            }}
            className="inline-flex items-center justify-center gap-3 px-5 py-3 text-sm font-semibold text-white transition-all duration-200 bg-blue-600 shadow-lg group rounded-xl shadow-blue-600/10 hover:bg-blue-500"
          >
            <span className="flex items-center justify-center rounded-lg h-7 w-7 bg-white/10">
              <FaUpload className="text-xs" />
            </span>

            رفع ملف جديد

            <FaArrowLeft className="text-[10px] opacity-50 transition-transform group-hover:-translate-x-0.5" />
          </button>
        </div>
      </div>
    </div>
 </>
};

export default SubHeader;
