"use client";

import React, { useContext, useMemo } from "react";
import { useRouter } from "next/navigation";
import { GrHome } from "react-icons/gr";
import { MdNotificationImportant } from "react-icons/md";
import { WiTime8 } from "react-icons/wi";
import { OwnerContext } from "../../../../../Providers/LawyerOwner/OwnerProvider.js";

const Alert = () => {
  const { sessions = [], cases = [] } = useContext(OwnerContext);

  const router = useRouter();

  const upcomingAlerts = useMemo(() => {
    if (!Array.isArray(sessions)) return [];

    const now = new Date();

    const endOfPeriod = new Date(now);
    endOfPeriod.setHours(
      now.getHours() + 24,
      now.getMinutes(),
      0,
      0
    );

    const getSessionDate = (session) => {
      if (!session?.sessionDate) return null;

      const date = new Date(session.sessionDate);

      if (session?.sessionTime) {
        const [hours, minutes] = session.sessionTime
          .split(":")
          .map(Number);

        date.setHours(
          hours || 0,
          minutes || 0,
          0,
          0
        );
      }

      return date;
    };

    const getCase = (session) => {
      const caseId =
        session?.caseId?._id ||
        session?.caseId ||
        session?.case?._id ||
        session?.case;

      return cases.find(
        (item) =>
          String(item?._id) === String(caseId)
      );
    };

    return sessions
      .map((session) => {
        const sessionDate = getSessionDate(session);

        if (!sessionDate) return null;

        const caseData = getCase(session);

        return {
          ...session,
          sessionDateObject: sessionDate,
          caseData,
        };
      })
      .filter((session) => {
        if (!session) return false;
        if (session?.status === "cancelled") return false;

        return (
          session.sessionDateObject >= now &&
          session.sessionDateObject <= endOfPeriod
        );
      })
      .sort(
        (a, b) =>
          a.sessionDateObject - b.sessionDateObject
      )
      .slice(0, 4);
  }, [sessions, cases]);

  const formatTime = (session) => {
    if (!session?.sessionTime) return "--:--";

    const [hours, minutes] = session.sessionTime
      .split(":")
      .map(Number);

    const date = new Date();

    date.setHours(
      hours || 0,
      minutes || 0,
      0,
      0
    );

    return new Intl.DateTimeFormat("ar-EG", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(date);
  };

  const getCaseTitle = (session) => {
    const caseData = session?.caseData;

    if (caseData?.caseNumber) {
      return `قضية ${caseData.caseNumber}`;
    }

    if (session?.caseNumber) {
      return `قضية ${session.caseNumber}`;
    }

    return "جلسة قضائية";
  };

  const getCourt = (session) => {
    return (
      session?.caseData?.court ||
      session?.court ||
      "المحكمة غير محددة"
    );
  };

  const getSessionLabel = (session) => {
    const diff =
      (session.sessionDateObject.getTime() -
        Date.now()) /
      (1000 * 60);

    if (diff <= 60) {
      return "جلسة تبدأ قريبًا";
    }

    return "جلسة قادمة";
  };

  const getSessionColor = (session) => {
    const diff =
      (session.sessionDateObject.getTime() -
        Date.now()) /
      (1000 * 60);

    if (diff <= 60) {
      return {
        dot: "bg-[#BA1A1A]",
        badge: "bg-[#BA1A1A]",
        time: "text-[#BA1A1A]",
      };
    }

    return {
      dot: "bg-amber-500",
      badge: "bg-amber-500",
      time: "text-amber-600",
    };
  };

  return (
    <section className="my-6 rounded-xl bg-[#FFFFFF] p-2 md:p-6">
      {/* Header */}
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-5 w-5 items-center justify-center rounded-xl bg-[#FFDAD6] md:h-8 md:w-8">
            <MdNotificationImportant className="text-sm text-[#93000A] md:text-lg" />
          </div>

          <div>
            <h2 className="text-sm font-bold text-[#0B1C30] md:text-[16px]">
              يحتاج إلى انتباهك
            </h2>

            <p className="text-[10px] text-[#45464D] md:text-[12px]">
              بنود قانونية وإجرائية تتطلب قراراً تنفيذياً عاجلاً
            </p>
          </div>
        </div>

        <div className="flex items-center gap-0.5 rounded-full bg-[#FFDAD6] px-1 py-0.5 text-[#93000A] md:gap-1.5 md:px-3 md:py-1">
          <span className="h-2 w-2 rounded-full bg-[#93000A]" />

          <h3 className="text-[10px] font-semibold md:text-lg md:font-bold">
            {upcomingAlerts.length} عناصر تتطلب إجراء
          </h3>
        </div>
      </div>

      {/* Alerts */}
      <div className="space-y-[10px]">
        {upcomingAlerts.length > 0 ? (
          upcomingAlerts.map((session) => {
            const colors = getSessionColor(session);

            return (
              <div
                key={session?._id}
                className="flex items-center justify-between rounded-xl bg-[#EFF4FF] p-2 md:p-4"
              >
                <div className="flex min-w-0 items-center gap-1 md:gap-3">
                  <span
                    className={`h-2.5 w-2.5 shrink-0 rounded-full ${colors.dot}`}
                  />

                  <div
                    className={`rounded-md px-1 py-0.5 text-[11px] font-bold text-white md:px-2 ${colors.badge}`}
                  >
                    {getSessionLabel(session)}
                  </div>

                  <h4 className="truncate text-sm font-bold text-[#0B1C30]">
                    {getCaseTitle(session)}
                  </h4>

                  <span className="hidden h-6 w-[2px] bg-[#C6C6CD] md:block" />

                  <div className="hidden items-center gap-1 text-[#45464D] md:flex">
                    <GrHome size={13} />

                    <span className="text-[12px]">
                      {getCourt(session)}
                    </span>
                  </div>

                  <span className="hidden h-6 w-[2px] bg-[#C6C6CD] md:block" />

                  <div
                    className={`flex items-center gap-0.5 text-[10px] md:gap-1 md:text-[12px] ${colors.time}`}
                  >
                    <WiTime8 />

                    <span>
                      {formatTime(session)}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    router.push(
                      "/Lawyer_Owner/Sessions"
                    )
                  }
                  className="shrink-0 rounded-lg bg-[#213145] px-0.5 py-1.5 text-xs font-bold text-white md:px-3.5"
                >
                  عرض القضية
                </button>
              </div>
            );
          })
        ) : (
          <div className="rounded-xl bg-[#EFF4FF] p-5 text-center text-[11px] font-medium text-[#45464D]">
            لا توجد جلسات قريبة تتطلب الانتباه حاليًا
          </div>
        )}
      </div>
    </section>
  );
};

export default Alert;