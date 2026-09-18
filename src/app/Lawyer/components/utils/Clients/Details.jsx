
import React, { useContext, useState } from "react";
import {
  FaTimes,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaIdCard,
  FaGlobe,
  FaFileAlt,
  FaGavel,
  FaCalendarAlt,
  FaChevronDown,
  FaChevronUp,
  FaEye,
  FaDownload,
  FaStickyNote,
  FaClock,
  FaUserTie,
  FaTrash,
} from "react-icons/fa";
import { LawyerContext } from "../../../../../Providers/LawyerContext/lawyer.js";

const Details = ({ client, setOpenDetails }) => {
  const [openCases, setOpenCases] = useState({});
const {handleDeleteClientDocumentFun}=useContext(LawyerContext)
  if (!client) return null;

  // ==========================================
  // Helpers
  // ==========================================

  const formatDate = (date) => {
    if (!date) return "غير محدد";

    return new Date(date).toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatShortDate = (date) => {
    if (!date) return "غير محدد";

    return new Date(date).toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const getCaseStatus = (status) => {
    switch (status) {
      case "active":
        return {
          text: "نشطة",
          className: "bg-green-500/10 text-green-400 border-green-500/20",
        };

      case "reserved_for_judgment":
        return {
          text: "محجوزة للحكم",
          className: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
        };

      case "judged":
        return {
          text: "تم الحكم",
          className: "bg-blue-500/10 text-blue-400 border-blue-500/20",
        };

      default:
        return {
          text: status || "غير محدد",
          className: "bg-gray-500/10 text-gray-400 border-gray-500/20",
        };
    }
  };

  const getSessionStatus = (status) => {
    switch (status) {
      case "scheduled":
        return {
          text: "مجدولة",
          className: "bg-blue-500/10 text-blue-400",
        };

      case "attended":
        return {
          text: "تم الحضور",
          className: "bg-green-500/10 text-green-400",
        };

      case "postponed":
        return {
          text: "مؤجلة",
          className: "bg-yellow-500/10 text-yellow-400",
        };

      case "completed":
        return {
          text: "مكتملة",
          className: "bg-purple-500/10 text-purple-400",
        };

      case "cancelled":
        return {
          text: "ملغاة",
          className: "bg-red-500/10 text-red-400",
        };

      default:
        return {
          text: status || "غير محدد",
          className: "bg-gray-500/10 text-gray-400",
        };
    }
  };

  const getFileIcon = (fileType) => {
    if (fileType === "pdf") return "📄";
    if (fileType === "word") return "📝";
    if (fileType === "image") return "🖼️";

    return "📁";
  };

  const toggleCase = (caseId) => {
    setOpenCases((prev) => ({
      ...prev,
      [caseId]: !prev[caseId],
    }));
  };

  // ==========================================
  // Data
  // ==========================================

  const cases = client.cases || [];

  const totalSessions =
    client.sessionsCount ??
    cases.reduce(
      (total, caseItem) => total + (caseItem.sessions?.length || 0),
      0,
    );

  // ==========================================
  // UI
  // ==========================================
const handleDownloadDocument = async (document) => {
  try {
    const response = await fetch(document.url);

    if (!response.ok) {
      throw new Error("فشل تحميل المستند");
    }

    const blob = await response.blob();

    const blobUrl = window.URL.createObjectURL(blob);

    const link = window.document.createElement("a");

    link.href = blobUrl;

    const extension =
      document.extension ||
      (document.fileType === "pdf"
        ? ".pdf"
        : document.fileType === "word"
        ? ".docx"
        : document.fileType === "image"
        ? ".jpg"
        : "");

    link.download = `${document.name || "document"}${extension}`;

    window.document.body.appendChild(link);

    link.click();

    link.remove();

    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error(
      "Download Document Error:",
      error,
    );
  }
};
  return (
    <div
   
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4"
    >
      <div className="flex max-h-[95vh] w-full max-w-4xl add-case-scrollbar flex-col overflow-hidden rounded-2xl border border-gray-700 bg-[#0f172a] text-white shadow-2xl">
        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <div className="flex shrink-0 items-center justify-between border-b border-gray-700 bg-[#172033] px-6 py-4">
          <div>
            <h2 className="text-xl font-bold">
              تفاصيل العميل
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              جميع بيانات العميل والقضايا والجلسات الخاصة به
            </p>
          </div>

          <button
            type="button"
            onClick={() => setOpenDetails(false)}
            className="flex items-center justify-center w-10 h-10 text-red-400 transition rounded-lg bg-red-500/10 hover:bg-red-500 hover:text-white"
          >
            <FaTimes />
          </button>
        </div>

        {/* ================================================= */}
        {/* CONTENT */}
        {/* ================================================= */}

        <div className="flex-1 p-6 overflow-y-auto">
          {/* ================================================= */}
          {/* CLIENT HEADER */}
          {/* ================================================= */}

          <div className="mb-6 rounded-2xl border border-gray-700 bg-[#172033] p-6">
            <div className="flex flex-col items-center gap-5 md:flex-row">
              {/* Image */}

              {client.profileImage?.url ? (
                <img
                  src={client.profileImage.url}
                  alt={client.name}
                  className="object-cover border-4 border-gray-700 rounded-full h-28 w-28"
                />
              ) : (
                <div className="flex items-center justify-center text-gray-500 bg-gray-800 border-4 border-gray-700 rounded-full h-28 w-28">
                  <FaUser size={40} />
                </div>
              )}

              {/* Info */}

              <div className="text-center md:text-right">
                <h3 className="text-2xl font-bold">
                  {client.name || "بدون اسم"}
                </h3>

                <p className="mt-1 text-sm text-gray-400">
                  تم إنشاء العميل في{" "}
                  {formatDate(client.createdAt)}
                </p>

                <div className="flex flex-wrap justify-center gap-2 mt-3 md:justify-start">
                  <span
                    className={`rounded-full px-4 py-1.5 text-xs font-medium ${
                      client.isActive
                        ? "bg-green-500/10 text-green-400"
                        : "bg-red-500/10 text-red-400"
                    }`}
                  >
                    {client.isActive
                      ? "عميل نشط"
                      : "عميل غير نشط"}
                  </span>

                  <span className="rounded-full bg-orange-500/10 px-4 py-1.5 text-xs text-orange-400">
                    {client.casesCount ?? cases.length} قضية
                  </span>

                  <span className="rounded-full bg-cyan-500/10 px-4 py-1.5 text-xs text-cyan-400">
                    {totalSessions} جلسة
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ================================================= */}
          {/* CLIENT INFORMATION */}
          {/* ================================================= */}

          <SectionTitle
            icon={<FaUser />}
            title="بيانات العميل"
          />

          <div className="grid grid-cols-1 gap-4 mb-7 sm:grid-cols-2 lg:grid-cols-3">
            <InfoCard
              icon={<FaUser />}
              title="الاسم"
              value={client.name}
            />

            <InfoCard
              icon={<FaPhone />}
              title="رقم الهاتف"
              value={client.phone}
            />

            <InfoCard
              icon={<FaEnvelope />}
              title="البريد الإلكتروني"
              value={client.email}
            />

            <InfoCard
              icon={<FaIdCard />}
              title="الرقم القومي"
              value={client.nationalId}
            />

            <InfoCard
              icon={<FaMapMarkerAlt />}
              title="العنوان"
              value={client.address}
            />

            <InfoCard
              icon={<FaMapMarkerAlt />}
              title="المدينة"
              value={client.city}
            />

            <InfoCard
              icon={<FaGlobe />}
              title="الدولة"
              value={client.country}
            />

            <InfoCard
              icon={<FaCalendarAlt />}
              title="تاريخ الإضافة"
              value={formatDate(client.createdAt)}
            />

            <InfoCard
              icon={<FaCalendarAlt />}
              title="آخر تعديل"
              value={formatDate(client.updatedAt)}
            />
          </div>

          {/* ================================================= */}
          {/* NOTES */}
          {/* ================================================= */}

          {client.notes && (
            <>
              <SectionTitle
                icon={<FaStickyNote />}
                title="ملاحظات العميل"
              />

              <div className="mb-7 rounded-xl border border-gray-700 bg-[#172033] p-5 text-sm leading-7 text-gray-300">
                {client.notes}
              </div>
            </>
          )}

          {/* ================================================= */}
          {/* DOCUMENTS */}
          {/* ================================================= */}

          <SectionTitle
            icon={<FaFileAlt />}
            title="مستندات العميل"
            count={client.documents?.length || 0}
          />

          <div className="mb-8">
            {client.documents?.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {client.documents.map((document) => (
                  <div
                    key={document._id}
                    className="rounded-xl border border-gray-700 bg-[#172033] p-4 transition hover:border-gray-500"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-12 h-12 text-2xl bg-gray-800 rounded-lg shrink-0">
                        {getFileIcon(document.fileType)}
                      </div>

                      <div className="min-w-0">
                        <h4 className="font-semibold truncate">
                          {document.name}
                        </h4>

                        <p className="mt-1 text-xs text-gray-500">
                          {document.fileType?.toUpperCase()}
                        </p>
                      </div>
                    </div>

                    {document.fileType === "image" && (
                      <img
                        src={document.url}
                        alt={document.name}
                        className="object-cover w-full mt-4 rounded-lg h-36"
                      />
                    )}

                    <div className="flex gap-2 mt-4">
                  <a
  href={document.url}
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center justify-center flex-1 gap-2 py-2 text-xs text-blue-400 transition rounded-lg bg-blue-500/10 hover:bg-blue-500 hover:text-white"
>
  <FaEye />
  عرض
</a>

<button
  type="button"
  onClick={() =>
    handleDownloadDocument(document)
  }
  className="flex items-center justify-center flex-1 gap-2 py-2 text-xs text-green-400 transition rounded-lg bg-green-500/10 hover:bg-green-500 hover:text-white"
>
  <FaDownload />
  تحميل
</button>
<button
  type="button"
onClick={() => {
    handleDeleteClientDocumentFun({
      clientId: client._id,
      documentId: document._id,
    });
  }}  className="flex items-center justify-center flex-1 gap-2 py-2 text-xs text-red-400 transition rounded-lg bg-red-500/10 hover:bg-red-500 hover:text-white"
>
  <FaTrash />
  حذف
</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState text="لا توجد مستندات لهذا العميل" />
            )}
          </div>

          {/* ================================================= */}
          {/* CASES */}
          {/* ================================================= */}

          <SectionTitle
            icon={<FaGavel />}
            title="قضايا العميل"
            count={cases.length}
          />

          <div className="space-y-4">
            {cases.length > 0 ? (
              cases.map((caseItem) => {
                const isOpen = openCases[caseItem._id];

                const caseStatus = getCaseStatus(
                  caseItem.status,
                );

                const sessions =
                  caseItem.sessions || [];

                return (
                  <div
                    key={caseItem._id}
                    className="overflow-hidden rounded-2xl border border-gray-700 bg-[#172033]"
                  >
                    {/* CASE HEADER */}

                    <button
                      type="button"
                      onClick={() =>
                        toggleCase(caseItem._id)
                      }
                      className="flex items-center justify-between w-full gap-4 p-5 text-right transition hover:bg-gray-800/40"
                    >
                      <div className="flex items-center min-w-0 gap-4">
                        <div className="flex items-center justify-center w-12 h-12 text-orange-400 shrink-0 rounded-xl bg-orange-500/10">
                          <FaGavel />
                        </div>

                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className="font-bold">
                              قضية رقم{" "}
                              {caseItem.caseNumber}
                            </h4>

                            <span
                              className={`rounded-full border px-3 py-1 text-[11px] ${caseStatus.className}`}
                            >
                              {caseStatus.text}
                            </span>
                          </div>

                          <p className="mt-1 text-sm text-gray-400">
                            {caseItem.court || "المحكمة غير محددة"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <span className="hidden px-3 py-1 text-xs rounded-full bg-cyan-500/10 text-cyan-400 sm:block">
                          {sessions.length} جلسة
                        </span>

                        {isOpen ? (
                          <FaChevronUp className="text-gray-400" />
                        ) : (
                          <FaChevronDown className="text-gray-400" />
                        )}
                      </div>
                    </button>

                    {/* CASE DETAILS */}

                    {isOpen && (
                      <div className="p-5 border-t border-gray-700">
                        {/* Case Info */}

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                          <InfoCard
                            icon={<FaGavel />}
                            title="رقم القضية"
                            value={caseItem.caseNumber}
                          />

                          <InfoCard
                            icon={<FaMapMarkerAlt />}
                            title="المحكمة"
                            value={caseItem.court}
                          />

                          <InfoCard
                            icon={<FaCalendarAlt />}
                            title="تاريخ رفع القضية"
                            value={formatDate(
                              caseItem.filingDate,
                            )}
                          />

                          <InfoCard
                            icon={<FaCalendarAlt />}
                            title="الجلسة القادمة"
                            value={formatDate(
                              caseItem.nextHearingDate,
                            )}
                          />

                          <InfoCard
                            icon={<FaCalendarAlt />}
                            title="عدد الجلسات"
                            value={sessions.length}
                          />
                        </div>

                        {/* Lawyers */}

                        {caseItem.lawyers?.length > 0 && (
                          <div className="mt-6">
                            <h5 className="flex items-center gap-2 mb-3 text-sm font-bold">
                              <FaUserTie className="text-blue-400" />
                              المحامون المسؤولون
                            </h5>

                            <div className="flex flex-wrap gap-2">
                              {caseItem.lawyers.map(
                                (lawyer) => (
                                  <div
                                    key={lawyer._id}
                                    className="px-4 py-2 text-sm bg-gray-800 border border-gray-700 rounded-lg"
                                  >
                                    {lawyer.name}
                                  </div>
                                ),
                              )}
                            </div>
                          </div>
                        )}

                        {/* Description */}

                        {caseItem.description && (
                          <div className="mt-6">
                            <h5 className="mb-2 text-sm font-bold text-gray-300">
                              وصف القضية
                            </h5>

                            <div className="p-4 text-sm leading-7 text-gray-400 bg-gray-800 rounded-lg">
                              {caseItem.description}
                            </div>
                          </div>
                        )}

                        {/* Notes */}

                        {caseItem.notes && (
                          <div className="mt-4">
                            <h5 className="mb-2 text-sm font-bold text-gray-300">
                              ملاحظات القضية
                            </h5>

                            <div className="p-4 text-sm leading-7 text-gray-400 bg-gray-800 rounded-lg">
                              {caseItem.notes}
                            </div>
                          </div>
                        )}

                        {/* ================================================= */}
                        {/* SESSIONS */}
                        {/* ================================================= */}

                        <div className="mt-7">
                          <div className="flex items-center justify-between mb-4">
                            <h5 className="flex items-center gap-2 text-sm font-bold">
                              <FaCalendarAlt className="text-cyan-400" />
                              جلسات القضية
                            </h5>

                            <span className="px-3 py-1 text-xs rounded-full bg-cyan-500/10 text-cyan-400">
                              {sessions.length} جلسة
                            </span>
                          </div>

                          {sessions.length > 0 ? (
                            <div className="space-y-3">
                              {sessions.map(
                                (session) => {
                                  const sessionStatus =
                                    getSessionStatus(
                                      session.status,
                                    );

                                  return (
                                    <div
                                      key={session._id}
                                      className="p-4 border border-gray-700 rounded-xl bg-gray-800/50"
                                    >
                                      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                        <div>
                                          <div className="flex flex-wrap items-center gap-2">
                                            <h6 className="font-semibold">
                                              {session.title}
                                            </h6>

                                            <span
                                              className={`rounded-full px-3 py-1 text-[11px] ${sessionStatus.className}`}
                                            >
                                              {
                                                sessionStatus.text
                                              }
                                            </span>
                                          </div>

                                          <div className="flex flex-wrap gap-4 mt-3 text-xs text-gray-400">
                                            <span className="flex items-center gap-2">
                                              <FaCalendarAlt />
                                              {formatShortDate(
                                                session.sessionDate,
                                              )}
                                            </span>

                                            <span className="flex items-center gap-2">
                                              <FaClock />
                                              {
                                                session.sessionTime
                                              }
                                            </span>
                                          </div>
                                        </div>

                                        {session.nextSessionDate && (
                                          <div className="px-4 py-2 text-xs text-yellow-400 rounded-lg bg-yellow-500/10">
                                            الجلسة القادمة:{" "}
                                            {formatDate(
                                              session.nextSessionDate,
                                            )}
                                          </div>
                                        )}
                                      </div>

                                      {session.notes && (
                                        <div className="pt-3 mt-4 border-t border-gray-700">
                                          <p className="text-xs leading-6 text-gray-400">
                                            <span className="font-semibold text-gray-300">
                                              ملاحظات:
                                            </span>{" "}
                                            {session.notes}
                                          </p>
                                        </div>
                                      )}

                                      {session.decision && (
                                        <div className="p-3 mt-3 rounded-lg bg-green-500/5">
                                          <p className="text-xs leading-6 text-gray-400">
                                            <span className="font-semibold text-green-400">
                                              القرار:
                                            </span>{" "}
                                            {session.decision}
                                          </p>
                                        </div>
                                      )}
                                    </div>
                                  );
                                },
                              )}
                            </div>
                          ) : (
                            <EmptyState text="لا توجد جلسات لهذه القضية" />
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <EmptyState text="لا توجد قضايا لهذا العميل" />
            )}
          </div>
        </div>

        {/* ================================================= */}
        {/* FOOTER */}
        {/* ================================================= */}

        <div className="flex shrink-0 justify-end border-t border-gray-700 bg-[#172033] px-6 py-4">
          <button
            type="button"
            onClick={() => setOpenDetails(false)}
            className="rounded-lg bg-gray-700 px-7 py-2.5 text-sm font-medium transition hover:bg-gray-600"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};

/* ================================================= */
/* SECTION TITLE */
/* ================================================= */

const SectionTitle = ({
  icon,
  title,
  count,
}) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <span className="text-blue-400">
          {icon}
        </span>

        <h3 className="text-lg font-bold">
          {title}
        </h3>
      </div>

      {count !== undefined && (
        <span className="px-3 py-1 text-xs text-blue-400 rounded-full bg-blue-500/10">
          {count}
        </span>
      )}
    </div>
  );
};

/* ================================================= */
/* INFO CARD */
/* ================================================= */

const InfoCard = ({
  icon,
  title,
  value,
}) => {
  return (
    <div className="rounded-xl border border-gray-700 bg-[#172033] p-4">
      <div className="flex items-center gap-2 mb-2 text-xs text-gray-500">
        <span className="text-blue-400">
          {icon}
        </span>

        <span>{title}</span>
      </div>

      <p className="text-sm font-medium text-gray-200 break-words">
        {value !== null &&
        value !== undefined &&
        value !== ""
          ? value
          : "غير متوفر"}
      </p>
    </div>
  );
};

/* ================================================= */
/* EMPTY STATE */
/* ================================================= */

const EmptyState = ({ text }) => {
  return (
    <div className="rounded-xl border border-dashed border-gray-700 bg-[#172033] py-8 text-center">
      <FaFileAlt className="mx-auto mb-3 text-2xl text-gray-600" />

      <p className="text-sm text-gray-500">
        {text}
      </p>
    </div>
  );
};

export default Details;
