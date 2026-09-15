
"use client";

import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  FileText,
  File,
  Image,
  FileSpreadsheet,
  Download,
  Trash2,
  Edit,
  Eye,
  Grid3x3,
  Table as TableIcon,
  ChevronLeft,
  ChevronRight,
  Search,
  FileArchive,
  FileCode,
} from "lucide-react";

import { LawyerContext } from "../../../../../Providers/LawyerContext/lawyer.js";
import Details from "./Details.jsx";
import DeleteFile from "./DeleteFile.jsx";
import UpdateFile from "./UpdateFile.jsx";

const ITEMS_PER_PAGE = 5;

const getFileIcon = (extension = "", mimeType = "") => {
  const ext = extension.toLowerCase();

  if (
    ext === ".pdf" ||
    mimeType.includes("pdf")
  ) {
    return {
      icon: FileText,
      color: "text-red-400",
      bg: "bg-red-500/10",
    };
  }

  if (
    ext === ".doc" ||
    ext === ".docx" ||
    mimeType.includes("word")
  ) {
    return {
      icon: File,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    };
  }

  if (
    ext === ".xls" ||
    ext === ".xlsx" ||
    mimeType.includes("spreadsheet") ||
    mimeType.includes("excel")
  ) {
    return {
      icon: FileSpreadsheet,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
    };
  }

  if (
    ext === ".jpg" ||
    ext === ".jpeg" ||
    ext === ".png" ||
    ext === ".webp" ||
    mimeType.startsWith("image/")
  ) {
    return {
      icon: Image,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
    };
  }

  if (
    ext === ".zip" ||
    ext === ".rar" ||
    mimeType.includes("zip")
  ) {
    return {
      icon: FileArchive,
      color: "text-amber-400",
      bg: "bg-amber-500/10",
    };
  }

  if (
    ext === ".js" ||
    ext === ".jsx" ||
    ext === ".ts" ||
    ext === ".tsx" ||
    ext === ".html" ||
    ext === ".css"
  ) {
    return {
      icon: FileCode,
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
    };
  }

  return {
    icon: File,
    color: "text-slate-400",
    bg: "bg-slate-700/50",
  };
};

