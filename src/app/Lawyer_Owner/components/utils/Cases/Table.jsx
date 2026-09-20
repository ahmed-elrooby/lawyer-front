
"use client";

import React, { useContext, useMemo, useState } from "react";
import {
  LuSearch,
  LuLayoutGrid,
  LuList,
  LuEye,
  LuPencil,
  LuTrash2,
  LuChevronDown,
} from "react-icons/lu";

import { OwnerContext } from "../../../../../Providers/LawyerOwner/OwnerProvider.js";
import DeleteCase from "./DeleteCase.jsx";
import Details from "./Details.jsx";
import UpdateCase from "./UpdateCase.jsx";

const ITEMS_PER_PAGE = 5;

const STATUS_LABELS = {
  active: "قيد النظر",
  reserved_for_judgment: "محجوزة للحكم",
  judged: "تم الحكم",
};

const STATUS_STYLES = {
  active: "bg-[#E5EEFF] text-[#315DAA]",
  reserved_for_judgment: "bg-[#F3E8FF] text-[#7E22CE]",
  judged: "bg-[#E8F5EC] text-[#31804A]",
};

const getDate = (date) => {
  if (!date) return "-";

  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const Table = () => {
  const {
    cases: caseList = [],
    clients: clientList = [],
    setOpenDeleteCase,
    openDeleteCase,
    openUpdateCase,
    setOpenUpdateCase,
  } = useContext(OwnerContext);

  const [selectCase, setSelectCase] = useState(null);
  const [openDetails, setOpenDetails] = useState(false);
  const [view, setView] = useState("table");
  const [search, setSearch] = useState("");
  const [caseFilter, setCaseFilter] = useState("");
  const [lawyerFilter, setLawyerFilter] = useState("");
  const [clientFilter, setClientFilter] = useState("");
  const [page, setPage] = useState(1);

  const selectCaseHandler = (item, action) => {
    setSelectCase(item);

    if (action === "details") setOpenDetails(true);
    if (action === "update") setOpenUpdateCase(true);
    if (action === "delete") setOpenDeleteCase(true);
  };

  const clientsMap = useMemo(
    () =>
      new Map(
        clientList.map((client) => [String(client._id), client])
      ),
    [clientList]
  );

  const formattedCases = useMemo(
    () =>
      caseList.map((item) => {
        const client =
          item.clientId && typeof item.clientId === "object"
            ? item.clientId
            : clientsMap.get(String(item.clientId));

        const lawyers = Array.isArray(item.lawyers)
          ? item.lawyers
          : [];

        return {
          ...item,
          client,
          clientName: client?.name || "غير محدد",
          clientImage: client?.profileImage?.url || "",
          lawyers,
          lawyerNames: lawyers
            .map((lawyer) => lawyer?.name)
            .filter(Boolean),
          formattedDate: getDate(item.filingDate),
        };
      }),
    [caseList, clientsMap]
  );

  const caseOptions = useMemo(
    () => [
      ...new Set(
        formattedCases
          .map((item) => item.caseNumber)
          .filter(Boolean)
      ),
    ],
    [formattedCases]
  );

  const lawyerOptions = useMemo(
    () => [
      ...new Set(
        formattedCases.flatMap((item) => item.lawyerNames)
      ),
    ],
    [formattedCases]
  );

  const clientOptions = useMemo(
    () => [
      ...new Set(
        clientList
          .map((client) => client?.name)
          .filter(Boolean)
      ),
    ],
    [clientList]
  );

  const filteredData = useMemo(() => {
    const value = search.trim().toLowerCase();

    return formattedCases.filter((item) => {
      const matchesSearch =
        !value ||
        item.caseNumber?.toLowerCase().includes(value) ||
        item.clientName?.toLowerCase().includes(value) ||
        item.lawyerNames
          .join(" ")
          .toLowerCase()
          .includes(value) ||
        item.court?.toLowerCase().includes(value);

      return (
        matchesSearch &&
        (!caseFilter || item.caseNumber === caseFilter) &&
        (!lawyerFilter ||
          item.lawyerNames.includes(lawyerFilter)) &&
        (!clientFilter || item.clientName === clientFilter)
      );
    });
  }, [
    formattedCases,
    search,
    caseFilter,
    lawyerFilter,
    clientFilter,
  ]);

  const totalPages = Math.ceil(
    filteredData.length / ITEMS_PER_PAGE
  );

  const currentData = filteredData.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const resetPage = () => setPage(1);

  const clearFilters = () => {
    setCaseFilter("");
    setLawyerFilter("");
    setClientFilter("");
    resetPage();
  };

  const filterClass =
    "appearance-none w-full h-10 pr-3 pl-9 bg-[#F8FAFD] border border-[#E5EEFF] rounded-lg text-xs text-[#45464D] outline-none cursor-pointer";

  const avatar = (image, name, size = "w-8 h-8") =>
    image ? (
      <img
        src={image}
        alt={name}
        className={`${size} rounded-full object-cover border border-[#E5EEFF]`}
      />
    ) : (
      <div
        className={`flex items-center justify-center ${size} rounded-full bg-[#E5EEFF] text-[#315DAA] text-xs font-semibold`}
      >
        {name && name !== "غير محدد"
          ? name.charAt(0)
          : "؟"}
      </div>
    );

  const status = (item) => (
    <span
      className={`inline-flex items-center px-2 py-1 rounded-md text-[10px] font-medium ${
        STATUS_STYLES[item.status] ||
        "bg-[#F1F5FC] text-[#586377]"
      }`}
    >
      {STATUS_LABELS[item.status] ||
        item.status ||
        "غير محددة"}
    </span>
  );

  const lawyersView = (item, card = false) => {
    const lawyers = item.lawyers || [];

    if (!lawyers.length) {
      return (
        <span className="text-xs text-[#586377]">
          غير محدد
        </span>
      );
    }

    const firstLawyer = lawyers[0];
    const remainingCount = lawyers.length - 1;

    return (
      <div className="flex items-center gap-2">
        {avatar(
          firstLawyer?.profileImage?.url,
          firstLawyer?.name || "المحامي",
          card ? "w-7 h-7" : "w-8 h-8"
        )}

        <span className="text-xs text-[#45464D]">
          {firstLawyer?.name || "غير محدد"}
        </span>

        {remainingCount > 0 && (
          <button
            type="button"
            onClick={() =>
              selectCaseHandler(item, "details")
            }
            className="flex-shrink-0 px-2 py-1 text-[10px] font-semibold text-[#315DAA] bg-[#E5EEFF] rounded-full hover:bg-[#D8E6FF] transition"
          >
            +{remainingCount}
          </button>
        )}
      </div>
    );
  };

  const actions = (item, card = false) => (
    <div
      className={`flex items-center gap-2 ${
        card ? "w-full" : ""
      }`}
    >
      <button
        type="button"
        title="عرض"
        onClick={() =>
          selectCaseHandler(item, "details")
        }
        className={
          card
            ? "flex-1 h-9 flex items-center justify-center gap-1.5 rounded-lg bg-[#E5EEFF] text-[#315DAA] text-[11px] font-medium"
            : "flex items-center justify-center w-8 h-8 rounded-lg bg-[#F1F5FC] text-[#315DAA] hover:bg-[#E5EEFF]"
        }
      >
        <LuEye size={card ? 14 : 15} />
        {card && "عرض"}
      </button>

      <button
        type="button"
        title="تعديل"
        onClick={() =>
          selectCaseHandler(item, "update")
        }
        className={
          card
            ? "flex items-center justify-center w-9 h-9 rounded-lg bg-[#F1F5FC] text-[#586377]"
            : "flex items-center justify-center w-8 h-8 rounded-lg bg-[#F1F5FC] text-[#586377] hover:bg-[#E5EEFF]"
        }
      >
        <LuPencil size={card ? 14 : 15} />
      </button>

      <button
        type="button"
        title="حذف"
        onClick={() =>
          selectCaseHandler(item, "delete")
        }
        className={
          card
            ? "flex items-center justify-center w-9 h-9 rounded-lg bg-[#FFF1F1] text-[#C94A4A]"
            : "flex items-center justify-center w-8 h-8 rounded-lg bg-[#FFF1F1] text-[#C94A4A] hover:bg-[#FFE2E2]"
        }
      >
        <LuTrash2 size={card ? 14 : 15} />
      </button>
    </div>
  );

  return (
    <>
      {openDeleteCase && selectCase && (
        <DeleteCase selectCase={selectCase} />
      )}

      {openDetails && selectCase && (
        <Details
          selectCase={selectCase}
          openDetails={openDetails}
          setOpenDetails={setOpenDetails}
        />
      )}

      {openUpdateCase && selectCase && (
        <UpdateCase selectCase={selectCase} />
      )}

      <div className="w-full p-5 mt-6 bg-white shadow-sm rounded-xl">
        <div className="flex flex-col gap-3 mb-5 md:flex-row">
          {[
            {
              value: caseFilter,
              setValue: setCaseFilter,
              placeholder: "كل القضايا",
              options: caseOptions,
            },
            {
              value: lawyerFilter,
              setValue: setLawyerFilter,
              placeholder: "كل المحامين",
              options: lawyerOptions,
            },
            {
              value: clientFilter,
              setValue: setClientFilter,
              placeholder: "كل العملاء",
              options: clientOptions,
            },
          ].map((filter, index) => (
            <div
              key={index}
              className="relative w-full md:w-48"
            >
              <select
                value={filter.value}
                onChange={(e) => {
                  filter.setValue(e.target.value);
                  resetPage();
                }}
                className={filterClass}
              >
                <option value="">
                  {filter.placeholder}
                </option>

                {filter.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              <LuChevronDown
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#586377] pointer-events-none"
              />
            </div>
          ))}

          {(caseFilter ||
            lawyerFilter ||
            clientFilter) && (
            <button
              type="button"
              onClick={clearFilters}
              className="h-10 px-4 rounded-lg text-[11px] font-medium text-[#C94A4A] bg-[#FFF1F1] hover:bg-[#FFE5E5] transition whitespace-nowrap"
            >
              مسح الفلاتر
            </button>
          )}
        </div>

        <div className="flex flex-col gap-4 mb-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-base font-bold text-[#0B1C30]">
              القضايا المسجلة
            </h2>

            <p className="mt-1 text-[11px] text-[#45464D]">
              عرض وإدارة جميع القضايا المسجلة
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <LuSearch
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#586377]"
              />

              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  resetPage();
                }}
                placeholder="بحث عن قضية..."
                className="w-full sm:w-64 h-10 pr-10 pl-3 text-xs text-[#0B1C30] bg-[#F8FAFD] border border-[#E5EEFF] rounded-lg outline-none focus:border-[#B8CCF5]"
              />
            </div>

            <div className="flex items-center p-1 bg-[#F8FAFD] border border-[#E5EEFF] rounded-lg">
              <button
                type="button"
                onClick={() => setView("table")}
                className={`flex items-center justify-center w-9 h-8 rounded-md ${
                  view === "table"
                    ? "bg-[#E5EEFF] text-[#0B1C30]"
                    : "text-[#586377]"
                }`}
              >
                <LuList size={17} />
              </button>

              <button
                type="button"
                onClick={() => setView("cards")}
                className={`flex items-center justify-center w-9 h-8 rounded-md ${
                  view === "cards"
                    ? "bg-[#E5EEFF] text-[#0B1C30]"
                    : "text-[#586377]"
                }`}
              >
                <LuLayoutGrid size={17} />
              </button>
            </div>
          </div>
        </div>

        {view === "table" && (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-right">
              <thead>
                <tr className="border-b border-[#E5EEFF] text-[#586377]">
                  {[
                    "رقم القضية",
                    "صاحب القضية",
                    "المحامي",
                    "التاريخ",
                    "الحالة",
                    "الإجراءات",
                  ].map((title) => (
                    <th
                      key={title}
                      className="px-3 py-3.5 font-medium"
                    >
                      {title}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {currentData.map((item) => (
                  <tr
                    key={item._id}
                    className="border-b border-[#F0F3F8] hover:bg-[#F8FAFD] transition"
                  >
                    <td className="px-3 py-4 font-semibold text-xs text-[#0B1C30]">
                      {item.caseNumber || "-"}
                    </td>

                    <td className="px-3 py-4">
                      <div className="flex items-center gap-2.5">
                        {avatar(
                          item.clientImage,
                          item.clientName
                        )}

                        <div>
                          <span className="text-xs font-medium text-[#0B1C30]">
                            {item.clientName}
                          </span>

                          <span className="block text-[10px] text-[#586377]">
                            العميل
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="px-3 py-4">
                      {lawyersView(item)}
                    </td>

                    <td className="px-3 py-4 text-xs text-[#586377]">
                      {item.formattedDate}
                    </td>

                    <td className="px-3 py-4">
                      {status(item)}
                    </td>

                    <td className="px-3 py-4">
                      {actions(item)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {view === "cards" && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {currentData.map((item) => (
              <div
                key={item._id}
                className="relative overflow-hidden bg-white border border-[#E5EEFF] rounded-xl p-4 transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="absolute -left-7 -bottom-7 w-20 h-20 rounded-full bg-[#EFF4FF]" />

                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] text-[#586377]">
                      رقم القضية
                    </span>

                    {status(item)}
                  </div>

                  <h3 className="mb-4 text-base font-bold text-[#0B1C30]">
                    {item.caseNumber || "-"}
                  </h3>

                  <div className="pb-4 mb-4 border-b border-[#E5EEFF]">
                    <div className="flex items-center gap-2.5">
                      {avatar(
                        item.clientImage,
                        item.clientName,
                        "w-9 h-9"
                      )}

                      <div>
                        <p className="text-xs font-medium text-[#0B1C30]">
                          {item.clientName}
                        </p>

                        <p className="text-[10px] text-[#586377]">
                          العميل
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs text-[#586377]">
                      المحامي
                    </span>

                    {lawyersView(item, true)}
                  </div>

                  <div className="flex items-center justify-between gap-4 mt-4">
                    <span className="text-xs text-[#586377]">
                      التاريخ
                    </span>

                    <span className="text-xs font-medium text-[#45464D]">
                      {item.formattedDate}
                    </span>
                  </div>

                  <div className="pt-3 mt-4 border-t border-[#E5EEFF]">
                    {actions(item, true)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!currentData.length && (
          <div className="py-12 text-xs text-center text-[#586377]">
            لا توجد نتائج مطابقة للفلاتر أو البحث
          </div>
        )}

        {totalPages > 0 && (
          <div className="flex flex-col items-center justify-between gap-4 pt-4 mt-5 border-t border-[#E5EEFF] sm:flex-row">
            <p className="text-[11px] text-[#586377]">
              عرض{" "}
              <span className="font-semibold text-[#0B1C30]">
                {(page - 1) * ITEMS_PER_PAGE + 1}
              </span>{" "}
              إلى{" "}
              <span className="font-semibold text-[#0B1C30]">
                {Math.min(
                  page * ITEMS_PER_PAGE,
                  filteredData.length
                )}
              </span>{" "}
              من{" "}
              <span className="font-semibold text-[#0B1C30]">
                {filteredData.length}
              </span>
            </p>

            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="flex items-center justify-center w-8 h-8 rounded-lg border border-[#E5EEFF] text-[#586377] text-xs disabled:opacity-40"
              >
                ‹
              </button>

              {Array.from(
                { length: totalPages },
                (_, index) => (
                  <button
                    type="button"
                    key={index}
                    onClick={() => setPage(index + 1)}
                    className={`flex items-center justify-center w-8 h-8 rounded-lg text-[11px] font-medium ${
                      page === index + 1
                        ? "bg-[#E5EEFF] text-[#0B1C30]"
                        : "text-[#586377] hover:bg-[#F8FAFD]"
                    }`}
                  >
                    {index + 1}
                  </button>
                )
              )}

              <button
                type="button"
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className="flex items-center justify-center w-8 h-8 rounded-lg border border-[#E5EEFF] text-[#586377] text-xs disabled:opacity-40"
              >
                ›
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Table;
