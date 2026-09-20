"use client";

import React, { useContext, useMemo } from "react";
import { BsPatchCheck } from "react-icons/bs";
import { HiOutlineTrendingUp } from "react-icons/hi";
import { LuFiles } from "react-icons/lu";
import { MdGavel } from "react-icons/md";
import { TbFileDescriptionFilled } from "react-icons/tb";

import { OwnerContext } from "../../../../../Providers/LawyerOwner/OwnerProvider.js";

const Cards = () => {
  const { cases = [] } = useContext(OwnerContext);

  const statistics = useMemo(() => {
    const totalCases = cases.length;

    // ==========================================
    // Active Cases
    // ==========================================

    const activeCases = cases.filter((item) => {
      if (item.isArchived) return false;

      return ![
        "closed",
        "completed",
        "judgment",
        "final_judgment",
      ].includes(item.status);
    });

    // ==========================================
    // Cases This Month
    // ==========================================

    const now = new Date();

    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const casesThisMonth = cases.filter((item) => {
      if (!item.filingDate) return false;

      const filingDate = new Date(item.filingDate);

      return (
        filingDate.getMonth() === currentMonth &&
        filingDate.getFullYear() === currentYear
      );
    });

    // ==========================================
    // Closed / Final Cases
    // ==========================================

    const closedCases = cases.filter((item) => {
      return [
        "closed",
        "completed",
        "judgment",
        "final_judgment",
      ].includes(item.status);
    });

    // ==========================================
    // Active Percentage
    // ==========================================

    const activePercentage =
      totalCases > 0
        ? Math.round((activeCases.length / totalCases) * 100)
        : 0;

    // ==========================================
    // Closed Percentage
    // ==========================================

    const closedPercentage =
      totalCases > 0
        ? Math.round((closedCases.length / totalCases) * 100)
        : 0;

    return {
      totalCases,
      activeCases: activeCases.length,
      casesThisMonth: casesThisMonth.length,
      closedCases: closedCases.length,
      activePercentage,
      closedPercentage,
    };
  }, [cases]);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">

      {/* ==========================================
          Total Cases
      ========================================== */}

      <div className="relative p-4 overflow-hidden transition-all duration-300 bg-white shadow-sm rounded-xl hover:-translate-y-1 hover:shadow-md">

        <div className="absolute w-20 h-20 rounded-full bg-[#EFF4FF] -bottom-6 -left-5" />

        <div className="relative z-10 flex items-center justify-between mb-2">

          <h3 className="text-sm text-[#45464D]">
            إجمالي القضايا المسجلة
          </h3>

          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#E5EEFF]">
            <LuFiles />
          </div>

        </div>

        <div className="relative z-10 flex items-center gap-2 mb-1">

          <h2 className="text-4xl font-bold text-[#0B1C30]">
            {statistics.totalCases}
          </h2>

          <span className="text-xs text-[#45464D]">
            قضية مسجلة
          </span>

        </div>

        <div className="relative z-10 flex items-center gap-1.5">

          <div className="flex items-center gap-0.5 px-2 py-0.5 text-xs font-medium rounded-md text-[#586377] bg-[#D5E0F8]">
            <HiOutlineTrendingUp />
            <span>
              {statistics.totalCases > 0 ? "نشطة" : "لا توجد"}
            </span>
          </div>

          <p className="text-xs text-[#45464D]">
            إجمالي المحفظة
          </p>

        </div>

      </div>

      {/* ==========================================
          Active Cases
      ========================================== */}

      <div className="relative p-4 overflow-hidden transition-all duration-300 bg-white shadow-sm rounded-xl hover:-translate-y-1 hover:shadow-md">

        <div className="absolute w-20 h-20 rounded-full bg-[#EFF4FF] -bottom-6 -left-5" />

        <div className="relative z-10 flex items-center justify-between mb-2">

          <h3 className="text-sm text-[#45464D]">
            القضايا النشطة المتداولة
          </h3>

          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#E5EEFF]">
            <MdGavel />
          </div>

        </div>

        <div className="relative z-10 flex items-center gap-2 mb-1">

          <h2 className="text-4xl font-bold text-[#0B1C30]">
            {statistics.activeCases}
          </h2>

          <span className="text-xs text-[#45464D]">
            قضية نشطة
          </span>

        </div>

        <div className="relative z-10 flex items-center gap-1.5">

          <div className="w-fit text-xs font-medium text-[#586377] bg-[#D5E0F8] px-2 py-0.5 rounded-md">
            {statistics.activePercentage}%
          </div>

          <p className="text-xs text-[#45464D]">
            من إجمالي القضايا
          </p>

        </div>

      </div>

      {/* ==========================================
          This Month
      ========================================== */}

      <div className="relative p-4 overflow-hidden transition-all duration-300 bg-white shadow-sm rounded-xl hover:-translate-y-1 hover:shadow-md">

        <div className="absolute w-20 h-20 rounded-full bg-[#FFE08E] -bottom-6 -left-5" />

        <div className="relative z-10 flex items-center justify-between mb-2">

          <h3 className="text-sm text-[#45464D]">
            القضايا المقيدة هذا الشهر
          </h3>

          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#E5EEFF]">
            <TbFileDescriptionFilled className="text-[#755B00]" />
          </div>

        </div>

        <div className="relative z-10 flex items-center gap-2 mb-1">

          <h2 className="text-4xl font-bold text-[#0B1C30]">
            {statistics.casesThisMonth}
          </h2>

          <span className="text-xs text-[#45464D]">
            قيد جديد
          </span>

        </div>

        <div className="relative z-10 flex items-center gap-1.5">

          <div className="w-fit text-xs font-medium text-[#584400] bg-[#FFE08E] px-2 py-0.5 rounded-md">
            هذا الشهر
          </div>

          <p className="text-xs text-[#45464D]">
            من تاريخ القيد
          </p>

        </div>

      </div>

      {/* ==========================================
          Closed Cases
      ========================================== */}

      <div className="relative p-4 overflow-hidden transition-all duration-300 bg-white shadow-sm rounded-xl hover:-translate-y-1 hover:shadow-md">

        <div className="absolute w-20 h-20 rounded-full bg-[#D5E0F8] -bottom-6 -left-5" />

        <div className="relative z-10 flex items-center justify-between mb-2">

          <h3 className="text-sm text-[#45464D]">
            أحكام مكتسبة ومغلقة
          </h3>

          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#D5E0F8]">
            <BsPatchCheck className="text-[#586377]" />
          </div>

        </div>

        <div className="relative z-10 flex items-center gap-2 mb-1">

          <h2 className="text-4xl font-bold text-[#0B1C30]">
            {statistics.closedCases}
          </h2>

          <span className="text-xs text-[#45464D]">
            حكم نهائي
          </span>

        </div>

        <div className="relative z-10 flex items-center gap-1.5">

          <div className="w-fit text-xs font-medium text-[#586377] bg-[#D5E0F8] px-2 py-0.5 rounded-md">
            {statistics.closedPercentage}%
          </div>

          <p className="text-xs text-[#45464D]">
            من إجمالي القضايا
          </p>

        </div>

      </div>

    </div>
  );
};

export default Cards;