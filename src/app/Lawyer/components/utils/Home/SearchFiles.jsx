"use client";

import React from "react";
import { FileSearch, Search } from "lucide-react";

const SearchFiles = () => {
  return (
    <div className="p-5 transition-all duration-300 border shadow-sm bg-slate-800 rounded-2xl border-slate-700 hover:shadow-md">
      <h3 className="flex items-center gap-2 mb-4 text-lg font-semibold text-white">
        <FileSearch className="w-5 h-5 text-blue-400" />
        بحث سريع في الملفات
      </h3>
      <div className="space-y-3">
        <input
          type="text"
          placeholder="رقم القضية"
          className="w-full p-2 text-gray-200 transition border rounded-xl bg-slate-700 border-slate-600 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="رقم الملف"
          className="w-full p-2 text-gray-200 transition border rounded-xl bg-slate-700 border-slate-600 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="flex items-center justify-center w-full gap-2 py-2 font-medium text-white transition bg-blue-600 hover:bg-blue-500 rounded-xl">
          <Search className="w-4 h-4" />
          بحث
        </button>
      </div>
    </div>
  );
};

export default SearchFiles;