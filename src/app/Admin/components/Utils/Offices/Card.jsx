"use client";

import React, { useContext, useMemo } from "react";
import { FaBuilding, FaCheck, FaTimes, FaArrowUp } from "react-icons/fa";

import { AdminContext } from "../../../../../Providers/AdminContext/Admin.js";

const Card = () => {
  const { offices } = useContext(AdminContext);

  const stats = useMemo(() => {
    const data = Array.isArray(offices) ? offices : [];

    const total = data.length;

    const active = data.filter((office) => office.isActive === true).length;

    const inactive = data.filter((office) => office.isActive === false).length;

    const now = new Date();

    const newThisMonth = data.filter((office) => {
      if (!office.createdAt) return false;

      const date = new Date(office.createdAt);

      return (
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
      );
    }).length;

    return {
      total,
      active,
      inactive,
      newThisMonth,
      activePercentage: total > 0 ? Math.round((active / total) * 100) : 0,
      inactivePercentage: total > 0 ? Math.round((inactive / total) * 100) : 0,
    };
  }, [offices]);

  const cards = [
    {
      title: "إجمالي المكاتب",
      subtitle: "جميع المكاتب المسجلة",
      value: stats.total,
      icon: FaBuilding,
      color: "blue",
      percentage: 100,
      footer: "منصة سوليس قضاء",
    },
    {
      title: "المكاتب النشطة",
      subtitle: "تعمل حاليًا",
      value: stats.active,
      icon: FaCheck,
      color: "emerald",
      percentage: stats.activePercentage,
      footer: `${stats.activePercentage}% من إجمالي المكاتب`,
    },
    {
      title: "غير النشطة",
      subtitle: "تحتاج إلى مراجعة",
      value: stats.inactive,
      icon: FaTimes,
      color: "red",
      percentage: stats.inactivePercentage,
      footer: `${stats.inactivePercentage}% من إجمالي المكاتب`,
    },
    {
      title: "مكاتب جديدة",
      subtitle: "تم التسجيل هذا الشهر",
      value: stats.newThisMonth,
      icon: FaArrowUp,
      color: "indigo",
      percentage:
        stats.total > 0
          ? Math.round((stats.newThisMonth / stats.total) * 100)
          : 0,
      footer: "النمو الشهري",
    },
  ];

  const colors = {
    blue: {
      icon: "bg-blue-50 text-blue-600",
      number: "text-slate-900",
      progress: "bg-blue-600",
      glow: "bg-blue-500",
      badge: "bg-blue-50 text-blue-600",
    },
    emerald: {
      icon: "bg-emerald-50 text-emerald-600",
      number: "text-emerald-600",
      progress: "bg-emerald-500",
      glow: "bg-emerald-500",
      badge: "bg-emerald-50 text-emerald-600",
    },
    red: {
      icon: "bg-red-50 text-red-500",
      number: "text-red-500",
      progress: "bg-red-500",
      glow: "bg-red-500",
      badge: "bg-red-50 text-red-500",
    },
    indigo: {
      icon: "bg-indigo-50 text-indigo-600",
      number: "text-indigo-600",
      progress: "bg-indigo-600",
      glow: "bg-indigo-500",
      badge: "bg-indigo-50 text-indigo-600",
    },
  };

  return (
    <div className="grid grid-cols-1 gap-4 mb-7 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;
        const theme = colors[card.color];

        return (
          <div
            key={card.title}
            className="group relative overflow-hidden rounded-[24px] border border-slate-200/70 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_20px_45px_rgba(15,23,42,0.08)]"
          >
            {/* Decorative glow */}
            <div
              className={`absolute -right-16 -top-16 h-32 w-32 rounded-full ${theme.glow} opacity-[0.035] blur-2xl transition-all duration-500 group-hover:scale-[1.8]`}
            />

            {/* Header */}
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-[15px] ${theme.icon}`}
                >
                  <Icon className="text-[15px]" />
                </div>

                <div>
                  <h3 className="text-[13px] font-bold text-slate-700">
                    {card.title}
                  </h3>

                  <p className="mt-0.5 text-[10px] text-slate-400">
                    {card.subtitle}
                  </p>
                </div>
              </div>

              {/* Percentage circle */}
              <div className="relative flex items-center justify-center w-10 h-10">
                <svg
                  className="absolute inset-0 w-full h-full -rotate-90"
                  viewBox="0 0 40 40"
                >
                  <circle
                    cx="20"
                    cy="20"
                    r="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    className="text-slate-100"
                  />

                  <circle
                    cx="20"
                    cy="20"
                    r="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray={`${card.percentage} 100`}
                    pathLength="100"
                    className={theme.number}
                  />
                </svg>

                <span className="relative text-[8px] font-black text-slate-500">
                  {card.percentage}%
                </span>
              </div>
            </div>

            {/* Main Number */}
            <div className="relative flex items-end justify-between mt-7">
              <div className="flex items-baseline gap-2">
                <span
                  className={`text-[48px] font-black leading-none tracking-[-3px] ${theme.number}`}
                >
                  {String(card.value).padStart(2, "0")}
                </span>

                <span className="text-[11px] font-medium text-slate-400">
                  مكتب
                </span>
              </div>
            </div>

            {/* Progress */}
            <div className="relative mt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[9px] font-medium text-slate-400">
                  {card.footer}
                </span>

                {card.color === "indigo" && card.value > 0 && (
                  <span className="flex items-center gap-1 text-[9px] font-bold text-indigo-600">
                    <FaArrowUp className="text-[7px]" />
                    جديد
                  </span>
                )}
              </div>

              <div className="h-[4px] overflow-hidden rounded-full bg-slate-100">
                <div
                  className={`h-full rounded-full ${theme.progress} transition-all duration-1000`}
                  style={{
                    width: `${Math.min(card.percentage, 100)}%`,
                  }}
                />
              </div>
            </div>

            {/* Bottom line */}
            <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-slate-900 transition-all duration-500 group-hover:w-full" />
          </div>
        );
      })}
    </div>
  );
};

export default Card;
