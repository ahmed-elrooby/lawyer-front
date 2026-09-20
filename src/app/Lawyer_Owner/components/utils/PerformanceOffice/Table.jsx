"use client";

import React, { useContext, useMemo, useState } from "react";
import {
  Users,
  Eye,
  Search,
  ChevronLeft,
  ChevronRight,
  BriefcaseBusiness,
  CalendarCheck2,
} from "lucide-react";
import { OwnerContext } from "../../../../../Providers/LawyerOwner/OwnerProvider.js";

const LawyersPerformance = () => {
  const {
    lawyers = [],
    cases = [],
    sessions = [],
  } = useContext(OwnerContext);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  const lawyersPerformance = useMemo(() => {
    return lawyers.map((lawyer) => {
      const lawyerId = lawyer?._id || lawyer?.id;

      // القضايا الخاصة بالمحامي
      const lawyerCases = cases.filter((item) => {
        if (!Array.isArray(item?.lawyers)) return false;

        return item.lawyers.some((caseLawyer) => {
          const caseLawyerId =
            typeof caseLawyer === "object"
              ? caseLawyer?._id
              : caseLawyer;

          return String(caseLawyerId) === String(lawyerId);
        });
      });

      // القضايا التي تم الحكم فيها
      const judgedCases = lawyerCases.filter(
        (item) => item?.status === "judged"
      );

      // الجلسات الخاصة بالمحامي
      const lawyerSessions = sessions.filter((session) => {
        const sessionLawyer =
          session?.lawyerId ||
          session?.lawyer ||
          session?.lawyer_id;

        const sessionLawyerId =
          typeof sessionLawyer === "object"
            ? sessionLawyer?._id
            : sessionLawyer;

        return (
          String(sessionLawyerId) === String(lawyerId)
        );
      });

      return {
        ...lawyer,

        cases: lawyerCases.length,

        closed: judgedCases.length,

        sessions: lawyerSessions.length,

        status: lawyer?.isActive ? "نشط" : "غير نشط",
      };
    });
  }, [lawyers, cases, sessions]);

  const filteredLawyers = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    if (!searchValue) {
      return lawyersPerformance;
    }

    return lawyersPerformance.filter((lawyer) => {
      const name =
        lawyer?.name?.toLowerCase() || "";

      const specialization =
        lawyer?.specialization?.toLowerCase() || "";

      const email =
        lawyer?.email?.toLowerCase() || "";

      return (
        name.includes(searchValue) ||
        specialization.includes(searchValue) ||
        email.includes(searchValue)
      );
    });
  }, [lawyersPerformance, search]);

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
                <Users
                  size={17}
                  className="text-[#4868B4]"
                />
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
          <table className="w-full min-w-[850px] text-right">
            <thead>
              <tr className="border-b border-[#EEF0F3] bg-[#FAFBFC]">
                <th className="px-5 py-3 text-[9px] font-bold text-[#777B84]">
                  المحامي
                </th>

                <th className="px-4 py-3 text-[9px] font-bold text-[#777B84]">
                  القضايا
                </th>

                <th className="px-4 py-3 text-[9px] font-bold text-[#777B84]">
                  القضايا المحكوم فيها
                </th>

                <th className="px-4 py-3 text-[9px] font-bold text-[#777B84]">
                  الجلسات
                </th>

                <th className="px-4 py-3 text-[9px] font-bold text-[#777B84]">
                  نسبة الحكم
                </th>

              
              </tr>
            </thead>

            <tbody>
              {paginatedLawyers.map((lawyer) => {
                const casesCount = lawyer.cases || 0;
                const judgedCount = lawyer.closed || 0;

                const judgedPercentage =
                  casesCount > 0
                    ? Math.round(
                        (judgedCount / casesCount) * 100
                      )
                    : 0;

                return (
                  <tr
                    key={lawyer._id || lawyer.id}
                    className="border-b border-[#F0F1F4] transition hover:bg-[#FBFCFE]"
                  >
                    {/* Lawyer */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {lawyer?.profileImage?.url ? (
                          <img
                            src={lawyer.profileImage.url}
                            alt={lawyer?.name || "محامي"}
                            className="object-cover rounded-full h-9 w-9 shrink-0"
                          />
                        ) : (
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EAF0FF] text-[10px] font-bold text-[#4868B4]">
                            {(lawyer?.name || "م")
                              .split(" ")
                              .slice(0, 2)
                              .map((word) => word[0])
                              .join("")}
                          </div>
                        )}

                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-[10px] font-bold text-[#0B1C30]">
                              {lawyer?.name || "بدون اسم"}
                            </p>

                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                lawyer.status === "نشط"
                                  ? "bg-[#258A5A]"
                                  : "bg-[#C24A4A]"
                              }`}
                            />
                          </div>

                          <p className="mt-1 text-[8px] text-[#8A8E96]">
                            {lawyer?.specialization ||
                              lawyer?.email ||
                              "محامي"}
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
                          {casesCount}
                        </span>
                      </div>
                    </td>

                    {/* Judged */}
                    <td className="px-4 py-4">
                      <div>
                        <span className="text-[11px] font-bold text-[#258A5A]">
                          {judgedCount}
                        </span>

                        <span className="mr-1 text-[8px] text-[#9AA0A8]">
                          من {casesCount}
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
                          {lawyer.sessions || 0}
                        </span>
                      </div>
                    </td>

                    {/* Judged Percentage */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-[#258A5A]">
                          {judgedPercentage}%
                        </span>

                        <div className="h-1.5 w-[70px] overflow-hidden rounded-full bg-[#EEF0F3]">
                          <div
                            className="h-full rounded-full bg-[#258A5A]"
                            style={{
                              width: `${judgedPercentage}%`,
                            }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Action */}
                    
                  </tr>
                );
              })}
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