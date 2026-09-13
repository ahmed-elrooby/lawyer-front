"use client";

import React, { useContext, useMemo } from "react";
import {
  FaFolderOpen,
  FaCheckCircle,
  FaTimesCircle,
  FaChartPie,
} from "react-icons/fa";

import { AdminContext } from "../../../../../Providers/AdminContext/Admin.js";

const Cards = () => {
  const { categories } = useContext(AdminContext);

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
      iconWrapper: "bg-blue-50 text-blue-600",
      valueColor: "text-slate-800",
    },
    {
      title: "التصنيفات النشطة",
      value: statistics.active,
      description: "تصنيفات متاحة للاستخدام",
      icon: FaCheckCircle,
      iconWrapper: "bg-emerald-50 text-emerald-600",
      valueColor: "text-emerald-600",
    },
    {
      title: "غير النشطة",
      value: statistics.inactive,
      description: "تصنيفات غير متاحة حاليًا",
      icon: FaTimesCircle,
      iconWrapper: "bg-red-50 text-red-500",
      valueColor: "text-red-500",
    },
    {
      title: "نسبة النشاط",
      value: `${statistics.activePercentage}%`,
      description: "من إجمالي التصنيفات",
      icon: FaChartPie,
      iconWrapper: "bg-violet-50 text-violet-600",
      valueColor: "text-violet-600",
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
            className="relative overflow-hidden transition-all duration-200 bg-white border shadow-sm rounded-2xl border-slate-100 hover:shadow-md"
          >
            <div className="p-5">
              {/* Top */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {card.title}
                  </p>

                  <h3
                    className={`mt-2 text-3xl font-bold tracking-tight ${card.valueColor}`}
                  >
                    {card.value}
                  </h3>
                </div>

                <div
                  className={`flex items-center justify-center w-11 h-11 rounded-xl ${card.iconWrapper}`}
                >
                  <Icon className="text-lg" />
                </div>
              </div>

              {/* Description */}
              <p className="mt-3 text-xs text-slate-400">
                {card.description}
              </p>

              {/* Progress */}
              {card.progress && (
                <div className="mt-4">
                  <div className="w-full h-1.5 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full transition-all duration-500 rounded-full bg-violet-500"
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