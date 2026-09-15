"use client";

import React, { useContext, useMemo } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import { LawyerContext } from "../../../../../Providers/LawyerContext/lawyer.js";

const ClientChart = () => {
  const { clients = [] } = useContext(LawyerContext);

  const monthNames = [
    "يناير",
    "فبراير",
    "مارس",
    "أبريل",
    "مايو",
    "يونيو",
    "يوليو",
    "أغسطس",
    "سبتمبر",
    "أكتوبر",
    "نوفمبر",
    "ديسمبر",
  ];

  // =========================
  // نمو العملاء آخر 6 شهور
  // =========================

  const monthlyData = useMemo(() => {
    const now = new Date();
    const data = [];

    for (let i = 5; i >= 0; i--) {
      const date = new Date(
        now.getFullYear(),
        now.getMonth() - i,
        1
      );

      const year = date.getFullYear();
      const month = date.getMonth();

      const count = clients.filter((client) => {
        if (!client.createdAt) return false;

        const clientDate = new Date(client.createdAt);

        return (
          clientDate.getFullYear() === year &&
          clientDate.getMonth() === month
        );
      }).length;

      data.push({
        name: monthNames[month],
        clients: count,
      });
    }

    return data;
  }, [clients]);

  // =========================
  // العملاء حسب الحالة
  // =========================

  const statusData = useMemo(() => {
    const active = clients.filter(
      (client) => client.isActive
    ).length;

    const inactive = clients.filter(
      (client) => !client.isActive
    ).length;

    return [
      {
        name: "نشط",
        value: active,
      },
      {
        name: "غير نشط",
        value: inactive,
      },
    ];
  }, [clients]);

  return (
    <div className="grid grid-cols-1 gap-4 mt-6 xl:grid-cols-3">

      {/* ================= نمو العملاء ================= */}

      <div className="p-5 border xl:col-span-2 rounded-xl border-slate-700 bg-slate-800/60">

        <div className="mb-5">
          <h2 className="text-sm font-semibold text-white">
            نمو العملاء
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            عدد العملاء المضافين خلال آخر 6 شهور
          </p>
        </div>

        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyData}>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#334155"
              />

              <XAxis
                dataKey="name"
                tick={{
                  fill: "#94a3b8",
                  fontSize: 11,
                }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                allowDecimals={false}
                tick={{
                  fill: "#94a3b8",
                  fontSize: 11,
                }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f172a",
                  border: "1px solid #334155",
                  borderRadius: "8px",
                  color: "#fff",
                }}
                labelStyle={{
                  color: "#94a3b8",
                }}
                formatter={(value) => [
                  value,
                  "العملاء",
                ]}
              />

              <Line
                type="monotone"
                dataKey="clients"
                stroke="#10b981"
                strokeWidth={3}
                dot={{
                  r: 4,
                  fill: "#10b981",
                }}
                activeDot={{
                  r: 6,
                }}
              />

            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ================= حالة العملاء ================= */}

      <div className="p-5 border rounded-xl border-slate-700 bg-slate-800/60">

        <div className="mb-2">
          <h2 className="text-sm font-semibold text-white">
            حالة العملاء
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            توزيع العملاء حسب الحالة
          </p>
        </div>

        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>

              <Pie
                data={statusData}
                cx="50%"
                cy="45%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={3}
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      index === 0
                        ? "#10b981"
                        : "#ef4444"
                    }
                  />
                ))}
              </Pie>

              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f172a",
                  border: "1px solid #334155",
                  borderRadius: "8px",
                  color: "#fff",
                }}
                formatter={(value) => [
                  value,
                  "عميل",
                ]}
              />

              <Legend
                verticalAlign="bottom"
                iconType="circle"
                wrapperStyle={{
                  fontSize: "12px",
                  color: "#94a3b8",
                }}
              />

            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};

export default ClientChart;