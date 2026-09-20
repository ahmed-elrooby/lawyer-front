"use client";
import React, { useContext } from "react";
import { Bell, CheckCheck, Settings } from "lucide-react";
import { OwnerContext } from "../../../../../Providers/LawyerOwner/OwnerProvider.js";

const Header = () => {
  const { handleReadNoteFun,unreadNotifications}=useContext(OwnerContext);
  return (
    <header  className="w-full mb-7">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        
        {/* Right Side */}
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-[22px] font-bold text-[#0B1C30]">
              الإشعارات
            </h1>

            <span className="flex items-center gap-1.5 rounded-full bg-[#EAF0FF] px-2.5 py-1 text-[10px] font-bold text-[#4868B4]">
              <Bell size={11} />
             {unreadNotifications?.count || 0} إشعارات غير مقروءة
            </span>
          </div>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#45464D]">
            متابعة جميع التنبيهات والإشعارات الخاصة بالقضايا والجلسات
            والمستندات والعملاء، مع الوصول السريع إلى التفاصيل المهمة.
          </p>
        </div>

        {/* Left Side */}
        <div className="flex flex-wrap items-center gap-2">
          
         

          <button
          onClick={handleReadNoteFun}
            className="
              flex h-10 items-center gap-2 rounded-lg
              bg-[#0B1C30] px-4
              text-[11px] font-bold text-white
              shadow-sm transition hover:bg-[#142A42]
            "
          >
            <CheckCheck size={15} />
            تحديد الكل كمقروء
          </button>

        </div>
      </div>
    </header>
  );
};

export default Header;