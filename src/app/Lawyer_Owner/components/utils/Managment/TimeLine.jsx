import React from "react";
import { MdOutlineRuleFolder } from "react-icons/md";

const TimeLine = () => {
  const cases = [
    {
      id: "#1089",
      client: "أحمد محمد",
      assignee: "أحمد علي",
      lastUpdate: "منذ يوم",
      status: "تحتاج متابعة",
      statusColor: "bg-[#FFE08E] text-[#241A00]",
    },
    {
      id: "#1038",
      client: "محمد حسن",
      assignee: "سارة محمود",
      lastUpdate: "منذ 4 أيام",
      status: "مستندات ناقصة",
      statusColor: "bg-rose-100 text-rose-700",
    },
    {
      id: "#1021",
      client: "سارة أحمد",
      assignee: "عمر سمير",
      lastUpdate: "منذ 8 أيام",
      status: "معلقة",
      statusColor: "bg-slate-200 text-slate-600",
    },
    {
      id: "#998",
      client: "شركة الأفق للتطوير",
      assignee: "خالد سمير",
      lastUpdate: "منذ 12 يوماً",
      status: "تدقيق دفاع",
      statusColor: "bg-blue-100 text-blue-700",
    },
  ];

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
          4 قضايا حرجة
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
            {cases.map((item, index) => (
              <tr
                key={index}
                className="transition-colors border-t border-slate-100 hover:bg-slate-50"
              >
                <td className="px-3 py-3 text-[12px] font-semibold text-slate-800">
                  {item.id}
                </td>

                <td className="p-3 text-[12px]">
                  {item.client}
                </td>

                <td className="p-3 text-[12px]">
                  {item.assignee}
                </td>

                <td className="p-3 text-[12px] text-slate-500">
                  {item.lastUpdate}
                </td>

                <td className="p-3">
                  <span
                    className={`inline-block whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-bold ${item.statusColor}`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="mt-5 space-y-3 md:hidden">
        {cases.map((item, index) => (
          <div
            key={index}
            className="p-4 transition bg-white border rounded-xl border-slate-100 hover:border-slate-200 hover:bg-slate-50/50"
          >
            {/* Card Header */}
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[9px] font-medium text-slate-400">
                  رقم القضية
                </p>

                <p className="mt-0.5 text-[13px] font-bold text-[#0B1C30]">
                  {item.id}
                </p>
              </div>

              <span
                className={`whitespace-nowrap rounded-full px-2.5 py-1 text-[9px] font-bold ${item.statusColor}`}
              >
                {item.status}
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
                  {item.client}
                </p>
              </div>

              <div>
                <p className="text-[9px] font-medium text-slate-400">
                  المسؤول
                </p>

                <p className="mt-1 text-[11px] font-semibold text-slate-700">
                  {item.assignee}
                </p>
              </div>

              <div className="col-span-2">
                <p className="text-[9px] font-medium text-slate-400">
                  آخر تحديث
                </p>

                <p className="mt-1 text-[11px] font-semibold text-slate-500">
                  {item.lastUpdate}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TimeLine;