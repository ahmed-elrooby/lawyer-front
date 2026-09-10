"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { BarChart2 } from "lucide-react";

const TasksChart = () => {
  // بيانات أداء المهام الشهرية (نموذج)
  const data = [
    { name: "يناير", completed: 28 },
    { name: "فبراير", completed: 35 },
    { name: "مارس", completed: 42 },
    { name: "أبريل", completed: 38 },
    { name: "مايو", completed: 45 },
    { name: "يونيو", completed: 32 },
  ];

  return (
    <div className="p-5 transition-all duration-300 border shadow-sm bg-slate-800 rounded-2xl border-slate-700 hover:shadow-md">
      <h3 className="flex items-center gap-2 mb-4 text-lg font-semibold text-white">
        <BarChart2 className="w-5 h-5 text-blue-400" />
        أداء المهام (شهري)
      </h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="name" stroke="#94A3B8" tick={{ fill: "#CBD5E1" }} />
          <YAxis stroke="#94A3B8" tick={{ fill: "#CBD5E1" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1E293B",
              borderColor: "#334155",
              borderRadius: "0.5rem",
              color: "#F1F5F9",
            }}
            formatter={(value) => [`${value} مهمة`, "المهام المنجزة"]}
            labelStyle={{ color: "#94A3B8" }}
          />
          <Bar dataKey="completed" fill="#3B82F6" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TasksChart;