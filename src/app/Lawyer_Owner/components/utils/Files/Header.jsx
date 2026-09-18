import React from "react";
import { FileText, Plus, Download } from "lucide-react";

const Header = () => {
  return (
    <header dir="rtl" className="w-full mb-7">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">

        {/* Right Side */}
        <div className="min-w-0">

          {/* Title */}
          <div className="flex flex-wrap items-center gap-2">

            <h1 className="text-[22px] font-bold text-[#0B1C30]">
              صيغ الدعاوى
            </h1>

            <span className="flex items-center gap-1.5 rounded-full bg-[#EAF0FF] px-2.5 py-1 text-[10px] font-bold text-[#4868B4]">
              <FileText size={11} />
              128 صيغة قانونية
            </span>

          </div>

          {/* Description */}
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#45464D]">
            مكتبة متكاملة لإدارة وحفظ الصيغ القانونية والدعاوى،
            مع إمكانية البحث والتصنيف والوصول السريع إلى الصيغ المستخدمة.
          </p>

        </div>

        {/* Left Side */}
        <div className="flex flex-wrap items-center gap-2">

          {/* Export */}
          <button
            className="
              flex h-10 items-center gap-2 rounded-lg
              border border-[#E4D7A8]
              bg-[#FFF9E8]
              px-4
              text-[11px] font-bold
              text-[#806700]
              transition
              hover:bg-[#FFF3C9]
            "
          >
            <Download size={15} />
            تصدير الصيغ
          </button>

          {/* Add */}
          <button
            className="
              flex h-10 items-center gap-2 rounded-lg
              bg-[#0B1C30]
              px-4
              text-[11px] font-bold
              text-white
              shadow-sm
              transition
              hover:bg-[#142A42]
            "
          >
            <Plus size={16} />
            إضافة صيغة جديدة
          </button>

        </div>

      </div>
    </header>
  );
};

export default Header;