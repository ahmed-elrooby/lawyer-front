"use client"
import React, { useState } from "react";
import {
  BarChart3,
  CalendarCheck2,
  Clock3,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from "recharts";

const SessionAnalytics = () => {
  const [period, setPeriod] = useState("شهري");

  const monthlyData = [
    { month: "يناير", sessions: 42, completed: 35, postponed: 4 },
    { month: "فبراير", sessions: 51, completed: 43, postponed: 3 },
    { month: "مارس", sessions: 46, completed: 39, postponed: 5 },
    { month: "أبريل", sessions: 58, completed: 50, postponed: 4 },
    { month: "مايو", sessions: 63, completed: 55, postponed: 3 },
    { month: "يونيو", sessions: 57, completed: 49, postponed: 5 },
    { month: "يوليو", sessions: 69, completed: 61, postponed: 4 },
    { month: "أغسطس", sessions: 74, completed: 66, postponed: 3 },
    { month: "سبتمبر", sessions: 86, completed: 76, postponed: 4 },
  ];

  const weeklyData = [
    { month: "السبت", sessions: 12, completed: 9, postponed: 1 },
    { month: "الأحد", sessions: 18, completed: 15, postponed: 1 },
    { month: "الإثنين", sessions: 14, completed: 12, postponed: 2 },
    { month: "الثلاثاء", sessions: 21, completed: 18, postponed: 1 },
    { month: "الأربعاء", sessions: 16, completed: 14, postponed: 1 },
    { month: "الخميس", sessions: 24, completed: 21, postponed: 1 },
    { month: "الجمعة", sessions: 8, completed: 7, postponed: 0 },
  ];

  const chartData = period === "شهري" ? monthlyData : weeklyData;

  return (
    <section dir="rtl" className="w-full mt-6">
      <div className="overflow-hidden rounded-2xl border border-[#E7EAF0] bg-white">

        {/* Header */}
        <div className="border-b border-[#EEF0F4] px-5 py-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF3FF] text-[#4263B5]">
                <BarChart3 size={19} />
              </div>

              <div>
                <h2 className="text-[17px] font-bold text-[#0B1C30]">
                  تحليل وأداء الجلسات
                </h2>

                <p className="mt-1 text-[11px] text-[#7A818C]">
                  تحليل إحصائيات الجلسات ومعدل الإنجاز والتأجيل
                </p>
              </div>
            </div>

            {/* Period */}
            <div className="flex items-center rounded-xl border border-[#E3E6EC] bg-[#FAFBFC] p-1">
              <button
                onClick={() => setPeriod("أسبوعي")}
                className={`rounded-lg px-4 py-2 text-[10px] font-bold transition ${
                  period === "أسبوعي"
                    ? "bg-[#0B1C30] text-white shadow-sm"
                    : "text-[#7A818C] hover:text-[#263140]"
                }`}
              >
                أسبوعي
              </button>

              <button
                onClick={() => setPeriod("شهري")}
                className={`rounded-lg px-4 py-2 text-[10px] font-bold transition ${
                  period === "شهري"
                    ? "bg-[#0B1C30] text-white shadow-sm"
                    : "text-[#7A818C] hover:text-[#263140]"
                }`}
              >
                شهري
              </button>
            </div>

          </div>
        </div>

    

        {/* Charts */}
        <div className="grid grid-cols-1 gap-5 px-5 pb-5 xl:grid-cols-[1.7fr_1fr]">

          {/* Main Chart */}
          <div className="rounded-2xl border border-[#EEF0F4] bg-[#FCFDFE] p-5">

            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-[13px] font-bold text-[#273243]">
                  معدل الجلسات
                </h3>

                <p className="mt-1 text-[10px] text-[#9298A2]">
                  مقارنة الجلسات المجدولة والمنجزة
                </p>
              </div>

              <div className="flex items-center gap-4 text-[9px]">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#4868B4]" />
                  مجدولة
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#65A982]" />
                  منجزة
                </div>
              </div>
            </div>

            <div className="h-[290px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{
                    top: 10,
                    right: 5,
                    left: -15,
                    bottom: 0,
                  }}
                  barGap={5}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#EEF0F4"
                  />

                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fontSize: 9,
                      fill: "#8A919C",
                    }}
                  />

                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fontSize: 9,
                      fill: "#8A919C",
                    }}
                  />

                  <Tooltip
                    cursor={{ fill: "#F7F8FA" }}
                    contentStyle={{
                      border: "1px solid #E7EAF0",
                      borderRadius: "10px",
                      fontSize: "10px",
                      direction: "rtl",
                    }}
                  />

                  <Bar
                    dataKey="sessions"
                    name="مجدولة"
                    fill="#4868B4"
                    radius={[5, 5, 0, 0]}
                    barSize={12}
                  />

                  <Bar
                    dataKey="completed"
                    name="منجزة"
                    fill="#65A982"
                    radius={[5, 5, 0, 0]}
                    barSize={12}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Completion Rate */}
          <div className="rounded-2xl border border-[#EEF0F4] bg-[#FCFDFE] p-5">

            <div>
              <h3 className="text-[13px] font-bold text-[#273243]">
                معدل الإنجاز
              </h3>

              <p className="mt-1 text-[10px] text-[#9298A2]">
                نسبة الجلسات التي تم إنهاؤها بنجاح
              </p>
            </div>

            <div className="relative mx-auto mt-7 h-[190px] w-[190px]">

              <svg
                className="w-full h-full -rotate-90"
                viewBox="0 0 200 200"
              >
                <circle
                  cx="100"
                  cy="100"
                  r="78"
                  fill="none"
                  stroke="#EEF0F4"
                  strokeWidth="14"
                />

                <circle
                  cx="100"
                  cy="100"
                  r="78"
                  fill="none"
                  stroke="#4868B4"
                  strokeWidth="14"
                  strokeLinecap="round"
                  strokeDasharray="490"
                  strokeDashoffset="57"
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[28px] font-bold text-[#172334]">
                  88.4%
                </span>

                <span className="mt-1 text-[10px] text-[#9298A2]">
                  معدل الإنجاز
                </span>
              </div>

            </div>

            <div className="grid grid-cols-2 gap-2 mt-4">

              <MiniStat
                label="منجزة"
                value="76"
                icon={<CheckCircle2 size={13} />}
              />

              <MiniStat
                label="مؤجلة"
                value="4"
                icon={<Clock3 size={13} />}
              />

            </div>

          </div>

        </div>

        {/* Bottom Insights */}
        <div className="border-t border-[#EEF0F4] bg-[#FAFBFC] px-5 py-4">

          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">

            <Insight
              icon={<TrendingUp size={15} />}
              title="تحسن الأداء"
              description="ارتفع معدل إنجاز الجلسات بنسبة 4.2% مقارنة بالفترة السابقة."
              type="positive"
            />

            <Insight
              icon={<CalendarCheck2 size={15} />}
              title="أكثر الأيام نشاطاً"
              description="الخميس هو أكثر أيام الأسبوع من حيث عدد الجلسات المجدولة."
              type="neutral"
            />

            <Insight
              icon={<Clock3 size={15} />}
              title="الجلسات المؤجلة"
              description="انخفض عدد الجلسات المؤجلة خلال الفترة الحالية بنسبة 18.4%."
              type="positive"
            />

          </div>

        </div>

      </div>
    </section>
  );
};

