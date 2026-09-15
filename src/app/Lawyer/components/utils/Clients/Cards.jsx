"use client";

import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  Users,
  UserCheck,
  Calendar,
  AlertTriangle,
} from "lucide-react";

import { LawyerContext } from "../../../../../Providers/LawyerContext/lawyer.js";

const AnimatedCounter = ({ target }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 600;
    const startTime = performance.now();

    const animate = (now) => {
      const progress = Math.min(
        (now - startTime) / duration,
        1,
      );

      const eased = 1 - Math.pow(1 - progress, 3);

      setCount(Math.floor(eased * target));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(animate);
  }, [target]);

  return (
    <span className="text-2xl font-bold text-white md:text-3xl">
      {count}
    </span>
  );
};

const Cards = () => {
  const { clients = [] } = useContext(LawyerContext);

  const statistics = useMemo(() => {
    const totalClients = clients.length;

    const activeClients = clients.filter(
      (client) => client.isActive === true,
    ).length;

    return {
      totalClients,
      activeClients,
      clientsWithUpcomingSessions: 0,
      clientsWithOverdueTasks: 0,
    };
  }, [clients]);

  const cardsData = [
    {
      title: "إجمالي العملاء",
      value: statistics.totalClients,
      icon: Users,
      iconBg: "bg-emerald-500/10",
      iconColor: "text-emerald-400",
      badge: `${statistics.totalClients} عميل`,
      badgeColor: "bg-emerald-500/10 text-emerald-400",
    },
    {
      title: "العملاء النشطين",
      value: statistics.activeClients,
      icon: UserCheck,
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-400",
      badge: `${statistics.activeClients} نشط`,
      badgeColor: "bg-blue-500/10 text-blue-400",
    },
    {
      title: "عملاء لديهم جلسات قريبة",
      value: statistics.clientsWithUpcomingSessions,
      icon: Calendar,
      iconBg: "bg-amber-500/10",
      iconColor: "text-amber-400",
      badge: "قريبًا",
      badgeColor: "bg-amber-500/10 text-amber-400",
    },
    {
      title: "عملاء لديهم مهام متأخرة",
      value: statistics.clientsWithOverdueTasks,
      icon: AlertTriangle,
      iconBg: "bg-rose-500/10",
      iconColor: "text-rose-400",
      badge: "متابعة",
      badgeColor: "bg-rose-500/10 text-rose-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cardsData.map((card, index) => {
        const Icon = card.icon;

        return (
          <div
            key={index}
            className="p-4 transition-colors duration-200 border rounded-xl border-slate-700/70 bg-slate-800/70 hover:border-slate-600 hover:bg-slate-800"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              {/* Icon */}
              <div
                className={`
                  flex h-10 w-10 items-center justify-center
                  rounded-lg
                  ${card.iconBg}
                `}
              >
                <Icon
                  className={`h-5 w-5 ${card.iconColor}`}
                />
              </div>

              {/* Badge */}
              <span
                className={`
                  rounded-md
                  px-2 py-1
                  text-[11px]
                  font-medium
                  ${card.badgeColor}
                `}
              >
                {card.badge}
              </span>
            </div>

            {/* Value */}
            <div className="mt-5">
              <div className="flex items-baseline gap-2">
                <AnimatedCounter target={card.value} />

                <span className="text-xs text-slate-500">
                  عميل
                </span>
              </div>

              <p className="mt-1.5 text-sm text-slate-400">
                {card.title}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Cards;