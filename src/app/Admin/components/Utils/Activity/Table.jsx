
"use client";

import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  FaGavel,
  FaCalendarAlt,
  FaClock,
  FaFileAlt,
  FaEdit,
  FaPlus,
  FaPaperclip,
  FaStickyNote,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { AdminContext } from "../../../../../Providers/AdminContext/Admin.js";

const Table = () => {
  const { timeLine = [] } = useContext(AdminContext);

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  const totalPages = Math.ceil(timeLine.length / itemsPerPage);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;

    return timeLine.slice(
      startIndex,
      startIndex + itemsPerPage
    );
  }, [timeLine, currentPage]);

  const startItem =
    timeLine.length === 0
      ? 0
      : (currentPage - 1) * itemsPerPage + 1;

  const endItem = Math.min(
    currentPage * itemsPerPage,
    timeLine.length
  );

  const getActivityConfig = (type) => {
    const config = {
      case_created: {
        label: "إنشاء قضية",
        icon: FaPlus,
        bg: "bg-emerald-50",
        color: "text-emerald-600",
      },

      case_updated: {
        label: "تعديل قضية",
        icon: FaEdit,
        bg: "bg-blue-50",
        color: "text-blue-600",
      },

      session_created: {
        label: "إضافة جلسة",
        icon: FaCalendarAlt,
        bg: "bg-amber-50",
        color: "text-amber-600",
      },

      session_updated: {
        label: "تعديل جلسة",
        icon: FaEdit,
        bg: "bg-indigo-50",
        color: "text-indigo-600",
      },

      attachment_uploaded: {
        label: "رفع مرفق",
        icon: FaPaperclip,
        bg: "bg-purple-50",
        color: "text-purple-600",
      },

      attachment_deleted: {
        label: "حذف مرفق",
        icon: FaPaperclip,
        bg: "bg-red-50",
        color: "text-red-600",
      },

      note_created: {
        label: "إضافة ملاحظة",
        icon: FaStickyNote,
        bg: "bg-emerald-50",
        color: "text-emerald-600",
      },

      note_updated: {
        label: "تعديل ملاحظة",
        icon: FaEdit,
        bg: "bg-blue-50",
        color: "text-blue-600",
      },

      note_deleted: {
        label: "حذف ملاحظة",
        icon: FaStickyNote,
        bg: "bg-red-50",
        color: "text-red-600",
      },
    };

    return (
      config[type] || {
        label: "نشاط",
        icon: FaFileAlt,
        bg: "bg-slate-100",
        color: "text-slate-600",
      }
    );
  };

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatTime = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const getPageNumbers = () => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="mt-6 overflow-hidden bg-white border shadow-sm border-slate-200">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            سجل النشاطات
          </h3>

          <p className="mt-1 text-xs text-slate-400">
            جميع العمليات التي تمت داخل النظام
          </p>
        </div>

        <div className="px-3 py-2 text-xs font-medium rounded-lg bg-slate-50 text-slate-500">
          {timeLine.length.toLocaleString("en-US")} نشاط
        </div>
      </div>

      {/* Empty State */}
      {timeLine.length === 0 ? (
        <div className="flex min-h-[300px] flex-col items-center justify-center px-5 text-center">
          <div className="flex items-center justify-center h-14 w-14 rounded-2xl bg-slate-100">
            <FaClock className="text-xl text-slate-400" />
          </div>

          <h4 className="mt-4 text-sm font-bold text-slate-700">
            لا توجد نشاطات
          </h4>

          <p className="mt-1 text-xs text-slate-400">
            لم يتم تسجيل أي نشاطات حتى الآن
          </p>
        </div>
      ) : (
        <>
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[950px] text-right">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/70">
                  <th className="px-5 py-4 text-xs font-bold text-slate-500">
                    #
                  </th>

                  <th className="px-5 py-4 text-xs font-bold text-slate-500">
                    النشاط
                  </th>

                  <th className="px-5 py-4 text-xs font-bold text-slate-500">
                    القضية
                  </th>

                  <th className="px-5 py-4 text-xs font-bold text-slate-500">
                    الجلسة
                  </th>

                  <th className="px-5 py-4 text-xs font-bold text-slate-500">
                    الوصف
                  </th>

                  <th className="px-5 py-4 text-xs font-bold text-slate-500">
                    التاريخ
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {currentItems.map((item, index) => {
                  const activity = getActivityConfig(item.type);
                  const Icon = activity.icon;

                  const itemNumber =
                    (currentPage - 1) * itemsPerPage + index + 1;

                  return (
                    <tr
                      key={item._id}
                      className="transition-colors hover:bg-slate-50/70"
                    >
                      {/* Number */}
                      <td className="px-5 py-4">
                        <span className="text-sm font-medium text-slate-400">
                          {itemNumber.toLocaleString("en-US")}
                        </span>
                      </td>

                      {/* Activity */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${activity.bg}`}
                          >
                            <Icon
                              className={`text-sm ${activity.color}`}
                            />
                          </div>

                          <div>
                            <p className="text-sm font-bold text-slate-800">
                              {item.title}
                            </p>

                            <span
                              className={`mt-1 inline-block text-[11px] font-medium ${activity.color}`}
                            >
                              {activity.label}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Case */}
                      <td className="px-5 py-4">
                        {item.caseId ? (
                          <div className="flex items-center gap-2">
                            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100">
                              <FaGavel className="text-xs text-slate-500" />
                            </div>

                            <div>
                              <p className="text-sm font-semibold text-slate-700">
                                {item.caseId.caseNumber}
                              </p>

                              <p className="mt-0.5 max-w-[150px] truncate text-xs text-slate-400">
                                {item.caseId.title}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-400">
                            -
                          </span>
                        )}
                      </td>

                      {/* Session */}
                      <td className="px-5 py-4">
                        {item.sessionId ? (
                          <div>
                            <p className="text-sm font-semibold text-slate-700">
                              {item.sessionId.title}
                            </p>

                            <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">
                              <span>
                                {formatDate(item.sessionId.sessionDate)}
                              </span>

                              <span>•</span>

                              <span dir="ltr">
                                {item.sessionId.sessionTime}
                              </span>
                            </div>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-400">
                            -
                          </span>
                        )}
                      </td>

                      {/* Description */}
                      <td className="max-w-[280px] px-5 py-4">
                        <p
                          className="text-xs leading-6 truncate text-slate-500"
                          title={item.description}
                        >
                          {item.description || "-"}
                        </p>
                      </td>

                      {/* Date */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <FaClock className="text-xs text-slate-400" />

                          <div>
                            <p
                              className="text-xs font-semibold text-slate-600"
                              dir="ltr"
                            >
                              {formatDate(item.createdAt)}
                            </p>

                            <p
                              className="mt-1 text-[11px] text-slate-400"
                              dir="ltr"
                            >
                              {formatTime(item.createdAt)}
                            </p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-col gap-4 px-5 py-4 border-t border-slate-100 sm:flex-row sm:items-center sm:justify-between">
              {/* Result Count */}
              <p className="text-xs text-slate-400">
                عرض{" "}
                <span className="font-semibold text-slate-600">
                  {startItem.toLocaleString("en-US")}
                </span>{" "}
                -{" "}
                <span className="font-semibold text-slate-600">
                  {endItem.toLocaleString("en-US")}
                </span>{" "}
                من{" "}
                <span className="font-semibold text-slate-600">
                  {timeLine.length.toLocaleString("en-US")}
                </span>
              </p>

              {/* Pagination Buttons */}
              <div className="flex items-center gap-1">
                {/* Previous */}
                <button
                  type="button"
                  onClick={handlePrevious}
                  disabled={currentPage === 1}
                  className="flex items-center justify-center transition border rounded-lg h-9 w-9 border-slate-200 text-slate-500 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <FaChevronRight className="text-xs" />
                </button>

                {/* Pages */}
                {getPageNumbers().map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    className={`flex h-9 min-w-9 items-center justify-center rounded-lg px-2 text-xs font-semibold transition ${
                      currentPage === page
                        ? "bg-slate-900 text-white shadow-sm"
                        : "border border-slate-200 text-slate-500 hover:bg-slate-50"
                    }`}
                  >
                    {page.toLocaleString("en-US")}
                  </button>
                ))}

                {/* Next */}
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                  className="flex items-center justify-center transition border rounded-lg h-9 w-9 border-slate-200 text-slate-500 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <FaChevronLeft className="text-xs" />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Table;
