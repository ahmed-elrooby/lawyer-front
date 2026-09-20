"use client";

import React, { useContext, useMemo } from "react";
import {
  BriefcaseBusiness,
  FileCheck2,
  TrendingUp,
  CalendarCheck2,
  ArrowUpRight,
} from "lucide-react";
import { OwnerContext } from "../../../../../Providers/LawyerOwner/OwnerProvider.js";

const StatsCards = () => {
  const { cases = [], sessions = [] } = useContext(OwnerContext);

  const stats = useMemo(() => {
    const totalCases = cases.length;

    const closedCases = cases.filter((item) => {
      const status = item?.status?.toLowerCase();

      return (
        status === "closed" ||
        status === "مغلقة" ||
        status === "مغلق" ||
        status === "completed" ||
        status === "completed"
      );
    }).length;

    const closingRate =
      totalCases > 0
        ? Math.round((closedCases / totalCases) * 100)
        : 0;

    return [
      {
        title: "إجمالي القضايا",
        value: totalCases,
        description: "إجمالي القضايا المسجلة",
        icon: BriefcaseBusiness,
        iconBg: "bg-[#EAF0FF]",
        iconColor: "text-[#4868B4]",
        valueColor: "text-[#0B1C30]",
      },
      {
        title: "القضايا المنتهيه",
        value: closedCases,
        description: "قضية تم الانتهاء منها",
        icon: FileCheck2,
        iconBg: "bg-[#E8F6EF]",
        iconColor: "text-[#258A5A]",
        valueColor: "text-[#258A5A]",
      },
      {
        title: "معدل إغلاق القضايا",
        value: `${closingRate}%`,
        description: "من إجمالي القضايا",
        icon: TrendingUp,
        iconBg: "bg-[#FFF7DF]",
        iconColor: "text-[#9A7A00]",
        valueColor: "text-[#9A7A00]",
      },
      {
        title: "إجمالي الجلسات",
        value: sessions.length,
        description: "جلسة خلال الفترة المحددة",
        icon: CalendarCheck2,
        iconBg: "bg-[#F3ECFF]",
        iconColor: "text-[#7950B5]",
        valueColor: "text-[#7950B5]",
      },
    ];
  }, [cases, sessions]);

  return (
    <section dir="rtl" className="w-full mb-7">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <div
              key={index}
              className="group rounded-xl border border-[#E8EAF0] bg-white p-5 shadow-[0_2px_8px_rgba(11,28,48,0.03)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#D9DEE8] hover:shadow-[0_6px_18px_rgba(11,28,48,0.06)]"
            >
              {/* Top */}
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold text-[#777B84]">
                    {stat.title}
                  </p>

                  <div className="flex items-baseline gap-2 mt-2">
                    <span
                      className={`text-[26px] font-bold leading-none ${stat.valueColor}`}
                    >
                      {stat.value}
                    </span>
                  </div>
                </div>

                {/* Icon */}
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${stat.iconBg}`}
                >
                  <Icon size={19} className={stat.iconColor} />
                </div>
              </div>

              {/* Bottom */}
              <div className="mt-5 border-t border-[#F0F1F4] pt-3">
                <p className="text-[10px] font-medium text-[#8A8E96]">
                  {stat.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default StatsCards;