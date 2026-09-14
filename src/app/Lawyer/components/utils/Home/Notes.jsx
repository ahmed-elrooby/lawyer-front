"use client";

import React from "react";
import Link from "next/link";

import {
  FaStickyNote,
  FaBriefcase,
  FaUser,
  FaCalendarAlt,
  FaFileAlt,
  FaArrowLeft,
} from "react-icons/fa";

const Notes = () => {
  const notes = [
    {
      id: 1,
      title: "مراجعة المستندات",
      description: "مراجعة جميع المستندات وتجهيزها قبل موعد الجلسة القادمة.",
      caseNumber: "#2026-1024",
      time: "منذ ساعتين",
      icon: FaFileAlt,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      id: 2,
      title: "التواصل مع العميل",
      description: "التواصل مع العميل لتأكيد موعد الجلسة وإبلاغه بالتحديثات.",
      caseNumber: "#2026-1022",
      time: "منذ 4 ساعات",
      icon: FaUser,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
    },
    {
      id: 3,
      title: "متابعة القضية",
      description: "متابعة آخر تطورات القضية مع المحكمة والتأكد من حالة الطلب.",
      caseNumber: "#2026-1021",
      time: "أمس",
      icon: FaBriefcase,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      id: 4,
      title: "موعد الجلسة القادمة",
      description: "التأكد من تجهيز ملف القضية قبل موعد الجلسة القادمة.",
      caseNumber: "#2026-1020",
      time: "أمس",
      icon: FaCalendarAlt,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
    },
    {
      id: 5,
      title: "تحديث ملف القضية",
      description: "إضافة آخر المستندات والملاحظات إلى ملف القضية.",
      caseNumber: "#2026-1019",
      time: "منذ يومين",
      icon: FaStickyNote,
      iconBg: "bg-rose-100",
      iconColor: "text-rose-600",
    },
    {
      id: 6,
      title: "مراجعة بيانات العميل",
      description:
        "مراجعة بيانات العميل والتأكد من تحديث رقم الهاتف والبيانات الأساسية.",
      caseNumber: "#2026-1018",
      time: "منذ 3 أيام",
      icon: FaUser,
      iconBg: "bg-cyan-100",
      iconColor: "text-cyan-600",
    },
  ];

  return (
    <div className="overflow-hidden transition-all duration-300 border shadow-sm bg-slate-800 rounded-2xl border-slate-700 hover:shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-slate-700">
        <div>
          <h2 className="text-lg font-bold text-white">آخر الملاحظات</h2>

          <p className="mt-1 text-xs text-slate-400">
            أحدث الملاحظات التي تمت إضافتها
          </p>
        </div>

        <div className="flex items-center justify-center w-10 h-10 text-rose-600 bg-rose-100 rounded-xl">
          <FaStickyNote className="w-5 h-5" />
        </div>
      </div>

      {/* Notes */}
      <div className="grid grid-cols-1 gap-4 p-5 md:grid-cols-2 lg:grid-cols-3">
        {notes.slice(0, 6).map((note) => {
          const Icon = note.icon;

          return (
            <div
              key={note.id}
              className="p-4 transition-all duration-200 border rounded-xl border-slate-700 bg-slate-700/30 hover:bg-slate-700/60 hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between gap-3">
                <div
                  className={`flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-xl ${note.iconBg} ${note.iconColor}`}
                >
                  <Icon className="w-4 h-4" />
                </div>

                <span className="text-[11px] text-slate-500">{note.time}</span>
              </div>

              <h3 className="mt-4 text-sm font-semibold text-white">
                {note.title}
              </h3>

              <p className="mt-2 text-xs leading-5 text-slate-400 line-clamp-2">
                {note.description}
              </p>

              <div className="pt-3 mt-3 border-t border-slate-700">
                <span className="text-[11px] font-medium text-slate-500">
                  القضية {note.caseNumber}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      {notes.length > 0 && (
        <div className="px-5 py-3 border-t border-slate-700">
          <Link
            href="/User/Notes"
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
