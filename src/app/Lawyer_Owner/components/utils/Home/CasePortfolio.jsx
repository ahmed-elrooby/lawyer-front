
"use client";

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const CasePortfolio = () => {
  const caseStatus = [
    {
      name: "قضايا نشطة",
      value: 76,
      percentage: "59%",
      color: "#2563eb",
    },
    {
      name: "قضايا مغلقة",
      value: 19,
      percentage: "15%",
      color: "#10b981",
    },
    {
      name: "قضايا مؤجلة",
      value: 18,
      percentage: "14%",
      color: "#f59e0b",
    },
    {
      name: "قضايا جديدة",
      value: 15,
      percentage: "12%",
      color: "#6366f1",
    },
  ];

  const specialties = [
    {
      name: "مدني",
      value: 34,
      active: true,
    },
    {
      name: "جنائي",
      value: 38,
      active: true,
    },
    {
      name: "تجاري",
      value: 20,
      active: false,
    },
    {
      name: "أسرة",
      value: 26,
      active: false,
    },
    {
      name: "إداري",
      value: 10,
      active: false,
    },
  ];

  return (
    <div className="p-4 bg-white rounded-2xl shadow-soft fade-border">
      {/* Header */}
      <div className="mb-3">
        <h3 className="text-xs font-extrabold text-slate-900">
          محفظة القضايا وتصنيف التخصصات
        </h3>

        <p className="mt-1 text-[8px] text-slate-400">
          نظرة على القضايا حسب الحالة والتخصص
        </p>
      </div>

      {/* Chart + Status */}
      <div
        className="flex items-center gap-5"
        dir="rtl"
      >
        {/* Donut */}
        <div className="relative h-36 w-36 shrink-0">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <PieChart>
              <Pie
                data={caseStatus}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={70}
                paddingAngle={1}
                stroke="none"
                startAngle={90}
                endAngle={-270}
              >
                {caseStatus.map((item) => (
                  <Cell
                    key={item.name}
                    fill={item.color}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-extrabold text-slate-900">
                128
              </div>

              <div className="text-[7px] text-slate-400">
                قضية
              </div>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="flex-1 space-y-2 text-[8px]">
          {caseStatus.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between"
            >
              <span>{item.name}</span>

              <b>
                {item.value} ({item.percentage})
              </b>
            </div>
          ))}
        </div>
      </div>

      {/* Specialties */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {specialties.map((item) => (
          <span
            key={item.name}
            className={
              item.active
                ? "rounded-full bg-blue-50 px-2 py-1 text-[7px] text-blue-700"
                : "rounded-full bg-slate-100 px-2 py-1 text-[7px] text-slate-600"
            }
          >
            {item.name} ({item.value})
          </span>
        ))}
      </div>
    </div>
  );
};

export default CasePortfolio;
