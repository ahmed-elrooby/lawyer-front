"use client";
import React, { useMemo, useState } from "react";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  MapPin,
  UserRound,
  Gavel,
  Eye,
  MoreHorizontal,
  CircleDot,
} from "lucide-react";

const CalendarAndTodaySessions = () => {
  const [selectedDay, setSelectedDay] = useState(18);

  const days = [
    { day: "الأحد", short: "أحد", date: 14, count: 3 },
    { day: "الإثنين", short: "إثن", date: 15, count: 5 },
    { day: "الثلاثاء", short: "ثلا", date: 16, count: 2 },
    { day: "الأربعاء", short: "أرب", date: 17, count: 4 },
    { day: "الخميس", short: "خمي", date: 18, count: 6 },
    { day: "الجمعة", short: "جمع", date: 19, count: 1 },
    { day: "السبت", short: "سبت", date: 20, count: 3 },
  ];

  const sessions = [
    {
      id: 1,
      date: 18,
      time: "09:00",
      period: "ص",
      caseNumber: "#1024",
      caseName: "قضية شركة النور التجارية",
      lawyer: "أحمد محمد علي",
      court: "محكمة القاهرة",
      chamber: "الدائرة 12",
      status: "قادمة",
      type: "تجاري",
      color: "blue",
    },
    {
      id: 2,
      date: 18,
      time: "10:30",
      period: "ص",
      caseNumber: "#1031",
      caseName: "قضية أحمد محمود عبد الله",
      lawyer: "خالد عبد الرحمن",
      court: "محكمة جنوب القاهرة",
      chamber: "الدائرة 8",
      status: "جارية",
      type: "أحوال شخصية",
      color: "green",
    },
    {
      id: 3,
      date: 18,
      time: "12:00",
      period: "م",
      caseNumber: "#1048",
      caseName: "قضية مؤسسة المستقبل",
      lawyer: "محمد أحمد حسن",
      court: "محكمة الجيزة",
      chamber: "الدائرة 5",
      status: "قادمة",
      type: "مدني",
      color: "purple",
    },
    {
      id: 4,
      date: 18,
      time: "01:30",
      period: "م",
      caseNumber: "#1082",
      caseName: "قضية خالد إبراهيم",
      lawyer: "سامي محمود",
      court: "محكمة القاهرة",
      chamber: "الدائرة 15",
      status: "قادمة",
      type: "جنائي",
      color: "gold",
    },
    {
      id: 5,
      date: 18,
      time: "03:00",
      period: "م",
      caseNumber: "#1106",
      caseName: "قضية شركة الأمل",
      lawyer: "ياسر إبراهيم",
      court: "محكمة الجيزة",
      chamber: "الدائرة 7",
      status: "قادمة",
      type: "تجاري",
      color: "blue",
    },
  ];

  const selectedSessions = useMemo(() => {
    return sessions.filter(
      (session) => session.date === selectedDay
    );
  }, [selectedDay]);

  const getStatusStyle = (status) => {
    if (status === "جارية") {
      return {
        badge: "bg-[#EFFAF5] text-[#3D9561]",
        dot: "bg-[#3D9561]",
      };
    }

    if (status === "قادمة") {
      return {
        badge: "bg-[#EEF5FF] text-[#3E67A5]",
        dot: "bg-[#3E67A5]",
      };
    }

    return {
      badge: "bg-[#F4F5F7] text-[#687282]",
      dot: "bg-[#8993A5]",
    };
  };

  return (
    <section
      dir="rtl"
      className="mb-7 w-full overflow-hidden rounded-2xl border border-[#E5EAF1] bg-white"
    >
      {/* =================================================
          TOP HEADER
      ================================================= */}
      <div className="border-b border-[#EEF1F5] px-5 py-5 md:px-6">

        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          {/* Title */}
          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0B1C30]">
              <CalendarDays
                size={20}
                className="text-white"
              />
            </div>

            <div>
              <h2 className="text-[16px] font-bold text-[#0B1C30]">
                أجندة الجلسات
              </h2>

              <div className="flex items-center gap-2 mt-1">
                <span className="text-[11px] text-[#8993A5]">
                  الخميس
                </span>

                <span className="h-1 w-1 rounded-full bg-[#C7CDD6]" />

                <span className="text-[11px] text-[#8993A5]">
                  18 سبتمبر 2026
                </span>
              </div>
            </div>
          </div>

          {/* Month Navigation */}
          <div className="flex items-center gap-2">

            <button
              className="
                flex h-9 w-9 items-center justify-center
                rounded-lg border border-[#E5EAF1]
                text-[#8993A5]
                transition
                hover:bg-[#F7F9FC]
                hover:text-[#111827]
              "
            >
              <ChevronRight size={16} />
            </button>

            <div className="min-w-[125px] rounded-lg border border-[#E5EAF1] bg-[#FAFBFC] px-4 py-2 text-center">
              <span className="text-[11px] font-bold text-[#45464D]">
                سبتمبر 2026
              </span>
            </div>

            <button
              className="
                flex h-9 w-9 items-center justify-center
                rounded-lg border border-[#E5EAF1]
                text-[#8993A5]
                transition
                hover:bg-[#F7F9FC]
                hover:text-[#111827]
              "
            >
              <ChevronLeft size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* =================================================
          DATE SELECTOR
      ================================================= */}
      <div className="border-b border-[#EEF1F5] bg-[#FAFBFC] px-4 py-4 md:px-6">

        <div className="grid grid-cols-7 gap-2">

          {days.map((day) => {
            const active = selectedDay === day.date;

            return (
              <button
                key={day.date}
                onClick={() => setSelectedDay(day.date)}
                className={`
                  relative
                  flex
                  min-h-[78px]
                  flex-col
                  items-center
                  justify-center
                  rounded-xl
                  border
                  transition-all
                  duration-200
                  ${
                    active
                      ? "border-[#111827] bg-[#111827] shadow-[0_5px_15px_rgba(17,24,39,0.12)]"
                      : "border-[#E8ECF2] bg-white hover:border-[#CBD5E1]"
                  }
                `}
              >

                <span
                  className={`text-[9px] font-medium ${
                    active
                      ? "text-white/60"
                      : "text-[#9AA3B1]"
                  }`}
                >
                  {day.day}
                </span>

                <span
                  className={`mt-1.5 text-lg font-bold ${
                    active
                      ? "text-white"
                      : "text-[#111827]"
                  }`}
                >
                  {day.date}
                </span>

                <span
                  className={`mt-1 text-[8px] ${
                    active
                      ? "text-white/60"
                      : "text-[#9AA3B1]"
                  }`}
                >
                  {day.count} جلسات
                </span>

                {active && (
                  <span className="absolute bottom-1.5 h-1 w-1 rounded-full bg-white" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* =================================================
          CONTENT
      ================================================= */}
      <div className="px-5 py-5 md:px-6">

        {/* Section Header */}
        <div className="flex items-center justify-between mb-5">

          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-[#0B1C30]">
                جلسات اليوم
              </h3>

              <span className="rounded-full bg-[#EEF5FF] px-2 py-0.5 text-[9px] font-bold text-[#3E67A5]">
                {selectedSessions.length}
              </span>
            </div>

            <p className="mt-1 text-[10px] text-[#8993A5]">
              جدول الجلسات المقرر لهذا اليوم
            </p>
          </div>

          <button className="flex items-center gap-1.5 text-[10px] font-bold text-[#3E67A5] hover:text-[#274E8A]">
            عرض التقويم الكامل
            <ChevronLeft size={13} />
          </button>
        </div>

        {/* =================================================
            TIMELINE
        ================================================= */}
        <div className="space-y-1">

          {selectedSessions.map((session, index) => {

            const statusStyle = getStatusStyle(
              session.status
            );

            return (
              <div
                key={session.id}
                className="group grid grid-cols-[65px_18px_1fr] gap-3"
              >

                {/* Time */}
                <div className="pt-5 text-left">
                  <div className="text-[11px] font-bold text-[#111827]">
                    {session.time}
                  </div>

                  <div className="mt-0.5 text-[9px] text-[#9AA3B1]">
                    {session.period}
                  </div>
                </div>

                {/* Timeline */}
                <div className="relative flex justify-center">

                  {index !==
                    selectedSessions.length - 1 && (
                    <div className="absolute top-9 h-full w-px bg-[#E8ECF2]" />
                  )}

                  <div
                    className={`
                      relative
                      z-10
                      mt-5
                      flex
                      h-4
                      w-4
                      items-center
                      justify-center
                      rounded-full
                      bg-white
                      ring-4
                      ring-white
                    `}
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${statusStyle.dot}`}
                    />
                  </div>
                </div>

                {/* Session Card */}
                <div className="mb-3 rounded-xl border border-[#E8ECF2] bg-white p-4 transition-all duration-200 hover:border-[#D3DBE7] hover:shadow-[0_5px_20px_rgba(15,23,42,0.05)]">

                  {/* Top Row */}
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">

                    <div className="min-w-0">

                      <div className="flex flex-wrap items-center gap-2">

                        <span className="text-[12px] font-bold text-[#0B1C30]">
                          {session.caseName}
                        </span>

                        <span className="rounded-md bg-[#F4F6F9] px-2 py-1 text-[8px] font-bold text-[#687282]">
                          {session.caseNumber}
                        </span>

                        <span
                          className={`rounded-full px-2 py-1 text-[8px] font-bold ${statusStyle.badge}`}
                        >
                          <span className="ml-1 inline-block h-1.5 w-1.5 rounded-full bg-current" />
                          {session.status}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center mt-2 gap-x-4 gap-y-2">

                        {/* Lawyer */}
                        <div className="flex items-center gap-1.5">
                          <UserRound
                            size={12}
                            className="text-[#9AA3B1]"
                          />

                          <span className="text-[9px] text-[#687282]">
                            {session.lawyer}
                          </span>
                        </div>

                        {/* Court */}
                        <div className="flex items-center gap-1.5">
                          <MapPin
                            size={12}
                            className="text-[#9AA3B1]"
                          />

                          <span className="text-[9px] text-[#687282]">
                            {session.court}
                          </span>
                        </div>

                        {/* Chamber */}
                        <div className="flex items-center gap-1.5">
                          <Gavel
                            size={12}
                            className="text-[#9AA3B1]"
                          />

                          <span className="text-[9px] text-[#687282]">
                            {session.chamber}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* More */}
                    <button
                      className="
                        flex h-8 w-8 shrink-0
                        items-center justify-center
                        rounded-lg
                        text-[#9AA3B1]
                        transition
                        hover:bg-[#F5F7FA]
                        hover:text-[#111827]
                      "
                    >
                      <MoreHorizontal size={16} />
                    </button>
                  </div>

                  {/* Bottom */}
                  <div className="mt-4 flex flex-col gap-3 border-t border-[#F0F2F5] pt-3 sm:flex-row sm:items-center sm:justify-between">

                    <div className="flex items-center gap-2">

                      <span className="flex items-center gap-1.5 rounded-lg bg-[#F8F9FB] px-2.5 py-1.5 text-[9px] text-[#687282]">
                        <Clock3 size={11} />
                        {session.time} {session.period}
                      </span>

                      <span className="rounded-lg bg-[#F8F9FB] px-2.5 py-1.5 text-[9px] text-[#687282]">
                        {session.type}
                      </span>
                    </div>

                    <button
                      className="
                        flex items-center justify-center
                        gap-1.5
                        rounded-lg
                        bg-[#111827]
                        px-4
                        py-2
                        text-[9px]
                        font-bold
                        text-white
                        transition
                        hover:bg-[#1D2738]
                      "
                    >
                      <Eye size={12} />
                      تفاصيل الجلسة
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* =================================================
            FOOTER
        ================================================= */}
        <div className="mt-4 flex items-center justify-between rounded-xl bg-[#FAFBFC] px-4 py-3">

          <div className="flex items-center gap-2">

            <CircleDot
              size={12}
              className="text-[#3D9561]"
            />

            <span className="text-[9px] text-[#687282]">
              توجد جلسة جارية حالياً
            </span>
          </div>

          <span className="text-[9px] font-bold text-[#8993A5]">
            آخر تحديث منذ 5 دقائق
          </span>
        </div>
      </div>
    </section>
  );
};

export default CalendarAndTodaySessions;