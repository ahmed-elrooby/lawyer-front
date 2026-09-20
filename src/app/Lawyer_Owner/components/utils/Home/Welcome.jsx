"use client";

import React, { useContext, useMemo } from "react";
import { authContext } from "../../../../../Providers/AuthProvider/Auth.js";
import { OwnerContext } from "../../../../../Providers/LawyerOwner/OwnerProvider.js";

const Welcome = () => {
  const { profile } = useContext(authContext);

  const {
    dashboardStatisics,
    sessions = [],
    cases = [],
    lawyers = [],
    clients = [],
  } = useContext(OwnerContext);

  // =========================
  // Weekly Sessions
  // =========================
  const weeklySessions = useMemo(() => {
    if (!Array.isArray(sessions)) return 0;

    const now = new Date();

    const startOfWeek = new Date(now);
    startOfWeek.setHours(0, 0, 0, 0);
    startOfWeek.setDate(now.getDate() - now.getDay());

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 7);

    return sessions.filter((session) => {
      if (!session?.sessionDate) return false;

      const sessionDate = new Date(session.sessionDate);

      return sessionDate >= startOfWeek && sessionDate < endOfWeek;
    }).length;
  }, [sessions]);

  // =========================
  // Performance Calculations
  // =========================
  const performance = useMemo(() => {
    const totalLawyers =
      dashboardStatisics?.lawyers?.total ||
      (Array.isArray(lawyers) ? lawyers.length : 0);

    const activeLawyers = Array.isArray(lawyers)
      ? lawyers.filter((lawyer) => lawyer?.isActive === true).length
      : 0;

    const totalCases =
      dashboardStatisics?.cases?.total ||
      (Array.isArray(cases) ? cases.length : 0);

    const judgedCases = Array.isArray(cases)
      ? cases.filter((item) => item?.status === "judged").length
      : 0;

    const totalClients =
      dashboardStatisics?.clients?.total ||
      (Array.isArray(clients) ? clients.length : 0);

    // =========================
    // Team Efficiency
    // =========================
    const teamEfficiency =
      totalLawyers > 0
        ? Math.round((activeLawyers / totalLawyers) * 100)
        : 0;

    // =========================
    // Cases Progress
    // =========================
    const casesProgress =
      totalCases > 0
        ? Math.round((judgedCases / totalCases) * 100)
        : 0;

    // =========================
    // Client Engagement
    // العملاء المرتبطين بقضايا
    // =========================
    const clientsWithCases = Array.isArray(clients)
      ? clients.filter((client) => {
          return (
            Array.isArray(client?.cases) && client.cases.length > 0
          );
        }).length
      : 0;

    const clientEngagement =
      totalClients > 0
        ? Math.round((clientsWithCases / totalClients) * 100)
        : 0;

    // =========================
    // Sessions Performance
    // =========================
    const totalSessions = Array.isArray(sessions)
      ? sessions.length
      : 0;

    const completedSessions = Array.isArray(sessions)
      ? sessions.filter(
          (session) =>
            session?.status === "attended" ||
            session?.status === "completed"
        ).length
      : 0;

    const sessionsPerformance =
      totalSessions > 0
        ? Math.round((completedSessions / totalSessions) * 100)
        : 0;

    // =========================
    // Office Performance
    // =========================
    const officePerformance = Math.round(
      teamEfficiency * 0.35 +
        casesProgress * 0.35 +
        sessionsPerformance * 0.3
    );

    // =========================
    // Monthly Growth
    // =========================
    const now = new Date();

    const currentMonthStart = new Date(
      now.getFullYear(),
      now.getMonth(),
      1
    );

    const previousMonthStart = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      1
    );

    const currentMonthCases = Array.isArray(cases)
      ? cases.filter((item) => {
          if (!item?.createdAt) return false;

          const date = new Date(item.createdAt);

          return date >= currentMonthStart;
        }).length
      : 0;

    const previousMonthCases = Array.isArray(cases)
      ? cases.filter((item) => {
          if (!item?.createdAt) return false;

          const date = new Date(item.createdAt);

          return (
            date >= previousMonthStart &&
            date < currentMonthStart
          );
        }).length
      : 0;

    let monthlyGrowth = 0;

    if (previousMonthCases > 0) {
      monthlyGrowth = Math.round(
        ((currentMonthCases - previousMonthCases) /
          previousMonthCases) *
          100
      );
    } else if (currentMonthCases > 0) {
      monthlyGrowth = 100;
    }

    return {
      teamEfficiency,
      casesProgress,
      clientEngagement,
      sessionsPerformance,
      officePerformance,
      monthlyGrowth,
    };
  }, [
    dashboardStatisics,
    lawyers,
    cases,
    clients,
    sessions,
  ]);

  return (
    <section
      className="
        relative mb-4 overflow-hidden rounded-2xl
        bg-[#111827] p-5 text-white shadow-xl
      "
      style={{
        backgroundImage: `
          linear-gradient(
            30deg,
            rgba(255,255,255,.025) 12%,
            transparent 12.5%,
            transparent 87%,
            rgba(255,255,255,.025) 87.5%,
            rgba(255,255,255,.025)
          ),
          linear-gradient(
            150deg,
            rgba(255,255,255,.025) 12%,
            transparent 12.5%,
            transparent 87%,
            rgba(255,255,255,.025) 87.5%,
            rgba(255,255,255,.025)
          ),
          linear-gradient(
            30deg,
            rgba(255,255,255,.025) 12%,
            transparent 12.5%,
            transparent 87%,
            rgba(255,255,255,.025) 87.5%,
            rgba(255,255,255,.025)
          ),
          linear-gradient(
            150deg,
            rgba(255,255,255,.025) 12%,
            transparent 12.5%,
            transparent 87%,
            rgba(255,255,255,.025) 87.5%,
            rgba(255,255,255,.025)
          ),
          linear-gradient(
            60deg,
            rgba(255,255,255,.025) 25%,
            transparent 25.5%,
            transparent 75%,
            rgba(255,255,255,.025) 75%
          )
        `,
        backgroundSize: "58px 100px",
        backgroundPosition:
          "0 0, 0 0, 29px 50px, 29px 50px, 0 0",
      }}
    >
      {/* Glow */}
      <div className="absolute w-32 h-32 rounded-full -left-12 -top-12 bg-blue-500/10 blur-2xl" />

      <div className="absolute w-32 h-32 rounded-full -bottom-12 right-20 bg-amber-400/10 blur-2xl" />

      {/* Content */}
      <div className="relative grid items-center gap-5 lg:grid-cols-[1.25fr_.9fr]">

        {/* Right Content */}
        <div>

          {/* Badges */}
          <div className="flex items-center gap-2 mb-2">
            <span className="rounded-full bg-amber-400/15 px-2.5 py-1 text-[8px] text-amber-200">
              ✦ مكتب موثوق
            </span>

            <span className="rounded-full bg-emerald-400/10 px-2.5 py-1 text-[8px] text-emerald-300">
              ● نشط الآن
            </span>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-extrabold leading-tight sm:text-3xl">
            {profile?.user?.officeId?.name || ""}
          </h2>

          {/* Description */}
          <p className="mt-2 max-w-xl text-[10px] leading-6 text-slate-300">
            مركز قيادة المكتب لمتابعة أداء الفريق، إدارة القضايا، ومراقبة سير
            العمل في مكان واحد.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-2 mt-4">

            <span className="rounded-lg bg-white/10 px-2.5 py-1.5 text-[9px]">
              {dashboardStatisics?.lawyers?.total || 0} محامي
            </span>

            <span className="rounded-lg bg-white/10 px-2.5 py-1.5 text-[9px]">
              {dashboardStatisics?.cases?.total || 0} قضية
            </span>

            <span className="rounded-lg bg-white/10 px-2.5 py-1.5 text-[9px]">
              {dashboardStatisics?.clients?.total || 0} عميل
            </span>

            <span className="rounded-lg bg-white/10 px-2.5 py-1.5 text-[9px]">
              {weeklySessions} جلسة هذا الأسبوع
            </span>

          </div>
        </div>

        {/* Performance Card */}
        <div className="flex items-center justify-center">
          <div className="w-full max-w-[310px] rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">

            <div className="flex items-center gap-5">

              {/* Circle */}
              <div
                className="relative p-2 rounded-full h-28 w-28 shrink-0"
                style={{
                  background: `conic-gradient(
                    #60d394 0 ${performance.officePerformance}%,
                    #d6c14c ${performance.officePerformance}% 87%,
                    rgba(255,255,255,.12) 87% 100%
                  )`,
                }}
              >
                <div className="flex h-full w-full flex-col items-center justify-center rounded-full bg-[#172033]">

                  <strong className="text-3xl leading-none">
                    {performance.officePerformance}
                  </strong>

                  <span className="mt-1 text-[8px] text-slate-400">
                    من 100
                  </span>

                  <span className="mt-0.5 text-[8px] text-emerald-300">
                    أداء المكتب
                  </span>

                </div>
              </div>

              {/* Progress */}
              <div className="flex-1 space-y-3">

                {/* Team Efficiency */}
                <div>
                  <div className="mb-1 flex justify-between text-[8px] text-slate-300">
                    <span>كفاءة الفريق</span>

                    <b className="text-white">
                      {performance.teamEfficiency}%
                    </b>
                  </div>

                  <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-emerald-400"
                      style={{
                        width: `${performance.teamEfficiency}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Cases Progress */}
                <div>
                  <div className="mb-1 flex justify-between text-[8px] text-slate-300">
                    <span>تقدم القضايا</span>

                    <b className="text-white">
                      {performance.casesProgress}%
                    </b>
                  </div>

                  <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full bg-blue-400 rounded-full"
                      style={{
                        width: `${performance.casesProgress}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Client Engagement */}
                <div>
                  <div className="mb-1 flex justify-between text-[8px] text-slate-300">
                    <span>تفاعل العملاء</span>

                    <b className="text-white">
                      {performance.clientEngagement}%
                    </b>
                  </div>

                  <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-amber-300"
                      style={{
                        width: `${performance.clientEngagement}%`,
                      }}
                    />
                  </div>
                </div>

              </div>
            </div>

            {/* Growth */}
            <div
              className={`mt-3 text-center text-[8px] ${
                performance.monthlyGrowth >= 0
                  ? "text-emerald-300"
                  : "text-red-300"
              }`}
            >
              {performance.monthlyGrowth >= 0 ? "↗" : "↘"}{" "}
              {performance.monthlyGrowth > 0
                ? `+${performance.monthlyGrowth}%`
                : `${performance.monthlyGrowth}%`}{" "}
              مقارنة بالشهر الماضي
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;