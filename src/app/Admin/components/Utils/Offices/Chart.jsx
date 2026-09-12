"use client";

import React, { useContext, useMemo } from "react";
import {
  FaChartLine,
  FaChartPie,
  FaBuilding,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import { AdminContext } from "../../../../../Providers/AdminContext/Admin.js";

const Charts = () => {
  const { offices } = useContext(AdminContext);

  const data = Array.isArray(offices) ? offices : [];

  /* =========================
     Registration Chart
  ========================= */

  const registrationData = useMemo(() => {
    const grouped = {};

    data.forEach((office) => {
      if (!office.createdAt) return;

      const date = new Date(office.createdAt);

      const key = date.toISOString().split("T")[0];

      if (!grouped[key]) {
        grouped[key] = 0;
      }

      grouped[key]++;
    });

    return Object.entries(grouped)
      .sort(([a], [b]) => new Date(a) - new Date(b))
      .map(([date, count]) => {
        const dateObject = new Date(date);

        return {
          date: dateObject.toLocaleDateString("ar-EG", {
            day: "numeric",
            month: "short",
          }),
          count,
        };
      });
  }, [data]);

  /* =========================
     Status Chart
  ========================= */

  const statusData = useMemo(() => {
    const active = data.filter((office) => office.isActive === true).length;

    const inactive = data.filter((office) => office.isActive === false).length;

    return [
      {
        name: "نشطة",
        value: active,
      },
      {
        name: "غير نشطة",
        value: inactive,
      },
    ];
  }, [data]);

  const total = data.length;

  const activeCount = statusData[0]?.value || 0;
  const inactiveCount = statusData[1]?.value || 0;

  const activePercentage =
    total > 0 ? Math.round((activeCount / total) * 100) : 0;

  const inactivePercentage =
    total > 0 ? Math.round((inactiveCount / total) * 100) : 0;

  /*
   * مهم:
   * Recharts مش محتاج ألوان من عندك في الـ API.
   * الألوان هنا ثابتة عشان الـ UI يفضل متناسق.
   */
  const COLORS = ["#10B981", "#EF4444"];

  return (
    <div className="mb-7 grid grid-cols-1 gap-5 xl:grid-cols-[1.7fr_1fr]">
      {/* =====================================
          Registration Chart
      ===================================== */}

      <div className="relative overflow-hidden rounded-[24px] border border-slate-200/70 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.04)]">
        {/* Header */}

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-blue-50 text-blue-600">
              <FaChartLine className="text-[16px]" />
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-800">
                تسجيل المكاتب
              </h3>

              <p className="mt-1 text-[10px] text-slate-400">
                معدل تسجيل المكاتب على المنصة
              </p>
            </div>
          </div>

          <div className="text-left">
            <span className="block text-[24px] font-black tracking-tight text-slate-900">
              {total}
            </span>

            <span className="text-[9px] font-medium text-slate-400">
              إجمالي المكاتب
            </span>
          </div>
        </div>

        {/* Chart */}

        <div className="h-[260px] w-full">
          {registrationData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={registrationData}
                margin={{
                  top: 10,
                  right: 5,
                  left: -20,
                  bottom: 0,
                }}
              >
                <defs>
                  <linearGradient
                    id="officeGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#2563EB" stopOpacity={0.22} />

                    <stop offset="100%" stopColor="#2563EB" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="4 4"
                  vertical={false}
                  stroke="#E2E8F0"
                />

                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 10,
                    fill: "#94A3B8",
                  }}
                  dy={10}
                />

                <YAxis
                  allowDecimals={false}
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 10,
                    fill: "#94A3B8",
                  }}
                />

                <Tooltip
                  cursor={{
                    stroke: "#CBD5E1",
                    strokeDasharray: "4 4",
                  }}
                  contentStyle={{
                    borderRadius: "14px",
                    border: "1px solid #E2E8F0",
                    boxShadow: "0 10px 30px rgba(15,23,42,0.08)",
                    fontSize: "11px",
                    direction: "rtl",
                  }}
                  labelStyle={{
                    color: "#475569",
                    fontWeight: 700,
                    marginBottom: "4px",
                  }}
                  formatter={(value) => [`${value} مكتب`, "عدد المكاتب"]}
                />

                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#2563EB"
                  strokeWidth={3}
                  fill="url(#officeGradient)"
                  dot={{
                    r: 4,
                    fill: "#2563EB",
                    stroke: "#FFFFFF",
                    strokeWidth: 2,
                  }}
                  activeDot={{
                    r: 6,
                    fill: "#2563EB",
                    stroke: "#FFFFFF",
                    strokeWidth: 3,
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <FaBuilding className="mx-auto mb-3 text-3xl text-slate-200" />

                <p className="text-xs font-semibold text-slate-400">
                  لا توجد بيانات لعرضها
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Bottom info */}

        <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-600 rounded-full" />

            <span className="text-[10px] font-medium text-slate-400">
              المكاتب المسجلة
            </span>
          </div>

          <span className="text-[10px] font-bold text-slate-500">
            حسب تاريخ التسجيل
          </span>
        </div>
      </div>

      {/* =====================================
          Status Chart
      ===================================== */}

      <div className="relative overflow-hidden rounded-[24px] border border-slate-200/70 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.04)]">
        {/* Header */}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-indigo-50 text-indigo-600">
              <FaChartPie className="text-[16px]" />
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-800">حالة المكاتب</h3>

              <p className="mt-1 text-[10px] text-slate-400">
                توزيع المكاتب حسب الحالة
              </p>
            </div>
          </div>
        </div>

        {/* Donut */}

        <div className="relative mt-3 h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={88}
                paddingAngle={3}
                dataKey="value"
                stroke="none"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>

              <Tooltip
                contentStyle={{
                  borderRadius: "14px",
                  border: "1px solid #E2E8F0",
                  boxShadow: "0 10px 30px rgba(15,23,42,0.08)",
                  fontSize: "11px",
                  direction: "rtl",
                }}
                formatter={(value, name) => [`${value} مكتب`, name]}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* Center */}

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <span className="block text-[30px] font-black leading-none text-slate-900">
                {total}
              </span>

              <span className="mt-1 block text-[9px] font-semibold text-slate-400">
                إجمالي المكاتب
              </span>
            </div>
          </div>
        </div>

        {/* Status details */}

        <div className="pt-4 space-y-2 border-t border-slate-100">
          {/* Active */}

          <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2.5">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600">
                <FaCheckCircle className="text-xs" />
              </div>

              <div>
                <p className="text-[11px] font-bold text-slate-700">
                  مكاتب نشطة
                </p>

                <p className="text-[9px] text-slate-400">تعمل حاليًا</p>
              </div>
            </div>

            <div className="text-left">
              <span className="block text-sm font-black text-emerald-600">
                {activeCount}
              </span>

              <span className="text-[8px] font-semibold text-slate-400">
                {activePercentage}%
              </span>
            </div>
          </div>

          {/* Inactive */}

          <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2.5">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 text-red-500 rounded-lg bg-red-50">
                <FaTimesCircle className="text-xs" />
              </div>

              <div>
                <p className="text-[11px] font-bold text-slate-700">
                  مكاتب غير نشطة
                </p>

                <p className="text-[9px] text-slate-400">متوقفة حاليًا</p>
              </div>
            </div>

            <div className="text-left">
              <span className="block text-sm font-black text-red-500">
                {inactiveCount}
              </span>

              <span className="text-[8px] font-semibold text-slate-400">
                {inactivePercentage}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;
