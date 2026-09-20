"use client";

import React, { useContext, useMemo, useState } from "react";
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
import { OwnerContext } from "../../../../../Providers/LawyerOwner/OwnerProvider.js";
import Details from "./Details.jsx";

const CalendarAndTodaySessions = () => {
  const { sessions = [] } = useContext(OwnerContext);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
const [selectSession, setSelectSession] = useState(null);
const [openDetails, setOpenDetails] = useState(false);
  // ==========================================
  // Helpers
  // ==========================================

  const getDateKey = (date) => {
    if (!date) return null;

    const parsedDate = new Date(date);

    return `${parsedDate.getFullYear()}-${String(
      parsedDate.getMonth() + 1
    ).padStart(2, "0")}-${String(
      parsedDate.getDate()
    ).padStart(2, "0")}`;
  };

  const selectedDateKey = getDateKey(selectedDate);

  const formatMonth = (date) => {
    return new Intl.DateTimeFormat("ar-EG", {
      month: "long",
      year: "numeric",
    }).format(date);
  };

  const formatSelectedDate = (date) => {
    return new Intl.DateTimeFormat("ar-EG", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  const formatTime = (time) => {
    if (!time) return "--:--";

    const [hours, minutes] = time.split(":");
    const hour = Number(hours);

    if (Number.isNaN(hour)) return time;

    const period = hour >= 12 ? "م" : "ص";
    const formattedHour = hour % 12 || 12;

    return {
      time: `${String(formattedHour).padStart(2, "0")}:${minutes}`,
      period,
    };
  };

  const getStatus = (status) => {
    const statuses = {
      scheduled: {
        label: "مجدولة",
        badge: "bg-[#EEF5FF] text-[#3E67A5]",
        dot: "bg-[#3E67A5]",
      },

      attended: {
        label: "تم الحضور",
        badge: "bg-[#F3F0FF] text-[#7357B8]",
        dot: "bg-[#7357B8]",
      },

      postponed: {
        label: "مؤجلة",
        badge: "bg-[#FFF8E8] text-[#B18A2E]",
        dot: "bg-[#B18A2E]",
      },

      completed: {
        label: "مكتملة",
        badge: "bg-[#EFFAF5] text-[#3D9561]",
        dot: "bg-[#3D9561]",
      },

      cancelled: {
        label: "ملغاة",
        badge: "bg-[#FEF2F2] text-[#B91C1C]",
        dot: "bg-[#B91C1C]",
      },
    };

    return (
      statuses[status] || {
        label: status || "غير محددة",
        badge: "bg-[#F4F5F7] text-[#687282]",
        dot: "bg-[#8993A5]",
      }
    );
  };

  // ==========================================
  // Current Month Days
  // ==========================================

  const monthDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const days = [];

    for (
      let day = 1;
      day <= lastDay.getDate();
      day++
    ) {
      const date = new Date(year, month, day);

      const daySessions = sessions.filter(
        (session) =>
          getDateKey(session.sessionDate) ===
          getDateKey(date)
      );

      days.push({
        date,
        count: daySessions.length,
      });
    }

    return days;
  }, [currentDate, sessions]);

  // ==========================================
  // Selected Sessions
  // ==========================================

  const selectedSessions = useMemo(() => {
    return sessions
      .filter(
        (session) =>
          getDateKey(session.sessionDate) ===
          selectedDateKey
      )
      .sort((a, b) => {
        return (a.sessionTime || "").localeCompare(
          b.sessionTime || ""
        );
      });
  }, [sessions, selectedDateKey]);

  // ==========================================
  // Current Month Navigation
  // ==========================================

  const goToPreviousMonth = () => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1
    );

    setCurrentDate(newDate);

    setSelectedDate(newDate);
  };

  const goToNextMonth = () => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      1
    );

    setCurrentDate(newDate);

    setSelectedDate(newDate);
  };

  // ==========================================
  // Selected Date Change
  // ==========================================

  const handleSelectDate = (date) => {
    setSelectedDate(date);
  };

  // ==========================================
  // Get Case Data
  // ==========================================

  const getCaseData = (session) => {
    const caseData = session?.caseId;

    if (!caseData || typeof caseData !== "object") {
      return {
        number: "بدون رقم قضية",
        title: "جلسة بدون قضية مرتبطة",
        court: "غير محدد",
        lawyer: "غير محدد",
        type: "غير محدد",
      };
    }

    return {
      number: caseData.caseNumber
        ? `#${caseData.caseNumber}`
        : "بدون رقم قضية",

     

      court:
        caseData.court ||
        "غير محدد",

      lawyer:
        Array.isArray(caseData.lawyers) &&
        caseData.lawyers.length > 0
          ? caseData.lawyers
              .map((lawyer) => lawyer?.name)
              .filter(Boolean)
              .join("، ")
          : "غير محدد",

      type:
        caseData.caseTypeId?.name ||
        caseData.caseType?.name ||
        "قضية",
    };
  };

  // ==========================================
  // Today's Running Session
  // ==========================================

  const runningSession = selectedSessions.find(
    (session) => session.status === "attended"
  );

  return (
    <section
      dir="rtl"
      className="mb-7 w-full overflow-hidden rounded-2xl border border-[#E5EAF1] bg-white"
    >
      {/* ==========================================
          HEADER
      ========================================== */}

      <div className="border-b border-[#EEF1F5] px-4 py-4 sm:px-5 sm:py-5 md:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Title */}
          <div className="flex items-center min-w-0 gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0B1C30] sm:h-11 sm:w-11">
              <CalendarDays
                size={19}
                className="text-white"
              />
            </div>

            <div className="min-w-0">
              <h2 className="text-[15px] font-bold text-[#0B1C30] sm:text-[16px]">
               الأجنده القضائيه
              </h2>

              <div className="flex flex-wrap items-center gap-2 mt-1">
                <span className="text-[10px] text-[#8993A5] sm:text-[11px]">
                  {formatSelectedDate(selectedDate)}
                </span>

                <span className="h-1 w-1 shrink-0 rounded-full bg-[#C7CDD6]" />

                <span className="text-[10px] font-medium text-[#3E67A5] sm:text-[11px]">
                  {selectedSessions.length} جلسة
                </span>
              </div>
            </div>
          </div>

          {/* Month Navigation */}
          <div className="flex items-center justify-between w-full gap-2 sm:w-auto sm:justify-start">
            <button
              type="button"
              onClick={goToPreviousMonth}
              className="
                flex h-9 w-9 shrink-0 items-center justify-center
                rounded-lg border border-[#E5EAF1]
                text-[#8993A5]
                transition
                hover:bg-[#F7F9FC]
                hover:text-[#111827]
              "
            >
              <ChevronRight size={16} />
            </button>

            <div className="flex h-9 min-w-0 flex-1 items-center justify-center rounded-lg border border-[#E5EAF1] bg-[#FAFBFC] px-4 sm:min-w-[135px]">
              <span className="truncate text-[10px] font-bold text-[#45464D] sm:text-[11px]">
                {formatMonth(currentDate)}
              </span>
            </div>

            <button
              type="button"
              onClick={goToNextMonth}
              className="
                flex h-9 w-9 shrink-0 items-center justify-center
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

      {/* ==========================================
          DATE SELECTOR
      ========================================== */}
{
  openDetails && <Details selectSession={selectSession} openDetails={openDetails} setOpenDetails={setOpenDetails} />
}
      <div className="border-b border-[#EEF1F5] bg-[#FAFBFC] px-4 py-4 md:px-6">
        <div className="flex gap-2 pb-1 overflow-x-auto scrollbar-thin">
          {monthDays.map((day) => {
            const active =
              selectedDateKey === getDateKey(day.date);

            return (
              <button
                key={getDateKey(day.date)}
                type="button"
                onClick={() => handleSelectDate(day.date)}
                className={`
                  relative
                  flex
                  min-w-[72px]
                  flex-1
                  flex-col
                  items-center
                  justify-center
                  rounded-xl
                  border
                  px-2
                  py-3
                  transition-all
                  duration-200
                  sm:min-w-[82px]
                  sm:py-3.5
                  ${
                    active
                      ? "border-[#111827] bg-[#111827] shadow-[0_5px_15px_rgba(17,24,39,0.12)]"
                      : "border-[#E8ECF2] bg-white hover:border-[#CBD5E1]"
                  }
                `}
              >
                <span
                  className={`text-[8px] font-medium sm:text-[9px] ${
                    active
                      ? "text-white/60"
                      : "text-[#9AA3B1]"
                  }`}
                >
                  {new Intl.DateTimeFormat("ar-EG", {
                    weekday: "short",
                  }).format(day.date)}
                </span>

                <span
                  className={`mt-1 text-base font-bold sm:text-lg ${
                    active
                      ? "text-white"
                      : "text-[#111827]"
                  }`}
                >
                  {day.date.getDate()}
                </span>

                <span
                  className={`mt-1 text-[8px] ${
                    active
                      ? "text-white/60"
                      : "text-[#9AA3B1]"
                  }`}
                >
                  {day.count} جلسة
                </span>

                {active && (
                  <span className="absolute bottom-1.5 h-1 w-1 rounded-full bg-white" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ==========================================
          CONTENT
      ========================================== */}

      <div className="px-4 py-5 sm:px-5 md:px-6">
        {/* Section Header */}
        <div className="flex flex-col gap-2 mb-5 sm:flex-row sm:items-center sm:justify-between">
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
              {formatSelectedDate(selectedDate)}
            </p>
          </div>

        
        </div>

        {/* ==========================================
            SESSIONS
        ========================================== */}

    {selectedSessions.length === 0 ? (
  <div className="flex min-h-[220px] flex-col items-center justify-center rounded-xl border border-dashed border-[#E3E8EF] bg-[#FAFBFC] px-4 text-center">
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EEF5FF]">
      <CalendarDays
        size={21}
        className="text-[#3E67A5]"
      />
    </div>

    <h4 className="mt-3 text-[12px] font-bold text-[#0B1C30]">
      لا توجد جلسات في هذا اليوم
    </h4>

    <p className="mt-1 max-w-xs text-[10px] leading-5 text-[#8993A5]">
      لا توجد جلسات مسجلة في الأجندة لهذا التاريخ.
    </p>
  </div>
) : (
  <div className="max-h-[520px] overflow-y-auto pr-1">
    <div className="space-y-3">
      {selectedSessions.map((session, index) => {
        const statusStyle = getStatus(session.status);

        const caseData = getCaseData(session);

        const formattedTime = formatTime(
          session.sessionTime
        );

        return (
          <div
            key={session._id || index}
            className="relative flex gap-3"
          >
            {/* Time */}
            <div className="hidden w-[58px] shrink-0 pt-4 text-left sm:block">
              <div className="text-[11px] font-bold text-[#111827]">
                {formattedTime.time}
              </div>

              <div className="mt-0.5 text-[9px] text-[#9AA3B1]">
                {formattedTime.period}
              </div>
            </div>

            {/* Timeline */}
            <div className="justify-center hidden w-4 shrink-0 sm:flex">
              {index !== selectedSessions.length - 1 && (
                <div className="absolute right-[65px] top-9 h-[calc(100%+12px)] w-px bg-[#E8ECF2]" />
              )}

              <div className="relative z-10 flex items-center justify-center w-4 h-4 mt-5 bg-white rounded-full ring-4 ring-white">
                <span
                  className={`h-2 w-2 rounded-full ${statusStyle.dot}`}
                />
              </div>
            </div>

            {/* Card */}
            <div className="min-w-0 flex-1 rounded-xl border border-[#E8ECF2] bg-white p-3.5 transition-all duration-200 hover:border-[#D3DBE7] hover:shadow-[0_5px_20px_rgba(15,23,42,0.05)] sm:p-4">
              {/* Top */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="max-w-full truncate text-[11px] font-bold text-[#0B1C30] sm:text-[12px]">
                      {caseData.title}
                    </h4>

                    <span className="rounded-md bg-[#F4F6F9] px-2 py-1 text-[8px] font-bold text-[#687282]">
                      {caseData.number}
                    </span>

                    <span
                      className={`rounded-full px-2 py-1 text-[8px] font-bold ${statusStyle.badge}`}
                    >
                      <span className="ml-1 inline-block h-1.5 w-1.5 rounded-full bg-current" />
                      {statusStyle.label}
                    </span>
                  </div>

                  {/* Mobile Time */}
                  <div className="mt-2 flex items-center gap-1.5 text-[9px] text-[#8993A5] sm:hidden">
                    <Clock3 size={11} />

                    <span>
                      {formattedTime.time}{" "}
                      {formattedTime.period}
                    </span>
                  </div>

                  {/* Meta */}
                  <div className="flex flex-wrap items-center mt-3 gap-x-4 gap-y-2">
                    {/* Lawyer */}
                    <div className="flex min-w-0 items-center gap-1.5">
                      <UserRound
                        size={12}
                        className="shrink-0 text-[#9AA3B1]"
                      />

                      <span className="max-w-[180px] truncate text-[9px] text-[#687282]">
                        {caseData.lawyer}
                      </span>
                    </div>

                    {/* Court */}
                    <div className="flex min-w-0 items-center gap-1.5">
                      <MapPin
                        size={12}
                        className="shrink-0 text-[#9AA3B1]"
                      />

                      <span className="max-w-[180px] truncate text-[9px] text-[#687282]">
                        {caseData.court}
                      </span>
                    </div>

                    {/* Type */}
                    <div className="flex items-center gap-1.5">
                      <Gavel
                        size={12}
                        className="shrink-0 text-[#9AA3B1]"
                      />

                      <span className="text-[9px] text-[#687282]">
                        {caseData.type}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[#9AA3B1] transition hover:bg-[#F5F7FA] hover:text-[#111827]"
                >
                  <MoreHorizontal size={16} />
                </button>
              </div>

              {/* Bottom */}
              <div className="mt-4 flex flex-col gap-3 border-t border-[#F0F2F5] pt-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="flex items-center gap-1.5 rounded-lg bg-[#F8F9FB] px-2.5 py-1.5 text-[9px] text-[#687282]">
                    <Clock3 size={11} />

                    {formattedTime.time}{" "}
                    {formattedTime.period}
                  </span>

                  {session.nextSessionDate && (
                    <span className="rounded-lg bg-[#F8F9FB] px-2.5 py-1.5 text-[9px] text-[#687282]">
                      الجلسة القادمة:{" "}
                      {new Intl.DateTimeFormat("ar-EG").format(
                        new Date(session.nextSessionDate)
                      )}
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSelectSession(session);
                    setOpenDetails(true);
                  }}
                  className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#111827] px-4 py-2 text-[9px] font-bold text-white transition hover:bg-[#1D2738] sm:w-auto"
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
  </div>
)}
        {/* ==========================================
            FOOTER
        ========================================== */}

        <div className="mt-4 flex flex-col gap-2 rounded-xl bg-[#FAFBFC] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <CircleDot
              size={12}
              className={
                runningSession
                  ? "text-[#3D9561]"
                  : "text-[#8993A5]"
              }
            />

            <span className="text-[9px] text-[#687282]">
              {runningSession
                ? "توجد جلسة جاري الحضور فيها حالياً"
                : "لا توجد جلسة جارية حالياً"}
            </span>
          </div>

          <span className="text-[9px] font-bold text-[#8993A5]">
            {sessions.length} جلسة مسجلة
          </span>
        </div>
      </div>
    </section>
  );
};

export default CalendarAndTodaySessions;