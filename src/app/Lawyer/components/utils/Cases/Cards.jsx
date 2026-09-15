"use client";

import React, { useContext, useMemo } from "react";
import {
  FaGavel,
  FaClock,
  FaBalanceScale,
  FaCheckCircle,
} from "react-icons/fa";

import { LawyerContext } from "../../../../../Providers/LawyerContext/lawyer.js";

const Cards = () => {
  const { cases = [] } = useContext(LawyerContext);

  const caseStatistics = useMemo(() => {
    return {
      total: cases.length,

      active: cases.filter(
        (caseItem) => caseItem.status === "active"
      ).length,

      reservedForJudgment: cases.filter(
        (caseItem) =>
          caseItem.status === "reserved_for_judgment"
      ).length,

      judged: cases.filter(
        (caseItem) => caseItem.status === "judged"
      ).length,
    };
  }, [cases]);

  const cards = [
    {
      title: "إجمالي القضايا",
      value: caseStatistics.total,
      icon: FaGavel,
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-400",
    },
    {
      title: "القضايا النشطة",
      value: caseStatistics.active,
      icon: FaClock,
      iconBg: "bg-emerald-500/10",
      iconColor: "text-emerald-400",
    },
    {
      title: "محجوزة للحكم",
      value: caseStatistics.reservedForJudgment,
      icon: FaBalanceScale,
      iconBg: "bg-amber-500/10",
      iconColor: "text-amber-400",
    },
    {
      title: "تم الحكم",
      value: caseStatistics.judged,
      icon: FaCheckCircle,
      iconBg: "bg-purple-500/10",
      iconColor: "text-purple-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="p-5 transition-colors border rounded-2xl border-slate-700 bg-slate-800/60 hover:border-slate-600"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">
                  {card.title}
                </p>

                <h3 className="mt-2 text-2xl font-bold text-white">
                  {card.value}
                </h3>
              </div>

              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${card.iconBg} ${card.iconColor}`}
              >
                <Icon />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Cards;