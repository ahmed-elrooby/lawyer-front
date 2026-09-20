"use client";

import React, { useContext } from "react";
import {
  LuX,
  LuCalendarDays,
  LuScale,
  LuBuilding2,
  LuUser,
  LuUsers,
  LuFileText,
  LuClock3,
  LuTrash2,
  LuExternalLink,
  LuImage,
  LuLoaderCircle,
  LuHistory,
} from "react-icons/lu";

import { OwnerContext } from "../../../../../Providers/LawyerOwner/OwnerProvider.js";
import { useQuery } from "@tanstack/react-query";

const STATUS_LABELS = {
  active: "قيد النظر",
  reserved_for_judgment: "محجوزة للحكم",
  judged: "تم الحكم",
};

const STATUS_STYLES = {
  active: "bg-[#E5EEFF] text-[#315DAA]",
  reserved_for_judgment: "bg-[#F3E8FF] text-[#7E22CE]",
  judged: "bg-[#E8F5EC] text-[#31804A]",
};

const getDate = (date) => {
  if (!date) return "غير محدد";

  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const getDateTime = (date) => {
  if (!date) return "غير محدد";

  return new Date(date).toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const Details = ({ selectCase, openDetails, setOpenDetails }) => {
  const {
    handleDeleteDocumentOfCaseFun,
    getTimeline,
  } = useContext(OwnerContext);

  const { data: timelineData, isLoading: timelineLoading } = useQuery({
    queryKey: ["timeline", selectCase?._id],
    queryFn: () => getTimeline(selectCase._id),
    enabled: Boolean(openDetails && selectCase?._id),
  });
  if (!openDetails || !selectCase) return null;

  const client =
    selectCase.clientId &&
    typeof selectCase.clientId === "object"
      ? selectCase.clientId
      : selectCase.client || null;

  const lawyers = Array.isArray(selectCase.lawyers)
    ? selectCase.lawyers
    : [];

  const documents = Array.isArray(selectCase.documents)
    ? selectCase.documents
    : [];

 
  const timeline = Array.isArray(timelineData)
    ? timelineData
    : Array.isArray(timelineData?.timeline)
    ? timelineData.timeline
    : Array.isArray(timelineData?.data)
    ? timelineData.data
    : [];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-[2px]"
      onClick={() => setOpenDetails(false)}
    >
      <div
        className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        dir="rtl"
      >
        {/* ================= HEADER ================= */}
        <div className="flex shrink-0 items-center justify-between border-b border-[#E5EEFF] bg-white px-6 py-5">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E5EEFF] text-[#315DAA]">
                <LuScale size={22} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-[#0B1C30]">
                  تفاصيل القضية
                </h2>

                <p className="mt-1 text-sm text-[#586377]">
                  {selectCase.caseNumber || "رقم القضية غير محدد"}
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOpenDetails(false)}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F8FAFD] text-[#586377] transition hover:bg-[#EEF2F7] hover:text-[#0B1C30]"
          >
            <LuX size={21} />
          </button>
        </div>

        {/* ================= CONTENT ================= */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="space-y-6">
            {/* ================= CASE INFO ================= */}
            <div className="rounded-2xl border border-[#E5EEFF] bg-[#F8FAFD] p-5">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                <div>
                  <p className="text-xs font-medium text-[#586377]">
                    رقم القضية
                  </p>

                  <h3 className="mt-1 text-xl font-bold text-[#0B1C30]">
                    {selectCase.caseNumber || "غير محدد"}
                  </h3>
                </div>

                <span
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${
                    STATUS_STYLES[selectCase.status] ||
                    "bg-gray-100 text-gray-600"
                  }`}
                >
                  {STATUS_LABELS[selectCase.status] || "غير محدد"}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {/* المحكمة */}
                <div className="p-4 bg-white rounded-xl">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#E5EEFF] text-[#315DAA]">
                    <LuBuilding2 size={19} />
                  </div>

                  <p className="text-xs text-[#586377]">المحكمة</p>

                  <p className="mt-1 font-semibold text-[#0B1C30]">
                    {selectCase.court || "غير محدد"}
                  </p>
                </div>

                {/* تاريخ التسجيل */}
                <div className="p-4 bg-white rounded-xl">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#E5EEFF] text-[#315DAA]">
                    <LuCalendarDays size={19} />
                  </div>

                  <p className="text-xs text-[#586377]">
                    تاريخ تسجيل القضية
                  </p>

                  <p className="mt-1 font-semibold text-[#0B1C30]">
                    {getDate(selectCase.filingDate)}
                  </p>
                </div>

                {/* الجلسة القادمة */}
                <div className="p-4 bg-white rounded-xl">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#E5EEFF] text-[#315DAA]">
                    <LuClock3 size={19} />
                  </div>

                  <p className="text-xs text-[#586377]">
                    الجلسة القادمة
                  </p>

                  <p className="mt-1 font-semibold text-[#0B1C30]">
                    {getDate(selectCase.nextHearingDate)}
                  </p>
                </div>

                {/* نوع القضية */}
                <div className="p-4 bg-white rounded-xl">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#E5EEFF] text-[#315DAA]">
                    <LuScale size={19} />
                  </div>

                  <p className="text-xs text-[#586377]">
                    نوع القضية
                  </p>

                  <p className="mt-1 font-semibold text-[#0B1C30]">
                    {selectCase.caseTypeId?.name || "غير محدد"}
                  </p>
                </div>
              </div>
            </div>

            {/* ================= CLIENT + LAWYERS ================= */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* CLIENT */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <LuUser
                    size={18}
                    className="text-[#315DAA]"
                  />

                  <h3 className="font-bold text-[#0B1C30]">
                    صاحب القضية
                  </h3>
                </div>

                <div className="h-full rounded-2xl border border-[#E5EEFF] bg-white p-4">
                  {client ? (
                    <div className="flex items-center gap-3">
                      {client.profileImage?.url ? (
                        <img
                          src={client.profileImage.url}
                          alt={client.name || "العميل"}
                          className="object-cover rounded-full h-14 w-14"
                        />
                      ) : (
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#E5EEFF] text-lg font-bold text-[#315DAA]">
                          {client.name?.charAt(0) || "ع"}
                        </div>
                      )}

                      <div className="min-w-0">
                        <p className="truncate font-bold text-[#0B1C30]">
                          {client.name || "غير محدد"}
                        </p>

                        {client.phone && (
                          <p className="mt-1 text-sm text-[#586377]">
                            {client.phone}
                          </p>
                        )}

                        {client.email && (
                          <p className="mt-1 truncate text-xs text-[#7A8494]">
                            {client.email}
                          </p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="flex min-h-[80px] items-center justify-center text-sm text-[#586377]">
                      لا يوجد عميل مرتبط بالقضية
                    </div>
                  )}
                </div>
              </div>

              {/* LAWYERS */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <LuUsers
                    size={18}
                    className="text-[#315DAA]"
                  />

                  <h3 className="font-bold text-[#0B1C30]">
                    المحامون
                  </h3>
                </div>

                <div className="rounded-2xl border border-[#E5EEFF] bg-white p-4">
                  {lawyers.length > 0 ? (
                    <div className="space-y-3">
                      {lawyers.map((lawyer) => (
                        <div
                          key={lawyer._id}
                          className="flex items-center gap-3 rounded-xl bg-[#F8FAFD] p-3"
                        >
                          {lawyer?.profileImage?.url ? (
                            <img
                              src={lawyer.profileImage.url}
                              alt={lawyer.name || "المحامي"}
                              className="object-cover rounded-full h-11 w-11 shrink-0"
                            />
                          ) : (
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E5EEFF] font-bold text-[#315DAA]">
                              {lawyer?.name?.charAt(0) || "م"}
                            </div>
                          )}

                          <div className="min-w-0">
                            <p className="truncate font-semibold text-[#0B1C30]">
                              {lawyer?.name || "غير محدد"}
                            </p>

                            {lawyer?.phone && (
                              <p className="mt-1 text-xs text-[#586377]">
                                {lawyer.phone}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex min-h-[80px] items-center justify-center text-sm text-[#586377]">
                      لا يوجد محامون مرتبطون بالقضية
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* ================= DESCRIPTION / NOTES ================= */}
            {(selectCase.description || selectCase.notes) && (
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {selectCase.description && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <LuFileText
                        size={18}
                        className="text-[#315DAA]"
                      />

                      <h3 className="font-bold text-[#0B1C30]">
                        وصف القضية
                      </h3>
                    </div>

                    <div className="rounded-2xl border border-[#E5EEFF] bg-[#F8FAFD] p-4">
                      <p className="whitespace-pre-wrap text-sm leading-7 text-[#45464D]">
                        {selectCase.description}
                      </p>
                    </div>
                  </div>
                )}

                {selectCase.notes && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <LuFileText
                        size={18}
                        className="text-[#315DAA]"
                      />

                      <h3 className="font-bold text-[#0B1C30]">
                        ملاحظات
                      </h3>
                    </div>

                    <div className="rounded-2xl border border-[#E5EEFF] bg-[#F8FAFD] p-4">
                      <p className="whitespace-pre-wrap text-sm leading-7 text-[#45464D]">
                        {selectCase.notes}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ================= DOCUMENTS ================= */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <LuFileText
                    size={18}
                    className="text-[#315DAA]"
                  />

                  <h3 className="font-bold text-[#0B1C30]">
                    مستندات القضية
                  </h3>
                </div>

                <span className="rounded-full bg-[#E5EEFF] px-3 py-1 text-xs font-semibold text-[#315DAA]">
                  {documents.length} مستند
                </span>
              </div>

              <div className="rounded-2xl border border-[#E5EEFF] bg-white p-4">
                {documents.length > 0 ? (
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {documents.map((document) => (
                      <div
                        key={document._id}
                        className="group flex items-center gap-3 rounded-xl border border-[#E5EEFF] bg-[#F8FAFD] p-3 transition hover:border-[#BFD2F2]"
                      >
                        {/* Preview */}
                        {document.fileType === "image" ? (
                          <a
                            href={document.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-[#E5EEFF] bg-white"
                          >
                            <img
                              src={document.url}
                              alt={document.name}
                              className="object-cover w-full h-full transition group-hover:scale-105"
                            />

                            <div className="absolute inset-0 flex items-center justify-center transition bg-black/0 group-hover:bg-black/20">
                              <LuExternalLink
                                size={16}
                                className="text-white transition opacity-0 group-hover:opacity-100"
                              />
                            </div>
                          </a>
                        ) : (
                          <a
                            href={document.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border border-[#E5EEFF] bg-white text-[#315DAA]"
                          >
                            <LuFileText size={25} />
                          </a>
                        )}

                        {/* Document info */}
                        <div className="flex-1 min-w-0">
                          <p
                            title={document.name}
                            className="truncate text-sm font-semibold text-[#0B1C30]"
                          >
                            {document.name || "مستند"}
                          </p>

                          <p className="mt-1 text-xs text-[#7A8494]">
                            {document.fileType === "image"
                              ? "صورة"
                              : "ملف"}
                          </p>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-1 shrink-0">
                          <a
                            href={document.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="فتح المستند"
                            className="flex h-9 w-9 items-center justify-center rounded-lg text-[#315DAA] transition hover:bg-[#E5EEFF]"
                          >
                            <LuExternalLink size={17} />
                          </a>

                          <button
                            type="button"
                            title="حذف المستند"
                            onClick={() =>
                              handleDeleteDocumentOfCaseFun({
                                caseId: selectCase._id,
                                documentId: document._id,
                              })
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-lg text-[#C94A4A] transition hover:bg-[#FFF1F1]"
                          >
                            <LuTrash2 size={17} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-10 text-center">
                    <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#F8FAFD] text-[#8A94A5]">
                      <LuFileText size={25} />
                    </div>

                    <p className="font-semibold text-[#45464D]">
                      لا توجد مستندات
                    </p>

                    <p className="mt-1 text-xs text-[#8A94A5]">
                      لم يتم رفع أي مستندات لهذه القضية
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* ================= TIMELINE ================= */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <LuHistory
                  size={19}
                  className="text-[#315DAA]"
                />

                <h3 className="font-bold text-[#0B1C30]">
                  الخط الزمني للقضية
                </h3>
              </div>

              <div className="rounded-2xl border border-[#E5EEFF] bg-white p-5">
                {timelineLoading ? (
                  <div className="flex flex-col items-center justify-center py-10">
                    <LuLoaderCircle
                      size={28}
                      className="animate-spin text-[#315DAA]"
                    />

                    <p className="mt-3 text-sm text-[#586377]">
                      جاري تحميل الخط الزمني...
                    </p>
                  </div>
                ) : timeline.length > 0 ? (
                  <div className="relative">
                    {/* الخط */}
                    <div className="absolute right-[15px] top-3 bottom-3 w-px bg-[#DCE5F3]" />

                    <div className="space-y-6">
                      {timeline.map((event, index) => {
                        const eventDate =
                          event.createdAt ||
                          event.date ||
                          event.created_at;

                        const eventTitle =
                          event.title ||
                          event.action ||
                          event.type ||
                          "تحديث على القضية";

                        const eventDescription =
                          event.description ||
                          event.message ||
                          event.details ||
                          "";

                        return (
                          <div
                            key={
                              event._id ||
                              event.id ||
                              `${eventDate}-${index}`
                            }
                            className="relative flex gap-4"
                          >
                            {/* نقطة */}
                            <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-4 border-white bg-[#315DAA] shadow-sm">
                              <div className="h-1.5 w-1.5 rounded-full bg-white" />
                            </div>

                            {/* المحتوى */}
                            <div className="min-w-0 flex-1 rounded-xl bg-[#F8FAFD] p-4">
                              <div className="flex flex-wrap items-start justify-between gap-2">
                                <h4 className="font-semibold text-[#0B1C30]">
                                  {eventTitle}
                                </h4>

                                <span className="text-xs text-[#7A8494]">
                                  {getDateTime(eventDate)}
                                </span>
                              </div>

                              {eventDescription && (
                                <p className="mt-2 text-sm leading-6 text-[#586377]">
                                  {eventDescription}
                                </p>
                              )}

                              {event.user?.name && (
                                <p className="mt-2 text-xs text-[#8A94A5]">
                                  بواسطة:{" "}
                                  <span className="font-semibold">
                                    {event.user.name}
                                  </span>
                                </p>
                              )}

                              {event.createdBy?.name && (
                                <p className="mt-2 text-xs text-[#8A94A5]">
                                  بواسطة:{" "}
                                  <span className="font-semibold">
                                    {event.createdBy.name}
                                  </span>
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-10 text-center">
                    <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#F8FAFD] text-[#8A94A5]">
                      <LuHistory size={25} />
                    </div>

                    <p className="font-semibold text-[#45464D]">
                      لا يوجد نشاط حتى الآن
                    </p>

                    <p className="mt-1 text-xs text-[#8A94A5]">
                      لم يتم تسجيل أي أحداث لهذه القضية
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ================= FOOTER ================= */}
        <div className="shrink-0 border-t border-[#E5EEFF] bg-[#F8FAFD] px-6 py-4">
          <button
            type="button"
            onClick={() => setOpenDetails(false)}
            className="w-full rounded-xl bg-[#0B1C30] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#142A42]"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};

export default Details;