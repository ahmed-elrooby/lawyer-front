"use client";

import React, { useContext, useMemo } from "react";
import { OwnerContext } from "../../../../../Providers/LawyerOwner/OwnerProvider.js";

const OfficeStatistics = () => {
  const {
    cases = [],
    sessions = [],
    lawyers = [],
  } = useContext(OwnerContext);

  const statistics = useMemo(() => {
    const totalCases = Array.isArray(cases) ? cases.length : 0;
    const totalLawyers = Array.isArray(lawyers) ? lawyers.length : 0;
    const totalSessions = Array.isArray(sessions) ? sessions.length : 0;

    // معدل إغلاق القضايا
    const closedCases = Array.isArray(cases)
      ? cases.filter(
          (item) => item?.status === "judged"
        ).length
      : 0;

    const closingRate =
      totalCases > 0
        ? Math.round((closedCases / totalCases) * 100)
        : 0;

    // متوسط القضايا لكل محامي
    const averageCasesPerLawyer =
      totalLawyers > 0
        ? (totalCases / totalLawyers).toFixed(1)
        : "0.0";

    // معدل حضور الجلسات
    const attendedSessions = Array.isArray(sessions)
      ? sessions.filter(
          (item) =>
            item?.status === "attended" ||
            item?.status === "completed"
        ).length
      : 0;

    const attendanceRate =
      totalSessions > 0
        ? Math.round(
            (attendedSessions / totalSessions) * 100
          )
        : 0;

    // نشاط الفريق
    const activeLawyers = Array.isArray(lawyers)
      ? lawyers.filter(
          (item) => item?.isActive === true
        ).length
      : 0;

    const teamActivity =
      totalLawyers > 0
        ? Math.round(
            (activeLawyers / totalLawyers) * 100
          )
        : 0;

    return [
      {
        value: `${closingRate}%`,
        title: "معدل إغلاق القضايا",
        subtitle: "من إجمالي القضايا",
        valueClass: "text-emerald-600",
      },
      {
        value: averageCasesPerLawyer,
        title: "متوسط القضايا لكل محامي",
        subtitle: `من أصل ${totalLawyers} محامي`,
        valueClass: "text-slate-900",
      },
      {
        value: `${attendanceRate}%`,
        title: "معدل حضور الجلسات",
        subtitle: "من إجمالي الجلسات",
        valueClass: "text-amber-600",
      },
      {
        value: `${teamActivity}%`,
        title: "نشاط الفريق",
        subtitle: "معدل النشاط الحالي",
        valueClass: "text-blue-600",
      },
    ];
  }, [cases, sessions, lawyers]);

  return (
    <section className="mb-6 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
      {statistics.map((stat) => (
        <div
          key={stat.title}
          className="p-3 text-center bg-white rounded-xl shadow-soft fade-border"
        >
          <div
            className={`text-lg font-extrabold ${stat.valueClass}`}
          >
            {stat.value}
          </div>

          <div className="text-[8px] font-bold text-slate-700">
            {stat.title}
          </div>

          <div className="mt-1 text-[7px] text-slate-400">
            {stat.subtitle}
          </div>
        </div>
      ))}
    </section>
  );
};

export default OfficeStatistics;