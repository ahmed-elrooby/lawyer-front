
"use client";

import React, { useContext } from "react";
import { FaGavel, FaPlus } from "react-icons/fa";
import AddType from "./AddType.jsx";
import { LawyerContext } from "../../../../../Providers/LawyerContext/lawyer.js";

const Header = () => {
  const { openAddCaseType, setOpenAddCaseType } = useContext(LawyerContext);

  return (
    <>
      {openAddCaseType && <AddType />}

      <div className="mb-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Title */}
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center w-12 h-12 border text-emerald-400 border-emerald-500/20 rounded-2xl bg-emerald-500/10"
            >
              <FaGavel className="text-xl" />
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white">
                أنواع القضايا
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                إدارة وتصنيف أنواع القضايا المتاحة للمكاتب والمحامين
              </p>
            </div>
          </div>

          {/* Add Button */}
          <button
            type="button"
            onClick={() => setOpenAddCaseType(true)}
            className="
              inline-flex items-center justify-center gap-2
              px-5 py-3
              text-sm font-semibold text-white
              transition-all duration-200
              rounded-xl
              bg-emerald-500
              shadow-lg shadow-emerald-950/30
              hover:bg-emerald-600
              hover:-translate-y-0.5
              active:translate-y-0
              focus:outline-none
              focus:ring-2
              focus:ring-emerald-500/30
            "
          >
            <FaPlus className="text-xs" />
            <span>إضافة نوع قضية</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
