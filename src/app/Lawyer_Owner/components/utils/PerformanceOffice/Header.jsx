import React from "react";
import { BarChart3, Download, CalendarDays } from "lucide-react";

const Header = () => {
  return (
    <header dir="rtl" className="w-full mb-7">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        
        {/* Right Side */}
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-[22px] font-bold text-[#0B1C30]">
              أداء المكتب
            </h1>

            <span className="flex items-center gap-1.5 rounded-full bg-[#EAF0FF] px-2.5 py-1 text-[10px] font-bold text-[#4868B4]">
              <BarChart3 size={11} />
              مؤشرات الأداء
            </span>
          </div>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#45464D]">
            متابعة أداء المكتب وتحليل مؤشرات القضايا والجلسات والمحامين،
            مع عرض إحصائيات تساعد على قياس مستوى الإنجاز والكفاءة.
          </p>
        </div>

 
      </div>
    </header>
  );
};

export default Header;