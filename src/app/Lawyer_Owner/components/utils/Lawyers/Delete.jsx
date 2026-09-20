"use client";

import React, { useContext } from "react";
import { OwnerContext } from "../../../../../Providers/LawyerOwner/OwnerProvider.js";

const Delete = ({ selectedLawyer}) => {
  const { handleDeleteLawyerFun, loadding,setOpenDeleteLawyer, openDeleteLawyer } = useContext(OwnerContext);

  if (!openDeleteLawyer || !selectedLawyer) return null;



  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0f172a]/60 px-4 backdrop-blur-[2px]">
      <div className="w-full max-w-[430px] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.18)]">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 bg-[#111827] px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 text-red-400 rounded-xl bg-red-500/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 6h18" />
                <path d="M8 6V4h8v2" />
                <path d="M19 6v14H5V6" />
                <path d="M10 11v5" />
                <path d="M14 11v5" />
              </svg>
            </div>

            <div>
              <h2 className="text-[15px] font-bold text-white">
                حذف المحامي
              </h2>

              <p className="mt-0.5 text-[10px] text-gray-400">
                تأكيد حذف المحامي من المكتب
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOpenDeleteLawyer(false)}
            className="flex items-center justify-center w-8 h-8 text-gray-400 transition rounded-lg hover:bg-white/10 hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6">

          <div className="flex items-center gap-3 p-4 border border-red-100 rounded-xl bg-red-50">

            <div className="flex items-center justify-center text-red-500 bg-white rounded-full shadow-sm h-11 w-11 shrink-0">
              {selectedLawyer?.profileImage?.url ? (
                <img
                  src={selectedLawyer.profileImage.url}
                  alt={selectedLawyer.name}
                  className="object-cover rounded-full h-11 w-11"
                />
              ) : (
                <span className="text-[15px] font-bold">
                  {selectedLawyer?.name?.charAt(0)}
                </span>
              )}
            </div>

            <div className="min-w-0 text-right">
              <p className="truncate text-[13px] font-bold text-[#111827]">
                {selectedLawyer?.name}
              </p>

              <p className="mt-1 truncate text-[11px] text-gray-500">
                {selectedLawyer?.email}
              </p>
            </div>
          </div>

          <p className="mt-5 text-center text-[13px] leading-6 text-gray-600">
            هل أنت متأكد من حذف هذا المحامي؟
            <br />
            <span className="text-[11px] text-gray-400">
              لا يمكن التراجع عن هذا الإجراء.
            </span>
          </p>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-white border-t border-gray-100">
          <div className="flex items-center gap-3">

            <button
              type="button"
              onClick={() => setOpenDeleteLawyer(false)}
              disabled={loadding}
              className="h-[42px] flex-1 rounded-xl border border-gray-200 bg-white text-[12px] font-semibold text-[#374151] transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              إلغاء
            </button>

            <button
              type="button"
              onClick={()=>{
                handleDeleteLawyerFun(selectedLawyer._id);
              }}
              disabled={loadding}
              className="h-[42px] flex-1 rounded-xl bg-red-500 text-[12px] font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loadding ? "جاري الحذف..." : "حذف المحامي"}
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Delete;