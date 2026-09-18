"use client";
import React, { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  BriefcaseBusiness,
  CheckCircle2,
  Award,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const PerformanceSection = () => {
  const [period, setPeriod] = useState("month");

  const monthlyData = [
    {
      name: "أحمد",
      cases: 22,
      completed: 14,
      success: 92,
    },
    {
      name: "محمد",
      cases: 38,
      completed: 24,
      success: 88,
    },
    {
      name: "خالد",
      cases: 24,
      completed: 18,
      success: 95,
    },
    {
      name: "سامي",
      cases: 14,
      completed: 11,
      success: 91,
    },
    {
      name: "ياسر",
      cases: 31,
      completed: 21,
      success: 87,
    },
    {
      name: "عمر",
      cases: 19,
      completed: 15,
      success: 94,
    },
  ];

  const yearlyData = [
    {
      name: "أحمد",
      cases: 86,
      completed: 61,
      success: 91,
    },
    {
      name: "محمد",
      cases: 112,
      completed: 82,
      success: 89,
    },
    {
      name: "خالد",
      cases: 94,
      completed: 73,
      success: 94,
    },
    {
      name: "سامي",
      cases: 67,
      completed: 51,
      success: 90,
    },
    {
      name: "ياسر",
      cases: 103,
      completed: 76,
      success: 87,
    },
    {
      name: "عمر",
      cases: 79,
      completed: 61,
      success: 93,
    },
  ];

  const data = period === "month" ? monthlyData : yearlyData;

  const totalCases = data.reduce(
    (total, lawyer) => total + lawyer.cases,
    0
  );

  const totalCompleted = data.reduce(
    (total, lawyer) => total + lawyer.completed,
    0
  );

  const averageSuccess = (
    data.reduce((total, lawyer) => total + lawyer.success, 0) /
    data.length
  ).toFixed(1);

  const averageEfficiency = (
    (totalCompleted / totalCases) *
    100
  ).toFixed(1);

  return (
    <section
      
      className="w-full mt-10 rounded-2xl border border-[#E7EBF2] bg-white p-4 md:p-5"
    >
      {/* =========================
          Header
      ========================= */}
      <div className="flex flex-col gap-4 mb-6 md:flex-row md:items-center md:justify-between">

        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EEF5FF]">
              <BarChart3
                size={18}
                className="text-[#3E67A5]"
              />
            </div>

            <div>
              <h2 className="text-[16px] font-bold text-[#0B1C30]">
                أداء المحامين
              </h2>

              <p className="mt-1 text-[11px] text-[#8993A5]">
                متابعة كفاءة المحامين ومؤشرات الأداء
              </p>
            </div>
          </div>
        </div>

        {/* Period */}
        <div className="flex w-fit items-center rounded-xl border border-[#E7EBF2] bg-[#FAFBFC] p-1">

          <button
            onClick={() => setPeriod("month")}
            className={`rounded-lg px-4 py-1.5 text-[10px] font-bold transition ${
              period === "month"
                ? "bg-white text-[#111827] shadow-sm"
                : "text-[#8993A5]"
            }`}
          >
            هذا الشهر
          </button>

          <button
            onClick={() => setPeriod("year")}
            className={`rounded-lg px-4 py-1.5 text-[10px] font-bold transition ${
              period === "year"
                ? "bg-white text-[#111827] shadow-sm"
                : "text-[#8993A5]"
            }`}
          >
            هذا العام
          </button>
        </div>
      </div>

      {/* =========================
          Statistics
      ========================= */}
      <div className="grid grid-cols-1 gap-3 mb-6 sm:grid-cols-2 xl:grid-cols-4">

        {/* Total Cases */}
        <div className="rounded-2xl border border-[#EEF1F5] bg-[#FAFBFC] p-4">

          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] text-[#8993A5]">
                إجمالي القضايا
              </p>

              <p className="mt-2 text-xl font-bold text-[#111827]">
                {totalCases}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF5FF]">
              <BriefcaseBusiness
                size={18}
                className="text-[#3E67A5]"
              />
            </div>
          </div>

          <div className="mt-3 flex items-center gap-1 text-[10px] text-[#3D9561]">
            <TrendingUp size={12} />
            <span>نشاط القضايا</span>
          </div>
        </div>

        {/* Completed */}
        <div className="rounded-2xl border border-[#EEF1F5] bg-[#FAFBFC] p-4">

          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] text-[#8993A5]">
                القضايا المكتملة
              </p>

              <p className="mt-2 text-xl font-bold text-[#111827]">
                {totalCompleted}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EFFAF5]">
              <CheckCircle2
                size={18}
                className="text-[#3D9561]"
              />
            </div>
          </div>

          <div className="mt-3 text-[10px] text-[#8993A5]">
            من إجمالي القضايا
          </div>
        </div>

        {/* Success */}
        <div className="rounded-2xl border border-[#EEF1F5] bg-[#FAFBFC] p-4">

          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] text-[#8993A5]">
                متوسط نسبة النجاح
              </p>

              <p className="mt-2 text-xl font-bold text-[#111827]">
                {averageSuccess}%
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF8E8]">
              <Award
                size={18}
                className="text-[#B18A2E]"
              />
            </div>
          </div>

          <div className="mt-3 text-[10px] text-[#3D9561]">
            نتائج إيجابية
          </div>
        </div>

        {/* Efficiency */}
        <div className="rounded-2xl border border-[#EEF1F5] bg-[#FAFBFC] p-4">

          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] text-[#8993A5]">
                معدل الكفاءة
              </p>

              <p className="mt-2 text-xl font-bold text-[#111827]">
                {averageEfficiency}%
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F3F0FF]">
              <TrendingUp
                size={18}
                className="text-[#7357B8]"
              />
            </div>
          </div>

          <div className="mt-3 text-[10px] text-[#8993A5]">
            نسبة القضايا المكتملة
          </div>
        </div>
      </div>

      {/* =========================
          Chart + Top Performance
      ========================= */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_300px]">

        {/* Chart */}
        <div className="rounded-2xl border border-[#EEF1F5] p-4">

          <div className="mb-5">
            <h3 className="text-sm font-bold text-[#111827]">
              مقارنة أداء المحامين
            </h3>

            <p className="mt-1 text-[10px] text-[#8993A5]">
              مقارنة عدد القضايا بالقضايا المكتملة
            </p>
          </div>

          <div className="h-[330px] w-full">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <BarChart
                data={data}
                margin={{
                  top: 10,
                  right: 10,
                  left: -15,
                  bottom: 5,
                }}
                barGap={5}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#EEF1F5"
                />

                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 10,
                    fill: "#8993A5",
                  }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 9,
                    fill: "#8993A5",
                  }}
                />

                <Tooltip
                  cursor={{
                    fill: "#F8F9FB",
                  }}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #E7EBF2",
                    fontSize: "11px",
                    direction: "rtl",
                  }}
                />

                <Legend
                  wrapperStyle={{
                    fontSize: "10px",
                    paddingTop: "10px",
                  }}
                />

                <Bar
                  dataKey="cases"
                  name="إجمالي القضايا"
                  fill="#8AA8D8"
                  radius={[5, 5, 0, 0]}
                  barSize={18}
                />

                <Bar
                  dataKey="completed"
                  name="القضايا المكتملة"
                  fill="#3D9561"
                  radius={[5, 5, 0, 0]}
                  barSize={18}
                />
              </BarChart>
            </ResponsiveContainer>

          </div>
        </div>

        {/* Top Lawyers */}
        <div className="rounded-2xl border border-[#EEF1F5] p-4">

          <div className="mb-5">
            <h3 className="text-sm font-bold text-[#111827]">
              مؤشرات النجاح
            </h3>

            <p className="mt-1 text-[10px] text-[#8993A5]">
              نسبة نجاح كل محامي
            </p>
          </div>

          <div className="space-y-4">

            {data
              .sort((a, b) => b.success - a.success)
              .map((lawyer, index) => (
                <div key={lawyer.name}>

                  <div className="flex items-center justify-between mb-2">

                    <div className="flex items-center gap-2">

                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#F5F7FA] text-[9px] font-bold text-[#687282]">
                        {index + 1}
                      </div>

                      <span className="text-[11px] font-bold text-[#45464D]">
                        {lawyer.name}
                      </span>
                    </div>

                    <span className="text-[10px] font-bold text-[#3D9561]">
                      {lawyer.success}%
                    </span>
                  </div>

                  <div className="h-1.5 overflow-hidden rounded-full bg-[#EEF1F5]">

                    <div
                      className="h-full rounded-full bg-[#3D9561] transition-all"
                      style={{
                        width: `${lawyer.success}%`,
                      }}
                    />

                  </div>
                </div>
              ))}

          </div>
        </div>
      </div>
    </section>
  );
};

export default PerformanceSection;