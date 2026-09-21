"use client";

import React, { useContext } from "react";
import { FaTasks, FaPlus, FaArrowLeft } from "react-icons/fa";
import { OwnerContext } from "../../../../../Providers/LawyerOwner/OwnerProvider.js";
import AddTask from "./AddTask.jsx";

const SubHeader = () => {
    const {openAddTask,setOpenAddTask}=useContext(OwnerContext)
  return <>
{
    openAddTask && <AddTask/>
}
  
    <div className="relative px-6 py-5 mb-6 overflow-hidden border shadow-sm rounded-2xl border-[#E7EBF2] bg-white">
      <div className="absolute w-40 h-40 rounded-full -right-20 -top-20 bg-[#D5E0F8]/40 blur-3xl" />
      <div className="absolute w-40 h-40 rounded-full -bottom-20 -left-20 bg-[#E8E0C8]/30 blur-3xl" />

      <div className="relative z-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center border h-14 w-14 shrink-0 rounded-2xl border-[#D5DDEB] bg-[#D5E0F8] text-[#0B1C30]">
            <FaTasks className="text-xl" />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold tracking-tight text-[#0B1C30]">
                توزيع المهام
              </h1>

              <span className="rounded-full border border-[#D5DDEB] bg-[#D5E0F8] px-2.5 py-1 text-[10px] font-semibold text-[#45464D]">
                إدارة المكتب
              </span>
            </div>

            <p className="text-sm text-[#45464D]">
              أنشئ المهام ووزّعها على محامي المكتب وتابع حالة التنفيذ
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={()=>{
                setOpenAddTask(true)
            }}
            className="inline-flex items-center justify-center gap-3 px-5 py-3 text-sm font-semibold text-white transition-all duration-200 bg-[#111827] shadow-sm group rounded-xl hover:bg-[#1D2738]"
          >
            <span className="flex items-center justify-center rounded-lg h-7 w-7 bg-white/10">
              <FaPlus className="text-xs" />
            </span>

            إضافة مهمة

            <FaArrowLeft className="text-[10px] opacity-50 transition-transform group-hover:-translate-x-0.5" />
          </button>
        </div>
      </div>
    </div>
 </>
};

export default SubHeader;