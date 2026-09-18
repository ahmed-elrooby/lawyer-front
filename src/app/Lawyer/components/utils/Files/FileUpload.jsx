"use client";

import React, { useContext } from "react";
import {
  CloudUpload,
  FilePlus,
  FolderOpen,
  ArrowUp,
} from "lucide-react";

import { LawyerContext } from "../../../../../Providers/LawyerContext/lawyer.js";

const FileUpload = () => {
  const { setOpenAddDocument } = useContext(LawyerContext);

  const handleOpenUpload = () => {
    setOpenAddDocument(true);
  };

  return (
    <div className="relative p-6 overflow-hidden transition-all duration-300 border shadow-xl group rounded-3xl border-slate-700/60 bg-slate-900 hover:border-emerald-500/40 hover:shadow-emerald-500/5">

      {/* Background Glow */}
      <div className="absolute transition-all duration-500 rounded-full pointer-events-none -right-20 -top-20 h-52 w-52 bg-emerald-500/10 blur-3xl group-hover:bg-emerald-500/20" />

      <div className="absolute transition-all duration-500 rounded-full pointer-events-none -bottom-20 -left-20 h-52 w-52 bg-blue-500/10 blur-3xl group-hover:bg-blue-500/15" />

      <div className="relative z-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-white">
              إضافة مستند جديد
            </h3>

            <p className="mt-1 text-sm text-slate-400">
              أضف عقدًا أو وثيقة واحفظها في ملفات المكتب
            </p>
          </div>

          <div className="flex items-center justify-center border h-11 w-11 rounded-2xl border-emerald-500/20 bg-emerald-500/10">
            <FilePlus className="w-5 h-5 text-emerald-400" />
          </div>
        </div>

        {/* Upload Area */}
        <div
          onClick={handleOpenUpload}
          className="p-8 text-center transition-all duration-300 border border-dashed cursor-pointer rounded-2xl border-slate-700 bg-slate-800/40 hover:border-emerald-500/50 hover:bg-emerald-500/5"
        >

          {/* Icon */}
          <div className="relative flex items-center justify-center w-20 h-20 mx-auto mb-5">
            <div className="absolute inset-0 transition-all duration-500 rounded-full bg-emerald-500/10 blur-xl group-hover:bg-emerald-500/20" />

            <div className="relative flex items-center justify-center w-16 h-16 transition-transform duration-300 border rounded-2xl border-emerald-500/20 bg-emerald-500/10 group-hover:-translate-y-1">
              <CloudUpload className="w-8 h-8 text-emerald-400" />
            </div>
          </div>

          <h4 className="text-base font-semibold text-white">
            أضف مستنداتك بسهولة
          </h4>

          <p className="max-w-md mx-auto mt-2 text-sm leading-6 text-slate-400">
            ارفع العقود والمستندات والوثائق القانونية
            واحفظها للرجوع إليها أو طباعتها وقت الحاجة
          </p>

          {/* Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleOpenUpload();
            }}
            className="inline-flex items-center gap-2 px-5 py-3 mt-6 text-sm font-bold transition-all duration-300 shadow-lg rounded-xl bg-emerald-500 text-slate-950 shadow-emerald-500/10 hover:bg-emerald-400 hover:shadow-emerald-500/20 active:scale-95"
          >
            <ArrowUp className="w-4 h-4" />
            إضافة مستند
          </button>
        </div>

        {/* Supported Files */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-5">

          <div className="flex items-center gap-2 px-3 py-2 border rounded-lg border-slate-700/60 bg-slate-800/50">
            <FolderOpen className="w-4 h-4 text-slate-400" />

            <span className="text-xs text-slate-400">
              PDF
            </span>
          </div>

          <div className="px-3 py-2 text-xs border rounded-lg border-slate-700/60 bg-slate-800/50 text-slate-400">
            Word
          </div>

          <div className="px-3 py-2 text-xs border rounded-lg border-slate-700/60 bg-slate-800/50 text-slate-400">
            Excel
          </div>

          <div className="px-3 py-2 text-xs border rounded-lg border-slate-700/60 bg-slate-800/50 text-slate-400">
            صور
          </div>

          <div className="px-3 py-2 text-xs border rounded-lg border-slate-700/60 bg-slate-800/50 text-slate-400">
            حتى 10MB
          </div>

        </div>
      </div>
    </div>
  );
};

export default FileUpload;