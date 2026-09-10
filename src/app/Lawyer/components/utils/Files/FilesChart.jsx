"use client";

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { PieChart as PieChartIcon, TrendingUp } from "lucide-react";

const FilesChart = () => {
  const data = [
    { name: "مكتملة", value: 4, color: "#10B981" },
    { name: "قيد المراجعة", value: 3, color: "#F59E0B" },
    { name: "مرفوعة حديثاً", value: 3, color: "#3B82F6" },
  ];

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="relative lg:col-span-2">
      {/* Card */}
      <div className="relative p-5 overflow-hidden transition-all duration-300 border rounded-2xl border-slate-700/50 bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-sm hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1">

        {/* Background glow (lightweight) */}
        <div className="absolute inset-0 transition opacity-0 bg-gradient-to-br from-blue-600/0 via-purple-600/0 to-emerald-600/0 group-hover:opacity-10" />

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 border rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/10 border-white/10">
              <PieChartIcon className="w-5 h-5 text-blue-300" />
            </div>

            <h3 className="text-lg font-bold text-white">
              توزيع الملفات حسب الحالة
            </h3>
          </div>

          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/5">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-xs font-medium text-emerald-300">
              إجمالي {total}
            </span>
          </div>
        </div>

        {/* CHART (FIXED) */}
        <div className="relative z-10 w-full h-[240px] flex justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={85}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>

              <Tooltip
                contentStyle={{
                  backgroundColor: "#0F172A",
                  borderColor: "#334155",
                  borderRadius: "12px",
                  fontSize: "12px",
                  color: "#F1F5F9",
                }}
                formatter={(value, name) => [`${value} ملف`, name]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="relative z-10 flex flex-wrap justify-center gap-4 mt-3">
          {data.map((item) => (
            <div
              key={item.name}
              className="flex items-center gap-2 px-2 py-1 rounded-full bg-white/5"
            >
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs text-slate-200">
                {item.name}:{" "}
                <span className="font-bold text-white">{item.value}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilesChart;