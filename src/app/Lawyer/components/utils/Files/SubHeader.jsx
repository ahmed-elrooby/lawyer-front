"use client";

import React from "react";
import { FolderOpen, Grid, Upload } from "lucide-react";

const SubHeader = () => {
  return (
    <div className="relative p-6 overflow-hidden text-white shadow-2xl rounded-2xl bg-gradient-to-r from-blue-800 via-blue-700 to-indigo-800 animate-fade-in-up">
      {/* Pattern background */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold md:text-3xl">
            <FolderOpen className="w-8 h-8" />
            إدارة الملفات
          </h1>
          <p className="mt-1 text-sm text-blue-100">
            لوحة تحكم متكاملة مع إحصائيات دقيقة وجدول مرن - الوضع الداكن
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium transition bg-white/10 rounded-xl backdrop-blur-sm hover:bg-white/20">
            <Grid className="w-4 h-4" />
            تبديل العرض
          </button>
          <button className="flex items-center gap-2 px-5 py-2 text-sm font-bold text-white transition transform bg-blue-600 shadow-xl rounded-xl hover:bg-blue-700 hover:scale-105">
            <Upload className="w-4 h-4" />
            رفع ملف جديد
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubHeader;