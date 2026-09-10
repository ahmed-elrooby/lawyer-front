"use client";

import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const CaseIssues = () => {
  const data = [
    { name: "مفتوحة", value: 120, color: "#10B981" }, // emerald-500
    { name: "مغلقة", value: 45, color: "#3B82F6" },   // blue-500
    { name: "مؤجلة", value: 22, color: "#F59E0B" },   // amber-500
  ];

  const total = data.reduce((sum, entry) => sum + entry.value, 0);

  return (
    <div className="p-5 transition-all duration-300 border shadow-sm lg:col-span-2 bg-slate-800 rounded-2xl border-slate-700 hover:shadow-md">
      <h3 className="mb-4 text-lg font-semibold text-right text-white">
        حالة القضايا
      </h3>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={0}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "#1E293B",
              borderColor: "#334155",
              borderRadius: "0.5rem",
              color: "#F1F5F9",
            }}
            formatter={(value) => [`${value} قضية`, ""]}
          />
        </PieChart>
      </ResponsiveContainer>

      <div className="flex justify-center gap-4 mt-4 text-sm text-gray-300">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-1.5">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span>
              {item.name}: {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CaseIssues;