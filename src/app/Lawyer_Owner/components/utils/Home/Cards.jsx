"use client";

import React from "react";
import {
  FaBriefcase,
  FaUsers,
  FaUserTie,
  FaCalendarAlt,
  FaCheckCircle,
} from "react-icons/fa";

const Cards = () => {
  const cards = [
    {
      title: "إجمالي القضايا",
      value: "128",
      change: "+8.2%",
      description: "منذ بداية العام",
      icon: FaBriefcase,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      changeColor: "text-blue-600",
    },
    {
      title: "القضايا النشطة",
      value: "76",
      change: "+5.4%",
      description: "18 قضية هذا الشهر",
      icon: FaBriefcase,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      changeColor: "text-blue-600",
    },
    {
      title: "العملاء",
      value: "342",
      change: "+12.1%",
      description: "+37 هذا الشهر",
      icon: FaUsers,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      changeColor: "text-blue-600",
    },
    {
      title: "فريق المحامين",
      value: "12",
      change: "100%",
      description: "10 نشطون الآن",
      icon: FaUserTie,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      changeColor: "text-blue-600",
    },
    {
      title: "جلسات هذا الأسبوع",
      value: "47",
      change: "8 اليوم",
      description: "2 تحتاج مراجعة",
      icon: FaCalendarAlt,
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
      changeColor: "text-amber-600",
    },
    {
      title: "القضايا المغلقة",
      value: "52",
      change: "+15.8%",
      description: "هذا العام",
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