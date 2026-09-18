import React from "react";
import {
  Scale,
  Crown,
  FileText,
  CalendarDays,
  Download,
  ArrowLeft,
} from "lucide-react";

const NearActiveCase = () => {
  const caseData = {
    status: "نشطة",
    title: "قضية تنفيذ تجارية",
    description: "تفاصيل القضية ومتابعة الإجراءات القانونية",

    caseNumber: "#2024-001",
    createdAt: "15 مايو 2024",
    court: "المحكمة التجارية",

    client: {
      name: "محمد عبدالله",
      initial: "م",
      identity: "رقم الهوية: 1234567890",
    },

    lawyer: {
      name: "أحمد محمد",
      initial: "أ",
      role: "محامي أول",
    },

    claim: "140,000",
    remaining: "140,000 ر.س",
    progress: 22,

    updates: [
      {
        title: "تم تحديد موعد الجلسة القادمة",
        description: "سيتم عقد الجلسة في المحكمة التجارية",
        status: "جديد",
        statusClass: "bg-[#fff0f0] text-[#d34c4c]",
      },
      {
        title: "تم رفع المستندات المطلوبة",
        description: "تم تحديث ملف القضية",
        status: "مكتمل",
        statusClass: "bg-[#e8f1ff] text-[#60718d]",
      },
    ],

    dates: [
      {
        label: "الجلسة القادمة",
        value: "25 / 06 / 2024",
      },
      {
        label: "آخر جلسة",
        value: "10 / 06 / 2024",
      },
      {
        label: "تاريخ التسجيل",
        value: "15 / 05 / 2024",
      },
    ],
  };

  return (
    <div dir="rtl" className="w-full">

      {/* ================= Info Banner ================= */}
      <div className="mt-6 flex flex-col gap-4 rounded-xl bg-[#e4efff] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">

        <div className="flex items-center gap-3">

          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-[#52627c]">
            <Crown size={17} />
          </div>

          <div>
            <h3 className="text-[10px] font-bold text-[#23314a]">
              متابعة القضايا والمستندات القانونية
            </h3>

            <p className="mt-1 text-[8px] text-[#71809a]">
              يمكنك متابعة جميع تفاصيل القضية من خلال صفحة التفاصيل.
            </p>
          </div>

        </div>

        <button className="flex items-center justify-center gap-2 self-start rounded-lg bg-white px-4 py-2 text-[8px] font-bold text-[#53647f] transition hover:bg-[#f8fbff] sm:self-auto">
          عرض التفاصيل
          <ArrowLeft size={11} />
        </button>

      </div>


      {/* ================= Active Case ================= */}
      <section className="mt-5 overflow-hidden rounded-xl border border-[#edf0f5] border-t-4 border-t-[#d8b63e] bg-white shadow-sm">

        {/* ================= Case Header ================= */}
        <div className="flex items-start justify-between px-6 py-5">

          <div className="text-right">

            <span className="inline-flex rounded-full bg-[#fff4cc] px-3 py-1 text-[7px] font-bold text-[#9c7d1a]">
              {caseData.status}
            </span>

            <h2 className="mt-3 text-[14px] font-bold text-[#172033]">
              {caseData.title}
            </h2>

            <p className="mt-1 text-[8px] text-[#929baa]">
              {caseData.description}
            </p>

          </div>

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#111827] text-white">
            <Scale size={18} />
          </div>

        </div>


        {/* ================= Case Information ================= */}
        <div className="mx-6 grid grid-cols-1 gap-3 rounded-xl bg-[#edf3ff] p-4 sm:grid-cols-3">

          <div className="text-right">
            <p className="text-[7px] text-[#8995a8]">
              رقم القضية
            </p>

            <p className="mt-2 text-[10px] font-bold text-[#243149]">
              {caseData.caseNumber}
            </p>
          </div>


          <div className="text-right">
            <p className="text-[7px] text-[#8995a8]">
              تاريخ الإنشاء
            </p>

            <p className="mt-2 text-[10px] font-bold text-[#243149]">
              {caseData.createdAt}
            </p>
          </div>


          <div className="text-right">
            <p className="text-[7px] text-[#8995a8]">
              المحكمة
            </p>

            <p className="mt-2 text-[10px] font-bold text-[#243149]">
              {caseData.court}
            </p>
          </div>

        </div>


        {/* ================= Client & Lawyer ================= */}
        <div className="grid grid-cols-1 gap-8 px-6 py-6 sm:grid-cols-2">

          {/* Client */}
          <div className="text-right">

            <p className="mb-3 text-[8px] font-bold text-[#697589]">
              بيانات العميل
            </p>

            <div className="flex items-center gap-3">

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#111827] text-[9px] font-bold text-white">
                {caseData.client.initial}
              </div>

              <div>

                <p className="text-[9px] font-bold text-[#202a3b]">
                  {caseData.client.name}
                </p>

                <p className="mt-1 text-[7px] text-[#9aa3b1]">
                  {caseData.client.identity}
                </p>

              </div>

            </div>

          </div>


          {/* Lawyer */}
          <div className="text-right">

            <p className="mb-3 text-[8px] font-bold text-[#697589]">
              المحامي المسؤول
            </p>

            <div className="flex items-center gap-3">

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#edf3ff] text-[9px] font-bold text-[#526786]">
                {caseData.lawyer.initial}
              </div>

              <div>

                <p className="text-[9px] font-bold text-[#202a3b]">
                  {caseData.lawyer.name}
                </p>

                <p className="mt-1 text-[7px] text-[#9aa3b1]">
                  {caseData.lawyer.role}
                </p>

              </div>

            </div>

          </div>

        </div>


        {/* ================= Claim ================= */}
        <div className="px-6">

          <div className="rounded-xl bg-[#dfeeff] p-5">

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <div className="text-right">

                <p className="text-[8px] text-[#77869e]">
                  قيمة المطالبة
                </p>

                <p className="mt-2 text-[22px] font-bold text-[#111827]">
                  {caseData.claim}
                  <span className="mr-1 text-[10px]">
                    ر.س
                  </span>
                </p>

              </div>


              <div className="text-right sm:text-left">

                <p className="text-[7px] text-[#8794a9]">
                  المبلغ المتبقي
                </p>

                <p className="mt-2 text-[9px] font-bold text-[#26344d]">
                  {caseData.remaining}
                </p>

              </div>

            </div>


            {/* Progress */}
            <div className="mt-4">

              <div className="flex items-center justify-between mb-2">

                <span className="text-[7px] text-[#8794a9]">
                  نسبة السداد
                </span>

                <span className="text-[7px] font-bold text-[#52627c]">
                  {caseData.progress}%
                </span>

              </div>

              <div className="h-[5px] overflow-hidden rounded-full bg-white">

                <div
                  className="h-full rounded-full bg-[#111827] transition-all duration-500"
                  style={{
                    width: `${caseData.progress}%`,
                  }}
                />

              </div>

            </div>

          </div>

        </div>


        {/* ================= Updates ================= */}
        <div className="px-6 py-6">

          <div className="flex items-center justify-between mb-3">

            <h3 className="text-[9px] font-bold text-[#354157]">
              آخر تحديثات القضية
            </h3>

            <span className="rounded-full bg-[#edf3ff] px-3 py-1 text-[7px] text-[#65748d]">
              آخر تحديث
            </span>

          </div>


          <div className="space-y-2">

            {caseData.updates.map((update, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-4 rounded-lg bg-[#edf3ff] px-4 py-3 transition hover:bg-[#e8f0fc]"
              >

                <div className="text-right">

                  <p className="text-[8px] font-bold text-[#29364c]">
                    {update.title}
                  </p>

                  <p className="mt-1 text-[7px] text-[#8a96a8]">
                    {update.description}
                  </p>

                </div>

                <span
                  className={`shrink-0 rounded-md px-2 py-1 text-[7px] font-bold ${update.statusClass}`}
                >
                  {update.status}
                </span>

              </div>
            ))}

          </div>


          {/* ================= Dates ================= */}
          <div className="mt-5">

            <div className="flex items-center gap-2 mb-4">

              <CalendarDays
                size={13}
                className="text-[#697589]"
              />

              <h3 className="text-[9px] font-bold text-[#354157]">
                مواعيد القضية
              </h3>

            </div>


            <div className="space-y-3">

              {caseData.dates.map((date, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border-b border-[#f0f2f6] pb-3 last:border-0"
                >

                  <span className="text-[8px] text-[#68758a]">
                    {date.label}
                  </span>

                  <span className="text-[8px] font-bold text-[#28354b]">
                    {date.value}
                  </span>

                </div>
              ))}

            </div>

          </div>


          {/* ================= Actions ================= */}
          <div className="grid grid-cols-1 gap-3 mt-6 sm:grid-cols-2">

            <button className="flex h-9 items-center justify-center gap-2 rounded-lg bg-[#111827] text-[8px] font-bold text-white transition hover:bg-[#1f2937]">

              <FileText size={13} />

              عرض تفاصيل القضية

            </button>


            <button className="flex h-9 items-center justify-center gap-2 rounded-lg bg-[#dfeaff] text-[8px] font-bold text-[#52627c] transition hover:bg-[#d5e5ff]">

              <Download size={13} />

              تحميل المستندات

            </button>

          </div>

        </div>

      </section>

    </div>
  );
};

export default NearActiveCase;