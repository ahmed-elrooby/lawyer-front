
"use client";

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const CaseDistribution = () => {
  const data = [
    {
      name: "أحمد علي",
      value: 24,
      color: "#0f172a",
    },
    {
      name: "سارة محمود",
      value: 31,
      color: "#f59e0b",
    },
    {
      name: "عمر سمير",
      value: 22,
      color: "#2563eb",
    },
    {
      name: "محمد حسن",
      value: 19,
      color: "#4f46e5",
    },
    {
      name: "يوسف أحمد",
      value: 17,
      color: "#eab308",
    },
    {
      name: "آخرون",
      value: 15,
      color: "#94a3b8",
    },
  ];

  return (
    <div className="p-4 bg-white rounded-2xl shadow-soft fade-border">
      {/* Header */}
      <div className="mb-3">
        <h3 className="text-xs font-extrabold text-slate-900">
          توزيع القضايا على الفريق
        </h3>

        <p className="mt-1 text-[8px] text-slate-400">
          توزيع القضايا الحالية حسب المحامي
        </p>
      </div>

      {/* Donut Chart */}
      <div className="flex items-center justify-center">
        <div className="relative h-36 w-36">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={70}
                paddingAngle={1}
                dataKey="value"
                stroke="none"
                startAngle={90}
                endAngle={-270}
              >
                {data.map((item) => (
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
      </div>

      {/* Legend */}
      <div
        className="mt-3 grid grid-cols-2 gap-1.5 text-[7px] text-slate-500"
        dir="rtl"
      >
        {data.map((item) => (
          <span
            key={item.name}
            className="flex items-center gap-1"
          >
            <span
              className="h-1.5 w-1.5 shrink-0 rounded-full"
              style={{
                backgroundColor: item.color,
              }}
            />

            <span>
              {item.name}{" "}
              <b className="font-extrabold text-slate-700">
                {item.value}
              </b>
            </span>
          </span>
        ))}
      </div>

      {/* Note */}
      <div className="mt-3 rounded-xl bg-amber-50 p-2.5 text-[7px] leading-4 text-slate-600">
        💡{" "}
        <b className="font-extrabold">
          ملاحظة:
        </b>{" "}
        راجع توزيع الأحمال بشكل دوري للحفاظ على توازن العمل بين أعضاء الفريق.
      </div>

      {/* Button */}
      <button
        type="button"
        className="mt-3 w-full rounded-lg bg-slate-900 py-2 text-[8px] font-bold text-white transition hover:bg-slate-800"
      >
        إدارة توزيع القضايا
      </button>
    </div>
  );
};

export default CaseDistribution;
