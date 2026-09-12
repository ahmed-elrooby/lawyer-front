"use client";

import React, { useContext, useMemo } from "react";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaClock,
  FaPlus,
  FaUserTie,
  FaUsers,
} from "react-icons/fa";

import { AdminContext } from "../../../../../Providers/AdminContext/Admin.js";

const LawyerOverview = () => {
  const { lawyers, setOpenAddLawyer } = useContext(AdminContext);

  const lawyersList = useMemo(() => {
    if (Array.isArray(lawyers)) return lawyers;
    if (Array.isArray(lawyers?.lawyers)) return lawyers.lawyers;
    return [];
  }, [lawyers]);

  const stats = useMemo(() => {
    const total = lawyersList.length;

    const active = lawyersList.filter(
      (lawyer) =>
        lawyer?.isActive === true ||
        lawyer?.isActive === "true" ||
        lawyer?.status === "active",
    ).length;

    const inactive = total - active;

    const activePercentage = total ? Math.round((active / total) * 100) : 0;

    return {
      total,
      active,
      inactive,
      activePercentage,
    };
  }, [lawyersList]);

  const latestLawyers = useMemo(() => {
    return [...lawyersList]
      .sort((a, b) => {
        return new Date(b?.createdAt || 0) - new Date(a?.createdAt || 0);
      })
      .slice(0, 4);
  }, [lawyersList]);

  const getInitials = (name) => {
    if (!name) return "م";

    return name
      .trim()
      .split(" ")
      .slice(0, 2)
      .map((word) => word.charAt(0))
      .join("");
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

  return (
    <section className="mb-6">
      {/* Header */}
      <div className="flex flex-col gap-3 mb-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 bg-blue-600 rounded-full" />

            <span className="text-xs font-bold text-blue-600">نظرة عامة</span>
          </div>

          <h2 className="text-lg font-extrabold text-slate-800">
            فريق المحامين
          </h2>

          <p className="mt-1 text-xs text-slate-400">
            متابعة سريعة لحالة فريق المحامين وآخر الحسابات المضافة
          </p>
        </div>

        <button
          type="button"
          onClick={() => setOpenAddLawyer(true)}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-500/30"
        >
          <FaPlus className="text-xs" />
          إضافة محامي
        </button>
      </div>

      {/* Main Command Center */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[0.85fr_1.15fr]">
        {/* Team Status */}
        <div className="relative p-5 overflow-hidden transition-all duration-300 bg-white border shadow-sm group rounded-2xl border-slate-200/80 hover:shadow-lg">
          {/* Background glow */}
          <div className="absolute w-32 h-32 rounded-full pointer-events-none -left-12 -top-12 bg-blue-500/10 blur-3xl" />

          <div className="relative">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-400">
                  حالة الفريق
                </p>

                <h3 className="mt-1 text-base font-extrabold text-slate-800">
                  توزيع المحامين
                </h3>
              </div>

              <div className="flex items-center justify-center w-10 h-10 text-blue-600 rounded-xl bg-blue-50">
                <FaUsers />
              </div>
            </div>

            {/* Progress */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-500">
                  مستوى النشاط
                </span>

                <span className="text-sm font-extrabold text-blue-600">
                  {stats.activePercentage}%
                </span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full transition-all duration-700 rounded-full bg-gradient-to-r from-blue-600 to-indigo-500"
                  style={{
                    width: `${stats.activePercentage}%`,
                  }}
                />
              </div>
            </div>

            {/* Status cards */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              <div className="p-4 border rounded-xl border-emerald-100 bg-emerald-50/70">
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-8 h-8 bg-white rounded-lg shadow-sm text-emerald-600">
                    <FaCheckCircle className="text-sm" />
                  </div>

                  <span className="text-xs font-semibold text-emerald-700">
                    نشط
                  </span>
                </div>

                <div className="mt-3">
                  <span className="text-2xl font-extrabold text-slate-800">
                    {stats.active}
                  </span>

                  <span className="mr-1 text-[11px] text-slate-400">محامي</span>
                </div>
              </div>

              <div className="p-4 border rounded-xl border-amber-100 bg-amber-50/70">
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-8 h-8 bg-white rounded-lg shadow-sm text-amber-600">
                    <FaClock className="text-sm" />
                  </div>

                  <span className="text-xs font-semibold text-amber-700">
                    غير نشط
                  </span>
                </div>

                <div className="mt-3">
                  <span className="text-2xl font-extrabold text-slate-800">
                    {stats.inactive}
                  </span>

                  <span className="mr-1 text-[11px] text-slate-400">محامي</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 mt-5 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 text-slate-500">
                  <FaUserTie className="text-xs" />
                </div>

                <div>
                  <p className="text-[10px] text-slate-400">إجمالي الفريق</p>

                  <p className="text-sm font-extrabold text-slate-700">
                    {stats.total} محامي
                  </p>
                </div>
              </div>

              <span className="rounded-full bg-blue-50 px-3 py-1.5 text-[10px] font-bold text-blue-600">
                فريق المحامين
              </span>
            </div>
          </div>
        </div>

        {/* Latest Lawyers */}
        <div className="relative p-5 overflow-hidden transition-all duration-300 bg-white border shadow-sm rounded-2xl border-slate-200/80 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-400">
                نشاط الفريق
              </p>

              <h3 className="mt-1 text-base font-extrabold text-slate-800">
                آخر المحامين المنضمين
              </h3>
            </div>

            <div className="flex items-center justify-center w-10 h-10 text-indigo-600 rounded-xl bg-indigo-50">
              <FaUserTie />
            </div>
          </div>

          {latestLawyers.length > 0 ? (
            <div className="mt-5 space-y-2">
              {latestLawyers.map((lawyer, index) => {
                const isActive =
                  lawyer?.isActive === true ||
                  lawyer?.isActive === "true" ||
                  lawyer?.status === "active";

                return (
                  <div
                    key={lawyer?._id || lawyer?.id || index}
                    className="flex items-center justify-between p-3 transition-all duration-200 border border-transparent group/item rounded-xl hover:border-slate-100 hover:bg-slate-50"
                  >
                    <div className="flex items-center min-w-0 gap-3">
                      {/* Avatar */}
                      {lawyer?.profileImage?.url ? (
                        <img
                          src={lawyer.profileImage.url}
                          alt={lawyer?.name || "Lawyer"}
                          className="object-cover w-10 h-10 shrink-0 rounded-xl ring-2 ring-slate-100"
                        />
                      ) : (
                        <div className="flex items-center justify-center w-10 h-10 text-xs font-extrabold text-white shadow-sm shrink-0 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600">
                          {getInitials(lawyer?.name)}
                        </div>
                      )}

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-bold truncate text-slate-700">
                            {lawyer?.name || "محامي بدون اسم"}
                          </p>

                          <span
                            className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                              isActive ? "bg-emerald-500" : "bg-slate-300"
                            }`}
                          />
                        </div>

                        <p className="mt-0.5 truncate text-[11px] text-slate-400">
                          {lawyer?.email || "لا يوجد بريد إلكتروني"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mr-3 shrink-0">
                      <div className="hidden text-left sm:block">
                        <p className="text-[10px] text-slate-400">
                          تاريخ الانضمام
                        </p>

                        <p className="mt-0.5 text-[11px] font-bold text-slate-600">
                          {formatDate(lawyer?.createdAt)}
                        </p>
                      </div>

                      <div className="flex items-center justify-center transition-all rounded-lg h-7 w-7 bg-slate-50 text-slate-300 group-hover/item:bg-blue-50 group-hover/item:text-blue-600">
                        <FaArrowLeft className="text-[9px]" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex min-h-[220px] flex-col items-center justify-center text-center">
              <div className="flex items-center justify-center h-14 w-14 rounded-2xl bg-slate-50 text-slate-300">
                <FaUserTie className="text-xl" />
              </div>

              <p className="mt-3 text-sm font-bold text-slate-500">
                لا يوجد محامين حتى الآن
              </p>

              <p className="mt-1 text-xs text-slate-400">
                ابدأ بإضافة أول محامي للفريق
              </p>

              <button
                type="button"
                onClick={() => setOpenAddLawyer(true)}
                className="px-4 py-2 mt-4 text-xs font-bold text-blue-600 transition rounded-lg bg-blue-50 hover:bg-blue-100"
              >
                إضافة أول محامي
              </button>
            </div>
          )}

          {/* Bottom link */}
        </div>
      </div>
    </section>
  );
};

export default LawyerOverview;
