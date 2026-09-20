"use client";

import React, { useContext, useMemo, useState } from "react";
import {
  BarChart3,
  BriefcaseBusiness,
  CheckCircle2,
  Scale,
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

const CasePerformance = () => {
  const [period, setPeriod] = useState("شهري");

  const { cases = [] } = useContext(OwnerContext);

  // حالات القضايا
  const activeCases = cases.filter(
    (item) => item?.status === "active"
  ).length;

  const reservedCases = cases.filter(
    (item) => item?.status === "reserved_for_judgment"
  ).length;

  const judgedCases = cases.filter(
    (item) => item?.status === "judged"
  ).length;

  const totalCases = cases.length;

  const closingRate =
    totalCases > 0
      ? Math.round((judgedCases / totalCases) * 100)
      : 0;

  // البيانات الشهرية
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
      const monthCases = cases.filter((item) => {
        if (!item?.createdAt) return false;

        const date = new Date(item.createdAt);

        return (
          date.getFullYear() === currentYear &&
          date.getMonth() === index
        );
      });

      return {
        name: month,
        newCases: monthCases.length,
        judgedCases: monthCases.filter(
          (item) => item?.status === "judged"
        ).length,
      };
    });
  }, [cases]);

  // البيانات الأسبوعية
  const weeklyData = useMemo(() => {
    const now = new Date();

    return [0, 1, 2, 3].map((week) => {
      const start = new Date(now);

      start.setDate(
        now.getDate() - (3 - week) * 7 - 6
      );

      start.setHours(0, 0, 0, 0);

      const end = new Date(now);

      end.setDate(
        now.getDate() - (3 - week) * 7
      );

      end.setHours(23, 59, 59, 999);

      const weekCases = cases.filter((item) => {
        if (!item?.createdAt) return false;

        const date = new Date(item.createdAt);

        return date >= start && date <= end;
      });

      return {
        name: `الأسبوع ${week + 1}`,
        newCases: weekCases.length,
        judgedCases: weekCases.filter(
          (item) => item?.status === "judged"
        ).length,
      };
    });
  }, [cases]);

  const chartData =
    period === "شهري" ? monthlyData : weeklyData;

  const chartTotals = useMemo(() => {
    return chartData.reduce(
      (acc, item) => {
        acc.newCases += item.newCases;
        acc.judgedCases += item.judgedCases;

        return acc;
      },
      {
        newCases: 0,
        judgedCases: 0,
      }
    );
  }, [chartData]);

  const chartClosingRate =
    chartTotals.newCases > 0
      ? (
          (chartTotals.judgedCases /
            chartTotals.newCases) *
          100
        ).toFixed(1)
      : "0.0";

  const statuses = [
    {
      title: "قضايا نشطة",
      value: activeCases,
      percentage:
        totalCases > 0
          ? Math.round(
              (activeCases / totalCases) * 100
            )
          : 0,
      icon: BriefcaseBusiness,
      iconBg: "bg-[#EAF0FF]",
      iconColor: "text-[#4868B4]",
      barBg: "bg-[#4868B4]",
    },
    {
      title: "محجوزة للحكم",
      value: reservedCases,
      percentage:
        totalCases > 0
          ? Math.round(
              (reservedCases / totalCases) * 100
            )
          : 0,
      icon: Scale,
      iconBg: "bg-[#FFF7DF]",
      iconColor: "text-[#9A7A00]",
      barBg: "bg-[#C5A62A]",
    },
    {
      title: "تم الحكم فيها",
      value: judgedCases,
      percentage:
        totalCases > 0
          ? Math.round(
              (judgedCases / totalCases) * 100
            )
          : 0,
      icon: CheckCircle2,
      iconBg: "bg-[#E8F6EF]",
      iconColor: "text-[#258A5A]",
      barBg: "bg-[#258A5A]",
    },
  ];

  return (
    <section className="w-full mb-7">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {/* Chart */}
        <div className="col-span-2 rounded-xl border border-[#E8EAF0] bg-white p-5 shadow-[0_2px_8px_rgba(11,28,48,0.03)]">
          {/* Header */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EAF0FF]">
                  <BarChart3
                    size={16}
                    className="text-[#4868B4]"
                  />
                </div>

                <div>
                  <h2 className="text-[14px] font-bold text-[#0B1C30]">
                    أداء القضايا
                  </h2>

                  <p className="mt-0.5 text-[9px] text-[#8A8E96]">
                    مقارنة القضايا الجديدة والمحكوم فيها
                  </p>
                </div>
              </div>
            </div>

            {/* Period */}
            <div className="flex items-center gap-1 rounded-lg border border-[#E4E7EC] bg-[#F8F9FB] p-1">
              <button
                onClick={() => setPeriod("شهري")}
                className={`rounded-md px-3 py-1.5 text-[9px] font-bold transition ${
                  period === "شهري"
                    ? "bg-white text-[#0B1C30] shadow-sm"
                    : "text-[#8A8E96]"
                }`}
              >
                شهري
              </button>

              <button
                onClick={() => setPeriod("أسبوعي")}
                className={`rounded-md px-3 py-1.5 text-[9px] font-bold transition ${
                  period === "أسبوعي"
                    ? "bg-white text-[#0B1C30] shadow-sm"
                    : "text-[#8A8E96]"
                }`}
              >
                أسبوعي
              </button>
            </div>
          </div>

          {/* Summary */}
          <div className="flex flex-wrap gap-5 mt-5">
            <div>
              <p className="text-[9px] text-[#8A8E96]">
                إجمالي القضايا الجديدة
              </p>

              <p className="mt-1 text-[20px] font-bold text-[#0B1C30]">
                {chartTotals.newCases}
              </p>
            </div>

            <div>
              <p className="text-[9px] text-[#8A8E96]">
                القضايا المحكوم فيها
              </p>

              <p className="mt-1 text-[20px] font-bold text-[#258A5A]">
                {chartTotals.judgedCases}
              </p>
            </div>

            <div>
              <p className="text-[9px] text-[#8A8E96]">
                معدل الحكم
              </p>

              <p className="mt-1 flex items-center gap-1 text-[20px] font-bold text-[#9A7A00]">
                {chartClosingRate}%
                <TrendingUp size={13} />
              </p>
            </div>
          </div>

          {/* Chart */}
          <div className="mt-5 h-[280px] w-full">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <BarChart
                data={chartData}
                margin={{
                  top: 10,
                  right: 5,
                  left: -15,
                  bottom: 0,
                }}
                barGap={6}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#EEF0F3"
                />

                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 9,
                    fill: "#8A8E96",
                  }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 9,
                    fill: "#8A8E96",
                  }}
                />

                <Tooltip
                  cursor={{
                    fill: "#F8F9FB",
                  }}
                  contentStyle={{
                    border: "1px solid #E8EAF0",
                    borderRadius: "8px",
                    fontSize: "10px",
                  }}
                />

                <Bar
                  dataKey="newCases"
                  name="قضايا جديدة"
                  fill="#4868B4"
                  radius={[4, 4, 0, 0]}
                  barSize={18}
                />

                <Bar
                  dataKey="judgedCases"
                  name="تم الحكم فيها"
                  fill="#258A5A"
                  radius={[4, 4, 0, 0]}
                  barSize={18}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-6 mt-2">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#4868B4]" />

              <span className="text-[9px] text-[#777B84]">
                قضايا جديدة
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#258A5A]" />

              <span className="text-[9px] text-[#777B84]">
                تم الحكم فيها
              </span>
            </div>
          </div>
        </div>

        {/* Status Summary */}
        <div className="rounded-xl border border-[#E8EAF0] bg-white p-5 shadow-[0_2px_8px_rgba(11,28,48,0.03)]">
          <div>
            <h2 className="text-[14px] font-bold text-[#0B1C30]">
              حالة القضايا
            </h2>

            <p className="mt-1 text-[9px] text-[#8A8E96]">
              التوزيع الحالي لجميع القضايا
            </p>
          </div>

          <div className="mt-6 space-y-5">
            {statuses.map((status, index) => {
              const Icon = status.icon;

              return (
                <div key={index}>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-lg ${status.iconBg}`}
                      >
                        <Icon
                          size={15}
                          className={status.iconColor}
                        />
                      </div>

                      <div>
                        <p className="text-[10px] font-bold text-[#45464D]">
                          {status.title}
                        </p>

                        <p className="mt-0.5 text-[9px] text-[#9AA0A8]">
                          من إجمالي القضايا
                        </p>
                      </div>
                    </div>

                    <div className="text-left">
                      <p className="text-[13px] font-bold text-[#0B1C30]">
                        {status.value}
                      </p>

                      <p className="text-[8px] text-[#8A8E96]">
                        {status.percentage}%
                      </p>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-[#F0F1F4]">
                    <div
                      className={`h-full rounded-full ${status.barBg}`}
                      style={{
                        width: `${Math.min(
                          status.percentage,
                          100
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Insight */}
          <div className="mt-7 rounded-lg border border-[#E8F0EA] bg-[#F6FBF8] p-3">
            <div className="flex items-start gap-2">
              <TrendingUp
                size={14}
                className="mt-0.5 shrink-0 text-[#258A5A]"
              />

              <div>
                <p className="text-[10px] font-bold text-[#258A5A]">
                  مؤشر القضايا
                </p>

                <p className="mt-1 text-[9px] leading-5 text-[#68716B]">
                  يوجد حاليًا {judgedCases} قضية تم الحكم
                  فيها من إجمالي {totalCases} قضية، بمعدل{" "}
                  {closingRate}%.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CasePerformance;