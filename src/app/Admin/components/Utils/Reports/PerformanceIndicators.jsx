
"use client";

import React, { useContext } from "react";
import {
  FaChartLine,
  FaBriefcase,
  FaCalendarAlt,
  FaBalanceScale,
  FaClock,
} from "react-icons/fa";

import { AdminContext } from "../../../../../Providers/AdminContext/Admin.js";

const PerformanceIndicators = () => {
  const { dashboardStatisics } = useContext(AdminContext);

  const cases = dashboardStatisics?.cases || {};
  const sessions = dashboardStatisics?.sessions || {};

  const calculatePercentage = (value, total) => {
    if (!total) return 0;

    return Math.round((value / total) * 100);
  };

  const indicators = [
    {
      title: "القضايا النشطة",
      value: cases.active || 0,
      total: cases.total || 0,
      percentage: calculatePercentage(cases.active, cases.total),
      icon: FaBriefcase,
      iconWrapper: "bg-blue-50 text-blue-600",
      progress: "bg-blue-600",
    },
    {
      title: "القضايا المحجوزة للحكم",
      value: cases.reservedForJudgment || 0,
      total: cases.total || 0,
      percentage: calculatePercentage(
        cases.reservedForJudgment,
        cases.total
      ),
      icon: FaBalanceScale,
      iconWrapper: "bg-violet-50 text-violet-600",
      progress: "bg-violet-600",
    },
    {
      title: "الجلسات المجدولة",
      value: sessions.scheduled || 0,
      total: sessions.total || 0,
      percentage: calculatePercentage(
        sessions.scheduled,
        sessions.total
      ),
      icon: FaCalendarAlt,
      iconWrapper: "bg-amber-50 text-amber-600",
      progress: "bg-amber-500",
    },
    {
      title: "الجلسات المؤجلة",
      value: sessions.postponed || 0,
      total: sessions.total || 0,
      percentage: calculatePercentage(
        sessions.postponed,
        sessions.total
      ),
      icon: FaClock,
      iconWrapper: "bg-orange-50 text-orange-600",
      progress: "bg-orange-500",
    },
  ];

  return (
    <section className="p-6 mt-6 bg-white border shadow-sm rounded-2xl border-slate-200/70">
      {/* Header */}
      <div className="flex items-start gap-3 mb-6">
        <div className="flex items-center justify-center text-blue-600 w-11 h-11 bg-blue-50 rounded-xl">
          <FaChartLine className="text-lg" />
        </div>

        <div>
          <h2 className="text-lg font-bold text-slate-800">
            مؤشرات الأداء
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            نظرة سريعة على أهم مؤشرات القضايا والجلسات
          </p>
        </div>
      </div>

      {/* Indicators */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {indicators.map((indicator) => {
          const Icon = indicator.icon;

          return (
            <div
              key={indicator.title}
              className="p-5 transition-all duration-300 border rounded-2xl border-slate-200/70 bg-slate-50/40 hover:-translate-y-1 hover:shadow-md"
            >
              {/* Top */}
              <div className="flex items-start justify-between">
                <div
                  className={`flex items-center justify-center w-11 h-11 rounded-xl ${indicator.iconWrapper}`}
                >
                  <Icon className="text-base" />
                </div>

                <span className="text-2xl font-bold text-slate-800">
                  {indicator.percentage}%
                </span>
              </div>

              {/* Title */}
              <div className="mt-4">
                <h3 className="text-sm font-semibold text-slate-700">
                  {indicator.title}
                </h3>

                <p className="mt-1 text-xs text-slate-400">
                  {indicator.value} من أصل {indicator.total}
                </p>
              </div>

              {/* Progress */}
              <div className="mt-4">
                <div className="w-full h-2 overflow-hidden rounded-full bg-slate-200">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${indicator.progress}`}
                    style={{
                      width: `${indicator.percentage}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PerformanceIndicators;
