"use client";

import React, { useContext, useMemo } from "react";
import { OwnerContext } from "../../../../../Providers/LawyerOwner/OwnerProvider.js";
import {
  FaUserTie,
  FaUserCheck,
  FaBriefcase,
  FaUserClock,
} from "react-icons/fa";
import { FiArrowUpLeft, FiUsers } from "react-icons/fi";

const Cards = () => {
  const { lawyers, clients } = useContext(OwnerContext);

  const statistics = useMemo(() => {
    const allLawyers = Array.isArray(lawyers) ? lawyers : [];
    const allClients = Array.isArray(clients) ? clients : [];

    const totalLawyers = allLawyers.length;

    const activeLawyers = allLawyers.filter(
      (lawyer) => lawyer?.isActive === true
    ).length;

    const inactiveLawyers = totalLawyers - activeLawyers;

    const allCases = allClients.flatMap((client) =>
      Array.isArray(client?.cases) ? client.cases : []
    );

    const lawyersWithCases = new Set();

    allCases.forEach((caseItem) => {
      if (!Array.isArray(caseItem?.lawyers)) return;

      caseItem.lawyers.forEach((lawyer) => {
        const lawyerId =
          typeof lawyer === "object" ? lawyer?._id : lawyer;

        if (lawyerId) {
          lawyersWithCases.add(lawyerId);
        }
      });
    });

    const lawyersWithoutCases = allLawyers.filter(
      (lawyer) => !lawyersWithCases.has(lawyer?._id)
    ).length;

    const activePercentage =
      totalLawyers > 0
        ? Math.round((activeLawyers / totalLawyers) * 100)
        : 0;

    const assignedPercentage =
      totalLawyers > 0
        ? Math.round((lawyersWithCases.size / totalLawyers) * 100)
        : 0;

    return {
      totalLawyers,
      activeLawyers,
      inactiveLawyers,
      lawyersWithCases: lawyersWithCases.size,
      lawyersWithoutCases,
      activePercentage,
      assignedPercentage,
    };
  }, [lawyers, clients]);

  const cards = [
    {
      title: "إجمالي المحامين",
      value: statistics.totalLawyers,
      description: "محامٍ ضمن فريق المكتب",
      icon: <FaUserTie />,
      iconBg: "bg-[#e8eefb]",
      iconColor: "text-[#315DAA]",
      badge: "الفريق القانوني",
      badgeIcon: <FiUsers />,
      badgeClass: "bg-[#f1f5ff] text-[#315DAA]",
    },
    {
      title: "المحامون النشطون",
      value: statistics.activeLawyers,
      description: "محامون نشطون حاليًا",
      icon: <FaUserCheck />,
      iconBg: "bg-[#e9f7f0]",
      iconColor: "text-[#21885a]",
      progress: statistics.activePercentage,
      progressLabel: `${statistics.activePercentage}% من الفريق`,
      badge: `${statistics.activeLawyers} نشط`,
      badgeClass: "bg-[#eaf8f1] text-[#21885a]",
    },
    {
      title: "محامون لديهم قضايا",
      value: statistics.lawyersWithCases,
      description: "محامون مرتبطون بقضايا",
      icon: <FaBriefcase />,
      iconBg: "bg-[#fff5dc]",
      iconColor: "text-[#a17800]",
      progress: statistics.assignedPercentage,
      progressLabel: `${statistics.assignedPercentage}% من الفريق`,
      badge: "قضايا مسندة",
      badgeClass: "bg-[#fff7e4] text-[#9a7600]",
    },
    {
      title: "محامون بدون قضايا",
      value: statistics.lawyersWithoutCases,
      description: "محامون يحتاجون إلى إسناد",
      icon: <FaUserClock />,
      iconBg: "bg-[#f1f3f7]",
      iconColor: "text-[#62718a]",
      badge:
        statistics.lawyersWithoutCases > 0
          ? "يحتاج متابعة"
          : "الفريق موزع بالكامل",
      badgeClass:
        statistics.lawyersWithoutCases > 0
          ? "bg-[#f4f5f7] text-[#62718a]"
          : "bg-[#eaf8f1] text-[#21885a]",
    },
  ];

  return (
    <section dir="rtl" className="w-full">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        {cards.map((card, index) => (
          <div
            key={card.title}
            className="group relative overflow-hidden rounded-2xl border border-[#e8ecf2] bg-white p-5 shadow-[0_4px_18px_rgba(17,24,39,0.035)] transition-all duration-300 hover:-translate-y-1 hover:border-[#dce3ee] hover:shadow-[0_14px_35px_rgba(17,24,39,0.08)]"
          >
            {/* Decorative background */}
            <div
              className={`absolute -left-10 -top-10 h-28 w-28 rounded-full opacity-40 blur-2xl ${card.iconBg}`}
            />

            {/* Top */}
            <div className="relative flex items-start justify-between">
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl text-[17px] ${card.iconBg} ${card.iconColor}`}
              >
                {card.icon}
              </div>

              <div
                className={`flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[9px] font-semibold ${card.badgeClass}`}
              >
                {card.badgeIcon && (
                  <span className="text-[10px]">{card.badgeIcon}</span>
                )}

                <span>{card.badge}</span>
              </div>
            </div>

            {/* Content */}
            <div className="relative mt-5">
              <p className="text-[12px] font-medium text-[#778399]">
                {card.title}
              </p>

              <div className="flex items-end gap-2 mt-1">
                <h3 className="text-[30px] font-bold leading-none tracking-tight text-[#111827]">
                  {card.value}
                </h3>

                {index === 0 && (
                  <span className="mb-0.5 text-[10px] font-medium text-[#98a2b3]">
                    محامٍ
                  </span>
                )}
              </div>

              <p className="mt-2 text-[10px] font-medium text-[#98a2b3]">
                {card.description}
              </p>
            </div>

            {/* Progress */}
            {typeof card.progress === "number" && (
              <div className="relative mt-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[9px] font-medium text-[#98a2b3]">
                    {card.progressLabel}
                  </span>

                  <span className="text-[9px] font-bold text-[#62718a]">
                    {card.progress}%
                  </span>
                </div>

                <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#edf0f5]">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      index === 1 ? "bg-[#21885a]" : "bg-[#c9a227]"
                    }`}
                    style={{
                      width: `${card.progress}%`,
                    }}
                  />
                </div>
              </div>
            )}

            {/* Bottom */}
            {!card.progress && (
              <div className="relative mt-5 flex items-center justify-between border-t border-[#f0f2f5] pt-3">
                <span className="text-[9px] font-medium text-[#a0a8b6]">
                  حالة الفريق
                </span>

                <span className="flex items-center gap-1 text-[9px] font-semibold text-[#62718a]">
                  التفاصيل
                  <FiArrowUpLeft className="text-[10px]" />
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Cards;