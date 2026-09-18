"use client";
import React, { useMemo, useState } from "react";
import {
  LuSearch,
  LuLayoutGrid,
  LuList,
  LuEye,
  LuPencil,
  LuTrash2,
  LuChevronDown,
} from "react-icons/lu";

const data = [
  {
    id: 1,
    caseNumber: "2026/128",
    name: "أحمد محمد علي",
    image: "https://i.pravatar.cc/150?img=12",
    lawyer: "أحمد محمد",
    client: "أحمد محمد علي",
    type: "قضية مالية",
    status: "قيد النظر",
    date: "16/09/2026",
  },
  {
    id: 2,
    caseNumber: "2026/127",
    name: "محمد أحمد حسن",
    image: "https://i.pravatar.cc/150?img=13",
    lawyer: "محمد علي",
    client: "محمد أحمد حسن",
    type: "قضية تجارية",
    status: "مغلقة",
    date: "15/09/2026",
  },
  {
    id: 3,
    caseNumber: "2026/126",
    name: "عمر محمود",
    image: "https://i.pravatar.cc/150?img=14",
    lawyer: "خالد حسن",
    client: "عمر محمود",
    type: "قضية مالية",
    status: "قيد النظر",
    date: "14/09/2026",
  },
  {
    id: 4,
    caseNumber: "2026/125",
    name: "خالد إبراهيم",
    image: "https://i.pravatar.cc/150?img=15",
    lawyer: "أحمد محمد",
    client: "خالد إبراهيم",
    type: "قضية إدارية",
    status: "معلقة",
    date: "13/09/2026",
  },
  {
    id: 5,
    caseNumber: "2026/124",
    name: "يوسف علي",
    image: "https://i.pravatar.cc/150?img=16",
    lawyer: "محمد علي",
    client: "يوسف علي",
    type: "قضية تجارية",
    status: "مغلقة",
    date: "12/09/2026",
  },
  {
    id: 6,
    caseNumber: "2026/123",
    name: "محمود حسن",
    image: "https://i.pravatar.cc/150?img=17",
    lawyer: "خالد حسن",
    client: "محمود حسن",
    type: "قضية مالية",
    status: "قيد النظر",
    date: "11/09/2026",
  },
  {
    id: 7,
    caseNumber: "2026/122",
    name: "إبراهيم محمد",
    image: "https://i.pravatar.cc/150?img=18",
    lawyer: "أحمد محمد",
    client: "إبراهيم محمد",
    type: "قضية إدارية",
    status: "معلقة",
    date: "10/09/2026",
  },
  {
    id: 8,
    caseNumber: "2026/121",
    name: "عبدالله أحمد",
    image: "https://i.pravatar.cc/150?img=19",
    lawyer: "محمد علي",
    client: "عبدالله أحمد",
    type: "قضية مالية",
    status: "قيد النظر",
    date: "09/09/2026",
  },
  {
    id: 9,
    caseNumber: "2026/120",
    name: "مصطفى محمود",
    image: "https://i.pravatar.cc/150?img=20",
    lawyer: "خالد حسن",
    client: "مصطفى محمود",
    type: "قضية تجارية",
    status: "مغلقة",
    date: "08/09/2026",
  },
  {
    id: 10,
    caseNumber: "2026/119",
    name: "حسن أحمد",
    image: "https://i.pravatar.cc/150?img=21",
    lawyer: "أحمد محمد",
    client: "حسن أحمد",
    type: "قضية مالية",
    status: "قيد النظر",
    date: "07/09/2026",
  },
  {
    id: 11,
    caseNumber: "2026/118",
    name: "طارق محمد",
    image: "https://i.pravatar.cc/150?img=22",
    lawyer: "محمد علي",
    client: "طارق محمد",
    type: "قضية إدارية",
    status: "معلقة",
    date: "06/09/2026",
  },
  {
    id: 12,
    caseNumber: "2026/117",
    name: "كريم علي",
    image: "https://i.pravatar.cc/150?img=23",
    lawyer: "خالد حسن",
    client: "كريم علي",
    type: "قضية مالية",
    status: "مغلقة",
    date: "05/09/2026",
  },
];

