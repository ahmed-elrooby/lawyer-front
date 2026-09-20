"use client";

import React, { useContext, useMemo, useState } from "react";
import {
  BarChart3,
  TrendingUp,
  BriefcaseBusiness,
  CheckCircle2,
  Users,
  FileCheck2,
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
import { OwnerContext } from "../../../../../Providers/LawyerOwner/OwnerProvider.js";


const PerformanceSection = () => {
  const { lawyers, clients } = useContext(OwnerContext);

  const [period, setPeriod] = useState("month");

  /* =========================
     Real Data
  ========================= */

  const performanceData = useMemo(() => {
    const allLawyers = Array.isArray(lawyers) ? lawyers : [];
    const allClients = Array.isArray(clients) ? clients : [];

    const allCases = allClients.flatMap((client) =>
      Array.isArray(client?.cases)
        ? client.cases.map((caseItem) => ({
            ...caseItem,
            clientName: client?.name,
          }))
        : []
    );

    const now = new Date();

    const filteredCases = allCases.filter((caseItem) => {
      if (!caseItem?.filingDate) return true;

      const filingDate = new Date(caseItem.filingDate);

      if (Number.isNaN(filingDate.getTime())) return true;

      if (period === "month") {
        return (
          filingDate.getMonth() === now.getMonth() &&
          filingDate.getFullYear() === now.getFullYear()
        );
      }

      return filingDate.getFullYear() === now.getFullYear();
    });

    const lawyerStats = allLawyers.map((lawyer) => {
      const lawyerId = String(lawyer?._id || "");

      const lawyerCases = filteredCases.filter((caseItem) => {
        if (!Array.isArray(caseItem?.lawyers)) return false;

        return caseItem.lawyers.some((caseLawyer) => {
          const id =
            typeof caseLawyer === "object"
              ? caseLawyer?._id
              : caseLawyer;

          return String(id || "") === lawyerId;
        });
      });

      const completedCases = lawyerCases.filter(
        (caseItem) => caseItem?.status === "judged"
      ).length;

      const activeCases = lawyerCases.filter(
        (caseItem) => caseItem?.status === "active"
      ).length;

      return {
        id: lawyerId,
        name: lawyer?.name || "بدون اسم",
        cases: lawyerCases.length,
        completed: completedCases,
        active: activeCases,
      };
    });

    const totalCases = filteredCases.length;

    const totalCompleted = filteredCases.filter(
      (caseItem) => caseItem?.status === "judged"
    ).length;

    const lawyersWithCases = lawyerStats.filter(
      (lawyer) => lawyer.cases > 0
    ).length;

    const averageCases =
      allLawyers.length > 0
        ? (totalCases / allLawyers.length).toFixed(1)
        : "0";

    const completionRate =
      totalCases > 0
        ? ((totalCompleted / totalCases) * 100).toFixed(1)
        : "0.0";

    return {
      lawyers: lawyerStats,
      totalCases,
      totalCompleted,
      lawyersWithCases,
      averageCases,
      completionRate,
    };
  }, [lawyers, clients, period]);

  const chartData = useMemo(() => {
    return performanceData.lawyers
      .filter((lawyer) => lawyer.cases > 0)
      .sort((a, b) => b.cases - a.cases);
  }, [performanceData.lawyers]);

  const topLawyers = useMemo(() => {
    return [...performanceData.lawyers]
      .filter((lawyer) => lawyer.cases > 0)
      .sort((a, b) => b.cases - a.cases)
      .slice(0, 6);
  }, [performanceData.lawyers]);

  return (
    <section className="mt-10 w-full rounded-2xl border border-[#E7EBF2] bg-white p-4 md:p-5">
      {/* =========================
          Header
      ========================= */}

      <div className="flex flex-col gap-4 mb-6 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EEF5FF]">
              <BarChart3 size={18} className="text-[#3E67A5]" />
            </div>

            <div>
              <h2 className="text-[16px] font-bold text-[#0B1C30]">
                أداء المحامين
              </h2>

              <p className="mt-1 text-[11px] text-[#8993A5]">
                متابعة حجم القضايا ومؤشرات أداء فريق المحامين
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
                {performanceData.totalCases}
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

            <span>
              {period === "month" ? "خلال هذا الشهر" : "خلال هذا العام"}
            </span>
          </div>
        </div>

        {/* Completed */}

        <div className="rounded-2xl border border-[#EEF1F5] bg-[#FAFBFC] p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] text-[#8993A5]">
                القضايا المحكوم فيها
              </p>

              <p className="mt-2 text-xl font-bold text-[#111827]">
                {performanceData.totalCompleted}
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
            حالة القضية: صدر فيها حكم
          </div>
        </div>

        {/* Lawyers With Cases */}

        <div className="rounded-2xl border border-[#EEF1F5] bg-[#FAFBFC] p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] text-[#8993A5]">
                محامون لديهم قضايا
              </p>

              <p className="mt-2 text-xl font-bold text-[#111827]">
                {performanceData.lawyersWithCases}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF8E8]">
              <Users size={18} className="text-[#B18A2E]" />
            </div>
          </div>

          <div className="mt-3 text-[10px] text-[#8993A5]">
            من إجمالي المحامين
          </div>
        </div>

        {/* Completion Rate */}

        <div className="rounded-2xl border border-[#EEF1F5] bg-[#FAFBFC] p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] text-[#8993A5]">
                معدل إغلاق القضايا
              </p>

              <p className="mt-2 text-xl font-bold text-[#111827]">
                {performanceData.completionRate}%
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F3F0FF]">
              <FileCheck2
                size={18}
                className="text-[#7357B8]"
              />
            </div>
          </div>

          <div className="mt-3 text-[10px] text-[#8993A5]">
            المحكوم فيها من إجمالي القضايا
          </div>
        </div>
      </div>

      {/* =========================
          Chart + Lawyers
      ========================= */}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Chart */}

        <div className="col-span-2 rounded-2xl border border-[#EEF1F5] p-4">
          <div className="mb-5">
            <h3 className="text-sm font-bold text-[#111827]">
              مقارنة أداء المحامين
            </h3>

            <p className="mt-1 text-[10px] text-[#8993A5]">
              مقارنة إجمالي القضايا بالقضايا التي صدر فيها حكم
            </p>
          </div>

          {chartData.length > 0 ? (
            <div className="h-[330px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
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
                    allowDecimals={false}
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
                    formatter={(value, name) => {
                      if (name === "إجمالي القضايا") {
                        return [value, "إجمالي القضايا"];
                      }

                      return [value, "القضايا المحكوم فيها"];
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
                    name="القضايا المحكوم فيها"
                    fill="#3D9561"
                    radius={[5, 5, 0, 0]}
                    barSize={18}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="flex h-[330px] items-center justify-center">
              <div className="text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F5F7FA]">
                  <BriefcaseBusiness
                    size={20}
                    className="text-[#8993A5]"
                  />
                </div>

                <p className="text-[12px] font-bold text-[#45464D]">
                  لا توجد قضايا في هذه الفترة
                </p>

                <p className="mt-1 text-[10px] text-[#8993A5]">
                  ستظهر بيانات الأداء هنا عند إضافة القضايا
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Lawyers Performance */}

        <div className="rounded-2xl border border-[#EEF1F5] p-4">
          <div className="mb-5">
            <h3 className="text-sm font-bold text-[#111827]">
              نشاط المحامين
            </h3>

            <p className="mt-1 text-[10px] text-[#8993A5]">
              توزيع القضايا على المحامين
            </p>
          </div>

          {topLawyers.length > 0 ? (
            <div className="space-y-4">
              {topLawyers.map((lawyer, index) => {
                const maxCases = topLawyers[0]?.cases || 1;

                const percentage =
                  (lawyer.cases / maxCases) * 100;

                return (
                  <div key={lawyer.id || lawyer.name}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#F5F7FA] text-[9px] font-bold text-[#687282]">
                          {index + 1}
                        </div>

                        <div>
                          <span className="block text-[11px] font-bold text-[#45464D]">
                            {lawyer.name}
                          </span>

                          <span className="text-[9px] text-[#8993A5]">
                            {lawyer.active} قضايا نشطة
                          </span>
                        </div>
                      </div>

                      <span className="text-[10px] font-bold text-[#3E67A5]">
                        {lawyer.cases} قضية
                      </span>
                    </div>

                    <div className="h-1.5 overflow-hidden rounded-full bg-[#EEF1F5]">
                      <div
                        className="h-full rounded-full bg-[#3E67A5] transition-all"
                        style={{
                          width: `${percentage}%`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex min-h-[250px] items-center justify-center">
              <div className="text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F5F7FA]">
                  <Users
                    size={20}
                    className="text-[#8993A5]"
                  />
                </div>

                <p className="text-[12px] font-bold text-[#45464D]">
                  لا يوجد نشاط حتى الآن
                </p>

                <p className="mt-1 text-[10px] text-[#8993A5]">
                  لا يوجد محامون مرتبطون بقضايا في هذه الفترة
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PerformanceSection;