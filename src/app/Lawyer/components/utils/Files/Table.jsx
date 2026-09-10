"use client";

import React, { useState } from "react";
import {
  FileText,
  File,
  Image,
  FileSpreadsheet,
  Download,
  Trash2,
  Edit,
  Eye,
  CheckCircle,
  Clock,
  Upload,
  Grid3x3,
  Table as TableIcon,
  ChevronLeft,
  ChevronRight,
  Search,
  Filter,
} from "lucide-react";

// Sample data (same as before, but with full fields for actions)
const allFiles = [
  {
    id: 1,
    name: "عقد البيع النهائي.pdf",
    type: "PDF",
    size: "2.4 MB",
    date: "2025-05-10",
    case: "قضية Estate v. Wilson",
    status: "مكتمل",
    statusType: "completed",
    icon: FileText,
    iconColor: "text-red-400",
  },
  {
    id: 2,
    name: "لائحة الدعوى.docx",
    type: "DOCX",
    size: "1.1 MB",
    date: "2025-05-12",
    case: "قضية Tech Corp v. Innovate",
    status: "قيد المراجعة",
    statusType: "pending",
    icon: File,
    iconColor: "text-blue-400",
  },
  {
    id: 3,
    name: "صورة البطاقة الشخصية.jpg",
    type: "IMG",
    size: "0.8 MB",
    date: "2025-05-14",
    case: "قضية Family Matter",
    status: "مرفوع",
    statusType: "uploaded",
    icon: Image,
    iconColor: "text-green-400",
  },
];

const getStatusBadge = (statusType) => {
  switch (statusType) {
    case "completed":
      return {
        text: "مكتمل",
        icon: CheckCircle,
        className: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
        glow: "shadow-emerald-500/20",
      };
    case "pending":
      return {
        text: "قيد المراجعة",
        icon: Clock,
        className: "bg-amber-500/20 text-amber-300 border-amber-500/30",
        glow: "shadow-amber-500/20",
      };
    case "uploaded":
      return {
        text: "مرفوع",
        icon: Upload,
        className: "bg-sky-500/20 text-sky-300 border-sky-500/30",
        glow: "shadow-sky-500/20",
      };
    default:
      return {
        text: "غير معروف",
        icon: null,
        className: "bg-slate-700 text-slate-300",
        glow: "",
      };
  }
};

