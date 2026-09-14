"use client";

import React, { useContext } from "react";
import { FaFolderOpen, FaPlus } from "react-icons/fa";

import AddFileCategory from "./AddFileCategory.jsx";
import { LawyerContext } from "../../../../../Providers/LawyerContext/lawyer.js";

const Header = () => {
  const { openAddCategory, setOpenAddCategory } =
    useContext(LawyerContext);

  return (
    <>
      {openAddCategory && <AddFileCategory />}

      <div className="mb-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Title */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 border shadow-sm rounded-2xl border-emerald-100 bg-emerald-50 text-emerald-600">
              <FaFolderOpen className="text-xl" />
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white">
                تصنيفات الملفات
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                إدارة وتنظيم تصنيفات الملفات والمستندات داخل النظام
              </p>
            </div>
          </div>

          {/* Add Button */}
          <button
            type="button"
            onClick={() => setOpenAddCategory(true)}
            className="
              inline-flex items-center justify-center gap-2
              px-5 py-3
              text-sm font-semibold text-white
              transition-all duration-200
              rounded-xl
              bg-gradient-to-r from-emerald-500 to-emerald-600
              shadow-lg shadow-emerald-600/20
              hover:from-emerald-600 hover:to-emerald-700
              hover:-translate-y-0.5
              active:translate-y-0
              focus:outline-none
              focus:ring-2 focus:ring-emerald-500/30
              focus:ring-offset-2
            "
          >
            <FaPlus className="text-xs" />

            <span>إضافة تصنيف</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;