
"use client";

import React, { useContext } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { AdminContext } from "../../../../../Providers/AdminContext/Admin.js";

const SessionsChart = () => {
  const { dashboardStatisics } = useContext(AdminContext);

  const sessions = dashboardStatisics?.sessions || {};

  const data = [
    {
      name: "مجدولة",
      value: sessions.scheduled || 0,
    },
    {
      name: "مؤجلة",
      value: sessions.postponed || 0,
    },
    {
      name: "حضر",
      value: sessions.attended || 0,
    },
    {
      name: "مكتملة",
      value: sessions.completed || 0,
    },
    {
      name: "ملغاة",
      value: sessions.cancelled || 0,
    },
  ];

  return (
    <div className="p-6 bg-white border shadow-sm rounded-2xl border-slate-200/70">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-slate-800">
            حالات الجلسات
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            توزيع الجلسات حسب الحالة الحالية
          </p>
        </div>

        <div className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-amber-50 text-amber-600">
          {sessions.total || 0} جلسة
        </div>
      </div>

      {/* Chart */}
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: -15,
              bottom: 0,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#E2E8F0"
            />

            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#64748B",
                fontSize: 12,
                fontFamily: "inherit",
              }}
            />

            <YAxis
              allowDecimals={false}
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#94A3B8",
                fontSize: 12,
                fontFamily: "inherit",
              }}
            />

            <Tooltip
              cursor={{ fill: "#F8FAFC" }}
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid #E2E8F0",
                boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
                direction: "rtl",
              }}
              formatter={(value) => [`${value} جلسة`, "العدد"]}
            />

            <Bar
              dataKey="value"
              name="الجلسات"
              fill="#F59E0B"
              radius={[8, 8, 0, 0]}
              barSize={38}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SessionsChart;
