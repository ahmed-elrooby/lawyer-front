
"use client";

import React, { useContext } from "react";
import {
  FaBriefcase,
  FaUsers,
  FaUserTie,
  FaCalendarAlt,
  FaArrowUp,
} from "react-icons/fa";

import { AdminContext } from "../../../../../Providers/AdminContext/Admin.js";

const Cards = () => {
  const { dashboardStatisics } = useContext(AdminContext);

  const statistics = dashboardStatisics || {};

  const cards = [
    {
      title: "إجمالي القضايا",
      value: statistics?.cases?.total || 0,
      description: `${statistics?.cases?.active || 0} قضايا نشطة`,
      icon: FaBriefcase,
      iconWrapper: "bg-blue-50 text-blue-600",
      valueColor: "text-slate-800",
    },

    {
      title: "إجمالي العملاء",
      value: statistics?.clients?.total || 0,
      description: "عميل مسجل بالنظام",
      icon: FaUsers,
      iconWrapper: "bg-emerald-50 text-emerald-600",
      valueColor: "text-slate-800",
    },

    {
      title: "إجمالي المحامين",
      value: statistics?.lawyers?.total || 0,
      description: "محامي مسجل بالنظام",
      icon: FaUserTie,
      iconWrapper: "bg-violet-50 text-violet-600",
      valueColor: "text-slate-800",
    },

    {
      title: "إجمالي الجلسات",
      value: statistics?.sessions?.total || 0,
      description: `${statistics?.sessions?.scheduled || 0} جلسات مجدولة`,
      icon: FaCalendarAlt,
      iconWrapper: "bg-amber-50 text-amber-600",
      valueColor: "text-slate-800",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="relative p-5 overflow-hidden transition-all duration-300 bg-white border shadow-sm rounded-2xl border-slate-200/70 hover:-translate-y-1 hover:shadow-lg"
          >
            {/* Top */}
            <div className="flex items-start justify-between">
              <div
                className={`flex items-center justify-center w-12 h-12 rounded-2xl ${card.iconWrapper}`}
              >
                <Icon className="text-lg" />
              </div>

              <div className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-emerald-600 rounded-lg bg-emerald-50">
                <FaArrowUp className="text-[9px]" />
                <span>إحصائية</span>
              </div>
            </div>

            {/* Content */}
            <div className="mt-5">
              <p className="text-sm font-medium text-slate-500">
                {card.title}
              </p>

              <h3
                className={`mt-2 text-3xl font-bold tracking-tight ${card.valueColor}`}
              >
                {card.value}
              </h3>

              <p className="mt-2 text-xs font-medium text-slate-400">
                {card.description}
              </p>
            </div>

            {/* Decorative */}
            <div className="absolute w-24 h-24 rounded-full -bottom-10 -left-10 bg-slate-50" />
          </div>
        );
      })}
    </div>
  );
};

export default Cards;

