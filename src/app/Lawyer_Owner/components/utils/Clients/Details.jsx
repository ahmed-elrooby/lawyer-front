import React, { useContext } from "react";
import {
  X,
  User,
  Phone,
  Mail,
  MapPin,
  FileText,
  CalendarDays,
  Users,
  ExternalLink,
  Trash2,
} from "lucide-react";

import { OwnerContext } from "../../../../../Providers/LawyerOwner/OwnerProvider.js";

const caseStatusLabels = {
  active: "قيد النظر",
  reserved_for_judgment: "محجوزة للحكم",
  judged: "صدر فيها حكم",
};

const caseStatusStyles = {
  active: {
    bg: "bg-[#eaf8ef]",
    text: "text-[#3d9561]",
  },
  reserved_for_judgment: {
    bg: "bg-[#fff7e6]",
    text: "text-[#c58a1b]",
  },
  judged: {
    bg: "bg-[#edf3ff]",
    text: "text-[#62718a]",
  },
};

const isImageDocument = (document) => {
  return (
    document?.fileType === "image" ||
    /\.(jpg|jpeg|png|webp)$/i.test(document?.url || "")
  );
};

const Details = ({
  selectedClient,
  openDetails,
  setOpenDetails,
}) => {
  const { handleDeleteClientDocumentFun } = useContext(OwnerContext);

  if (!openDetails || !selectedClient) {
    return null;
  }

  const clientName =
    selectedClient?.name ||
    selectedClient?.client ||
    "غير معروف";

  const clientImage =
    selectedClient?.profileImage?.url ||
    selectedClient?.clientImage ||
    "";

  const clientGender =
    selectedClient?.gender === "female"
      ? "عميلة"
      : "عميل";

  const isActive = selectedClient?.isActive;

  const cases = Array.isArray(selectedClient?.cases)
    ? selectedClient.cases
    : [];

  const documents = Array.isArray(selectedClient?.documents)
    ? selectedClient.documents
    : [];

  const lawyersMap = new Map();

  cases.forEach((caseItem) => {
    if (!Array.isArray(caseItem?.lawyers)) return;

    caseItem.lawyers.forEach((lawyerItem) => {
      if (!lawyerItem?._id) return;

      if (!lawyersMap.has(lawyerItem._id)) {
        lawyersMap.set(lawyerItem._id, lawyerItem);
      }
    });
  });

  const lawyers = Array.from(lawyersMap.values());

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4"
      dir="rtl"
    >
      <div className="w-full max-w-3xl overflow-hidden rounded-xl border border-[#e7ebf2] bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#e7ebf2] px-5 py-4">
          <div>
            <h2 className="text-[13px] font-bold text-[#111827]">
              تفاصيل العميل
            </h2>

            <p className="mt-1 text-[8px] text-[#8b95a7]">
              عرض جميع بيانات العميل والقضايا والمستندات
            </p>
          </div>

          <button
            type="button"
            onClick={() => setOpenDetails(false)}
            className="flex h-7 w-7 items-center justify-center rounded-md text-[#62718a] transition hover:bg-[#f4f6f8] hover:text-[#111827]"
          >
            <X size={15} />
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[75vh] overflow-y-auto px-5 py-5">
          {/* Client Main Card */}
          <div className="rounded-xl border border-[#e7ebf2] bg-[#fafbfc] p-4">
            <div className="flex items-center gap-3">
              {/* Image */}
              {clientImage ? (
                <img
                  src={clientImage}
                  alt={clientName}
                  className="h-12 w-12 rounded-full border border-[#e7ebf2] object-cover"
                />
              ) : (
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#111827] text-sm font-bold text-white">
                  {clientName?.charAt(0) || "ع"}
                </div>
              )}

              {/* Name */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="truncate text-[12px] font-bold text-[#111827]">
                    {clientName}
                  </h3>

                  <span
                    className={`rounded-full px-2 py-0.5 text-[7px] font-medium ${
                      isActive
                        ? "bg-[#eaf8ef] text-[#3d9561]"
                        : "bg-[#fff0f0] text-[#d84b4b]"
                    }`}
                  >
                    {isActive ? "نشط" : "غير نشط"}
                  </span>
                </div>

                <p className="mt-1 text-[8px] text-[#8b95a7]">
                  {clientGender}
                </p>
              </div>
            </div>
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 gap-2 mt-4 sm:grid-cols-2">
            {/* Phone */}
            <div className="rounded-lg border border-[#e7ebf2] bg-white p-3">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#edf3ff] text-[#315DAA]">
                  <Phone size={12} />
                </div>

                <div className="min-w-0">
                  <p className="text-[7px] text-[#8b95a7]">
                    رقم الهاتف
                  </p>

                  <p className="mt-1 truncate text-[9px] font-medium text-[#111827]">
                    {selectedClient?.phone || "غير محدد"}
                  </p>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="rounded-lg border border-[#e7ebf2] bg-white p-3">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#edf3ff] text-[#315DAA]">
                  <Mail size={12} />
                </div>

                <div className="min-w-0">
                  <p className="text-[7px] text-[#8b95a7]">
                    البريد الإلكتروني
                  </p>

                  <p className="mt-1 truncate text-[9px] font-medium text-[#111827]">
                    {selectedClient?.email || "غير محدد"}
                  </p>
                </div>
              </div>
            </div>

            {/* National ID */}
            <div className="rounded-lg border border-[#e7ebf2] bg-white p-3">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#edf3ff] text-[#315DAA]">
                  <User size={12} />
                </div>

                <div className="min-w-0">
                  <p className="text-[7px] text-[#8b95a7]">
                    الرقم القومي
                  </p>

                  <p className="mt-1 truncate text-[9px] font-medium text-[#111827]">
                    {selectedClient?.nationalId || "غير محدد"}
                  </p>
                </div>
              </div>
            </div>

            {/* City */}
            <div className="rounded-lg border border-[#e7ebf2] bg-white p-3">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#edf3ff] text-[#315DAA]">
                  <MapPin size={12} />
                </div>

                <div className="min-w-0">
                  <p className="text-[7px] text-[#8b95a7]">
                    المدينة
                  </p>

                  <p className="mt-1 truncate text-[9px] font-medium text-[#111827]">
                    {selectedClient?.city || "غير محدد"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Address & Country */}
          <div className="grid grid-cols-1 gap-2 mt-2 sm:grid-cols-2">
            <div className="rounded-lg border border-[#e7ebf2] bg-white p-3">
              <p className="text-[7px] text-[#8b95a7]">
                العنوان
              </p>

              <p className="mt-1 text-[9px] font-medium text-[#111827]">
                {selectedClient?.address || "غير محدد"}
              </p>
            </div>

            <div className="rounded-lg border border-[#e7ebf2] bg-white p-3">
              <p className="text-[7px] text-[#8b95a7]">
                الدولة
              </p>

              <p className="mt-1 text-[9px] font-medium text-[#111827]">
                {selectedClient?.country || "غير محدد"}
              </p>
            </div>
          </div>

          {/* Documents */}
          <div className="mt-5">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-[11px] font-bold text-[#111827]">
                  المستندات
                </h3>

                <p className="mt-1 text-[7px] text-[#8b95a7]">
                  المستندات والملفات الخاصة بالعميل
                </p>
              </div>

              <span className="rounded-full bg-[#edf3ff] px-2 py-1 text-[7px] font-medium text-[#315DAA]">
                {documents.length} مستند
              </span>
            </div>

            {documents.length > 0 ? (
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {documents.map((document) => (
                  <div
                    key={document?._id}
                    className="flex items-center gap-2 rounded-lg border border-[#e7ebf2] bg-white p-2.5"
                  >
                    {/* Preview */}
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-md border border-[#e7ebf2] bg-[#fafbfc]">
                      {isImageDocument(document) &&
                      document?.url ? (
                        <img
                          src={document.url}
                          alt={document?.name || "مستند"}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <FileText
                          size={17}
                          className="text-[#315DAA]"
                        />
                      )}
                    </div>

                    {/* Document Info */}
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-[9px] font-semibold text-[#111827]">
                        {document?.name || "مستند"}
                      </p>

                      <p className="mt-1 text-[7px] text-[#8b95a7]">
                        {document?.fileType === "pdf"
                          ? "PDF"
                          : isImageDocument(document)
                          ? "صورة"
                          : "ملف"}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1 shrink-0">
                      {document?.url && (
                        <a
                          href={document.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-7 w-7 items-center justify-center rounded-md border border-[#e7ebf2] text-[#62718a] transition hover:border-[#315DAA] hover:bg-[#edf3ff] hover:text-[#315DAA]"
                          title="فتح المستند"
                        >
                          <ExternalLink size={12} />
                        </a>
                      )}

                      <button
                        type="button"
                        onClick={() =>
                          handleDeleteClientDocumentFun({
                            clientId: selectedClient?._id,
                            documentId: document?._id,
                          })
                        }
                        className="flex h-7 w-7 items-center justify-center rounded-md border border-[#f0dede] text-[#d84b4b] transition hover:bg-[#fff0f0]"
                        title="حذف المستند"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-[#dfe4eb] bg-[#fafbfc] py-8">
                <FileText
                  size={22}
                  className="text-[#aab3c2]"
                />

                <p className="mt-2 text-[8px] font-medium text-[#62718a]">
                  لا توجد مستندات
                </p>

                <p className="mt-1 text-[7px] text-[#9aa4b4]">
                  لم يتم إضافة أي مستندات لهذا العميل
                </p>
              </div>
            )}
          </div>

          {/* Cases */}
          <div className="mt-5">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-[11px] font-bold text-[#111827]">
                  القضايا
                </h3>

                <p className="mt-1 text-[7px] text-[#8b95a7]">
                  القضايا المرتبطة بهذا العميل
                </p>
              </div>

              <span className="rounded-full bg-[#edf3ff] px-2 py-1 text-[7px] font-medium text-[#315DAA]">
                {cases.length} قضية
              </span>
            </div>

            {cases.length > 0 ? (
              <div className="space-y-2">
                {cases.map((caseItem) => {
                  const statusStyle =
                    caseStatusStyles[caseItem?.status] ||
                    caseStatusStyles.active;

                  return (
                    <div
                      key={caseItem?._id}
                      className="rounded-lg border border-[#e7ebf2] bg-white p-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-[#111827]">
                              {caseItem?.caseNumber ||
                                "بدون رقم"}
                            </span>

                            <span
                              className={`rounded-full px-2 py-0.5 text-[7px] font-medium ${statusStyle.bg} ${statusStyle.text}`}
                            >
                              {caseStatusLabels[
                                caseItem?.status
                              ] || "غير محدد"}
                            </span>
                          </div>

                          <p className="mt-1 text-[8px] text-[#62718a]">
                            {caseItem?.title ||
                              "بدون عنوان للقضية"}
                          </p>
                        </div>

                        <div className="flex shrink-0 items-center gap-1 text-[#8b95a7]">
                          <CalendarDays size={11} />

                          <span className="text-[7px]">
                            {caseItem?.nextHearingDate
                              ? new Date(
                                  caseItem.nextHearingDate
                                ).toLocaleDateString("ar-EG")
                              : "لا يوجد"}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-2 mt-3 sm:grid-cols-3">
                        <div className="rounded-md bg-[#fafbfc] px-2 py-2">
                          <p className="text-[7px] text-[#8b95a7]">
                            المحكمة
                          </p>

                          <p className="mt-1 truncate text-[8px] font-medium text-[#111827]">
                            {caseItem?.court || "غير محدد"}
                          </p>
                        </div>

                        <div className="rounded-md bg-[#fafbfc] px-2 py-2">
                          <p className="text-[7px] text-[#8b95a7]">
                            تاريخ القيد
                          </p>

                          <p className="mt-1 text-[8px] font-medium text-[#111827]">
                            {caseItem?.filingDate
                              ? new Date(
                                  caseItem.filingDate
                                ).toLocaleDateString("ar-EG")
                              : "غير محدد"}
                          </p>
                        </div>

                        <div className="rounded-md bg-[#fafbfc] px-2 py-2">
                          <p className="text-[7px] text-[#8b95a7]">
                            الجلسات
                          </p>

                          <p className="mt-1 text-[8px] font-medium text-[#111827]">
                            {caseItem?.sessionsCount ??
                              caseItem?.sessions?.length ??
                              0}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-[#dfe4eb] bg-[#fafbfc] py-8">
                <FileText
                  size={22}
                  className="text-[#aab3c2]"
                />

                <p className="mt-2 text-[8px] font-medium text-[#62718a]">
                  لا توجد قضايا
                </p>

                <p className="mt-1 text-[7px] text-[#9aa4b4]">
                  لا توجد قضايا مرتبطة بهذا العميل حالياً
                </p>
              </div>
            )}
          </div>

          {/* Lawyers */}
          <div className="mt-5">
            <div className="mb-2">
              <h3 className="text-[11px] font-bold text-[#111827]">
                المحامون المسؤولون
              </h3>

              <p className="mt-1 text-[7px] text-[#8b95a7]">
                المحامون المرتبطون بقضايا هذا العميل
              </p>
            </div>

            {lawyers.length > 0 ? (
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {lawyers.map((lawyer) => {
                  const lawyerImage =
                    lawyer?.profileImage?.url || "";

                  return (
                    <div
                      key={lawyer?._id}
                      className="flex items-center gap-2 rounded-lg border border-[#e7ebf2] bg-white p-2.5"
                    >
                      {lawyerImage ? (
                        <img
                          src={lawyerImage}
                          alt={lawyer?.name || "محامي"}
                          className="h-9 w-9 rounded-full border border-[#e7ebf2] object-cover"
                        />
                      ) : (
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#111827] text-[9px] font-bold text-white">
                          {lawyer?.name?.charAt(0) || "م"}
                        </div>
                      )}

                      <div className="flex-1 min-w-0">
                        <p className="truncate text-[9px] font-semibold text-[#111827]">
                          {lawyer?.name || "غير معروف"}
                        </p>

                        <p className="mt-1 text-[7px] text-[#8b95a7]">
                          {lawyer?.role === "office_owner"
                            ? "مدير المكتب"
                            : "محامي"}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-[#dfe4eb] bg-[#fafbfc] py-8">
                <Users
                  size={22}
                  className="text-[#aab3c2]"
                />

                <p className="mt-2 text-[8px] font-medium text-[#62718a]">
                  لا يوجد محامون
                </p>

                <p className="mt-1 text-[7px] text-[#9aa4b4]">
                  لم يتم ربط محامين بقضايا هذا العميل
                </p>
              </div>
            )}
          </div>

          {/* Footer Info */}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-[#e7ebf2] pt-4">
            <div>
              <p className="text-[7px] text-[#8b95a7]">
                آخر تحديث
              </p>

              <p className="mt-1 text-[8px] font-medium text-[#111827]">
                {selectedClient?.updatedAt
                  ? new Date(
                      selectedClient.updatedAt
                    ).toLocaleDateString("ar-EG")
                  : "غير محدد"}
              </p>
            </div>

            <div>
              <p className="text-[7px] text-[#8b95a7]">
                الدولة
              </p>

              <p className="mt-1 text-[8px] font-medium text-[#111827]">
                {selectedClient?.country || "غير محدد"}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end border-t border-[#e7ebf2] bg-[#fafbfc] px-5 py-3">
          <button
            type="button"
            onClick={() => setOpenDetails(false)}
            className="rounded-md bg-[#111827] px-4 py-2 text-[8px] font-medium text-white transition hover:bg-[#1f2937]"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};

export default Details;