const formatFileSize = (bytes) => {
  if (!bytes) return "—";

  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const formatDate = (date) => {
  if (!date) return "—";

  return new Date(date).toLocaleDateString("ar-EG", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const Table = () => {
  const {
    documents = [],
    setOpenAddDocument,openDeleteDocument, setOpenDeleteDocument,openUpdateDocument, setOpenUpdateDocument
  } = useContext(LawyerContext);

  const [viewMode, setViewMode] = useState("table");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
const [selectFile,setSelectFile]=useState(null)
const [openDetails,setOpenDetails]=useState(false)
  /*
   * Search
   */
  const filteredDocuments = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) {
      return documents;
    }

    return documents.filter((document) => {
      const documentName =
        document?.name?.toLowerCase() || "";

      const originalName =
        document?.originalName?.toLowerCase() || "";

      const categoryName =
        document?.categoryId?.name?.toLowerCase() || "";

      const clientName =
        document?.clientId?.name?.toLowerCase() || "";

      const caseNumber =
        document?.caseId?.caseNumber?.toLowerCase() || "";

      const caseTitle =
        document?.caseId?.title?.toLowerCase() || "";

      return (
        documentName.includes(value) ||
        originalName.includes(value) ||
        categoryName.includes(value) ||
        clientName.includes(value) ||
        caseNumber.includes(value) ||
        caseTitle.includes(value)
      );
    });
  }, [documents, search]);

  /*
   * Pagination
   */
  const totalPages = Math.max(
    1,
    Math.ceil(filteredDocuments.length / ITEMS_PER_PAGE)
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const startIndex =
    (currentPage - 1) * ITEMS_PER_PAGE;

  const paginatedDocuments = filteredDocuments.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const goToPage = (page) => {
    setCurrentPage(
      Math.max(1, Math.min(page, totalPages))
    );
  };

  /*
   * Actions
   */


 const handleDownload = (file) => { if (!file?.url) return; const link = window.document.createElement("a"); link.href = file.url; link.target = "_blank"; link.rel = "noopener noreferrer"; link.download = file.originalName || file.name || "document"; window.document.body.appendChild(link); link.click(); window.document.body.removeChild(link); };



  return <>
  
 {
  openDetails && <Details selectFile={selectFile} openDetails={openDetails} setOpenDetails={setOpenDetails}/>
 }
 {
  openDeleteDocument && <DeleteFile selectFile={selectFile}/>
 }
 {
  openUpdateDocument && <UpdateFile selectFile={selectFile}/>
 }
    <div
      className="relative my-6 overflow-hidden border shadow-xl dark-scrollbar rounded-3xl border-slate-700/60 bg-slate-900"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-600/[0.03] via-transparent to-emerald-600/[0.03]" />

      <div className="relative z-10 p-4 sm:p-6">

        {/* ================= HEADER ================= */}
        <div className="flex flex-col gap-4 mb-6 lg:flex-row lg:items-center lg:justify-between">

          {/* Title */}
          <div>
            <h2 className="text-lg font-bold text-white">
              المستندات
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              إدارة جميع المستندات والملفات الخاصة بك
            </p>
          </div>

          {/* Search + View */}
          <div className="flex flex-col gap-3 sm:flex-row">

            {/* Search */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute w-4 h-4 -translate-y-1/2 right-3 top-1/2 text-slate-500" />

              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="ابحث عن مستند..."
                className="w-full rounded-xl border border-slate-700 bg-slate-800/70 py-2.5 pl-4 pr-10 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10"
              />
            </div>

            {/* View Toggle */}
            <div className="flex items-center p-1 border rounded-xl border-slate-700 bg-slate-800/70">

              <button
                type="button"
                onClick={() => setViewMode("table")}
                className={`rounded-lg p-2.5 transition ${
                  viewMode === "table"
                    ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20"
                    : "text-slate-400 hover:bg-slate-700 hover:text-white"
                }`}
                title="عرض جدول"
              >
                <TableIcon className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`rounded-lg p-2.5 transition ${
                  viewMode === "grid"
                    ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20"
                    : "text-slate-400 hover:bg-slate-700 hover:text-white"
                }`}
                title="عرض كروت"
              >
                <Grid3x3 className="w-4 h-4" />
              </button>

            </div>
          </div>
        </div>

        {/* ================= COUNTER ================= */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <p className="text-xs text-slate-500">
            {filteredDocuments.length === 0
              ? "لا توجد مستندات"
              : `عرض ${startIndex + 1} - ${Math.min(
                  startIndex + ITEMS_PER_PAGE,
                  filteredDocuments.length
                )} من ${filteredDocuments.length}`}
          </p>

          {search && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setCurrentPage(1);
              }}
              className="text-xs text-blue-400 transition hover:text-blue-300"
            >
              مسح البحث
            </button>
          )}
        </div>

        {/* ================= EMPTY ================= */}
        {filteredDocuments.length === 0 && (
          <div className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-800/30 px-6 text-center">

            <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-2xl bg-slate-800">
              <FileText className="w-8 h-8 text-slate-500" />
            </div>

            <h3 className="text-base font-semibold text-white">
              لا توجد مستندات
            </h3>

            <p className="max-w-sm mt-2 text-sm text-slate-500">
              {search
                ? "لم نجد أي مستند يطابق كلمة البحث"
                : "لم يتم رفع أي مستند حتى الآن"}
            </p>

            {!search && setOpenAddDocument && (
              <button
                type="button"
                onClick={() => setOpenAddDocument(true)}
                className="mt-5 rounded-xl bg-blue-500 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-blue-400"
              >
                رفع مستند جديد
              </button>
            )}
          </div>
        )}

        {/* ================= TABLE VIEW ================= */}
        {filteredDocuments.length > 0 &&
          viewMode === "table" && (
            <div className="w-full overflow-x-auto border rounded-2xl border-slate-700/60">
              <table className="min-w-[900px] w-full text-right text-sm">

                <thead>
                  <tr className="border-b border-slate-700/60 bg-slate-800/70">
                    <th className="px-5 py-4 font-semibold text-slate-300">
                      المستند
                    </th>

                    <th className="px-5 py-4 font-semibold text-slate-300">
                      التصنيف
                    </th>

                    <th className="px-5 py-4 font-semibold text-slate-300">
                      القضية
                    </th>

                    <th className="px-5 py-4 font-semibold text-slate-300">
                      العميل
                    </th>

                    <th className="px-5 py-4 font-semibold text-slate-300">
                      الحجم
                    </th>

                    <th className="px-5 py-4 font-semibold text-slate-300">
                      التاريخ
                    </th>

                    <th className="px-5 py-4 font-semibold text-slate-300">
                      الإجراءات
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {paginatedDocuments.map((document) => {
                    const file = getFileIcon(
                      document?.extension,
                      document?.mimeType
                    );

                    const Icon = file.icon;

                    return (
                      <tr
                        key={document._id}
                        className="border-b border-slate-800 transition hover:bg-white/[0.03]"
                      >
                        {/* File */}
                        <td className="px-5 py-4">
                          <div className="flex min-w-[230px] items-center gap-3">

                            <div
                              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${file.bg}`}
                            >
                              <Icon
                                className={`h-5 w-5 ${file.color}`}
                              />
                            </div>

                            <div className="min-w-0">
                              <p className="max-w-[230px] truncate font-semibold text-slate-200">
                                {document?.name ||
                                  document?.originalName ||
                                  "بدون اسم"}
                              </p>

                              <p className="mt-1 text-xs uppercase text-slate-500">
                                {document?.extension
                                  ?.replace(".", "")
                                  ?.toUpperCase() ||
                                  "FILE"}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="px-5 py-4">
                          <span className="rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1 text-xs text-slate-300">
                            {document?.categoryId?.name ||
                              "بدون تصنيف"}
                          </span>
                        </td>

                        {/* Case */}
                        <td className="px-5 py-4">
                          {document?.caseId ? (
                            <div>
                              <p className="max-w-[150px] truncate font-medium text-slate-300">
                                {document.caseId.title ||
                                  "قضية"}
                              </p>

                              {document.caseId.caseNumber && (
                                <p className="mt-1 text-xs text-slate-500">
                                  #{document.caseId.caseNumber}
                                </p>
                              )}
                            </div>
                          ) : (
                            <span className="text-xs text-slate-600">
                              غير مرتبط
                            </span>
                          )}
                        </td>

                        {/* Client */}
                        <td className="px-5 py-4">
                          <span className="text-slate-300">
                            {document?.clientId?.name ||
                              "غير مرتبط"}
                          </span>
                        </td>

                        {/* Size */}
                        <td className="px-5 py-4 text-slate-400">
                          {formatFileSize(document?.size)}
                        </td>

                        {/* Date */}
                        <td className="px-5 py-4 whitespace-nowrap text-slate-400">
                          {formatDate(document?.createdAt)}
                        </td>

                        {/* Actions */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-1">

                            <button
                              type="button"
                              onClick={() =>{
                                setSelectFile(document)
                                setOpenDetails(true)
                              }
                            }
                              
                              className="p-2 transition rounded-lg text-slate-400 hover:bg-cyan-500/10 hover:text-cyan-400"
                              title="عرض"
                            >
                              <Eye className="w-4 h-4" />
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                handleDownload(document)
                              }
                              className="p-2 transition rounded-lg text-slate-400 hover:bg-blue-500/10 hover:text-blue-400"
                              title="تحميل"
                            >
                              <Download className="w-4 h-4" />
                            </button>

                            <button
                              type="button"
                              onClick={() =>{
                                setSelectFile(document)
                                setOpenUpdateDocument(true)
                              }
                              
                              }
                              className="p-2 transition rounded-lg text-slate-400 hover:bg-emerald-500/10 hover:text-emerald-400"
                              title="تعديل"
                            >
                              <Edit className="w-4 h-4" />
                            </button>

                            <button
                              type="button"
                              onClick={() =>{
                                setSelectFile(document)
                                setOpenDeleteDocument(true)
                              }
                                
                              }
                              className="p-2 transition rounded-lg text-slate-400 hover:bg-red-500/10 hover:text-red-400"
                              title="حذف"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>

                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

        {/* ================= CARDS VIEW ================= */}
        {filteredDocuments.length > 0 &&
          viewMode === "grid" && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">

              {paginatedDocuments.map((document) => {
                const file = getFileIcon(
                  document?.extension,
                  document?.mimeType
                );

                const Icon = file.icon;

                return (
                  <div
                    key={document._id}
                    className="relative p-5 overflow-hidden transition-all duration-300 border group rounded-2xl border-slate-700/60 bg-slate-800/50 hover:-translate-y-1 hover:border-blue-500/30 hover:bg-slate-800"
                  >

                    {/* Glow */}
                    <div className="absolute w-32 h-32 transition rounded-full pointer-events-none -right-10 -top-10 bg-blue-500/5 blur-3xl group-hover:bg-blue-500/10" />

                    <div className="relative">

                      {/* Header */}
                      <div className="flex items-start justify-between gap-3">

                        <div className="flex items-center min-w-0 gap-3">

                          <div
                            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${file.bg}`}
                          >
                            <Icon
                              className={`h-6 w-6 ${file.color}`}
                            />
                          </div>

                          <div className="min-w-0">
                            <h3 className="font-semibold truncate text-slate-200">
                              {document?.name ||
                                document?.originalName ||
                                "بدون اسم"}
                            </h3>

                            <p className="mt-1 text-xs uppercase text-slate-500">
                              {document?.extension
                                ?.replace(".", "")
                                ?.toUpperCase() ||
                                "FILE"}
                            </p>
                          </div>
                        </div>

                        <span className="px-2 py-1 text-xs border rounded-lg shrink-0 border-slate-700 bg-slate-900/70 text-slate-400">
                          {formatFileSize(document?.size)}
                        </span>

                      </div>

                      {/* Info */}
                      <div className="mt-5 space-y-3">

                        <div className="flex items-center justify-between gap-3">
                          <span className="text-xs text-slate-500">
                            التصنيف
                          </span>

                          <span className="max-w-[160px] truncate rounded-lg bg-slate-700/50 px-2 py-1 text-xs text-slate-300">
                            {document?.categoryId?.name ||
                              "بدون تصنيف"}
                          </span>
                        </div>

                        <div className="flex items-center justify-between gap-3">
                          <span className="text-xs text-slate-500">
                            القضية
                          </span>

                          <span className="max-w-[160px] truncate text-xs text-slate-300">
                            {document?.caseId?.title ||
                              "غير مرتبط"}
                          </span>
                        </div>

                        <div className="flex items-center justify-between gap-3">
                          <span className="text-xs text-slate-500">
                            العميل
                          </span>

                          <span className="max-w-[160px] truncate text-xs text-slate-300">
                            {document?.clientId?.name ||
                              "غير مرتبط"}
                          </span>
                        </div>

                        <div className="flex items-center justify-between gap-3">
                          <span className="text-xs text-slate-500">
                            تاريخ الرفع
                          </span>

                          <span className="text-xs text-slate-400">
                            {formatDate(document?.createdAt)}
                          </span>
                        </div>

                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-end gap-1 pt-4 mt-5 border-t border-slate-700/60">

                        <button
                          type="button"
                           onClick={() =>{
                                setSelectFile(document)
                                setOpenDetails(true)
                              }
                            }
                          className="p-2 transition rounded-lg text-slate-400 hover:bg-cyan-500/10 hover:text-cyan-400"
                          title="عرض"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDownload(document)
                          }
                          className="p-2 transition rounded-lg text-slate-400 hover:bg-blue-500/10 hover:text-blue-400"
                          title="تحميل"
                        >
                          <Download className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                         onClick={() =>{
                                setSelectFile(document)
                                setOpenUpdateDocument(true)
                              }
                              
                              }
                          className="p-2 transition rounded-lg text-slate-400 hover:bg-emerald-500/10 hover:text-emerald-400"
                          title="تعديل"
                        >
                          <Edit className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() =>{
                            setSelectFile(document)
                            setOpenDeleteDocument(true)
                          }
                          }
                          className="p-2 transition rounded-lg text-slate-400 hover:bg-red-500/10 hover:text-red-400"
                          title="حذف"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        {/* ================= PAGINATION ================= */}
        {filteredDocuments.length > ITEMS_PER_PAGE && (
          <div className="flex flex-col items-center justify-between gap-4 pt-5 mt-6 border-t border-slate-800 sm:flex-row">

            <p className="text-xs text-slate-500">
              الصفحة {currentPage} من {totalPages}
            </p>

            <div className="flex items-center gap-2">

              {/* Previous */}
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() =>
                  goToPage(currentPage - 1)
                }
                className="flex items-center gap-1 px-3 py-2 text-xs font-medium transition border rounded-xl border-slate-700 bg-slate-800/70 text-slate-300 hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronRight className="w-4 h-4" />
                السابق
              </button>

              {/* Pages */}
              <div className="flex items-center gap-1">
                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1
                ).map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() =>
                      goToPage(page)
                    }
                    className={`flex h-9 w-9 items-center justify-center rounded-xl text-xs font-semibold transition ${
                      currentPage === page
                        ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20"
                        : "border border-slate-700 bg-slate-800/70 text-slate-400 hover:bg-slate-700 hover:text-white"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              {/* Next */}
              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() =>
                  goToPage(currentPage + 1)
                }
                className="flex items-center gap-1 px-3 py-2 text-xs font-medium transition border rounded-xl border-slate-700 bg-slate-800/70 text-slate-300 hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                التالي
                <ChevronLeft className="w-4 h-4" />
              </button>

            </div>
          </div>
        )}
      </div>

      {/* Bottom line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
    </div>
  </>
};

export default Table;

