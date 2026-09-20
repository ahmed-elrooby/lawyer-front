"use client";

import React, { useContext, useMemo, useState } from "react";
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
  X,
  LayoutGrid,
  List,
  UsersRound,
} from "lucide-react";

import { OwnerContext } from "../../../../../Providers/LawyerOwner/OwnerProvider.js";
import Details from "./Details.jsx";
import Delete from "./Delete.jsx";
import UpdateSession from "./UpdateSession.jsx";

const AllSessions = () => {
  const {
    sessions = [],
    setOpenUpdateSession,openUpdateSession,
    setOpenDeleteSession,openDeleteSession
  } = useContext(OwnerContext);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("الكل");
  const [lawyerFilter, setLawyerFilter] = useState("الكل");
  const [courtFilter, setCourtFilter] = useState("الكل");
  const [dateFilter, setDateFilter] = useState("الكل");
const [openDetails, setOpenDetails] = useState(false);
  const [viewMode, setViewMode] = useState("table");

  const [selectSession, setSelectSession] = useState(null);
  const [deleteSession, setDeleteSession] = useState(null);

  /* ================================================= */
  /* STATUS */
  /* ================================================= */

  const statusConfig = {
    scheduled: {
      label: "مجدولة",
      badge: "bg-[#E8F0FF] text-[#3559A8]",
      dot: "bg-[#4B70D1]",
    },

    attended: {
      label: "تم الحضور",
      badge: "bg-[#E7F7EF] text-[#168354]",
      dot: "bg-[#21A366]",
    },

    postponed: {
      label: "مؤجلة",
      badge: "bg-[#FFF4D8] text-[#927000]",
      dot: "bg-[#C49A00]",
    },

    completed: {
      label: "مكتملة",
      badge: "bg-[#F0F1F3] text-[#5B616B]",
      dot: "bg-[#7A818C]",
    },

    cancelled: {
      label: "ملغاة",
      badge: "bg-[#FFF1F1] text-[#B24B4B]",
      dot: "bg-[#B24B4B]",
    },
  };

  /* ================================================= */
  /* HELPERS */
  /* ================================================= */

  const formatDate = (date) => {
    if (!date) return "غير محدد";

    return new Date(date).toLocaleDateString("ar-EG", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatDateForFilter = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("ar-EG", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getLawyers = (session) => {
    if (!Array.isArray(session?.caseId?.lawyers)) return [];

    return session.caseId.lawyers;
  };

  const getLawyerNames = (session) => {
    return getLawyers(session)
      .map((lawyer) => lawyer?.name)
      .filter(Boolean);
  };

  const getClientName = (session) => {
    if (
      session?.caseId?.clientId &&
      typeof session.caseId.clientId === "object"
    ) {
      return session.caseId.clientId.name || "غير محدد";
    }

    return "غير محدد";
  };

  /* ================================================= */
  /* DYNAMIC FILTER OPTIONS */
  /* ================================================= */

  const lawyerOptions = useMemo(() => {
    const names = sessions.flatMap((session) =>
      getLawyerNames(session)
    );

    return ["الكل", ...new Set(names)];
  }, [sessions]);

  const courtOptions = useMemo(() => {
    const courts = sessions
      .map((session) => session?.caseId?.court)
      .filter(Boolean);

    return ["الكل", ...new Set(courts)];
  }, [sessions]);

  const dateOptions = useMemo(() => {
    const dates = sessions
      .map((session) => formatDateForFilter(session?.sessionDate))
      .filter(Boolean);

    return ["الكل", ...new Set(dates)];
  }, [sessions]);

  /* ================================================= */
  /* FILTER */
  /* ================================================= */

  const filteredSessions = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return sessions.filter((session) => {
      const caseNumber =
        session?.caseId?.caseNumber?.toString().toLowerCase() || "";

      const title =
        session?.title?.toLowerCase() || "";

      const court =
        session?.caseId?.court?.toLowerCase() || "";

      const client =
        getClientName(session)?.toLowerCase() || "";

      const lawyers = getLawyerNames(session);

      const matchesSearch =
        !searchValue ||
        title.includes(searchValue) ||
        caseNumber.includes(searchValue) ||
        court.includes(searchValue) ||
        client.includes(searchValue) ||
        lawyers.some((name) =>
          name.toLowerCase().includes(searchValue)
        );

      const matchesStatus =
        statusFilter === "الكل" ||
        statusConfig[session.status]?.label === statusFilter;

      const matchesLawyer =
        lawyerFilter === "الكل" ||
        lawyers.includes(lawyerFilter);

      const matchesCourt =
        courtFilter === "الكل" ||
        session?.caseId?.court === courtFilter;

      const matchesDate =
        dateFilter === "الكل" ||
        formatDateForFilter(session?.sessionDate) === dateFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesLawyer &&
        matchesCourt &&
        matchesDate
      );
    });
  }, [
    sessions,
    search,
    statusFilter,
    lawyerFilter,
    courtFilter,
    dateFilter,
  ]);

  /* ================================================= */
  /* ACTIONS */
  /* ================================================= */



  const handleEdit = (session) => {
    setSelectedSession(null);

    if (setOpenUpdateSession) {
      setOpenUpdateSession(session);
    }
  };

  const handleDelete = (session) => {
    setDeleteSession(session);

    if (setOpenDeleteSession) {
      setOpenDeleteSession(session);
    }
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
    search.trim();

  return (
    <>
    {
  openDetails && (
        <Details
          selectSession={selectSession}
          openDetails={openDetails}
          setOpenDetails={setOpenDetails}
        />
      )
}
{
  openDeleteSession && <Delete selectSession={selectSession}
/>
}
{
  openUpdateSession && <UpdateSession selectSession={selectSession}/>
}
      <section className="w-full mt-6">
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
                    placeholder="ابحث بعنوان الجلسة أو رقم القضية أو المحامي..."
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
                  ...Object.values(statusConfig).map(
                    (item) => item.label
                  ),
                ]}
              />

              <FilterSelect
                value={lawyerFilter}
                onChange={setLawyerFilter}
                options={lawyerOptions}
              />

              <FilterSelect
                value={courtFilter}
                onChange={setCourtFilter}
                options={courtOptions}
              />

              <FilterSelect
                value={dateFilter}
                onChange={setDateFilter}
                options={dateOptions}
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
            {/* TABLE */}
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
                        العميل
                      </th>

                      <th className="px-4 py-4 text-[11px] font-bold text-[#737A85]">
                        المحامي
                      </th>

                      <th className="px-4 py-4 text-[11px] font-bold text-[#737A85]">
                        المحكمة
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

                        const style =
                          statusConfig[session.status] ||
                          statusConfig.scheduled;

                        const lawyers = getLawyers(session);

                        return (
                          <tr
                            key={session._id}
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
                                    {session.sessionTime || "--"}
                                  </span>

                                </div>

                                <div className="min-w-0">

                                  <p className="text-[12px] font-bold text-[#1B2635]">
                                    {session.title || "جلسة بدون عنوان"}
                                  </p>

                                  <p className="mt-1 text-[10px] text-[#8A919C]">
                                    {formatDate(session.sessionDate)}
                                  </p>

                                </div>

                              </div>

                            </td>

                            {/* Case */}

                            <td className="px-4 py-4">

                              <span className="rounded-md bg-[#F1F3F7] px-2 py-1 text-[10px] font-semibold text-[#69717D]">
                                {session?.caseId?.caseNumber
                                  ? `#${session.caseId.caseNumber}`
                                  : "غير محددة"}
                              </span>

                            </td>

                            {/* Client */}

                            <td className="px-4 py-4">

                              <div className="flex items-center gap-2">

                                <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#F3F5F9] text-[#66707D]">

                                  {session?.caseId?.clientId?.profileImage?.url ? (
                                    <img
                                      src={
                                        session.caseId.clientId.profileImage.url
                                      }
                                      alt={
                                        session.caseId.clientId.name || ""
                                      }
                                      className="object-cover w-full h-full"
                                    />
                                  ) : (
                                    <UserRound size={14} />
                                  )}

                                </div>

                                <p className="max-w-[130px] truncate text-[11px] font-semibold text-[#293342]">
                                  {getClientName(session)}
                                </p>

                              </div>

                            </td>

                            {/* Lawyers */}

                            <td className="px-4 py-4">

                              {lawyers.length > 0 ? (

                                <div className="flex -space-x-2 space-x-reverse">

                                  {lawyers.slice(0, 3).map((lawyer) => (
                                    <div
                                      key={lawyer._id}
                                      title={lawyer.name}
                                      className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-[#111827] text-[9px] font-bold text-white"
                                    >

                                      {lawyer?.profileImage?.url ? (
                                        <img
                                          src={lawyer.profileImage.url}
                                          alt={lawyer.name}
                                          className="object-cover w-full h-full"
                                        />
                                      ) : (
                                        lawyer?.name?.charAt(0) || "م"
                                      )}

                                    </div>
                                  ))}

                                  {lawyers.length > 3 && (
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#F1F3F7] text-[9px] font-bold text-[#69717D]">
                                      +{lawyers.length - 3}
                                    </div>
                                  )}

                                </div>

                              ) : (
                                <span className="text-[10px] text-[#9298A2]">
                                  لا يوجد
                                </span>
                              )}

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

                                <p className="max-w-[130px] truncate text-[11px] font-semibold text-[#384150]">
                                  {session?.caseId?.court || "غير محددة"}
                                </p>

                              </div>

                            </td>

                            {/* Status */}

                            <td className="px-4 py-4">

                              <span
                                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[10px] font-bold ${style.badge}`}
                              >

                                <span
                                  className={`h-1.5 w-1.5 rounded-full ${style.dot}`}
                                />

                                {style.label}

                              </span>

                            </td>

                            {/* Actions */}

                            <td className="px-5 py-4">

                              <div className="flex items-center justify-center gap-1.5">

                                <button
                                  onClick={() => {
                                    setSelectSession(session);
                                    setOpenDetails(true);
                                  }}
                                  title="التفاصيل"
                                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E4E7EC] text-[#66707D] transition hover:border-[#B7C4E2] hover:bg-[#F3F6FD] hover:text-[#4263B5]"
                                >
                                  <Eye size={14} />
                                </button>

                                <button
                                  onClick={() => {
                                    setSelectSession(session)
                                    setOpenUpdateSession(true)
                                  }}
                                  title="تعديل"
                                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E4E7EC] text-[#66707D] transition hover:border-[#C8B88A] hover:bg-[#FFF9E9] hover:text-[#967400]"
                                >
                                  <Pencil size={14} />
                                </button>

                                <button
                                  onClick={() => {
                                    setSelectSession(session)
                                    setOpenDeleteSession(true)
                                  }}
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
            {/* CARD */}
            {/* ================================================= */}

            {viewMode === "card" && (
              <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 xl:grid-cols-3">

                {filteredSessions.length > 0 ? (

                  filteredSessions.map((session) => {

                    const style =
                      statusConfig[session.status] ||
                      statusConfig.scheduled;

                    const lawyers = getLawyers(session);

                    return (
                      <div
                        key={session._id}
                        className="group rounded-2xl border border-[#E8EBF0] bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#CDD6E8] hover:shadow-md"
                      >

                        {/* Header */}

                        <div className="flex items-start justify-between gap-3">

                          <div className="flex items-center min-w-0 gap-3">

                            <div className="flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-xl bg-[#F3F5F9]">

                              <Clock3
                                size={14}
                                className="text-[#52627A]"
                              />

                              <span className="mt-0.5 text-[9px] font-bold text-[#4C5666]">
                                {session.sessionTime || "--"}
                              </span>

                            </div>

                            <div className="min-w-0">

                              <p className="truncate text-[12px] font-bold text-[#1B2635]">
                                {session.title || "جلسة بدون عنوان"}
                              </p>

                              <p className="mt-1 text-[10px] text-[#8A919C]">
                                {formatDate(session.sessionDate)}
                              </p>

                            </div>

                          </div>

                          <span
                            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[9px] font-bold ${style.badge}`}
                          >

                            <span
                              className={`h-1.5 w-1.5 rounded-full ${style.dot}`}
                            />

                            {style.label}

                          </span>

                        </div>

                        {/* Case */}

                        <div className="mt-4 rounded-xl bg-[#F8F9FB] p-3">

                          <div className="flex items-center justify-between gap-2">

                            <div className="flex items-center gap-2">

                              <Gavel
                                size={14}
                                className="text-[#52627A]"
                              />

                              <span className="text-[10px] text-[#858C97]">
                                رقم القضية
                              </span>

                            </div>

                            <span className="rounded-md bg-white px-2 py-1 text-[9px] font-semibold text-[#69717D]">
                              {session?.caseId?.caseNumber
                                ? `#${session.caseId.caseNumber}`
                                : "غير محددة"}
                            </span>

                          </div>

                          <div className="flex items-center gap-2 mt-3">

                            <MapPin
                              size={13}
                              className="text-[#737B88]"
                            />

                            <span className="truncate text-[10px] text-[#858C97]">
                              {session?.caseId?.court || "المحكمة غير محددة"}
                            </span>

                          </div>

                        </div>

                        {/* Client */}

                        <div className="flex items-center gap-3 mt-4">

                          <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#F3F5F9] text-[#66707D]">

                            {session?.caseId?.clientId?.profileImage?.url ? (
                              <img
                                src={
                                  session.caseId.clientId.profileImage.url
                                }
                                alt={getClientName(session)}
                                className="object-cover w-full h-full"
                              />
                            ) : (
                              <UserRound size={15} />
                            )}

                          </div>

                          <div className="min-w-0">

                            <p className="truncate text-[11px] font-bold text-[#293342]">
                              {getClientName(session)}
                            </p>

                            <p className="mt-0.5 text-[9px] text-[#9298A2]">
                              العميل
                            </p>

                          </div>

                        </div>

                        {/* Lawyers */}

                        <div className="mt-4 rounded-xl border border-[#EEF0F4] px-3 py-2.5">

                          <div className="flex items-center gap-2 mb-2">

                            <UsersRound
                              size={13}
                              className="text-[#737B88]"
                            />

                            <span className="text-[9px] text-[#9298A2]">
                              المحامون
                            </span>

                          </div>

                          {lawyers.length > 0 ? (

                            <div className="flex flex-wrap gap-1.5">

                              {lawyers.map((lawyer) => (
                                <span
                                  key={lawyer._id}
                                  className="rounded-lg bg-[#F5F6F8] px-2 py-1 text-[9px] font-semibold text-[#596170]"
                                >
                                  {lawyer.name}
                                </span>
                              ))}

                            </div>

                          ) : (
                            <span className="text-[9px] text-[#9298A2]">
                              لا يوجد محامون
                            </span>
                          )}

                        </div>

                        {/* Actions */}

                        <div className="mt-4 flex items-center gap-2 border-t border-[#EEF0F4] pt-3">

                          <button
                            onClick={() =>{
                              setSelectSession(session)
                              setOpenDetails(true)
                            }}
                            className="flex h-9 flex-1 items-center justify-center gap-1.5 rounded-lg border border-[#E4E7EC] text-[10px] font-semibold text-[#66707D] transition hover:border-[#B7C4E2] hover:bg-[#F3F6FD] hover:text-[#4263B5]"
                          >
                            <Eye size={14} />
                            التفاصيل
                          </button>

                          <button
  onClick={() => {
                                    setSelectSession(session)
                                    setOpenUpdateSession(true)
                                  }}                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E4E7EC] text-[#66707D] transition hover:border-[#C8B88A] hover:bg-[#FFF9E9] hover:text-[#967400]"
                            title="تعديل"
                          >
                            <Pencil size={14} />
                          </button>

                          <button
  onClick={() => {
                                    setSelectSession(session)
                                    setOpenDeleteSession(true)
                                  }}                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E4E7EC] text-[#66707D] transition hover:border-[#E1B9B9] hover:bg-[#FFF3F3] hover:text-[#B24B4B]"
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

            <p className="text-[10px] text-[#9AA0A9]">
              إجمالي الجلسات المسجلة: {sessions.length}
            </p>

          </div>

        </div>
      </section>

    
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
            {option}
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