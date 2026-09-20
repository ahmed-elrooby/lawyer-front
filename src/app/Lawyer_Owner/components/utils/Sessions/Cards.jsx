"use client";

import React, { useContext } from "react";
import {
  CalendarDays,
  Clock3,
  CheckCircle2,
  CalendarClock,
  ArrowUpLeft,
} from "lucide-react";
import { OwnerContext } from "../../../../../Providers/LawyerOwner/OwnerProvider.js";

const Cards = () => {
  const { sessions = [] } = useContext(OwnerContext);

  const today = new Date();

const todayString = [
  today.getFullYear(),
  String(today.getMonth() + 1).padStart(2, "0"),
  String(today.getDate()).padStart(2, "0"),
].join("-");

const getDateString = (date) => {
  if (!date) return null;

  return new Date(date).toISOString().split("T")[0];
};

const todaySessions = sessions.filter(
  (session) =>
    getDateString(session.sessionDate) === todayString
);

const upcomingSessions = sessions.filter(
  (session) => {
    const sessionDate = getDateString(session.sessionDate);

    return (
      sessionDate &&
      sessionDate > todayString &&
      session.status === "scheduled"
    );
  }
);

const completedSessions = sessions.filter(
  (session) => session.status === "completed"
);

const postponedSessions = sessions.filter(
  (session) => session.status === "postponed"
);

  const cards = [
    {
      title: "جلسات اليوم",
      value: todaySessions.length,
      description: "جلسة مجدولة اليوم",
      icon: CalendarDays,
      iconBg: "bg-[#EEF5FF]",
      iconColor: "text-[#3E67A5]",
      trend: todaySessions.length,
      trendText: "اليوم",
    },
    {
      title: "الجلسات القادمة",
      value: upcomingSessions.length,
      description: "خلال الأيام القادمة",
      icon: CalendarClock,
      iconBg: "bg-[#F3F0FF]",
      iconColor: "text-[#7357B8]",
      trend: upcomingSessions.length,
      trendText: "هذا الأسبوع",
    },
    {
      title: "الجلسات المنجزة",
      value: completedSessions.length,
      description: "جلسة تم الانتهاء منها",
      icon: CheckCircle2,
      iconBg: "bg-[#EFFAF5]",
      iconColor: "text-[#3D9561]",
      trend: completedSessions.length,
      trendText: "مكتملة",
    },
    {
      title: "الجلسات المؤجلة",
      value: postponedSessions.length,
      description: "تحتاج إلى متابعة",
      icon: Clock3,
      iconBg: "bg-[#FFF8E8]",
      iconColor: "text-[#B18A2E]",
      trend: postponedSessions.length,
      trendText: "تحتاج إجراء",
    },
  ];

  return (
    <section dir="rtl" className="w-full mb-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="
                group
                rounded-2xl
                border border-[#E7EBF2]
                bg-white
                p-4
                transition-all
                duration-200
                hover:-translate-y-1
                hover:border-[#D7DFEC]
                hover:shadow-[0_8px_25px_rgba(15,23,42,0.06)]
              "
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[11px] font-medium text-[#8993A5]">
                    {card.title}
                  </p>

                  <div className="flex items-end gap-2 mt-2">
                    <span className="text-[25px] font-bold leading-none text-[#0B1C30]">
                      {card.value}
                    </span>

                    <span className="mb-0.5 text-[9px] font-medium text-[#8993A5]">
                      جلسة
                    </span>
                  </div>
                </div>

                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${card.iconBg}`}
                >
                  <Icon size={18} className={card.iconColor} />
                </div>
              </div>

              <p className="mt-3 text-[10px] text-[#8993A5]">
                {card.description}
              </p>

              <div className="mt-4 flex items-center gap-1.5 border-t border-[#F0F2F5] pt-3">
                <span
                  className={`flex items-center gap-0.5 text-[10px] font-bold ${
                    card.title === "الجلسات المؤجلة"
                      ? "text-[#B18A2E]"
                      : "text-[#3D9561]"
                  }`}
                >
                  {card.title !== "الجلسات المؤجلة" && (
                    <ArrowUpLeft size={11} />
                  )}

                  {card.trend}
                </span>

                <span className="text-[10px] text-[#8993A5]">
                  {card.trendText}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Cards;