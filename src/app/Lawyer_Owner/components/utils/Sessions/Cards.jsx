import React from "react";
import {
  CalendarDays,
  Clock3,
  CheckCircle2,
  CalendarClock,
  ArrowUpLeft,
} from "lucide-react";

const Cards = () => {
  const cards = [
    {
      title: "جلسات اليوم",
      value: "24",
      description: "جلسة مجدولة اليوم",
      icon: CalendarDays,
      iconBg: "bg-[#EEF5FF]",
      iconColor: "text-[#3E67A5]",
      trend: "+12%",
      trendText: "عن أمس",
    },
    {
      title: "الجلسات القادمة",
      value: "18",
      description: "خلال الأيام القادمة",
      icon: CalendarClock,
      iconBg: "bg-[#F3F0FF]",
      iconColor: "text-[#7357B8]",
      trend: "+8%",
      trendText: "هذا الأسبوع",
    },
    {
      title: "الجلسات المنجزة",
      value: "86",
      description: "جلسة تم الانتهاء منها",
      icon: CheckCircle2,
      iconBg: "bg-[#EFFAF5]",
      iconColor: "text-[#3D9561]",
      trend: "+15%",
      trendText: "هذا الشهر",
    },
    {
      title: "الجلسات المؤجلة",
      value: "7",
      description: "تحتاج إلى متابعة",
      icon: Clock3,
      iconBg: "bg-[#FFF8E8]",
      iconColor: "text-[#B18A2E]",
      trend: "3",
      trendText: "تحتاج إجراء",
    },
  ];

  return (
    <section dir="rtl" className="mb-6 w-full">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="
                group
                rounded-2xl
                border border-[#E7EBF2]
                bg-white
                p-4
                transition-all
                duration-200
                hover:-translate-y-1
                hover:border-[#D7DFEC]
                hover:shadow-[0_8px_25px_rgba(15,23,42,0.06)]
              "
            >
              {/* Top */}
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[11px] font-medium text-[#8993A5]">
                    {card.title}
                  </p>

                  <div className="mt-2 flex items-end gap-2">
                    <span className="text-[25px] font-bold leading-none text-[#0B1C30]">
                      {card.value}
                    </span>

                    <span className="mb-0.5 text-[9px] font-medium text-[#8993A5]">
                      جلسة
                    </span>
                  </div>
                </div>

                {/* Icon */}
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${card.iconBg}`}
                >
                  <Icon
                    size={18}
                    className={card.iconColor}
                  />
                </div>
              </div>

              {/* Description */}
              <p className="mt-3 text-[10px] text-[#8993A5]">
                {card.description}
              </p>

              {/* Bottom */}
              <div className="mt-4 flex items-center gap-1.5 border-t border-[#F0F2F5] pt-3">
                <span
                  className={`flex items-center gap-0.5 text-[10px] font-bold ${
                    card.title === "الجلسات المؤجلة"
                      ? "text-[#B18A2E]"
                      : "text-[#3D9561]"
                  }`}
                >
                  {card.title !== "الجلسات المؤجلة" && (
                    <ArrowUpLeft size={11} />
                  )}

                  {card.trend}
                </span>

                <span className="text-[10px] text-[#8993A5]">
                  {card.trendText}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Cards;