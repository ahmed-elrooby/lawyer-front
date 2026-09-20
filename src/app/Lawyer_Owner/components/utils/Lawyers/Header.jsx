"use client";
import React, { useContext } from "react";
import { FaDownload, FaUserPlus } from "react-icons/fa";
import { OwnerContext } from "../../../../../Providers/LawyerOwner/OwnerProvider.js";
import AddLawyer from "./AddLawyer.jsx";

const Header = () => {
  const {setOpenAddLawyer,openAddLawyer}=useContext(OwnerContext)
  return <>
{
  openAddLawyer && <AddLawyer/>
}
 
    <header  className="w-full mb-7">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        
        {/* Right Side - Title & Description */}
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-[22px] font-bold text-[#0B1C30]">
              فريق المحامين والمستشارين
            </h1>

            <span className="bg-[#D5E0F8] px-2.5 py-1 rounded-full text-[11px] text-[#45464D] font-bold whitespace-nowrap">
              12 عضواً مرخصاً
            </span>
          </div>

          <p className="mt-2 max-w-[700px] text-sm leading-6 text-[#45464D]">
            متابعة وتوزيع القضايا، قياس كفاءة الترافع، ونشاط المستشارين
            الميداني والمكتبي وفق معايير الجودة القضائية
          </p>
        </div>

        {/* Left Side - Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Export */}
          <button
            type="button"
            className="
              flex items-center justify-center gap-2
              rounded-lg
              bg-white
              border border-[#E7EAF0]
              px-4 py-2
              text-[11px]
              font-bold
              text-[#0B1C30]
              transition-all duration-200
              hover:bg-[#F8F9FB]
              hover:border-[#D9DEE8]
              active:scale-95
            "
          >
            <FaDownload className="text-[#755B00] text-[12px]" />
            <span>تصدير الكشف</span>
          </button>

          {/* Add Lawyer */}
          <button
          onClick={()=>{
            setOpenAddLawyer(true)
          }}
            type="button"
            className="
              flex items-center justify-center gap-2
              rounded-lg
              bg-[#111827]
              px-4 py-2.5
              text-[10px]
              font-bold
              text-white
              transition-all duration-200
              hover:bg-[#1F2937]
              hover:-translate-y-0.5
              active:scale-95
            "
          >
            <FaUserPlus className="text-[11px]" />
            <span>إضافة محامٍ جديد</span>
          </button>
        </div>
      </div>
    </header>

  </>;
};

export default Header;