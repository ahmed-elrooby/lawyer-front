"use client";

import React, { useContext, useMemo } from "react";
import { useRouter } from "next/navigation";
import { OwnerContext } from "../../../../../Providers/LawyerOwner/OwnerProvider.js";

const QuickActions = () => {
  const {
    cases = [],
    lawyers = [],
    clients = [],
    sessions = [],
    documents = [],
  } = useContext(OwnerContext);

  const router = useRouter();

  const actions = [
    {
      title: "إضافة قضية جديدة",
      href: "/Lawyer_Owner/Cases",
      primary: true,
    },
    {
      title: "إضافة محامي للفريق",
      href: "/Lawyer_Owner/LawyersPage",
    },
    {
      title: "إضافة عميل",
      href: "/Lawyer_Owner/ClientsPage",
    },
    {
      title: "جدولة جلسة جديدة",
      href: "/Lawyer_Owner/Sessions",
    },
    {
      title: "رفع ملف قانوني",
      href: "/Lawyer_Owner/Files",
    },
    {
      title: "إعدادات المكتب والفريق",
      href: "/Lawyer_Owner/Profile",
    },
  ];

  const dataHealth = useMemo(() => {
    const collections = [
      {
        data: cases,
        fields: ["caseNumber", "title", "court"],
      },
      {
        data: lawyers,
        fields: ["name", "email"],
      },
      {
        data: clients,
        fields: ["name"],
      },
      {
        data: sessions,
        fields: ["sessionDate", "sessionTime"],
      },
      {
        data: documents,
        fields: ["name", "url"],
      },
    ];

    let totalFields = 0;
    let completedFields = 0;

    collections.forEach(({ data, fields }) => {
      if (!Array.isArray(data)) return;

      data.forEach((item) => {
        fields.forEach((field) => {
          totalFields += 1;

          if (
            item?.[field] !== undefined &&
            item?.[field] !== null &&
            String(item?.[field]).trim() !== ""
          ) {
            completedFields += 1;
          }
        });
      });
    });

    if (totalFields === 0) return 100;

    return Math.round(
      (completedFields / totalFields) * 100
    );
  }, [cases, lawyers, clients, sessions, documents]);

  return (
    <div className="p-4 bg-white rounded-2xl shadow-soft fade-border">
      {/* Header */}
      <div className="mb-3">
        <h3 className="text-xs font-extrabold text-slate-900">
          إجراءات سريعة
        </h3>

        <p className="mt-1 text-[8px] text-slate-400">
          الوصول السريع للمهام المتكررة
        </p>
      </div>

      {/* Actions */}
      <div className="space-y-1.5">
        {actions.map((action) => (
          <button
            key={action.title}
            type="button"
            onClick={() => router.push(action.href)}
            className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-[8px] ${
              action.primary
                ? "bg-slate-900 font-bold text-white"
                : "bg-slate-50 text-slate-700"
            }`}
          >
            <span>{action.title}</span>
            <span>←</span>
          </button>
        ))}
      </div>

      {/* Data Health */}
      <div className="mt-3 rounded-xl bg-emerald-50 p-2 text-center text-[7px] text-emerald-700">
        <b>نسبة صحة بيانات المكتب {dataHealth}%</b>
      </div>
    </div>
  );
};

export default QuickActions;