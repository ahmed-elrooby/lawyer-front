"use client";
import React, { useMemo, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const Table = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [lawyer, setLawyer] = useState("all");

  const cases = [
    {
      id: 1,
      client: "محمد عبدالله",
      clientInitial: "م",
      clientType: "عميل",
      clientBg: "bg-[#111827]",
      clientText: "text-white",

      caseNumber: "#2024-001",
      type: "تجارية",
      typeBg: "bg-[#edf3ff]",
      typeText: "text-[#62718a]",

      lawyer: "أحمد محمد",
      lawyerInitial: "أ",
      lawyerBg: "bg-[#dfe8f7]",

      updated: "منذ يومين",
      status: "نشطة",
      statusBg: "bg-[#eaf8ef]",
      statusText: "text-[#3d9561]",
    },

    {
      id: 2,
      client: "عبدالله صالح",
      clientInitial: "ع",
      clientType: "عميل",
      clientBg: "bg-[#dfeaff]",
      clientText: "text-[#536985]",

      caseNumber: "#2024-002",
      type: "عمالية",
      typeBg: "bg-[#fff5cf]",
      typeText: "text-[#987b1b]",

      lawyer: "محمد علي",
      lawyerInitial: "م",
      lawyerBg: "bg-[#edf3ff]",

      updated: "منذ 3 أيام",
      status: "نشطة",
      statusBg: "bg-[#eaf8ef]",
      statusText: "text-[#3d9561]",
    },

    {
      id: 3,
      client: "سارة أحمد",
      clientInitial: "س",
      clientType: "عميلة",
      clientBg: "bg-[#fff0d5]",
      clientText: "text-[#9a7622]",

      caseNumber: "#2024-003",
      type: "أحوال شخصية",
      typeBg: "bg-[#edf3ff]",
      typeText: "text-[#62718a]",

      lawyer: "أحمد محمد",
      lawyerInitial: "أ",
      lawyerBg: "bg-[#fff4d1]",

      updated: "منذ 5 أيام",
      status: "معلقة",
      statusBg: "bg-[#fff0f0]",
      statusText: "text-[#d84b4b]",
    },

    {
      id: 4,
      client: "فهد خالد",
      clientInitial: "ف",
      clientType: "عميل",
      clientBg: "bg-[#e5ecff]",
      clientText: "text-[#50678c]",

      caseNumber: "#2024-004",
      type: "مدنية",
      typeBg: "bg-[#edf3ff]",
      typeText: "text-[#62718a]",

      lawyer: "محمد علي",
      lawyerInitial: "م",
      lawyerBg: "bg-[#edf3ff]",

      updated: "منذ أسبوع",
      status: "نشطة",
      statusBg: "bg-[#eaf8ef]",
      statusText: "text-[#3d9561]",
    },
  ];

  const filteredCases = useMemo(() => {
    return cases.filter((item) => {
      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        item.client.toLowerCase().includes(searchValue) ||
        item.caseNumber.toLowerCase().includes(searchValue);

      const matchesStatus =
        status === "all" || item.status === status;

      const matchesLawyer =
        lawyer === "all" || item.lawyer === lawyer;

      return matchesSearch && matchesStatus && matchesLawyer;
    });
  }, [search, status, lawyer]);

  return (
    <div dir="rtl" className="w-full">
      
      {/* ================= Filters ================= */}
      <div className="mb-5 flex flex-wrap items-center gap-3 rounded-xl border border-[#e8ecf3] bg-white p-3">

        {/* Search */}
        <div className="relative min-w-[220px] flex-1">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ابحث باسم العميل أو رقم القضية..."
            className="h-9 w-full rounded-lg border border-[#e5e9f1] bg-[#fafbfe] px-4 pr-10 text-[9px] text-[#344054] outline-none transition focus:border-[#cfd6e2] focus:ring-2 focus:ring-[#edf1f7]"
          />

          <Search
            size={14}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#98a2b3]"
          />
        </div>

        {/* Search Button */}
        <button
          onClick={() => {}}
          className="flex h-9 items-center justify-center gap-2 rounded-lg bg-[#111827] px-5 text-[9px] font-bold text-white transition hover:bg-[#1f2937]"
        >
          <Search size={13} />
          بحث
        </button>

        {/* Status */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="h-9 rounded-lg border border-[#e5e9f1] bg-white px-4 text-[9px] text-[#657083] outline-none transition focus:border-[#cfd6e2]"
        >
          <option value="all">كل الحالات</option>
          <option value="نشطة">نشطة</option>
          <option value="مغلقة">مغلقة</option>
          <option value="معلقة">معلقة</option>
        </select>

        {/* Lawyer */}
        <select
          value={lawyer}
          onChange={(e) => setLawyer(e.target.value)}
          className="h-9 rounded-lg border border-[#e5e9f1] bg-white px-4 text-[9px] text-[#657083] outline-none transition focus:border-[#cfd6e2]"
        >
          <option value="all">كل المحامين</option>
          <option value="أحمد محمد">أحمد محمد</option>
          <option value="محمد علي">محمد علي</option>
        </select>

        {/* Filter */}
        <button
          onClick={() => {
            setSearch("");
            setStatus("all");
            setLawyer("all");
          }}
          className="flex h-9 items-center gap-2 rounded-lg border border-[#e5e9f1] bg-white px-4 text-[9px] text-[#687386] transition hover:bg-[#fafbfe]"
        >
          <SlidersHorizontal size={13} />
          تصفية
        </button>
      </div>

      {/* ================= Table ================= */}
      <section className="overflow-hidden rounded-xl border border-[#e7ebf2] bg-white shadow-sm">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5">

          <div className="text-right">
            <h2 className="text-[13px] font-bold text-[#172033]">
              أحدث القضايا
            </h2>

            <p className="mt-1 text-[8px] text-[#99a2b1]">
              عرض آخر القضايا المسجلة في النظام
            </p>
          </div>

          <button className="text-[9px] font-bold text-[#687386] transition hover:text-[#111827]">
            عرض الكل ←
          </button>

        </div>

        {/* Table */}
        <div className="overflow-x-auto">

          <table className="w-full min-w-[850px] text-right">

            {/* Head */}
            <thead>
              <tr className="border-y border-[#edf0f5] bg-[#f8faff] text-[8px] text-[#8b95a5]">

                <th className="px-5 py-4 font-normal">
                  العميل
                </th>

                <th className="px-5 py-4 font-normal">
                  رقم القضية
                </th>

                <th className="px-5 py-4 font-normal">
                  نوع القضية
                </th>

                <th className="px-5 py-4 font-normal">
                  المحامي المسؤول
                </th>

                <th className="px-5 py-4 font-normal">
                  آخر تحديث
                </th>

                <th className="px-5 py-4 font-normal">
                  الحالة
                </th>

                <th className="px-5 py-4 font-normal">
                  الإجراءات
                </th>

              </tr>
            </thead>

            {/* Body */}
            <tbody className="divide-y divide-[#f0f2f6]">

              {filteredCases.length > 0 ? (
                filteredCases.map((item) => (
                  <tr
                    key={item.id}
                    className="transition hover:bg-[#fafbfe]"
                  >

                    {/* Client */}
                    <td className="px-5 py-4">

                      <div className="flex items-center gap-3">

                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-full text-[9px] font-bold ${item.clientBg} ${item.clientText}`}
                        >
                          {item.clientInitial}
                        </div>

                        <div>
                          <p className="text-[9px] font-bold text-[#20293a]">
                            {item.client}
                          </p>

                          <p className="mt-1 text-[7px] text-[#9ca5b3]">
                            {item.clientType}
                          </p>
                        </div>

                      </div>

                    </td>

                    {/* Case Number */}
                    <td className="px-5 py-4 text-[9px] font-bold text-[#344054]">
                      {item.caseNumber}
                    </td>

                    {/* Case Type */}
                    <td className="px-5 py-4">

                      <span
                        className={`rounded-md px-2 py-1 text-[8px] ${item.typeBg} ${item.typeText}`}
                      >
                        {item.type}
                      </span>

                    </td>

                    {/* Lawyer */}
                    <td className="px-5 py-4">

                      <div className="flex items-center gap-2">

                        <div
                          className={`flex h-6 w-6 items-center justify-center rounded-full text-[7px] ${item.lawyerBg}`}
                        >
                          {item.lawyerInitial}
                        </div>

                        <span className="text-[8px] text-[#667085]">
                          {item.lawyer}
                        </span>

                      </div>

                    </td>

                    {/* Updated */}
                    <td className="px-5 py-4 text-[8px] text-[#7f8999]">
                      {item.updated}
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">

                      <span
                        className={`rounded-full px-3 py-1 text-[7px] font-bold ${item.statusBg} ${item.statusText}`}
                      >
                        {item.status}
                      </span>

                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">

                      <button
                        className="flex h-7 w-7 items-center justify-center rounded-md border border-[#e8ebf0] text-[#768195] transition hover:bg-[#f5f7fa] hover:text-[#111827]"
                        title="الإجراءات"
                      >
                        <MoreVertical size={14} />
                      </button>

                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="px-5 py-10 text-center text-[10px] text-[#98a2b3]"
                  >
                    لا توجد قضايا مطابقة للبحث
                  </td>
                </tr>
              )}

            </tbody>

          </table>
        </div>

        {/* ================= Pagination ================= */}
        <div className="flex items-center justify-between border-t border-[#edf0f5] px-6 py-4">

          <p className="text-[8px] text-[#929baa]">
            عرض 1 - {filteredCases.length} من أصل 24 قضية
          </p>

          <div className="flex items-center gap-1">

            <button
              className="flex h-7 w-7 items-center justify-center rounded-md border border-[#e7ebf0] text-[#8a94a5] transition hover:bg-[#f8faff]"
            >
              <ChevronRight size={13} />
            </button>

            <button
              className="flex h-7 w-7 items-center justify-center rounded-md bg-[#111827] text-[9px] font-bold text-white"
            >
              1
            </button>

            <button
              className="flex h-7 w-7 items-center justify-center rounded-md border border-[#e7ebf0] text-[9px] text-[#8a94a5] transition hover:bg-[#f8faff]"
            >
              2
            </button>

            <button
              className="flex h-7 w-7 items-center justify-center rounded-md border border-[#e7ebf0] text-[9px] text-[#8a94a5] transition hover:bg-[#f8faff]"
            >
              3
            </button>

            <button
              className="flex h-7 w-7 items-center justify-center rounded-md border border-[#e7ebf0] text-[#8a94a5] transition hover:bg-[#f8faff]"
            >
              <ChevronLeft size={13} />
            </button>

          </div>

        </div>

      </section>
    </div>
  );
};

export default Table;