"use client";

import React from "react";
import { FaHistory, FaSyncAlt } from "react-icons/fa";

const Header = () => {
  return (
    <div className="flex flex-col gap-4 mb-6 md:flex-row md:items-center md:justify-between">
      <div className="flex items-start gap-3">
        <div className="flex items-center justify-center w-12 h-12 text-white shadow-sm shrink-0 rounded-xl bg-slate-900">
          <FaHistory className="text-lg" />
        </div>

        <div>
          <h1 className="text-xl font-bold text-slate-900 md:text-2xl">
            سجل النشاطات
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            متابعة جميع العمليات والأنشطة التي تمت داخل النظام
          </p>
        </div>
      </div>

   
    </div>
  );
};

export default Header;