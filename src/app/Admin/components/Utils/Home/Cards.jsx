"use client";

import React, { useContext } from "react";
import { FaBuilding, FaUsers, FaUserFriends, FaGavel } from "react-icons/fa";

import { AdminContext } from "../../../../../Providers/AdminContext/Admin.js";

const Cards = () => {
  const { offices, dashboardStatisics } = useContext(AdminContext);

  const cardsData = [
    {
      title: "إجمالي المكاتب",
      value: offices?.length || 0,
      icon: FaBuilding,
      borderColor: "border-blue-500",
      iconColor: "text-blue-600",
      iconBg: "bg-blue-50",
    },

    {
      title: "إجمالي المحامين",
      value: dashboardStatisics?.lawyers?.total || 0,
      icon: FaUsers,
      borderColor: "border-emerald-500",
      iconColor: "text-emerald-600",
      iconBg: "bg-emerald-50",
    },

    {
      title: "إجمالي العملاء",
      value: dashboardStatisics?.clients?.total || 0,
      icon: FaUserFriends,
      borderColor: "border-purple-500",
      iconColor: "text-purple-600",
      iconBg: "bg-purple-50",
    },

    {
      title: "إجمالي القضايا",
      value: dashboardStatisics?.cases?.total || 0,
      icon: FaGavel,
      borderColor: "border-amber-500",
      iconColor: "text-amber-600",
      iconBg: "bg-amber-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {cardsData.map((card, index) => {
        const Icon = card.icon;

        return (
          <div
            key={index}
            className={`
              relative overflow-hidden
              bg-white
              border border-gray-100
              border-r-4 ${card.borderColor}
              rounded-2xl
              p-5
              shadow-sm
              transition-all duration-300
              hover:-translate-y-1
              hover:shadow-lg
            `}
          >
            <div className="relative z-10 flex items-start justify-between">
              {/* Information */}
              <div>
                <p className="text-sm font-medium text-gray-500">
                  {card.title}
                </p>

                <h3 className="mt-2 text-3xl font-bold tracking-tight text-gray-800">
                  {card.value}
                </h3>
              </div>

              {/* Icon */}
              <div
                className={`
                  flex items-center justify-center
                  w-12 h-12
                  rounded-xl
                  ${card.iconBg}
                `}
              >
                <Icon className={`text-xl ${card.iconColor}`} />
              </div>
            </div>

            {/* Dynamic Footer */}
            <div className="relative z-10 mt-5">
              <span className="text-xs text-gray-400">
                إجمالي البيانات المسجلة
              </span>
            </div>

            {/* Decorative Circle */}
            <div
              className={`
                absolute
                -bottom-8
                -left-8
                w-20
                h-20
                rounded-full
                opacity-40
                ${card.iconBg}
              `}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Cards;
