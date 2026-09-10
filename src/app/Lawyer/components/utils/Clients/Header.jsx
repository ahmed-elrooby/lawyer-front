"use client";

import React from "react";
import { Users, Search, Upload, Plus, Bell } from "lucide-react";

const Header = () => {
  return (
    <div className="relative mb-8 overflow-hidden transition-all duration-500 border group rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-sm border-slate-700/50">
      {/* Animated gradient background on hover */}
      <div className="absolute inset-0 transition-all duration-700 bg-gradient-to-br from-emerald-600/0 via-teal-600/0 to-blue-600/0 rounded-2xl" />

      {/* Glass reflection effect */}
      <div className="absolute transition-all duration-1000 transform -skew-x-12 opacity-0 -inset-full bg-gradient-to-r from-white/0 via-white/20 to-white/0" />

      <div className="relative z-10 p-5 md:p-6">
        <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
          {/* Left section: Title & subtitle */}
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 backdrop-blur-sm shadow-lg border border-white/10">
              <Users className="h-7 w-7 text-emerald-400 drop-shadow-md" />
            </div>
            <div>
              <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-white md:text-3xl">
                العملاء
                <span className="text-xs font-medium text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-full">إدارة متقدمة</span>
              </h1>
              <p className="text-slate-300 text-sm mt-0.5 opacity-80 group-hover:opacity-100 transition-opacity">
                إدارة العملاء والقضايا والجلسات الخاصة بهم
              </p>
            </div>
          </div>

          {/* Right section: Search & actions */}
          <div className="flex flex-wrap items-center w-full gap-3 md:w-auto">
            {/* Search input with glass effect */}
            <div className="relative flex-1 md:w-80">
              <Search className="absolute w-4 h-4 transition-colors -translate-y-1/2 right-3 top-1/2 text-slate-400 group-hover:text-emerald-400" />
              <input
                type="text"
                id="globalSearch"
                placeholder="ابحث بالاسم أو رقم الهاتف..."
                className="w-full pr-10 pl-4 py-2.5 bg-slate-800/60 border border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500/50 focus:outline-none text-sm text-white placeholder:text-slate-400 transition-all duration-300 hover:bg-slate-800/80 hover:border-emerald-500/30"
              />
              {/* Subtle focus glow */}
              <div className="absolute inset-0 transition-all pointer-events-none rounded-xl ring-1 ring-transparent focus-within:ring-emerald-500/30" />
            </div>

            {/* Import button */}
            <button className="group/btn relative overflow-hidden border border-slate-700 bg-slate-800/60 hover:bg-slate-700/80 text-slate-200 px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all duration-300 hover:scale-105 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/10">
              <Upload className="h-4 w-4 transition-transform group-hover/btn:-translate-y-0.5" />
              <span className="text-sm font-medium">استيراد</span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-white/10 to-emerald-500/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000" />
            </button>

            {/* Add client button - primary action */}
            <button className="relative overflow-hidden bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/30">
              <Plus className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" />
              <span className="text-sm font-semibold">إضافة عميل</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </button>

       
          </div>
        </div>
      </div>

      {/* Bottom decorative bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
};

export default Header;