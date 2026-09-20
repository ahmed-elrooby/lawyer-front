"use client";

import React, { useContext } from "react";
import { X, Trash2, AlertTriangle } from "lucide-react";
import { OwnerContext } from "../../../../../Providers/LawyerOwner/OwnerProvider.js";

const DeleteFile = ({ document }) => {
  const {
    openDeleteDocument,
    setOpenDeleteDocument,
    handleDeleteDocumentFun,
  } = useContext(OwnerContext);

  if (!openDeleteDocument || !document) return null;



  return (
    <div
      dir="rtl"
      className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50 p-4"
    >
      <div className="w-full max-w-md overflow-hidden bg-white shadow-2xl rounded-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#EEF0F3] px-5 py-4">
          <h2 className="text-[15px] font-bold text-[#0B1C30]">
            حذف الصيغة
          </h2>

          <button
            type="button"
            onClick={() => setOpenDeleteDocument(false)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#8A8E96] transition hover:bg-[#F5F6F8] hover:text-[#0B1C30]"
          >
            <X size={17} />
          </button>
        </div>

        {/* Content */}
        <div className="px-5 py-6">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FFF1F1]">
              <AlertTriangle
                size={21}
                className="text-[#C24A4A]"
              />
            </div>

            <div className="min-w-0">
              <h3 className="text-[13px] font-bold text-[#0B1C30]">
                هل أنت متأكد من حذف هذه الصيغة؟
              </h3>

              <p className="mt-2 text-[10px] leading-5 text-[#777B84]">
                سيتم حذف الصيغة بشكل نهائي ولن تتمكن من استعادتها
                بعد الحذف.
              </p>

              {/* Document */}
              <div className="mt-4 rounded-lg border border-[#EEF0F3] bg-[#FAFBFC] px-3 py-3">
                <p className="truncate text-[11px] font-bold text-[#0B1C30]">
                  {document?.name || "بدون اسم"}
                </p>

                {document?.description && (
                  <p className="mt-1 line-clamp-1 text-[9px] text-[#9AA0A8]">
                    {document.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-start gap-2 border-t border-[#EEF0F3] bg-[#FAFBFC] px-5 py-4">
          <button
            type="button"
            onClick={() => setOpenDeleteDocument(false)}
            className="h-9 rounded-lg border border-[#E1E4E9] bg-white px-5 text-[10px] font-bold text-[#59616D] transition hover:bg-[#F5F6F8]"
          >
            إلغاء
          </button>

          <button
            type="button"
            onClick={()=>{
                handleDeleteDocumentFun(document?._id);
            }}
            className="flex h-9 items-center gap-2 rounded-lg bg-[#C24A4A] px-5 text-[10px] font-bold text-white transition hover:bg-[#B33F3F]"
          >
            <Trash2 size={14} />
            حذف الصيغة
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteFile;