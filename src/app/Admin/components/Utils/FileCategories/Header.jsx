"use client";

import React, { useContext } from "react";
import { FaFolderOpen, FaPlus } from "react-icons/fa";

import { AdminContext } from "../../../../../Providers/AdminContext/Admin.js";
import AddFileCategory from "./AddFileCategory.jsx";

const Header = () => {
  const {
     openAddCategory, setOpenAddCategory
  } = useContext(AdminContext);

  return <>
  {
    openAddCategory && (<AddFileCategory/>)
  }
 
    <div className="mb-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        
        {/* Title */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-12 h-12 text-blue-600 border border-blue-100 shadow-sm rounded-2xl bg-blue-50">
            <FaFolderOpen className="text-xl" />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-800">
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
          className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white transition-all duration-200 bg-blue-600 shadow-lg rounded-xl shadow-blue-600/20 hover:bg-blue-700 hover:-translate-y-0.5 active:translate-y-0"
        >
          <FaPlus className="text-xs" />

          <span>إضافة تصنيف</span>
        </button>
      </div>
    </div> </>
  
};

export default Header;