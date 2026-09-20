"use client";

import React, { useContext } from "react";
import { X, Trash2, AlertTriangle } from "lucide-react";
import { OwnerContext } from "../../../../../Providers/LawyerOwner/OwnerProvider.js";

const Delete = ({ selectedClient }) => {
  const {
    handleDeleteClientFun,
    openDeleteClient,
    setOpenDeleteClient,loadding
  } = useContext(OwnerContext);

  if (!openDeleteClient || !selectedClient) {
    return null;
  }

  const handleDelete = async () => {
    await handleDeleteClientFun(selectedClient?._id);
  };

  return (
    <div
    
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4"
    >
      <div className="w-full max-w-md overflow-hidden rounded-xl border border-[#e7ebf2] bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#edf0f4] px-5 py-4">
          <div>
            <h2 className="text-[13px] font-bold text-[#111827]">
              حذف العميل
            </h2>

            <p className="mt-1 text-[8px] text-[#99a2b1]">
              تأكيد حذف بيانات العميل
            </p>
          </div>

          <button
            type="button"
            onClick={() => setOpenDeleteClient(false)}
            className="flex h-7 w-7 items-center justify-center rounded-md text-[#98a2b3] transition hover:bg-[#f5f6f8] hover:text-[#111827]"
          >
            <X size={14} />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-6">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#fff0f0] text-[#d84b4b]">
              <AlertTriangle size={20} />
            </div>

            <h3 className="text-[11px] font-bold text-[#111827]">
              هل أنت متأكد من حذف العميل؟
            </h3>

            <p className="mt-2 text-[8px] leading-5 text-[#667085]">
              سيتم حذف العميل{" "}
              <span className="font-bold text-[#111827]">
                {selectedClient?.name || "هذا العميل"}
              </span>{" "}
              وجميع البيانات المرتبطة به.
            </p>

            <p className="mt-1 text-[7px] text-[#d84b4b]">
              لا يمكن التراجع عن هذه العملية.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 border-t border-[#edf0f4] bg-[#fafbfc] px-5 py-3">
          <button
            type="button"
            onClick={() => setOpenDeleteClient(false)}
            className="h-8 rounded-md border border-[#e7ebf2] bg-white px-4 text-[8px] font-semibold text-[#62718a] transition hover:bg-[#f5f6f8]"
          >
            إلغاء
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="flex h-8 items-center gap-1.5 rounded-md bg-[#d84b4b] px-4 text-[8px] font-semibold text-white transition hover:bg-[#c73f3f]"
          >
            <Trash2 size={11} />
          {
            loadding?<span>جاري حذف العميل</span>:<span>حذف العميل</span>
          }
          </button>
        </div>
      </div>
    </div>
  );
};

export default Delete;