"use client";

import React from "react";
import Link from "next/link";
import { CalendarDays, AlertCircle } from "lucide-react";

const Sessions = () => {
  const sessionsData = [
    {
      id: 1,
      case: "Estate v. Wilson",
      client: "إيما واتسون",
      date: "2026-05-20",
      time: "10:00 ص",
      status: "عاجل",
      statusType: "urgent",
    },
    {
      id: 2,
      case: "Tech Corp v. Innovate",
      client: "جيمس ميلر",
      date: "2026-05-22",
      time: "2:30 م",
      status: "مؤكد",
      statusType: "confirmed",
    },
    {
      id: 3,
      case: "IP Dispute",
      client: "ليام تشين",
      date: "2026-05-28",
      time: "11:15 ص",
      status: "عاجل",
      statusType: "urgent",
    },
  ];

  const getStatusClass = (type) => {
    switch (type) {
      case "urgent":
        return "bg-red-900/30 text-red-300";
      case "confirmed":
        return "bg-green-900/30 text-green-300";
      default:
        return "bg-gray-800 text-gray-300";
    }
  };

  return (
    <div className="overflow-hidden transition-all duration-300 border shadow-sm bg-slate-800 border-slate-700 rounded-2xl hover:shadow-md">
      <div className="flex items-center justify-between p-5 border-b border-slate-700">
        <h3 className="text-lg font-semibold text-white">الجلسات القادمة</h3>
        <Link
          href="/sessions"
          className="text-sm text-blue-400 transition hover:text-blue-300"
        >
          عرض الكل
        </Link>
      </div>

      <div className="divide-y divide-slate-700">
        {sessionsData.map((session) => (
          <div
            key={session.id}
            className="p-4 transition cursor-pointer hover:bg-slate-700/50"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <p className="font-medium text-gray-100">{session.case}</p>
                <p className="text-sm text-gray-400 mt-0.5">
                  العميلة: {session.client}
                </p>
                <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                  <CalendarDays className="w-3 h-3" />
                  <span>
                    {new Date(session.date).toLocaleDateString("ar-EG")} · {session.time}
                  </span>
                </div>
              </div>
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(
                  session.statusType
                )}`}
              >
                {session.statusType === "urgent" && (
                  <AlertCircle className="w-3 h-3" />
                )}
                {session.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sessions;