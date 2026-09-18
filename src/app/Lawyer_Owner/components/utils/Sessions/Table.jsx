"use client";

import React, { useMemo, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  CalendarDays,
  ChevronDown,
  Eye,
  Pencil,
  Trash2,
  Clock3,
  MapPin,
  UserRound,
  Gavel,
  ChevronLeft,
  ChevronRight,
  X,
  LayoutGrid,
  List,
} from "lucide-react";

const AllSessions = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("الكل");
  const [lawyerFilter, setLawyerFilter] = useState("الكل");
  const [courtFilter, setCourtFilter] = useState("الكل");
  const [dateFilter, setDateFilter] = useState("الكل");

  // Table / Card
  const [viewMode, setViewMode] = useState("table");

  const [selectedSession, setSelectedSession] = useState(null);
  const [deleteSession, setDeleteSession] = useState(null);

  const sessions = [
    {
      id: 1,
      time: "09:00 ص",
      date: "18 سبتمبر 2026",
      caseNumber: "#1024",
      caseName: "قضية شركة النور التجارية",
      lawyer: "أحمد محمد علي",
      lawyerImage: "https://i.pravatar.cc/150?img=11",
      court: "محكمة القاهرة",
      chamber: "الدائرة 12",
      type: "تجاري",
      status: "قادمة",
    },
    {
      id: 2,
      time: "10:30 ص",
      date: "18 سبتمبر 2026",
      caseNumber: "#1031",
      caseName: "قضية أحمد محمود عبد الله",
      lawyer: "خالد عبد الرحمن",
      lawyerImage: "https://i.pravatar.cc/150?img=32",
      court: "محكمة جنوب القاهرة",
      chamber: "الدائرة 8",
      type: "أحوال شخصية",
      status: "جارية",
    },
    {
      id: 3,
      time: "12:00 م",
      date: "18 سبتمبر 2026",
      caseNumber: "#1048",
      caseName: "قضية مؤسسة المستقبل",
      lawyer: "محمد أحمد حسن",
      lawyerImage: "https://i.pravatar.cc/150?img=47",
      court: "محكمة الجيزة",
      chamber: "الدائرة 5",
      type: "مدني",
      status: "قادمة",
    },
    {
      id: 4,
      time: "01:30 م",
      date: "18 سبتمبر 2026",
      caseNumber: "#1082",
      caseName: "قضية خالد إبراهيم",
      lawyer: "سامي محمود",
      lawyerImage: "https://i.pravatar.cc/150?img=5",
      court: "محكمة القاهرة",
      chamber: "الدائرة 15",
      type: "جنائي",
      status: "قادمة",
    },
    {
      id: 5,
      time: "03:00 م",
      date: "18 سبتمبر 2026",
      caseNumber: "#1106",
      caseName: "قضية شركة الأمل",
      lawyer: "ياسر إبراهيم",
      lawyerImage: "https://i.pravatar.cc/150?img=44",
      court: "محكمة الجيزة",
      chamber: "الدائرة 7",
      type: "تجاري",
      status: "قادمة",
    },
    {
      id: 6,
      time: "09:30 ص",
      date: "17 سبتمبر 2026",
      caseNumber: "#1112",
      caseName: "قضية محمود حسن",
      lawyer: "عمر حسن",
      lawyerImage: "https://i.pravatar.cc/150?img=68",
      court: "محكمة القاهرة",
      chamber: "الدائرة 4",
      type: "جنائي",
      status: "منتهية",
    },
    {
      id: 7,
      time: "11:00 ص",
      date: "17 سبتمبر 2026",
      caseNumber: "#1130",
      caseName: "قضية شركة الإعمار",
      lawyer: "أحمد محمد علي",
      lawyerImage: "https://i.pravatar.cc/150?img=11",
      court: "محكمة الجيزة",
      chamber: "الدائرة 9",
      type: "مدني",
      status: "مؤجلة",
    },
    {
      id: 8,
      time: "02:00 م",
      date: "16 سبتمبر 2026",
      caseNumber: "#1142",
      caseName: "قضية محمد السيد",
      lawyer: "خالد عبد الرحمن",
      lawyerImage: "https://i.pravatar.cc/150?img=32",
      court: "محكمة جنوب القاهرة",
      chamber: "الدائرة 3",
      type: "أحوال شخصية",
      status: "منتهية",
    },
  ];

  const statusStyles = {
    قادمة: {
      badge: "bg-[#E8F0FF] text-[#3559A8]",
      dot: "bg-[#4B70D1]",
    },
    جارية: {
      badge: "bg-[#E7F7EF] text-[#168354]",
      dot: "bg-[#21A366]",
    },
    منتهية: {
      badge: "bg-[#F0F1F3] text-[#5B616B]",
      dot: "bg-[#7A818C]",
    },
    مؤجلة: {
      badge: "bg-[#FFF4D8] text-[#927000]",
      dot: "bg-[#C49A00]",
    },
  };

  const filteredSessions = useMemo(() => {
    return sessions.filter((session) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        session.caseName.toLowerCase().includes(searchValue) ||
        session.caseNumber.toLowerCase().includes(searchValue) ||
        session.lawyer.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "الكل" || session.status === statusFilter;

      const matchesLawyer =
        lawyerFilter === "الكل" || session.lawyer === lawyerFilter;

      const matchesCourt =
        courtFilter === "الكل" || session.court === courtFilter;

      const matchesDate =
        dateFilter === "الكل" || session.date === dateFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesLawyer &&
        matchesCourt &&
        matchesDate
      );
    });
  }, [
    search,
    statusFilter,
    lawyerFilter,
    courtFilter,
    dateFilter,
  ]);

  const handleView = (session) => {
    setSelectedSession(session);
  };

  const handleEdit = (session) => {
    console.log("Edit session:", session);
  };

  const handleDelete = (session) => {
    setDeleteSession(session);
  };

  const confirmDelete = () => {
    console.log("Delete session:", deleteSession);
    setDeleteSession(null);
  };

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("الكل");
    setLawyerFilter("الكل");
    setCourtFilter("الكل");
    setDateFilter("الكل");
  };

  const hasFilters =
    statusFilter !== "الكل" ||
    lawyerFilter !== "الكل" ||
    courtFilter !== "الكل" ||
    dateFilter !== "الكل" ||
    search;

  return (
    <>
      <section dir="rtl" className="w-full mt-6">
        <div className="overflow-hidden rounded-2xl border border-[#E7EAF0] bg-white">

          {/* ================= HEADER ================= */}
          <div className="border-b border-[#EEF0F4] px-5 py-5">

            <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">

              {/* Title */}
              <div>
                <div className="flex items-center gap-2">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF3FF] text-[#4263B5]">
                    <CalendarDays size={19} />
                  </div>

                  <div>
                    <h2 className="text-[17px] font-bold text-[#0B1C30]">
                      جميع الجلسات
                    </h2>

                    <p className="mt-0.5 text-[12px] text-[#7A818C]">
                      متابعة وإدارة جميع جلسات القضايا المسجلة بالنظام
                    </p>
                  </div>

                </div>
              </div>

              {/* Search + View */}
              <div className="flex flex-col w-full gap-3 sm:flex-row xl:w-auto">

                {/* View Toggle */}
                <div className="flex h-11 items-center rounded-xl border border-[#E3E6EC] bg-[#F8F9FB] p-1">

                  <button
                    onClick={() => setViewMode("table")}
                    className={`flex h-9 items-center gap-1.5 rounded-lg px-3 text-[10px] font-bold transition ${
                      viewMode === "table"
                        ? "bg-white text-[#0B1C30] shadow-sm"
                        : "text-[#858C97] hover:text-[#414957]"
                    }`}
                  >
                    <List size={14} />
                    جدول
                  </button>

                  <button
                    onClick={() => setViewMode("card")}
                    className={`flex h-9 items-center gap-1.5 rounded-lg px-3 text-[10px] font-bold transition ${
                      viewMode === "card"
                        ? "bg-white text-[#0B1C30] shadow-sm"
                        : "text-[#858C97] hover:text-[#414957]"
                    }`}
                  >
                    <LayoutGrid size={14} />
                    كروت
                  </button>

                </div>

                {/* Search */}
                <div className="relative w-full sm:w-[330px]">

                  <Search
                    size={17}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8B919B]"
                  />

                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="ابحث باسم القضية أو رقمها أو المحامي..."
                    className="h-11 w-full rounded-xl border border-[#E3E6EC] bg-[#FAFBFC] pr-10 pl-4 text-[12px] text-[#202733] outline-none transition placeholder:text-[#9AA0A9] focus:border-[#8EA4D8] focus:bg-white"
                  />

                </div>

              </div>

            </div>

            {/* ================= FILTERS ================= */}
            <div className="flex flex-wrap items-center gap-2 mt-5">

              <div className="flex items-center gap-2 text-[11px] font-semibold text-[#656C77]">
                <SlidersHorizontal size={15} />
                الفلاتر:
              </div>

              <FilterSelect
                value={statusFilter}
                onChange={setStatusFilter}
                options={[
                  "الكل",
                  "قادمة",
                  "جارية",
                  "منتهية",
                  "مؤجلة",
                ]}
              />

              <FilterSelect
                value={lawyerFilter}
                onChange={setLawyerFilter}
                options={[
                  "الكل",
                  "أحمد محمد علي",
                  "محمد أحمد حسن",
                  "خالد عبد الرحمن",
                  "سامي محمود",
                  "ياسر إبراهيم",
                  "عمر حسن",
                ]}
              />

              <FilterSelect
                value={courtFilter}
                onChange={setCourtFilter}
                options={[
                  "الكل",
                  "محكمة القاهرة",
                  "محكمة الجيزة",
                  "محكمة جنوب القاهرة",
                ]}
              />

              <FilterSelect
                value={dateFilter}
                onChange={setDateFilter}
                options={[
                  "الكل",
                  "18 سبتمبر 2026",
                  "17 سبتمبر 2026",
                  "16 سبتمبر 2026",
                ]}
              />

              {hasFilters && (
                <button
                  onClick={clearFilters}
                  className="flex h-9 items-center gap-1.5 rounded-lg px-3 text-[11px] font-semibold text-[#A24D4D] transition hover:bg-[#FFF1F1]"
                >
                  <X size={13} />
                  مسح الفلاتر
                </button>
              )}

            </div>

          </div>

          {/* ================= CONTENT ================= */}
          <div className="w-full">

            {/* ================================================= */}
            {/* TABLE VIEW */}
            {/* ================================================= */}

            {viewMode === "table" && (
              <div className="w-full overflow-x-auto">

                <table className="w-full min-w-[1050px] border-collapse">

                  <thead>
                    <tr className="border-b border-[#EEF0F4] bg-[#FAFBFC] text-right">

                      <th className="px-5 py-4 text-[11px] font-bold text-[#737A85]">
                        الجلسة
                      </th>

                      <th className="px-4 py-4 text-[11px] font-bold text-[#737A85]">
                        القضية
                      </th>

                      <th className="px-4 py-4 text-[11px] font-bold text-[#737A85]">
                        المحامي المسؤول
                      </th>

                      <th className="px-4 py-4 text-[11px] font-bold text-[#737A85]">
                        المحكمة
                      </th>

                      <th className="px-4 py-4 text-[11px] font-bold text-[#737A85]">
                        نوع القضية
                      </th>

                      <th className="px-4 py-4 text-[11px] font-bold text-[#737A85]">
                        الحالة
                      </th>

                      <th className="px-5 py-4 text-center text-[11px] font-bold text-[#737A85]">
                        الإجراءات
                      </th>

                    </tr>
                  </thead>

                  <tbody>

                    {filteredSessions.length > 0 ? (

                      filteredSessions.map((session) => {

                        const style = statusStyles[session.status];

                        return (
                          <tr
                            key={session.id}
                            className="group border-b border-[#F0F1F4] transition hover:bg-[#FBFCFE]"
                          >

                            {/* Session */}
                            <td className="px-5 py-4">

                              <div className="flex items-center gap-3">

                                <div className="flex h-10 w-10 shrink-0 flex-col items-center justify-center rounded-xl bg-[#F3F5F9]">

                                  <Clock3
                                    size={14}
                                    className="text-[#52627A]"
                                  />

                                  <span className="mt-0.5 text-[9px] font-bold text-[#4C5666]">
                                    {session.time}
                                  </span>

                                </div>

                                <div>

                                  <p className="text-[12px] font-bold text-[#1B2635]">
                                    {session.date}
                                  </p>

                                  <p className="mt-1 text-[10px] text-[#8A919C]">
                                    جلسة #
                                    {session.id
                                      .toString()
                                      .padStart(3, "0")}
                                  </p>

                                </div>

                              </div>

                            </td>

                            {/* Case */}
                            <td className="px-4 py-4">

                              <div>

                                <p className="max-w-[210px] truncate text-[12px] font-bold text-[#1B2635]">
                                  {session.caseName}
                                </p>

                                <div className="mt-1 flex items-center gap-1.5">

                                  <span className="rounded-md bg-[#F1F3F7] px-1.5 py-0.5 text-[9px] font-semibold text-[#69717D]">
                                    {session.caseNumber}
                                  </span>

                                  <span className="text-[10px] text-[#9AA0A9]">
                                    •
                                  </span>

                                  <span className="text-[10px] text-[#858C97]">
                                    {session.chamber}
                                  </span>

                                </div>

                              </div>

                            </td>

                            {/* Lawyer */}
                            <td className="px-4 py-4">

                              <div className="flex items-center gap-2.5">

                                <img
                                  src={session.lawyerImage}
                                  alt={session.lawyer}
                                  className="object-cover rounded-full h-9 w-9"
                                />

                                <div>

                                  <p className="text-[11px] font-bold text-[#293342]">
                                    {session.lawyer}
                                  </p>

                                  <p className="mt-0.5 text-[9px] text-[#9298A2]">
                                    المحامي المسؤول
                                  </p>

                                </div>

                              </div>

                            </td>

                            {/* Court */}
                            <td className="px-4 py-4">

                              <div className="flex items-center gap-2">

                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F5F6F8]">

                                  <MapPin
                                    size={13}
                                    className="text-[#737B88]"
                                  />

                                </div>

                                <div>

                                  <p className="text-[11px] font-semibold text-[#384150]">
                                    {session.court}
                                  </p>

                                  <p className="mt-0.5 text-[9px] text-[#9298A2]">
                                    {session.chamber}
                                  </p>

                                </div>

                              </div>

                            </td>

                            {/* Type */}
                            <td className="px-4 py-4">

                              <span className="inline-flex rounded-lg bg-[#F3F5F8] px-2.5 py-1.5 text-[10px] font-semibold text-[#596170]">
                                {session.type}
                              </span>

                            </td>

                            {/* Status */}
                            <td className="px-4 py-4">

                              <span
                                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[10px] font-bold ${style.badge}`}
                              >

                                <span
                                  className={`h-1.5 w-1.5 rounded-full ${style.dot}`}
                                />

                                {session.status}

                              </span>

                            </td>

                            {/* Actions */}
                            <td className="px-5 py-4">

                              <div className="flex items-center justify-center gap-1.5">

                                <button
                                  onClick={() => handleView(session)}
                                  title="التفاصيل"
                                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E4E7EC] text-[#66707D] transition hover:border-[#B7C4E2] hover:bg-[#F3F6FD] hover:text-[#4263B5]"
                                >
                                  <Eye size={14} />
                                </button>

                                <button
                                  onClick={() => handleEdit(session)}
                                  title="تعديل"
                                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E4E7EC] text-[#66707D] transition hover:border-[#C8B88A] hover:bg-[#FFF9E9] hover:text-[#967400]"
                                >
                                  <Pencil size={14} />
                                </button>

                                <button
                                  onClick={() => handleDelete(session)}
                                  title="حذف"
                                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E4E7EC] text-[#66707D] transition hover:border-[#E1B9B9] hover:bg-[#FFF3F3] hover:text-[#B24B4B]"
                                >
                                  <Trash2 size={14} />
                                </button>

                              </div>

                            </td>

                          </tr>
                        );
                      })

                    ) : (

                      <tr>

                        <td
                          colSpan="7"
                          className="px-5 py-16 text-center"
                        >
                          <EmptyState />
                        </td>

                      </tr>

                    )}

                  </tbody>

                </table>

              </div>
            )}

            {/* ================================================= */}
            {/* CARD VIEW */}
            {/* ================================================= */}

            {viewMode === "card" && (
              <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 xl:grid-cols-3">

                {filteredSessions.length > 0 ? (

                  filteredSessions.map((session) => {

                    const style = statusStyles[session.status];

                    return (
                      <div
                        key={session.id}
                        className="group rounded-2xl border border-[#E8EBF0] bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#CDD6E8] hover:shadow-md"
                      >

                        {/* Card Header */}
                        <div className="flex items-start justify-between gap-3">

                          <div className="flex items-center gap-3">

                            <div className="flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-xl bg-[#F3F5F9]">

                              <Clock3
                                size={14}
                                className="text-[#52627A]"
                              />

                              <span className="mt-0.5 text-[9px] font-bold text-[#4C5666]">
                                {session.time}
                              </span>

                            </div>

                            <div>

                              <p className="text-[12px] font-bold text-[#1B2635]">
                                {session.date}
                              </p>

                              <p className="mt-1 text-[10px] text-[#8A919C]">
                                جلسة #
                                {session.id
                                  .toString()
                                  .padStart(3, "0")}
                              </p>

                            </div>

                          </div>

                          <span
                            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[9px] font-bold ${style.badge}`}
                          >

                            <span
                              className={`h-1.5 w-1.5 rounded-full ${style.dot}`}
                            />

                            {session.status}

                          </span>

                        </div>

                        {/* Case */}
                        <div className="mt-4 rounded-xl bg-[#F8F9FB] p-3">

                          <div className="flex items-start justify-between gap-2">

                            <p className="text-[12px] font-bold leading-5 text-[#1B2635]">
                              {session.caseName}
                            </p>

                            <span className="shrink-0 rounded-md bg-white px-1.5 py-0.5 text-[9px] font-semibold text-[#69717D]">
                              {session.caseNumber}
                            </span>

                          </div>

                          <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[10px] text-[#858C97]">

                            <Gavel size={12} />

                            <span>
                              {session.type}
                            </span>

                            <span>•</span>

                            <span>
                              {session.chamber}
                            </span>

                          </div>

                        </div>

                        {/* Lawyer */}
                        <div className="flex items-center gap-3 mt-4">

                          <img
                            src={session.lawyerImage}
                            alt={session.lawyer}
                            className="object-cover rounded-full h-9 w-9"
                          />

                          <div className="min-w-0">

                            <p className="text-[11px] font-bold text-[#293342]">
                              {session.lawyer}
                            </p>

                            <p className="mt-0.5 text-[9px] text-[#9298A2]">
                              المحامي المسؤول
                            </p>

                          </div>

                        </div>

                        {/* Court */}
                        <div className="mt-4 flex items-center gap-2 rounded-xl border border-[#EEF0F4] px-3 py-2.5">

                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F5F6F8]">

                            <MapPin
                              size={13}
                              className="text-[#737B88]"
                            />

                          </div>

                          <div className="min-w-0">

                            <p className="truncate text-[10px] font-semibold text-[#384150]">
                              {session.court}
                            </p>

                            <p className="mt-0.5 text-[9px] text-[#9298A2]">
                              {session.chamber}
                            </p>

                          </div>

                        </div>

                        {/* Actions */}
                        <div className="mt-4 flex items-center gap-2 border-t border-[#EEF0F4] pt-3">

                          <button
                            onClick={() => handleView(session)}
                            className="flex h-9 flex-1 items-center justify-center gap-1.5 rounded-lg border border-[#E4E7EC] text-[10px] font-semibold text-[#66707D] transition hover:border-[#B7C4E2] hover:bg-[#F3F6FD] hover:text-[#4263B5]"
                          >
                            <Eye size={14} />
                            التفاصيل
                          </button>

                          <button
                            onClick={() => handleEdit(session)}
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E4E7EC] text-[#66707D] transition hover:border-[#C8B88A] hover:bg-[#FFF9E9] hover:text-[#967400]"
                            title="تعديل"
                          >
                            <Pencil size={14} />
                          </button>

                          <button
                            onClick={() => handleDelete(session)}
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E4E7EC] text-[#66707D] transition hover:border-[#E1B9B9] hover:bg-[#FFF3F3] hover:text-[#B24B4B]"
                            title="حذف"
                          >
                            <Trash2 size={14} />
                          </button>

                        </div>

                      </div>
                    );
                  })

                ) : (

                  <div className="px-5 py-16 text-center col-span-full">
                    <EmptyState />
                  </div>

                )}

              </div>
            )}

          </div>

          {/* ================= FOOTER ================= */}
          <div className="flex flex-col gap-3 border-t border-[#EEF0F4] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

            <p className="text-[10px] text-[#8B919B]">

              عرض{" "}

              <span className="font-bold text-[#555D69]">
                {filteredSessions.length}
              </span>

              {" "}من{" "}

              <span className="font-bold text-[#555D69]">
                {sessions.length}
              </span>

              {" "}جلسات

            </p>

            <div className="flex items-center gap-1.5">

              <button
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E4E7EC] text-[#8A919C] transition hover:bg-[#F5F6F8]"
              >
                <ChevronRight size={14} />
              </button>

              <button className="flex h-8 min-w-8 items-center justify-center rounded-lg bg-[#0B1C30] px-2 text-[10px] font-bold text-white">
                1
              </button>

              <button className="flex h-8 min-w-8 items-center justify-center rounded-lg border border-[#E4E7EC] px-2 text-[10px] font-semibold text-[#68717E] transition hover:bg-[#F5F6F8]">
                2
              </button>

              <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E4E7EC] text-[#8A919C] transition hover:bg-[#F5F6F8]">
                <ChevronLeft size={14} />
              </button>

            </div>

          </div>

        </div>
      </section>

      {/* ================================================= */}
      {/* DETAILS MODAL */}
      {/* ================================================= */}

      {selectedSession && (
        <div
          dir="rtl"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#07111F]/45 p-4 backdrop-blur-[2px]"
          onClick={() => setSelectedSession(null)}
        >

          <div
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >

            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#EEF0F4] px-5 py-4">

              <div>

                <h3 className="text-[16px] font-bold text-[#0B1C30]">
                  تفاصيل الجلسة
                </h3>

                <p className="mt-1 text-[10px] text-[#8A919C]">
                  {selectedSession.caseNumber}
                </p>

              </div>

              <button
                onClick={() => setSelectedSession(null)}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F4F5F7] text-[#707782] transition hover:bg-[#ECEEF1]"
              >
                <X size={15} />
              </button>

            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-4">

              {/* Case */}
              <div className="rounded-xl bg-[#F7F9FC] p-4">

                <p className="text-[10px] text-[#8A919C]">
                  القضية
                </p>

                <p className="mt-1 text-[13px] font-bold text-[#202A38]">
                  {selectedSession.caseName}
                </p>

              </div>

              {/* Info */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                <InfoItem
                  icon={<Clock3 size={14} />}
                  label="موعد الجلسة"
                  value={`${selectedSession.date} - ${selectedSession.time}`}
                />

                <InfoItem
                  icon={<UserRound size={14} />}
                  label="المحامي"
                  value={selectedSession.lawyer}
                />

                <InfoItem
                  icon={<MapPin size={14} />}
                  label="المحكمة"
                  value={selectedSession.court}
                />

                <InfoItem
                  icon={<Gavel size={14} />}
                  label="الدائرة"
                  value={selectedSession.chamber}
                />

              </div>

              {/* Status */}
              <div className="flex items-center justify-between rounded-xl border border-[#EEF0F4] px-4 py-3">

                <span className="text-[11px] text-[#7C838D]">
                  حالة الجلسة
                </span>

                <span
                  className={`rounded-full px-3 py-1.5 text-[10px] font-bold ${
                    statusStyles[selectedSession.status].badge
                  }`}
                >
                  {selectedSession.status}
                </span>

              </div>

            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-2 border-t border-[#EEF0F4] px-5 py-4">

              <button
                onClick={() => setSelectedSession(null)}
                className="rounded-lg border border-[#E2E5EA] px-4 py-2 text-[11px] font-semibold text-[#646C78] transition hover:bg-[#F7F8FA]"
              >
                إغلاق
              </button>

              <button
                onClick={() => {
                  handleEdit(selectedSession);
                  setSelectedSession(null);
                }}
                className="rounded-lg bg-[#0B1C30] px-4 py-2 text-[11px] font-semibold text-white transition hover:bg-[#142A42]"
              >
                تعديل الجلسة
              </button>

            </div>

          </div>

        </div>
      )}

      {/* ================================================= */}
      {/* DELETE MODAL */}
      {/* ================================================= */}

      {deleteSession && (
        <div
          dir="rtl"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#07111F]/45 p-4 backdrop-blur-[2px]"
          onClick={() => setDeleteSession(null)}
        >

          <div
            className="w-full max-w-sm p-6 text-center bg-white shadow-2xl rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#FFF1F1] text-[#B24B4B]">
              <Trash2 size={19} />
            </div>

            <h3 className="mt-4 text-[15px] font-bold text-[#202936]">
              حذف الجلسة؟
            </h3>

            <p className="mt-2 text-[11px] leading-5 text-[#858C97]">

              هل أنت متأكد من حذف جلسة{" "}

              <span className="font-bold text-[#4A5260]">
                {deleteSession.caseName}
              </span>

              ؟

              <br />

              لا يمكن التراجع عن هذا الإجراء.

            </p>

            <div className="flex gap-2 mt-6">

              <button
                onClick={() => setDeleteSession(null)}
                className="flex-1 rounded-lg border border-[#E2E5EA] py-2.5 text-[11px] font-semibold text-[#626A76] transition hover:bg-[#F7F8FA]"
              >
                إلغاء
              </button>

              <button
                onClick={confirmDelete}
                className="flex-1 rounded-lg bg-[#B24B4B] py-2.5 text-[11px] font-semibold text-white transition hover:bg-[#963D3D]"
              >
                حذف الجلسة
              </button>

            </div>

          </div>

        </div>
      )}

    </>
  );
};

/* ================================================= */
/* FILTER SELECT */
/* ================================================= */

const FilterSelect = ({
  value,
  onChange,
  options,
}) => {
  return (
    <div className="relative">

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-9 min-w-[125px] appearance-none rounded-lg border border-[#E3E6EC] bg-white py-0 pl-8 pr-3 text-[10px] font-semibold text-[#626A76] outline-none transition hover:border-[#C9CED7] focus:border-[#91A5D5]"
      >

        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option === "الكل"
              ? "الكل"
              : option}
          </option>
        ))}

      </select>

      <ChevronDown
        size={13}
        className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-[#8B919B]"
      />

    </div>
  );
};

/* ================================================= */
/* INFO ITEM */
/* ================================================= */

const InfoItem = ({
  icon,
  label,
  value,
}) => {
  return (
    <div className="rounded-xl border border-[#EEF0F4] p-3">

      <div className="flex items-center gap-1.5 text-[#7E8793]">

        {icon}

        <span className="text-[9px]">
          {label}
        </span>

      </div>

      <p className="mt-2 text-[11px] font-bold text-[#313B49]">
        {value}
      </p>

    </div>
  );
};

/* ================================================= */
/* EMPTY STATE */
/* ================================================= */

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center">

      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F3F5F8]">

        <CalendarDays
          size={23}
          className="text-[#8A919C]"
        />

      </div>

      <p className="mt-4 text-[13px] font-bold text-[#414957]">
        لا توجد جلسات مطابقة
      </p>

      <p className="mt-1 text-[11px] text-[#9AA0A9]">
        جرّب تغيير البحث أو الفلاتر المستخدمة
      </p>

    </div>
  );
};

export default AllSessions;