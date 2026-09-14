"use client";

import React, { useContext, useMemo } from "react";
import {
  FaFolderOpen,
  FaCheckCircle,
  FaTimesCircle,
  FaChartPie,
} from "react-icons/fa";

import { LawyerContext } from "../../../../../Providers/LawyerContext/lawyer.js";

const Cards = () => {
  const { categories } = useContext(LawyerContext);

  const statistics = useMemo(() => {
    const data = Array.isArray(categories) ? categories : [];

    const total = data.length;

    const active = data.filter(
      (category) => category?.isActive === true
    ).length;

    const inactive = total - active;

    const activePercentage =
      total > 0 ? Math.round((active / total) * 100) : 0;

    return {
      total,
      active,
      inactive,
      activePercentage,
    };
  }, [categories]);

  const cards = [
    {
      title: "إجمالي التصنيفات",
      value: statistics.total,
      description: "إجمالي تصنيفات الملفات",
      icon: FaFolderOpen,
    },
    {
      title: "التصنيفات النشطة",
      value: statistics.active,
      description: "تصنيفات متاحة للاستخدام",
      icon: FaCheckCircle,
    },
    {
      title: "غير النشطة",
      value: statistics.inactive,
      description: "تصنيفات غير متاحة حاليًا",
      icon: FaTimesCircle,
    },
    {
      title: "نسبة النشاط",
      value: `${statistics.activePercentage}%`,
      description: "من إجمالي التصنيفات",
      icon: FaChartPie,
      progress: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="relative overflow-hidden transition-all duration-300 border shadow-lg  rounded-2xl border-slate-700/60 bg-slate-900 shadow-slate-950/20 hover:-translate-y-1 hover:border-emerald-500/30 hover:shadow-emerald-950/30"
          >
            {/* Emerald Accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-emerald-400 to-transparent" />

            <div className="p-5">
              {/* Top */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-slate-400">
                    {card.title}
                  </p>

                  <h3 className="mt-2 text-3xl font-bold tracking-tight text-white">
                    {card.value}
                  </h3>
                </div>

                <div
                  className="flex items-center justify-center border  w-11 h-11 rounded-xl border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                >
                  <Icon className="text-lg" />
                </div>
              </div>

              {/* Description */}
              <p className="mt-3 text-xs text-slate-500">
                {card.description}
              </p>

              {/* Progress */}
              {card.progress && (
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-medium text-slate-500">
                      النشاط
                    </span>

                    <span className="text-[11px] font-semibold text-emerald-400">
                      {statistics.activePercentage}%
                    </span>
                  </div>

                  <div className="w-full h-1.5 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full transition-all duration-500 rounded-full  bg-gradient-to-r from-emerald-500 to-emerald-400"
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