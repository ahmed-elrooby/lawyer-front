"use client";

import React, { useEffect, useState } from "react";
import {
  Users,
  UserCheck,
  Calendar,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

const Cards = () => {
  const cardsData = [
    {
      title: "إجمالي العملاء",
      value: 5,
      icon: Users,
      color: "emerald",
      suffix: "عميل",
      change: "+12%",
      changeType: "up",
    },
    {
      title: "العملاء النشطين",
      value: 4,
      icon: UserCheck,
      color: "blue",
      suffix: "عميل",
      change: "+5%",
      changeType: "up",
    },
    {
      title: "عملاء لديهم جلسات قريبة",
      value: 4,
      icon: Calendar,
      color: "amber",
      suffix: "عميل",
      change: "4 جلسات",
      changeType: "info",
    },
    {
      title: "عملاء لديهم مهام متأخرة",
      value: 3,
      icon: AlertTriangle,
      color: "rose",
      suffix: "عميل",
      change: "3 مهام",
      changeType: "warning",
    },
  ];

  const colors = {
    emerald: {
      from: "#10B981",
      to: "#047857",
      bgFrom: "from-emerald-500/20",
      bgTo: "to-emerald-600/10",
      text: "text-emerald-400",
      border: "hover:border-emerald-400/50",
      shadow: "hover:shadow-emerald-500/20",
      badge: "bg-emerald-500/20 text-emerald-300",
    },
    blue: {
      from: "#3B82F6",
      to: "#1D4ED8",
      bgFrom: "from-blue-500/20",
      bgTo: "to-blue-600/10",
      text: "text-blue-400",
      border: "hover:border-blue-400/50",
      shadow: "hover:shadow-blue-500/20",
      badge: "bg-blue-500/20 text-blue-300",
    },
    amber: {
      from: "#F59E0B",
      to: "#B45309",
      bgFrom: "from-amber-500/20",
      bgTo: "to-amber-600/10",
      text: "text-amber-400",
      border: "hover:border-amber-400/50",
      shadow: "hover:shadow-amber-500/20",
      badge: "bg-amber-500/20 text-amber-300",
    },
    rose: {
      from: "#F43F5E",
      to: "#BE123C",
      bgFrom: "from-rose-500/20",
      bgTo: "to-rose-600/10",
      text: "text-rose-400",
      border: "hover:border-rose-400/50",
      shadow: "hover:shadow-rose-500/20",
      badge: "bg-rose-500/20 text-rose-300",
    },
  };

  // Animated counter with easing
  const AnimatedCounter = ({ target, color }) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
      const duration = 800;
      const startTime = performance.now();
      const animate = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
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
      <span className="text-3xl font-black tracking-tight text-white md:text-4xl drop-shadow-md">
        {count}
      </span>
    );
  };

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {cardsData.map((card, idx) => {
        const Icon = card.icon;
        const style = colors[card.color];

        return (
          <div
            key={idx}
            className={`
              group relative overflow-hidden rounded-2xl 
              bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-sm
              border border-slate-700/50 
              transition-all duration-500 
              hover:scale-[1.02] hover:-translate-y-1 
              hover:shadow-2xl ${style.shadow}
              ${style.border}
            `}
          >
            {/* Animated gradient background on hover */}
            <div
              className={`
                absolute inset-0 bg-gradient-to-br 
                from-${card.color}-600/0 via-${card.color}-500/0 to-${card.color}-600/0 
                group-hover:from-${card.color}-600/10 group-hover:via-${card.color}-500/5 group-hover:to-${card.color}-600/10 
                rounded-2xl transition-all duration-700
              `}
              style={{
                backgroundImage: `radial-gradient(circle at 30% 20%, ${style.from}15 0%, transparent 70%)`,
              }}
            />

            {/* Glass reflection effect */}
            <div className="absolute transition-all duration-1000 transform -skew-x-12 opacity-0 -inset-full group-hover:inset-0 group-hover:opacity-20 bg-gradient-to-r from-white/0 via-white/20 to-white/0" />

            <div className="relative z-10 p-5">
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`
                  p-3 rounded-2xl bg-gradient-to-br ${style.bgFrom} ${style.bgTo}
                  backdrop-blur-sm shadow-lg border border-white/10
                  transition-all duration-300 group-hover:scale-110 group-hover:rotate-3
                `}
                >
                  <Icon className={`h-6 w-6 ${style.text} drop-shadow-md`} />
                </div>

                {/* Change indicator */}
                <div
                  className={`
                  flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium
                  ${style.badge} backdrop-blur-sm border border-white/10
                `}
                >
                  {card.changeType === "up" && (
                    <TrendingUp className="w-3 h-3" />
                  )}
                  {card.changeType === "warning" && (
                    <AlertTriangle className="w-3 h-3" />
                  )}
                  {card.changeType === "info" && (
                    <Calendar className="w-3 h-3" />
                  )}
                  <span>{card.change}</span>
                </div>
              </div>

              <div className="mt-3">
                <div className="flex items-baseline gap-1.5">
                  <AnimatedCounter target={card.value} color={card.color} />
                  <span className="text-sm font-medium text-slate-400">
                    {card.suffix}
                  </span>
                </div>
                <p className="mt-2 text-sm font-medium tracking-wide text-slate-300">
                  {card.title}
                </p>
              </div>
            </div>

            {/* Bottom decorative bar */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        );
      })}
    </div>
  );
};

export default Cards;