const Table = () => {
  const [view, setView] = useState("table");

  const [search, setSearch] = useState("");

  const [caseFilter, setCaseFilter] = useState("");
  const [lawyerFilter, setLawyerFilter] = useState("");
  const [clientFilter, setClientFilter] = useState("");

  const [page, setPage] = useState(1);

  const itemsPerPage = 5;

  // ==========================================
  // FILTER DATA
  // ==========================================

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const searchValue = search.trim().toLowerCase();

      const matchesSearch =
        item.name.toLowerCase().includes(searchValue) ||
        item.caseNumber.toLowerCase().includes(searchValue) ||
        item.type.toLowerCase().includes(searchValue) ||
        item.lawyer.toLowerCase().includes(searchValue) ||
        item.client.toLowerCase().includes(searchValue);

      const matchesCase =
        !caseFilter ||
        item.caseNumber === caseFilter;

      const matchesLawyer =
        !lawyerFilter ||
        item.lawyer === lawyerFilter;

      const matchesClient =
        !clientFilter ||
        item.client === clientFilter;

      return (
        matchesSearch &&
        matchesCase &&
        matchesLawyer &&
        matchesClient
      );
    });
  }, [
    search,
    caseFilter,
    lawyerFilter,
    clientFilter,
  ]);

  // ==========================================
  // PAGINATION
  // ==========================================

  const totalPages = Math.ceil(
    filteredData.length / itemsPerPage
  );

  const currentData = filteredData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // ==========================================
  // RESET PAGE
  // ==========================================

  const resetPage = () => {
    setPage(1);
  };

  // ==========================================
  // UNIQUE VALUES
  // ==========================================

  const cases = [...new Set(data.map((item) => item.caseNumber))];

  const lawyers = [...new Set(data.map((item) => item.lawyer))];

  const clients = [...new Set(data.map((item) => item.client))];

  return (
    <div
      
      className="w-full p-5 mt-6 bg-white shadow-sm rounded-xl"
    >

      {/* ================================================= */}
      {/* ================= FILTERS ======================= */}
      {/* ================================================= */}

      <div className="mb-5">

        <div
          className="flex flex-col items-center gap-3 md:flex-row"
        >

          {/* ================= CASE FILTER ================= */}

          <FilterSelect
            value={caseFilter}
            onChange={(value) => {
              setCaseFilter(value);
              resetPage();
            }}
            placeholder="كل القضايا"
            options={cases}
          />

          {/* ================= LAWYER FILTER ================= */}

          <FilterSelect
            value={lawyerFilter}
            onChange={(value) => {
              setLawyerFilter(value);
              resetPage();
            }}
            placeholder="كل المحامين"
            options={lawyers}
          />

          {/* ================= CLIENT FILTER ================= */}

          <FilterSelect
            value={clientFilter}
            onChange={(value) => {
              setClientFilter(value);
              resetPage();
            }}
            placeholder="كل العملاء"
            options={clients}
          />

          {/* ================= RESET FILTERS ================= */}

          {(caseFilter ||
            lawyerFilter ||
            clientFilter) && (

            <button
              onClick={() => {
                setCaseFilter("");
                setLawyerFilter("");
                setClientFilter("");
                resetPage();
              }}
              className="
                h-10
                px-4
                rounded-lg
                text-xs
                font-medium
                text-[#C94A4A]
                bg-[#FFF1F1]
                hover:bg-[#FFE5E5]
                transition
                whitespace-nowrap
              "
            >
              مسح الفلاتر
            </button>

          )}

        </div>

      </div>

      {/* ================================================= */}
      {/* ================= HEADER ======================== */}
      {/* ================================================= */}

      <div
        className="flex flex-col gap-4 mb-5 lg:flex-row lg:items-center lg:justify-between"
      >

        {/* ================= TITLE ================= */}

        <div>

          <h2
            className="
              text-[#0B1C30]
              text-lg
              font-bold
            "
          >
            القضايا المسجلة
          </h2>

          <p
            className="
              text-[#45464D]
              text-xs
              mt-1
            "
          >
            عرض وإدارة جميع القضايا المسجلة
          </p>

        </div>

        {/* ================= CONTROLS ================= */}

        <div
          className="flex flex-col gap-3 sm:flex-row"
        >

          {/* ================= SEARCH ================= */}

          <div className="relative">

            <LuSearch
              size={18}
              className="
                absolute
                right-3
                top-1/2
                -translate-y-1/2
                text-[#586377]
              "
            />

            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                resetPage();
              }}
              placeholder="بحث عن قضية..."
              className="
                w-full
                sm:w-64
                h-10
                pr-10
                pl-3
                text-sm
                text-[#0B1C30]
                bg-[#F8FAFD]
                border
                border-[#E5EEFF]
                rounded-lg
                outline-none
                focus:border-[#B8CCF5]
                transition
              "
            />

          </div>

          {/* ================= VIEW TOGGLE ================= */}

          <div
            className="
              flex
              items-center
              bg-[#F8FAFD]
              border
              border-[#E5EEFF]
              rounded-lg
              p-1
            "
          >

            {/* TABLE */}

            <button
              onClick={() => setView("table")}
              className={`
                w-9
                h-8
                flex
                items-center
                justify-center
                rounded-md
                transition

                ${
                  view === "table"
                    ? "bg-[#E5EEFF] text-[#0B1C30]"
                    : "text-[#586377]"
                }
              `}
            >
              <LuList size={18} />
            </button>

            {/* CARDS */}

            <button
              onClick={() => setView("cards")}
              className={`
                w-9
                h-8
                flex
                items-center
                justify-center
                rounded-md
                transition

                ${
                  view === "cards"
                    ? "bg-[#E5EEFF] text-[#0B1C30]"
                    : "text-[#586377]"
                }
              `}
            >
              <LuLayoutGrid size={18} />
            </button>

          </div>

        </div>

      </div>

      {/* ================================================= */}
      {/* ================= TABLE VIEW ==================== */}
      {/* ================================================= */}

      {view === "table" && (

        <div className="overflow-x-auto">

          <table className="w-full text-sm text-right">

            {/* ================= THEAD ================= */}

            <thead>

              <tr
                className="
                  border-b
                  border-[#E5EEFF]
                  text-[#586377]
                "
              >

                <th className="px-3 py-4 font-medium">
                  رقم القضية
                </th>

                <th className="px-3 py-4 font-medium">
                  صاحب القضية
                </th>

                <th className="px-3 py-4 font-medium">
                  المحامي
                </th>

                <th className="px-3 py-4 font-medium">
                  نوع القضية
                </th>

                <th className="px-3 py-4 font-medium">
                  التاريخ
                </th>

                <th className="px-3 py-4 font-medium">
                  الحالة
                </th>

                <th className="px-3 py-4 font-medium">
                  الإجراءات
                </th>

              </tr>

            </thead>

            {/* ================= TBODY ================= */}

            <tbody>

              {currentData.map((item) => (

                <tr
                  key={item.id}
                  className="
                    border-b
                    border-[#F0F3F8]
                    hover:bg-[#F8FAFD]
                    transition
                  "
                >

                  {/* CASE NUMBER */}

                  <td
                    className="
                      py-4
                      px-3
                      font-semibold
                      text-[#0B1C30]
                    "
                  >
                    {item.caseNumber}
                  </td>

                  {/* OWNER */}

                  <td className="px-3 py-4">

                    <div
                      className="flex items-center gap-3 "
                    >

                      <img
                        src={item.image}
                        alt={item.name}
                        className="
                          w-9
                          h-9
                          rounded-full
                          object-cover
                          border
                          border-[#E5EEFF]
                        "
                      />

                      <div className="flex flex-col">

                        <span
                          className="
                            text-[#0B1C30]
                            font-medium
                            text-sm
                          "
                        >
                          {item.name}
                        </span>

                        <span
                          className="
                            text-[#586377]
                            text-[11px]
                          "
                        >
                          العميل
                        </span>

                      </div>

                    </div>

                  </td>

                  {/* LAWYER */}

                  <td
                    className="
                      py-4
                      px-3
                      text-[#45464D]
                    "
                  >
                    {item.lawyer}
                  </td>

                  {/* TYPE */}

                  <td
                    className="
                      py-4
                      px-3
                      text-[#45464D]
                    "
                  >
                    {item.type}
                  </td>

                  {/* DATE */}

                  <td
                    className="
                      py-4
                      px-3
                      text-[#586377]
                    "
                  >
                    {item.date}
                  </td>

                  {/* STATUS */}

                  <td className="px-3 py-4">

                    <Status status={item.status} />

                  </td>

                  {/* ACTIONS */}

                  <td className="px-3 py-4">

                    <div
                      className="flex items-center gap-2 "
                    >

                      <button
                        title="عرض"
                        className="
                          w-8
                          h-8
                          flex
                          items-center
                          justify-center
                          rounded-lg
                          bg-[#F1F5FC]
                          text-[#315DAA]
                          hover:bg-[#E5EEFF]
                          transition
                        "
                      >
                        <LuEye size={16} />
                      </button>

                      <button
                        title="تعديل"
                        className="
                          w-8
                          h-8
                          flex
                          items-center
                          justify-center
                          rounded-lg
                          bg-[#F1F5FC]
                          text-[#586377]
                          hover:bg-[#E5EEFF]
                          transition
                        "
                      >
                        <LuPencil size={16} />
                      </button>

                      <button
                        title="حذف"
                        className="
                          w-8
                          h-8
                          flex
                          items-center
                          justify-center
                          rounded-lg
                          bg-[#FFF1F1]
                          text-[#C94A4A]
                          hover:bg-[#FFE2E2]
                          transition
                        "
                      >
                        <LuTrash2 size={16} />
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

      {/* ================================================= */}
      {/* ================= CARDS VIEW =================== */}
      {/* ================================================= */}

      {view === "cards" && (

        <div
          className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3"
        >

          {currentData.map((item) => (

            <div
              key={item.id}
              className="
                relative
                overflow-hidden
                bg-white
                border
                border-[#E5EEFF]
                rounded-xl
                p-4
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-md
              "
            >

              {/* DECORATIVE CIRCLE */}

              <div
                className="
                  absolute
                  -left-7
                  -bottom-7
                  w-20
                  h-20
                  rounded-full
                  bg-[#EFF4FF]
                "
              />

              <div className="relative">

                {/* CARD HEADER */}

                <div
                  className="flex items-center justify-between mb-4 "
                >

                  <span
                    className="
                      text-xs
                      text-[#586377]
                    "
                  >
                    رقم القضية
                  </span>

                  <Status status={item.status} />

                </div>

                {/* CASE NUMBER */}

                <h3
                  className="
                    text-[#0B1C30]
                    font-bold
                    text-lg
                    mb-4
                  "
                >
                  {item.caseNumber}
                </h3>

                {/* OWNER */}

                <div
                  className="
                    flex
                    items-center
                    gap-3
                    mb-4
                    pb-4
                    border-b
                    border-[#E5EEFF]
                  "
                >

                  <img
                    src={item.image}
                    alt={item.name}
                    className="
                      w-10
                      h-10
                      rounded-full
                      object-cover
                      border
                      border-[#E5EEFF]
                    "
                  />

                  <div className="flex flex-col">

                    <span
                      className="
                        text-[#0B1C30]
                        font-semibold
                        text-sm
                      "
                    >
                      {item.name}
                    </span>

                    <span
                      className="
                        text-[#586377]
                        text-[11px]
                      "
                    >
                      العميل
                    </span>

                  </div>

                </div>

                {/* INFO */}

                <div className="space-y-3 text-sm">

                  <div
                    className="flex items-center justify-between "
                  >

                    <span className="text-[#586377]">
                      المحامي
                    </span>

                    <span
                      className="
                        text-[#45464D]
                        font-medium
                      "
                    >
                      {item.lawyer}
                    </span>

                  </div>

                  <div
                    className="flex items-center justify-between "
                  >

                    <span className="text-[#586377]">
                      نوع القضية
                    </span>

                    <span
                      className="
                        text-[#45464D]
                        font-medium
                      "
                    >
                      {item.type}
                    </span>

                  </div>

                  <div
                    className="flex items-center justify-between "
                  >

                    <span className="text-[#586377]">
                      التاريخ
                    </span>

                    <span className="text-[#45464D]">
                      {item.date}
                    </span>

                  </div>

                </div>

                {/* ACTIONS */}

                <div
                  className="
                    flex
                    items-center
                    gap-2
                    mt-4
                    pt-3
                    border-t
                    border-[#E5EEFF]
                  "
                >

                  <button
                    className="
                      flex-1
                      h-9
                      flex
                      items-center
                      justify-center
                      gap-1.5
                      rounded-lg
                      bg-[#E5EEFF]
                      text-[#315DAA]
                      text-xs
                      font-medium
                      hover:bg-[#D8E5FC]
                      transition
                    "
                  >
                    <LuEye size={15} />
                    عرض
                  </button>

                  <button
                    title="تعديل"
                    className="
                      w-9
                      h-9
                      flex
                      items-center
                      justify-center
                      rounded-lg
                      bg-[#F1F5FC]
                      text-[#586377]
                      hover:bg-[#E5EEFF]
                      transition
                    "
                  >
                    <LuPencil size={15} />
                  </button>

                  <button
                    title="حذف"
                    className="
                      w-9
                      h-9
                      flex
                      items-center
                      justify-center
                      rounded-lg
                      bg-[#FFF1F1]
                      text-[#C94A4A]
                      hover:bg-[#FFE2E2]
                      transition
                    "
                  >
                    <LuTrash2 size={15} />
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

      {/* ================================================= */}
      {/* ================= EMPTY STATE ================== */}
      {/* ================================================= */}

      {currentData.length === 0 && (

        <div
          className="
            py-12
            text-center
            text-[#586377]
            text-sm
          "
        >
          لا توجد نتائج مطابقة للفلاتر أو البحث
        </div>

      )}

      {/* ================================================= */}
      {/* ================= PAGINATION ==================== */}
      {/* ================================================= */}

      {totalPages > 0 && (

        <div
          className="
            flex
            flex-col
            sm:flex-row
            items-center
            justify-between
            gap-4
            mt-5
            pt-4
            border-t
            border-[#E5EEFF]
          "
        >

          {/* RESULTS */}

          <p className="text-xs text-[#586377]">

            عرض{" "}

            <span
              className="
                font-semibold
                text-[#0B1C30]
              "
            >
              {(page - 1) * itemsPerPage + 1}
            </span>

            {" "}إلى{" "}

            <span
              className="
                font-semibold
                text-[#0B1C30]
              "
            >
              {Math.min(
                page * itemsPerPage,
                filteredData.length
              )}
            </span>

            {" "}من{" "}

            <span
              className="
                font-semibold
                text-[#0B1C30]
              "
            >
              {filteredData.length}
            </span>

          </p>

          {/* PAGINATION */}

          <div
            className="flex items-center gap-1 "
          >

            {/* PREVIOUS */}

            <button
              disabled={page === 1}
              onClick={() =>
                setPage((p) => p - 1)
              }
              className="
                w-9
                h-9
                rounded-lg
                border
                border-[#E5EEFF]
                text-[#586377]
                disabled:opacity-40
                hover:bg-[#F8FAFD]
                transition
              "
            >
              ‹
            </button>

            {/* PAGES */}

            {Array.from(
              { length: totalPages },
              (_, index) => (

                <button
                  key={index}
                  onClick={() =>
                    setPage(index + 1)
                  }
                  className={`
                    w-9
                    h-9
                    rounded-lg
                    text-xs
                    font-medium
                    transition

                    ${
                      page === index + 1
                        ? "bg-[#E5EEFF] text-[#0B1C30]"
                        : "text-[#586377] hover:bg-[#F8FAFD]"
                    }
                  `}
                >
                  {index + 1}
                </button>

              )
            )}

            {/* NEXT */}

            <button
              disabled={page === totalPages}
              onClick={() =>
                setPage((p) => p + 1)
              }
              className="
                w-9
                h-9
                rounded-lg
                border
                border-[#E5EEFF]
                text-[#586377]
                disabled:opacity-40
                hover:bg-[#F8FAFD]
                transition
              "
            >
              ›
            </button>

          </div>

        </div>

      )}

    </div>
  );
};

// =====================================================
// FILTER SELECT COMPONENT
// =====================================================

const FilterSelect = ({
  value,
  onChange,
  placeholder,
  options,
}) => {
  return (
    <div className="relative w-full md:w-48">

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          appearance-none
          w-full
          h-10
          pr-3
          pl-9
          bg-[#F8FAFD]
          border
          border-[#E5EEFF]
          rounded-lg
          text-sm
          text-[#45464D]
          outline-none
          cursor-pointer
          focus:border-[#B8CCF5]
          transition
        "
      >

        <option value="">
          {placeholder}
        </option>

        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}

      </select>

      <LuChevronDown
        size={16}
        className="
          absolute
          left-3
          top-1/2
          -translate-y-1/2
          text-[#586377]
          pointer-events-none
        "
      />

    </div>
  );
};

// =====================================================
// STATUS COMPONENT
// =====================================================

const Status = ({ status }) => {

  const styles = {
    "قيد النظر":
      "bg-[#E5EEFF] text-[#315DAA]",

    "مغلقة":
      "bg-[#E8F5EC] text-[#31804A]",

    "معلقة":
      "bg-[#FFF3DC] text-[#A66A00]",
  };

  return (
    <span
      className={`
        inline-flex
        items-center
        px-2.5
        py-1
        rounded-md
        text-[11px]
        font-medium
        ${styles[status]}
      `}
    >
      {status}
    </span>
  );
};

export default Table;