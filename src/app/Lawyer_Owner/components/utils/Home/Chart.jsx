
"use client";

import React, { useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const data = [
  {
    month: "أبريل",
    active: 42,
    closed: 35,
    clients: 28,
  },
  {
    month: "مايو",
    active: 52,
    closed: 42,
    clients: 32,
  },
  {
    month: "يونيو",
    active: 48,
    closed: 47,
    clients: 38,
  },
  {
    month: "يوليو",
    active: 64,
    closed: 58,
    clients: 44,
  },
  {
    month: "أغسطس",
    active: 59,
    closed: 52,
    clients: 49,
  },
  {
    month: "سبتمبر",
    active: 76,
    closed: 62,
    clients: 56,
  },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;

  const activeCase = payload.find((item) => item.dataKey === "active");

  return (
    <div className="rounded-lg bg-slate-900 px-2.5 py-1.5 text-[7px] text-white shadow-lg">
      <div className="mb-0.5">{label} 2026</div>

      <div className="font-bold">
        القضايا النشطة: {activeCase?.value ?? 0}
      </div>
    </div>
  );
};

const OfficePerformanceChart = () => {
  const [period, setPeriod] = useState("6");

  return (
    <div
    
      className="col-span-2 p-4 bg-white rounded-2xl shadow-soft fade-border"
    >
      {/* Header */} 
      <div className="flex items-start justify-between gap-2 mb-3">
        <div>
          <h3 className="text-xs font-extrabold text-slate-900">
            أداء المكتب خلال الفترة
          </h3>

          <p className="mt-1 text-[8px] text-slate-400">
            مؤشرات الأداء للقضايا والعملاء والجلسات
          </p>
        </div>

        {/* Period Buttons */}
        <div className="flex p-1 rounded-lg bg-slate-50">
          {[
            { id: "6", label: "6 أشهر" },
            { id: "30", label: "30 يوم" },
            { id: "7", label: "7 أيام" },
          ].map((item, index) => (
            <button
              key={item.id}
              onClick={() => setPeriod(item.id)}
              className={`
                rounded-md px-2 py-1 text-[8px]
                ${
                  index === 2
                    ? "hidden sm:block"
                    : ""
                }
                ${
                  period === item.id
                    ? "bg-white font-bold text-slate-700 shadow-sm"
                    : "text-slate-400"
                }
              `}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="relative h-[210px] overflow-hidden rounded-xl bg-white">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 5,
              left: 5,
              bottom: 20,
            }}
          >
            {/* نفس الـ Grid الخفيف */}
            <CartesianGrid
              stroke="#e2e8f0"
              strokeDasharray="2 4"
              vertical={false}
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 7,
                fill: "#94a3b8",
              }}
              dy={8}
            />

            <YAxis
              hide
              domain={[0, 100]}
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{
                stroke: "#94a3b8",
                strokeDasharray: "4 5",
              }}
            />

            {/* Blue Area */}
            <defs>
              <linearGradient
                id="blueGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#2563eb"
                  stopOpacity={0.18}
                />

                <stop
                  offset="100%"
                  stopColor="#2563eb"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <Area
              type="monotone"
              dataKey="active"
              stroke="#2563eb"
              strokeWidth={3}
              fill="url(#blueGradient)"
              dot={false}
              activeDot={{
                r: 5,
                fill: "#2563eb",
                stroke: "#2563eb",
              }}
            />

            {/* Closed Cases */}
            <Line
              type="monotone"
              dataKey="closed"
              stroke="#C9A227"
              strokeWidth={2.2}
              strokeDasharray="7 5"
              dot={false}
              activeDot={false}
            />

            {/* New Clients */}
            <Line
              type="monotone"
              dataKey="clients"
              stroke="#059669"
              strokeWidth={2.5}
              dot={false}
              activeDot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="mt-3 flex flex-wrap items-center justify-center gap-4 text-[8px] text-slate-500">
        <span>
          <i className="inline-block w-2 h-2 mr-1 bg-blue-600 rounded-full" />
          القضايا النشطة
        </span>

        <span>
          <i className="inline-block w-2 h-2 mr-1 rounded-full bg-amber-500" />
          القضايا المغلقة
        </span>

        <span>
          <i className="inline-block w-2 h-2 mr-1 rounded-full bg-emerald-600" />
          العملاء الجدد
        </span>
      </div>

      {/* Bottom Statistics */}
      <div className="mt-3 rounded-xl bg-slate-50 p-2 text-center text-[8px] text-slate-500">
        ↗ ارتفع إجمالي نشاط المكتب بنسبة{" "}
        <b className="text-emerald-600">18.4%</b>{" "}
        خلال آخر 6 أشهر
      </div>
    </div>
  );
};

export default OfficePerformanceChart;
