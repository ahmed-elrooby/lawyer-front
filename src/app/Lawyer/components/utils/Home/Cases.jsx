
"use client";

import React, { useContext, useMemo } from "react";
import {
  Scale,
  ArrowLeft,
  User,
  CalendarDays,
} from "lucide-react";

import { LawyerContext } from "../../../../../Providers/LawyerContext/lawyer.js";

const Cases = () => {
  const { cases: casesData = [] } = useContext(LawyerContext);

  const cases = useMemo(() => {
    return casesData
      .slice()
      .sort(
        (a, b) =>
          new Date(b?.createdAt || 0) -
          new Date(a?.createdAt || 0)
      )
      .slice(0, 4)
      .map((item) => {
        let status = "غير محددة";
        let statusStyle = "bg-slate-100 text-slate-600";
        let iconBg = "bg-slate-100";
        let iconColor = "text-slate-600";

        switch (item?.status) {
          case "active":
            status = "نشطة";
            statusStyle = "bg-blue-100 text-blue-600";
            iconBg = "bg-blue-100";
            iconColor = "text-blue-600";
            break;

          case "reserved_for_judgment":
            status = "محجوزة للحكم";
            statusStyle = "bg-amber-100 text-amber-600";
            iconBg = "bg-amber-100";
            iconColor = "text-amber-600";
            break;

          case "judged":
            status = "محكوم فيها";
            statusStyle = "bg-emerald-100 text-emerald-600";
            iconBg = "bg-emerald-100";
            iconColor = "text-emerald-600";
            break;

          case "pending":
            status = "معلقة";
            statusStyle = "bg-orange-100 text-orange-600";
            iconBg = "bg-orange-100";
            iconColor = "text-orange-600";
            break;

          case "closed":
            status = "مغلقة";
            statusStyle = "bg-slate-100 text-slate-600";
            iconBg = "bg-slate-100";
            iconColor = "text-slate-600";
            break;

          case "archived":
            status = "مؤرشفة";
            statusStyle = "bg-gray-100 text-gray-600";
            iconBg = "bg-gray-100";
            iconColor = "text-gray-600";
            break;

          default:
            break;
        }

        return {
          id: item?._id,
          caseNumber: item?.caseNumber || "-",
          title: item?.title || "بدون عنوان",

          client:
            item?.clientId?.name ||
            item?.client?.name ||
            "-",

          date: item?.createdAt
            ? new Date(item.createdAt).toLocaleDateString(
                "ar-EG",
                {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }
              )
            : "-",

          status,
          iconBg,
          iconColor,
          statusStyle,
        };
      });
  }, [casesData]);

  return (
    <div className="h-full overflow-hidden transition-all duration-300 border shadow-sm bg-slate-800 rounded-2xl border-slate-700 hover:shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-slate-700">
        <div>
          <h2 className="text-lg font-bold text-white">
            آخر القضايا
          </h2>

          <p className="mt-1 text-xs text-slate-400">
            أحدث القضايا التي تمت إضافتها
          </p>
        </div>

        {/* Icon */}
        <div className="flex items-center justify-center w-10 h-10 text-purple-600 bg-purple-100 rounded-xl">
          <Scale className="w-5 h-5" />
        </div>
      </div>

      {/* Cases */}
      <div className="p-3">
        {cases.length > 0 ? (
          cases.map((item) => (
            <div
              key={item.id}
              className="p-4 transition-all duration-200 border-b border-slate-700 last:border-b-0 rounded-xl hover:bg-slate-700/40"
            >
              <div className="flex items-start gap-3">
                {/* Icon */}
                <div
                  className={`flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-xl ${item.iconBg} ${item.iconColor}`}
                >
                  <Scale className="w-5 h-5" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-white truncate">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-xs text-slate-400">
                        قضية #{item.caseNumber}
                      </p>
                    </div>

                    {/* Status */}
                    <span
                      className={`px-2 py-1 text-[11px] font-medium rounded-lg whitespace-nowrap ${item.statusStyle}`}
                    >
                      {item.status}
                    </span>
                  </div>

                  {/* Meta */}
                  <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-slate-400">
                    <span className="inline-flex items-center gap-1">
                      <User className="w-3.5 h-3.5" />

                      {item.client}
                    </span>

                    <span className="inline-flex items-center gap-1">
                      <CalendarDays className="w-3.5 h-3.5" />

                      {item.date}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="flex items-center justify-center mb-3 rounded-full w-14 h-14 bg-slate-700">
              <Scale className="w-6 h-6 text-slate-400" />
            </div>

            <h3 className="text-sm font-semibold text-white">
              لا توجد قضايا
            </h3>

            <p className="mt-1 text-xs text-slate-400">
              لم يتم إضافة أي قضايا حتى الآن
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      {cases.length > 0 && (
        <div className="px-5 py-3 border-t border-slate-700">
          <button
            type="button"
            onClick={() => {
              window.location.href = "/Lawyer/Cases";
            }}
            className="flex items-center justify-center w-full gap-2 text-sm font-medium text-blue-500 transition-colors hover:text-blue-400"
          >
            عرض كل القضايا

            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Cases;
