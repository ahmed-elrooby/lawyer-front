"use client";

import React from "react";
import { Files, CheckCircle, Clock, UploadCloud } from "lucide-react";

const Cards = () => {
  const cardsData = [
    {
      id: 1,
      title: "إجمالي الملفات",
      value: "10",
      description: "جميع الملفات المخزنة في النظام",
      icon: Files,
      gradient: "from-blue-600 to-cyan-500",
      iconBg: "from-blue-500/30 to-cyan-500/20",
      iconColor: "text-blue-300",
      glow: "rgba(59,130,246,0.25)",
    },
    {
      id: 2,
      title: "مكتملة",
      value: "4",
      description: "الملفات المكتملة بنجاح",
      icon: CheckCircle,
      gradient: "from-emerald-600 to-teal-500",
      iconBg: "from-emerald-500/30 to-teal-500/20",
      iconColor: "text-emerald-300",
      glow: "rgba(16,185,129,0.25)",
    },
    {
      id: 3,
      title: "قيد المراجعة",
      value: "3",
      description: "ملفات تنتظر المراجعة والتدقيق",
      icon: Clock,
      gradient: "from-amber-600 to-orange-500",
      iconBg: "from-amber-500/30 to-orange-500/20",
      iconColor: "text-amber-300",
      glow: "rgba(245,158,11,0.25)",
    },
    {
      id: 4,
      title: "مرفوعة حديثاً",
      value: "3",
      description: "الملفات المضافة خلال 24 ساعة",
      icon: UploadCloud,
      gradient: "from-purple-600 to-pink-500",
      iconBg: "from-purple-500/30 to-pink-500/20",
      iconColor: "text-purple-300",
      glow: "rgba(168,85,247,0.25)",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 p-1 mt-4 md:p-4 sm:grid-cols-2 lg:grid-cols-4">
      {cardsData.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.id}
            className="relative p-6 overflow-hidden transition-all duration-300 ease-out border cursor-pointer group rounded-2xl border-slate-700/50 bg-slate-900/80 backdrop-blur-sm hover:-translate-y-1 hover:shadow-xl"
            style={{
              boxShadow: `0 10px 25px -10px ${card.glow}`,
            }}
          >
            {/* Gradient hover background */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
            />

            <div className="relative z-10">
              {/* Top section */}
              <div className="flex items-center justify-between mb-5">
                <div
                  className={`
                    p-3 rounded-2xl
                    bg-gradient-to-br ${card.iconBg}
                    border border-white/10
                    transition-transform duration-300
                    group-hover:scale-110
                  `}
                >
                  <Icon className={`h-7 w-7 ${card.iconColor}`} />
                </div>

                <div className="text-right">
                  <span
                    className="text-4xl font-black text-white"
                    style={{ textShadow: `0 0 10px ${card.glow}` }}
                  >
                    {card.value}
                  </span>
                </div>
              </div>

              {/* Title */}
              <h4 className="text-lg font-bold text-white">
                {card.title}
              </h4>

              {/* Description */}
              <p className="mt-2 text-sm transition text-slate-300 opacity-80 group-hover:opacity-100">
                {card.description}
              </p>
            </div>

            {/* Bottom glow line */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition" />
          </div>
        );
      })}
    </div>
  );
};

export default Cards;