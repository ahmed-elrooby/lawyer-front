import React from "react";
import {
  X,
  CalendarDays,
  Clock3,
  Gavel,
  FileText,
  CheckCircle2,
  CircleAlert,
  RotateCcw,
  Ban,
  UserRound,
  Scale,
} from "lucide-react";

const Details = ({ selectSession, setOpenDetails, openDetails }) => {
  if (!openDetails || !selectSession) return null;

  const statusConfig = {
    scheduled: {
      label: "مجدولة",
      icon: CalendarDays,
      className: "bg-blue-50 text-blue-600 border-blue-100",
    },
    attended: {
      label: "تم الحضور",
      icon: CheckCircle2,
      className: "bg-emerald-50 text-emerald-600 border-emerald-100",
    },
    postponed: {
      label: "مؤجلة",
      icon: RotateCcw,
      className: "bg-amber-50 text-amber-600 border-amber-100",
    },
    completed: {
      label: "مكتملة",
      icon: CheckCircle2,
      className: "bg-purple-50 text-purple-600 border-purple-100",
    },
    cancelled: {
      label: "ملغاة",
      icon: Ban,
      className: "bg-red-50 text-red-600 border-red-100",
    },
  };

  const status =
    statusConfig[selectSession.status] || statusConfig.scheduled;

  const StatusIcon = status.icon;

  const caseData =
    selectSession.caseId && typeof selectSession.caseId === "object"
      ? selectSession.caseId
      : null;

  const client =
    caseData?.clientId && typeof caseData.clientId === "object"
      ? caseData.clientId
      : null;

  const lawyers = Array.isArray(caseData?.lawyers)
    ? caseData.lawyers
    : [];

  const formatDate = (date) => {
    if (!date) return "غير محدد";

    return new Date(date).toLocaleDateString("ar-EG", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-950/60 px-4 py-6 backdrop-blur-[2px]"
      onClick={() => setOpenDetails(false)}
    >
      <div
        className="w-full max-w-2xl overflow-hidden bg-white shadow-2xl rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between bg-[#111827] px-5 py-4 sm:px-6">
          <div className="flex items-center min-w-0 gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#c9a227]/10 text-[#c9a227]">
              <Gavel size={22} />
            </div>

            <div className="min-w-0">
              <h2 className="text-base font-bold text-white truncate sm:text-lg">
                تفاصيل الجلسة
              </h2>

              <p className="mt-1 text-xs truncate text-slate-400">
                {selectSession.title || "جلسة بدون عنوان"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOpenDetails(false)}
            className="flex items-center justify-center transition rounded-lg h-9 w-9 shrink-0 text-slate-400 hover:bg-white/10 hover:text-white"
          >
            <X size={19} />
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[75vh] overflow-y-auto p-5 sm:p-6">
          {/* Session title */}
          <div className="p-4 mb-5 border rounded-xl border-slate-200 bg-slate-50">
            <div className="flex items-center gap-2 mb-2 text-xs font-medium text-slate-500">
              <FileText size={15} />
              عنوان الجلسة
            </div>

            <p className="text-sm font-bold text-slate-800">
              {selectSession.title || "بدون عنوان"}
            </p>
          </div>

          {/* Main information */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {/* Date */}
            <div className="p-4 border rounded-xl border-slate-200">
              <div className="flex items-center gap-2 mb-2 text-xs font-medium text-slate-500">
                <CalendarDays size={15} />
                تاريخ الجلسة
              </div>

              <p className="text-sm font-semibold text-slate-800">
                {formatDate(selectSession.sessionDate)}
              </p>
            </div>

            {/* Time */}
            <div className="p-4 border rounded-xl border-slate-200">
              <div className="flex items-center gap-2 mb-2 text-xs font-medium text-slate-500">
                <Clock3 size={15} />
                وقت الجلسة
              </div>

              <p className="text-sm font-semibold text-slate-800">
                {selectSession.sessionTime || "غير محدد"}
              </p>
            </div>

            {/* Status */}
            <div className="p-4 border rounded-xl border-slate-200">
              <div className="mb-2 text-xs font-medium text-slate-500">
                حالة الجلسة
              </div>

              <span
                className={`inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-semibold ${status.className}`}
              >
                <StatusIcon size={14} />
                {status.label}
              </span>
            </div>

            {/* Case number */}
            <div className="p-4 border rounded-xl border-slate-200">
              <div className="flex items-center gap-2 mb-2 text-xs font-medium text-slate-500">
                <Scale size={15} />
                رقم القضية
              </div>

              <p className="text-sm font-semibold text-slate-800">
                {caseData?.caseNumber
                  ? `قضية رقم ${caseData.caseNumber}`
                  : "غير مرتبطة بقضية"}
              </p>
            </div>

            {/* Court */}
            <div className="p-4 border rounded-xl border-slate-200">
              <div className="flex items-center gap-2 mb-2 text-xs font-medium text-slate-500">
                <Gavel size={15} />
                المحكمة
              </div>

              <p className="text-sm font-semibold text-slate-800">
                {caseData?.court || "غير محددة"}
              </p>
            </div>

            {/* Client */}
            <div className="p-4 border rounded-xl border-slate-200">
              <div className="flex items-center gap-2 mb-2 text-xs font-medium text-slate-500">
                <UserRound size={15} />
                العميل
              </div>

              <p className="text-sm font-semibold text-slate-800">
                {client?.name || "غير محدد"}
              </p>
            </div>
          </div>

          {/* Lawyers */}
          {lawyers.length > 0 && (
            <div className="p-4 mt-4 border rounded-xl border-slate-200">
              <div className="flex items-center gap-2 mb-3 text-xs font-medium text-slate-500">
                <UserRound size={15} />
                المحامون
              </div>

              <div className="flex flex-wrap gap-2">
                {lawyers.map((lawyer) => (
                  <div
                    key={lawyer._id}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-50"
                  >
                    <div className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-full bg-[#111827] text-xs font-bold text-white">
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

                    <span className="text-xs font-semibold text-slate-700">
                      {lawyer.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notes */}
          {selectSession.notes && (
            <div className="p-4 mt-4 border rounded-xl border-slate-200">
              <div className="mb-2 text-xs font-medium text-slate-500">
                ملاحظات الجلسة
              </div>

              <p className="text-sm leading-6 whitespace-pre-wrap text-slate-700">
                {selectSession.notes}
              </p>
            </div>
          )}

          {/* Decision */}
          {selectSession.decision && (
            <div className="p-4 mt-4 border rounded-xl border-slate-200">
              <div className="mb-2 text-xs font-medium text-slate-500">
                القرار
              </div>

              <p className="text-sm leading-6 whitespace-pre-wrap text-slate-700">
                {selectSession.decision}
              </p>
            </div>
          )}

          {/* Next session */}
          {selectSession.nextSessionDate && (
            <div className="mt-4 rounded-xl border border-[#c9a227]/20 bg-[#c9a227]/5 p-4">
              <div className="mb-2 flex items-center gap-2 text-xs font-medium text-[#8d7115]">
                <CalendarDays size={15} />
                الجلسة القادمة
              </div>

              <p className="text-sm font-semibold text-slate-800">
                {formatDate(selectSession.nextSessionDate)}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end px-5 py-4 border-t border-slate-100 bg-slate-50 sm:px-6">
          <button
            type="button"
            onClick={() => setOpenDetails(false)}
            className="rounded-xl bg-[#111827] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-slate-800"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};

export default Details;