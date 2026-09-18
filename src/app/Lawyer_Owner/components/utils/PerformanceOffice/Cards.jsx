import React from "react";
import {
  BriefcaseBusiness,
  FileCheck2,
  TrendingUp,
  CalendarCheck2,
  ArrowUpRight,
} from "lucide-react";

const StatsCards = () => {
  const stats = [
    {
      title: "إجمالي القضايا",
      value: "100",
      description: "إجمالي القضايا المسجلة",
      change: "+12.5%",
      icon: BriefcaseBusiness,
      iconBg: "bg-[#EAF0FF]",
      iconColor: "text-[#4868B4]",
      valueColor: "text-[#0B1C30]",
      changeColor: "text-[#258A5A]",
    },
    {
      title: "القضايا المغلقة",
      value: "68",
      description: "قضية تم الانتهاء منها",
      change: "+9.8%",
      icon: FileCheck2,
      iconBg: "bg-[#E8F6EF]",
      iconColor: "text-[#258A5A]",
      valueColor: "text-[#258A5A]",
      changeColor: "text-[#258A5A]",
    },
    {
      title: "معدل إغلاق القضايا",
      value: "68%",
      description: "من إجمالي القضايا",
      change: "+4.2%",
      icon: TrendingUp,
      iconBg: "bg-[#FFF7DF]",
      iconColor: "text-[#9A7A00]",
      valueColor: "text-[#9A7A00]",
      changeColor: "text-[#258A5A]",
    },
    {
      title: "إجمالي الجلسات",
      value: "86",
      description: "جلسة خلال الفترة المحددة",
      change: "+11.4%",
      icon: CalendarCheck2,
      iconBg: "bg-[#F3ECFF]",
      iconColor: "text-[#7950B5]",
      valueColor: "text-[#7950B5]",
      changeColor: "text-[#258A5A]",
    },
  ];

  return (
    <section dir="rtl" className="mb-7 w-full">
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

                  <div className="mt-2 flex items-baseline gap-2">
                    <span
                      className={`text-[26px] font-bold leading-none ${stat.valueColor}`}
                    >
                      {stat.value}
                    </span>

                    <span
                      className={`flex items-center gap-0.5 text-[9px] font-bold ${stat.changeColor}`}
                    >
                      <ArrowUpRight size={11} />
                      {stat.change}
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