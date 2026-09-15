
"use client";

import React, { useContext } from "react";
import {
  FaGavel,
  FaPlus,
  FaArrowLeft,
} from "react-icons/fa";
import { LawyerContext } from "../../../../../Providers/LawyerContext/lawyer.js";
import AddCase from "./AddCase.jsx";

const Header = () => {
  const { 
        openAddCase,
        setOpenAddCase,}=useContext(LawyerContext)
  return<>
{
  openAddCase && <AddCase/>
}
 <div className="relative px-6 py-5 mb-6 overflow-hidden border shadow-xl rounded-2xl border-slate-700/70 bg-slate-800/70 shadow-black/10">
      {/* Background Decoration */}
      <div className="absolute w-40 h-40 rounded-full -top-20 -right-20 bg-emerald-500/5 blur-3xl" />
      <div className="absolute w-40 h-40 rounded-full -bottom-20 -left-20 bg-emerald-500/5 blur-3xl" />

      <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        {/* Title Section */}
        <div className="flex items-center gap-4">
          {/* Icon */}
          <div className="flex items-center justify-center border shadow-lg h-14 w-14 shrink-0 rounded-2xl border-emerald-500/20 bg-emerald-500/10 text-emerald-400 shadow-emerald-500/5">
            <FaGavel className="text-xl" />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold tracking-tight text-white">
                القضايا
              </h1>

              <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-400">
                إدارة القضايا
              </span>
            </div>

            <p className="text-sm text-slate-400">
              إدارة ومتابعة القضايا والجلسات الخاصة بك
            </p>
          </div>
        </div>

      
    
<button
  type="button"
  onClick={()=>{setOpenAddCase(true)}}
  className="inline-flex items-center justify-center gap-3 px-5 py-3 text-sm font-semibold text-white transition-colors duration-200 shadow-lg group rounded-xl bg-emerald-600 shadow-emerald-600/20 hover:bg-emerald-500"
>
  <span className="flex items-center justify-center rounded-lg h-7 w-7 bg-white/10">
    <FaPlus className="text-xs" />
  </span>

  إضافة قضية

  <FaArrowLeft className="text-[10px] opacity-60" />
</button>


      </div>
    </div>

  </>
   
};

export default Header;

