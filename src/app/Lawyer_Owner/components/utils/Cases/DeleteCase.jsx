"use client";

import React, { useContext } from "react";
import {
  LuTrash2,
  LuX,
} from "react-icons/lu";
import { OwnerContext } from "../../../../../Providers/LawyerOwner/OwnerProvider.js";

const DeleteCase = ({selectCase}) => {
    const {setOpenDeleteCase,openDeleteCase,handleDeleteCaseFun}=useContext(OwnerContext)
 

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <div className="w-full max-w-md overflow-hidden bg-white shadow-xl rounded-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <h2 className="text-base font-bold text-[#0B1C30]">
            حذف القضية
          </h2>

          <button
            type="button"
            onClick={()=>{
                setOpenDeleteCase(false)
            }}
            className="flex items-center justify-center w-8 h-8 transition rounded-lg text-slate-500 hover:bg-slate-100"
          >
            <LuX size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-6 text-center">
          <div className="flex items-center justify-center w-14 h-14 mx-auto mb-4 rounded-full bg-[#FFF1F1]">
            <LuTrash2
              size={24}
              className="text-[#C94A4A]"
            />
          </div>

          <h3 className="mb-2 text-lg font-bold text-[#0B1C30]">
            هل أنت متأكد من حذف القضية؟
          </h3>

          <p className="text-sm leading-6 text-[#586377]">
            سيتم حذف القضية رقم{" "}
            <span className="font-semibold text-[#0B1C30]">
              {selectCase?.caseNumber || "-"}
            </span>
            . لا يمكن التراجع عن هذا الإجراء.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 px-5 py-4 border-t border-slate-100">
          <button
            type="button"
            onClick={()=>{
                setOpenDeleteCase(false)
            }}
            className="
              flex-1
              h-10
              rounded-lg
              text-sm
              font-medium
              text-[#586377]
              bg-[#F1F5FC]
              hover:bg-[#E5EEFF]
              transition
            "
          >
            إلغاء
          </button>

          <button
            onClick={()=>{
                handleDeleteCaseFun(selectCase?._id)
            }}
            type="button"
            className="
              flex-1
              h-10
              rounded-lg
              text-sm
              font-medium
              text-white
              bg-[#C94A4A]
              hover:bg-[#B83D3D]
              transition
            "
          >
            حذف القضية
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCase;