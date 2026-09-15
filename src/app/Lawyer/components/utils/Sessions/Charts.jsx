
"use client";

import React, { useContext, useMemo } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import { LawyerContext } from "../../../../../Providers/LawyerContext/lawyer.js";

const Charts = () => {
  const { sessions } = useContext(LawyerContext);

  const data = Array.isArray(sessions) ? sessions : [];

  // =========================
  // توزيع حالات الجلسات
  // =========================
  const statusData = useMemo(() => {
    const statuses = [
      {
        key: "scheduled",
        name: "مجدولة",
        color: "#06b6d4",
      },
      {
        key: "attended",
        name: "تم الحضور",
        color: "#3b82f6",
      },
      {
        key: "postponed",
        name: "مؤجلة",
        color: "#f59e0b",
      },
      {
        key: "completed",
        name: "مكتملة",
        color: "#10b981",
      },
      {
        key: "cancelled",
        name: "ملغاة",
        color: "#ef4444",
      },
    ];

    return statuses
      .map((status) => ({
        name: status.name,
        value: data.filter(
          (session) => session?.status === status.key,
        ).length,
        color: status.color,
      }))
      .filter((item) => item.value > 0);
  }, [data]);

  // =========================
  // الجلسات خلال الـ 7 أيام القادمة
  // =========================
  const upcomingData = useMemo(() => {
    const result = [];

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      const count = data.filter((session) => {
        if (!session?.sessionDate) return false;

        if (session?.status !== "scheduled") return false;

        const sessionDate = new Date(session.sessionDate);
        sessionDate.setHours(0, 0, 0, 0);

        return sessionDate.getTime() === date.getTime();
      }).length;

      result.push({
        date: `${date.getDate()}/${date.getMonth() + 1}`,
        count,
      });
    }

    return result;
  }, [data]);

  return (
    <div
      dir="rtl"
      className="grid grid-cols-1 gap-6 mb-6 xl:grid-cols-2"
    >
      {/* =========================
          Status Chart
      ========================= */}
      <div className="p-5 border shadow-lg rounded-2xl border-slate-700/50 bg-slate-900">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-white">
            توزيع حالات الجلسات
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            نظرة سريعة على حالة جميع الجلسات
          </p>
        </div>

        <div className="h-[280px]">
          {statusData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="45%"
                  outerRadius={90}
                  innerRadius={55}
                  paddingAngle={3}
                >
                  {statusData.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={entry.color}
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
                  formatter={(value) => [
                    value,
                    "عدد الجلسات",
                  ]}
                />

                <Legend
                  verticalAlign="bottom"
                  height={40}
                  iconType="circle"
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-sm text-slate-500">
                لا توجد جلسات لعرض الإحصائيات
              </p>
            </div>
          )}
        </div>
      </div>

      {/* =========================
          Upcoming Sessions Chart
      ========================= */}
      <div className="p-5 border shadow-lg rounded-2xl border-slate-700/50 bg-slate-900">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-white">
            الجلسات خلال الأيام القادمة
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            عدد الجلسات المجدولة خلال الـ 7 أيام القادمة
          </p>
        </div>

        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={upcomingData}
              margin={{
                top: 10,
                right: 10,
                left: -10,
                bottom: 5,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#334155"
                vertical={false}
              />

              <XAxis
                dataKey="date"
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
                  fill: "rgba(6, 182, 212, 0.05)",
                }}
                contentStyle={{
                  backgroundColor: "#0f172a",
                  border: "1px solid #334155",
                  borderRadius: "12px",
                  color: "#fff",
                }}
                formatter={(value) => [
                  value,
                  "الجلسات",
                ]}
                labelFormatter={(label) =>
                  `التاريخ: ${label}`
                }
              />

              <Bar
                dataKey="count"
                name="الجلسات"
                fill="#06b6d4"
                radius={[6, 6, 0, 0]}
                maxBarSize={45}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Charts;
