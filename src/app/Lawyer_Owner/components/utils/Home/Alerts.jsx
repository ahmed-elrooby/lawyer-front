"use client";

import React, { useContext, useMemo } from "react";
import { FaCircle, FaArrowLeft } from "react-icons/fa";
import { OwnerContext } from "../../../../../Providers/LawyerOwner/OwnerProvider.js";

const styles = {
  danger: {
    wrapper: "bg-red-50",
    icon: "text-red-500",
    button: "text-red-600",
  },

  warning: {
    wrapper: "bg-amber-50",
    icon: "text-amber-600",
    button: "text-amber-700",
  },

  info: {
    wrapper: "bg-blue-50",
    icon: "text-blue-600",
    button: "text-blue-700",
  },

  team: {
    wrapper: "bg-indigo-50",
    icon: "text-indigo-600",
    button: "text-indigo-700",
  },
};

const AttentionAlerts = () => {
  const {
    cases = [],
    sessions = [],
    documents = [],
    lawyers = [],
  } = useContext(OwnerContext);

  const alerts = useMemo(() => {
    const generatedAlerts = [];

    const now = new Date();

    // =========================
    // القضايا التي لم يتم تحديثها
    // =========================
    const sevenDaysAgo = new Date(now);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const outdatedCases = Array.isArray(cases)
      ? cases.filter((item) => {
          if (!item?.updatedAt) return false;

          const updatedAt = new Date(item.updatedAt);

          return updatedAt < sevenDaysAgo && !item?.isArchived;
        })
      : [];

    if (outdatedCases.length > 0) {
      generatedAlerts.push({
        type: "danger",
        title: `${outdatedCases.length} ${
          outdatedCases.length === 1 ? "قضية تحتاج" : "قضايا تحتاج"
        } إلى تحديث`,
        description: "لم يتم تحديث بياناتها منذ أكثر من أسبوع.",
        button: "عرض التفاصيل",
        href: "/Lawyer_Owner/Cases",
      });
    }

    // =========================
    // جلسات الغد
    // =========================
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const dayAfterTomorrow = new Date(tomorrow);
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 1);

    const tomorrowSessions = Array.isArray(sessions)
      ? sessions.filter((session) => {
          if (!session?.sessionDate) return false;

          const sessionDate = new Date(session.sessionDate);

          return (
            sessionDate >= tomorrow &&
            sessionDate < dayAfterTomorrow &&
            session?.status !== "cancelled"
          );
        })
      : [];

    if (tomorrowSessions.length > 0) {
      generatedAlerts.push({
        type: "warning",
        title: `${tomorrowSessions.length} ${
          tomorrowSessions.length === 1 ? "جلسة غدًا" : "جلسات غدًا"
        } تحتاج مراجعة`,
        description: "تأكد من تجهيز الملفات والمستندات.",
        button: "عرض الجلسات",
        href: "/Lawyer_Owner/Sessions",
      });
    }

    // =========================
    // المستندات / الصيغ ناقصة البيانات
    // =========================
    const incompleteDocuments = Array.isArray(documents)
      ? documents.filter((document) => {
          return (
            !document?.name?.trim() ||
            !document?.description?.trim() ||
            !document?.url
          );
        })
      : [];

    if (incompleteDocuments.length > 0) {
      generatedAlerts.push({
        type: "info",
        title: `${incompleteDocuments.length} ${
          incompleteDocuments.length === 1 ? "ملف ناقص" : "ملفات ناقصة"
        } بيانات`,
        description: "يرجى استكمال البيانات المطلوبة.",
        button: "استكمال الآن",
        href: "/Lawyer_Owner/Files",
      });
    }

    // =========================
    // ضغط العمل على المحامين
    // =========================
    if (Array.isArray(lawyers) && lawyers.length > 0) {
      const lawyersWorkload = lawyers
        .map((lawyer) => {
          const lawyerId = String(lawyer?._id || "");

          const lawyerCases = Array.isArray(cases)
            ? cases.filter((item) => {
                if (!Array.isArray(item?.lawyers)) return false;

                return item.lawyers.some((assignedLawyer) => {
                  const assignedId =
                    typeof assignedLawyer === "object"
                      ? assignedLawyer?._id
                      : assignedLawyer;

                  return String(assignedId) === lawyerId;
                });
              })
            : [];

          return {
            ...lawyer,
            casesCount: lawyerCases.length,
          };
        })
        .sort((a, b) => b.casesCount - a.casesCount);

      const maxCases = lawyersWorkload[0]?.casesCount || 0;

      const highWorkloadLawyers = lawyersWorkload.filter((lawyer) => {
        return lawyer.casesCount >= 10 && lawyer.casesCount >= maxCases * 0.7;
      });

      if (highWorkloadLawyers.length > 0) {
        generatedAlerts.push({
          type: "team",
          title: `${highWorkloadLawyers.length} ${
            highWorkloadLawyers.length === 1
              ? "محامي لديه ضغط"
              : "محامين لديهم ضغط"
          } عمل مرتفع`,
          description: "راجع توزيع القضايا على الفريق.",
          button: "إدارة الفريق",
          href: "/Lawyer_Owner/LawyersPage",
        });
      }
    }

    return generatedAlerts;
  }, [cases, sessions, documents, lawyers]);

  return (
    <div className="p-4 bg-white rounded-2xl shadow-soft fade-border">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-xs font-extrabold text-slate-900">
            يحتاج إلى انتباهك
          </h3>

          <p className="mt-1 text-[8px] text-slate-400">
            أهم التنبيهات التي تحتاج إجراء
          </p>
        </div>

        <span className="rounded-full bg-red-50 px-2 py-1 text-[7px] font-bold text-red-500">
          {alerts.length} تنبيهات
        </span>
      </div>

      {/* Alerts */}
      <div className="space-y-2">
        {alerts.length > 0 ? (
          alerts.map((alert, index) => {
            const style = styles[alert.type];

            return (
              <div
                key={`${alert.type}-${index}`}
                className={`rounded-xl p-2.5 ${style.wrapper}`}
              >
                <div className="flex gap-2">
                  {/* Dot */}
                  <span className={`pt-0.5 ${style.icon}`}>
                    <FaCircle size={7} />
                  </span>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="text-[9px] font-bold text-slate-800">
                      {alert.title}
                    </div>

                    <p className="mt-1 text-[7px] leading-4 text-slate-500">
                      {alert.description}
                    </p>

                    <a
                      href={alert.href}
                      className={`mt-1.5 inline-block rounded-md bg-white px-2 py-1 text-[7px] ${style.button}`}
                    >
                      {alert.button}

                      <FaArrowLeft
                        className="inline-block mr-1"
                        size={6}
                      />
                    </a>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-4 text-center rounded-xl bg-emerald-50">
            <div className="text-[9px] font-bold text-emerald-700">
              لا توجد تنبيهات حالية
            </div>

            <p className="mt-1 text-[7px] text-emerald-600">
              جميع الأمور تبدو مستقرة في المكتب.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttentionAlerts;