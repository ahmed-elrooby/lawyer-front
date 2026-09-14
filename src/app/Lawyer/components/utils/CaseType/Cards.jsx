
"use client";

import React, { useContext, useMemo } from "react";
import {
  FaGavel,
  FaCheckCircle,
  FaTimesCircle,
  FaChartPie,
} from "react-icons/fa";

import { LawyerContext } from "../../../../../Providers/LawyerContext/lawyer.js";

const Cards = () => {
  const { caseTypes } = useContext(LawyerContext);

  const statistics = useMemo(() => {
    const types = Array.isArray(caseTypes) ? caseTypes : [];

    const total = types.length;
    const active = types.filter((type) => type.isActive).length;
    const inactive = types.filter((type) => !type.isActive).length;

    const activePercentage =
      total > 0 ? Math.round((active / total) * 100) : 0;

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
      iconBg: "bg-emerald-500/10",
      iconColor: "text-emerald-400",
      valueColor: "text-white",
    },
    {
      title: "الأنواع النشطة",
      value: statistics.active,
      description: "متاحة للاستخدام حاليًا",
      icon: FaCheckCircle,
      iconBg: "bg-emerald-500/10",
      iconColor: "text-emerald-400",
      valueColor: "text-emerald-400",
    },
    {
      title: "الأنواع غير النشطة",
      value: statistics.inactive,
      description: "غير متاحة للاستخدام",
      icon: FaTimesCircle,
      iconBg: "bg-slate-700/50",
      iconColor: "text-slate-400",
      valueColor: "text-slate-300",
    },
    {
      title: "نسبة الأنواع النشطة",
      value: `${statistics.activePercentage}%`,
      description: "من إجمالي أنواع القضايا",
      icon: FaChartPie,
      iconBg: "bg-emerald-500/10",
      iconColor: "text-emerald-400",
      valueColor: "text-emerald-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="relative overflow-hidden transition-all duration-300 border shadow-sm bg-slate-900 border-slate-700/60 group rounded-2xl hover:-translate-y-1 hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-950/30"
          >
            {/* Top Accent */}
            <div
              className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-emerald-400 to-transparent"
            />

            <div className="p-5">
              <div className="flex items-start justify-between gap-4">
                {/* Content */}
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-400">
                    {card.title}
                  </p>

                  <h3
                    className={`
                      mt-2
                      text-3xl
                      font-bold
                      tracking-tight
                      ${card.valueColor}
                    `}
                  >
                    {card.value}
                  </h3>

                  <p className="mt-2 text-xs text-slate-500">
                    {card.description}
                  </p>
                </div>

                {/* Icon */}
                <div
                  className={`
                    flex items-center justify-center
                    flex-shrink-0
                    w-12 h-12
                    rounded-xl
                    border
                    border-emerald-500/10
                    ${card.iconBg}
                    ${card.iconColor}
                    transition-all duration-300
                    group-hover:scale-105
                  `}
                >
                  <Icon className="text-xl" />
                </div>
              </div>

              {/* Progress */}
              {card.title === "نسبة الأنواع النشطة" && (
                <div className="mt-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-medium text-slate-500">
                      نسبة التفعيل
                    </span>

                    <span className="text-[11px] font-bold text-emerald-400">
                      {statistics.activePercentage}%
                    </span>
                  </div>

                  <div className="w-full h-2 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full transition-all duration-700 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400"
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
