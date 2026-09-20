"use client";

import React, { useContext, useMemo } from "react";
import { useRouter } from "next/navigation";
import { OwnerContext } from "../../../../../Providers/LawyerOwner/OwnerProvider.js";

const OfficeActivity = () => {
  const {
    cases = [],
    documents = [],
    lawyers = [],
  } = useContext(OwnerContext);

  const router = useRouter();

  const activities = useMemo(() => {
    const result = [];

    // Cases
    if (Array.isArray(cases)) {
      cases.forEach((item) => {
        const createdAt = item?.createdAt;
        const updatedAt = item?.updatedAt;

        if (!createdAt && !updatedAt) return;

        const isUpdated =
          updatedAt &&
          createdAt &&
          new Date(updatedAt).getTime() >
            new Date(createdAt).getTime();

        const date = new Date(
          isUpdated ? updatedAt : createdAt
        );

        result.push({
          id: `case-${item?._id}`,
          date,
          name:
            item?.createdBy?.name ||
            item?.lawyer?.name ||
            "المكتب",
          action: isUpdated
            ? "حدّث حالة القضية"
            : "أضاف قضية جديدة",
          caseNumber: item?.caseNumber
            ? `#${item.caseNumber}`
            : null,
          status:
            isUpdated && item?.status === "judged"
              ? "مغلقة"
              : null,
          type: "قضايا",
          avatarClass:
            "bg-slate-900 text-white",
        });
      });
    }

    // Documents
    if (Array.isArray(documents)) {
      documents.forEach((item) => {
        if (!item?.createdAt) return;

        result.push({
          id: `document-${item?._id}`,
          date: new Date(item.createdAt),
          name:
            item?.uploadedBy?.name ||
            "المكتب",
          action: "رفع ملفًا قانونيًا",
          caseNumber: null,
          status: null,
          type: "مستندات قانونية",
          avatarClass:
            "bg-amber-100 text-amber-700",
        });
      });
    }

    // Lawyers
    if (Array.isArray(lawyers)) {
      lawyers.forEach((item) => {
        if (!item?.createdAt) return;

        result.push({
          id: `lawyer-${item?._id}`,
          date: new Date(item.createdAt),
          name: item?.createdBy?.name || "المكتب",
          action: "أضاف محاميًا جديدًا للفريق",
          caseNumber: null,
          status: null,
          type: "إدارة المكتب",
          avatarClass:
            "bg-yellow-100 text-yellow-700",
        });
      });
    }

    return result
      .filter((item) => !Number.isNaN(item.date.getTime()))
      .sort((a, b) => b.date - a.date)
      .slice(0, 4);
  }, [cases, documents, lawyers]);

  const getRelativeTime = (date) => {
    const diff = Math.floor(
      (Date.now() - date.getTime()) / 1000
    );

    if (diff < 60) {
      return "منذ أقل من دقيقة";
    }

    const minutes = Math.floor(diff / 60);

    if (minutes < 60) {
      return `منذ ${minutes} دقيقة`;
    }

    const hours = Math.floor(minutes / 60);

    if (hours < 24) {
      return `منذ ${hours} ساعة`;
    }

    const days = Math.floor(hours / 24);

    if (days === 1) {
      return "منذ يوم";
    }

    return `منذ ${days} أيام`;
  };

  const getInitial = (name) => {
    return name?.trim()?.charAt(0) || "م";
  };

  return (
    <div className="col-span-2 p-4 bg-white rounded-2xl shadow-soft fade-border">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-xs font-extrabold text-slate-900">
            نشاط المكتب (سجل العمليات)
          </h3>

          <p className="mt-1 text-[8px] text-slate-400">
            آخر الأنشطة التي تمت داخل المكتب
          </p>
        </div>

        <span className="flex items-center gap-1 text-[7px] text-emerald-600">
          <i className="h-1.5 w-1.5 rounded-full bg-emerald-500"></i>
          مباشر
        </span>
      </div>

      {/* Activities */}
      <div className="space-y-1.5">
        {activities.length > 0 ? (
          activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-2 rounded-xl bg-slate-50 p-2.5"
            >
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[8px] ${activity.avatarClass}`}
              >
                {getInitial(activity.name)}
              </span>

              <div className="flex-1">
                <div className="text-[8px] leading-4 text-slate-700">
                  <b>{activity.name}</b>{" "}
                  {activity.action}{" "}
                  {activity.caseNumber && (
                    <span className="text-blue-600">
                      {activity.caseNumber}
                    </span>
                  )}{" "}
                  {activity.status && (
                    <>
                      إلى{" "}
                      <b className="text-emerald-600">
                        {activity.status}
                      </b>
                    </>
                  )}
                </div>

                <div className="text-[7px] text-slate-400">
                  {getRelativeTime(activity.date)} •{" "}
                  {activity.type}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-xl bg-slate-50 p-5 text-center text-[8px] text-slate-400">
            لا توجد أنشطة مسجلة حاليًا
          </div>
        )}
      </div>

      {/* Footer */}
     
    </div>
  );
};

export default OfficeActivity;