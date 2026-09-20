"use client";

import React from "react";
import {
  FaTimes,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaBriefcase,
  FaCheckCircle,
  FaClock,
  FaGavel,
  FaCalendarAlt,
} from "react-icons/fa";

const FALLBACK_IMAGE = "/images/avatar-placeholder.png";

const Details = ({
  openDetails,
  setOpenDetails,
  selectedLawyer,
}) => {
  if (!openDetails || !selectedLawyer) return null;
  const getImage = () =>
    selectedLawyer?.profileImage?.url ||
    FALLBACK_IMAGE;

  const cases = Array.isArray(selectedLawyer?.cases)
    ? selectedLawyer.cases
    : [];

  const activeCases = cases.filter(
    (item) => item?.status === "active"
  );

  const judgedCases = cases.filter(
    (item) => item?.status === "judged"
  );

  const reservedCases = cases.filter(
    (item) =>
      item?.status === "reserved_for_judgment"
  );

  const caseStatus = {
    active: {
      label: "نشطة",
      className:
        "bg-green-50 text-green-600 border-green-100",
    },
    reserved_for_judgment: {
      label: "محجوزة للحكم",
      className:
        "bg-amber-50 text-amber-600 border-amber-100",
    },
    judged: {
      label: "تم الحكم",
      className:
        "bg-blue-50 text-blue-600 border-blue-100",
    },
  };

  const formatDate = (date) => {
    if (!date) return "غير محدد";

    try {
      return new Date(date).toLocaleDateString(
        "ar-EG",
        {
          year: "numeric",
          month: "short",
          day: "numeric",
        }
      );
    } catch {
      return "غير محدد";
    }
  };

  const handleClose = () => {
    setOpenDetails(false);
  };

  return (
    <div
      dir="rtl"
      className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        className="flex w-full max-w-3xl max-h-[90vh] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* =========================
            Header
        ========================= */}

        <div className="flex items-center justify-between px-6 py-5 bg-white border-b shrink-0 border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-800">
              تفاصيل المحامي
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              عرض بيانات المحامي والقضايا المسندة إليه
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="flex items-center justify-center transition rounded-lg h-9 w-9 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <FaTimes className="text-sm" />
          </button>
        </div>

        {/* =========================
            Body
        ========================= */}

        <div className="min-h-0 flex-1 overflow-y-auto bg-[#F8FAFD] p-6">

          {/* =========================
              Lawyer Profile
          ========================= */}

          <div className="p-5 bg-white border rounded-2xl border-slate-200">

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

              {/* Image */}

              <div className="relative shrink-0">
                <img
                  src={getImage()}
                  alt={
                    selectedLawyer.name ||
                    "المحامي"
                  }
                  className="object-cover w-20 h-20 border rounded-2xl border-slate-200"
                  onError={(e) => {
                    if (
                      !e.currentTarget.src.includes(
                        FALLBACK_IMAGE
                      )
                    ) {
                      e.currentTarget.src =
                        FALLBACK_IMAGE;
                    }
                  }}
                />

                <span
                  className={`absolute -bottom-1 -left-1 h-4 w-4 rounded-full border-2 border-white ${
                    selectedLawyer.isActive
                      ? "bg-green-500"
                      : "bg-slate-400"
                  }`}
                />
              </div>

              {/* Info */}

              <div className="flex-1 min-w-0">

                <div className="flex flex-wrap items-center gap-2">

                  <h3 className="text-lg font-bold text-slate-800">
                    {selectedLawyer.name ||
                      "بدون اسم"}
                  </h3>

                  <span
                    className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold ${
                      selectedLawyer.isActive
                        ? "border-green-100 bg-green-50 text-green-600"
                        : "border-slate-200 bg-slate-50 text-slate-500"
                    }`}
                  >
                    {selectedLawyer.isActive
                      ? "نشط"
                      : "غير نشط"}
                  </span>

                </div>

                <p className="mt-1 text-xs text-slate-400">
                  محامي في المكتب
                </p>

                <div className="flex flex-wrap gap-4 mt-3">

                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <FaEnvelope className="text-[11px] text-blue-500" />
                    <span>
                      {selectedLawyer.email ||
                        "لا يوجد بريد إلكتروني"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <FaPhone className="text-[11px] text-blue-500" />
                    <span>
                      {selectedLawyer.phone ||
                        "لا يوجد رقم هاتف"}
                    </span>
                  </div>

                </div>

              </div>
            </div>
          </div>

          {/* =========================
              Statistics
          ========================= */}

          <div className="grid grid-cols-2 gap-3 mt-4 md:grid-cols-4">

            <StatCard
              icon={<FaBriefcase />}
              label="إجمالي القضايا"
              value={cases.length}
              iconClass="bg-blue-50 text-blue-600"
            />

            <StatCard
              icon={<FaClock />}
              label="القضايا النشطة"
              value={activeCases.length}
              iconClass="bg-green-50 text-green-600"
            />

            <StatCard
              icon={<FaCalendarAlt />}
              label="محجوزة للحكم"
              value={reservedCases.length}
              iconClass="bg-amber-50 text-amber-600"
            />

            <StatCard
              icon={<FaCheckCircle />}
              label="تم الحكم"
              value={judgedCases.length}
              iconClass="bg-indigo-50 text-indigo-600"
            />

          </div>

          {/* =========================
              Cases
          ========================= */}

          <div className="mt-5 bg-white border rounded-2xl border-slate-200">

            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">

              <div>
                <h3 className="text-sm font-bold text-slate-800">
                  القضايا المسندة للمحامي
                </h3>

                <p className="mt-1 text-[11px] text-slate-400">
                  جميع القضايا المرتبطة بهذا المحامي
                </p>
              </div>

              <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold text-blue-600">
                {cases.length} قضية
              </span>

            </div>

            <div className="p-4">

              {cases.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 border border-dashed rounded-xl border-slate-200 bg-slate-50">

                  <div className="flex items-center justify-center bg-white rounded-full shadow-sm h-11 w-11 text-slate-300">
                    <FaGavel />
                  </div>

                  <p className="mt-3 text-xs font-semibold text-slate-500">
                    لا توجد قضايا مسندة
                  </p>

                  <p className="mt-1 text-[11px] text-slate-400">
                    لم يتم إسناد أي قضية لهذا المحامي حتى الآن
                  </p>

                </div>
              ) : (
                <div className="space-y-2">

                  {cases.map((caseItem) => {

                    const status =
                      caseStatus[
                        caseItem.status
                      ] || {
                        label:
                          caseItem.status ||
                          "غير محدد",
                        className:
                          "bg-slate-50 text-slate-500 border-slate-200",
                      };

                    return (
                      <div
                        key={
                          caseItem._id ||
                          caseItem.caseNumber
                        }
                        className="flex flex-col gap-3 p-3 transition border rounded-xl border-slate-100 bg-slate-50 hover:border-blue-100 hover:bg-blue-50/30 sm:flex-row sm:items-center"
                      >

                        {/* Case Icon */}

                        <div className="flex items-center justify-center w-10 h-10 text-blue-600 bg-white rounded-lg shrink-0">
                          <FaGavel className="text-sm" />
                        </div>

                        {/* Case Info */}

                        <div className="flex-1 min-w-0">

                          <div className="flex flex-wrap items-center gap-2">

                            <p className="text-sm font-semibold text-slate-700">
                              قضية رقم{" "}
                              {caseItem.caseNumber ||
                                "غير محدد"}
                            </p>

                            <span
                              className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${status.className}`}
                            >
                              {status.label}
                            </span>

                          </div>

                          <div className="flex flex-wrap mt-1 gap-x-4 gap-y-1">

                            <p className="text-[10px] text-slate-400">
                              المحكمة:{" "}
                              <span className="text-slate-500">
                                {caseItem.court ||
                                  "غير محددة"}
                              </span>
                            </p>

                            <p className="text-[10px] text-slate-400">
                              تاريخ القيد:{" "}
                              <span className="text-slate-500">
                                {formatDate(
                                  caseItem.filingDate
                                )}
                              </span>
                            </p>

                          </div>

                        </div>

                        {/* Hearing */}

                        <div className="text-right shrink-0 sm:text-left">

                          <p className="text-[10px] text-slate-400">
                            الجلسة القادمة
                          </p>

                          <p className="mt-1 text-xs font-semibold text-slate-600">
                            {formatDate(
                              caseItem.nextHearingDate
                            )}
                          </p>

                        </div>

                      </div>
                    );
                  })}

                </div>
              )}

            </div>
          </div>
        </div>

        {/* =========================
            Footer
        ========================= */}

        <div className="flex justify-end px-6 py-4 bg-white border-t shrink-0 border-slate-100">

          <button
            type="button"
            onClick={handleClose}
            className="h-10 px-6 text-sm font-semibold transition bg-white border rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50"
          >
            إغلاق
          </button>

        </div>
      </div>
    </div>
  );
};

/* =========================
   Stat Card
========================= */

const StatCard = ({
  icon,
  label,
  value,
  iconClass,
}) => {
  return (
    <div className="p-4 bg-white border rounded-2xl border-slate-200">

      <div className="flex items-center gap-3">

        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${iconClass}`}
        >
          <span className="text-xs">
            {icon}
          </span>
        </div>

        <div className="min-w-0">
          <p className="text-[10px] text-slate-400">
            {label}
          </p>

          <p className="mt-1 text-lg font-bold text-slate-800">
            {value}
          </p>
        </div>

      </div>
    </div>
  );
};

export default Details;