"use client";

import React, { useContext, useMemo, useState } from "react";
import {
  BarChart3,
  CalendarCheck2,
  Clock3,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { OwnerContext } from "../../../../../Providers/LawyerOwner/OwnerProvider.js";

const SessionAnalytics = () => {
  const { sessions = [] } = useContext(OwnerContext);

  const [period, setPeriod] = useState("شهري");

  /* ================================================= */
  /* HELPERS */
  /* ================================================= */

  const getValidSessions = useMemo(() => {
    return sessions.filter((session) => session?.sessionDate);
  }, [sessions]);

  const completedSessions = useMemo(() => {
    return getValidSessions.filter(
      (session) => session.status === "completed"
    );
  }, [getValidSessions]);

  const postponedSessions = useMemo(() => {
    return getValidSessions.filter(
      (session) => session.status === "postponed"
    );
  }, [getValidSessions]);

  const completionRate = useMemo(() => {
    if (!getValidSessions.length) return 0;

    return Math.round(
      (completedSessions.length / getValidSessions.length) * 1000
    ) / 10;
  }, [getValidSessions, completedSessions]);

  /* ================================================= */
  /* MONTHLY DATA */
  /* ================================================= */

  const monthlyData = useMemo(() => {
    const months = [
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

    const currentYear = new Date().getFullYear();

    return months.map((month, index) => {
      const monthSessions = getValidSessions.filter((session) => {
        const date = new Date(session.sessionDate);

        return (
          date.getFullYear() === currentYear &&
          date.getMonth() === index
        );
      });

      return {
        month,
        sessions: monthSessions.length,
        completed: monthSessions.filter(
          (session) => session.status === "completed"
        ).length,
        postponed: monthSessions.filter(
          (session) => session.status === "postponed"
        ).length,
      };
    });
  }, [getValidSessions]);

  /* ================================================= */
  /* WEEKLY DATA */
  /* ================================================= */

  const weeklyData = useMemo(() => {
    const days = [
      {
        index: 6,
        name: "السبت",
      },
      {
        index: 0,
        name: "الأحد",
      },
      {
        index: 1,
        name: "الإثنين",
      },
      {
        index: 2,
        name: "الثلاثاء",
      },
      {
        index: 3,
        name: "الأربعاء",
      },
      {
        index: 4,
        name: "الخميس",
      },
      {
        index: 5,
        name: "الجمعة",
      },
    ];

    return days.map((day) => {
      const daySessions = getValidSessions.filter((session) => {
        const date = new Date(session.sessionDate);

        return date.getDay() === day.index;
      });

      return {
        month: day.name,
        sessions: daySessions.length,
        completed: daySessions.filter(
          (session) => session.status === "completed"
        ).length,
        postponed: daySessions.filter(
          (session) => session.status === "postponed"
        ).length,
      };
    });
  }, [getValidSessions]);

  const chartData =
    period === "شهري" ? monthlyData : weeklyData;

  /* ================================================= */
  /* MOST ACTIVE DAY */
  /* ================================================= */

  const mostActiveDay = useMemo(() => {
    if (!weeklyData.length) return "لا توجد بيانات";

    const activeDay = [...weeklyData].sort(
      (a, b) => b.sessions - a.sessions
    )[0];

    if (!activeDay?.sessions) return "لا توجد بيانات";

    return activeDay.month;
  }, [weeklyData]);

  /* ================================================= */
  /* INSIGHTS */
  /* ================================================= */

  const completionDescription =
    getValidSessions.length > 0
      ? `تم إنهاء ${completedSessions.length} من أصل ${getValidSessions.length} جلسة مسجلة.`
      : "لا توجد جلسات مسجلة حتى الآن.";

  const postponedDescription =
    postponedSessions.length > 0
      ? `يوجد ${postponedSessions.length} جلسة مؤجلة ضمن الجلسات المسجلة.`
      : "لا توجد جلسات مؤجلة ضمن البيانات الحالية.";

  return (
    <section className="w-full mt-6">
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
        <div className="grid grid-cols-1 gap-5 px-5 py-5 md:grid-cols-3">

          {/* Main Chart */}
          <div className="col-span-2 rounded-2xl border border-[#EEF0F4] bg-[#FCFDFE] p-5">

            <div className="flex items-center justify-between mb-5">

              <div>
                <h3 className="text-[13px] font-bold text-[#273243]">
                  معدل الجلسات
                </h3>

                <p className="mt-1 text-[10px] text-[#9298A2]">
                  مقارنة الجلسات المسجلة والمنجزة
                </p>
              </div>

              <div className="flex items-center gap-4 text-[9px]">

                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#4868B4]" />
                  إجمالي الجلسات
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
                    name="إجمالي الجلسات"
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
                نسبة الجلسات التي تم إنهاؤها
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
                  strokeDashoffset={
                    490 - (490 * completionRate) / 100
                  }
                />

              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">

                <span className="text-[28px] font-bold text-[#172334]">
                  {completionRate}%
                </span>

                <span className="mt-1 text-[10px] text-[#9298A2]">
                  معدل الإنجاز
                </span>

              </div>

            </div>

            <div className="grid grid-cols-2 gap-2 mt-4">

              <MiniStat
                label="منجزة"
                value={completedSessions.length}
                icon={<CheckCircle2 size={13} />}
              />

              <MiniStat
                label="مؤجلة"
                value={postponedSessions.length}
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
              title="معدل الإنجاز"
              description={completionDescription}
              type="positive"
            />

            <Insight
              icon={<CalendarCheck2 size={15} />}
              title="أكثر الأيام نشاطاً"
              description={
                mostActiveDay === "لا توجد بيانات"
                  ? "لا توجد جلسات كافية لعرض أكثر الأيام نشاطاً."
                  : `${mostActiveDay} هو أكثر أيام الأسبوع من حيث عدد الجلسات المسجلة.`
              }
              type="neutral"
            />

            <Insight
              icon={<Clock3 size={15} />}
              title="الجلسات المؤجلة"
              description={postponedDescription}
              type={
                postponedSessions.length > 0
                  ? "neutral"
                  : "positive"
              }
            />

          </div>

        </div>

      </div>
    </section>
  );
};

/* ================================================= */
/* MINI STAT */
/* ================================================= */

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

/* ================================================= */
/* INSIGHT */
/* ================================================= */

const Insight = ({
  icon,
  title,
  description,
  type,
}) => {
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