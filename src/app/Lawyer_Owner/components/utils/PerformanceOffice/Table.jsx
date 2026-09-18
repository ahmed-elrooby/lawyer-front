"use client";
import React, { useMemo, useState } from "react";
import {
  Users,
  Eye,
  Search,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  BriefcaseBusiness,
  CalendarCheck2,
} from "lucide-react";

const LawyersPerformance = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  const lawyers = [
    {
      id: 1,
      name: "أحمد محمد علي",
      specialization: "محامي استئناف",
      cases: 22,
      closed: 14,
      sessions: 18,
      success: 92,
      efficiency: 86,
      status: "نشط",
    },
    {
      id: 2,
      name: "محمد أحمد حسن",
      specialization: "محامي ومستشار قانوني",
      cases: 38,
      closed: 24,
      sessions: 27,
      success: 88,
      efficiency: 82,
      status: "نشط",
    },
    {
      id: 3,
      name: "خالد عبد الرحمن",
      specialization: "محامي أحوال شخصية",
      cases: 24,
      closed: 18,
      sessions: 21,
      success: 95,
      efficiency: 91,
      status: "نشط",
    },
    {
      id: 4,
      name: "سامي محمود",
      specialization: "محامي مدني",
      cases: 14,
      closed: 11,
      sessions: 13,
      success: 91,
      efficiency: 79,
      status: "نشط",
    },
    {
      id: 5,
      name: "ياسر إبراهيم",
      specialization: "محامي تجاري",
      cases: 31,
      closed: 21,
      sessions: 24,
      success: 87,
      efficiency: 67,
      status: "مشغول",
    },
    {
      id: 6,
      name: "عمر حسن",
      specialization: "محامي استئناف",
      cases: 19,
      closed: 15,
      sessions: 17,
      success: 94,
      efficiency: 84,
      status: "نشط",
    },
    {
      id: 7,
      name: "محمود علي",
      specialization: "محامي جنائي",
      cases: 27,
      closed: 19,
      sessions: 22,
      success: 89,
      efficiency: 81,
      status: "نشط",
    },
  ];

  const filteredLawyers = useMemo(() => {
    return lawyers.filter(
      (lawyer) =>
        lawyer.name.includes(search) ||
        lawyer.specialization.includes(search)
    );
  }, [search]);

  const totalPages = Math.ceil(
    filteredLawyers.length / itemsPerPage
  );

  const paginatedLawyers = filteredLawyers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <section dir="rtl" className="w-full mb-7">
      <div className="overflow-hidden rounded-xl border border-[#E8EAF0] bg-white shadow-[0_2px_8px_rgba(11,28,48,0.03)]">

        {/* Header */}
        <div className="border-b border-[#EEF0F3] p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EAF0FF]">
                <Users size={17} className="text-[#4868B4]" />
              </div>

              <div>
                <h2 className="text-[14px] font-bold text-[#0B1C30]">
                  أداء المحامين
                </h2>

                <p className="mt-1 text-[9px] text-[#8A8E96]">
                  مقارنة مؤشرات الأداء والإنتاجية لكل محامي
                </p>
              </div>
            </div>

            {/* Search */}
            <div className="relative w-full lg:w-[260px]">
              <Search
                size={14}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9AA0A8]"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="ابحث عن محامي..."
                className="h-9 w-full rounded-lg border border-[#E1E4E9] bg-[#FAFBFC] pr-9 pl-3 text-[10px] text-[#0B1C30] outline-none transition placeholder:text-[#A0A5AD] focus:border-[#B8C5DD] focus:bg-white"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px] text-right">
            <thead>
              <tr className="border-b border-[#EEF0F3] bg-[#FAFBFC]">
                <th className="px-5 py-3 text-[9px] font-bold text-[#777B84]">
                  المحامي
                </th>

                <th className="px-4 py-3 text-[9px] font-bold text-[#777B84]">
                  القضايا
                </th>

                <th className="px-4 py-3 text-[9px] font-bold text-[#777B84]">
                  القضايا المغلقة
                </th>

                <th className="px-4 py-3 text-[9px] font-bold text-[#777B84]">
                  الجلسات
                </th>

                <th className="px-4 py-3 text-[9px] font-bold text-[#777B84]">
                  معدل النجاح
                </th>

                <th className="px-4 py-3 text-[9px] font-bold text-[#777B84]">
                  الكفاءة
                </th>

                <th className="px-5 py-3 text-center text-[9px] font-bold text-[#777B84]">
                  الإجراء
                </th>
              </tr>
            </thead>

            <tbody>
              {paginatedLawyers.map((lawyer) => (
                <tr
                  key={lawyer.id}
                  className="border-b border-[#F0F1F4] transition hover:bg-[#FBFCFE]"
                >
                  {/* Lawyer */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EAF0FF] text-[10px] font-bold text-[#4868B4]">
                        {lawyer.name
                          .split(" ")
                          .slice(0, 2)
                          .map((word) => word[0])
                          .join("")}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-[10px] font-bold text-[#0B1C30]">
                            {lawyer.name}
                          </p>

                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              lawyer.status === "نشط"
                                ? "bg-[#258A5A]"
                                : "bg-[#C5A62A]"
                            }`}
                          />
                        </div>

                        <p className="mt-1 text-[8px] text-[#8A8E96]">
                          {lawyer.specialization}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Cases */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <BriefcaseBusiness
                        size={13}
                        className="text-[#4868B4]"
                      />

                      <span className="text-[11px] font-bold text-[#0B1C30]">
                        {lawyer.cases}
                      </span>
                    </div>
                  </td>

                  {/* Closed */}
                  <td className="px-4 py-4">
                    <div>
                      <span className="text-[11px] font-bold text-[#258A5A]">
                        {lawyer.closed}
                      </span>

                      <span className="mr-1 text-[8px] text-[#9AA0A8]">
                        من {lawyer.cases}
                      </span>
                    </div>
                  </td>

                  {/* Sessions */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <CalendarCheck2
                        size={13}
                        className="text-[#7950B5]"
                      />

                      <span className="text-[11px] font-bold text-[#0B1C30]">
                        {lawyer.sessions}
                      </span>
                    </div>
                  </td>

                  {/* Success */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-[#258A5A]">
                        {lawyer.success}%
                      </span>

                      <div className="h-1.5 w-[70px] overflow-hidden rounded-full bg-[#EEF0F3]">
                        <div
                          className="h-full rounded-full bg-[#258A5A]"
                          style={{
                            width: `${lawyer.success}%`,
                          }}
                        />
                      </div>
                    </div>
                  </td>

                  {/* Efficiency */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-[#4868B4]">
                        {lawyer.efficiency}%
                      </span>

                      <div className="h-1.5 w-[70px] overflow-hidden rounded-full bg-[#EEF0F3]">
                        <div
                          className="h-full rounded-full bg-[#4868B4]"
                          style={{
                            width: `${lawyer.efficiency}%`,
                          }}
                        />
                      </div>
                    </div>
                  </td>

                  {/* Action */}
                  <td className="px-5 py-4">
                    <div className="flex justify-center">
                      <button className="flex h-8 items-center gap-1.5 rounded-md border border-[#E4E7EC] px-3 text-[9px] font-bold text-[#59616D] transition hover:border-[#C8D2E5] hover:bg-[#F5F7FB] hover:text-[#4868B4]">
                        <Eye size={13} />
                        عرض التفاصيل
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty */}
        {paginatedLawyers.length === 0 && (
          <div className="text-center py-14">
            <p className="text-[11px] font-bold text-[#59616D]">
              لا يوجد محامٍ مطابق للبحث
            </p>
          </div>
        )}

        {/* Pagination */}
        {filteredLawyers.length > 0 && (
          <div className="flex flex-col gap-3 border-t border-[#EEF0F3] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[9px] text-[#8A8E96]">
              عرض{" "}
              <span className="font-bold text-[#59616D]">
                {(currentPage - 1) * itemsPerPage + 1}
              </span>{" "}
              إلى{" "}
              <span className="font-bold text-[#59616D]">
                {Math.min(
                  currentPage * itemsPerPage,
                  filteredLawyers.length
                )}
              </span>{" "}
              من{" "}
              <span className="font-bold text-[#59616D]">
                {filteredLawyers.length}
              </span>{" "}
              محامي
            </p>

            <div className="flex items-center gap-1">
              <button
                disabled={currentPage === 1}
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.max(prev - 1, 1)
                  )
                }
                className="flex h-8 w-8 items-center justify-center rounded-md border border-[#E4E7EC] text-[#59616D] transition hover:bg-[#F5F6F8] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronRight size={14} />
              </button>

              {Array.from(
                { length: totalPages },
                (_, index) => index + 1
              ).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`flex h-8 min-w-8 items-center justify-center rounded-md px-2 text-[9px] font-bold transition ${
                    currentPage === page
                      ? "bg-[#0B1C30] text-white"
                      : "border border-[#E4E7EC] text-[#59616D] hover:bg-[#F5F6F8]"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.min(prev + 1, totalPages)
                  )
                }
                className="flex h-8 w-8 items-center justify-center rounded-md border border-[#E4E7EC] text-[#59616D] transition hover:bg-[#F5F6F8] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default LawyersPerformance;