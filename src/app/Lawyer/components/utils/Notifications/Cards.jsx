
"use client";

import React, { useContext, useMemo } from "react";
import {
  FaBell,
  FaEnvelopeOpen,
  FaCalendarDay,
} from "react-icons/fa";

import { LawyerContext } from "../../../../../Providers/LawyerContext/lawyer.js";

const Cards = () => {
  const { notifications = [] } = useContext(LawyerContext);

  const stats = useMemo(() => {
    const today = new Date();

    const todayNotifications = notifications.filter((notification) => {
      if (!notification?.createdAt) return false;

      const date = new Date(notification.createdAt);

      return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      );
    });

    return {
      total: notifications.length,
      unread: notifications.filter(
        (notification) => !notification?.isRead
      ).length,
      today: todayNotifications.length,
    };
  }, [notifications]);

  const cards = [
    {
      title: "إجمالي الإشعارات",
      value: stats.total,
      description: "جميع الإشعارات",
      icon: FaBell,
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-400",
    },
    {
      title: "غير مقروءة",
      value: stats.unread,
      description: "إشعارات لم تتم قراءتها",
      icon: FaEnvelopeOpen,
      iconBg: "bg-amber-500/10",
      iconColor: "text-amber-400",
    },
    {
      title: "إشعارات اليوم",
      value: stats.today,
      description: "الإشعارات المضافة اليوم",
      icon: FaCalendarDay,
      iconBg: "bg-emerald-500/10",
      iconColor: "text-emerald-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="p-5 transition-all duration-300 border shadow-lg rounded-2xl border-slate-700/50 bg-slate-900 shadow-black/10 hover:-translate-y-1 hover:border-slate-600 hover:shadow-xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
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
