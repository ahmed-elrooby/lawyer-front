"use client";

import React, {
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Search,
  SlidersHorizontal,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  FileText,
} from "lucide-react";
import { OwnerContext } from "../../../../../Providers/LawyerOwner/OwnerProvider.js";
import Details from "./Details.jsx";
import Update from "./Update.jsx";
import Delete from "./Delete.jsx";

const ITEMS_PER_PAGE = 10;

const Table = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [lawyer, setLawyer] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
const [openMenu, setOpenMenu] = useState(null);
  const { clients,openUpdateClient,setOpenUpdateClient ,openDeleteClient, setOpenDeleteClient} = useContext(OwnerContext);
const [selectedClient, setSelectedClient] = useState(null);
const [openDetails, setOpenDetails] = useState(false);
  // ================= Dynamic Clients =================

  
const formattedClients = useMemo(() => {
  if (!Array.isArray(clients)) return [];

  return clients.map((client) => {
    const clientName = client?.name || "غير معروف";

    const clientImage =
      client?.profileImage?.url || "";

    const clientCases = Array.isArray(client?.cases)
      ? client.cases
      : [];

    // ================= Get All Lawyers =================
    const lawyersMap = new Map();

    clientCases.forEach((caseItem) => {
      if (!Array.isArray(caseItem?.lawyers)) return;

      caseItem.lawyers.forEach((lawyerItem) => {
        if (!lawyerItem?._id) return;

        if (!lawyersMap.has(lawyerItem._id)) {
          lawyersMap.set(
            lawyerItem._id,
            lawyerItem,
          );
        }
      });
    });

    const lawyers = Array.from(
      lawyersMap.values(),
    );

    return {
      // مهم جدًا: احتفظ بكل بيانات العميل الأصلية
      ...client,

      id: client?._id,

      // ================= Client =================
      client: clientName,

      clientImage,

      clientInitial:
        clientName?.charAt(0) || "ع",

      clientType:
        client?.gender === "female"
          ? "عميلة"
          : "عميل",

      clientBg: "bg-[#111827]",

      clientText: "text-white",

      // ================= Cases =================
      cases: clientCases,

      casesCount:
        client?.casesCount ??
        clientCases.length,

      // ================= Lawyers =================
      lawyers,

      // ================= Updated =================
      updated: client?.updatedAt
        ? new Date(
            client.updatedAt,
          ).toLocaleDateString("ar-EG")
        : "غير محدد",

      // ================= Status =================
      status: client?.isActive
        ? "نشط"
        : "غير نشط",

      statusBg: client?.isActive
        ? "bg-[#eaf8ef]"
        : "bg-[#fff0f0]",

      statusText: client?.isActive
        ? "text-[#3d9561]"
        : "text-[#d84b4b]",
    };
  });
}, [clients]);

  // ================= Lawyers Filter =================
  const lawyers = useMemo(() => {
    const uniqueLawyers = new Map();

    formattedClients.forEach((client) => {
      client.lawyers.forEach((lawyerItem) => {
        if (!lawyerItem?._id) return;

        if (!uniqueLawyers.has(lawyerItem._id)) {
          uniqueLawyers.set(
            lawyerItem._id,
            lawyerItem,
          );
        }
      });
    });

    return Array.from(
      uniqueLawyers.values(),
    );
  }, [formattedClients]);

  // ================= Filter =================
  const filteredClients = useMemo(() => {
    return formattedClients.filter((item) => {
      const searchValue =
        search.toLowerCase().trim();

      const matchesSearch =
        item.client
          .toLowerCase()
          .includes(searchValue) ||
        item.cases.some((caseItem) =>
          caseItem?.caseNumber
            ?.toLowerCase()
            .includes(searchValue),
        );

      const matchesStatus =
        status === "all" ||
        (status === "active" &&
          item.status === "نشط") ||
        (status === "inactive" &&
          item.status === "غير نشط");

      const matchesLawyer =
        lawyer === "all" ||
        item.lawyers.some(
          (lawyerItem) =>
            lawyerItem?._id === lawyer,
        );

      return (
        matchesSearch &&
        matchesStatus &&
        matchesLawyer
      );
    });
  }, [
    formattedClients,
    search,
    status,
    lawyer,
  ]);

  // ================= Pagination =================
  const totalPages = Math.ceil(
    filteredClients.length / ITEMS_PER_PAGE,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search, status, lawyer]);

  useEffect(() => {
    if (
      totalPages > 0 &&
      currentPage > totalPages
    ) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedClients = useMemo(() => {
    const startIndex =
      (currentPage - 1) *
      ITEMS_PER_PAGE;

    return filteredClients.slice(
      startIndex,
      startIndex + ITEMS_PER_PAGE,
    );
  }, [
    filteredClients,
    currentPage,
  ]);

  const startItem =
    filteredClients.length > 0
      ? (currentPage - 1) *
          ITEMS_PER_PAGE +
        1
      : 0;

  const endItem = Math.min(
    currentPage * ITEMS_PER_PAGE,
    filteredClients.length,
  );

  return <>
  {
    openDetails && <Details
      selectedClient={selectedClient}
      openDetails={openDetails}
      setOpenDetails={setOpenDetails}
    />
  }
  {
    openUpdateClient && <Update 
      selectedClient={selectedClient}/>
  }
  {
    openDeleteClient && <Delete 
      selectedClient={selectedClient}/>
  }
    <div
      className="w-full"
    >
      {/* ================= Filters ================= */}
      <div className="mb-5 flex flex-wrap items-center gap-3 rounded-xl border border-[#e8ecf3] bg-white p-3">
        {/* Search */}
        <div className="relative min-w-[220px] flex-1">
          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="ابحث باسم العميل أو رقم القضية..."
            className="h-9 w-full rounded-lg border border-[#e5e9f1] bg-[#fafbfe] px-4 pr-10 text-[9px] text-[#344054] outline-none transition focus:border-[#cfd6e2] focus:ring-2 focus:ring-[#edf1f7]"
          />

          <Search
            size={14}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#98a2b3]"
          />
        </div>

     

        {/* Status */}
        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
          className="h-9 rounded-lg border border-[#e5e9f1] bg-white px-4 text-[9px] text-[#657083] outline-none transition focus:border-[#cfd6e2]"
        >
          <option value="all">
            كل الحالات
          </option>

          <option value="active">
            نشط
          </option>

          <option value="inactive">
            غير نشط
          </option>
        </select>

        {/* Lawyer */}
        <select
          value={lawyer}
          onChange={(e) =>
            setLawyer(e.target.value)
          }
          className="h-9 rounded-lg border border-[#e5e9f1] bg-white px-4 text-[9px] text-[#657083] outline-none transition focus:border-[#cfd6e2]"
        >
          <option value="all">
            كل المحامين
          </option>

          {lawyers.map((lawyerItem) => (
            <option
              key={lawyerItem._id}
              value={lawyerItem._id}
            >
              {lawyerItem.name}
            </option>
          ))}
        </select>

        {/* Filter */}
        <button
          onClick={() => {
            setSearch("");
            setStatus("all");
            setLawyer("all");
          }}
          className="flex h-9 items-center gap-2 rounded-lg border border-[#e5e9f1] bg-white px-4 text-[9px] text-[#687386] transition hover:bg-[#fafbfe]"
        >
          <SlidersHorizontal size={13} />
          تصفية
        </button>
      </div>

      {/* ================= Desktop Table ================= */}
      <section className="hidden overflow-hidden rounded-xl border border-[#e7ebf2] bg-white shadow-sm md:block">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5">
          <div className="text-right">
            <h2 className="text-[13px] font-bold text-[#172033]">
              أحدث العملاء
            </h2>

            <p className="mt-1 text-[8px] text-[#99a2b1]">
              عرض آخر العملاء المسجلين في النظام
            </p>
          </div>

          <button className="text-[9px] font-bold text-[#687386] transition hover:text-[#111827]">
            عرض الكل ←
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-right">
            <thead>
              <tr className="border-y border-[#edf0f5] bg-[#f8faff] text-[8px] text-[#8b95a5]">
                <th className="px-5 py-4 font-normal">
                  العميل
                </th>

                <th className="px-5 py-4 font-normal">
                  القضايا
                </th>

                <th className="px-5 py-4 font-normal">
                  المحامين المسؤولين
                </th>

                <th className="px-5 py-4 font-normal">
                  آخر تحديث
                </th>

                <th className="px-5 py-4 font-normal">
                  الحالة
                </th>

                <th className="px-5 py-4 font-normal">
                  الإجراءات
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#f0f2f6]">
              {paginatedClients.length > 0 ? (
                paginatedClients.map(
                  (item) => (
                    <tr
                      key={item.id}
                      className="transition hover:bg-[#fafbfe]"
                    >
                      {/* Client */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          {item.clientImage ? (
                            <img
                              src={
                                item.clientImage
                              }
                              alt={
                                item.client
                              }
                              className="object-cover w-8 h-8 rounded-full"
                            />
                          ) : (
                            <div
                              className={`flex h-8 w-8 items-center justify-center rounded-full text-[9px] font-bold ${item.clientBg} ${item.clientText}`}
                            >
                              {
                                item.clientInitial
                              }
                            </div>
                          )}

                          <div>
                            <p className="text-[9px] font-bold text-[#20293a]">
                              {
                                item.client
                              }
                            </p>

                            <p className="mt-1 text-[7px] text-[#9ca5b3]">
                              {
                                item.clientType
                              }
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Cases */}
                      <td className="px-5 py-4">
                        <button
                          type="button"
                          className="flex items-center gap-2"
                        >
                          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#edf3ff] text-[#62718a]">
                            <FileText
                              size={13}
                            />
                          </div>

                          <div className="text-right">
                            {item.cases
                              ?.length >
                            0 ? (
                              <p className="text-[9px] font-bold text-[#344054]">
                                {item
                                  .cases[0]
                                  ?.caseNumber ||
                                  "قضية"}
                              </p>
                            ) : (
                              <p className="text-[9px] font-bold text-[#98a2b3]">
                                لا توجد قضايا
                              </p>
                            )}

                            {item.casesCount >
                              1 && (
                              <p className="mt-1 text-[7px] text-[#8b95a5]">
                                +
                                {item.casesCount -
                                  1}{" "}
                                قضية
                              </p>
                            )}
                          </div>
                        </button>
                      </td>

                      {/* Lawyers */}
                      <td className="px-5 py-4">
                        <button
                          type="button"
                          className="flex items-center gap-2"
                        >
                          {item.lawyers
                            ?.length >
                          0 ? (
                            item.lawyers[0]
                              ?.profileImage
                              ?.url ? (
                              <img
                                src={
                                  item
                                    .lawyers[0]
                                    .profileImage
                                    .url
                                }
                                alt={
                                  item
                                    .lawyers[0]
                                    ?.name
                                }
                                className="object-cover w-6 h-6 rounded-full"
                              />
                            ) : (
                              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#dfe8f7] text-[7px] text-[#536985]">
                                {item
                                  .lawyers[0]
                                  ?.name?.charAt(
                                    0,
                                  )}
                              </div>
                            )
                          ) : (
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#f3f4f6] text-[7px] text-[#667085]">
                              -
                            </div>
                          )}

                          <span className="text-[8px] text-[#667085]">
                            {item
                              .lawyers?.[0]
                              ?.name ||
                              "غير محدد"}
                          </span>

                          {item.lawyers
                            ?.length >
                            1 && (
                            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#edf3ff] px-1 text-[7px] font-bold text-[#62718a]">
                              +
                              {item.lawyers
                                .length -
                                1}
                            </span>
                          )}
                        </button>
                      </td>

                      {/* Updated */}
                      <td className="px-5 py-4 text-[8px] text-[#7f8999]">
                        {item.updated}
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-[7px] font-bold ${item.statusBg} ${item.statusText}`}
                        >
                          {
                            item.status
                          }
                        </span>
                      </td>

                      {/* Actions */}
              <td className="px-5 py-4">
  <div className="relative">
    <button
      type="button"
      onClick={() =>
        setOpenMenu(
          openMenu === item.id
            ? null
            : item.id,
        )
      }
      className="flex h-7 w-7 items-center justify-center rounded-md border border-[#e8ebf0] text-[#768195] transition hover:bg-[#f5f7fa] hover:text-[#111827]"
      title="الإجراءات"
    >
      <MoreVertical size={14} />
    </button>

    {openMenu === item.id && (
      <div className="absolute left-0 top-9 z-50 w-32 overflow-hidden rounded-lg border border-[#e8ebf0] bg-white p-1 shadow-lg">
        {/* تفاصيل */}
        <button
          type="button"
          onClick={() => {
          setOpenMenu(null);
          setSelectedClient(item);
          setOpenDetails(true);

          // فتح Modal التفاصيل
        }}
          className="flex w-full items-center rounded-md px-3 py-2 text-right text-[8px] text-[#344054] transition hover:bg-[#f5f7fa]"
        >
          تفاصيل
        </button>

        {/* تعديل */}
        <button
          type="button"
          onClick={() => {
            setOpenMenu(null);
            setSelectedClient(item);
            setOpenUpdateClient(true); 

            // افتح Modal التعديل هنا
          }}
          className="flex w-full items-center rounded-md px-3 py-2 text-right text-[8px] text-[#344054] transition hover:bg-[#f5f7fa]"
        >
          تعديل
        </button>

        {/* حذف */}
        <button
          type="button"
          onClick={() => {
            setOpenMenu(null);
            setSelectedClient(item);
            setOpenDeleteClient(true);
            // افتح Modal تأكيد الحذف هنا
          }}
          className="flex w-full items-center rounded-md px-3 py-2 text-right text-[8px] text-[#d84b4b] transition hover:bg-[#fff5f5]"
        >
          حذف
        </button>
      </div>
    )}
  </div>
</td>
                    </tr>
                  ),
                )
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-5 py-10 text-center text-[10px] text-[#98a2b3]"
                  >
                    لا توجد عملاء مطابقة
                    للبحث
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-[#edf0f5] px-6 py-4">
          <p className="text-[8px] text-[#929baa]">
            عرض {startItem} - {endItem} من
            أصل {filteredClients.length}{" "}
            عميل
          </p>

          <div className="flex items-center gap-1">
            <button
              disabled={
                currentPage === 1 ||
                totalPages === 0
              }
              onClick={() =>
                setCurrentPage(
                  (prev) =>
                    prev - 1,
                )
              }
              className="flex h-7 w-7 items-center justify-center rounded-md border border-[#e7ebf0] text-[#8a94a5] transition hover:bg-[#f8faff] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRight
                size={13}
              />
            </button>

            {Array.from(
              {
                length: totalPages,
              },
              (_, index) => {
                const page =
                  index + 1;

                return (
                  <button
                    key={page}
                    onClick={() =>
                      setCurrentPage(
                        page,
                      )
                    }
                    className={
                      currentPage ===
                      page
                        ? "flex h-7 w-7 items-center justify-center rounded-md bg-[#111827] text-[9px] font-bold text-white"
                        : "flex h-7 w-7 items-center justify-center rounded-md border border-[#e7ebf0] text-[9px] text-[#8a94a5] transition hover:bg-[#f8faff]"
                    }
                  >
                    {page}
                  </button>
                );
              },
            )}

            <button
              disabled={
                currentPage ===
                  totalPages ||
                totalPages === 0
              }
              onClick={() =>
                setCurrentPage(
                  (prev) =>
                    prev + 1,
                )
              }
              className="flex h-7 w-7 items-center justify-center rounded-md border border-[#e7ebf0] text-[#8a94a5] transition hover:bg-[#f8faff] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft
                size={13}
              />
            </button>
          </div>
        </div>
      </section>

      {/* ================= Mobile Cards ================= */}
      <section className="space-y-3 md:hidden">
        <div className="flex items-center justify-between rounded-xl border border-[#e7ebf2] bg-white px-4 py-4 shadow-sm">
          <div>
            <h2 className="text-[13px] font-bold text-[#172033]">
              أحدث العملاء
            </h2>

            <p className="mt-1 text-[8px] text-[#99a2b1]">
              عرض آخر العملاء المسجلين
            </p>
          </div>

          <button className="text-[9px] font-bold text-[#687386]">
            عرض الكل ←
          </button>
        </div>

        {paginatedClients.length > 0 ? (
          paginatedClients.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-[#e7ebf2] bg-white p-4 shadow-sm"
            >
              {/* Client Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {item.clientImage ? (
                    <img
                      src={item.clientImage}
                      alt={item.client}
                      className="object-cover rounded-full h-9 w-9"
                    />
                  ) : (
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-full text-[9px] font-bold ${item.clientBg} ${item.clientText}`}
                    >
                      {item.clientInitial}
                    </div>
                  )}

                  <div>
                    <p className="text-[10px] font-bold text-[#20293a]">
                      {item.client}
                    </p>

                    <p className="mt-1 text-[7px] text-[#9ca5b3]">
                      {item.clientType}
                    </p>
                  </div>
                </div>

               <div className="relative">
  <button
    type="button"
    onClick={() =>
      setOpenMenu(
        openMenu === item.id
          ? null
          : item.id,
      )
    }
    className="flex h-7 w-7 items-center justify-center rounded-md border border-[#e8ebf0] text-[#768195]"
    title="الإجراءات"
  >
    <MoreVertical size={14} />
  </button>

  {openMenu === item.id && (
    <div className="absolute left-0 top-9 z-50 w-32 overflow-hidden rounded-lg border border-[#e8ebf0] bg-white p-1 shadow-lg">
      {/* تفاصيل */}
      <button
        type="button"
        onClick={() => {
          setOpenMenu(null);
          setSelectedClient(item);
          setOpenDetails(true);

          // فتح Modal التفاصيل
        }}
        className="flex w-full rounded-md px-3 py-2 text-right text-[8px] text-[#344054] transition hover:bg-[#f5f7fa]"
      >
        تفاصيل
      </button>

      {/* تعديل */}
      <button
        type="button"
     onClick={() => {
            setOpenMenu(null);
            setSelectedClient(item);
            setOpenUpdateClient(true); 

            // افتح Modal التعديل هنا
          }}
        className="flex w-full rounded-md px-3 py-2 text-right text-[8px] text-[#344054] transition hover:bg-[#f5f7fa]"
      >
        تعديل
      </button>

      {/* حذف */}
      <button
        type="button"
        onClick={() => {
        setOpenMenu(null);
            setSelectedClient(item);
            setOpenDeleteClient(true);

          // فتح Modal تأكيد الحذف
        }}
        className="flex w-full rounded-md px-3 py-2 text-right text-[8px] text-[#d84b4b] transition hover:bg-[#fff5f5]"
      >
        حذف
      </button>
    </div>
  )}
</div>
              </div>

              {/* Cases */}
              <div className="mt-4 flex items-center justify-between border-t border-[#f0f2f6] pt-4">
                <span className="text-[8px] text-[#98a2b3]">
                  القضايا
                </span>

                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#edf3ff] text-[#62718a]">
                    <FileText
                      size={13}
                    />
                  </div>

                  <div className="text-right">
                    {item.cases?.length >
                    0 ? (
                      <p className="max-w-[170px] truncate text-[9px] font-bold text-[#344054]">
                        {
                          item
                            .cases[0]
                            ?.caseNumber
                        }
                      </p>
                    ) : (
                      <p className="text-[9px] text-[#98a2b3]">
                        لا توجد قضايا
                      </p>
                    )}

                    {item.casesCount >
                      1 && (
                      <p className="mt-1 text-[7px] text-[#8b95a5]">
                        +
                        {item.casesCount -
                          1}{" "}
                        قضية
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Lawyers */}
              <div className="flex items-center justify-between mt-3">
                <span className="text-[8px] text-[#98a2b3]">
                  المحامي المسؤول
                </span>

                <div className="flex items-center gap-2">
                  {item.lawyers
                    ?.length > 0 ? (
                    item.lawyers[0]
                      ?.profileImage
                      ?.url ? (
                      <img
                        src={
                          item
                            .lawyers[0]
                            .profileImage
                            .url
                        }
                        alt={
                          item
                            .lawyers[0]
                            ?.name
                        }
                        className="object-cover w-6 h-6 rounded-full"
                      />
                    ) : (
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#dfe8f7] text-[7px] text-[#536985]">
                        {item
                          .lawyers[0]
                          ?.name?.charAt(
                            0,
                          )}
                      </div>
                    )
                  ) : (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#f3f4f6] text-[7px] text-[#667085]">
                      -
                    </div>
                  )}

                  <span className="text-[8px] text-[#667085]">
                    {item
                      .lawyers?.[0]
                      ?.name ||
                      "غير محدد"}
                  </span>

                  {item.lawyers
                    ?.length > 1 && (
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#edf3ff] px-1 text-[7px] font-bold text-[#62718a]">
                      +
                      {item.lawyers.length -
                        1}
                    </span>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="mt-4 flex items-center justify-between border-t border-[#f0f2f6] pt-4">
                <div>
                  <p className="text-[7px] text-[#9ca5b3]">
                    آخر تحديث
                  </p>

                  <p className="mt-1 text-[8px] text-[#7f8999]">
                    {item.updated}
                  </p>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-[7px] font-bold ${item.statusBg} ${item.statusText}`}
                >
                  {item.status}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-xl border border-[#e7ebf2] bg-white px-5 py-10 text-center text-[10px] text-[#98a2b3] shadow-sm">
            لا توجد عملاء مطابقة للبحث
          </div>
        )}

        {/* Mobile Pagination */}
        <div className="flex items-center justify-between rounded-xl border border-[#edf0f5] bg-white px-4 py-3">
          <p className="text-[8px] text-[#929baa]">
            {startItem} - {endItem} من{" "}
            {filteredClients.length}
          </p>

          <div className="flex items-center gap-1">
            <button
              disabled={
                currentPage === 1 ||
                totalPages === 0
              }
              onClick={() =>
                setCurrentPage(
                  (prev) =>
                    prev - 1,
                )
              }
              className="flex h-7 w-7 items-center justify-center rounded-md border border-[#e7ebf0] text-[#8a94a5] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRight
                size={13}
              />
            </button>

            {Array.from(
              {
                length: totalPages,
              },
              (_, index) => {
                const page =
                  index + 1;

                return (
                  <button
                    key={page}
                    onClick={() =>
                      setCurrentPage(
                        page,
                      )
                    }
                    className={
                      currentPage ===
                      page
                        ? "flex h-7 w-7 items-center justify-center rounded-md bg-[#111827] text-[9px] font-bold text-white"
                        : "flex h-7 w-7 items-center justify-center rounded-md border border-[#e7ebf0] text-[9px] text-[#8a94a5]"
                    }
                  >
                    {page}
                  </button>
                );
              },
            )}

            <button
              disabled={
                currentPage ===
                  totalPages ||
                totalPages === 0
              }
              onClick={() =>
                setCurrentPage(
                  (prev) =>
                    prev + 1,
                )
              }
              className="flex h-7 w-7 items-center justify-center rounded-md border border-[#e7ebf0] text-[#8a94a5] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft
                size={13}
              />
            </button>
          </div>
        </div>
      </section>
    </div>
  </>
};

export default Table;