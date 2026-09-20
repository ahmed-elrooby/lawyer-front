"use client";

import Image from "next/image.js";
import React, { useContext, useMemo } from "react";
import { PiDotsThreeCircle } from "react-icons/pi";
import logo from "../../../../../Images/قضاء.jpg";
import { OwnerContext } from "../../../../../Providers/LawyerOwner/OwnerProvider.js";

const Team = () => {
  const {
    lawyers = [],
    cases = [],
    sessions = [],
  } = useContext(OwnerContext);

  const teamData = useMemo(() => {
    const now = new Date();

    return lawyers.slice(0, 4).map((lawyer) => {
      const lawyerId = String(lawyer?._id);

      // القضايا النشطة الخاصة بالمحامي
      const activeCases = cases.filter((item) => {
        if (item?.status !== "active") return false;

        const caseLawyers = Array.isArray(item?.lawyers)
          ? item.lawyers
          : [];

        return caseLawyers.some((caseLawyer) => {
          const caseLawyerId =
            typeof caseLawyer === "object"
              ? caseLawyer?._id
              : caseLawyer;

          return String(caseLawyerId) === lawyerId;
        });
      });

      // أقرب جلسة للمحامي
      const lawyerSessions = sessions
        .filter((session) => {
          const caseId =
            typeof session?.caseId === "object"
              ? session?.caseId?._id
              : session?.caseId;

          const relatedCase = cases.find(
            (item) => String(item?._id) === String(caseId)
          );

          if (!relatedCase) return false;

          const caseLawyers = Array.isArray(relatedCase?.lawyers)
            ? relatedCase.lawyers
            : [];

          return caseLawyers.some((caseLawyer) => {
            const caseLawyerId =
              typeof caseLawyer === "object"
                ? caseLawyer?._id
                : caseLawyer;

            return String(caseLawyerId) === lawyerId;
          });
        })
        .map((session) => {
          const dateTime = new Date(
            `${session?.sessionDate || ""}T${
              session?.sessionTime || "00:00"
            }`
          );

          return {
            ...session,
            dateTime,
          };
        })
        .filter(
          (session) =>
            !Number.isNaN(session.dateTime.getTime()) &&
            session.dateTime >= now
        )
        .sort(
          (a, b) =>
            a.dateTime.getTime() - b.dateTime.getTime()
        );

      const nextSession = lawyerSessions[0];

      let sessionText = "لا توجد جلسات قادمة";

      if (nextSession) {
        const time = new Date(nextSession.dateTime).toLocaleTimeString(
          "ar-EG",
          {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          }
        );

        sessionText = `جلسة ${time}`;
      }

      return {
        ...lawyer,
        activeCases: activeCases.length,
        nextSession: sessionText,
      };
    });
  }, [lawyers, cases, sessions]);

  return (
    <section className="p-6 bg-white rounded-xl">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex items-center h-8 w-8 justify-center rounded-lg bg-[#E5EEFF]">
              <PiDotsThreeCircle />
            </div>

            <div>
              <h3 className="font-bold text-[#0B1C30]">
                حالة فريق المحامين
              </h3>

              <p className="text-[12px] text-[#45464D]">
                النشاط اللحظي وتوزيع القضايا
              </p>
            </div>
          </div>
        </div>

        <button className="px-2 py-0.5 text-xs bg-[#D5E0F8] text-[#586377] rounded-full">
          {lawyers.length} مستشارين
        </button>
      </div>

      <div className="space-y-2.5">
        {teamData.map((lawyer) => {
          const image =
            lawyer?.profileImage?.url || null;

          return (
            <div
              key={lawyer?._id}
              className="p-4 mt-4 flex justify-between items-center bg-[#EFF4FF] rounded-xl"
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  {image ? (
                    <img
                      src={image}
                      alt={lawyer?.name || "المحامي"}
                      className="object-cover w-10 h-10 rounded-full"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#D5E0F8] text-[#4868B4] text-sm font-bold">
                      {lawyer?.name?.charAt(0) || "م"}
                    </div>
                  )}

                  <span className="absolute w-3 h-3 rounded-full bg-[#D5E0F8] left-0 -bottom-0.5 border-2 border-white" />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-[#0B1C30] text-sm">
                      {lawyer?.name || "غير محدد"}
                    </h2>

                    <span className="bg-[#E5EEFF] text-[10px] px-2 rounded-full text-[#0B1C30]">
                      متصل
                    </span>
                  </div>

                  <p className="text-[#45464D] text-xs">
                    {lawyer?.nextSession}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <h2 className="text-sm font-bold text-[#0B1C30]">
                  {lawyer?.activeCases || 0}
                </h2>

                <p className="text-[#45464D] text-xs">
                  قضية نشطة
                </p>
              </div>
            </div>
          );
        })}

        {teamData.length === 0 && (
          <div className="py-8 text-center text-xs text-[#8A93A3]">
            لا يوجد محامون في الفريق حالياً
          </div>
        )}
      </div>
    </section>
  );
};

export default Team;