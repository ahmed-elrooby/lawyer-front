
"use client";

import React, { useContext, useMemo } from "react";

import {
  FaCalendarAlt,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaPauseCircle,
} from "react-icons/fa";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { LawyerContext } from "../../../../../Providers/LawyerContext/lawyer.js";
import { useRouter } from "next/navigation.js";

const ComingSeesion = () => {
  const { dashboardStatisics } = useContext(LawyerContext);
const router =useRouter()
  const sessions = useMemo(() => {
    return {
      scheduled: dashboardStatisics?.sessions?.scheduled || 0,
      attended: dashboardStatisics?.sessions?.attended || 0,
      completed: dashboardStatisics?.sessions?.completed || 0,
      postponed: dashboardStatisics?.sessions?.postponed || 0,
      cancelled: dashboardStatisics?.sessions?.cancelled || 0,
      total: dashboardStatisics?.sessions?.total || 0,
    };
  }, [dashboardStatisics]);

  const chartData = [
    {
      name: "مجدولة",
      value: sessions.scheduled,
      color: "#2563EB",
      icon: FaCalendarAlt,
    },
    {
      name: "تم الحضور",
      value: sessions.attended,
      color: "#10B981",
      icon: FaCheckCircle,
    },
    {
      name: "مكتملة",
      value: sessions.completed,
      color: "#8B5CF6",
      icon: FaCheckCircle,
    },
    {
      name: "مؤجلة",
      value: sessions.postponed,
      color: "#F59E0B",
      icon: FaPauseCircle,
    },
    {
      name: "ملغاة",
      value: sessions.cancelled,
      color: "#F43F5E",
      icon: FaTimesCircle,
    },
  ];

  return (
    <div className="h-full overflow-hidden transition-all duration-300 border shadow-sm bg-slate-800 rounded-2xl border-slate-700 hover:shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-slate-700">
        <div>
          <h2 className="text-lg font-bold text-white">
            إحصائيات الجلسات
          </h2>

          <p className="mt-1 text-xs text-slate-400">
            توزيع حالات الجلسات
          </p>
        </div>

        <div className="flex items-center justify-center w-10 h-10 text-amber-600 bg-amber-100 rounded-xl">
          <FaCalendarAlt className="w-5 h-5" />
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex flex-col items-center gap-5 md:flex-row">
          {/* =========================
              Donut Chart
          ========================== */}
          <div className="relative w-full h-56 md:w-1/2">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={88}
                  paddingAngle={3}
                  stroke="none"
                >
                  {chartData.map((item, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={item.color}
                    />
                  ))}
                </Pie>

                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid #334155",
                    borderRadius: "12px",
                    color: "#fff",
                  }}
                  itemStyle={{
                    color: "#fff",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Center */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-bold text-white">
                {sessions.total}
              </span>

              <span className="text-xs text-slate-400">
                إجمالي الجلسات
              </span>
            </div>
          </div>

          {/* =========================
              Statistics
          ========================== */}
          <div className="w-full space-y-3 md:w-1/2">
            {chartData.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.name}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-700/40"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="flex items-center justify-center w-8 h-8 rounded-lg"
                      style={{
                        backgroundColor: `${item.color}20`,
                        color: item.color,
                      }}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    <span className="text-xs text-slate-300">
                      {item.name}
                    </span>
                  </div>

                  <span className="text-sm font-bold text-white">
                    {item.value}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-slate-700">
        <button
          type="button"
          onClick={() => {
            router.push("/Lawyer/Session");
          }}
          className="flex items-center justify-center w-full gap-2 text-sm font-medium transition-colors text-amber-500 hover:text-amber-400"
        >
          عرض كل الجلسات

          <FaClock className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ComingSeesion;
