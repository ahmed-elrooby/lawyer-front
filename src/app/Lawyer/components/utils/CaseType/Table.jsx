"use client";

import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  FaSearch,
  FaGavel,
  FaEdit,
  FaTrash,
  FaCheckCircle,
  FaTimesCircle,
  FaChevronRight,
  FaChevronLeft,
  FaInbox,
} from "react-icons/fa";

import DeleteCase from "./DeleteCase.jsx";
import UpdateCaseType from "./UpdateCaseType.jsx";
import { LawyerContext } from "../../../../../Providers/LawyerContext/lawyer.js";

const Table = () => {
  const {
    caseTypes: caseType,
  openUpdateCaseType, setOpenUpdateCaseType,openDeleteCaseType, setOpenDeleteCaseType
  } = useContext(LawyerContext);

  const [selectCaseType, setSelectCaseType] = useState(null);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const types = Array.isArray(caseType) ? caseType : [];

  // Search
  const filteredCaseTypes = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) return types;

    return types.filter((type) => {
      const name = type.name?.toLowerCase() || "";
      const description = type.description?.toLowerCase() || "";

      return name.includes(value) || description.includes(value);
    });
  }, [types, search]);

  // Pagination
  const totalPages = Math.ceil(
    filteredCaseTypes.length / itemsPerPage,
  );

  const paginatedCaseTypes = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;

    return filteredCaseTypes.slice(
      startIndex,
      startIndex + itemsPerPage,
    );
  }, [filteredCaseTypes, currentPage, itemsPerPage]);

  // Reset page when search or page size changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search, itemsPerPage]);

  // Keep page valid after filtering/deleting
  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const startItem =
    filteredCaseTypes.length === 0
      ? 0
      : (currentPage - 1) * itemsPerPage + 1;

  const endItem = Math.min(
    currentPage * itemsPerPage,
    filteredCaseTypes.length,
  );

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <>
      {openDeleteCaseType && (
        <DeleteCase selectCaseType={selectCaseType} />
      )}

      {openUpdateCaseType && (
        <UpdateCaseType selectCaseType={selectCaseType} />
      )}

      <div
        className="overflow-hidden border shadow-sm bg-slate-900 border-slate-700/60 rounded-2xl"
      >
        {/* Header */}
        <div
          className="flex flex-col gap-4 p-5 border-b border-slate-700/60 lg:flex-row lg:items-center lg:justify-between"
        >
          <div>
            <div className="flex items-center gap-3">
              <div
                className="flex items-center justify-center w-10 h-10 border text-emerald-400 rounded-xl bg-emerald-500/10 border-emerald-500/20"
              >
                <FaGavel className="text-sm" />
              </div>

              <div>
                <h2 className="text-lg font-bold text-white">
                  أنواع القضايا
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  إدارة جميع أنواع القضايا المسجلة في النظام
                </p>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="relative w-full lg:w-80">
            <FaSearch
              className="absolute text-sm -translate-y-1/2 right-4 top-1/2 text-slate-500"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="البحث عن نوع قضية..."
              className="w-full py-3 pl-4 text-sm text-white transition-all border outline-none pr-11 bg-slate-800 border-slate-700 rounded-xl placeholder:text-slate-500 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-right">
            <thead>
              <tr
                className="border-b bg-slate-800/60 border-slate-700/60"
              >
                <th className="px-5 py-4 text-xs font-bold text-slate-400">
                  نوع القضية
                </th>

                <th className="px-5 py-4 text-xs font-bold text-slate-400">
                  الوصف
                </th>

                <th className="px-5 py-4 text-xs font-bold text-slate-400">
                  الحالة
                </th>

                <th className="px-5 py-4 text-xs font-bold text-slate-400">
                  تاريخ الإضافة
                </th>

                <th className="px-5 py-4 text-xs font-bold text-center text-slate-400">
                  الإجراءات
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-700/50">
              {paginatedCaseTypes.length > 0 ? (
                paginatedCaseTypes.map((type) => (
                  <tr
                    key={type._id}
                    className="transition-colors hover:bg-slate-800/50"
                  >
                    {/* Name */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="flex items-center justify-center flex-shrink-0 w-10 h-10 border text-emerald-400 rounded-xl bg-emerald-500/10 border-emerald-500/10"
                        >
                          <FaGavel className="text-sm" />
                        </div>

                        <div className="min-w-0">
                          <p className="text-sm font-bold text-white">
                            {type.name}
                          </p>

                          <p className="mt-0.5 text-[11px] text-slate-500">
                            نوع قضية
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Description */}
                    <td className="max-w-xs px-5 py-4">
                      <p
                        className="text-sm leading-6 truncate text-slate-400"
                        title={type.description || ""}
                      >
                        {type.description ||
                          "لا يوجد وصف لهذا النوع من القضايا"}
                      </p>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      {type.isActive ? (
                        <span
                          className="
                            inline-flex
                            items-center
                            gap-1.5
                            px-3
                            py-1.5
                            text-[11px]
                            font-semibold
                            rounded-full
                            bg-emerald-500/10
                            text-emerald-400
                            border
                            border-emerald-500/10
                          "
                        >
                          <FaCheckCircle className="text-[10px]" />
                          نشط
                        </span>
                      ) : (
                        <span
                          className="
                            inline-flex
                            items-center
                            gap-1.5
                            px-3
                            py-1.5
                            text-[11px]
                            font-semibold
                            rounded-full
                            bg-slate-700/50
                            text-slate-400
                            border
                            border-slate-600/50
                          "
                        >
                          <FaTimesCircle className="text-[10px]" />
                          غير نشط
                        </span>
                      )}
                    </td>

                    {/* Date */}
                    <td className="px-5 py-4">
                      <p className="text-xs font-semibold text-slate-400">
                        {formatDate(type.createdAt)}
                      </p>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-center gap-2">
                        {/* Edit */}
                        <button
                          type="button"
                          title="تعديل"
                          onClick={() => {
                            setSelectCaseType(type);
                            setOpenUpdateCaseType(true);
                          }}
                          className="flex items-center justify-center transition-all border rounded-lg w-9 h-9 text-emerald-400 bg-emerald-500/10 border-emerald-500/10 hover:bg-emerald-500 hover:text-white hover:shadow-md hover:shadow-emerald-950/30"
                        >
                          <FaEdit className="text-sm" />
                        </button>

                        {/* Delete */}
                        <button
                          type="button"
                          title="حذف"
                          onClick={() => {
                            setSelectCaseType(type);
                            setOpenDeleteCaseType(true);
                          }}
                          className="flex items-center justify-center transition-all border rounded-lg w-9 h-9 text-slate-400 bg-slate-800 border-slate-700 hover:bg-red-500 hover:text-white hover:border-red-500 hover:shadow-md hover:shadow-red-950/30"
                        >
                          <FaTrash className="text-sm" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">
                    <div
                      className="flex flex-col items-center justify-center py-16 text-center "
                    >
                      <div
                        className="flex items-center justify-center mb-4 border w-14 h-14 text-slate-500 rounded-2xl bg-slate-800 border-slate-700/60"
                      >
                        {search ? (
                          <FaSearch className="text-xl" />
                        ) : (
                          <FaInbox className="text-xl" />
                        )}
                      </div>

                      <h3 className="text-sm font-bold text-slate-300">
                        {search
                          ? "لم يتم العثور على نتائج"
                          : "لا توجد أنواع قضايا"}
                      </h3>

                      <p className="mt-1 text-xs text-slate-500">
                        {search
                          ? "جرّب البحث باستخدام اسم أو وصف مختلف"
                          : "لم تتم إضافة أي نوع قضية حتى الآن"}
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer / Pagination */}
        <div
          className="flex flex-col gap-4 px-5 py-4 border-t border-slate-700/60 sm:flex-row sm:items-center sm:justify-between"
        >
          {/* Results */}
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>
              عرض{" "}
              <span className="font-bold text-slate-300">
                {startItem}
              </span>{" "}
              إلى{" "}
              <span className="font-bold text-slate-300">
                {endItem}
              </span>{" "}
              من{" "}
              <span className="font-bold text-slate-300">
                {filteredCaseTypes.length}
              </span>
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {/* Items Per Page */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">
                عرض
              </span>

              <select
                value={itemsPerPage}
                onChange={(e) =>
                  setItemsPerPage(Number(e.target.value))
                }
                className="
                  px-2.5
                  py-2
                  text-xs
                  font-semibold
                  bg-slate-800
                  border
                  outline-none
                  cursor-pointer
                  rounded-lg
                  border-slate-700
                  text-slate-300

                  focus:border-emerald-500
                  focus:ring-2
                  focus:ring-emerald-500/10
                "
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center gap-1.5">
                {/* Previous */}
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage((prev) => prev - 1)
                  }
                  className="flex items-center justify-center text-xs transition-all border rounded-lg w-9 h-9 text-slate-400 border-slate-700 bg-slate-800 hover:bg-slate-700 hover:text-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <FaChevronRight />
                </button>

                {/* Pages */}
                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1,
                ).map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    className={`
                      flex items-center justify-center
                      w-9 h-9
                      text-xs
                      font-semibold
                      rounded-lg
                      transition-all

                      ${
                        currentPage === page
                          ? `
                            bg-emerald-500
                            text-white
                            shadow-md
                            shadow-emerald-950/30
                          `
                          : `
                            border
                            border-slate-700
                            bg-slate-800
                            text-slate-400

                            hover:bg-emerald-500/10
                            hover:text-emerald-400
                            hover:border-emerald-500/20
                          `
                      }
                    `}
                  >
                    {page}
                  </button>
                ))}

                {/* Next */}
                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((prev) => prev + 1)
                  }
                  className="flex items-center justify-center text-xs transition-all border rounded-lg w-9 h-9 text-slate-400 border-slate-700 bg-slate-800 hover:bg-slate-700 hover:text-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <FaChevronLeft />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;