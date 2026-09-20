"use client";

import React, { useContext, useMemo } from "react";
import { MdOutlineRuleFolder } from "react-icons/md";
import { OwnerContext } from "../../../../../Providers/LawyerOwner/OwnerProvider.js";

const STATUS_CONFIG = {
  active: {
    label: "تحتاج متابعة",
    className: "bg-[#FFE08E] text-[#241A00]",
  },
  reserved_for_judgment: {
    label: "محجوزة للحكم",
    className: "bg-blue-100 text-blue-700",
  },
  judged: {
    label: "تم الحكم",
    className: "bg-slate-200 text-slate-600",
  },
};

const getRelativeDate = (date) => {
  if (!date) return "غير محدد";

  const targetDate = new Date(date);

  if (Number.isNaN(targetDate.getTime())) {
    return "غير محدد";
  }

  const now = new Date();
  const diff = now.getTime() - targetDate.getTime();

  if (diff < 0) return "مستقبلًا";

  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (minutes < 60) {
    return minutes <= 1 ? "منذ دقيقة" : `منذ ${minutes} دقيقة`;
  }

  if (hours < 24) {
    return hours === 1 ? "منذ ساعة" : `منذ ${hours} ساعات`;
  }

  if (days === 1) return "منذ يوم";

  if (days < 7) return `منذ ${days} أيام`;

  if (days < 30) {
    const weeks = Math.floor(days / 7);
    return weeks === 1 ? "منذ أسبوع" : `منذ ${weeks} أسابيع`;
  }

  const months = Math.floor(days / 30);

  return months === 1 ? "منذ شهر" : `منذ ${months} أشهر`;
};

