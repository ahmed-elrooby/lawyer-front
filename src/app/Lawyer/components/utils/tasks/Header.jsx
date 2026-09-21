"use client";

import React from "react";
import { FaTasks } from "react-icons/fa";

const SubHeader = () => {
  return (
    <div className="relative px-6 py-5 mb-6 overflow-hidden border shadow-xl rounded-2xl border-slate-800 bg-slate-900/60 shadow-black/10">
      <div className="absolute w-40 h-40 rounded-full -right-20 -top-20 bg-emerald-500/5 blur-3xl" />
      <div className="absolute w-40 h-40 rounded-full -bottom-20 -left-20 bg-emerald-500/5 blur-3xl" />

      <div className="relative z-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center border h-14 w-14 shrink-0 rounded-2xl border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
            <FaTasks className="text-xl" />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold tracking-tight text-white">
                المهام
              </h1>

              <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-400">
                مهام المكتب
              </span>
            </div>

            <p className="text-sm text-slate-400">
              تابع المهام والتعليمات الموكلة إليك من إدارة المكتب
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubHeader;