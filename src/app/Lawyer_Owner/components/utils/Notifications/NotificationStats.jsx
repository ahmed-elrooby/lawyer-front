"use client";

import React, { useContext, useMemo } from "react";
import {
  Bell,
  BellRing,
  CalendarCheck2,
  FileText,
} from "lucide-react";
import { OwnerContext } from "../../../../../Providers/LawyerOwner/OwnerProvider.js";

const NotificationStats = () => {
  const { notifications = [] } = useContext(OwnerContext);

  const stats = useMemo(() => {
    const totalNotifications = notifications.length;

    const unreadNotifications = notifications.filter(
      (notification) =>
        notification?.isRead === false ||
        notification?.read === false ||
        notification?.status === "unread"
    ).length;

    const sessionNotifications = notifications.filter(
      (notification) => {
        const type =
          notification?.type?.toLowerCase() || "";

        const category =
          notification?.category?.toLowerCase() || "";

        const relatedTo =
          notification?.relatedTo?.toLowerCase() || "";

        return (
          type.includes("session") ||
          type.includes("جلس") ||
          category.includes("session") ||
          category.includes("جلس") ||
          relatedTo.includes("session") ||
          relatedTo.includes("جلس")
        );
      }
    ).length;

    const caseNotifications = notifications.filter(
      (notification) => {
        const type =
          notification?.type?.toLowerCase() || "";

        const category =
          notification?.category?.toLowerCase() || "";

        const relatedTo =
          notification?.relatedTo?.toLowerCase() || "";

        return (
          type.includes("case") ||
          type.includes("قضي") ||
          category.includes("case") ||
          category.includes("قضي") ||
          relatedTo.includes("case") ||
          relatedTo.includes("قضي")
        );
      }
    ).length;

    return [
      {
        title: "إجمالي الإشعارات",
        value: totalNotifications,
        description: "إجمالي التنبيهات المسجلة",
        icon: Bell,
        iconBg: "bg-[#EAF0FF]",
        iconColor: "text-[#4868B4]",
      },
      {
        title: "غير المقروءة",
        value: unreadNotifications,
        description: "إشعارات تحتاج إلى مراجعة",
        icon: BellRing,
        iconBg: "bg-[#FFF4D6]",
        iconColor: "text-[#8A6A00]",
      },
      {
        title: "تنبيهات الجلسات",
        value: sessionNotifications,
        description: "تنبيهات مرتبطة بالجلسات",
        icon: CalendarCheck2,
        iconBg: "bg-[#EAF7F0]",
        iconColor: "text-[#25804D]",
      },
      {
        title: "تنبيهات القضايا",
        value: caseNotifications,
        description: "تنبيهات مرتبطة بالقضايا",
        icon: FileText,
        iconBg: "bg-[#F2ECFF]",
        iconColor: "text-[#7551A8]",
      },
    ];
  }, [notifications]);

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
                  <Icon
                    size={19}
                    className={stat.iconColor}
                  />
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