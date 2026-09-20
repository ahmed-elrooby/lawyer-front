"use client";

import React, { useContext, useMemo } from "react";
import { useRouter } from "next/navigation";
import { OwnerContext } from "../../../../../Providers/LawyerOwner/OwnerProvider.js";

const UpcomingSessions = () => {
  const { sessions = [], cases = [], lawyers = [] } = useContext(OwnerContext);

  const router = useRouter();

  const upcomingSessions = useMemo(() => {
    if (!Array.isArray(sessions)) return [];

    const now = new Date();

    return sessions
      .filter((session) => {
        if (!session?.sessionDate) return false;
        if (session?.status === "cancelled") return false;

        const sessionDate = new Date(session.sessionDate);

        if (session?.sessionTime) {
          const [hours, minutes] = session.sessionTime
            .split(":")
            .map(Number);

          sessionDate.setHours(hours || 0, minutes || 0, 0, 0);
        }

        return sessionDate >= now;
      })
      .sort((a, b) => {
        const dateA = new Date(a.sessionDate);
        const dateB = new Date(b.sessionDate);

        if (a.sessionTime) {
          const [hours, minutes] = a.sessionTime.split(":").map(Number);
          dateA.setHours(hours || 0, minutes || 0, 0, 0);
        }

        if (b.sessionTime) {
          const [hours, minutes] = b.sessionTime.split(":").map(Number);
          dateB.setHours(hours || 0, minutes || 0, 0, 0);
        }

        return dateA - dateB;
      })
      .slice(0, 3);
  }, [sessions]);

  const getCase = (session) => {
    const caseId =
      session?.caseId?._id ||
      session?.caseId ||
      session?.case?._id ||
      session?.case;

    return cases.find(
      (item) => String(item?._id) === String(caseId)
    );
  };

  const getLawyer = (session, caseData) => {
    const lawyerId =
      session?.lawyerId?._id ||
      session?.lawyerId ||
      session?.lawyer?._id ||
      session?.lawyer;

    if (lawyerId) {
      return lawyers.find(
        (item) => String(item?._id) === String(lawyerId)
      );
    }

    const caseLawyer = caseData?.lawyers?.[0];

    if (caseLawyer && typeof caseLawyer === "object") {
      return caseLawyer;
    }

    if (caseLawyer) {
      return lawyers.find(
        (item) => String(item?._id) === String(caseLawyer)
      );
    }

    return null;
  };

  const getDateLabel = (date) => {
    const sessionDate = new Date(date);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const targetDate = new Date(sessionDate);
    targetDate.setHours(0, 0, 0, 0);

    if (targetDate.getTime() === today.getTime()) {
      return "اليوم";
    }

    if (targetDate.getTime() === tomorrow.getTime()) {
      return "غدًا";
    }

    return new Intl.DateTimeFormat("ar-EG", {
      day: "numeric",
      month: "short",
    }).format(sessionDate);
  };

  const getTimeStyle = (index) => {
    const styles = [
      "bg-red-100 text-red-600",
      "bg-blue-100 text-blue-600",
      "bg-amber-100 text-amber-700",
    ];

    return styles[index] || "bg-slate-100 text-slate-600";
  };

  const formatTime = (time) => {
    if (!time) return "--:--";

    const [hours, minutes] = time.split(":").map(Number);

    const date = new Date();
    date.setHours(hours || 0, minutes || 0, 0, 0);

    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(date);
  };

  const totalSessions = Array.isArray(sessions) ? sessions.length : 0;

  return (
    <div className="p-4 bg-white rounded-2xl shadow-soft fade-border">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-xs font-extrabold text-slate-900">
            الجلسات القضائية القادمة
          </h3>

          <p className="mt-1 text-[8px] text-slate-400">
            أقرب الجلسات المجدولة داخل المكتب
          </p>
        </div>

        <span className="rounded-full bg-amber-50 px-2 py-1 text-[7px] text-amber-600">
          هذا الأسبوع
        </span>
      </div>

      {/* Sessions */}
      <div className="space-y-2">
        {upcomingSessions.length > 0 ? (
          upcomingSessions.map((session, index) => {
            const caseData = getCase(session);
            const lawyer = getLawyer(session, caseData);

            const caseNumber =
              caseData?.caseNumber ||
              session?.caseNumber ||
              "---";

            const court =
              caseData?.court ||
              session?.court ||
              "غير محددة";

            const lawyerName =
              lawyer?.name ||
              session?.lawyerName ||
              "غير محدد";

            const lawyerTitle =
              lawyer?.gender === "female"
                ? "المحامية"
                : "المحامي";

            return (
              <div
                key={session?._id || `${caseNumber}-${index}`}
                className="relative p-3 pr-10 rounded-xl bg-slate-50"
              >
                {/* Time */}
                <span
                  className={`absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full text-[7px] ${getTimeStyle(
                    index
                  )}`}
                >
                  {formatTime(session?.sessionTime)}
                </span>

                {/* Case */}
                <div className="text-[8px] font-bold text-slate-800">
                  قضية {caseNumber} — {court}
                </div>

                {/* Lawyer + Date */}
                <div className="mt-1 text-[7px] text-slate-400">
                  {lawyerTitle}: {lawyerName} •{" "}
                  {getDateLabel(session?.sessionDate)}
                </div>

                {/* Button */}
                <button
                  type="button"
                  onClick={() =>
                    router.push(
                      `/Lawyer_Owner/Sessions`
                    )
                  }
                  className="mt-2 rounded-md bg-white px-2 py-1 text-[7px] text-slate-600"
                >
                  مراجعة الجلسة
                </button>
              </div>
            );
          })
        ) : (
          <div className="rounded-xl bg-slate-50 p-5 text-center text-[8px] text-slate-400">
            لا توجد جلسات قادمة
          </div>
        )}
      </div>

      {/* All Sessions */}
      <button
        type="button"
        onClick={() => router.push("/Lawyer_Owner/Sessions")}
        className="mt-3 text-[8px] font-bold text-slate-600"
      >
        عرض جدول كل الجلسات ({totalSessions} جلسة) ←
      </button>
    </div>
  );
};

export default UpcomingSessions;