"use client";

import React, { useContext, useMemo } from "react";
import { TbZoomReplace } from "react-icons/tb";
import { OwnerContext } from "../../../../../Providers/LawyerOwner/OwnerProvider.js";

const OfficeEfficency = () => {
  const {
    cases = [],
    clients = [],
    lawyers = [],
    sessions = [],
  } = useContext(OwnerContext);

  const statistics = useMemo(() => {
    const now = new Date();

    const startOfMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      1
    );

    const startOfLastMonth = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      1
    );

    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - 7);

    // =========================
    // Case statistics
    // =========================

    const totalCases = cases.length;

    const judgedCases = cases.filter(
      (item) => item?.status === "judged"
    ).length;

    const closingRate =
      totalCases > 0
        ? Math.round((judgedCases / totalCases) * 100)
        : 0;

    const monthlyCases = cases.filter((item) => {
      const date = new Date(
        item?.createdAt || item?.filingDate
      );

      return !Number.isNaN(date.getTime()) && date >= startOfMonth;
    });

    const weeklyCases = cases.filter((item) => {
      const date = new Date(
        item?.createdAt || item?.filingDate
      );

      return !Number.isNaN(date.getTime()) && date >= startOfWeek;
    });

    const monthlyCasesCount = monthlyCases.length;
    const weeklyCasesCount = weeklyCases.length;

    // =========================
    // Sessions statistics
    // =========================

    const validSessions = sessions.filter(
      (session) => session?.status !== "cancelled"
    );

    const attendedSessions = sessions.filter(
      (session) => session?.status === "attended"
    ).length;

    const completedSessions = sessions.filter(
      (session) => session?.status === "completed"
    ).length;

    const postponedSessions = sessions.filter(
      (session) => session?.status === "postponed"
    ).length;

    const totalSessionResults =
      attendedSessions +
      completedSessions +
      postponedSessions;

    const attendanceRate =
      totalSessionResults > 0
        ? Math.round(
            ((attendedSessions + completedSessions) /
              totalSessionResults) *
              100
          )
        : 0;

    // =========================
    // Clients statistics
    // =========================

    const monthlyClients = clients.filter((client) => {
      const date = new Date(client?.createdAt);

      return (
        !Number.isNaN(date.getTime()) &&
        date >= startOfMonth
      );
    });

    const monthlyClientsCount = monthlyClients.length;

    const lastMonthClients = clients.filter((client) => {
      const date = new Date(client?.createdAt);

      return (
        !Number.isNaN(date.getTime()) &&
        date >= startOfLastMonth &&
        date < startOfMonth
      );
    });

    const clientGrowth =
      monthlyClientsCount - lastMonthClients.length;

    // =========================
    // Team activity
    // =========================

    const activeLawyers = lawyers.filter((lawyer) => {
      const lawyerId = String(lawyer?._id);

      const hasActiveCase = cases.some((item) => {
        if (item?.status !== "active") return false;

        const caseLawyers = Array.isArray(item?.lawyers)
          ? item.lawyers
          : [];

        return caseLawyers.some((caseLawyer) => {
          const id =
            typeof caseLawyer === "object"
              ? caseLawyer?._id
              : caseLawyer;

          return String(id) === lawyerId;
        });
      });

      const hasSession = sessions.some((session) => {
        const caseId =
          typeof session?.caseId === "object"
            ? session?.caseId?._id
            : session?.caseId;

        const relatedCase = cases.find(
          (item) => String(item?._id) === String(caseId)
        );

        if (!relatedCase) return false;

        const caseLawyers = Array.isArray(
          relatedCase?.lawyers
        )
          ? relatedCase.lawyers
          : [];

        return caseLawyers.some((caseLawyer) => {
          const id =
            typeof caseLawyer === "object"
              ? caseLawyer?._id
              : caseLawyer;

          return String(id) === lawyerId;
        });
      });

      return hasActiveCase || hasSession;
    }).length;

    const teamActivity =
      lawyers.length > 0
        ? Math.round(
            (activeLawyers / lawyers.length) * 100
          )
        : 0;

    return {
      closingRate,
      attendanceRate,
      monthlyCasesCount,
      weeklyCasesCount,
      monthlyClientsCount,
      clientGrowth,
      teamActivity,
    };
  }, [cases, clients, lawyers, sessions]);

  return (
    <section className="p-3 bg-white md:p-6 rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#E5EEFF]">
            <TbZoomReplace />
          </div>

          <div>
            <h3 className="text-[#0B1C30] text-[16px] font-bold">
              مؤشرات المكتب
            </h3>

            <p className="text-xs text-[#45464D]">
              معدلات الكفاءة الإجرائية ومقاييس النشاط الشهري
            </p>
          </div>
        </div>

        <p className="text-[#45464D] text-xs">
          تحديث فوري
        </p>
      </div>

      <div className="grid items-start grid-cols-2 gap-4 md:grid-cols-5">
        {/* معدل إغلاق القضايا */}
        <div className="space-y-2 rounded-xl bg-[#EFF4FF] p-3">
          <div className="flex items-center justify-between">
            <h3 className="text-[#45464D] text-xs">
              معدل إغلاق القضايا
            </h3>

            <h2 className="text-[#0B1C30] font-bold">
              {statistics.closingRate}%
            </h2>
          </div>

          <div className="h-2 rounded-lg bg-[#D3E4FE]">
            <p
              className="h-full bg-black rounded-lg"
              style={{
                width: `${statistics.closingRate}%`,
              }}
            />
          </div>

          <p className="text-[#545F73] text-xs">
            تسوية وأحكام قطعية
          </p>
        </div>

        {/* معدل حضور الجلسات */}
        <div className="space-y-2 rounded-xl bg-[#EFF4FF] p-3">
          <div className="flex items-center justify-between">
            <h3 className="text-[#45464D] text-xs">
              معدل حضور الجلسات
            </h3>

            <h2 className="text-[#0B1C30] font-bold">
              {statistics.attendanceRate}%
            </h2>
          </div>

          <div className="h-2 rounded-lg bg-[#D3E4FE]">
            <p
              className="h-full bg-black rounded-lg"
              style={{
                width: `${statistics.attendanceRate}%`,
              }}
            />
          </div>

          <p className="text-[#755B00] text-xs">
            الالتزام بالمواعيد القضائية
          </p>
        </div>

        {/* القضايا الجديدة */}
        <div className="space-y-2 rounded-xl bg-[#EFF4FF] p-3">
          <div className="flex items-center justify-between">
            <h3 className="text-[#45464D] text-xs">
              القضايا الجديدة
            </h3>

            <h2 className="text-[#0B1C30] font-bold">
              {statistics.monthlyCasesCount}
            </h2>
          </div>

          <div className="px-1.5 w-fit text-[#0B1C30] font-bold text-xs py-0.5 rounded-[4px] bg-[#E5EEFF]">
            +{statistics.weeklyCasesCount} هذا الأسبوع
          </div>

          <p className="text-[#45464D] text-xs">
            خلال الشهر الجاري
          </p>
        </div>

        {/* العملاء الجدد */}
        <div className="space-y-2 rounded-xl bg-[#EFF4FF] p-3">
          <div className="flex items-center justify-between">
            <h3 className="text-[#45464D] text-xs">
              العملاء الجدد
            </h3>

            <h2 className="text-[#0B1C30] font-bold">
              {statistics.monthlyClientsCount}
            </h2>
          </div>

          <div className="px-1.5 w-fit text-[#586377] font-bold text-xs py-0.5 rounded-[4px] bg-[#D5E0F8]">
            {statistics.clientGrowth >= 0 ? "+" : ""}
            {statistics.clientGrowth} من الشهر السابق
          </div>

          <p className="text-[#45464D] text-xs">
            خلال الشهر الجاري
          </p>
        </div>

        {/* نشاط الفريق */}
        <div className="space-y-2 rounded-xl bg-[#EFF4FF] p-3">
          <div className="flex items-center justify-between">
            <h3 className="text-[#45464D] text-xs">
              نشاط الفريق
            </h3>

            <h2 className="text-[#0B1C30] font-bold">
              {statistics.teamActivity}%
            </h2>
          </div>

          <div className="h-2 rounded-lg bg-[#D3E4FE]">
            <p
              className="h-full bg-[#545F73] rounded-lg"
              style={{
                width: `${statistics.teamActivity}%`,
              }}
            />
          </div>

          <p className="text-[#545F73] text-xs">
            معدل النشاط الحالي
          </p>
        </div>
      </div>
    </section>
  );
};

export default OfficeEfficency;