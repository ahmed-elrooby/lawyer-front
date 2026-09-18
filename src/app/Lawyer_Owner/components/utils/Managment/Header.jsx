import React from "react";
import { FaSyncAlt } from "react-icons/fa";

const Header = () => {
  return (
    <header className="w-full ">
      <div className="flex items-start justify-between w-full gap-4">

        {/* Right Side */}
        <div className="flex flex-col ">
          <div className="flex items-center gap-2">
            <span className="h-5 w-1.5 rounded-full bg-slate-900"></span>

            <h1 className="text-[24px] font-extrabold leading-none text-slate-900">
              مركز القيادة
            </h1>

            <span className="rounded-full bg-blue-100 px-3 py-1 text-[10px] font-bold text-blue-700">
              غرفة العمليات الحية
            </span>
          </div>

          <p className="mt-3 text-[11px] font-medium text-slate-500">
            متابعة العمليات اليومية وأهم ما يحتاج إلى انتباهك وفريق الدفاع
          </p>
        </div>

        {/* Left Side */}
        <div className="items-center hidden gap-3 pt-1 md:flex">

          <div className="flex items-center h-10 gap-2 px-4 bg-white border rounded-full shadow-sm border-slate-100">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500"></span>

            <span className="text-[10px] font-medium text-slate-500">
              آخر تحديث منذ 3 دقائق
            </span>
          </div>

          <button
            type="button"
            className="flex h-10 items-center gap-2 rounded-full border border-slate-100 bg-white px-4 text-[10px] font-bold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            تحديث البيانات
            <FaSyncAlt className="text-[13px] text-slate-500" />
          </button>

        </div>
      </div>
    </header>
  );
};

export default Header;