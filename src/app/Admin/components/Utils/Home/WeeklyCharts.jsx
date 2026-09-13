"use client";

import React, { useContext, useMemo } from "react";
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

const WeeklyCharts = () => {
  const { users, dashboardStatisics } = useContext(AdminContext);

  // =========================
  // Users Chart
  // =========================
  const usersData = useMemo(() => {
    const data = [];
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);

      date.setHours(0, 0, 0, 0);
      date.setDate(today.getDate() - i);

      const nextDate = new Date(date);
      nextDate.setDate(date.getDate() + 1);

      const usersCount =
        users?.filter((user) => {
          if (!user?.isActive || !user?.lastLogin) return false;

          const loginDate = new Date(user.lastLogin);

          return loginDate >= date && loginDate < nextDate;
        }).length || 0;

      data.push({
        day: date.toLocaleDateString("ar-EG", {
          weekday: "short",
        }),
        users: usersCount,
      });
    }

    return data;
  }, [users]);

  // =========================
  // Cases Chart
  // =========================
  const casesData = useMemo(() => {
    const cases = dashboardStatisics?.cases;

    return [
      {
        status: "نشطة",
        cases: cases?.active || 0,
      },
      {
        status: "محجوزة للحكم",
        cases: cases?.reservedForJudgment || 0,
      },
      {
        status: "محكوم فيها",
        cases: cases?.judged || 0,
      },
    ];
  }, [dashboardStatisics]);

  const totalCases = dashboardStatisics?.cases?.total || 0;

  return (
    <div className="p-1 bg-white shadow-sm rounded-2xl md:p-5">
      <h2 className="flex items-center gap-2 mb-4 text-lg font-semibold text-gray-800">
        📊 الرسوم البيانية
      </h2>

      <div className="space-y-8">
        {/* =========================
            Users Chart
        ========================= */}
        <div>
          <p className="mb-2 text-sm text-gray-500">
            📊 عدد المستخدمين النشطين خلال الأسبوع
          </p>

          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={usersData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="day" />

              <YAxis allowDecimals={false} />

              <Tooltip />

              <Bar dataKey="users" fill="#3B82F6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* =========================
            Cases Chart
        ========================= */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-500">
              ⚖️ إحصائيات القضايا حسب الحالة
            </p>

            <span className="px-3 py-1 text-xs font-semibold text-blue-600 rounded-full bg-blue-50">
              إجمالي القضايا: {totalCases}
            </span>
          </div>

          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={casesData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="status" />

              <YAxis allowDecimals={false} />

              <Tooltip />

              <Bar dataKey="cases" fill="#10B981" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-4 text-xs text-center text-gray-400">
        إحصائيات القضايا الحالية
      </div>
    </div>
  );
};

export default WeeklyCharts;
