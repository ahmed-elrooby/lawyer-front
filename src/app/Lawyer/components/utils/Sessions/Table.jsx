
"use client";

import React, { useContext, useMemo, useState } from "react";
import {
  FaSearch,
  FaTable,
  FaThLarge,
  FaEye,
  FaEdit,
  FaTrash,
  FaCalendarAlt,
  FaClock,
  FaGavel,
  FaChevronRight,
  FaChevronLeft,
  FaInbox,
} from "react-icons/fa";

import { LawyerContext } from "../../../../../Providers/LawyerContext/lawyer.js";
import Details from "./Details.jsx";
import UpdateSession from "./UpdateSession.jsx";
import DeleteSession from "./DeleteSession.jsx";

const Table = () => {
  const {
    sessions,
    handleUpdateSessionFun,
    openUpdateSession,
    setOpenUpdateSession,
    handleDeleteSessionFun,
    openDeleteSession,
    setOpenDeleteSession,
  } = useContext(LawyerContext);

  const [selectSession, setSelectSession] = useState(null);
  const [openDetails, setOpenDetails] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState("table");

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 8;

  const data = Array.isArray(sessions) ? sessions : [];

  // =========================
  // Status
  // =========================
  const statusConfig = {
    scheduled: {
      label: "مجدولة",
      className:
        "border-cyan-500/20 bg-cyan-500/10 text-cyan-400",
    },
    attended: {
      label: "تم الحضور",
      className:
        "border-blue-500/20 bg-blue-500/10 text-blue-400",
    },
    postponed: {
      label: "مؤجلة",
      className:
        "border-amber-500/20 bg-amber-500/10 text-amber-400",
    },
    completed: {
      label: "مكتملة",
      className:
        "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
    },
    cancelled: {
      label: "ملغاة",
      className:
        "border-red-500/20 bg-red-500/10 text-red-400",
    },
  };

  // =========================
  // Filter
  // =========================
  const filteredSessions = useMemo(() => {
    const value = search.trim().toLowerCase();

    return data.filter((session) => {
      const matchesSearch =
        !value ||
        session?.title?.toLowerCase().includes(value) ||
        session?.caseId?.title?.toLowerCase().includes(value) ||
        session?.caseId?.caseNumber
          ?.toLowerCase()
          .includes(value) ||
        session?.caseId?.court?.toLowerCase().includes(value);

      const matchesStatus =
        statusFilter === "all" ||
        session?.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [data, search, statusFilter]);

  // =========================
  // Pagination
  // =========================
  const totalPages = Math.ceil(
    filteredSessions.length / itemsPerPage,
  );

  const paginatedSessions = useMemo(() => {
    const startIndex =
      (currentPage - 1) * itemsPerPage;

    return filteredSessions.slice(
      startIndex,
      startIndex + itemsPerPage,
    );
  }, [filteredSessions, currentPage]);

  // =========================
  // Helpers
  // =========================
  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("ar-EG", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleOpenDetails = (session) => {
    setSelectSession(session);
    setOpenDetails(true);
  };

  const handleSearch = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (value) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const handleEdit = (session) => {
    setSelectSession(session);

    if (setOpenUpdateSession) {
      setOpenUpdateSession(true);
    }
  };

  const handleDelete = (session) => {
    setSelectSession(session);

    if (setOpenDeleteSession) {
      setOpenDeleteSession(true);
    }
  };

  return <>
  {openDetails && <Details selectSession={selectSession} openDetails={openDetails} setOpenDetails={setOpenDetails}/>}
{
    openUpdateSession && <UpdateSession selectSession={selectSession}/>
}
{
    openDeleteSession && <DeleteSession selectSession={selectSession}/>
}
    <div  className="w-full">
      {/* =========================
          Header
    
      ========================= */}
      <div className="flex flex-col gap-4 p-5 mb-4 border shadow-lg rounded-2xl border-slate-700/50 bg-slate-900">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">
              قائمة الجلسات
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              عرض وإدارة جميع جلسات القضايا
            </p>
          </div>

          {/* View Mode */}
          <div className="flex items-center p-1 border w-fit rounded-xl border-slate-700 bg-slate-800">
            <button
              type="button"
              onClick={() => setViewMode("table")}
              className={`flex h-9 w-10 items-center justify-center rounded-lg transition ${
                viewMode === "table"
                  ? "bg-cyan-500 text-white"
                  : "text-slate-400 hover:bg-slate-700 hover:text-white"
              }`}
              title="عرض الجدول"
            >
              <FaTable />
            </button>

            <button
              type="button"
              onClick={() => setViewMode("card")}
              className={`flex h-9 w-10 items-center justify-center rounded-lg transition ${
                viewMode === "card"
                  ? "bg-cyan-500 text-white"
                  : "text-slate-400 hover:bg-slate-700 hover:text-white"
              }`}
              title="عرض الكروت"
            >
              <FaThLarge />
            </button>
          </div>
        </div>

        {/* =========================
            Search + Filter
        ========================= */}
        <div className="flex flex-col gap-3 lg:flex-row">
          {/* Search */}
          <div className="relative flex-1">
            <FaSearch className="absolute text-sm -translate-y-1/2 right-4 top-1/2 text-slate-500" />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                handleSearch(e.target.value)
              }
              placeholder="ابحث باسم الجلسة أو القضية أو رقم القضية أو المحكمة..."
              className="w-full pl-4 text-sm text-white transition border outline-none h-11 rounded-xl border-slate-700 bg-slate-800 pr-11 placeholder:text-slate-500 focus:border-cyan-500"
            />
          </div>

          {/* Status */}
          <select
            value={statusFilter}
            onChange={(e) =>
              handleStatusChange(e.target.value)
            }
            className="px-4 text-sm text-white transition border outline-none h-11 rounded-xl border-slate-700 bg-slate-800 focus:border-cyan-500"
          >
            <option value="all">كل الحالات</option>
            <option value="scheduled">مجدولة</option>
            <option value="attended">تم الحضور</option>
            <option value="postponed">مؤجلة</option>
            <option value="completed">مكتملة</option>
            <option value="cancelled">ملغاة</option>
          </select>
        </div>
      </div>

      {/* =========================
          Content
      ========================= */}
      {paginatedSessions.length === 0 ? (
        <div className="px-6 py-16 text-center border shadow-lg rounded-2xl border-slate-700/50 bg-slate-900">
          <div className="flex items-center justify-center mx-auto mb-4 h-14 w-14 rounded-2xl bg-slate-800 text-slate-500">
            <FaInbox className="text-xl" />
          </div>

          <h3 className="text-lg font-bold text-white">
            لا توجد جلسات
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            لم يتم العثور على جلسات مطابقة للبحث أو الفلتر الحالي
          </p>
        </div>
      ) : viewMode === "table" ? (
        /* =========================
            TABLE
        ========================= */
        <div className="overflow-hidden border shadow-lg rounded-2xl border-slate-700/50 bg-slate-900">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] text-right">
              <thead>
                <tr className="border-b border-slate-700/60 bg-slate-800/50">
                  <th className="px-5 py-4 text-xs font-semibold whitespace-nowrap text-slate-400">
                    الجلسة
                  </th>

                  <th className="px-5 py-4 text-xs font-semibold whitespace-nowrap text-slate-400">
                    القضية
                  </th>

                  <th className="px-5 py-4 text-xs font-semibold whitespace-nowrap text-slate-400">
                    المحكمة
                  </th>

                  <th className="px-5 py-4 text-xs font-semibold whitespace-nowrap text-slate-400">
                    التاريخ
                  </th>

                  <th className="px-5 py-4 text-xs font-semibold whitespace-nowrap text-slate-400">
                    الوقت
                  </th>

                  <th className="px-5 py-4 text-xs font-semibold whitespace-nowrap text-slate-400">
                    الحالة
                  </th>

                  <th className="px-5 py-4 text-xs font-semibold whitespace-nowrap text-slate-400">
                    الإجراءات
                  </th>
                </tr>
              </thead>

              <tbody>
                {paginatedSessions.map((session) => {
                  const status =
                    statusConfig[session?.status] || {
                      label: session?.status || "-",
                      className:
                        "border-slate-600 bg-slate-700/30 text-slate-400",
                    };

                  return (
                    <tr
                      key={session._id}
                      className="transition border-b border-slate-800 hover:bg-slate-800/40"
                    >
                      {/* Session */}
                      <td className="px-5 py-4">
                        <button
                          type="button"
                          onClick={() =>
                            handleOpenDetails(session)
                          }
                          className="text-right"
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-10 h-10 shrink-0 rounded-xl bg-cyan-500/10 text-cyan-400">
                              <FaCalendarAlt />
                            </div>

                            <div>
                              <p className="max-w-[180px] truncate text-sm font-semibold text-white">
                                {session?.title || "-"}
                              </p>

                              <p className="mt-1 text-xs text-slate-500">
                                اضغط للتفاصيل
                              </p>
                            </div>
                          </div>
                        </button>
                      </td>

                      {/* Case */}
                      <td className="px-5 py-4">
                        <p className="max-w-[180px] truncate text-sm text-slate-300">
                          {session?.caseId?.title || "-"}
                        </p>

                        <p className="mt-1 text-xs text-cyan-400">
                          {session?.caseId?.caseNumber || "-"}
                        </p>
                      </td>

                      {/* Court */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2 text-sm text-slate-300">
                          <FaGavel className="text-xs text-slate-500" />
                          {session?.caseId?.court || "-"}
                        </div>
                      </td>

                      {/* Date */}
                      <td className="px-5 py-4 whitespace-nowrap">
                        <p className="text-sm text-slate-300">
                          {formatDate(session?.sessionDate)}
                        </p>
                      </td>

                      {/* Time */}
                      <td className="px-5 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2 text-sm text-slate-300">
                          <FaClock className="text-xs text-slate-500" />
                          {session?.sessionTime || "-"}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full border px-3 py-1.5 text-xs font-medium ${status.className}`}
                        >
                          {status.label}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() =>{
                                setSelectSession(session);
                                setOpenDetails(true)
                            }
                            }
                            className="flex items-center justify-center transition rounded-lg h-9 w-9 bg-slate-800 text-slate-400 hover:bg-cyan-500/10 hover:text-cyan-400"
                            title="التفاصيل"
                          >
                            <FaEye />
                          </button>

                          <button
                            type="button"
                    onClick={() =>{
                        setSelectSession(session)
                        setOpenUpdateSession(true)
                    }}
                            className="flex items-center justify-center transition rounded-lg h-9 w-9 bg-slate-800 text-slate-400 hover:bg-blue-500/10 hover:text-blue-400"
                            title="تعديل"
                          >
                            <FaEdit />
                          </button>

                          <button
                            type="button"
                            onClick={() =>{
                                setSelectSession(session)
                                setOpenDeleteSession(true)
                            }
                              
                            }
                            className="flex items-center justify-center transition rounded-lg h-9 w-9 bg-slate-800 text-slate-400 hover:bg-red-500/10 hover:text-red-400"
                            title="حذف"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* =========================
            CARD VIEW
        ========================= */
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {paginatedSessions.map((session) => {
            const status =
              statusConfig[session?.status] || {
                label: session?.status || "-",
                className:
                  "border-slate-600 bg-slate-700/30 text-slate-400",
              };

            return (
              <div
                key={session._id}
                className="p-5 transition border shadow-lg rounded-2xl border-slate-700/50 bg-slate-900 hover:border-slate-600"
              >
                {/* Card Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center h-11 w-11 shrink-0 rounded-xl bg-cyan-500/10 text-cyan-400">
                      <FaCalendarAlt />
                    </div>

                    <div>
                      <h3 className="max-w-[180px] truncate text-sm font-bold text-white">
                        {session?.title || "-"}
                      </h3>

                      <p className="mt-1 text-xs text-slate-500">
                        {session?.caseId?.caseNumber || "-"}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`shrink-0 rounded-full border px-2.5 py-1 text-[11px] font-medium ${status.className}`}
                  >
                    {status.label}
                  </span>
                </div>

                {/* Case */}
                <div className="p-3 mt-5 rounded-xl bg-slate-800/60">
                  <p className="text-xs text-slate-500">
                    القضية
                  </p>

                  <p className="mt-1 text-sm font-medium truncate text-slate-200">
                    {session?.caseId?.title || "-"}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {session?.caseId?.court || "-"}
                  </p>
                </div>

                {/* Date */}
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="p-3 border rounded-xl border-slate-800">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <FaCalendarAlt />
                      التاريخ
                    </div>

                    <p className="mt-1 text-sm font-medium text-slate-200">
                      {formatDate(session?.sessionDate)}
                    </p>
                  </div>

                  <div className="p-3 border rounded-xl border-slate-800">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <FaClock />
                      الوقت
                    </div>

                    <p className="mt-1 text-sm font-medium text-slate-200">
                      {session?.sessionTime || "-"}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-4">
                  <button
                    type="button"
                    onClick={() =>{
                                setSelectSession(session);
                                setOpenDetails(true)
                            }
                            }
                    className="flex items-center justify-center flex-1 h-10 gap-2 text-xs font-medium transition rounded-xl bg-slate-800 text-slate-300 hover:bg-cyan-500/10 hover:text-cyan-400"
                  >
                    <FaEye />
                    التفاصيل
                  </button>

                  <button
                    type="button"
                    onClick={() =>{
                        setSelectSession(session)
                        setOpenUpdateSession(true)
                    }}
                    className="flex items-center justify-center w-10 h-10 transition rounded-xl bg-slate-800 text-slate-400 hover:bg-blue-500/10 hover:text-blue-400"
                    title="تعديل"
                  >
                    <FaEdit />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(session)}
                    className="flex items-center justify-center w-10 h-10 transition rounded-xl bg-slate-800 text-slate-400 hover:bg-red-500/10 hover:text-red-400"
                    title="حذف"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* =========================
          Pagination
      ========================= */}
      {totalPages > 1 && (
        <div className="flex flex-col gap-3 p-4 mt-5 border rounded-2xl border-slate-700/50 bg-slate-900 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">
            عرض{" "}
            <span className="font-medium text-slate-300">
              {(currentPage - 1) * itemsPerPage + 1}
            </span>{" "}
            إلى{" "}
            <span className="font-medium text-slate-300">
              {Math.min(
                currentPage * itemsPerPage,
                filteredSessions.length,
              )}
            </span>{" "}
            من{" "}
            <span className="font-medium text-slate-300">
              {filteredSessions.length}
            </span>{" "}
            جلسة
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage((prev) => prev - 1)
              }
              className="flex items-center justify-center transition border rounded-lg h-9 w-9 border-slate-700 bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              <FaChevronRight className="text-xs" />
            </button>

            <div className="flex items-center justify-center px-3 text-sm font-semibold text-white rounded-lg h-9 min-w-9 bg-cyan-500">
              {currentPage}
            </div>

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((prev) => prev + 1)
              }
              className="flex items-center justify-center transition border rounded-lg h-9 w-9 border-slate-700 bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              <FaChevronLeft className="text-xs" />
            </button>
          </div>
        </div>
      )}


    </div>  </>
 
};

export default Table;

