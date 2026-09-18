import React from "react";
import {
  Bell,
  BellRing,
  CalendarCheck2,
  FileText,
} from "lucide-react";

const NotificationStats = () => {
  const stats = [
    {
      title: "إجمالي الإشعارات",
      value: "48",
      description: "إجمالي التنبيهات المسجلة",
      icon: Bell,
      iconBg: "bg-[#EAF0FF]",
      iconColor: "text-[#4868B4]",
    },
    {
      title: "غير المقروءة",
      value: "7",
      description: "إشعارات تحتاج إلى مراجعة",
      icon: BellRing,
      iconBg: "bg-[#FFF4D6]",
      iconColor: "text-[#8A6A00]",
    },
    {
      title: "تنبيهات الجلسات",
      value: "12",
      description: "تنبيهات مرتبطة بالجلسات",
      icon: CalendarCheck2,
      iconBg: "bg-[#EAF7F0]",
      iconColor: "text-[#25804D]",
    },
    {
      title: "تنبيهات القضايا",
      value: "18",
      description: "تنبيهات مرتبطة بالقضايا",
      icon: FileText,
      iconBg: "bg-[#F2ECFF]",
      iconColor: "text-[#7551A8]",
    },
  ];

  return (
    <section dir="rtl" className="mb-7">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <div
              key={index}
              className="
                rounded-xl border border-[#E6E8EC]
                bg-white p-4
                shadow-[0_2px_8px_rgba(11,28,48,0.03)]
                transition-all duration-200
                hover:-translate-y-0.5
                hover:shadow-[0_6px_18px_rgba(11,28,48,0.06)]
              "
            >
              <div className="flex items-start justify-between gap-3">
                
                {/* Information */}
                <div>
                  <p className="text-[11px] font-semibold text-[#59616D]">
                    {stat.title}
                  </p>

                  <h3 className="mt-2 text-[25px] font-bold leading-none text-[#0B1C30]">
                    {stat.value}
                  </h3>

                  <p className="mt-2 text-[10px] font-medium text-[#8A9099]">
                    {stat.description}
                  </p>
                </div>

                {/* Icon */}
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${stat.iconBg}`}
                >
                  <Icon size={19} className={stat.iconColor} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default NotificationStats;