const Table = () => {
  const [viewMode, setViewMode] = useState("table");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(allFiles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedFiles = allFiles.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  return (
    <div className="relative my-6 overflow-hidden transition-all duration-500 border group rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-sm border-slate-700/50">
      {/* Animated gradient background on hover */}
      <div className="absolute inset-0 transition-all duration-700 bg-gradient-to-br from-blue-600/0 via-purple-600/0 to-emerald-600/0 rounded-2xl" />

      {/* Glass reflection effect */}
      <div className="absolute transition-all duration-1000 transform -skew-x-12 opacity-0 -inset-full bg-gradient-to-r from-white/0 via-white/20 to-white/0" />

      <div className="relative z-10 p-4 sm:p-6">
        {/* Header */}
        <div className="flex flex-col gap-4 mb-6 lg:flex-row lg:items-center lg:justify-between">
          {/* View toggle buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode("table")}
              className={`p-2.5 rounded-xl transition-all duration-300 ${
                viewMode === "table"
                  ? "bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30"
                  : "bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 border border-slate-700"
              }`}
              title="عرض جدول"
            >
              <TableIcon className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2.5 rounded-xl transition-all duration-300 ${
                viewMode === "grid"
                  ? "bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30"
                  : "bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 border border-slate-700"
              }`}
              title="عرض شبكة"
            >
              <Grid3x3 className="w-5 h-5" />
            </button>
          </div>

          {/* Search & filter */}
          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="relative w-full sm:w-64">
              <Search className="absolute w-4 h-4 -translate-y-1/2 right-3 top-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="بحث..."
                className="w-full py-2 pl-3 text-sm transition-all border pr-9 rounded-xl bg-slate-800/60 border-slate-700 text-slate-200 placeholder:text-slate-400 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30"
              />
            </div>
            <button className="p-2 transition-all border rounded-xl bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-700/80">
              <Filter className="w-4 h-4" />
            </button>
          </div>

          {/* Counter */}
          <div className="text-xs sm:text-sm text-slate-400 bg-slate-800/40 px-3 py-1.5 rounded-full text-center">
            عرض {startIndex + 1} - {Math.min(startIndex + itemsPerPage, allFiles.length)} من {allFiles.length} ملفات
          </div>
        </div>

        {/* ========== TABLE VIEW (desktop only) ========== */}
        {viewMode === "table" && (
          <>
            <div className="hidden lg:block rounded-xl">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-800/40 backdrop-blur-sm">
                  <tr>
                    <th className="px-4 py-3 text-xs font-bold text-right uppercase text-slate-300">الملف</th>
                    <th className="px-4 py-3 text-xs font-bold text-right uppercase text-slate-300">النوع</th>
                    <th className="px-4 py-3 text-xs font-bold text-right uppercase text-slate-300">الحجم</th>
                    <th className="px-4 py-3 text-xs font-bold text-right uppercase text-slate-300">التاريخ</th>
                    <th className="px-4 py-3 text-xs font-bold text-right uppercase text-slate-300">الحالة</th>
                    <th className="px-4 py-3 text-xs font-bold text-right uppercase text-slate-300">الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedFiles.map((file, idx) => {
                    const Icon = file.icon;
                    const badge = getStatusBadge(file.statusType);
                    const StatusIcon = badge.icon;
                    return (
                      <tr
                        key={file.id}
                        className="group/row border-t border-slate-700/40 transition-all duration-300 hover:bg-white/5 hover:scale-[1.01]"
                      >
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="p-1.5 rounded-lg bg-slate-800 group-hover/row:bg-slate-700 transition-all">
                              <Icon className={`h-5 w-5 ${file.iconColor}`} />
                            </div>
                            <span className="font-medium transition-colors cursor-pointer text-slate-200 hover:text-blue-400">
                              {file.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3 font-mono text-slate-300">{file.type}</td>
                        <td className="px-4 py-3 text-slate-300">{file.size}</td>
                        <td className="px-4 py-3 text-slate-300">{file.date}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${badge.className} shadow-sm`}
                          >
                            {StatusIcon && <StatusIcon className="w-3 h-3" />}
                            {badge.text}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-3">
                            <button className="transition-all text-slate-400 hover:text-blue-400 hover:scale-110">
                              <Download className="w-4 h-4" />
                            </button>
                            <button className="transition-all text-slate-400 hover:text-red-400 hover:scale-110">
                              <Trash2 className="w-4 h-4" />
                            </button>
                            <button className="transition-all text-slate-400 hover:text-emerald-400 hover:scale-110">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="transition-all text-slate-400 hover:text-cyan-400 hover:scale-110">
                              <Eye className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile/Tablet fallback: Grid cards (when in table mode on small screens) */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:hidden">
              {paginatedFiles.map((file) => {
                const Icon = file.icon;
                const badge = getStatusBadge(file.statusType);
                const StatusIcon = badge.icon;
                return (
                  <div
                    key={file.id}
                    className="group/card relative overflow-hidden bg-slate-800/60 rounded-xl border border-slate-700/50 p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:border-blue-500/30"
                  >
                    <div className="absolute inset-0 transition-all duration-500 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover/card:from-blue-500/10 group-hover/card:to-purple-500/5" />
                    <div className="relative z-10">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <div className="p-2 rounded-xl bg-slate-700">
                            <Icon className={`h-5 w-5 ${file.iconColor}`} />
                          </div>
                          <div>
                            <p className="font-semibold text-slate-200">{file.name}</p>
                            <p className="text-xs text-slate-400">{file.type} • {file.size}</p>
                          </div>
                        </div>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${badge.className}`}>
                          {StatusIcon && <StatusIcon className="w-3 h-3" />}
                          {badge.text}
                        </span>
                      </div>
                      <p className="mt-2 text-xs text-slate-400">{file.date}</p>
                      <div className="flex justify-end gap-2 pt-2 mt-3 border-t border-slate-700/50">
                        <button className="transition-all text-slate-400 hover:text-blue-400">
                          <Download className="w-3.5 h-3.5" />
                        </button>
                        <button className="transition-all text-slate-400 hover:text-red-400">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <button className="transition-all text-slate-400 hover:text-emerald-400">
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button className="transition-all text-slate-400 hover:text-cyan-400">
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* ========== GRID VIEW (always visible when selected) ========== */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {paginatedFiles.map((file) => {
              const Icon = file.icon;
              const badge = getStatusBadge(file.statusType);
              const StatusIcon = badge.icon;
              return (
                <div
                  key={file.id}
                  className="group/card relative overflow-hidden bg-slate-800/60 rounded-xl border border-slate-700/50 p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:border-blue-500/30"
                >
                  <div className="absolute inset-0 transition-all duration-500 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover/card:from-blue-500/10 group-hover/card:to-purple-500/5" />
                  <div className="relative z-10">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 transition-all rounded-xl bg-slate-700 group-hover/card:bg-slate-600">
                          <Icon className={`h-6 w-6 ${file.iconColor}`} />
                        </div>
                        <div>
                          <p className="font-semibold transition-colors cursor-pointer text-slate-200 hover:text-blue-400">
                            {file.name}
                          </p>
                          <p className="text-xs text-slate-400">{file.type} • {file.size}</p>
                        </div>
                      </div>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${badge.className}`}>
                        {StatusIcon && <StatusIcon className="w-3 h-3" />}
                        {badge.text}
                      </span>
                    </div>
                    <div className="mt-2 text-sm text-slate-300">
                      <p>📅 {file.date}</p>
                      <p className="truncate">⚖️ {file.case}</p>
                    </div>
                    <div className="flex justify-end gap-3 pt-2 mt-3 border-t border-slate-700/50">
                      <button className="transition-all text-slate-400 hover:text-blue-400 hover:scale-110">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="transition-all text-slate-400 hover:text-red-400 hover:scale-110">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button className="transition-all text-slate-400 hover:text-emerald-400 hover:scale-110">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="transition-all text-slate-400 hover:text-cyan-400 hover:scale-110">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6 sm:justify-between">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                currentPage === 1
                  ? "bg-slate-800/40 text-slate-500 cursor-not-allowed"
                  : "bg-slate-800/60 text-slate-200 hover:bg-slate-700/80 hover:scale-105 border border-slate-700"
              }`}
            >
              <ChevronRight className="w-4 h-4" />
              السابق
            </button>

            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`w-9 h-9 rounded-xl text-sm font-medium transition-all duration-300 ${
                    page === currentPage
                      ? "bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md shadow-blue-500/30 scale-105"
                      : "bg-slate-800/60 text-slate-300 hover:bg-slate-700/80 border border-slate-700"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                currentPage === totalPages
                  ? "bg-slate-800/40 text-slate-500 cursor-not-allowed"
                  : "bg-slate-800/60 text-slate-200 hover:bg-slate-700/80 hover:scale-105 border border-slate-700"
              }`}
            >
              التالي
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Bottom decorative bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
};

export default Table;