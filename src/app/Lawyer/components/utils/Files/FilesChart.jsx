"use client";

import React, { useContext, useMemo } from "react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { PieChart as PieChartIcon, TrendingUp } from "lucide-react";

import { LawyerContext } from "../../../../../Providers/LawyerContext/lawyer.js";

const FilesChart = () => {
  const { documents = [] } = useContext(LawyerContext);

  const chartData = useMemo(() => {
    const categories = {};

    documents.forEach((document) => {
      const categoryName = document?.categoryId?.name || "بدون تصنيف";

      if (!categories[categoryName]) {
        categories[categoryName] = 0;
      }

      categories[categoryName]++;
    });

    return Object.entries(categories).map(([name, value]) => ({
      name,
      value,
    }));
  }, [documents]);

  const totalFiles = documents.length;

  const COLORS = [
    "#10b981",
    "#3b82f6",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#06b6d4",
  ];

  return (
    <div className="col-span-1 p-6 border shadow-xl lg:col-span-2 rounded-3xl border-slate-700/60 bg-slate-900">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center h-11 w-11 rounded-2xl bg-emerald-500/10">
            <PieChartIcon className="w-5 h-5 text-emerald-400" />
          </div>

          <div>
            <h2 className="text-lg font-bold text-white">
              توزيع الملفات
            </h2>

            <p className="text-sm text-slate-400">
              توزيع المستندات حسب التصنيف
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3 py-2 border rounded-xl border-slate-700 bg-slate-800/60">
          <TrendingUp className="w-4 h-4 text-emerald-400" />

          <span className="text-sm text-slate-300">
            {totalFiles} ملف
          </span>
        </div>
      </div>

      {chartData.length > 0 ? (
        <div className="grid items-center grid-cols-1 gap-6 md:grid-cols-2">
          {/* Chart */}
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={75}
                  outerRadius={110}
                  paddingAngle={3}
                  dataKey="value"
                  nameKey="name"
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    border: "1px solid #334155",
                    borderRadius: "12px",
                    color: "#fff",
                  }}
                  formatter={(value, name) => [
                    `${value} ملف`,
                    name,
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="space-y-3">
            {chartData.map((item, index) => {
              const percentage =
                totalFiles > 0
                  ? Math.round((item.value / totalFiles) * 100)
                  : 0;

              return (
                <div
                  key={item.name}
                  className="flex items-center justify-between px-4 py-3 border rounded-2xl border-slate-700/50 bg-slate-800/40"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{
                        backgroundColor:
                          COLORS[index % COLORS.length],
                      }}
                    />

                    <span className="text-sm font-medium text-slate-200">
                      {item.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-white">
                      {item.value}
                    </span>

                    <span className="text-xs text-slate-500">
                      {percentage}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="flex h-[300px] flex-col items-center justify-center text-center">
          <div className="flex items-center justify-center mb-4 h-14 w-14 rounded-2xl bg-slate-800">
            <PieChartIcon className="w-6 h-6 text-slate-500" />
          </div>

          <p className="font-medium text-slate-300">
            لا توجد ملفات لعرض الإحصائيات
          </p>

          <p className="mt-1 text-sm text-slate-500">
            أضف بعض الملفات وستظهر الإحصائيات هنا
          </p>
        </div>
      )}
    </div>
  );
};

export default FilesChart;