const AnalyticsCard = ({
  icon,
  title,
  value,
  description,
  trend,
  positive,
}) => {
  return (
    <div className="rounded-xl border border-[#EEF0F4] bg-[#FCFDFE] p-4 transition hover:border-[#DCE1EA] hover:shadow-sm">

      <div className="flex items-start justify-between">

        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EEF3FF] text-[#4868B4]">
          {icon}
        </div>

        <span
          className={`flex items-center gap-1 rounded-full px-2 py-1 text-[9px] font-bold ${
            positive
              ? "bg-[#E9F7EF] text-[#208457]"
              : "bg-[#FFF1F1] text-[#B24B4B]"
          }`}
        >
          <TrendingUp size={10} />
          {trend}
        </span>

      </div>

      <p className="mt-4 text-[10px] font-semibold text-[#858C97]">
        {title}
      </p>

      <p className="mt-1 text-[22px] font-bold text-[#172334]">
        {value}
      </p>

      <p className="mt-1 text-[9px] text-[#9AA0A9]">
        {description}
      </p>

    </div>
  );
};

const MiniStat = ({ label, value, icon }) => {
  return (
    <div className="flex items-center justify-between rounded-xl border border-[#EEF0F4] bg-white px-3 py-3">

      <div className="flex items-center gap-2 text-[#78818E]">
        {icon}
        <span className="text-[9px]">
          {label}
        </span>
      </div>

      <span className="text-[12px] font-bold text-[#273243]">
        {value}
      </span>

    </div>
  );
};

const Insight = ({ icon, title, description, type }) => {
  return (
    <div className="flex gap-3 rounded-xl border border-[#E8EBF0] bg-white p-3.5">

      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
          type === "positive"
            ? "bg-[#E9F7EF] text-[#208457]"
            : "bg-[#EEF3FF] text-[#4868B4]"
        }`}
      >
        {icon}
      </div>

      <div>
        <p className="text-[10px] font-bold text-[#3A4350]">
          {title}
        </p>

        <p className="mt-1 text-[9px] leading-5 text-[#8A919C]">
          {description}
        </p>
      </div>

    </div>
  );
};

export default SessionAnalytics;