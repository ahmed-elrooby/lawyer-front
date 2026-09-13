"use client";

import React, { useContext, useMemo } from "react";
import {
  FaGavel,
  FaCheckCircle,
  FaTimesCircle,
  FaChartPie,
} from "react-icons/fa";

import { AdminContext } from "../../../../../Providers/AdminContext/Admin.js";

const Cards = () => {
  const { caseTypes } = useContext(AdminContext);

  const statistics = useMemo(() => {
    const types = Array.isArray(caseTypes) ? caseTypes : [];

    const total = types.length;
    const active = types.filter((type) => type.isActive).length;
    const inactive = types.filter((type) => !type.isActive).length;

    const activePercentage = total > 0 ? Math.round((active / total) * 100) : 0;

    return {
      total,
      active,
      inactive,
      activePercentage,
    };
  }, [caseTypes]);

  const cards = [
    {
      title: "إجمالي أنواع القضايا",
      value: statistics.total,
      description: "جميع أنواع القضايا المسجلة",
      icon: FaGavel,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      valueColor: "text-slate-800",
    },
    {
      title: "الأنواع النشطة",
      value: statistics.active,
      description: "متاحة للاستخدام حاليًا",
      icon: FaCheckCircle,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      valueColor: "text-emerald-600",
    },
    {
      title: "الأنواع غير النشطة",
      value: statistics.inactive,
      description: "غير متاحة للاستخدام",
      icon: FaTimesCircle,
      iconBg: "bg-red-50",
      iconColor: "text-red-500",
      valueColor: "text-red-500",
    },
    {
      title: "نسبة الأنواع النشطة",
      value: `${statistics.activePercentage}%`,
      description: "من إجمالي أنواع القضايا",
      icon: FaChartPie,
      iconBg: "bg-indigo-50",
      iconColor: "text-indigo-600",
      valueColor: "text-indigo-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="relative overflow-hidden transition-all duration-300 bg-white border shadow-sm group rounded-2xl border-slate-200/80 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/50"
          >
            {/* Top Accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-500" />

            <div className="p-5">
              <div className="flex items-start justify-between gap-4">
                {/* Content */}
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-500">
                    {card.title}
                  </p>

                  <h3
                    className={`mt-2 text-3xl font-bold tracking-tight ${card.valueColor}`}
                  >
                    {card.value}
                  </h3>

                  <p className="mt-2 text-xs text-slate-400">
                    {card.description}
                  </p>
                </div>

                {/* Icon */}
                <div
                  className={`flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-xl ${card.iconBg} ${card.iconColor} transition-all duration-300 group-hover:scale-105`}
                >
                  <Icon className="text-xl" />
                </div>
              </div>

              {/* Progress */}
              {card.title === "نسبة الأنواع النشطة" && (
                <div className="mt-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-medium text-slate-400">
                      نسبة التفعيل
                    </span>

                    <span className="text-[11px] font-bold text-indigo-600">
                      {statistics.activePercentage}%
                    </span>
                  </div>

                  <div className="w-full h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full transition-all duration-700 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600"
                      style={{
                        width: `${statistics.activePercentage}%`,
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Cards;
