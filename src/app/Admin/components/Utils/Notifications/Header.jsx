
"use client";

import React, { useContext } from "react";
import {
  FaBell,
  FaCheckDouble,
} from "react-icons/fa";

import { AdminContext } from "../../../../../Providers/AdminContext/Admin.js";

const Header = () => {
  const {handleReadAllNotificationsFun } = useContext(AdminContext);

 

  return (
    <div className="mb-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Title */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-12 h-12 text-blue-600 border border-blue-100 shadow-sm rounded-2xl bg-blue-50">
            <FaBell className="text-xl" />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-800">
              الإشعارات
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              إدارة ومتابعة إشعارات النظام والتنبيهات المهمة
            </p>
          </div>
        </div>

        {/* Mark All As Read */}
        <button
          type="button"
          onClick={handleReadAllNotificationsFun}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-slate-700 transition-all duration-200 bg-white border shadow-sm rounded-xl border-slate-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 active:scale-[0.98]"
        >
          <FaCheckDouble className="text-sm" />

          <span>تحديد الكل كمقروء</span>
        </button>
      </div>
    </div>
  );
};

export default Header;
