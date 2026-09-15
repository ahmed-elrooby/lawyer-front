
"use client";

import React, { useContext, useMemo, useState } from "react";
import {
  FaEdit,
  FaTrash,
  FaStickyNote,
  FaGavel,
  FaUser,
  FaCalendarCheck,
  FaChevronRight,
  FaChevronLeft,
  FaPlus,
} from "react-icons/fa";

import { LawyerContext } from "../../../../../Providers/LawyerContext/lawyer.js";
import DeleteNote from "./DeleteNote.jsx";
import UpdateNote from "./UpdateNote.jsx";

const NotesList = () => {
  const {
    notes = [],
    setOpenAddNote,
    setOpenUpdateNote,
    openUpdateNote,
    setOpenDeleteNote,
    openDeleteNote
  } = useContext(LawyerContext);
const [selectNote,setSelectNote]=useState(null)
 const [openDetails,setOpenDetails]=useState(false)
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;

  const totalPages = Math.ceil(notes.length / itemsPerPage);

  const currentNotes = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;

    return notes.slice(startIndex, startIndex + itemsPerPage);
  }, [notes, currentPage]);

  const getName = (value, fallback = "غير محدد") => {
    if (!value) return fallback;

    if (typeof value === "object") {
      return (
        value.name ||
        value.title ||
        value.caseNumber ||
        fallback
      );
    }

    return value;
  };

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;

    setCurrentPage(page);
  };

  const pages = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  if (notes.length === 0) {
    return (
      <div className="mt-6 overflow-hidden border rounded-2xl border-slate-700/50 bg-slate-900">

        {/* Section Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-700/50">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-500/10">
              <FaStickyNote className="text-blue-400" />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white">
                الملاحظات
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                إدارة ومتابعة جميع الملاحظات
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOpenAddNote(true)}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            <FaPlus className="text-xs" />
            إضافة ملاحظة
          </button>
        </div>

        {/* Empty State */}
        <div className="px-6 text-center py-14">
          <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-2xl bg-slate-800">
            <FaStickyNote className="text-2xl text-slate-500" />
          </div>

          <h3 className="mt-5 text-lg font-semibold text-white">
            لا توجد ملاحظات
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            لم يتم إضافة أي ملاحظات حتى الآن
          </p>

          <button
            type="button"
            onClick={() => setOpenAddNote(true)}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            <FaPlus className="text-xs" />
            إضافة أول ملاحظة
          </button>
        </div>
      </div>
    );
  }

  return <>
  {
    openDeleteNote &&<DeleteNote selectNote={selectNote}/>
  }
 {
    openUpdateNote && <UpdateNote selectNote={selectNote}/>
 }
    <div className="mt-6 overflow-hidden border shadow-lg rounded-2xl border-slate-700/50 bg-slate-900 shadow-black/10">

      {/* Section Header */}
      <div className="flex flex-col gap-4 px-6 py-5 border-b border-slate-700/50 sm:flex-row sm:items-center sm:justify-between">

        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-500/10">
            <FaStickyNote className="text-blue-400" />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white">
              الملاحظات
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              جميع الملاحظات المسجلة في النظام
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">

          <span className="px-3 py-2 text-xs border rounded-lg border-slate-700 bg-slate-800 text-slate-400">
            {notes.length} ملاحظة
          </span>

          <button
            type="button"
            onClick={() => setOpenAddNote(true)}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            <FaPlus className="text-xs" />
            إضافة ملاحظة
          </button>

        </div>
      </div>

      {/* Notes Content */}
      <div className="p-6">

        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-sm font-semibold text-slate-200">
              قائمة الملاحظات
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              استعرض وعدّل الملاحظات الخاصة بالقضايا والجلسات
            </p>
          </div>

          <span className="text-xs text-slate-500">
            صفحة {currentPage} من {totalPages}
          </span>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {currentNotes.map((note) => (
            <div
              key={note._id}
              className="flex flex-col p-5 transition-all duration-300 border group rounded-2xl border-slate-700/50 bg-slate-800/30 hover:-translate-y-1 hover:border-slate-600 hover:bg-slate-800/50"
            >
              {/* Card Header */}
              <div className="flex items-start justify-between gap-3">

                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-500/10">
                    <FaStickyNote className="text-blue-400" />
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-white">
                      ملاحظة
                    </h3>

                    <p className="mt-1 text-xs text-slate-500">
                      {formatDate(note.createdAt)}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => {
                        setSelectNote(note)
                        setOpenUpdateNote(true)
                    }}
                    className="flex items-center justify-center w-8 h-8 transition rounded-lg text-slate-500 hover:bg-blue-500/10 hover:text-blue-400"
                    title="تعديل"
                  >
                    <FaEdit className="text-sm" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                        setSelectNote(note)
                        setOpenDeleteNote(true)
                    }}
                    className="flex items-center justify-center w-8 h-8 transition rounded-lg text-slate-500 hover:bg-red-500/10 hover:text-red-400"
                    title="حذف"
                  >
                    <FaTrash className="text-sm" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="mt-5 min-h-[110px]">
                <p className="text-sm leading-7 whitespace-pre-wrap text-slate-300">
                  {note.content}
                </p>
              </div>

              {/* Relations */}
              <div className="pt-4 mt-5 space-y-2 border-t border-slate-800">

                {/* Case */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0 bg-amber-500/10">
                    <FaGavel className="text-xs text-amber-400" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[11px] text-slate-500">
                      القضية
                    </p>

                    <p className="text-xs font-medium truncate text-slate-300">
                      {getName(note.caseId)}
                    </p>
                  </div>
                </div>

                {/* Client */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0 bg-emerald-500/10">
                    <FaUser className="text-xs text-emerald-400" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[11px] text-slate-500">
                      العميل
                    </p>

                    <p className="text-xs font-medium truncate text-slate-300">
                      {getName(note.clientId)}
                    </p>
                  </div>
                </div>

                {/* Session */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0 bg-purple-500/10">
                    <FaCalendarCheck className="text-xs text-purple-400" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[11px] text-slate-500">
                      الجلسة
                    </p>

                    <p className="text-xs font-medium truncate text-slate-300">
                      {getName(note.sessionId)}
                    </p>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col gap-4 px-6 py-5 border-t border-slate-700/50 bg-slate-950/30 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <p className="text-sm font-medium text-slate-300">
              صفحات الملاحظات
            </p>

            <p className="mt-1 text-xs text-slate-500">
              عرض{" "}
              {(currentPage - 1) * itemsPerPage + 1}
              {" "}إلى{" "}
              {Math.min(currentPage * itemsPerPage, notes.length)}
              {" "}من{" "}
              {notes.length}
              {" "}ملاحظة
            </p>
          </div>

          <div className="flex items-center gap-2">

            {/* Previous */}
            <button
              type="button"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center justify-center transition border rounded-lg h-9 w-9 border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <FaChevronRight className="text-xs" />
            </button>

            {/* Pages */}
            <div className="flex items-center gap-1">
              {pages.map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => handlePageChange(page)}
                  className={`flex h-9 min-w-9 items-center justify-center rounded-lg px-2 text-sm font-medium transition ${
                    currentPage === page
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                      : "border border-slate-700 bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            {/* Next */}
            <button
              type="button"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center justify-center transition border rounded-lg h-9 w-9 border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <FaChevronLeft className="text-xs" />
            </button>

          </div>
        </div>
      )}
    </div>
  </>
};

export default NotesList;

