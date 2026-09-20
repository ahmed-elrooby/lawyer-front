"use client";

import React, { useContext } from "react";
import { Trash2, X, AlertTriangle } from "lucide-react";
import { OwnerContext } from "../../../../../Providers/LawyerOwner/OwnerProvider.js";

const Delete = ({ selectSession }) => {
  const {
    setOpenDeleteSession,
    openDeleteSession,
    handleDeleteSessionFun,
  } = useContext(OwnerContext);

  if (!openDeleteSession || !selectSession) return null;

 
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md overflow-hidden bg-white shadow-2xl rounded-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#EEF0F4] px-5 py-4">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF1F1] text-[#B24B4B]">
              <Trash2 size={18} />
            </div>

            <div>
              <h3 className="text-[14px] font-bold text-[#1B2635]">
                حذف الجلسة
              </h3>

              <p className="mt-0.5 text-[10px] text-[#8A919C]">
                تأكيد حذف الجلسة
              </p>
            </div>

          </div>

          <button
            onClick={() => setOpenDeleteSession(false)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#8A919C] transition hover:bg-[#F5F6F8] hover:text-[#414957]"
          >
            <X size={16} />
          </button>

        </div>

        {/* Content */}
        <div className="px-5 py-5">

          <div className="rounded-xl border border-[#F1E0E0] bg-[#FFF8F8] p-4">

            <div className="flex items-start gap-3">

              <AlertTriangle
                size={17}
                className="mt-0.5 shrink-0 text-[#B24B4B]"
              />

              <div>

                <p className="text-[11px] font-bold text-[#414957]">
                  هل أنت متأكد من حذف هذه الجلسة؟
                </p>

                <p className="mt-2 text-[10px] leading-5 text-[#858C97]">
                  سيتم حذف الجلسة نهائيًا ولا يمكن التراجع عن هذا الإجراء.
                </p>

              </div>

            </div>

          </div>

          {/* Session Info */}
          <div className="mt-4 rounded-xl border border-[#EEF0F4] p-3">

            <p className="text-[10px] text-[#9298A2]">
              عنوان الجلسة
            </p>

            <p className="mt-1 text-[12px] font-bold text-[#293342]">
              {selectSession.title || "جلسة بدون عنوان"}
            </p>

            <div className="flex items-center gap-2 mt-3">

              <span className="text-[9px] text-[#9298A2]">
                رقم القضية
              </span>

              <span className="rounded-md bg-[#F3F5F8] px-2 py-1 text-[9px] font-semibold text-[#69717D]">
                {selectSession?.caseId?.caseNumber
                  ? `#${selectSession.caseId.caseNumber}`
                  : "غير محددة"}
              </span>

            </div>

          </div>

        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 border-t border-[#EEF0F4] px-5 py-4">

          <button
            onClick={() => setOpenDeleteSession(false)}
            className="h-9 rounded-lg border border-[#E3E6EC] px-4 text-[10px] font-semibold text-[#626A76] transition hover:bg-[#F7F8FA]"
          >
            إلغاء
          </button>

          <button
            onClick={() => handleDeleteSessionFun(selectSession?._id)}
            className="flex h-9 items-center gap-1.5 rounded-lg bg-[#B24B4B] px-4 text-[10px] font-bold text-white transition hover:bg-[#9F3F3F]"
          >
            <Trash2 size={13} />
            حذف الجلسة
          </button>

        </div>

      </div>
    </div>
  );
};

export default Delete;