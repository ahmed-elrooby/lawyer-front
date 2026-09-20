"use client";

import React, { useContext, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { OwnerContext } from "../../../../../Providers/LawyerOwner/OwnerProvider.js";

const CaseDistribution = () => {
  const { lawyers = [], cases = [] } = useContext(OwnerContext);

  const router = useRouter();

  const colors = [
    "#0f172a",
    "#f59e0b",
    "#2563eb",
    "#4f46e5",
    "#eab308",
  ];

  const data = useMemo(() => {
    if (!Array.isArray(lawyers) || !Array.isArray(cases)) {
      return [];
    }

    const lawyerData = lawyers
      .map((lawyer, index) => {
        const lawyerId = String(lawyer?._id || "");

        const lawyerCases = cases.filter((item) => {
          if (!Array.isArray(item?.lawyers)) return false;

          return item.lawyers.some((assignedLawyer) => {
            const assignedId =
              typeof assignedLawyer === "object"
                ? assignedLawyer?._id
                : assignedLawyer;

            return String(assignedId) === lawyerId;
          });
        });

        return {
          name: lawyer?.name || "محامي",
          value: lawyerCases.length,
          color: colors[index % colors.length],
        };
      })
      .filter((lawyer) => lawyer.value > 0)
      .sort((a, b) => b.value - a.value);

    // القضايا غير المسندة لأي محامي
    const assignedCaseIds = new Set();

    cases.forEach((item) => {
      if (!Array.isArray(item?.lawyers)) return;

      item.lawyers.forEach((assignedLawyer) => {
        const lawyerId =
          typeof assignedLawyer === "object"
            ? assignedLawyer?._id
            : assignedLawyer;

        if (lawyerId) {
          assignedCaseIds.add(String(item?._id));
        }
      });
    });

    const unassignedCases = cases.filter(
      (item) => !assignedCaseIds.has(String(item?._id))
    ).length;

    const result = lawyerData.slice(0, 5);

    if (unassignedCases > 0) {
      result.push({
        name: "آخرون",
        value: unassignedCases,
        color: "#94a3b8",
      });
    }

    return result;
  }, [lawyers, cases]);

  const totalCases = Array.isArray(cases) ? cases.length : 0;

  return (
    <div className="p-4 bg-white rounded-2xl shadow-soft fade-border">
      {/* Header */}
      <div className="mb-3">
        <h3 className="text-xs font-extrabold text-slate-900">
          توزيع القضايا على الفريق
        </h3>

        <p className="mt-1 text-[8px] text-slate-400">
          توزيع القضايا الحالية حسب المحامي
        </p>
      </div>

      {/* Donut Chart */}
      <div className="flex items-center justify-center">
        <div className="relative h-36 w-36">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={70}
                paddingAngle={1}
                dataKey="value"
                stroke="none"
                startAngle={90}
                endAngle={-270}
              >
                {data.map((item) => (
                  <Cell
                    key={item.name}
                    fill={item.color}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-extrabold text-slate-900">
                {totalCases}
              </div>

              <div className="text-[7px] text-slate-400">
                قضية
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div
        className="mt-3 grid grid-cols-2 gap-1.5 text-[7px] text-slate-500"
        dir="rtl"
      >
        {data.length > 0 ? (
          data.map((item) => (
            <span
              key={item.name}
              className="flex items-center gap-1"
            >
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full"
                style={{
                  backgroundColor: item.color,
                }}
              />

              <span>
                {item.name}{" "}
                <b className="font-extrabold text-slate-700">
                  {item.value}
                </b>
              </span>
            </span>
          ))
        ) : (
          <span className="col-span-2 text-center text-slate-400">
            لا توجد قضايا حاليًا
          </span>
        )}
      </div>

      {/* Note */}
      <div className="mt-3 rounded-xl bg-amber-50 p-2.5 text-[7px] leading-4 text-slate-600">
        💡{" "}
        <b className="font-extrabold">
          ملاحظة:
        </b>{" "}
        راجع توزيع الأحمال بشكل دوري للحفاظ على توازن العمل بين أعضاء الفريق.
      </div>

      {/* Button */}
      <button
        type="button"
        onClick={() => router.push("/Lawyer_Owner/Cases")}
        className="mt-3 w-full rounded-lg bg-slate-900 py-2 text-[8px] font-bold text-white transition hover:bg-slate-800"
      >
        إدارة توزيع القضايا
      </button>
    </div>
  );
};

export default CaseDistribution;