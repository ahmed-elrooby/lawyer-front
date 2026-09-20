"use client";

import React, { useContext, useMemo } from "react";
import {
  FaBriefcase,
  FaUsers,
  FaUserTie,
  FaCalendarAlt,
  FaCheckCircle,
} from "react-icons/fa";
import { OwnerContext } from "../../../../../Providers/LawyerOwner/OwnerProvider.js";

const Cards = () => {
  const { dashboardStatisics, sessions } = useContext(OwnerContext);

  // =========================
  // Dashboard Statistics
  // =========================

  const cases = dashboardStatisics?.cases || {};
  const clients = dashboardStatisics?.clients || {};
  const lawyers = dashboardStatisics?.lawyers || {};
  const sessionStats = dashboardStatisics?.sessions || {};

  // =========================
  // Sessions This Week
  // =========================

  const weeklySessions = useMemo(() => {
    if (!Array.isArray(sessions)) return 0;

    const now = new Date();

    // بداية الأسبوع - الأحد
    const startOfWeek = new Date(now);
    startOfWeek.setHours(0, 0, 0, 0);
    startOfWeek.setDate(now.getDate() - now.getDay());

    // نهاية الأسبوع
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 7);

    return sessions.filter((session) => {
      if (!session?.sessionDate) return false;

      const sessionDate = new Date(session.sessionDate);

      return sessionDate >= startOfWeek && sessionDate < endOfWeek;
    }).length;
  }, [sessions]);

  // =========================
  // Calculated Rates
  // =========================

  const activeCasesRate =
    cases.total > 0
      ? Math.round((cases.active / cases.total) * 100)
      : 0;

  const closedCasesRate =
    cases.total > 0
      ? Math.round(
          ((cases.judged + cases.reservedForJudgment) / cases.total) * 100
        )
      : 0;

  const scheduledSessionsRate =
    sessionStats.total > 0
      ? Math.round(
          (sessionStats.scheduled / sessionStats.total) * 100
        )
      : 0;

  const activeLawyers = lawyers.total || 0;

  const attendedSessionsRate =
    sessionStats.total > 0
      ? Math.round(
          (sessionStats.attended / sessionStats.total) * 100
        )
      : 0;

  // =========================
  // Cards
  // =========================

  const cards = [
    {
      title: "إجمالي القضايا",
      value: cases.total || 0,
      change: `${cases.active || 0} نشطة`,
      description: `${cases.judged || 0} محكوم عليها`,
      icon: FaBriefcase,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      changeColor: "text-blue-600",
    },

    {
      title: "القضايا النشطة",
      value: cases.active || 0,
      change: `${activeCasesRate}%`,
      description: "من إجمالي القضايا",
      icon: FaBriefcase,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      changeColor: "text-blue-600",
    },

    {
      title: "العملاء",
      value: clients.total || 0,
      change: `${clients.total || 0} إجمالي`,
      description: "إجمالي عملاء المكتب",
      icon: FaUsers,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      changeColor: "text-blue-600",
    },

    {
      title: "فريق المحامين",
      value: activeLawyers,
      change: "100%",
      description: "إجمالي محامي المكتب",
      icon: FaUserTie,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      changeColor: "text-blue-600",
    },

    {
      title: "جلسات هذا الأسبوع",
      value: weeklySessions,
      change: `${sessionStats.scheduled || 0} مجدولة`,
      description: `${scheduledSessionsRate}% من إجمالي الجلسات`,
      icon: FaCalendarAlt,
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
      changeColor: "text-amber-600",
    },

    {
      title: "القضايا المغلقة",
      value: (cases.judged || 0) + (cases.reservedForJudgment || 0),
      change: `${closedCasesRate}%`,
      description: "من إجمالي القضايا",
      icon: FaCheckCircle,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      changeColor: "text-emerald-600",
    },
  ];

  return (
    <section className="mb-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-6">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_8px_30px_rgba(15,23,42,0.06)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
          >
            {/* Icon */}
            <div
              className={`mb-3 flex h-8 w-8 items-center justify-center rounded-xl ${card.iconBg} ${card.iconColor}`}
            >
              <Icon size={13} />
            </div>

            {/* Title */}
            <div className="mb-1 text-[9px] font-medium text-slate-400">
              {card.title}
            </div>

            {/* Value */}
            <div className="text-xl font-extrabold leading-none text-slate-900">
              {card.value}
            </div>

            {/* Bottom Info */}
            <div className="mt-2 flex flex-col gap-0.5">
              <span className={`text-[8px] font-bold ${card.changeColor}`}>
                {card.change}
              </span>

              <span className="text-[8px] text-slate-400">
                {card.description}
              </span>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default Cards;