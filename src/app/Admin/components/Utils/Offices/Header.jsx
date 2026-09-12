"use client";

import React, { useContext } from "react";
import { FaBuilding, FaPlus, FaArrowLeft, FaRegBuilding } from "react-icons/fa";
import { AdminContext } from "../../../../../Providers/AdminContext/Admin.js";
import AddOffice from "./AddOffice.jsx";

const Header = () => {
  const { openAddOffice, setOpenAddOffice } = useContext(AdminContext);
  return (
    <>
      {openAddOffice && <AddOffice />}
      <div className="mb-6">
        {/* Header Card */}
        <div className="relative px-2 py-5 overflow-hidden bg-white border shadow-sm md:px-6 rounded-2xl border-gray-200/70">
          {/* Decorative Background */}
          <div className="absolute w-32 h-32 rounded-full pointer-events-none -left-10 -top-10 bg-blue-500/5 blur-2xl" />
          <div className="absolute w-32 h-32 rounded-full pointer-events-none -bottom-12 right-20 bg-indigo-500/5 blur-2xl" />

          <div className="relative flex items-center justify-between gap-4">
            {/* Right Side - Title */}
            <div className="flex items-center gap-4">
              {/* Icon */}
              <div className="flex items-center justify-center w-12 h-12 shadow-lg shrink-0 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-blue-500/20">
                <FaBuilding className="text-xl text-white" />
              </div>

              {/* Title */}
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-sm font-bold tracking-tight text-gray-800 md:text-xl">
                    إدارة المكاتب
                  </h1>

                  <span className="rounded-full hidden md:block bg-blue-50 px-2.5 py-1 text-[10px] font-bold text-blue-600">
                    Offices
                  </span>
                </div>

                <p className="mt-1 text-sm text-gray-500">
                  إدارة ومتابعة جميع مكاتب المحاماة المسجلة على المنصة
                </p>
              </div>
            </div>

            {/* Left Side - Actions */}
            <div className="flex items-center gap-2">
              {/* Back */}
              <button
                type="button"
                className="hidden items-center gap-1 md:gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 transition-all hover:border-gray-300 hover:bg-gray-50 sm:flex"
              >
                <FaArrowLeft className="text-xs" />
                <span>الرئيسية</span>
              </button>

              {/* Add Office */}
              <button
                type="button"
                onClick={() => {
                  setOpenAddOffice(true);
                }}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-2 md:px-4 py-1 md:py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-500/25 active:translate-y-0"
              >
                <FaPlus className="text-xs" />
                <span>إضافة مكتب</span>
              </button>
            </div>
          </div>

          {/* Bottom Accent */}
          <div className="absolute bottom-0 right-0 h-0.5 w-32 rounded-l-full bg-gradient-to-l from-blue-500 to-transparent" />
        </div>
      </div>
    </>
  );
};

export default Header;
