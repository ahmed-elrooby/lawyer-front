"use client";

import React, { useContext, useMemo } from "react";
import {
  FaUserTie,
  FaCheck,
  FaUserClock,
  FaUserPlus,
  FaArrowUp,
} from "react-icons/fa";

import { AdminContext } from "../../../../../Providers/AdminContext/Admin.js";

const Cards = () => {
  const { lawyers } = useContext(AdminContext);

  const lawyersList = useMemo(() => {
    if (Array.isArray(lawyers)) return lawyers;
    if (Array.isArray(lawyers?.lawyers)) return lawyers.lawyers;
    return [];
  }, [lawyers]);

  const stats = useMemo(() => {
    const total = lawyersList.length;

    const active = lawyersList.filter(
      (lawyer) =>
        lawyer?.isActive === true ||
        lawyer?.isActive === "true" ||
        lawyer?.status === "active",
    ).length;

    const inactive = total - active;

    const now = new Date();

    const newThisMonth = lawyersList.filter((lawyer) => {
      if (!lawyer?.createdAt) return false;

      const date = new Date(lawyer.createdAt);

      return (
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
      );
    }).length;

    const activePercentage = total ? Math.round((active / total) * 100) : 0;

    const inactivePercentage = total ? Math.round((inactive / total) * 100) : 0;

    return {
      total,
      active,
      inactive,
      newThisMonth,
      activePercentage,
      inactivePercentage,
    };
  }, [lawyersList]);

  const cards = [
    {
      title: "إجمالي المحامين",
      value: stats.total,
      subtitle: "إجمالي المحامين المسجلين",
      percentage: 100,
      icon: FaUserTie,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      progress: "bg-blue-600",
      glow: "bg-blue-500/10",
      badge: "كل المحامين",
    },
    {
      title: "المحامين النشطين",
      value: stats.active,
      subtitle: "حسابات تعمل حاليًا",
      percentage: stats.activePercentage,
      icon: FaCheck,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      progress: "bg-emerald-500",
      glow: "bg-emerald-500/10",
      badge: `${stats.activePercentage}% نشط`,
    },
    {
      title: "المحامين غير النشطين",
      value: stats.inactive,
      subtitle: "حسابات تحتاج متابعة",
      percentage: stats.inactivePercentage,
      icon: FaUserClock,
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
      progress: "bg-amber-500",
      glow: "bg-amber-500/10",
      badge: `${stats.inactive} حساب`,
    },
    {
      title: "محامين جدد",
      value: stats.newThisMonth,
      subtitle: "انضموا خلال هذا الشهر",
      percentage: stats.total
        ? Math.round((stats.newThisMonth / stats.total) * 100)
        : 0,
      icon: FaUserPlus,
      iconBg: "bg-indigo-50",
      iconColor: "text-indigo-600",
      progress: "bg-indigo-600",
      glow: "bg-indigo-500/10",
      badge: "هذا الشهر",
    },
  ];

  return (
    <section className="mb-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="relative p-5 overflow-hidden transition-all duration-300 bg-white border shadow-sm group rounded-2xl border-slate-200/80 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-slate-200/50"
            >
              {/* Glow */}
              <div
                className={`pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full ${card.glow} opacity-70 blur-2xl transition-all duration-300 group-hover:scale-150`}
              />

              {/* Top */}
              <div className="relative flex items-start justify-between">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${card.iconBg} ${card.iconColor} transition-transform duration-300 group-hover:scale-105`}
                >
                  <Icon className="text-lg" />
                </div>

                {/* Percentage Circle */}
                <div className="relative flex items-center justify-center w-12 h-12">
                  <svg className="w-12 h-12 -rotate-90" viewBox="0 0 44 44">
                    <circle
                      cx="22"
                      cy="22"
                      r="18"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                      className="text-slate-100"
                    />

                    <circle
                      cx="22"
                      cy="22"
                      r="18"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 18}`}
                      strokeDashoffset={
                        2 * Math.PI * 18 * (1 - card.percentage / 100)
                      }
                      className={card.iconColor}
                    />
                  </svg>

                  <span className="absolute text-[10px] font-bold text-slate-600">
                    {card.percentage}%
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="relative mt-5">
                <p className="text-sm font-medium text-slate-500">
                  {card.title}
                </p>

                <div className="flex items-end gap-2 mt-1">
                  <span className="text-3xl font-extrabold tracking-tight text-slate-800">
                    {card.value}
                  </span>

                  {card.title === "محامين جدد" && card.value > 0 && (
                    <span className="mb-1 flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                      <FaArrowUp className="text-[9px]" />
                      جديد
                    </span>
                  )}
                </div>

                <p className="mt-1 text-xs text-slate-400">{card.subtitle}</p>
              </div>

              {/* Progress */}
              <div className="relative mt-5">
                <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full ${card.progress} transition-all duration-700`}
                    style={{
                      width: `${Math.min(card.percentage, 100)}%`,
                    }}
                  />
                </div>

                <div className="flex items-center justify-between mt-2">
                  <span className="text-[10px] font-medium text-slate-400">
                    نسبة من إجمالي المحامين
                  </span>

                  <span
                    className={`rounded-full ${card.iconBg} px-2 py-1 text-[10px] font-bold ${card.iconColor}`}
                  >
                    {card.badge}
                  </span>
                </div>
              </div>

              {/* Bottom Accent */}
              <div
                className={`absolute bottom-0 right-0 h-0.5 w-20 ${card.progress} opacity-70`}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Cards;
