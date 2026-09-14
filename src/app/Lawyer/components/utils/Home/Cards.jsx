"use client";

import React, { useContext } from "react";
import {
  Briefcase,
  Users,
  Calendar,
  Scale,
} from "lucide-react";

import { LawyerContext } from "../../../../../Providers/LawyerContext/lawyer.js";

const Cards = () => {
  const { dashboardStatisics } = useContext(LawyerContext);

  const cases = dashboardStatisics?.cases;
  const clients = dashboardStatisics?.clients;
  const sessions = dashboardStatisics?.sessions;

  const cardsData = [
    {
      title: "القضايا النشطة",
      value: cases?.active ?? 0,
      change: `${cases?.active ?? 0} قضية`,
      icon: Briefcase,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      changeColor: "text-blue-600",
      description: "القضايا قيد المتابعة والإجراءات",
    },
    {
      title: "إجمالي العملاء",
      value: clients?.total ?? 0,
      change: `${clients?.total ?? 0} عميل`,
      icon: Users,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      changeColor: "text-emerald-600",
      description: "إجمالي العملاء المسجلين",
    },
    {
      title: "الجلسات القادمة",
      value: sessions?.scheduled ?? 0,
      change: `${sessions?.scheduled ?? 0} جلسة`,
      icon: Calendar,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
      changeColor: "text-amber-600",
      description: "الجلسات المجدولة",
    },
    {
      title: "إجمالي القضايا",
      value: cases?.total ?? 0,
      change: `${cases?.total ?? 0} قضية`,
      icon: Scale,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      changeColor: "text-purple-600",
      description: "إجمالي القضايا المسجلة",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {cardsData.map((card, idx) => {
        const Icon = card.icon;

        return (
          <div
            key={idx}
            className="p-2 transition-all duration-300 border bg-slate-800 rounded-2xl md:p-5 border-slate-700 shadow-sm hover:shadow-lg hover:-translate-y-0.5"
          >
            <div className="flex items-start justify-between">
              <div className={`p-2.5 ${card.iconBg} rounded-xl`}>
                <Icon className={`w-6 h-6 ${card.iconColor}`} />
              </div>

              <span
                className={`${card.changeColor} text-sm font-medium`}
              >
                {card.change}
              </span>
            </div>

            <h3 className="mt-3 text-2xl font-bold text-white">
              {card.value}
            </h3>

            <p className="text-sm text-white">
              {card.title}
            </p>

            <p className="mt-1 text-xs text-gray-400">
              {card.description}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Cards;