"use client";

import React from "react";
import {
  Briefcase,
  AlertCircle,
  CheckCircle,
  Calendar,
  TrendingUp,
  Clock,
} from "lucide-react";

const Cards = () => {
  const cardsData = [
    {
      title: "القضايا النشطة",
      value: "187",
      change: "+12%",
      changeType: "up",
      icon: Briefcase,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      changeColor: "text-emerald-600",
      description: "قيد التحقيق والإجراءات",
    },
    {
      title: "قضايا متأخرة",
      value: "23",
      change: "+3",
      changeType: "up",
      icon: AlertCircle,
      iconBg: "bg-rose-100",
      iconColor: "text-rose-600",
      changeColor: "text-rose-600",
      description: "تجاوزت المواعيد النهائية",
    },
    {
      title: "قضايا مغلقة",
      value: "64",
      change: "+8%",
      changeType: "up",
      icon: CheckCircle,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      changeColor: "text-emerald-600",
      description: "تم الحسم والإنهاء",
    },
    {
      title: "الجلسات القادمة",
      value: "12",
      change: "عاجل",
      changeType: "info",
      icon: Calendar,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
      changeColor: "text-amber-600",
      description: "خلال الأيام السبعة القادمة",
      isClock: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {cardsData.map((card, idx) => {
        const Icon = card.icon;
        const ChangeIcon = card.changeType === "up" ? TrendingUp : Clock;
        return (
          <div
            key={idx}
            className="bg-slate-800 rounded-2xl p-2 md:p-5 shadow-sm border border-slate-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
          >
            <div className="flex items-start justify-between">
              <div className={`p-2.5 ${card.iconBg} rounded-xl`}>
                <Icon className={`h-6 w-6 ${card.iconColor}`} />
              </div>
              <span
                className={`${card.changeColor} text-sm font-medium inline-flex items-center gap-0.5`}
              >
                {card.changeType === "up" && <TrendingUp className="h-3.5 w-3.5" />}
                {card.isClock && <Clock className="h-3.5 w-3.5" />}
                {card.change}
              </span>
            </div>
            <h3 className="mt-3 text-2xl font-bold text-gray-800">{card.value}</h3>
            <p className="text-sm text-white">{card.title}</p>
            <p className="mt-1 text-xs text-gray-400">{card.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Cards;