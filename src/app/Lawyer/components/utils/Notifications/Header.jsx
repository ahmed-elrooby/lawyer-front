
"use client";

import React, { useContext } from "react";
import {
  FaBell,
  FaCheckDouble,
} from "react-icons/fa";

import { LawyerContext } from "../../../../../Providers/LawyerContext/lawyer.js";

const Header = () => {
  const { handleReadNoteFun } = useContext(LawyerContext);

 
  return (
    <div className="flex flex-col gap-4 p-5 mb-6 border shadow-lg rounded-2xl border-slate-700/50 bg-slate-900 shadow-black/10 sm:flex-row sm:items-center sm:justify-between">
      {/* Title */}
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center w-12 h-12 shrink-0 rounded-xl bg-blue-500/10">
          <FaBell className="text-xl text-blue-400" />
        </div>

        <div>
          <h1 className="text-xl font-bold text-white">
            الإشعارات
          </h1>

          <p className="mt-1 text-sm text-slate-400">
            تابع آخر التنبيهات والتحديثات الخاصة بك
          </p>
        </div>
      </div>

      {/* Action */}
      <button
        type="button"
        onClick={handleReadNoteFun}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm font-medium text-slate-200 transition-all duration-200 hover:border-blue-500/50 hover:bg-slate-700 hover:text-white sm:w-auto"
      >
        <FaCheckDouble className="text-blue-400" />
        تحديد الكل كمقروء
      </button>
    </div>
  );
};

export default Header;
