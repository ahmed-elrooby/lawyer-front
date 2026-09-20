"use client";

import React, { useContext, useMemo } from "react";
import { useRouter } from "next/navigation";
import { OwnerContext } from "../../../../../Providers/LawyerOwner/OwnerProvider.js";

const AttorneyTeamPerformance = () => {
  const { lawyers = [], cases = [] } = useContext(OwnerContext);

  const router = useRouter();

  const teamData = useMemo(() => {
    if (!Array.isArray(lawyers)) return [];

    return lawyers
      .map((lawyer) => {
        const lawyerId = String(lawyer?._id || "");

        const lawyerCases = Array.isArray(cases)
          ? cases.filter((item) => {
              if (!Array.isArray(item?.lawyers)) return false;

              return item.lawyers.some((assignedLawyer) => {
                const assignedId =
                  typeof assignedLawyer === "object"
                    ? assignedLawyer?._id
                    : assignedLawyer;

                return String(assignedId) === lawyerId;
              });
            })
          : [];

        const totalCases = lawyerCases.length;

        const activeCases = lawyerCases.filter(
          (item) => item?.status === "active"
        ).length;

        const judgedCases = lawyerCases.filter(
          (item) => item?.status === "judged"
        ).length;

        const percentage =
          totalCases > 0
            ? Math.round((judgedCases / totalCases) * 100)
            : 0;

        let performance = "متوسط";
        let progressColor = "bg-amber-600";

        if (percentage >= 80) {
          performance = "ممتاز";
          progressColor = "bg-emerald-600";
        } else if (percentage >= 60) {
          performance = "جيد";
          progressColor = "bg-blue-600";
        }

        const avatarStyles = [
          "bg-slate-900 text-white",
          "bg-amber-100 text-amber-700",
          "bg-blue-100 text-blue-700",
          "bg-indigo-100 text-indigo-700",
          "bg-yellow-100 text-yellow-700",
        ];

        const avatarStyle =
          avatarStyles[
            Math.abs(
              lawyerId
                .split("")
                .reduce((acc, char) => acc + char.charCodeAt(0), 0)
            ) % avatarStyles.length
          ];

        return {
          ...lawyer,
          totalCases,
          activeCases,
          judgedCases,
          percentage,
          performance,
          progressColor,
          avatarStyle,
          status: lawyer?.isActive ? "متصل" : "غير متصل",
          statusStyle: lawyer?.isActive
            ? "bg-emerald-50 text-emerald-600"
            : "bg-slate-100 text-slate-500",
        };
      })
      .sort((a, b) => b.totalCases - a.totalCases);
  }, [lawyers, cases]);

  const displayedLawyers = teamData.slice(0, 5);

  return (
    <div className="col-span-2 p-4 bg-white rounded-2xl shadow-soft fade-border">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-xs font-extrabold text-slate-900">
            أداء فريق المحامين
          </h3>

          <p className="mt-1 text-[8px] text-slate-400">
            نظرة سريعة على توزيع العمل وأداء الفريق
          </p>
        </div>

        <span className="rounded-lg bg-blue-50 px-2 py-1 text-[8px] text-blue-600">
          {displayedLawyers.length} من {teamData.length} محامي
        </span>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-[1.2fr_.65fr_.65fr_1.1fr_.5fr] gap-2 border-b border-slate-100 pb-2 text-[7px] text-slate-400">
        <span>المحامي</span>
        <span>القضايا</span>
        <span>النشطة</span>
        <span>نسبة الإنجاز</span>
        <span>الحالة</span>
      </div>

      {/* Lawyers */}
      <div className="space-y-1">
        {displayedLawyers.length > 0 ? (
          displayedLawyers.map((lawyer) => {
            const name = lawyer?.name || "محامي";
            const initial = name.charAt(0);

            return (
              <div
                key={lawyer?._id}
                className="grid grid-cols-[1.2fr_.65fr_.65fr_1.1fr_.5fr] items-center gap-2 border-b border-slate-50 py-2.5 text-[8px] last:border-b-0"
              >
                {/* Lawyer */}
                <div className="flex items-center gap-2">
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-full ${lawyer.avatarStyle}`}
                  >
                    {lawyer?.profileImage?.url ? (
                      <img
                        src={lawyer.profileImage.url}
                        alt={name}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      initial
                    )}
                  </span>

                  <span className="min-w-0">
                    <b className="block truncate">{name}</b>

                    <small className="block text-[6px] text-slate-400">
                      {lawyer?.specialization || "محامي"}
                    </small>
                  </span>
                </div>

                {/* Cases */}
                <b>{lawyer.totalCases}</b>

                {/* Active Cases */}
                <span>{lawyer.activeCases}</span>

                {/* Progress */}
                <div>
                  <div className="mb-1 flex justify-between text-[7px]">
                    <span>{lawyer.percentage}%</span>

                    <span>{lawyer.performance}</span>
                  </div>

                  <div className="progress-track">
                    <div
                      className={`h-full rounded-full ${lawyer.progressColor}`}
                      style={{
                        width: `${lawyer.percentage}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Status */}
                <span
                  className={`w-fit rounded-full px-1.5 py-0.5 text-[6px] ${lawyer.statusStyle}`}
                >
                  ● {lawyer.status}
                </span>
              </div>
            );
          })
        ) : (
          <div className="py-6 text-center text-[8px] text-slate-400">
            لا يوجد محامون لعرضهم
          </div>
        )}
      </div>

      {/* Footer */}
      <button
        type="button"
        onClick={() => router.push("/Lawyer_Owner/LawyersPage")}
        className="mt-3 text-[8px] font-bold text-slate-600"
      >
        عرض كل فريق المحامين ←
      </button>
    </div>
  );
};

export default AttorneyTeamPerformance;