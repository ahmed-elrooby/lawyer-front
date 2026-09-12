"use client";

import React from "react";
import { FaUsers, FaUserShield } from "react-icons/fa";

const Header = () => {
  return (
    <div className="mb-6">
      <div className="flex flex-col gap-4 p-5 bg-white border shadow-sm rounded-2xl border-slate-200 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Right Side */}
        <div className="flex items-start gap-4">
          <div className="flex items-center justify-center w-12 h-12 text-blue-600 shrink-0 rounded-xl bg-blue-50">
            <FaUsers className="text-xl" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
                العملاء
              </h1>

              <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-[10px] font-semibold text-indigo-600">
                إدارة ومتابعة
              </span>
            </div>

            <p className="mt-1 text-sm leading-6 text-slate-500">
              متابعة بيانات العملاء المسجلين لدى مكاتب المحاماة وإحصائياتهم
            </p>
          </div>
        </div>

        {/* Left Side */}
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-xl border border-slate-100 bg-slate-50 px-4 py-2.5 sm:flex">
            <FaUserShield className="text-sm text-slate-400" />

            <span className="text-xs font-medium text-slate-500">
              عرض إداري فقط
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
