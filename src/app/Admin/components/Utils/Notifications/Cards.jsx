
"use client";

import React, { useContext } from "react";
import {
  FaBell,
  FaEnvelopeOpen,
  FaUsers,
  FaExclamationTriangle,
} from "react-icons/fa";

import { AdminContext } from "../../../../../Providers/AdminContext/Admin.js";

const Cards = () => {
  const { notifications } = useContext(AdminContext);
  console.log(notifications)

  const notificationList = Array.isArray(notifications)
    ? notifications
    : [];

  const totalNotifications = notificationList.length;

  const unreadNotifications = notificationList.filter(
    (notification) => !notification?.isRead
  ).length;

  const userNotifications = notificationList.filter(
    (notification) =>
      notification?.type === "user" ||
      notification?.type === "users"
  ).length;

  const importantNotifications = notificationList.filter(
    (notification) =>
      notification?.type === "important" ||
      notification?.priority === "high"
  ).length;

  const cards = [
    {
      title: "إجمالي الإشعارات",
      value: totalNotifications,
      description: "إجمالي الإشعارات في النظام",
      icon: FaBell,
      iconWrapper: "bg-blue-50 text-blue-600",
    },
    {
      title: "غير مقروءة",
      value: unreadNotifications,
      description: "إشعارات تحتاج إلى مراجعة",
      icon: FaEnvelopeOpen,
      iconWrapper: "bg-amber-50 text-amber-600",
    },
    {
      title: "إشعارات المستخدمين",
      value: userNotifications,
      description: "مرتبطة بإدارة المستخدمين",
      icon: FaUsers,
      iconWrapper: "bg-violet-50 text-violet-600",
    },
    {
      title: "تنبيهات مهمة",
      value: importantNotifications,
      description: "إشعارات ذات أولوية عالية",
      icon: FaExclamationTriangle,
      iconWrapper: "bg-red-50 text-red-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 mb-6 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="relative p-5 overflow-hidden transition-all duration-300 bg-white border shadow-sm rounded-2xl border-slate-200/70 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-start justify-between">
              <div
                className={`flex items-center justify-center w-12 h-12 rounded-2xl ${card.iconWrapper}`}
              >
                <Icon className="text-lg" />
              </div>
            </div>

            <div className="mt-5">
              <p className="text-sm font-medium text-slate-500">
                {card.title}
              </p>

              <h3 className="mt-2 text-3xl font-bold tracking-tight text-slate-800">
                {card.value}
              </h3>

              <p className="mt-2 text-xs font-medium text-slate-400">
                {card.description}
              </p>
            </div>

            <div className="absolute w-24 h-24 rounded-full -bottom-10 -left-10 bg-slate-50" />
          </div>
        );
      })}
    </div>
  );
};

export default Cards;
