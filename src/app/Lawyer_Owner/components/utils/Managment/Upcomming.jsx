"use client";

import React, { useContext, useMemo } from "react";
import { useRouter } from "next/navigation";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { OwnerContext } from "../../../../../Providers/LawyerOwner/OwnerProvider.js";

const UpcomingSessions = () => {
  const router = useRouter();

  const { sessions = [], cases = [] } = useContext(OwnerContext);

  const getSessionCase = (session) => {
    // لو القضية populated داخل الـ session
    if (session?.caseId && typeof session.caseId === "object") {
      return session.caseId;
    }

    if (session?.case && typeof session.case === "object") {
      return session.case;
    }

    // لو caseId مجرد ID
    const caseId =
      typeof session?.caseId === "object"
        ? session.caseId?._id
        : session?.caseId;

    if (caseId) {
      return cases.find(
        (item) => String(item?._id) === String(caseId)
      );
    }

    return null;
  };

  const upcomingSessions = useMemo(() => {
    return [...sessions]
      .sort((a, b) => {
        const dateA = new Date(
          `${a?.sessionDate || ""}T${a?.sessionTime || "00:00"}`
        ).getTime();

        const dateB = new Date(
          `${b?.sessionDate || ""}T${b?.sessionTime || "00:00"}`
        ).getTime();

        if (Number.isNaN(dateA)) return 1;
        if (Number.isNaN(dateB)) return -1;

        return dateA - dateB;
      })
      .slice(0, 5)
      .map((session) => {
        const caseData = getSessionCase(session);

        // المحامي من القضية
        const lawyerData = Array.isArray(caseData?.lawyers)
          ? caseData.lawyers[0]
          : null;

        return {
          ...session,
          caseData,
          lawyerData,
        };
      });
  }, [sessions, cases]);

  const formatDate = (date) => {
    if (!date) return "-";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString("ar-EG", {
      day: "numeric",
      month: "long",
    });
  };

  const formatTime = (time) => {
    if (!time) return "-";

    const [hours, minutes] = String(time).split(":");

    if (hours === undefined || minutes === undefined) {
      return time;
    }

    const date = new Date();
    date.setHours(Number(hours), Number(minutes), 0, 0);

    return date.toLocaleTimeString("ar-EG", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getAvatar = (image, name) => {
    if (image) {
      return (
        <img
          src={image}
          alt={name || "المحامي"}
          className="w-10 h-10 rounded-full object-cover border border-[#E8EAF0]"
        />
      );
    }

    return (
      <div className="w-10 h-10 rounded-full bg-[#EAF0FF] text-[#4868B4] flex items-center justify-center text-sm font-bold border border-[#E8EAF0]">
        {name?.charAt(0) || "م"}
      </div>
    );
  };

  return (
    <div className="bg-white border border-[#E8EAF0] rounded-2xl p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#EAF0FF] text-[#4868B4] flex items-center justify-center">
            <MdOutlineCalendarMonth size={22} />
          </div>

          <div>
            <h3 className="text-sm font-bold text-[#0B1C30]">
              الجلسات القادمة
            </h3>

            <p className="text-[11px] text-[#8A93A3] mt-1">
              أقرب الجلسات المجدولة
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => router.push("/Lawyer_Owner/Sessions")}
          className="text-[11px] font-semibold text-[#4868B4] hover:text-[#315DAA] transition"
        >
          عرض الكل
        </button>
      </div>

      {/* Sessions */}
      <div className="space-y-3">
        {upcomingSessions.length > 0 ? (
          upcomingSessions.map((session) => {
            const lawyer = session.lawyerData;
            const caseData = session.caseData;

            return (
              <div
                key={session._id}
                className="flex items-center justify-between gap-4 p-3 rounded-xl bg-[#FAFBFC] border border-[#EEF0F3] hover:border-[#DCE3EF] transition"
              >
                {/* Lawyer */}
                <div className="flex items-center min-w-0 gap-3">
                  {getAvatar(
                    lawyer?.profileImage?.url,
                    lawyer?.name
                  )}

                  <div className="min-w-0">
                    <p className="text-xs font-bold text-[#45464D] truncate">
                      {lawyer?.name || "غير محدد"}
                    </p>

                    <p className="text-[10px] text-[#8A93A3] mt-1 truncate">
                      {caseData?.caseNumber
                        ? `قضية ${caseData.caseNumber}`
                        : "جلسة قضية"}
                    </p>
                  </div>
                </div>

                {/* Date */}
                <div className="flex-shrink-0 text-left">
                  <p className="text-xs font-semibold text-[#0B1C30]">
                    {formatDate(session.sessionDate)}
                  </p>

                  <p className="text-[10px] text-[#4868B4] mt-1 font-medium">
                    {formatTime(session.sessionTime)}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="py-8 text-center">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#F3F5F8] flex items-center justify-center text-[#8A93A3] mb-3">
              <MdOutlineCalendarMonth size={22} />
            </div>

            <p className="text-xs font-semibold text-[#586377]">
              لا توجد جلسات قادمة
            </p>

            <p className="text-[10px] text-[#9AA2B1] mt-1">
              لا توجد جلسات مجدولة حالياً
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingSessions;