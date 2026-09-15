
"use client";

import React, { useContext, useMemo } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import { LawyerContext } from "../../../../../Providers/LawyerContext/lawyer.js";

const CaseChart = () => {
  const { cases = [] } = useContext(LawyerContext);

  const chartData = useMemo(() => {
    return [
      {
        name: "نشطة",
        cases: cases.filter(
          (caseItem) => caseItem.status === "active"
        ).length,
      },
      {
        name: "محجوزة للحكم",
        cases: cases.filter(
          (caseItem) =>
            caseItem.status === "reserved_for_judgment"
        ).length,
      },
      {
        name: "تم الحكم",
        cases: cases.filter(
          (caseItem) => caseItem.status === "judged"
        ).length,
      },
    ];
  }, [cases]);

  return (
    <div className="mt-6 overflow-hidden border rounded-2xl border-slate-700 bg-slate-800/60">
      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-700">
        <h2 className="text-base font-bold text-white">
          توزيع القضايا حسب الحالة
        </h2>

        <p className="mt-1 text-xs text-slate-400">
          نظرة سريعة على حالات القضايا الحالية
        </p>
      </div>

      {/* Chart */}
      <div className="h-[320px] w-full p-5">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 10,
              right: 10,
              left: -10,
              bottom: 10,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#334155"
              vertical={false}
            />

            <XAxis
              dataKey="name"
              tick={{
                fill: "#94a3b8",
                fontSize: 12,
              }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              allowDecimals={false}
              tick={{
                fill: "#94a3b8",
                fontSize: 12,
              }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              cursor={{
                fill: "rgba(255,255,255,0.03)",
              }}
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "1px solid #334155",
                borderRadius: "10px",
                color: "#fff",
              }}
              labelStyle={{
                color: "#cbd5e1",
                marginBottom: "4px",
              }}
              formatter={(value) => [
                `${value} قضية`,
                "العدد",
              ]}
            />

            <Bar
              dataKey="cases"
              name="القضايا"
              fill="#10b981"
              radius={[6, 6, 0, 0]}
              barSize={55}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CaseChart;
