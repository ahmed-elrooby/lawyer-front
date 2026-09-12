"use client";

import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  FaBuilding,
  FaSearch,
  FaThLarge,
  FaTable,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaUserTie,
  FaCalendarAlt,
  FaEye,
  FaEdit,
  FaTrash,
  FaCheckCircle,
  FaTimesCircle,
  FaChevronRight,
  FaChevronLeft,
  FaFilter,
} from "react-icons/fa";

import { AdminContext } from "../../../../../Providers/AdminContext/Admin.js";
import DeleteOffice from "./DeleteOffice.jsx";
import Details from "./Details.jsx";
import UpdateOffice from "./UpdateOffice.jsx";

const ITEMS_PER_PAGE = 6;

const OfficesData = () => {
  const {
    offices,
    openDeleteOffice,
    setOpenDeleteOffice,
    openUpdateOffice,
    setOpenUpdateOffice,
  } = useContext(AdminContext);
  const [office, setOffice] = useState(null);
  const [openDetails, setOpenDetails] = useState(false);

  const [viewMode, setViewMode] = useState("cards");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  // -----------------------------------------
  // Normalize offices data
  // -----------------------------------------
  const officesList = useMemo(() => {
    if (Array.isArray(offices)) {
      return offices;
    }

    if (Array.isArray(offices?.office)) {
      return offices.office;
    }

    return [];
  }, [offices]);

  // -----------------------------------------
  // Restore saved view
  // -----------------------------------------
  useEffect(() => {
    const savedView = localStorage.getItem("offices-view");

    if (savedView === "cards" || savedView === "table") {
      setViewMode(savedView);
    }
  }, []);

  const changeView = (mode) => {
    setViewMode(mode);
    localStorage.setItem("offices-view", mode);
    setCurrentPage(1);
  };

  // -----------------------------------------
  // Search + Filter
  // -----------------------------------------
  const filteredOffices = useMemo(() => {
    const query = search.trim().toLowerCase();

    return officesList.filter((office) => {
      const matchesSearch =
        !query ||
        office?.name?.toLowerCase().includes(query) ||
        office?.email?.toLowerCase().includes(query) ||
        office?.phone?.toLowerCase().includes(query) ||
        office?.city?.toLowerCase().includes(query) ||
        office?.address?.toLowerCase().includes(query) ||
        office?.Owner_id?.name?.toLowerCase().includes(query);

      return matchesSearch;
    });
  }, [officesList, search]);

  // -----------------------------------------
  // Pagination
  // -----------------------------------------
  const totalPages = Math.max(
    1,
    Math.ceil(filteredOffices.length / ITEMS_PER_PAGE),
  );

  const paginatedOffices = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;

    return filteredOffices.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredOffices, currentPage]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter]);

  // -----------------------------------------
  // Helpers
  // -----------------------------------------
  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("ar-EG", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getInitial = (name) => {
    return name?.trim()?.charAt(0)?.toUpperCase() || "م";
  };

  // -----------------------------------------
  // Loading / Empty
  // -----------------------------------------
  if (!offices && offices !== null) {
    return (
      <section className="mt-6 overflow-hidden bg-white border border-gray-200 shadow-sm rounded-3xl">
        <div className="p-6 animate-pulse">
          <div className="w-48 h-8 mb-6 bg-gray-200 rounded-lg" />

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="bg-gray-100 h-72 rounded-2xl" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {openDeleteOffice && <DeleteOffice office={office} />}
      {openDetails && (
        <Details
          office={office}
          setOpenDetails={setOpenDetails}
          openDetails={openDetails}
        />
      )}
      {openUpdateOffice && <UpdateOffice office={office} />}
      <section className="mt-6 overflow-hidden bg-white border shadow-sm rounded-3xl border-gray-200/80">
        {/* =========================================================
          HEADER
      ========================================================= */}
        <div className="p-5 border-b border-gray-100 sm:p-6">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            {/* Title */}
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center text-blue-600 h-11 w-11 shrink-0 rounded-2xl bg-blue-50">
                <FaBuilding className="text-lg" />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-lg font-bold text-gray-800">
                    جميع المكاتب
                  </h2>

                  <span className="rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-bold text-gray-500">
                    {filteredOffices.length} مكتب
                  </span>
                </div>

                <p className="mt-1 text-xs text-gray-500">
                  إدارة واستعراض المكاتب المسجلة على المنصة
                </p>
              </div>
            </div>

            {/* View Toggle */}
            <div className="flex items-center w-full p-1 border border-gray-200 rounded-xl bg-gray-50 sm:w-fit">
              <button
                type="button"
                onClick={() => changeView("cards")}
                className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition-all sm:flex-none ${
                  viewMode === "cards"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <FaThLarge />
                <span>كروت</span>
              </button>

              <button
                type="button"
                onClick={() => changeView("table")}
                className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition-all sm:flex-none ${
                  viewMode === "table"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <FaTable />
                <span>جدول</span>
              </button>
            </div>
          </div>

          {/* =========================================================
            SEARCH + FILTER
        ========================================================= */}
          <div className="flex flex-col gap-3 mt-5 lg:flex-row">
            {/* Search */}
            <div className="relative flex-1">
              <FaSearch className="absolute text-sm text-gray-400 -translate-y-1/2 right-4 top-1/2" />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="ابحث باسم المكتب، المالك، الهاتف، البريد أو المدينة..."
                className="w-full h-12 pl-4 text-sm text-gray-700 transition-all border border-gray-200 outline-none rounded-xl bg-gray-50 pr-11 placeholder:text-gray-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute p-1 text-gray-400 transition -translate-y-1/2 rounded-full left-3 top-1/2 hover:bg-gray-100 hover:text-gray-600"
                >
                  ×
                </button>
              )}
            </div>
          </div>
        </div>

        {/* =========================================================
          CONTENT
      ========================================================= */}
        <div className="p-5 sm:p-6">
          {paginatedOffices.length === 0 ? (
            <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50/50 px-6 text-center">
              <div className="flex items-center justify-center w-16 h-16 mb-4 text-gray-400 bg-gray-100 rounded-2xl">
                <FaBuilding className="text-2xl" />
              </div>

              <h3 className="text-base font-bold text-gray-700">
                لا توجد مكاتب
              </h3>

              <p className="max-w-sm mt-1 text-sm text-gray-400">
                لم يتم العثور على مكاتب تطابق البحث أو الفلتر المحدد.
              </p>

              {(search || statusFilter !== "all") && (
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setStatusFilter("all");
                  }}
                  className="px-4 py-2 mt-4 text-xs font-bold text-blue-600 transition rounded-xl bg-blue-50 hover:bg-blue-100"
                >
                  إعادة ضبط البحث
                </button>
              )}
            </div>
          ) : viewMode === "cards" ? (
            /* =====================================================
             CARDS
          ===================================================== */
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {paginatedOffices.map((office) => {
                const isActive = office?.isActive === true;

                return (
                  <article
                    key={office?._id}
                    className="relative overflow-hidden transition-all duration-300 bg-white border border-gray-200 group rounded-2xl hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/10"
                  >
                    {/* Top Accent */}
                    <div
                      className={`absolute inset-x-0 top-0 h-1 ${
                        isActive
                          ? "bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-400"
                          : "bg-gray-300"
                      }`}
                    />

                    <div className="p-5">
                      {/* Top */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center min-w-0 gap-3">
                          <div className="relative flex items-center justify-center w-12 h-12 text-lg font-extrabold text-blue-600 shrink-0 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 ring-1 ring-blue-100">
                            {getInitial(office?.name)}

                            <span
                              className={`absolute -bottom-0.5 -left-0.5 h-3 w-3 rounded-full border-2 border-white ${
                                isActive ? "bg-emerald-500" : "bg-gray-400"
                              }`}
                            />
                          </div>

                          <div className="min-w-0">
                            <h3
                              className="text-sm font-bold text-gray-800 truncate"
                              title={office?.name}
                            >
                              {office?.name || "مكتب بدون اسم"}
                            </h3>

                            <p className="mt-1 text-[11px] text-gray-400">
                              #{office?._id?.slice(-6)}
                            </p>
                          </div>
                        </div>

                        {/* Status */}
                        <span
                          className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[10px] font-bold ${
                            isActive
                              ? "bg-emerald-50 text-emerald-600"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {isActive ? (
                            <FaCheckCircle className="text-[9px]" />
                          ) : (
                            <FaTimesCircle className="text-[9px]" />
                          )}

                          {isActive ? "نشط" : "غير نشط"}
                        </span>
                      </div>

                      {/* Owner */}
                      <div className="p-3 mt-5 border border-gray-100 rounded-xl bg-gray-50/70">
                        <div className="flex items-center gap-2.5">
                          <div className="flex items-center justify-center w-8 h-8 text-blue-500 bg-white rounded-lg shadow-sm">
                            <FaUserTie className="text-xs" />
                          </div>

                          <div className="min-w-0">
                            <p className="text-[10px] font-medium text-gray-400">
                              مالك المكتب
                            </p>

                            <p className="mt-0.5 truncate text-xs font-bold text-gray-700">
                              {office?.Owner_id?.name || "غير محدد"}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="mt-4 space-y-2.5">
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <div className="flex items-center justify-center w-8 h-8 text-blue-500 rounded-lg shrink-0 bg-blue-50">
                            <FaPhone className="text-[10px]" />
                          </div>

                          <span dir="ltr" className="truncate">
                            {office?.phone || "غير متوفر"}
                          </span>
                        </div>

                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <div className="flex items-center justify-center w-8 h-8 text-indigo-500 rounded-lg shrink-0 bg-indigo-50">
                            <FaEnvelope className="text-[10px]" />
                          </div>

                          <span className="truncate">
                            {office?.email || "غير متوفر"}
                          </span>
                        </div>

                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <div className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0 bg-amber-50 text-amber-500">
                            <FaMapMarkerAlt className="text-[10px]" />
                          </div>

                          <span className="truncate">
                            {office?.city || "غير محدد"}
                            {office?.address ? ` — ${office.address}` : ""}
                          </span>
                        </div>

                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <div className="flex items-center justify-center w-8 h-8 text-gray-500 bg-gray-100 rounded-lg shrink-0">
                            <FaCalendarAlt className="text-[10px]" />
                          </div>

                          <span>أُضيف في {formatDate(office?.createdAt)}</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 pt-4 mt-5 border-t border-gray-100">
                        <button
                          type="button"
                          onClick={() => {
                            setOffice(office);
                            setOpenDetails(true);
                          }}
                          className="flex items-center justify-center flex-1 h-10 gap-2 text-xs font-bold text-gray-600 transition rounded-xl bg-gray-50 hover:bg-blue-50 hover:text-blue-600"
                        >
                          <FaEye />
                          عرض
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setOffice(office);
                            setOpenUpdateOffice(true);
                          }}
                          className="flex items-center justify-center w-10 h-10 text-blue-600 transition rounded-xl bg-blue-50 hover:bg-blue-100"
                          title="تعديل"
                        >
                          <FaEdit className="text-xs" />
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setOffice(office);
                            setOpenDeleteOffice(true);
                          }}
                          className="flex items-center justify-center w-10 h-10 text-red-500 transition rounded-xl bg-red-50 hover:bg-red-100"
                          title="حذف"
                        >
                          <FaTrash className="text-xs" />
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            /* =====================================================
             TABLE
          ===================================================== */
            <div className="overflow-hidden border border-gray-200 rounded-2xl">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1000px] text-right">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50/80">
                      <th className="px-5 py-4 text-xs font-bold text-gray-500">
                        المكتب
                      </th>

                      <th className="px-5 py-4 text-xs font-bold text-gray-500">
                        المالك
                      </th>

                      <th className="px-5 py-4 text-xs font-bold text-gray-500">
                        التواصل
                      </th>

                      <th className="px-5 py-4 text-xs font-bold text-gray-500">
                        الموقع
                      </th>

                      <th className="px-5 py-4 text-xs font-bold text-gray-500">
                        الحالة
                      </th>

                      <th className="px-5 py-4 text-xs font-bold text-gray-500">
                        تاريخ الإنشاء
                      </th>

                      <th className="px-5 py-4 text-xs font-bold text-gray-500">
                        الإجراءات
                      </th>
                    </tr>
                  </thead>

                  <tbody className="bg-white divide-y divide-gray-100">
                    {paginatedOffices.map((office) => {
                      const isActive = office?.isActive === true;

                      return (
                        <tr
                          key={office?._id}
                          className="transition group hover:bg-blue-50/30"
                        >
                          {/* Office */}
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center justify-center w-10 h-10 font-bold text-blue-600 shrink-0 rounded-xl bg-blue-50">
                                {getInitial(office?.name)}
                              </div>

                              <div className="min-w-0">
                                <p className="max-w-[200px] truncate text-xs font-bold text-gray-800">
                                  {office?.name || "—"}
                                </p>

                                <p className="mt-1 text-[10px] text-gray-400">
                                  #{office?._id?.slice(-6)}
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* Owner */}
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-2">
                              <FaUserTie className="text-xs text-gray-400" />

                              <span className="text-xs font-medium text-gray-600">
                                {office?.Owner_id?.name || "غير محدد"}
                              </span>
                            </div>
                          </td>

                          {/* Contact */}
                          <td className="px-5 py-4">
                            <div className="space-y-1.5">
                              <div
                                dir="ltr"
                                className="flex items-center justify-end gap-2 text-[11px] text-gray-600"
                              >
                                <span>{office?.phone || "—"}</span>
                                <FaPhone className="text-[9px] text-blue-400" />
                              </div>

                              <div className="flex max-w-[190px] items-center justify-end gap-2 text-[11px] text-gray-500">
                                <span className="truncate">
                                  {office?.email || "—"}
                                </span>
                                <FaEnvelope className="shrink-0 text-[9px] text-indigo-400" />
                              </div>
                            </div>
                          </td>

                          {/* Location */}
                          <td className="px-5 py-4">
                            <div className="flex items-start gap-2">
                              <FaMapMarkerAlt className="mt-0.5 text-xs text-amber-500" />

                              <div>
                                <p className="text-xs font-semibold text-gray-600">
                                  {office?.city || "—"}
                                </p>

                                <p className="mt-1 max-w-[160px] truncate text-[10px] text-gray-400">
                                  {office?.address || "—"}
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* Status */}
                          <td className="px-5 py-4">
                            <span
                              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-bold ${
                                isActive
                                  ? "bg-emerald-50 text-emerald-600"
                                  : "bg-gray-100 text-gray-500"
                              }`}
                            >
                              <span
                                className={`h-1.5 w-1.5 rounded-full ${
                                  isActive ? "bg-emerald-500" : "bg-gray-400"
                                }`}
                              />

                              {isActive ? "نشط" : "غير نشط"}
                            </span>
                          </td>

                          {/* Date */}
                          <td className="px-5 py-4">
                            <span className="text-xs font-medium text-gray-500">
                              {formatDate(office?.createdAt)}
                            </span>
                          </td>

                          {/* Actions */}
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => {
                                  setOffice(office);
                                  setOpenDetails(true);
                                }}
                                className="flex items-center justify-center w-8 h-8 text-gray-500 transition rounded-lg bg-gray-50 hover:bg-blue-50 hover:text-blue-600"
                                title="عرض"
                              >
                                <FaEye className="text-[11px]" />
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  setOffice(office);
                                  setOpenUpdateOffice(true);
                                }}
                                className="flex items-center justify-center w-8 h-8 text-blue-600 transition rounded-lg bg-blue-50 hover:bg-blue-100"
                                title="تعديل"
                              >
                                <FaEdit className="text-[11px]" />
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  setOffice(office);
                                  setOpenDeleteOffice(true);
                                }}
                                className="flex items-center justify-center w-8 h-8 text-red-500 transition rounded-lg bg-red-50 hover:bg-red-100"
                                title="حذف"
                              >
                                <FaTrash className="text-[11px]" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* =========================================================
          PAGINATION
      ========================================================= */}
        {filteredOffices.length > 0 && (
          <div className="px-5 py-4 border-t border-gray-100 bg-gray-50/40 sm:px-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-gray-500">
                عرض{" "}
                <span className="font-bold text-gray-700">
                  {(currentPage - 1) * ITEMS_PER_PAGE + 1}
                </span>{" "}
                إلى{" "}
                <span className="font-bold text-gray-700">
                  {Math.min(
                    currentPage * ITEMS_PER_PAGE,
                    filteredOffices.length,
                  )}
                </span>{" "}
                من{" "}
                <span className="font-bold text-gray-700">
                  {filteredOffices.length}
                </span>{" "}
                مكتب
              </p>

              <div className="flex items-center justify-center gap-1.5">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }
                  className="flex items-center justify-center text-gray-500 transition bg-white border border-gray-200 rounded-lg h-9 w-9 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <FaChevronRight className="text-[10px]" />
                </button>

                {Array.from({ length: totalPages }, (_, index) => index + 1)
                  .slice(
                    Math.max(0, currentPage - 3),
                    Math.min(totalPages, currentPage + 2),
                  )
                  .map((page) => (
                    <button
                      key={page}
                      type="button"
                      onClick={() => setCurrentPage(page)}
                      className={`flex h-9 min-w-9 items-center justify-center rounded-lg px-2 text-xs font-bold transition ${
                        currentPage === page
                          ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                          : "border border-gray-200 bg-white text-gray-500 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                  }
                  className="flex items-center justify-center text-gray-500 transition bg-white border border-gray-200 rounded-lg h-9 w-9 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <FaChevronLeft className="text-[10px]" />
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default OfficesData;
