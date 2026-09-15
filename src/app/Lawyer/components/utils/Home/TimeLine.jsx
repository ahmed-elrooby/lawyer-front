
"use client";

import React, { useContext } from "react";
import {
  FaHistory,
  FaBriefcase,
  FaCalendarAlt,
  FaFileAlt,
  FaStickyNote,
  FaUser,
  FaArrowLeft,
} from "react-icons/fa";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import { LawyerContext } from "../../../../../Providers/LawyerContext/lawyer.js";

const TimeLine = () => {
  const { getTimeline } = useContext(LawyerContext);


const {
  data: timeline = [],
  isLoading: timelineLoading,
} = useQuery({
  queryKey: ["timeline"],
  queryFn: () => getTimeline(),
  staleTime: 5 * 60 * 1000,
  gcTime: 30 * 60 * 1000,
  refetchOnWindowFocus: false,
  retry: 1,
});


  const getIcon = (type) => {
    if (type?.startsWith("case_")) {
      return {
        icon: FaBriefcase,
        iconBg: "bg-blue-100",
        iconColor: "text-blue-600",
      };
    }

    if (type?.startsWith("session_")) {
      return {
        icon: FaCalendarAlt,
        iconBg: "bg-amber-100",
        iconColor: "text-amber-600",
      };
    }

    if (type?.startsWith("attachment_")) {
      return {
        icon: FaFileAlt,
        iconBg: "bg-purple-100",
        iconColor: "text-purple-600",
      };
    }

    if (type?.startsWith("note_")) {
      return {
        icon: FaStickyNote,
        iconBg: "bg-emerald-100",
        iconColor: "text-emerald-600",
      };
    }

    return {
      icon: FaUser,
      iconBg: "bg-slate-100",
      iconColor: "text-slate-600",
    };
  };

  const formatTime = (date) => {
    if (!date) return "";

    const timelineDate = new Date(date);
    const now = new Date();

    const diffInSeconds = Math.floor(
      (now.getTime() - timelineDate.getTime()) / 1000
    );

    if (diffInSeconds < 60) {
      return "منذ لحظات";
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);

    if (diffInMinutes < 60) {
      return `منذ ${diffInMinutes} دقيقة`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);

    if (diffInHours < 24) {
      return `منذ ${diffInHours} ساعة`;
    }

    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInDays === 1) {
      return "أمس";
    }

    if (diffInDays < 7) {
      return `منذ ${diffInDays} أيام`;
    }

    return timelineDate.toLocaleDateString("ar-EG", {
      day: "numeric",
      month: "short",
    });
  };

  return (
    <div className="h-full overflow-hidden transition-all duration-300 border shadow-sm bg-slate-800 rounded-2xl border-slate-700 hover:shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-slate-700">
        <div>
          <h2 className="text-lg font-bold text-white">النشاط الأخير</h2>

          <p className="mt-1 text-xs text-slate-400">
            آخر العمليات والتحديثات
          </p>
        </div>

        <div className="flex items-center justify-center w-10 h-10 text-purple-600 bg-purple-100 rounded-xl">
          <FaHistory className="w-5 h-5" />
        </div>
      </div>

      {/* Timeline */}
      <div className="p-5">
        {timelineLoading ? (
          <div className="space-y-6 animate-pulse">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-slate-700" />

                <div className="flex-1 space-y-2">
                  <div className="w-2/3 h-4 rounded bg-slate-700" />
                  <div className="w-full h-3 rounded bg-slate-700" />
                </div>
              </div>
            ))}
          </div>
        ) : timeline.length > 0 ? (
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute top-2 bottom-2 right-[19px] w-px bg-slate-700" />

            <div className="space-y-6">
              {timeline.slice(0, 4).map((item) => {
                const {
                  icon: Icon,
                  iconBg,
                  iconColor,
                } = getIcon(item?.type);

                return (
                  <div
                    key={item?._id}
                    className="relative flex items-start gap-4"
                  >
                    {/* Icon */}
                    <div
                      className={`relative z-10 flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-xl ${iconBg} ${iconColor}`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 pt-0.5">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-sm font-semibold text-white truncate">
                          {item?.title || "نشاط جديد"}
                        </h3>

                        <span className="flex-shrink-0 text-[11px] text-slate-500">
                          {formatTime(item?.createdAt)}
                        </span>
                      </div>

                      <p className="mt-1 text-xs leading-5 text-slate-400 line-clamp-2">
                        {item?.description || "تم تنفيذ عملية جديدة"}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="flex items-center justify-center mb-3 rounded-full w-14 h-14 bg-slate-700">
              <FaHistory className="w-6 h-6 text-slate-400" />
            </div>

            <h3 className="text-sm font-semibold text-white">
              لا يوجد نشاط
            </h3>

            <p className="mt-1 text-xs text-slate-400">
              لا توجد عمليات أو تحديثات حديثة
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
     
    </div>
  );
};

export default TimeLine;
