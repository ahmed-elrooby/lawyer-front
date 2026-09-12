"use client";

import React, { useContext, useMemo, useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaEdit,
  FaEnvelope,
  FaEye,
  FaPhone,
  FaSearch,
  FaTable,
  FaThLarge,
  FaTrash,
  FaUserTie,
} from "react-icons/fa";

import { AdminContext } from "../../../../../Providers/AdminContext/Admin.js";
import DeleteLaywer from "./DeleteLaywer";
import Details from "./Details.jsx";
import UpdateLawyer from "./UpdateLawyer.jsx";

const LawyersList = () => {
  const {
    lawyers,
    setOpenAddLawyer,
    setOpenUpdateLawyer,
    openDeleteLawyer,
    setOpenDeleteLawyer,
    handleUpdateLawyerFun,
    openUpdateLawyer,
  } = useContext(AdminContext);

  const [viewMode, setViewMode] = useState("table");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [lawyer, setLawyer] = useState(null);
  const [openDetails, setOpenDetails] = useState(false);
  // =========================
  // Normalize Lawyers
  // =========================
  const lawyersList = useMemo(() => {
    if (Array.isArray(lawyers)) return lawyers;

    if (Array.isArray(lawyers?.lawyers)) {
      return lawyers.lawyers;
    }

    return [];
  }, [lawyers]);

  // =========================
  // Search
  // =========================
  const filteredLawyers = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) return lawyersList;

    return lawyersList.filter((lawyer) => {
      const name = lawyer?.name?.toLowerCase() || "";
      const email = lawyer?.email?.toLowerCase() || "";
      const phone = lawyer?.phone?.toLowerCase() || "";

      return (
        name.includes(value) || email.includes(value) || phone.includes(value)
      );
    });
  }, [lawyersList, search]);

  // =========================
  // Pagination
  // =========================
  const totalPages = Math.ceil(filteredLawyers.length / itemsPerPage);

  const safeCurrentPage =
    totalPages === 0 ? 1 : Math.min(currentPage, totalPages);

  const startIndex = (safeCurrentPage - 1) * itemsPerPage;

  const paginatedLawyers = filteredLawyers.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const startItem = filteredLawyers.length === 0 ? 0 : startIndex + 1;

  const endItem = Math.min(startIndex + itemsPerPage, filteredLawyers.length);

  // =========================
  // Helpers
  // =========================
  const isActive = (lawyer) => {
    return (
      lawyer?.isActive === true ||
      lawyer?.isActive === "true" ||
      lawyer?.status === "active"
    );
  };

  const getInitials = (name) => {
    if (!name) return "م";

    return name
      .trim()
      .split(" ")
      .slice(0, 2)
      .map((word) => word.charAt(0))
      .join("");
  };

  const handleSearch = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleItemsPerPage = (value) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1);
  };

  const formatDate = (date) => {
    if (!date) return "غير محدد";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "غير محدد";
    }

    return parsedDate.toLocaleDateString("ar-EG", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // =========================
  // Pagination Numbers
  // =========================
  const getPaginationNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    if (safeCurrentPage <= 3) {
      return [1, 2, 3, 4, "...", totalPages];
    }

    if (safeCurrentPage >= totalPages - 2) {
      return [
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      1,
      "...",
      safeCurrentPage - 1,
      safeCurrentPage,
      safeCurrentPage + 1,
      "...",
      totalPages,
    ];
  };

  return (
    <>
      {openDeleteLawyer && <DeleteLaywer lawyer={lawyer} />}
      <Details
        lawyer={lawyer}
        openDetails={openDetails}
        setOpenDetails={setOpenDetails}
      />
      {openUpdateLawyer && <UpdateLawyer lawyer={lawyer} />}
      <section className="overflow-hidden bg-white border shadow-sm rounded-2xl border-slate-200/80">
        {/* ================================= */}
        {/* Header */}
        {/* ================================= */}
        <div className="p-5 border-b border-slate-100">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            {/* Title */}
            <div>
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center text-blue-600 h-9 w-9 rounded-xl bg-blue-50">
                  <FaUserTie className="text-sm" />
                </div>

                <div>
                  <h2 className="text-base font-extrabold text-slate-800">
                    المحامين
                  </h2>

                  <p className="mt-0.5 text-[11px] text-slate-400">
                    إدارة ومتابعة جميع المحامين
                  </p>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col gap-3 sm:flex-row">
              {/* Search */}
              <div className="relative min-w-0 sm:w-72">
                <FaSearch className="absolute text-xs -translate-y-1/2 pointer-events-none right-3 top-1/2 text-slate-400" />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="ابحث بالاسم أو البريد أو الهاتف..."
                  className="w-full h-10 pl-3 text-xs font-medium transition-all border outline-none rounded-xl border-slate-200 bg-slate-50/70 pr-9 text-slate-700 placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                />
              </div>

              {/* View Toggle */}
              <div className="flex items-center h-10 p-1 border rounded-xl border-slate-200 bg-slate-50">
                <button
                  type="button"
                  onClick={() => setViewMode("table")}
                  className={`flex h-8 w-9 items-center justify-center rounded-lg transition ${
                    viewMode === "table"
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-slate-400 hover:text-slate-600"
                  }`}
                  title="عرض جدول"
                >
                  <FaTable className="text-xs" />
                </button>

                <button
                  type="button"
                  onClick={() => setViewMode("card")}
                  className={`flex h-8 w-9 items-center justify-center rounded-lg transition ${
                    viewMode === "card"
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-slate-400 hover:text-slate-600"
                  }`}
                  title="عرض بطاقات"
                >
                  <FaThLarge className="text-xs" />
                </button>
              </div>
            </div>
          </div>

          {/* Result summary */}
          <div className="flex flex-wrap items-center justify-between gap-3 mt-4">
            <p className="text-[11px] text-slate-400">
              عرض <span className="font-bold text-slate-600">{startItem}</span>{" "}
              إلى <span className="font-bold text-slate-600">{endItem}</span> من{" "}
              <span className="font-bold text-slate-600">
                {filteredLawyers.length}
              </span>{" "}
              محامي
            </p>

            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-400">عرض:</span>

              <select
                value={itemsPerPage}
                onChange={(e) => handleItemsPerPage(e.target.value)}
                className="h-8 px-2 text-xs font-bold bg-white border rounded-lg outline-none border-slate-200 text-slate-600 focus:border-blue-400"
              >
                <option value={8}>8</option>
                <option value={12}>12</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>
          </div>
        </div>

        {/* ================================= */}
        {/* Content */}
        {/* ================================= */}
        {paginatedLawyers.length > 0 ? (
          <>
            {/* ============================= */}
            {/* TABLE VIEW */}
            {/* ============================= */}
            {viewMode === "table" && (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[850px]">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/70">
                      <th className="px-5 py-4 text-right text-[11px] font-bold text-slate-400">
                        المحامي
                      </th>

                      <th className="px-5 py-4 text-right text-[11px] font-bold text-slate-400">
                        البريد الإلكتروني
                      </th>

                      <th className="px-5 py-4 text-right text-[11px] font-bold text-slate-400">
                        الهاتف
                      </th>

                      <th className="px-5 py-4 text-right text-[11px] font-bold text-slate-400">
                        الحالة
                      </th>

                      <th className="px-5 py-4 text-right text-[11px] font-bold text-slate-400">
                        تاريخ الانضمام
                      </th>

                      <th className="px-5 py-4 text-center text-[11px] font-bold text-slate-400">
                        الإجراءات
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {paginatedLawyers.map((lawyer, index) => {
                      const active = isActive(lawyer);

                      return (
                        <tr
                          key={lawyer?._id || lawyer?.id || index}
                          className="transition border-b group border-slate-100 last:border-0 hover:bg-slate-50/60"
                        >
                          {/* Lawyer */}
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              {lawyer?.profileImage?.url ? (
                                <img
                                  src={lawyer.profileImage.url}
                                  alt={lawyer?.name || "Lawyer"}
                                  className="object-cover w-10 h-10 rounded-xl ring-2 ring-slate-100"
                                />
                              ) : (
                                <div className="flex items-center justify-center w-10 h-10 text-xs font-extrabold text-white rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600">
                                  {getInitials(lawyer?.name)}
                                </div>
                              )}

                              <div className="min-w-0">
                                <p className="max-w-[180px] truncate text-sm font-bold text-slate-700">
                                  {lawyer?.name || "بدون اسم"}
                                </p>

                                <p className="mt-0.5 text-[10px] text-slate-400">
                                  محامي
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* Email */}
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-2 text-xs text-slate-500">
                              <FaEnvelope className="text-[10px] text-slate-300" />
                              <span className="max-w-[200px] truncate">
                                {lawyer?.email || "غير متوفر"}
                              </span>
                            </div>
                          </td>

                          {/* Phone */}
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-2 text-xs text-slate-500">
                              <FaPhone className="text-[10px] text-slate-300" />
                              <span dir="ltr">
                                {lawyer?.phone || "غير متوفر"}
                              </span>
                            </div>
                          </td>

                          {/* Status */}
                          <td className="px-5 py-4">
                            <span
                              className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-bold ${
                                active
                                  ? "bg-emerald-50 text-emerald-600"
                                  : "bg-slate-100 text-slate-500"
                              }`}
                            >
                              <span
                                className={`h-1.5 w-1.5 rounded-full ${
                                  active ? "bg-emerald-500" : "bg-slate-400"
                                }`}
                              />

                              {active ? "نشط" : "غير نشط"}
                            </span>
                          </td>

                          {/* Date */}
                          <td className="px-5 py-4">
                            <span className="text-xs font-medium text-slate-500">
                              {formatDate(lawyer?.createdAt)}
                            </span>
                          </td>

                          {/* Actions */}
                          <td className="px-5 py-4">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => {
                                  setLawyer(lawyer);
                                  setOpenDetails(true);
                                }}
                                type="button"
                                className="flex items-center justify-center w-8 h-8 text-indigo-600 transition rounded-lg bg-indigo-50 hover:bg-indigo-600 hover:text-white"
                                title="التفاصيل"
                              >
                                {" "}
                                <FaEye className="text-xs" />{" "}
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setLawyer(lawyer);
                                  setOpenUpdateLawyer(true);
                                }}
                                className="flex items-center justify-center w-8 h-8 text-blue-600 transition rounded-lg bg-blue-50 hover:bg-blue-600 hover:text-white"
                                title="تعديل"
                              >
                                <FaEdit className="text-xs" />
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  setLawyer(lawyer);
                                  setOpenDeleteLawyer(true);
                                }}
                                className="flex items-center justify-center w-8 h-8 text-red-500 transition rounded-lg bg-red-50 hover:bg-red-500 hover:text-white"
                                title="حذف"
                              >
                                <FaTrash className="text-xs" />
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

            {/* ============================= */}
            {/* CARD VIEW */}
            {/* ============================= */}
            {viewMode === "card" && (
              <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 xl:grid-cols-3">
                {paginatedLawyers.map((lawyer, index) => {
                  const active = isActive(lawyer);

                  return (
                    <div
                      key={lawyer?._id || lawyer?.id || index}
                      className="relative p-5 overflow-hidden transition-all duration-300 bg-white border group rounded-2xl border-slate-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-slate-200/50"
                    >
                      {/* Top glow */}
                      <div className="absolute w-24 h-24 transition rounded-full pointer-events-none -right-10 -top-10 bg-blue-500/10 blur-2xl group-hover:scale-150" />

                      <div className="relative">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            {lawyer?.profileImage?.url ? (
                              <img
                                src={lawyer.profileImage.url}
                                alt={lawyer?.name || "Lawyer"}
                                className="object-cover w-12 h-12 rounded-xl ring-2 ring-slate-100"
                              />
                            ) : (
                              <div className="flex items-center justify-center w-12 h-12 text-sm font-extrabold text-white rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600">
                                {getInitials(lawyer?.name)}
                              </div>
                            )}

                            <div className="min-w-0">
                              <h3 className="text-sm font-extrabold truncate text-slate-700">
                                {lawyer?.name || "بدون اسم"}
                              </h3>

                              <p className="mt-1 text-[10px] text-slate-400">
                                محامي
                              </p>
                            </div>
                          </div>

                          <span
                            className={`rounded-full px-2.5 py-1 text-[9px] font-bold ${
                              active
                                ? "bg-emerald-50 text-emerald-600"
                                : "bg-slate-100 text-slate-500"
                            }`}
                          >
                            {active ? "نشط" : "غير نشط"}
                          </span>
                        </div>

                        <div className="mt-5 space-y-3">
                          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50">
                            <div className="flex items-center justify-center w-8 h-8 bg-white rounded-lg shadow-sm shrink-0 text-slate-400">
                              <FaEnvelope className="text-[10px]" />
                            </div>

                            <div className="min-w-0">
                              <p className="text-[9px] text-slate-400">
                                البريد الإلكتروني
                              </p>

                              <p className="mt-0.5 truncate text-[11px] font-bold text-slate-600">
                                {lawyer?.email || "غير متوفر"}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50">
                            <div className="flex items-center justify-center w-8 h-8 bg-white rounded-lg shadow-sm shrink-0 text-slate-400">
                              <FaPhone className="text-[10px]" />
                            </div>

                            <div>
                              <p className="text-[9px] text-slate-400">
                                رقم الهاتف
                              </p>

                              <p
                                dir="ltr"
                                className="mt-0.5 text-[11px] font-bold text-slate-600"
                              >
                                {lawyer?.phone || "غير متوفر"}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100">
                          <span className="text-[10px] text-slate-400">
                            {formatDate(lawyer?.createdAt)}
                          </span>

                          <div className="flex items-center gap-2">
                            {/* التفاصيل */}
                            <button
                              type="button"
                              onClick={() => {
                                setLawyer(lawyer);
                                setOpenDetails(true);
                              }}
                              className="flex items-center justify-center w-8 h-8 text-indigo-600 transition rounded-lg bg-indigo-50 hover:bg-indigo-600 hover:text-white"
                              title="التفاصيل"
                            >
                              <FaEye className="text-xs" />
                            </button>

                            {/* التعديل */}
                            <button
                              type="button"
                              onClick={() => {
                                setLawyer(lawyer);
                                setOpenUpdateLawyer(true);
                              }}
                              className="flex items-center justify-center w-8 h-8 text-blue-600 transition rounded-lg bg-blue-50 hover:bg-blue-600 hover:text-white"
                              title="تعديل"
                            >
                              <FaEdit className="text-xs" />
                            </button>

                            {/* الحذف */}
                            <button
                              type="button"
                              onClick={() => {
                                setLawyer(lawyer);
                                setOpenDeleteLawyer(true);
                              }}
                              className="flex items-center justify-center w-8 h-8 text-red-500 transition rounded-lg bg-red-50 hover:bg-red-500 hover:text-white"
                              title="حذف"
                            >
                              <FaTrash className="text-xs" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* ================================= */}
            {/* Pagination */}
            {/* ================================= */}
            <div className="flex flex-col gap-4 px-5 py-4 border-t border-slate-100 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[11px] text-slate-400">
                الصفحة{" "}
                <span className="font-bold text-slate-600">
                  {safeCurrentPage}
                </span>{" "}
                من{" "}
                <span className="font-bold text-slate-600">
                  {totalPages || 1}
                </span>
              </p>

              <div className="flex items-center justify-center gap-1">
                {/* Previous */}
                <button
                  type="button"
                  disabled={safeCurrentPage === 1}
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  className="flex items-center justify-center w-8 h-8 transition border rounded-lg border-slate-200 text-slate-500 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <FaChevronRight className="text-[9px]" />
                </button>

                {/* Numbers */}
                {getPaginationNumbers().map((page, index) => {
                  if (page === "...") {
                    return (
                      <span
                        key={`dots-${index}`}
                        className="flex items-center justify-center w-8 h-8 text-xs text-slate-400"
                      >
                        ...
                      </span>
                    );
                  }

                  return (
                    <button
                      key={page}
                      type="button"
                      onClick={() => setCurrentPage(page)}
                      className={`flex h-8 min-w-8 items-center justify-center rounded-lg px-2 text-xs font-bold transition ${
                        safeCurrentPage === page
                          ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                          : "border border-slate-200 text-slate-500 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}

                {/* Next */}
                <button
                  type="button"
                  disabled={safeCurrentPage === totalPages || totalPages === 0}
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  className="flex items-center justify-center w-8 h-8 transition border rounded-lg border-slate-200 text-slate-500 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <FaChevronLeft className="text-[9px]" />
                </button>
              </div>
            </div>
          </>
        ) : (
          /* ================================= */
          /* Empty State */
          /* ================================= */
          <div className="flex min-h-[360px] flex-col items-center justify-center px-5 text-center">
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-50 text-slate-300">
              <FaSearch className="text-xl" />
            </div>

            <h3 className="mt-4 text-sm font-extrabold text-slate-700">
              {search ? "لم يتم العثور على نتائج" : "لا يوجد محامين"}
            </h3>

            <p className="max-w-sm mt-1 text-xs leading-6 text-slate-400">
              {search
                ? "جرب البحث باستخدام اسم مختلف أو البريد الإلكتروني أو رقم الهاتف."
                : "لم تتم إضافة أي محامين إلى النظام حتى الآن."}
            </p>

            {search ? (
              <button
                type="button"
                onClick={() => handleSearch("")}
                className="px-4 py-2 mt-4 text-xs font-bold text-blue-600 transition rounded-xl bg-blue-50 hover:bg-blue-100"
              >
                مسح البحث
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setOpenAddLawyer(true)}
                className="px-4 py-2 mt-4 text-xs font-bold text-white transition bg-blue-600 shadow-lg rounded-xl shadow-blue-500/20 hover:bg-blue-700"
              >
                إضافة أول محامي
              </button>
            )}
          </div>
        )}
      </section>
    </>
  );
};

export default LawyersList;
