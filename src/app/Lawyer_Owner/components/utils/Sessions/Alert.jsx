"use client";

import React, { useContext, useMemo } from "react";
import {
  BellRing,
  Clock3,
  AlertTriangle,
  FileWarning,
  CalendarClock,
  ChevronLeft,
  MapPin,
  UserRound,
  CheckCircle2,
} from "lucide-react";
import { OwnerContext } from "../../../../../Providers/LawyerOwner/OwnerProvider.js";

const UpcomingImportantAlerts = () => {
  const { notifications = [], sessions = [] } =
    useContext(OwnerContext);

  // =========================
  // Helpers
  // =========================

  const formatTime = (time) => {
    if (!time) {
      return {
        time: "--:--",
        period: "",
      };
    }

    const [hours, minutes] = time.split(":");
    const hour = Number(hours);

    if (Number.isNaN(hour)) {
      return {
        time,
        period: "",
      };
    }

    const formattedHour = hour % 12 || 12;
    const period = hour >= 12 ? "م" : "ص";

    return {
      time: `${String(formattedHour).padStart(2, "0")}:${minutes}`,
      period,
    };
  };

  const getCaseData = (session) => {
    const caseData =
      session?.caseId && typeof session.caseId === "object"
        ? session.caseId
        : null;

    const lawyers = Array.isArray(caseData?.lawyers)
      ? caseData.lawyers
      : [];

    return {
      number:
        caseData?.caseNumber ||
        session?.caseNumber ||
        "بدون رقم",

      court:
        caseData?.court ||
        "لم يتم تحديد المحكمة",

      lawyer:
        lawyers.length > 0
          ? lawyers.map((lawyer) => lawyer?.name).filter(Boolean).join("، ")
          : "لم يتم تحديد المحامي",
    };
  };

  const getNotificationTime = (createdAt) => {
    if (!createdAt) {
      return "منذ قليل";
    }

    const createdDate = new Date(createdAt);

    if (Number.isNaN(createdDate.getTime())) {
      return "منذ قليل";
    }

    const now = new Date();
    const difference = Math.floor(
      (now.getTime() - createdDate.getTime()) / 60000
    );

    if (difference < 1) {
      return "منذ قليل";
    }

    if (difference < 60) {
      return `منذ ${difference} دقيقة`;
    }

    const hours = Math.floor(difference / 60);

    if (hours < 24) {
      return `منذ ${hours} ساعة`;
    }

    const days = Math.floor(hours / 24);

    return `منذ ${days} يوم`;
  };

  // =========================
  // Upcoming Sessions
  // =========================

  const upcomingSessions = useMemo(() => {
    const now = new Date();

    return [...sessions]
      .filter((session) => {
        if (session?.status !== "scheduled") {
          return false;
        }

        if (!session?.sessionDate || !session?.sessionTime) {
          return false;
        }

        const sessionDate = new Date(session.sessionDate);

        if (Number.isNaN(sessionDate.getTime())) {
          return false;
        }

        const [hours, minutes] = session.sessionTime
          .split(":")
          .map(Number);

        sessionDate.setHours(hours || 0);
        sessionDate.setMinutes(minutes || 0);
        sessionDate.setSeconds(0);
        sessionDate.setMilliseconds(0);

        return sessionDate >= now;
      })
      .sort((a, b) => {
        const getDate = (session) => {
          const date = new Date(session.sessionDate);

          const [hours, minutes] = session.sessionTime
            .split(":")
            .map(Number);

          date.setHours(hours || 0);
          date.setMinutes(minutes || 0);
          date.setSeconds(0);
          date.setMilliseconds(0);

          return date.getTime();
        };

        return getDate(a) - getDate(b);
      })
      .slice(0, 3);
  }, [sessions]);

  // =========================
  // Notifications
  // =========================

  const sessionNotifications = useMemo(() => {
    return notifications
      .filter(
        (notification) =>
          notification?.type === "upcoming_session"
      )
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
      )
      .slice(0, 4);
  }, [notifications]);

  // =========================
  // Notification Styles
  // =========================

  const getNotificationStyle = (notification) => {
    if (
      notification?.reminderType === "1_hour_before"
    ) {
      return {
        type: "urgent",
        icon: <AlertTriangle size={16} />,
        title:
          notification?.title || "جلسة تبدأ قريباً",
      
      };
    }

    if (
      notification?.reminderType === "1_day_before"
    ) {
      return {
        type: "warning",
        icon: <CalendarClock size={16} />,
        title:
          notification?.title || "جلسة غدًا",
        
      };
    }

    return {
      type: "info",
      icon: <BellRing size={16} />,
      title:
        notification?.title || "تنبيه جديد",
   
    };
  };

  const alertStyles = {
    urgent: {
      wrapper: "border-[#F1D5D5] bg-[#FFF9F9]",
      icon: "bg-[#FCE8E8] text-[#B44E4E]",
      title: "text-[#9D4545]",
    },

    warning: {
      wrapper: "border-[#F0E2B9] bg-[#FFFCF4]",
      icon: "bg-[#FFF2CC] text-[#9A7800]",
      title: "text-[#806500]",
    },

    info: {
      wrapper: "border-[#D8E1F4] bg-[#F8FAFF]",
      icon: "bg-[#EAF0FF] text-[#4A67A8]",
      title: "text-[#405B96]",
    },

    success: {
      wrapper: "border-[#D5EBDD] bg-[#F8FCF9]",
      icon: "bg-[#E6F5EB] text-[#258055]",
      title: "text-[#24724D]",
    },
  };

  const priorityStyles = {
    urgent: "bg-[#FCE8E8] text-[#B44E4E]",
    warning: "bg-[#FFF2CC] text-[#8D7100]",
    info: "bg-[#EEF2F8] text-[#5E6B80]",
  };

  // =========================
  // Summary
  // =========================

  const urgentCount = sessionNotifications.filter(
    (notification) =>
      notification?.reminderType === "1_hour_before"
  ).length;

  const warningCount = sessionNotifications.filter(
    (notification) =>
      notification?.reminderType === "1_day_before"
  ).length;

  const infoCount = sessionNotifications.filter(
    (notification) =>
      notification?.reminderType !== "1_hour_before" &&
      notification?.reminderType !== "1_day_before"
  ).length;

  return (
    <section dir="rtl" className="w-full mt-6">
      <div className="overflow-hidden rounded-2xl border border-[#E7EAF0] bg-white">

        {/* Header */}
        <div className="border-b border-[#EEF0F4] px-5 py-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            <div className="flex items-center gap-3">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF4D9] text-[#947300]">
                <BellRing size={19} />

                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#B44E4E] px-1 text-[8px] font-bold text-white">
                  {sessionNotifications.length}
                </span>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-[17px] font-bold text-[#0B1C30]">
                    التنبيهات والجلسات القادمة
                  </h2>

                  <span className="rounded-full bg-[#FFF2D3] px-2 py-1 text-[9px] font-bold text-[#8A6D00]">
                    {sessionNotifications.length} تنبيهات
                  </span>
                </div>

                <p className="mt-1 text-[11px] text-[#7A818C]">
                  أهم التنبيهات والجلسات التي تحتاج إلى انتباه ومتابعة
                </p>
              </div>
            </div>

            

          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-5 p-5 xl:grid-cols-[1.1fr_1.9fr]">

          {/* Upcoming Sessions */}
          <div className="rounded-2xl border border-[#EEF0F4] bg-[#FCFDFE] p-4">

            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-[13px] font-bold text-[#273243]">
                  الجلسات القادمة
                </h3>

                <p className="mt-1 text-[9px] text-[#969DA7]">
                  أقرب الجلسات المجدولة اليوم
                </p>
              </div>

              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EEF3FF] text-[#4A67A8]">
                <CalendarClock size={15} />
              </div>
            </div>

            <div className="space-y-2.5">
              {upcomingSessions.length === 0 ? (
                <div className="flex min-h-[180px] flex-col items-center justify-center rounded-xl border border-dashed border-[#E3E8EF] bg-white px-4 text-center">
                  <CalendarClock
                    size={24}
                    className="text-[#A3ACB9]"
                  />

                  <p className="mt-2 text-[10px] font-bold text-[#687282]">
                    لا توجد جلسات قادمة
                  </p>

                  <p className="mt-1 text-[9px] text-[#9AA3B1]">
                    لا توجد جلسات مجدولة حاليًا.
                  </p>
                </div>
              ) : (
                upcomingSessions.map((session) => {
                  const caseData = getCaseData(session);
                  const formattedTime = formatTime(
                    session.sessionTime
                  );

                  const notificationForSession =
                    sessionNotifications.find(
                      (notification) =>
                        notification?.sessionId?._id ===
                        session?._id
                    );

                  let priority = "info";

                  if (
                    notificationForSession?.reminderType ===
                    "1_hour_before"
                  ) {
                    priority = "urgent";
                  } else if (
                    notificationForSession?.reminderType ===
                    "1_day_before"
                  ) {
                    priority = "warning";
                  }

                  return (
                    <div
                      key={session._id}
                      className="group rounded-xl border border-[#E9ECF1] bg-white p-3.5 transition hover:border-[#D4DAE5] hover:shadow-sm"
                    >
                      <div className="flex items-start gap-3">

                        {/* Time */}
                        <div className="flex w-[58px] shrink-0 flex-col items-center rounded-lg bg-[#F5F7FA] px-2 py-2">
                          <Clock3
                            size={13}
                            className="text-[#667286]"
                          />

                          <span className="mt-1 text-[10px] font-bold text-[#3E4858]">
                            {formattedTime.time}
                          </span>

                          <span className="text-[8px] text-[#8D949E]">
                            {formattedTime.period}
                          </span>
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">

                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <p className="truncate text-[11px] font-bold text-[#293342]">
                                قضية رقم {caseData.number}
                              </p>

                              <p className="mt-1 text-[9px] text-[#9198A3]">
                                {caseData.court}
                              </p>
                            </div>

                            <span
                              className={`shrink-0 rounded-full px-2 py-1 text-[8px] font-bold ${priorityStyles[priority]}`}
                            >
                              {priority === "urgent"
                                ? "عاجل"
                                : priority === "warning"
                                ? "قريب"
                                : "عادي"}
                            </span>
                          </div>

                          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5">

                            <span className="flex items-center gap-1 text-[9px] text-[#737C89]">
                              <UserRound size={11} />
                              {caseData.lawyer}
                            </span>

                            <span className="flex items-center gap-1 text-[9px] text-[#737C89]">
                              <MapPin size={11} />
                              {caseData.court}
                            </span>

                          </div>

                          <div className="mt-2.5 flex items-center justify-between">
                            <span className="text-[9px] font-semibold text-[#8A919C]">
                              {formattedTime.time}{" "}
                              {formattedTime.period}
                            </span>

                           
                          </div>

                        </div>

                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Alerts */}
          <div className="rounded-2xl border border-[#EEF0F4] bg-[#FCFDFE] p-4">

            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-[13px] font-bold text-[#273243]">
                  التنبيهات المهمة
                </h3>

                <p className="mt-1 text-[9px] text-[#969DA7]">
                  آخر التنبيهات التي تحتاج إلى متابعة
                </p>
              </div>

              <span className="text-[9px] text-[#9298A2]">
                {sessionNotifications.length > 0
                  ? "آخر تحديث الآن"
                  : "لا توجد تنبيهات"}
              </span>
            </div>

            <div className="space-y-2.5">
              {sessionNotifications.length === 0 ? (
                <div className="flex min-h-[180px] flex-col items-center justify-center rounded-xl border border-dashed border-[#E3E8EF] bg-white px-4 text-center">
                  <CheckCircle2
                    size={24}
                    className="text-[#258055]"
                  />

                  <p className="mt-2 text-[10px] font-bold text-[#394352]">
                    لا توجد تنبيهات
                  </p>

                  <p className="mt-1 text-[9px] text-[#8D949E]">
                    لا توجد تنبيهات جلسات تحتاج إلى متابعة.
                  </p>
                </div>
              ) : (
                sessionNotifications.map((notification) => {
                  const notificationStyle =
                    getNotificationStyle(notification);

                  const style =
                    alertStyles[notificationStyle.type];

                  return (
                    <div
                      key={notification._id}
                      className={`group flex items-start gap-3 rounded-xl border p-3.5 transition hover:shadow-sm ${style.wrapper}`}
                    >

                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${style.icon}`}
                      >
                        {notificationStyle.icon}
                      </div>

                      <div className="flex-1 min-w-0">

                        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                          <p
                            className={`text-[11px] font-bold ${style.title}`}
                          >
                            {notificationStyle.title}
                          </p>

                          <span className="text-[8px] text-[#9A9FA7]">
                            {getNotificationTime(
                              notification.createdAt
                            )}
                          </span>
                        </div>

                        <p className="mt-1.5 max-w-2xl text-[9px] leading-5 text-[#777F8B]">
                          {notification.message}
                        </p>

                       
                      </div>

                    </div>
                  );
                })
              )}
            </div>
          </div>

        </div>

        {/* Bottom Summary */}
        <div className="border-t border-[#EEF0F4] bg-[#FAFBFC] px-5 py-4">

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E9F7EF] text-[#258055]">
                <CheckCircle2 size={14} />
              </div>

              <div>
                <p className="text-[10px] font-bold text-[#394352]">
                  حالة المتابعة
                </p>

                <p className="mt-0.5 text-[9px] text-[#8D949E]">
                  {urgentCount > 0
                    ? `لديك ${urgentCount} تنبيه ${
                        urgentCount === 1
                          ? "عاجل"
                          : "عاجلة"
                      } تحتاج إلى متابعة`
                    : "لا توجد تنبيهات حرجة غير معالجة"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-[9px] text-[#7D858F]">

              <span>
                <strong className="text-[#B44E4E]">
                  {urgentCount}
                </strong>{" "}
                عاجل
              </span>

              <span>
                <strong className="text-[#967700]">
                  {warningCount}
                </strong>{" "}
                يحتاج مراجعة
              </span>

              <span>
                <strong className="text-[#4A67A8]">
                  {infoCount}
                </strong>{" "}
                معلومات
              </span>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default UpcomingImportantAlerts;