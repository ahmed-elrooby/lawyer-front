"use client";

import React, { useContext, useEffect, useState } from "react";
import { FaSyncAlt } from "react-icons/fa";
import { authContext } from "../../../../../Providers/AuthProvider/Auth.js";

const Header = () => {
  const { profile } = useContext(authContext);

  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  const officeName =
    profile?.user?.officeId?.name || "مكتب المحاماة";

  const formatLastUpdated = () => {
    const diff = Math.floor(
      (Date.now() - lastUpdated.getTime()) / 1000
    );

    if (diff < 10) return "تم التحديث الآن";

    if (diff < 60) {
      return `آخر تحديث منذ ${diff} ثانية`;
    }

    const minutes = Math.floor(diff / 60);

    if (minutes === 1) {
      return "آخر تحديث منذ دقيقة";
    }

    if (minutes < 60) {
      return `آخر تحديث منذ ${minutes} دقيقة`;
    }

    const hours = Math.floor(minutes / 60);

    if (hours === 1) {
      return "آخر تحديث منذ ساعة";
    }

    return `آخر تحديث منذ ${hours} ساعة`;
  };

  const [updatedText, setUpdatedText] = useState(
    formatLastUpdated()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setUpdatedText(formatLastUpdated());
    }, 10000);

    return () => clearInterval(interval);
  }, [lastUpdated]);

  const handleRefresh = async () => {
    if (isRefreshing) return;

    setIsRefreshing(true);

    // هنا هنربط refetch بتاع OwnerContext لما يكون موجود
    await new Promise((resolve) =>
      setTimeout(resolve, 700)
    );

    setLastUpdated(new Date());
    setIsRefreshing(false);
  };

  return (
    <header className="w-full">
      <div className="flex flex-col w-full gap-4 md:flex-row md:items-start md:justify-between">

        {/* Right Side */}
        <div className="flex flex-col">
          <div className="flex flex-wrap items-center gap-2">
            <span className="h-5 w-1.5 shrink-0 rounded-full bg-slate-900"></span>

            <h1 className="text-[24px] font-extrabold leading-none text-slate-900">
              مركز القيادة
            </h1>

            <span className="flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-[10px] font-bold text-blue-700">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
              غرفة العمليات الحية
            </span>
          </div>

          <p className="mt-3 text-[11px] font-medium text-slate-500">
            متابعة العمليات اليومية وأهم ما يحتاج إلى انتباهك وفريق الدفاع
          </p>

          <p className="mt-1 text-[9px] text-slate-400">
            {officeName}
          </p>
        </div>

        {/* Left Side */}
        <div className="flex items-center gap-2 md:gap-3">
          <div className="flex items-center h-10 gap-2 px-3 bg-white border rounded-full shadow-sm border-slate-100 md:px-4">
            <span
              className={`h-2 w-2 rounded-full ${
                isRefreshing
                  ? "animate-pulse bg-blue-500"
                  : "bg-emerald-500"
              }`}
            />

            <span className="text-[9px] font-medium text-slate-500 md:text-[10px]">
              {updatedText}
            </span>
          </div>

          <button
            type="button"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex h-10 items-center gap-2 rounded-full border border-slate-100 bg-white px-3 text-[9px] font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60 md:px-4 md:text-[10px]"
          >
            <span>
              {isRefreshing
                ? "جاري التحديث"
                : "تحديث البيانات"}
            </span>

            <FaSyncAlt
              className={`text-[12px] text-slate-500 ${
                isRefreshing ? "animate-spin" : ""
              }`}
            />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;