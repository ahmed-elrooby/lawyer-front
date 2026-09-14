"use client";

import React, { useContext } from "react";
import {
  FaHistory,
  FaCalendarDay,
  FaGavel,
  FaClock,
} from "react-icons/fa";
import { AdminContext } from "../../../../../Providers/AdminContext/Admin.js";

const Cards = () => {
  const { timeLine = [] } = useContext(AdminContext);

  const today = new Date();

  // نشاطات اليوم
  const activitiesToday = timeLine.filter((item) => {
    if (!item?.createdAt) return false;

    const activityDate = new Date(item.createdAt);

    return (
      activityDate.getDate() === today.getDate() &&
      activityDate.getMonth() === today.getMonth() &&
      activityDate.getFullYear() === today.getFullYear()
    );
  });

  // نشاطات القضايا
  const caseActivities = timeLine.filter(
    (item) =>
      item.type === "case_created" ||
      item.type === "case_updated"
  );

  // نشاطات الجلسات
  const sessionActivities = timeLine.filter(
    (item) =>
      item.type === "session_created" ||
      item.type === "session_updated"
  );

  const cards = [
    {
      title: "إجمالي النشاطات",
      value: timeLine.length,
      description: "جميع النشاطات المسجلة",
      icon: FaHistory,
      iconBg: "bg-slate-100",
      iconColor: "text-slate-700",
    },
    {
      title: "نشاطات اليوم",
      value: activitiesToday.length,
      description: "النشاطات التي تمت اليوم",
      icon: FaCalendarDay,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "نشاطات القضايا",
      value: caseActivities.length,
      description: "إنشاء وتعديل القضايا",
      icon: FaGavel,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
    {
      title: "نشاطات الجلسات",
      value: sessionActivities.length,
      description: "إنشاء وتعديل الجلسات",
      icon: FaClock,
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {card.title}
                </p>

                <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
{card.value.toLocaleString("en-US")}                </h2>

                <p className="mt-2 text-xs text-slate-400">
                  {card.description}
                </p>
              </div>

              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${card.iconBg}`}
              >
                <Icon className={`text-lg ${card.iconColor}`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Cards;