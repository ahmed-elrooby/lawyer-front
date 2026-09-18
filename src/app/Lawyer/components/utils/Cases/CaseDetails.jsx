"use client";

import React, { useContext } from "react";
import {
  FaTimes,
  FaGavel,
  FaUser,
  FaCalendarAlt,
  FaUniversity,
  FaFileAlt,
  FaStickyNote,
  FaClock,
  FaHistory,
  FaPaperclip,
  FaEdit,
  FaTrash,
  FaPlusCircle,
  FaCalendarCheck,
  FaEye,
} from "react-icons/fa";

import { LawyerContext } from "../../../../../Providers/LawyerContext/lawyer.js";

const CaseDetails = ({
  selectCase,
  setOpenDetails,
  openDetails,
  timeline = [],
}) => {
  const { deleteCaseDocument,handleDeleteDocumentOfCaseFun } = useContext(LawyerContext);

  if (!openDetails || !selectCase) {
    return null;
  }

  // ==========================================
  // STATUS
  // ==========================================

  const getStatus = (status) => {
    switch (status) {
      case "active":
        return {
          label: "نشطة",
          className: "bg-emerald-500/10 text-emerald-400",
        };

      case "reserved_for_judgment":
        return {
          label: "محجوزة للحكم",
          className: "bg-amber-500/10 text-amber-400",
        };

      case "judged":
        return {
          label: "تم الحكم",
          className: "bg-blue-500/10 text-blue-400",
        };

      default:
        return {
          label: "غير محددة",
          className: "bg-slate-500/10 text-slate-400",
        };
    }
  };

  const status = getStatus(selectCase.status);

  // ==========================================
  // DATE FORMAT
  // ==========================================

  const formatDate = (date) => {
    if (!date) return "غير محدد";

    return new Date(date).toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // ==========================================
  // DATETIME FORMAT
  // ==========================================

  const formatDateTime = (date) => {
    if (!date) return "غير محدد";

    return new Date(date).toLocaleString("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // ==========================================
  // FILTER TIMELINE FOR CURRENT CASE
  // ==========================================

  const caseTimeline = timeline.filter((item) => {
    const timelineCaseId = item?.caseId?._id || item?.caseId;

    return String(timelineCaseId) === String(selectCase?._id);
  });

  // ==========================================
  // TIMELINE EVENT
  // ==========================================

  const getTimelineEvent = (type) => {
    switch (type) {
      case "case_created":
        return {
          label: "إنشاء القضية",
          icon: FaPlusCircle,
          iconClass: "text-emerald-400",
          bgClass: "bg-emerald-500/10",
        };

      case "case_updated":
        return {
          label: "تعديل القضية",
          icon: FaEdit,
          iconClass: "text-blue-400",
          bgClass: "bg-blue-500/10",
        };

      case "session_created":
        return {
          label: "إضافة جلسة",
          icon: FaCalendarCheck,
          iconClass: "text-purple-400",
          bgClass: "bg-purple-500/10",
        };

      case "session_updated":
        return {
          label: "تعديل الجلسة",
          icon: FaCalendarAlt,
          iconClass: "text-amber-400",
          bgClass: "bg-amber-500/10",
        };

      case "attachment_uploaded":
        return {
          label: "رفع مستند",
          icon: FaPaperclip,
          iconClass: "text-cyan-400",
          bgClass: "bg-cyan-500/10",
        };

      case "attachment_deleted":
        return {
          label: "حذف مستند",
          icon: FaTrash,
          iconClass: "text-red-400",
          bgClass: "bg-red-500/10",
        };

      case "note_created":
        return {
          label: "إضافة ملاحظة",
          icon: FaStickyNote,
          iconClass: "text-emerald-400",
          bgClass: "bg-emerald-500/10",
        };

      case "note_updated":
        return {
          label: "تعديل ملاحظة",
          icon: FaEdit,
          iconClass: "text-blue-400",
          bgClass: "bg-blue-500/10",
        };

      case "note_deleted":
        return {
          label: "حذف ملاحظة",
          icon: FaTrash,
          iconClass: "text-red-400",
          bgClass: "bg-red-500/10",
        };

      default:
        return {
          label: "نشاط",
          icon: FaHistory,
          iconClass: "text-slate-400",
          bgClass: "bg-slate-500/10",
        };
    }
  };

  // ==========================================
  // DELETE DOCUMENT
  // ==========================================

  

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={() => setOpenDetails(false)}
    >
      <div
        className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ==========================================
            HEADER
        ========================================== */}

        <div className="flex items-center justify-between px-6 py-5 border-b shrink-0 border-slate-700 bg-slate-800/90">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400">
              <FaGavel className="text-lg" />
            </div>

            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-bold text-white">
                  تفاصيل القضية
                </h2>

                <span
                  className={`rounded-lg px-2.5 py-1 text-[10px] font-semibold ${status.className}`}
                >
                  {status.label}
                </span>
              </div>

              <p className="mt-1 text-xs text-slate-400">
                رقم القضية:{" "}
                <span className="font-semibold text-slate-300">
                  {selectCase.caseNumber || "—"}
                </span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOpenDetails(false)}
            className="flex items-center justify-center transition-colors h-9 w-9 rounded-xl text-slate-400 hover:bg-slate-700 hover:text-white"
          >
            <FaTimes />
          </button>
        </div>

        {/* ==========================================
            CONTENT
        ========================================== */}

        <div className="flex-1 min-h-0 overflow-y-auto add-case-scrollbar">
          <div className="p-6 space-y-5">

            {/* ==========================================
                BASIC INFORMATION
            ========================================== */}

            <section>
              <div className="flex items-center gap-2 mb-3">
                <FaGavel className="text-xs text-emerald-400" />

                <h3 className="text-sm font-bold text-white">
                  البيانات الأساسية
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <InfoItem
                  label="رقم القضية"
                  value={selectCase.caseNumber}
                  icon={<FaGavel />}
                />

                <InfoItem
                  label="المحكمة"
                  value={selectCase.court}
                  icon={<FaUniversity />}
                />

                <InfoItem
                  label="حالة القضية"
                  value={status.label}
                  icon={<FaGavel />}
                />

                <InfoItem
                  label="عدد المستندات"
                  value={`${selectCase.documents?.length || 0} مستند`}
                  icon={<FaFileAlt />}
                />
              </div>
            </section>

            {/* ==========================================
                CLIENT
            ========================================== */}

            <section>
              <div className="flex items-center gap-2 mb-3">
                <FaUser className="text-xs text-emerald-400" />

                <h3 className="text-sm font-bold text-white">
                  بيانات العميل
                </h3>
              </div>

              <div className="p-4 border rounded-xl border-slate-700 bg-slate-800/30">
                <div className="flex items-center gap-3">
                  {selectCase.clientId?.profileImage?.url ? (
                    <img
                      src={selectCase.clientId.profileImage.url}
                      alt={selectCase.clientId?.name || "العميل"}
                      className="object-cover rounded-full h-11 w-11"
                    />
                  ) : (
                    <div className="flex items-center justify-center rounded-full h-11 w-11 bg-emerald-500/10 text-emerald-400">
                      <FaUser />
                    </div>
                  )}

                  <div>
                    <p className="text-[10px] text-slate-500">
                      اسم العميل
                    </p>

                    <p className="mt-1 text-sm font-semibold text-white">
                      {selectCase.clientId?.name || "غير محدد"}
                    </p>
                  </div>
                </div>

                {selectCase.clientId?.phone && (
                  <div className="pt-4 mt-4 border-t border-slate-700/60">
                    <InfoItem
                      label="رقم الهاتف"
                      value={selectCase.clientId.phone}
                    />
                  </div>
                )}
              </div>
            </section>

            {/* ==========================================
                DATES
            ========================================== */}

            <section>
              <div className="flex items-center gap-2 mb-3">
                <FaCalendarAlt className="text-xs text-emerald-400" />

                <h3 className="text-sm font-bold text-white">
                  التواريخ
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <InfoItem
                  label="تاريخ رفع القضية"
                  value={formatDate(selectCase.filingDate)}
                  icon={<FaCalendarAlt />}
                />

                <InfoItem
                  label="الجلسة القادمة"
                  value={formatDate(selectCase.nextHearingDate)}
                  icon={<FaClock />}
                />
              </div>
            </section>

            {/* ==========================================
                DESCRIPTION
            ========================================== */}

            {selectCase.description && (
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <FaFileAlt className="text-xs text-emerald-400" />

                  <h3 className="text-sm font-bold text-white">
                    وصف القضية
                  </h3>
                </div>

                <div className="p-4 border rounded-xl border-slate-700 bg-slate-800/30">
                  <p className="text-sm leading-7 whitespace-pre-wrap text-slate-300">
                    {selectCase.description}
                  </p>
                </div>
              </section>
            )}

            {/* ==========================================
                NOTES
            ========================================== */}

            {selectCase.notes && (
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <FaStickyNote className="text-xs text-emerald-400" />

                  <h3 className="text-sm font-bold text-white">
                    الملاحظات
                  </h3>
                </div>

                <div className="p-4 border rounded-xl border-slate-700 bg-slate-800/30">
                  <p className="text-sm leading-7 whitespace-pre-wrap text-slate-300">
                    {selectCase.notes}
                  </p>
                </div>
              </section>
            )}

            {/* ==========================================
                DOCUMENTS
            ========================================== */}

            <section>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <FaFileAlt className="text-xs text-emerald-400" />

                  <h3 className="text-sm font-bold text-white">
                    مستندات القضية
                  </h3>
                </div>

                <span className="rounded-lg bg-slate-800 px-2.5 py-1 text-[10px] font-medium text-slate-400">
                  {selectCase.documents?.length || 0} مستند
                </span>
              </div>

              {selectCase.documents?.length > 0 ? (
                <div className="space-y-2">
                  {selectCase.documents.map((document) => (
                    <div
                      key={document._id}
                      className="flex items-center justify-between gap-3 p-3 border rounded-xl border-slate-700 bg-slate-800/30"
                    >
                      {/* Document Info */}

                      <div className="flex items-center min-w-0 gap-3">
                        <div className="flex items-center justify-center w-10 h-10 text-blue-400 rounded-lg shrink-0 bg-blue-500/10">
                          <FaFileAlt className="text-sm" />
                        </div>

                        <div className="min-w-0">
                          <p className="text-xs font-semibold truncate text-slate-200">
                            {document.name || "مستند بدون اسم"}
                          </p>

                          <p className="mt-1 text-[10px] text-slate-500 uppercase">
                            {document.fileType || "file"}
                          </p>
                        </div>
                      </div>

                      {/* Actions */}

                      <div className="flex items-center gap-2 shrink-0">
                        {/* View */}

                        <a
                          href={document.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center w-8 h-8 text-blue-400 transition-colors rounded-lg bg-blue-500/10 hover:bg-blue-500/20"
                          title="عرض المستند"
                        >
                          <FaEye className="text-xs" />
                        </a>

                        {/* Delete */}

                        <button
                          type="button"
                          onClick={() =>{
                            handleDeleteDocumentOfCaseFun({caseId: selectCase._id, documentId: document._id})
                          }
                          }
                          className="flex items-center justify-center w-8 h-8 text-red-400 transition-colors rounded-lg bg-red-500/10 hover:bg-red-500/20"
                          title="حذف المستند"
                        >
                          <FaTrash className="text-xs" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="px-4 py-8 text-center border border-dashed rounded-xl border-slate-700 bg-slate-800/20">
                  <div className="flex items-center justify-center mx-auto h-11 w-11 rounded-xl bg-slate-800 text-slate-500">
                    <FaFileAlt />
                  </div>

                  <p className="mt-3 text-sm font-medium text-slate-400">
                    لا توجد مستندات
                  </p>

                  <p className="mt-1 text-[11px] text-slate-600">
                    لم يتم إرفاق أي مستندات بهذه القضية
                  </p>
                </div>
              )}
            </section>

            {/* ==========================================
                LAWYERS
            ========================================== */}

            {selectCase.lawyers?.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <FaUser className="text-xs text-emerald-400" />

                  <h3 className="text-sm font-bold text-white">
                    المحامون المسؤولون
                  </h3>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {selectCase.lawyers.map((lawyer) => (
                    <div
                      key={lawyer?._id}
                      className="flex items-center gap-3 p-3 border rounded-xl border-slate-700 bg-slate-800/30"
                    >
                      {lawyer?.profileImage?.url ? (
                        <img
                          src={lawyer.profileImage.url}
                          alt={lawyer?.name || "المحامي"}
                          className="object-cover rounded-full h-9 w-9"
                        />
                      ) : (
                        <div className="flex items-center justify-center rounded-full h-9 w-9 bg-slate-700 text-slate-400">
                          <FaUser className="text-xs" />
                        </div>
                      )}

                      <div className="min-w-0">
                        <p className="text-xs font-semibold truncate text-slate-200">
                          {lawyer?.name || "محامي"}
                        </p>

                        {lawyer?.email && (
                          <p className="mt-0.5 truncate text-[10px] text-slate-500">
                            {lawyer.email}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ==========================================
                TIMELINE
            ========================================== */}

            <section>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <FaHistory className="text-xs text-emerald-400" />

                  <h3 className="text-sm font-bold text-white">
                    السجل الزمني للقضية
                  </h3>
                </div>

                <span className="rounded-lg bg-slate-800 px-2.5 py-1 text-[10px] font-medium text-slate-400">
                  {caseTimeline.length} نشاط
                </span>
              </div>

              {caseTimeline.length > 0 ? (
                <div className="p-4 border rounded-xl border-slate-700 bg-slate-800/30">
                  <div className="relative space-y-4">
                    {caseTimeline.map((item, index) => {
                      const event = getTimelineEvent(item.type);
                      const Icon = event.icon;

                      return (
                        <div
                          key={item._id}
                          className="relative flex gap-3"
                        >
                          {/* Line */}

                          {index !== caseTimeline.length - 1 && (
                            <div className="absolute right-[17px] top-10 h-[calc(100%+1rem)] w-px bg-slate-700" />
                          )}

                          {/* Icon */}

                          <div
                            className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${event.bgClass}`}
                          >
                            <Icon
                              className={`text-xs ${event.iconClass}`}
                            />
                          </div>

                          {/* Content */}

                          <div className="flex-1 min-w-0 p-3 border rounded-xl border-slate-700/70 bg-slate-900/50">
                            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                              <div>
                                <div className="flex flex-wrap items-center gap-2">
                                  <p className="text-xs font-bold text-slate-200">
                                    {item.title || event.label}
                                  </p>

                                  <span
                                    className={`rounded-md px-2 py-0.5 text-[9px] font-medium ${event.bgClass} ${event.iconClass}`}
                                  >
                                    {event.label}
                                  </span>
                                </div>

                                {item.description && (
                                  <p className="mt-1.5 text-[11px] leading-6 text-slate-400">
                                    {item.description}
                                  </p>
                                )}
                              </div>

                              <div className="flex shrink-0 items-center gap-1 text-[9px] text-slate-500">
                                <FaClock />

                                <span>
                                  {formatDateTime(item.createdAt)}
                                </span>
                              </div>
                            </div>

                            {/* Created By */}

                            {item.createdBy && (
                              <div className="flex items-center gap-2 pt-3 mt-3 border-t border-slate-700/60">
                                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-700 text-slate-400">
                                  <FaUser className="text-[9px]" />
                                </div>

                                <div>
                                  <p className="text-[9px] text-slate-500">
                                    بواسطة
                                  </p>

                                  <p className="text-[10px] font-medium text-slate-300">
                                    {item.createdBy?.name || "مستخدم"}
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="px-4 py-8 text-center border border-dashed rounded-xl border-slate-700 bg-slate-800/20">
                  <div className="flex items-center justify-center mx-auto h-11 w-11 rounded-xl bg-slate-800 text-slate-500">
                    <FaHistory />
                  </div>

                  <p className="mt-3 text-sm font-medium text-slate-400">
                    لا يوجد سجل زمني
                  </p>

                  <p className="mt-1 text-[11px] text-slate-600">
                    لم يتم تسجيل أي أنشطة لهذه القضية حتى الآن
                  </p>
                </div>
              )}
            </section>
          </div>
        </div>

        {/* ==========================================
            FOOTER
        ========================================== */}

        <div className="flex items-center justify-between px-6 py-4 border-t shrink-0 border-slate-700 bg-slate-800/90">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <FaClock />

            <span>
              آخر تحديث:{" "}
              {selectCase.updatedAt
                ? formatDate(selectCase.updatedAt)
                : "—"}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setOpenDetails(false)}
            className="rounded-xl border border-slate-700 px-5 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// INFO ITEM
// ==========================================

const InfoItem = ({ label, value, icon }) => {
  return (
    <div className="p-4 border rounded-xl border-slate-700 bg-slate-800/30">
      <div className="flex items-center gap-2 mb-2 text-slate-500">
        {icon && (
          <span className="text-[10px]">
            {icon}
          </span>
        )}

        <span className="text-[10px]">
          {label}
        </span>
      </div>

      <p className="text-sm font-semibold break-words text-slate-200">
        {value || "غير محدد"}
      </p>
    </div>
  );
};

export default CaseDetails;