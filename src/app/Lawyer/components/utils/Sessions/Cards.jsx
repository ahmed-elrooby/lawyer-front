
"use client";

import React, { useContext, useMemo } from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaCheckCircle,
  FaCalendarDay,
} from "react-icons/fa";

import { LawyerContext } from "../../../../../Providers/LawyerContext/lawyer.js";

const Cards = () => {
  const { sessions } = useContext(LawyerContext);

  const stats = useMemo(() => {
    const data = Array.isArray(sessions) ? sessions : [];

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const total = data.length;

    const todaySessions = data.filter((session) => {
      if (!session?.sessionDate) return false;

      const date = new Date(session.sessionDate);
      date.setHours(0, 0, 0, 0);

      return date.getTime() === today.getTime();
    }).length;

    const upcoming = data.filter((session) => {
      if (!session?.sessionDate) return false;

      const date = new Date(session.sessionDate);

      return (
        date >= tomorrow &&
        session?.status === "scheduled"
      );
    }).length;

    const completed = data.filter(
      (session) => session?.status === "completed",
    ).length;

    return {
      total,
      todaySessions,
      upcoming,
      completed,
    };
  }, [sessions]);

  const cards = [
    {
      title: "إجمالي الجلسات",
      value: stats.total,
      icon: FaCalendarAlt,
      iconClass: "bg-cyan-500/10 text-cyan-400",
    },
    {
      title: "جلسات اليوم",
      value: stats.todaySessions,
      icon: FaCalendarDay,
      iconClass: "bg-amber-500/10 text-amber-400",
    },
    {
      title: "الجلسات القادمة",
      value: stats.upcoming,
      icon: FaClock,
      iconClass: "bg-blue-500/10 text-blue-400",
    },
    {
      title: "الجلسات المكتملة",
      value: stats.completed,
      icon: FaCheckCircle,
      iconClass: "bg-emerald-500/10 text-emerald-400",
    },
  ];

  return (
    <div
      dir="rtl"
      className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 xl:grid-cols-4"
    >
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="p-5 transition duration-200 border shadow-lg rounded-2xl border-slate-700/50 bg-slate-900 hover:border-slate-600/70"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400">
                  {card.title}
                </p>

                <h2 className="mt-2 text-3xl font-bold text-white">
                  {card.value}
                </h2>
              </div>

              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${card.iconClass}`}
              >
                <Icon className="text-lg" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Cards;

