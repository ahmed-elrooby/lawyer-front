"use client";

import React, { useContext, useMemo, useState } from "react";
import {
  FaEye,
  FaEdit,
  FaTrash,
  FaGavel,
  FaUser,
  FaCalendarAlt,
  FaUniversity,
  FaSearch,
  FaChevronRight,
  FaChevronLeft,
  FaInbox,
  FaFileAlt,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";

import { LawyerContext } from "../../../../../Providers/LawyerContext/lawyer.js";
import CaseDetails from "./CaseDetails.jsx";
import UpdateCase from "./UpdateCase.jsx";
import DeleteCase from "./DeleteCase.jsx";
import { useQuery } from "@tanstack/react-query";

const CasesList = () => {
  const {
    cases = [],
    openUpdateCase,
    setOpenUpdateCase,
    openDeleteCase,
    getTimeline,
    setOpenDeleteCase,
  } = useContext(LawyerContext);

  const [openDetails, setOpenDetails] = useState(false);
  const [selectCase, setSelectCase] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: timeline = [],
    isLoading: timelineLoading,
  } = useQuery({
    queryKey: ["timeline", selectCase?._id],
    queryFn: () => getTimeline(selectCase._id),
    enabled: !!selectCase?._id && openDetails,
  });

  const casesPerPage = 6;

  // =========================
  // Status
  // =========================
  const getStatus = (status) => {
    switch (status) {
      case "active":
        return {
          label: "نشطة",
          className: "bg-emerald-500/10 text-emerald-400",
        };

      case "reserved_for_judgment":
        return {
          label: "محجوزة للحكم",
          className: "bg-amber-500/10 text-amber-400",
        };

      case "judged":
        return {
          label: "تم الحكم",
          className: "bg-blue-500/10 text-blue-400",
        };

      default:
        return {
          label: "غير محددة",
          className: "bg-slate-500/10 text-slate-400",
        };
    }
  };

  // =========================
  // Search
  // =========================
  const filteredCases = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) {
      return cases;
    }

    return cases.filter((caseItem) => {
      const caseNumber = String(
        caseItem.caseNumber || ""
      ).toLowerCase();

      const clientName = String(
        caseItem.clientId?.name || ""
      ).toLowerCase();

      const clientPhone = String(
        caseItem.clientId?.phone || ""
      ).toLowerCase();

      const court = String(
        caseItem.court || ""
      ).toLowerCase();

      const lawyers = (caseItem.lawyers || [])
        .map((lawyer) => lawyer?.name || "")
        .join(" ")
        .toLowerCase();

      return (
        caseNumber.includes(value) ||
        clientName.includes(value) ||
        clientPhone.includes(value) ||
        court.includes(value) ||
        lawyers.includes(value)
      );
    });
  }, [cases, search]);

  // =========================
  // Pagination
  // =========================
  const totalPages = Math.ceil(
    filteredCases.length / casesPerPage
  );

  const currentCases = useMemo(() => {
    const startIndex =
      (currentPage - 1) * casesPerPage;

    const endIndex = startIndex + casesPerPage;

    return filteredCases.slice(startIndex, endIndex);
  }, [filteredCases, currentPage]);

  // =========================
  // Search
  // =========================
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  // =========================
  // Previous
  // =========================
  const handlePrevious = () => {
    setCurrentPage((prev) =>
      Math.max(prev - 1, 1)
    );
  };

  // =========================
  // Next
  // =========================
  const handleNext = () => {
    setCurrentPage((prev) =>
      Math.min(prev + 1, totalPages)
    );
  };

  // =========================
  // No Cases
  // =========================
  if (!cases.length) {
    return (
      <div className="flex min-h-[250px] items-center justify-center rounded-2xl border border-slate-700 bg-slate-800/60">
        <div className="text-center">
          <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-xl bg-slate-700 text-slate-500">
            <FaGavel />
          </div>

          <p className="text-sm font-semibold text-slate-300">
            لا توجد قضايا
          </p>

          <p className="mt-1 text-xs text-slate-500">
            لم يتم العثور على أي قضايا لعرضها
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* =========================
          Search
      ========================= */}
      <div className="p-4 mb-5 border rounded-2xl border-slate-700 bg-slate-800/60">
        <div className="relative">
          <FaSearch className="absolute text-sm -translate-y-1/2 right-4 top-1/2 text-slate-500" />

          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="ابحث برقم القضية أو العميل أو المحامي أو المحكمة..."
            className="w-full py-3 pl-4 text-sm text-white transition-colors border outline-none rounded-xl border-slate-700 bg-slate-900/60 pr-11 placeholder:text-slate-500 focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center justify-between mt-3">
          <p className="text-xs text-slate-500">
            {search
              ? `تم العثور على ${filteredCases.length} قضية`
              : `إجمالي القضايا: ${cases.length}`}
          </p>

          {search && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setCurrentPage(1);
              }}
              className="text-xs font-medium transition-colors text-emerald-400 hover:text-emerald-300"
            >
              مسح البحث
            </button>
          )}
        </div>
      </div>

      {/* =========================
          No Search Results
      ========================= */}
      {!filteredCases.length ? (
        <div className="flex min-h-[250px] items-center justify-center rounded-2xl border border-slate-700 bg-slate-800/60">
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-xl bg-slate-700 text-slate-500">
              <FaInbox />
            </div>

            <p className="text-sm font-semibold text-slate-300">
              لا توجد نتائج
            </p>

            <p className="mt-1 text-xs text-slate-500">
              لم يتم العثور على قضية مطابقة للبحث
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* =========================
              Modals
          ========================= */}
          {openDetails && (
            <CaseDetails
              timeline={timeline}
              selectCase={selectCase}
              openDetails={openDetails}
              setOpenDetails={setOpenDetails}
            />
          )}

          {openUpdateCase && (
            <UpdateCase selectCase={selectCase} />
          )}

          {openDeleteCase && (
            <DeleteCase selectCase={selectCase} />
          )}

          {/* =========================
              Cases Grid
          ========================= */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {currentCases.map((caseItem) => {
              const status = getStatus(caseItem.status);

              const client = caseItem.clientId;

              const firstLawyer = caseItem.lawyers?.[0];

              const documentsCount =
                caseItem.documents?.length || 0;

              return (
                <div
                  key={caseItem._id}
                  className="overflow-hidden transition-all duration-300 border group rounded-2xl border-slate-700 bg-slate-800/60 hover:border-slate-600 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20"
                >
                  {/* =========================
                      Card Header
                  ========================= */}
                  <div className="flex items-start justify-between px-5 py-4 border-b border-slate-700/70">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400">
                        <FaGavel className="text-sm" />
                      </div>

                      <div>
                        <p className="text-[11px] text-slate-500">
                          رقم القضية
                        </p>

                        <p className="mt-0.5 text-sm font-bold text-white">
                          {caseItem.caseNumber || "—"}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`rounded-lg px-2.5 py-1.5 text-[11px] font-semibold ${status.className}`}
                    >
                      {status.label}
                    </span>
                  </div>

                  {/* =========================
                      Card Body
                  ========================= */}
                  <div className="px-5 py-4 space-y-4">
                    {/* =========================
                        Client
                    ========================= */}
                    <div className="p-3 rounded-xl bg-slate-900/40">
                      <div className="flex items-center gap-2 mb-3 text-slate-500">
                        <FaUser className="text-[10px]" />

                        <span className="text-[10px]">
                          العميل
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        {client?.profileImage?.url ? (
                          <img
                            src={client.profileImage.url}
                            alt={client?.name || "العميل"}
                            className="object-cover w-10 h-10 border rounded-full border-slate-700"
                          />
                        ) : (
                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-700 text-slate-400">
                            <FaUser />
                          </div>
                        )}

                        <div className="min-w-0">
                          <p className="text-xs font-semibold truncate text-slate-200">
                            {client?.name || "—"}
                          </p>

                          <div className="flex items-center gap-1 mt-1 text-[10px] text-slate-500">
                            <FaPhone />

                            <span dir="ltr">
                              {client?.phone || "لا يوجد رقم"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* =========================
                        Lawyer
                    ========================= */}
                    <div className="p-3 rounded-xl bg-slate-900/40">
                      <div className="flex items-center gap-2 mb-3 text-slate-500">
                        <FaGavel className="text-[10px]" />

                        <span className="text-[10px]">
                          المحامي
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        {firstLawyer?.profileImage?.url ? (
                          <img
                            src={firstLawyer.profileImage.url}
                            alt={firstLawyer?.name || "المحامي"}
                            className="object-cover w-10 h-10 border rounded-full border-slate-700"
                          />
                        ) : (
                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-700 text-slate-400">
                            <FaUser />
                          </div>
                        )}

                        <div className="min-w-0">
                          <p className="text-xs font-semibold truncate text-slate-200">
                            {firstLawyer?.name || "—"}
                          </p>

                          <div className="flex items-center gap-1 mt-1 text-[10px] text-slate-500">
                            <FaEnvelope />

                            <span className="truncate">
                              {firstLawyer?.email || "لا يوجد بريد"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {caseItem.lawyers?.length > 1 && (
                        <p className="mt-2 text-[10px] text-slate-500">
                          + {caseItem.lawyers.length - 1} محامي آخر
                        </p>
                      )}
                    </div>

                    {/* =========================
                        Court
                    ========================= */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center rounded-lg h-9 w-9 shrink-0 bg-slate-700/60 text-slate-400">
                        <FaUniversity className="text-xs" />
                      </div>

                      <div className="min-w-0">
                        <p className="text-[10px] text-slate-500">
                          المحكمة
                        </p>

                        <p className="text-xs font-semibold truncate text-slate-300">
                          {caseItem.court || "—"}
                        </p>
                      </div>
                    </div>

                    {/* =========================
                        Filing Date
                    ========================= */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center rounded-lg h-9 w-9 shrink-0 bg-slate-700/60 text-slate-400">
                        <FaCalendarAlt className="text-xs" />
                      </div>

                      <div>
                        <p className="text-[10px] text-slate-500">
                          تاريخ رفع القضية
                        </p>

                        <p className="text-xs font-semibold text-slate-300">
                          {caseItem.filingDate
                            ? new Date(
                                caseItem.filingDate
                              ).toLocaleDateString("ar-EG")
                            : "—"}
                        </p>
                      </div>
                    </div>

                    {/* =========================
                        Next Hearing
                    ========================= */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center rounded-lg h-9 w-9 shrink-0 bg-amber-500/10 text-amber-400">
                        <FaCalendarAlt className="text-xs" />
                      </div>

                      <div>
                        <p className="text-[10px] text-slate-500">
                          الجلسة القادمة
                        </p>

                        <p className="text-xs font-semibold text-slate-300">
                          {caseItem.nextHearingDate
                            ? new Date(
                                caseItem.nextHearingDate
                              ).toLocaleDateString("ar-EG")
                            : "لا توجد جلسة محددة"}
                        </p>
                      </div>
                    </div>

                    {/* =========================
                        Documents
                    ========================= */}
                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/40">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-8 h-8 text-blue-400 rounded-lg bg-blue-500/10">
                          <FaFileAlt className="text-xs" />
                        </div>

                        <div>
                          <p className="text-[10px] text-slate-500">
                            المستندات
                          </p>

                          <p className="text-xs font-semibold text-slate-300">
                            {documentsCount} مستند
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* =========================
                      Footer
                  ========================= */}
                  <div className="flex items-center justify-between px-5 py-3 border-t border-slate-700/70 bg-slate-900/20">
                    <span className="text-[10px] text-slate-500">
                      إجراءات القضية
                    </span>

                    <div className="flex items-center gap-2">
                      {/* View */}
                      <button
                        type="button"
                        onClick={() => {
                          setSelectCase(caseItem);
                          setOpenDetails(true);
                        }}
                        className="flex items-center justify-center w-8 h-8 text-blue-400 transition-colors rounded-lg bg-blue-500/10 hover:bg-blue-500/20"
                        title="عرض"
                      >
                        <FaEye className="text-xs" />
                      </button>

                      {/* Edit */}
                      <button
                        type="button"
                        onClick={() => {
                          setSelectCase(caseItem);
                          setOpenUpdateCase(true);
                        }}
                        className="flex items-center justify-center w-8 h-8 transition-colors rounded-lg bg-amber-500/10 text-amber-400 hover:bg-amber-500/20"
                        title="تعديل"
                      >
                        <FaEdit className="text-xs" />
                      </button>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() => {
                          setSelectCase(caseItem);
                          setOpenDeleteCase(true);
                        }}
                        className="flex items-center justify-center w-8 h-8 text-red-400 transition-colors rounded-lg bg-red-500/10 hover:bg-red-500/20"
                        title="حذف"
                      >
                        <FaTrash className="text-xs" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* =========================
              Pagination
          ========================= */}
          {totalPages > 1 && (
            <div className="flex flex-col items-center justify-between gap-4 px-5 py-4 mt-6 border rounded-2xl border-slate-700 bg-slate-800/60 sm:flex-row">
              <p className="text-xs text-slate-500">
                عرض{" "}
                <span className="font-semibold text-slate-300">
                  {(currentPage - 1) * casesPerPage + 1}
                </span>{" "}
                إلى{" "}
                <span className="font-semibold text-slate-300">
                  {Math.min(
                    currentPage * casesPerPage,
                    filteredCases.length
                  )}
                </span>{" "}
                من{" "}
                <span className="font-semibold text-slate-300">
                  {filteredCases.length}
                </span>
              </p>

              <div className="flex items-center gap-2">
                {/* Previous */}
                <button
                  type="button"
                  onClick={handlePrevious}
                  disabled={currentPage === 1}
                  className="flex items-center justify-center transition-colors border rounded-lg h-9 w-9 border-slate-700 bg-slate-900/50 text-slate-400 hover:border-slate-600 hover:bg-slate-700 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                  title="السابق"
                >
                  <FaChevronRight className="text-xs" />
                </button>

                {/* Page Numbers */}
                <div className="flex items-center gap-1">
                  {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1
                  ).map((page) => (
                    <button
                      key={page}
                      type="button"
                      onClick={() => setCurrentPage(page)}
                      className={`flex h-9 min-w-9 items-center justify-center rounded-lg px-2 text-xs font-semibold transition-colors ${
                        currentPage === page
                          ? "bg-emerald-600 text-white"
                          : "border border-slate-700 bg-slate-900/50 text-slate-400 hover:border-slate-600 hover:bg-slate-700 hover:text-white"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                {/* Next */}
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                  className="flex items-center justify-center transition-colors border rounded-lg h-9 w-9 border-slate-700 bg-slate-900/50 text-slate-400 hover:border-slate-600 hover:bg-slate-700 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                  title="التالي"
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

export default CasesList;