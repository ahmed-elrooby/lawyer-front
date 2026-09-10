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
  const { users, cases } = useContext(AdminContext);

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

  const casesData = useMemo(() => {
    const data = [];
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setHours(0, 0, 0, 0);
      date.setDate(today.getDate() - i);

      const nextDate = new Date(date);
      nextDate.setDate(date.getDate() + 1);

      const casesCount =
        cases?.filter((item) => {
          if (!item?.createdAt) return false;

          const createdDate = new Date(item.createdAt);

          return createdDate >= date && createdDate < nextDate;
        }).length || 0;

      data.push({
        day: date.toLocaleDateString("ar-EG", {
          weekday: "short",
        }),
        cases: casesCount,
      });
    }

    return data;
  }, [cases]);

  return (
    <div className="p-2 bg-white shadow-sm rounded-2xl md:p-5">
      <h2 className="flex items-center gap-2 mb-4 text-lg font-semibold text-gray-800">
        📊 الرسوم البيانية الأسبوعية
      </h2>

      <div className="space-y-8">
        {/* Users Chart */}
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

        {/* Cases Chart */}
        <div>
          <p className="mb-2 text-sm text-gray-500">
            ⚖️ القضايا المضافة (آخر 7 أيام)
          </p>

          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={casesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="cases" fill="#10B981" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-4 text-xs text-center text-gray-400">آخر 7 أيام</div>
    </div>
  );
};

export default WeeklyCharts;
