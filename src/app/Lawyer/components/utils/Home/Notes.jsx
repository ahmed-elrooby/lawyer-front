
"use client";

import React, { useContext, useMemo } from "react";
import Link from "next/link";

import {
  FaStickyNote,
  FaBriefcase,
  FaUser,
  FaCalendarAlt,
  FaFileAlt,
  FaArrowLeft,
} from "react-icons/fa";

import { LawyerContext } from "../../../../../Providers/LawyerContext/lawyer.js";

const Notes = () => {
  const { notes = [] } = useContext(LawyerContext);

  const latestNotes = useMemo(() => {
    return [...notes]
      .sort(
        (a, b) =>
          new Date(b?.createdAt || 0) -
          new Date(a?.createdAt || 0)
      )
      .slice(0, 6);
  }, [notes]);

  const getRelativeTime = (date) => {
    if (!date) return "";

    const now = new Date();
    const noteDate = new Date(date);

    const diffInSeconds = Math.floor(
      (now - noteDate) / 1000
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

    return `منذ ${diffInDays} أيام`;
  };

  const getNoteIcon = (note) => {
    if (note?.sessionId) {
      return {
        icon: FaCalendarAlt,
        iconBg: "bg-amber-100",
        iconColor: "text-amber-600",
      };
    }

    if (note?.clientId) {
      return {
        icon: FaUser,
        iconBg: "bg-emerald-100",
        iconColor: "text-emerald-600",
      };
    }

    if (note?.caseId) {
      return {
        icon: FaBriefcase,
        iconBg: "bg-purple-100",
        iconColor: "text-purple-600",
      };
    }

    return {
      icon: FaStickyNote,
      iconBg: "bg-rose-100",
      iconColor: "text-rose-600",
    };
  };

  return (
    <div className="overflow-hidden transition-all duration-300 border shadow-sm bg-slate-800 rounded-2xl border-slate-700 hover:shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-slate-700">
        <div>
          <h2 className="text-lg font-bold text-white">
            آخر الملاحظات
          </h2>

          <p className="mt-1 text-xs text-slate-400">
            أحدث الملاحظات التي تمت إضافتها
          </p>
        </div>

        <div className="flex items-center justify-center w-10 h-10 text-rose-600 bg-rose-100 rounded-xl">
          <FaStickyNote className="w-5 h-5" />
        </div>
      </div>

      {/* Notes */}
      {latestNotes.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 p-5 md:grid-cols-2 lg:grid-cols-3">
          {latestNotes.map((note) => {
            const {
              icon: Icon,
              iconBg,
              iconColor,
            } = getNoteIcon(note);

            const caseNumber =
              note?.caseId?.caseNumber || "-";

            return (
              <div
                key={note?._id}
                className="p-4 transition-all duration-200 border rounded-xl border-slate-700 bg-slate-700/30 hover:bg-slate-700/60 hover:-translate-y-0.5"
              >
                {/* Top */}
                <div className="flex items-start justify-between gap-3">
                  <div
                    className={`flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-xl ${iconBg} ${iconColor}`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>

                  <span className="text-[11px] text-slate-500">
                    {getRelativeTime(note?.createdAt)}
                  </span>
                </div>

                {/* Title */}
                <h3 className="mt-4 text-sm font-semibold text-white">
                  ملاحظة
                </h3>

                {/* Content */}
                <p className="mt-2 text-xs leading-5 text-slate-400 line-clamp-2">
                  {note?.content || "لا يوجد محتوى للملاحظة"}
                </p>

                {/* Case */}
                <div className="pt-3 mt-3 border-t border-slate-700">
                  <span className="text-[11px] font-medium text-slate-500">
                    القضية {caseNumber}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center px-5 py-12 text-center">
          <div className="flex items-center justify-center rounded-full w-14 h-14 text-slate-500 bg-slate-700">
            <FaStickyNote className="w-6 h-6" />
          </div>

          <h3 className="mt-4 text-sm font-semibold text-white">
            لا توجد ملاحظات
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            لم تتم إضافة أي ملاحظات حتى الآن
          </p>
        </div>
      )}

      {/* Footer */}
      {notes.length > 0 && (
        <div className="px-5 py-3 border-t border-slate-700">
          <Link
            href="/Lawyer/Notes"
            className="flex items-center justify-center w-full gap-2 text-sm font-medium transition-colors text-rose-500 hover:text-rose-400"
          >
            عرض كل الملاحظات

            <FaArrowLeft className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default Notes;
