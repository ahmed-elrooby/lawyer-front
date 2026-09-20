"use client";

import React, { useContext, useMemo } from "react";
import {
  Users,
  BriefcaseBusiness,
  CircleCheck,
  CalendarDays,
} from "lucide-react";

import { OwnerContext } from "../../../../../Providers/LawyerOwner/OwnerProvider.js";

const Cards = () => {
  const {
    clients = [],
    cases = [],
    sessions = [],
  } = useContext(OwnerContext);

const statistics = useMemo(() => {
  const now = new Date();

  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const totalClients = clients.length;

  const clientsThisMonth = clients.filter((client) => {
    if (!client?.createdAt) return false;

    const createdDate = new Date(client.createdAt);

    return (
      createdDate.getMonth() === currentMonth &&
      createdDate.getFullYear() === currentYear
    );
  }).length;

  const activeCases = cases.filter(
    (item) =>
      item.status === "active" &&
      !item.isArchived
  ).length;

  const closedCases = cases.filter(
    (item) =>
      item.status === "judged" ||
      item.isArchived
  ).length;

  const thisMonthSessions = sessions.filter((session) => {
    if (!session?.date && !session?.sessionDate) {
      return false;
    }

    const sessionDate = new Date(
      session.date || session.sessionDate
    );

    return (
      sessionDate.getMonth() === currentMonth &&
      sessionDate.getFullYear() === currentYear
    );
  }).length;

  return {
    totalClients,
    clientsThisMonth,
    activeCases,
    closedCases,
    thisMonthSessions,
  };
}, [clients, cases, sessions]);
  const cards = [
 {
  title: "إجمالي العملاء",
  value: statistics.totalClients,
  badge: `+${statistics.clientsThisMonth} هذا الشهر`,
  icon: Users,
  iconBg: "bg-[#edf3ff]",
  iconColor: "text-[#4f7cff]",
  badgeBg: "bg-[#fff4c9]",
  badgeColor: "text-[#9b7b13]",
  circleBg: "bg-[#edf3ff]",
},
    {
      title: "القضايا النشطة",
      value: statistics.activeCases,
      badge: "قيد المتابعة",
      icon: BriefcaseBusiness,
      iconBg: "bg-[#fff8dd]",
      iconColor: "text-[#d4a72c]",
      badgeBg: "bg-[#fff4c9]",
      badgeColor: "text-[#9b7b13]",
      circleBg: "bg-[#fff8dd]",
    },
    {
      title: "القضايا المغلقة",
      value: statistics.closedCases,
      badge: "تم الانتهاء منها",
      icon: CircleCheck,
      iconBg: "bg-[#edf3ff]",
      iconColor: "text-[#4f7cff]",
      badgeBg: "bg-[#edf3ff]",
      badgeColor: "text-[#64748b]",
      circleBg: "bg-[#edf3ff]",
    },
    {
      title: "جلسات هذا الشهر",
      value: statistics.thisMonthSessions,
      badge: "مواعيد هذا الشهر",
      icon: CalendarDays,
      iconBg: "bg-[#edf3ff]",
      iconColor: "text-[#4f7cff]",
      badgeBg: "bg-[#edf3ff]",
      badgeColor: "text-[#64748b]",
      circleBg: "bg-[#edf3ff]",
    },
  ];

  return (
    <section
      dir="rtl"
      className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-4"
    >
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <div
            key={index}
            className="group relative overflow-hidden rounded-xl border border-[#e9edf4] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            <div className="relative z-10 flex items-start justify-between">
              <div className="text-right">
                <p className="text-[11px] font-medium text-[#8993a5]">
                  {card.title}
                </p>

                <p className="mt-3 text-[28px] font-bold leading-none text-[#172033]">
                  {card.value}
                </p>

                <span
                  className={`mt-3 inline-flex rounded-md px-2.5 py-1 text-[9px] font-medium ${card.badgeBg} ${card.badgeColor}`}
                >
                  {card.badge}
                </span>
              </div>

              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${card.iconBg} ${card.iconColor} transition-transform duration-300 group-hover:scale-110`}
              >
                <Icon
                  size={18}
                  strokeWidth={2}
                />
              </div>
            </div>

            <div
              className={`absolute -bottom-10 -left-7 h-24 w-24 rounded-full ${card.circleBg} opacity-80 transition-transform duration-500 group-hover:scale-125`}
            />
          </div>
        );
      })}
    </section>
  );
};

export default Cards;
