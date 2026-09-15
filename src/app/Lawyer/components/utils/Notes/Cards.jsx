
"use client";

import React, { useContext, useMemo } from "react";
import {
  FaStickyNote,
  FaCalendarDay,
  FaGavel,
  FaCalendarCheck,
} from "react-icons/fa";

import { LawyerContext } from "../../../../../Providers/LawyerContext/lawyer.js";

const Cards = () => {
  const { notes = [] } = useContext(LawyerContext);

  const stats = useMemo(() => {
    const today = new Date();

    const isToday = (date) => {
      if (!date) return false;

      const noteDate = new Date(date);

      return (
        noteDate.getDate() === today.getDate() &&
        noteDate.getMonth() === today.getMonth() &&
        noteDate.getFullYear() === today.getFullYear()
      );
    };

    return {
      total: notes.length,

      today: notes.filter((note) => isToday(note.createdAt)).length,

      cases: notes.filter(
        (note) => note.caseId?._id || note.caseId
      ).length,

      sessions: notes.filter(
        (note) => note.sessionId?._id || note.sessionId
      ).length,
    };
  }, [notes]);

  const cards = [
    {
      title: "إجمالي الملاحظات",
      value: stats.total,
      description: "جميع الملاحظات",
      icon: FaStickyNote,
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-400",
    },
    {
      title: "ملاحظات اليوم",
      value: stats.today,
      description: "تمت إضافتها اليوم",
      icon: FaCalendarDay,
      iconBg: "bg-emerald-500/10",
      iconColor: "text-emerald-400",
    },
    {
      title: "مرتبطة بقضايا",
      value: stats.cases,
      description: "ملاحظات مرتبطة بقضية",
      icon: FaGavel,
      iconBg: "bg-amber-500/10",
      iconColor: "text-amber-400",
    },
    {
      title: "مرتبطة بجلسات",
      value: stats.sessions,
      description: "ملاحظات مرتبطة بجلسة",
      icon: FaCalendarCheck,
      iconBg: "bg-purple-500/10",
      iconColor: "text-purple-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="p-5 transition-all duration-300 border shadow-lg rounded-2xl border-slate-700/50 bg-slate-900 shadow-black/10 hover:-translate-y-1 hover:border-slate-600 hover:shadow-xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-400">
                  {card.title}
                </p>

                <p className="mt-2 text-3xl font-bold text-white">
                  {card.value}
                </p>

                <p className="mt-2 text-xs text-slate-500">
                  {card.description}
                </p>
              </div>

              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${card.iconBg}`}
              >
                <Icon className={`text-xl ${card.iconColor}`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Cards;
