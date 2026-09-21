"use client";

import React, { useContext } from "react";
import {
  FaTasks,
  FaClock,
  FaSpinner,
  FaCheckCircle,
} from "react-icons/fa";
import { OwnerContext } from "../../../../../Providers/LawyerOwner/OwnerProvider.js";

const Cards = () => {
  const { tasks = [] } = useContext(OwnerContext);

  const totalTasks = tasks.length;

  const todoTasks = tasks.filter(
    (task) => task.status === "todo"
  ).length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "in_progress"
  ).length;

  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  ).length;

  const cards = [
    {
      title: "إجمالي المهام",
      value: totalTasks,
      icon: FaTasks,
      iconStyle:
        "text-[#0B1C30] bg-[#D5E0F8] border-[#D5DDEB]",
    },
    {
      title: "لم تبدأ",
      value: todoTasks,
      icon: FaClock,
      iconStyle:
        "text-[#755B00] bg-[#F4EFD9] border-[#E5DDBB]",
    },
    {
      title: "قيد التنفيذ",
      value: inProgressTasks,
      icon: FaSpinner,
      iconStyle:
        "text-[#455D80] bg-[#E8EDF6] border-[#D5DDEB]",
    },
    {
      title: "مكتملة",
      value: completedTasks,
      icon: FaCheckCircle,
      iconStyle:
        "text-[#496B5A] bg-[#E6F0EA] border-[#D3E3D9]",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="relative p-5 overflow-hidden border shadow-sm rounded-2xl border-[#E7EBF2] bg-white"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="mb-2 text-sm font-medium text-[#45464D]">
                  {card.title}
                </p>

                <h2 className="text-3xl font-bold text-[#0B1C30]">
                  {card.value}
                </h2>
              </div>

              <div
                className={`flex items-center justify-center w-12 h-12 border rounded-xl ${card.iconStyle}`}
              >
                <Icon className="text-lg" />
              </div>
            </div>

            <div className="absolute w-20 h-20 rounded-full -right-10 -top-10 bg-[#D5E0F8]/30 blur-2xl" />
          </div>
        );
      })}
    </div>
  );
};

export default Cards;