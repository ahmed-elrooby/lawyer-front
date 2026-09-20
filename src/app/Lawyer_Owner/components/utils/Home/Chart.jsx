"use client";

import React, { useContext, useMemo, useState } from "react";
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
import { OwnerContext } from "../../../../../Providers/LawyerOwner/OwnerProvider.js";

const OfficePerformanceChart = () => {
  const { cases = [] } = useContext(OwnerContext);
  const [period, setPeriod] = useState("6");

  const data = useMemo(() => {
    const now = new Date();

    return Array.from({ length: 6 }, (_, i) => {
      const date = new Date(
        now.getFullYear(),
        now.getMonth() - 5 + i,
        1
      );

      const monthCases = cases.filter((item) => {
        const created = new Date(item.createdAt);

        return (
          created.getFullYear() === date.getFullYear() &&
          created.getMonth() === date.getMonth()
        );
      });

      return {
        month: date.toLocaleDateString("ar-EG", {
          month: "short",
        }),
        active: monthCases.filter(
          (item) => item.status === "active"
        ).length,
        closed: monthCases.filter(
          (item) =>
            item.status === "judged" ||
            item.status === "reserved_for_judgment"
        ).length,
        clients: new Set(
          monthCases
            .map((item) => item.clientId?._id)
            .filter(Boolean)
        ).size,
      };
    });
  }, [cases]);

  return (
    <div className="col-span-2 p-5 bg-white border shadow-sm rounded-2xl border-slate-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg font-bold text-slate-800">
            أداء المكتب خلال الفترة
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            مؤشرات الأداء للقضايا والعملاء والجلسات
          </p>
        </div>

        <div className="flex items-center gap-1 p-1 rounded-lg bg-slate-100">
          {[
            { value: "6", label: "6 أشهر" },
            { value: "30", label: "30 يوم" },
            { value: "7", label: "7 أيام" },
          ].map((item) => (
            <button
              key={item.value}
              onClick={() => setPeriod(item.value)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition ${
                period === item.value
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="h-[210px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 5,
              left: -20,
              bottom: 0,
            }}
          >
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
                  stopColor="#3b82f6"
                  stopOpacity={0.25}
                />
                <stop
                  offset="100%"
                  stopColor="#3b82f6"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              stroke="#e2e8f0"
              strokeDasharray="4 4"
              vertical={false}
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 11,
                fill: "#64748b",
              }}
            />

            <YAxis hide />

            <Tooltip
              contentStyle={{
                borderRadius: "10px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              }}
              formatter={(value, name) => {
                const labels = {
                  active: "القضايا النشطة",
                  closed: "القضايا المغلقة",
                  clients: "العملاء",
                };

                return [value, labels[name] || name];
              }}
            />

            <Area
              type="monotone"
              dataKey="active"
              stroke="#3b82f6"
              strokeWidth={2.5}
              fill="url(#blueGradient)"
            />

            <Line
              type="monotone"
              dataKey="closed"
              stroke="#f59e0b"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />

            <Line
              type="monotone"
              dataKey="clients"
              stroke="#10b981"
              strokeWidth={2}
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-4">
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
          القضايا النشطة
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-600">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
          القضايا المغلقة
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-600">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          العملاء
        </div>
      </div>

      {/* Footer */}
      <div className="pt-4 mt-4 border-t border-slate-100">
        <p className="text-xs text-center text-slate-500">
          ↗ يتم عرض نشاط المكتب بناءً على البيانات المسجلة خلال الفترة
        </p>
      </div>
    </div>
  );
};

export default OfficePerformanceChart;