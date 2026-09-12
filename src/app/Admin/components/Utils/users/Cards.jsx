"use client";

import React, { useContext, useMemo } from "react";
import {
  FiUsers,
  FiUserCheck,
  FiBriefcase,
  FiActivity,
  FiArrowUp,
  FiArrowDown,
} from "react-icons/fi";

import { AdminContext } from "../../../../../Providers/AdminContext/Admin.js";

const Cards = () => {
  const { users } = useContext(AdminContext);

  const statistics = useMemo(() => {
    const allUsers = users || [];

    const lawyers = allUsers.filter((user) => user?.role === "lawyer");

    const officeOwners = allUsers.filter(
      (user) => user?.role === "office_owner",
    );

    const activeUsers = allUsers.filter((user) => user?.isActive === true);

    // الشهر الحالي
    const now = new Date();

    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    // الشهر السابق
    const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const previousMonthYear =
      currentMonth === 0 ? currentYear - 1 : currentYear;

    // المستخدمين المضافين هذا الشهر
    const thisMonthUsers = allUsers.filter((user) => {
      if (!user?.createdAt) return false;

      const date = new Date(user.createdAt);

      return (
        date.getMonth() === currentMonth && date.getFullYear() === currentYear
      );
    });

    // المستخدمين المضافين الشهر السابق
    const lastMonthUsers = allUsers.filter((user) => {
      if (!user?.createdAt) return false;

      const date = new Date(user.createdAt);

      return (
        date.getMonth() === previousMonth &&
        date.getFullYear() === previousMonthYear
      );
    });

    // حساب نسبة النمو
    let growth = 0;

    if (lastMonthUsers.length > 0) {
      growth =
        ((thisMonthUsers.length - lastMonthUsers.length) /
          lastMonthUsers.length) *
        100;
    } else if (thisMonthUsers.length > 0) {
      growth = 100;
    }

    // نسبة المستخدمين النشطين
    const activePercentage =
      allUsers.length > 0 ? (activeUsers.length / allUsers.length) * 100 : 0;

    return {
      total: allUsers.length,
      lawyers: lawyers.length,
      officeOwners: officeOwners.length,
      active: activeUsers.length,

      thisMonth: thisMonthUsers.length,
      lastMonth: lastMonthUsers.length,

      growth: Number(growth.toFixed(1)),
      activePercentage: Number(activePercentage.toFixed(1)),
    };
  }, [users]);

  const cards = [
    {
      title: "إجمالي المستخدمين",
      value: statistics.total,
      description: "إجمالي الحسابات المسجلة",
      icon: FiUsers,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",

      trend:
        statistics.growth > 0
          ? `+${statistics.growth}%`
          : `${statistics.growth}%`,

      trendText:
        statistics.growth > 0
          ? "زيادة هذا الشهر"
          : statistics.growth < 0
            ? "انخفاض هذا الشهر"
            : "بدون تغيير",

      trendUp: statistics.growth >= 0,
    },

    {
      title: "المحامين",
      value: statistics.lawyers,
      description: "إجمالي حسابات المحامين",
      icon: FiUserCheck,
      iconBg: "bg-indigo-50",
      iconColor: "text-indigo-600",

      trend: statistics.total
        ? `${((statistics.lawyers / statistics.total) * 100).toFixed(1)}%`
        : "0%",

      trendText: "من إجمالي المستخدمين",

      trendUp: true,
    },

    {
      title: "أصحاب المكاتب",
      value: statistics.officeOwners,
      description: "إجمالي أصحاب المكاتب",
      icon: FiBriefcase,
      iconBg: "bg-violet-50",
      iconColor: "text-violet-600",

      trend: statistics.total
        ? `${((statistics.officeOwners / statistics.total) * 100).toFixed(1)}%`
        : "0%",

      trendText: "من إجمالي المستخدمين",

      trendUp: true,
    },

    {
      title: "المستخدمون النشطون",
      value: statistics.active,
      description: "حساب نشط حاليًا",
      icon: FiActivity,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",

      trend: `${statistics.activePercentage}%`,

      trendText: "من إجمالي المستخدمين",

      trendUp: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 my-6 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="relative overflow-hidden transition-all duration-300 bg-white border shadow-sm group rounded-2xl border-slate-200 hover:-translate-y-1 hover:shadow-lg"
          >
            {/* Decorative Background */}
            <div className="absolute w-24 h-24 transition-transform duration-500 rounded-full -left-8 -top-8 bg-slate-50 group-hover:scale-150" />

            <div className="relative p-5">
              {/* Top */}
              <div className="flex items-start justify-between">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${card.iconBg}`}
                >
                  <Icon className={`text-xl ${card.iconColor}`} />
                </div>

                <div
                  className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${
                    card.trendUp
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-red-50 text-red-600"
                  }`}
                >
                  {card.trendUp ? (
                    <FiArrowUp className="text-sm" />
                  ) : (
                    <FiArrowDown className="text-sm" />
                  )}

                  {card.trend}
                </div>
              </div>

              {/* Content */}
              <div className="mt-5">
                <p className="text-sm font-medium text-slate-500">
                  {card.title}
                </p>

                <h3 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
                  {card.value}
                </h3>

                <p className="mt-2 text-xs text-slate-400">
                  {card.description}
                </p>
              </div>

              {/* Bottom */}
              <div className="flex items-center gap-1 pt-3 mt-4 border-t border-slate-100">
                <span
                  className={`text-xs font-medium ${
                    card.trendUp ? "text-emerald-600" : "text-red-600"
                  }`}
                >
                  {card.trend}
                </span>

                <span className="text-xs text-slate-400">{card.trendText}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Cards;
