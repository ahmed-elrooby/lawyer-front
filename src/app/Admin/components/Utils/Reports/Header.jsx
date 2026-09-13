"use client";

import React, { useContext } from "react";
import {
  FaChartLine,
  FaFileExport,
  FaSpinner,
} from "react-icons/fa";

import { AdminContext } from "../../../../../Providers/AdminContext/Admin.js";

const Header = () => {
  const {
    exportDashboardStatisics,
    isExportingDashboardStatisics,
  } = useContext(AdminContext);

  const handleExport = () => {
    exportDashboardStatisics(undefined, {
      onSuccess: (data) => {
        const blob = new Blob([data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");

        link.href = url;
        link.download = "dashboard-statistics.xlsx";

        document.body.appendChild(link);

        link.click();

        link.remove();

        window.URL.revokeObjectURL(url);
      },
    });
  };

  return (
    <div className="mb-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-12 h-12 text-blue-600 border border-blue-100 shadow-sm rounded-2xl bg-blue-50">
            <FaChartLine className="text-xl" />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-800">
              التقارير والإحصائيات
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              تحليل شامل لأداء النظام والقضايا والعملاء والمحامين والجلسات
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleExport}
          disabled={isExportingDashboardStatisics}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white transition-all duration-200 bg-blue-600 shadow-lg rounded-xl shadow-blue-600/20 hover:bg-blue-700 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        >
          {isExportingDashboardStatisics ? (
            <>
              <FaSpinner className="text-sm animate-spin" />
              <span>جاري التصدير...</span>
            </>
          ) : (
            <>
              <FaFileExport className="text-sm" />
              <span>تصدير التقرير</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Header;