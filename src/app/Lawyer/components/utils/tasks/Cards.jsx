"use client";

import React, { useContext } from "react";
import {
  FaTasks,
  FaClock,
  FaSpinner,
  FaCheckCircle,
} from "react-icons/fa";
import { LawyerContext } from "../../../../../Providers/LawyerContext/lawyer.js";

const Cards = () => {
  const { tasks = [] } = useContext(LawyerContext);

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
        "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    },
    {
      title: "لم تبدأ",
      value: todoTasks,
      icon: FaClock,
      iconStyle:
        "text-slate-300 bg-slate-800 border-slate-700",
    },
    {
      title: "قيد التنفيذ",
      value: inProgressTasks,
      icon: FaSpinner,
      iconStyle:
        "text-blue-400 bg-blue-500/10 border-blue-500/20",
    },
    {
      title: "مكتملة",
      value: completedTasks,
      icon: FaCheckCircle,
      iconStyle:
        "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="relative p-5 overflow-hidden border shadow-xl rounded-2xl border-slate-800 bg-slate-900/60 shadow-black/10"
          >
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="mb-2 text-sm font-medium text-slate-400">
                  {card.title}
                </p>

                <h2 className="text-3xl font-bold text-white">
                  {card.value}
                </h2>
              </div>

              <div
                className={`flex items-center justify-center w-12 h-12 border rounded-xl ${card.iconStyle}`}
              >
                <Icon className="text-lg" />
              </div>
            </div>

            <div className="absolute w-20 h-20 rounded-full -right-10 -top-10 bg-emerald-500/5 blur-2xl" />
          </div>
        );
      })}
    </div>
  );
};

export default Cards;