const TimeLine = () => {
  const {
    cases: caseList = [],
    clients: clientList = [],
  } = useContext(OwnerContext);

  const clientsMap = useMemo(() => {
    return new Map(
      clientList.map((client) => [String(client?._id), client])
    );
  }, [clientList]);

  const followUpCases = useMemo(() => {
    const now = new Date();

    return caseList
      .map((item) => {
        const client =
          item?.clientId && typeof item.clientId === "object"
            ? item.clientId
            : clientsMap.get(String(item?.clientId));

        const lawyers = Array.isArray(item?.lawyers)
          ? item.lawyers
          : [];

        const lawyer = lawyers[0];

        const lastUpdate =
          item?.updatedAt ||
          item?.filingDate ||
          item?.createdAt;

        const daysSinceUpdate = lastUpdate
          ? Math.floor(
              (now.getTime() - new Date(lastUpdate).getTime()) /
                (1000 * 60 * 60 * 24)
            )
          : 0;

        /*
         * القضايا التي تحتاج متابعة:
         * - active ومتوقف عليها 3 أيام أو أكثر
         * - reserved_for_judgment
         *
         * أما judged فتم استبعادها لأنها مغلقة.
         */
        const needsFollowUp =
          item?.status === "reserved_for_judgment" ||
          (item?.status === "active" && daysSinceUpdate >= 3);

        if (!needsFollowUp) return null;

        let status = STATUS_CONFIG[item?.status];

        if (!status) {
          status = {
            label: "تحتاج متابعة",
            className: "bg-[#FFE08E] text-[#241A00]",
          };
        }

        return {
          ...item,
          clientName: client?.name || "غير محدد",
          lawyerName: lawyer?.name || "غير محدد",
          lastUpdate,
          lastUpdateText: getRelativeDate(lastUpdate),
          statusLabel: status.label,
          statusColor: status.className,
        };
      })
      .filter(Boolean)
      .sort((a, b) => {
        const dateA = new Date(a.lastUpdate || 0).getTime();
        const dateB = new Date(b.lastUpdate || 0).getTime();

        return dateA - dateB;
      })
      .slice(0, 5);
  }, [caseList, clientsMap]);

  return (
    <section className="p-4 bg-white rounded-xl sm:p-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#E5EEFF]">
              <MdOutlineRuleFolder
                size={18}
                className="text-[#4868B4]"
              />
            </div>

            <div>
              <h3 className="font-bold text-[#0B1C30]">
                قضايا تحتاج متابعة
              </h3>

              <p className="mt-0.5 text-[11px] text-[#45464D] sm:text-[12px]">
                ملفات توقفت حركتها أو تتطلب تدخلاً مستندياً
              </p>
            </div>
          </div>
        </div>

        <button className="shrink-0 rounded-full bg-[#DCE9FF] px-2.5 py-1 text-[9px] font-bold text-[#0B1C30] sm:text-[10px]">
          {followUpCases.length} قضايا حرجة
        </button>
      </div>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden mt-5 overflow-hidden border rounded-lg border-slate-100 md:block">
        <table className="w-full text-right bg-white border-collapse">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="p-3 text-[12px] font-bold">
                القضية
              </th>

              <th className="p-3 text-[12px] font-bold">
                العميل
              </th>

              <th className="p-3 text-[12px] font-bold">
                المسؤول
              </th>

              <th className="p-3 text-[12px] font-bold">
                آخر تحديث
              </th>

              <th className="p-3 text-[12px] font-bold">
                الحالة الإجرائية
              </th>
            </tr>
          </thead>

          <tbody className="text-sm text-slate-700">
            {followUpCases.length > 0 ? (
              followUpCases.map((item) => (
                <tr
                  key={item?._id}
                  className="transition-colors border-t border-slate-100 hover:bg-slate-50"
                >
                  <td className="px-3 py-3 text-[12px] font-semibold text-slate-800">
                    {item?.caseNumber
                      ? `#${item.caseNumber}`
                      : item?._id
                        ? `#${String(item._id).slice(-4)}`
                        : "-"}
                  </td>

                  <td className="p-3 text-[12px]">
                    {item.clientName}
                  </td>

                  <td className="p-3 text-[12px]">
                    {item.lawyerName}
                  </td>

                  <td className="p-3 text-[12px] text-slate-500">
                    {item.lastUpdateText}
                  </td>

                  <td className="p-3">
                    <span
                      className={`inline-block whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-bold ${item.statusColor}`}
                    >
                      {item.statusLabel}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="p-6 text-center text-[12px] text-slate-400"
                >
                  لا توجد قضايا تحتاج متابعة حالياً
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="mt-5 space-y-3 md:hidden">
        {followUpCases.length > 0 ? (
          followUpCases.map((item) => (
            <div
              key={item?._id}
              className="p-4 transition bg-white border rounded-xl border-slate-100 hover:border-slate-200 hover:bg-slate-50/50"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[9px] font-medium text-slate-400">
                    رقم القضية
                  </p>

                  <p className="mt-0.5 text-[13px] font-bold text-[#0B1C30]">
                    {item?.caseNumber
                      ? `#${item.caseNumber}`
                      : item?._id
                        ? `#${String(item._id).slice(-4)}`
                        : "-"}
                  </p>
                </div>

                <span
                  className={`whitespace-nowrap rounded-full px-2.5 py-1 text-[9px] font-bold ${item.statusColor}`}
                >
                  {item.statusLabel}
                </span>
              </div>

              {/* Divider */}
              <div className="my-3 border-t border-slate-100" />

              {/* Details */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                <div>
                  <p className="text-[9px] font-medium text-slate-400">
                    العميل
                  </p>

                  <p className="mt-1 text-[11px] font-semibold text-slate-700">
                    {item.clientName}
                  </p>
                </div>

                <div>
                  <p className="text-[9px] font-medium text-slate-400">
                    المسؤول
                  </p>

                  <p className="mt-1 text-[11px] font-semibold text-slate-700">
                    {item.lawyerName}
                  </p>
                </div>

                <div className="col-span-2">
                  <p className="text-[9px] font-medium text-slate-400">
                    آخر تحديث
                  </p>

                  <p className="mt-1 text-[11px] font-semibold text-slate-500">
                    {item.lastUpdateText}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="py-6 text-center text-[11px] text-slate-400">
            لا توجد قضايا تحتاج متابعة حالياً
          </div>
        )}
      </div>
    </section>
  );
};

export default TimeLine;