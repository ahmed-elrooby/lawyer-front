"use client";

import React, { useContext, useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { OwnerContext } from "../../../../../Providers/LawyerOwner/OwnerProvider.js";

const CasePortfolio = () => {
  const { cases = [] } = useContext(OwnerContext);

  const caseStatus = useMemo(() => {
    if (!Array.isArray(cases)) return [];

    const total = cases.length;

    const active = cases.filter(
      (item) => item?.status === "active"
    ).length;

    const closed = cases.filter(
      (item) => item?.status === "judged"
    ).length;

    const reserved = cases.filter(
      (item) => item?.status === "reserved_for_judgment"
    ).length;

    const getPercentage = (value) => {
      if (!total) return "0%";
      return `${Math.round((value / total) * 100)}%`;
    };

    return [
      {
        name: "قضايا نشطة",
        value: active,
        percentage: getPercentage(active),
        color: "#2563eb",
      },
      {
        name: "قضايا مغلقة",
        value: closed,
        percentage: getPercentage(closed),
        color: "#10b981",
      },
      {
        name: "قضايا محجوزة للحكم",
        value: reserved,
        percentage: getPercentage(reserved),
        color: "#f59e0b",
      },
    ];
  }, [cases]);

  const specialties = useMemo(() => {
    if (!Array.isArray(cases)) return [];

    const specialtyMap = {};

    cases.forEach((item) => {
      const specialty =
        item?.caseTypeId?.name ||
        item?.caseType?.name ||
        item?.specialty;

      if (!specialty) return;

      specialtyMap[specialty] =
        (specialtyMap[specialty] || 0) + 1;
    });

    return Object.entries(specialtyMap)
      .map(([name, value]) => ({
        name,
        value,
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  }, [cases]);

  const totalCases = Array.isArray(cases) ? cases.length : 0;

  const activeSpecialties = specialties.slice(0, 2);

  return (
    <div className="p-4 bg-white rounded-2xl shadow-soft fade-border">
      {/* Header */}
      <div className="mb-3">
        <h3 className="text-xs font-extrabold text-slate-900">
          محفظة القضايا وتصنيف التخصصات
        </h3>

        <p className="mt-1 text-[8px] text-slate-400">
          نظرة على القضايا حسب الحالة والتخصص
        </p>
      </div>

      {/* Chart + Status */}
      <div
        className="flex items-center gap-5"
        dir="rtl"
      >
        {/* Donut */}
        <div className="relative h-36 w-36 shrink-0">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <PieChart>
              <Pie
                data={caseStatus}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={70}
                paddingAngle={1}
                stroke="none"
                startAngle={90}
                endAngle={-270}
              >
                {caseStatus.map((item) => (
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

        {/* Status */}
        <div className="flex-1 space-y-2 text-[8px]">
          {caseStatus.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between"
            >
              <span>{item.name}</span>

              <b>
                {item.value} ({item.percentage})
              </b>
            </div>
          ))}
        </div>
      </div>

      {/* Specialties */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {specialties.length > 0 ? (
          specialties.map((item, index) => (
            <span
              key={item.name}
              className={
                index < activeSpecialties.length
                  ? "rounded-full bg-blue-50 px-2 py-1 text-[7px] text-blue-700"
                  : "rounded-full bg-slate-100 px-2 py-1 text-[7px] text-slate-600"
              }
            >
              {item.name} ({item.value})
            </span>
          ))
        ) : (
          <span className="text-[7px] text-slate-400">
            لا توجد تصنيفات للقضايا
          </span>
        )}
      </div>
    </div>
  );
};

export default CasePortfolio;