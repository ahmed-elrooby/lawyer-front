import React from "react";
import {
  FileText,
  CalendarDays,
  Plus,
  Clock,
} from "lucide-react";

const Activitiy = () => {
  const activities = [
    {
      id: 1,
      title: "تم تحديث بيانات القضية",
      description: "تمت إضافة المستندات الجديدة إلى ملف القضية.",
      time: "منذ ساعتين",
      icon: FileText,
      color: "bg-[#111827]",
      iconBg: "bg-[#edf3ff]",
    },
    {
      id: 2,
      title: "تم إضافة موعد جديد",
      description: "تمت إضافة موعد الجلسة القادمة.",
      time: "أمس",
      icon: CalendarDays,
      color: "bg-[#d8b63e]",
      iconBg: "bg-[#fff8dd]",
    },
    {
      id: 3,
      title: "إنشاء القضية",
      description: "تم إنشاء القضية وإضافتها إلى النظام.",
      time: "15 مايو",
      icon: Plus,
      color: "bg-[#cbd5e1]",
      iconBg: "bg-[#f4f6f9]",
    },
  ];

  return (
    <section
      dir="rtl"
      className="mt-5 rounded-xl border border-[#e8ebf2] bg-white p-6"
    >

      {/* Header */}
      <div className="flex items-center justify-between">

        <div>
          <h3 className="text-[10px] font-bold text-[#27344a]">
            سجل الملاحظات والإجراءات
          </h3>

          <p className="mt-1 text-[7px] text-[#9aa3b1]">
            آخر الأنشطة والتحديثات الخاصة بالقضية
          </p>
        </div>

        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f5f7fa] text-[#68758a]">
          <Clock size={14} />
        </div>

      </div>


      {/* Timeline */}
      <div className="mt-6">

        {activities.map((activity, index) => {
          const Icon = activity.icon;
          const isLast = index === activities.length - 1;

          return (
            <div
              key={activity.id}
              className={`flex gap-4 ${
                !isLast ? "pb-5" : ""
              }`}
            >

              {/* Timeline */}
              <div className="relative flex flex-col items-center w-3 shrink-0">

                {/* Dot */}
                <div
                  className={`relative z-10 flex h-3 w-3 items-center justify-center rounded-full ${activity.color}`}
                />

                {/* Line */}
                {!isLast && (
                  <div className="absolute top-3 h-full w-px bg-[#e5e9f0]" />
                )}

              </div>


              {/* Activity Icon */}
              <div
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${activity.iconBg} text-[#64748b]`}
              >
                <Icon size={13} />
              </div>


              {/* Content */}
              <div className="flex-1 min-w-0 text-right">

                <p className="text-[8px] font-bold text-[#303d53]">
                  {activity.title}
                </p>

                <p className="mt-1 text-[7px] leading-5 text-[#929baa]">
                  {activity.description}
                </p>

              </div>


              {/* Time */}
              <span className="shrink-0 pt-1 text-[7px] text-[#9aa3b1]">
                {activity.time}
              </span>

            </div>
          );
        })}

      </div>

    </section>
  );
};

export default Activitiy;