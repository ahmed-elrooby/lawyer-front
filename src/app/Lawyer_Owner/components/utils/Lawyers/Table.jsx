"use client";

import React, { useContext, useMemo, useState } from "react";
import {
  Search,
  MoreVertical,
  Phone,
  Mail,
  Grid3X3,
  List,
  UserRound,
  Eye,
  Pencil,
  Trash2,
  X,
  BriefcaseBusiness,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { OwnerContext } from "../../../../../Providers/LawyerOwner/OwnerProvider.js";
import AddLawyer from "./AddLawyer.jsx";
import UpdateLawyer from "./UpdateLawyer.jsx";
import Delete from "./Delete.jsx";
import Details from "./Details.jsx";

const ITEMS_PER_PAGE = 6;

const Table = () => {
  const { lawyers, clients,setOpenUpdateLawyer,openUpdateLawyer,openDeleteLawyer,setOpenDeleteLawyer } = useContext(OwnerContext);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [view, setView] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [openDetails, setOpenDetails] = useState(false);

  const [selectedLawyer, setSelectedLawyer] = useState(null);
  /* =========================
     Prepare Lawyers
  ========================= */

  const formattedLawyers = useMemo(() => {
    const allLawyers = Array.isArray(lawyers) ? lawyers : [];
    const allClients = Array.isArray(clients) ? clients : [];

    const cases = allClients.flatMap((client) =>
      Array.isArray(client?.cases) ? client.cases : []
    );

    const lawyerCases = {};

    cases.forEach((caseItem) => {
      if (!Array.isArray(caseItem?.lawyers)) return;

      caseItem.lawyers.forEach((lawyer) => {
        const id = typeof lawyer === "object" ? lawyer?._id : lawyer;

        if (id) {
          lawyerCases[id] = (lawyerCases[id] || 0) + 1;
        }
      });
    });

    return allLawyers.map((lawyer) => ({
      ...lawyer,
      casesCount: lawyerCases[lawyer?._id] || 0,
    }));
  }, [lawyers, clients]);

  /* =========================
     Filter
  ========================= */

  const filteredLawyers = useMemo(() => {
    const value = search.trim().toLowerCase();

    return formattedLawyers.filter((lawyer) => {
      const matchesSearch =
        !value ||
        lawyer?.name?.toLowerCase().includes(value) ||
        lawyer?.email?.toLowerCase().includes(value) ||
        lawyer?.phone?.includes(value);

      const matchesStatus =
        status === "all" ||
        (status === "active" && lawyer?.isActive) ||
        (status === "inactive" && !lawyer?.isActive);

      return matchesSearch && matchesStatus;
    });
  }, [formattedLawyers, search, status]);

  /* =========================
     Pagination
  ========================= */

  const totalPages = Math.ceil(
    filteredLawyers.length / ITEMS_PER_PAGE
  );

  const paginatedLawyers = filteredLawyers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSearch = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleStatus = (value) => {
    setStatus(value);
    setCurrentPage(1);
  };

  /* =========================
     Stats
  ========================= */

  const stats = {
    total: formattedLawyers.length,
    active: formattedLawyers.filter((x) => x?.isActive).length,
    assigned: formattedLawyers.filter((x) => x?.casesCount > 0).length,
  };

  /* =========================
     Modal
  ========================= */

 
  return <>
 {
  openUpdateLawyer && <UpdateLawyer selectedLawyer={selectedLawyer} />
 }
 {
  openDeleteLawyer && <Delete selectedLawyer={selectedLawyer}  />
 }
 {
  openDetails && <Details selectedLawyer={selectedLawyer} setOpenDetails={setOpenDetails} openDetails={openDetails} />
 }
    <div  className="w-full mt-8">
      {/* =========================
          Header
      ========================= */}

      <div className="relative mb-5 overflow-hidden rounded-2xl bg-[#111827] px-5 py-5 shadow-[0_12px_35px_rgba(17,24,39,.12)]">
        <div className="absolute -left-16 -top-16 h-40 w-40 rounded-full bg-[#c9a227]/20 blur-3xl" />

        <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <BriefcaseBusiness
                size={14}
                className="text-[#c9a227]"
              />

              <span className="text-[9px] font-bold text-[#c9a227]">
                الإدارة القانونية
              </span>
            </div>

            <h2 className="text-[21px] font-bold text-white">
              فريق المحامين
            </h2>

            <p className="mt-1.5 text-[10px] text-[#aeb7c7]">
              إدارة ومتابعة فريق المكتب القانوني
            </p>
          </div>

          <div className="flex w-fit items-center rounded-xl border border-white/10 bg-white/[0.06]">
            <HeaderStat
              value={stats.total}
              label="إجمالي"
            />

            <HeaderStat
              value={stats.active}
              label="نشط"
            />

            <HeaderStat
              value={stats.assigned}
              label="لديه قضايا"
            />
          </div>
        </div>
      </div>

      {/* =========================
          Filters
      ========================= */}

      <div className="mb-5 rounded-2xl border border-[#e8ecf2] bg-white p-3 shadow-[0_4px_18px_rgba(17,24,39,.03)]">
        <div className="flex flex-col gap-3 md:flex-row">
          <div className="relative flex-1">
            <Search
              size={15}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9aa3b1]"
            />

            <input
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="ابحث عن محامي..."
              className="h-10 w-full rounded-xl border border-[#e7ebf2] bg-[#fafbfc] pr-10 pl-3 text-[11px] text-[#111827] outline-none transition focus:border-[#315DAA] focus:bg-white"
            />
          </div>

          <select
            value={status}
            onChange={(e) => handleStatus(e.target.value)}
            className="h-10 rounded-xl border border-[#e7ebf2] bg-[#fafbfc] px-4 text-[11px] text-[#45464d] outline-none"
          >
            <option value="all">كل المحامين</option>
            <option value="active">النشطون فقط</option>
            <option value="inactive">غير النشطين</option>
          </select>

          <div className="flex items-center rounded-xl border border-[#e7ebf2] bg-[#fafbfc] p-1">
            <ViewButton
              active={view === "grid"}
              onClick={() => setView("grid")}
            >
              <Grid3X3 size={15} />
            </ViewButton>

            <ViewButton
              active={view === "list"}
              onClick={() => setView("list")}
            >
              <List size={16} />
            </ViewButton>
          </div>
        </div>
      </div>

      {/* =========================
          Section Header
      ========================= */}

      <div className="flex items-end justify-between px-1 mb-3">
        <div>
          <h3 className="text-[13px] font-bold text-[#111827]">
            قائمة المحامين
          </h3>

          <p className="mt-1 text-[9px] text-[#98a2b3]">
            {filteredLawyers.length} محامي
          </p>
        </div>

        {totalPages > 1 && (
          <p className="text-[9px] text-[#98a2b3]">
            صفحة {currentPage} من {totalPages}
          </p>
        )}
      </div>

      {/* =========================
          Empty
      ========================= */}

      {filteredLawyers.length === 0 && (
        <div className="flex min-h-[260px] flex-col items-center justify-center rounded-2xl border border-dashed border-[#dfe4ec] bg-white">
          <UserRound
            size={34}
            className="text-[#c2c9d4]"
          />

          <p className="mt-3 text-[12px] font-bold text-[#45464d]">
            لا توجد نتائج
          </p>

          <p className="mt-1 text-[9px] text-[#98a2b3]">
            جرّب تغيير البحث أو الفلتر
          </p>
        </div>
      )}

      {/* =========================
          GRID
      ========================= */}

      {view === "grid" && paginatedLawyers.length > 0 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {paginatedLawyers.map((lawyer) => (
           <LawyerCard
  key={lawyer?._id}
  lawyer={lawyer}
  onView={() => {
    setSelectedLawyer(lawyer);
    setOpenDetails(true);}}
  onEdit={() => {
    setSelectedLawyer(lawyer);
    setOpenUpdateLawyer(true);
  }}
  onDelete={() => {
    setSelectedLawyer(lawyer);
    setOpenDeleteLawyer(true);
  }}
/>
          ))}
        </div>
      )}

      {/* =========================
          TABLE
      ========================= */}

   {/* =========================
    TABLE
========================= */}

{view === "list" && paginatedLawyers.length > 0 && (
  <div className="overflow-hidden rounded-2xl border border-[#e7ebf2] bg-white shadow-[0_4px_18px_rgba(17,24,39,.03)]">
    <div className="w-full overflow-x-auto">
      <table className="w-full text-right table-fixed">
        <thead>
          <tr className="border-b border-[#edf0f4] bg-[#fafbfc]">
            <th className="w-[30%] px-5 py-3.5 text-[9px] font-bold text-[#8993a5]">
              المحامي
            </th>

            <th className="w-[15%] px-4 py-3.5 text-[9px] font-bold text-[#8993a5]">
              الحالة
            </th>

            <th className="w-[15%] px-4 py-3.5 text-[9px] font-bold text-[#8993a5]">
              القضايا
            </th>

            <th className="w-[20%] px-4 py-3.5 text-[9px] font-bold text-[#8993a5]">
              بيانات التواصل
            </th>

            <th className="w-[20%] px-5 py-3.5 text-center text-[9px] font-bold text-[#8993a5]">
              الإجراءات
            </th>
          </tr>
        </thead>

        <tbody>
          {paginatedLawyers.map((lawyer) => (
            <tr
              key={lawyer?._id}
              className="group border-b border-[#f0f2f5] transition last:border-0 hover:bg-[#fcfdff]"
            >
              {/* Lawyer */}
              <td className="px-5 py-4">
                <div className="flex items-center min-w-0 gap-3">
                  <div className="relative shrink-0">
                    <Avatar
                      lawyer={lawyer}
                      size="h-11 w-11"
                    />

                    <span
                      className={`absolute -bottom-0.5 -left-0.5 h-3 w-3 rounded-full border-2 border-white ${
                        lawyer?.isActive
                          ? "bg-[#36a269]"
                          : "bg-[#aab2bf]"
                      }`}
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-[11px] font-bold text-[#111827]">
                      {lawyer?.name}
                    </p>

                    <p className="mt-1 truncate text-[8px] text-[#98a2b3]">
                      {lawyer?.email || "لا يوجد بريد إلكتروني"}
                    </p>
                  </div>
                </div>
              </td>

              {/* Status */}
              <td className="px-4 py-4">
                <Status active={lawyer?.isActive} />
              </td>

              {/* Cases */}
              <td className="px-4 py-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#eef3ff] text-[#315daa]">
                    <BriefcaseBusiness size={13} />
                  </div>

                  <div>
                    <p className="text-[12px] font-bold text-[#111827]">
                      {lawyer?.casesCount || 0}
                    </p>

                    <p className="text-[8px] text-[#98a2b3]">
                      قضية
                    </p>
                  </div>
                </div>
              </td>

              {/* Contact */}
              <td className="px-4 py-4">
                <div className="min-w-0">
                  <p className="truncate text-[9px] font-medium text-[#62718a]">
                    {lawyer?.phone || "لا يوجد هاتف"}
                  </p>

                  <p className="mt-1 truncate text-[8px] text-[#98a2b3]">
                    {lawyer?.email || "لا يوجد بريد"}
                  </p>
                </div>
              </td>

              {/* Actions */}
              <td className="px-5 py-4">
                <div className="flex items-center justify-center gap-1.5">
                  <IconButton
                    title="عرض التفاصيل"
                    onClick={() =>{
                      setSelectedLawyer(lawyer);
                      setOpenDetails(true);
                    }
                      
                    }
                    className="bg-[#eef3ff] text-[#315daa] hover:bg-[#dfeaff]"
                  >
                    <Eye size={13} />
                  </IconButton>

                  <IconButton
                    title="تعديل المحامي"
                    onClick={() =>{
                      setSelectedLawyer(lawyer);
                      setOpenUpdateLawyer(true);
                    }
                    }
                    className="bg-[#f5f6f8] text-[#62718a] hover:bg-[#e9edf3]"
                  >
                    <Pencil size={13} />
                  </IconButton>

                  <IconButton
                    title="حذف المحامي"
                    onClick={() =>{
                      setSelectedLawyer(lawyer);
                      setOpenDeleteLawyer(true)
                    }
                      
                      
                    }
                    className="bg-[#fff0f0] text-[#c94a4a] hover:bg-[#ffe4e4]"
                  >
                    <Trash2 size={13} />
                  </IconButton>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)}

      {/* =========================
          Pagination
      ========================= */}

      {totalPages > 1 && (
        <div className="mt-5 flex items-center justify-center gap-1.5">
          <PageButton
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            <ChevronRight size={14} />
          </PageButton>

          {Array.from(
            { length: totalPages },
            (_, index) => index + 1
          ).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`flex h-8 min-w-8 items-center justify-center rounded-lg px-2 text-[9px] font-bold transition ${
                currentPage === page
                  ? "bg-[#111827] text-white shadow-sm"
                  : "border border-[#e7ebf2] bg-white text-[#687282] hover:bg-[#f7f9fc]"
              }`}
            >
              {page}
            </button>
          ))}

          <PageButton
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            <ChevronLeft size={14} />
          </PageButton>
        </div>
      )}

    
    </div>
  </>
};

/* =====================================================
   Lawyer Card
===================================================== */

const LawyerCard = ({
  lawyer,
  onView,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-[#e7ebf2] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#d5ddeb] hover:shadow-[0_16px_40px_rgba(17,24,39,.08)]">
      <div className="h-1 w-full bg-gradient-to-l from-[#c9a227] via-[#e7cf72] to-transparent" />

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start gap-3">
          <div className="relative">
            <Avatar
              lawyer={lawyer}
              size="h-14 w-14"
            />

            <span
              className={`absolute -bottom-0.5 -left-0.5 h-3.5 w-3.5 rounded-full border-2 border-white ${
                lawyer?.isActive
                  ? "bg-[#36a269]"
                  : "bg-[#aab2bf]"
              }`}
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3 className="truncate text-[13px] font-bold text-[#111827]">
                  {lawyer?.name}
                </h3>

                <p className="mt-1 truncate text-[9px] text-[#98a2b3]">
                  {lawyer?.email || "لا يوجد بريد إلكتروني"}
                </p>
              </div>

              <button className="text-[#a5adba] transition hover:text-[#111827]">
                <MoreVertical size={16} />
              </button>
            </div>

            <div className="mt-2">
              <Status active={lawyer?.isActive} />
            </div>
          </div>
        </div>

        {/* Cases */}
        <div className="mt-5 flex items-center justify-between rounded-xl border border-[#edf0f4] bg-[#fafbfc] p-3">
          <div>
            <p className="text-[9px] text-[#98a2b3]">
              القضايا المسندة
            </p>

            <p className="mt-1 text-[21px] font-bold text-[#111827]">
              {lawyer?.casesCount}
            </p>
          </div>

          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#eef3ff] text-[#315daa]">
            <BriefcaseBusiness size={15} />
          </div>
        </div>

        {/* Actions */}
       <Actions
  lawyer={lawyer}
  onView={onView}
  onEdit={onEdit}
  onDelete={onDelete}
  mobile
/>

        {/* Contact */}
        <div className="mt-3 flex gap-2 border-t border-[#f0f2f5] pt-3">
          <a
            href={`tel:${lawyer?.phone || ""}`}
            className="flex h-8 flex-1 items-center justify-center gap-1.5 rounded-lg border border-[#e5e9ef] text-[9px] font-bold text-[#62718a] transition hover:border-[#315daa] hover:bg-[#f7f9fc]"
          >
            <Phone size={12} />
            اتصال
          </a>

          <a
            href={`mailto:${lawyer?.email || ""}`}
            className="flex h-8 flex-1 items-center justify-center gap-1.5 rounded-lg border border-[#e5e9ef] text-[9px] font-bold text-[#62718a] transition hover:border-[#315daa] hover:bg-[#f7f9fc]"
          >
            <Mail size={12} />
            البريد
          </a>
        </div>
      </div>
    </div>
  );
};

/* =====================================================
   Actions
===================================================== */

const Actions = ({
  lawyer,
  onView,
  onEdit,
  onDelete,
  mobile = false,
}) => {
  return (
    <div
      className={`flex items-center gap-1.5 ${
        mobile ? "mt-4" : ""
      }`}
    >
      <IconButton
        title="عرض التفاصيل"
        onClick={onView}
        className="bg-[#eef3ff] text-[#315daa] hover:bg-[#dfeaff]"
      >
        <Eye size={13} />
      </IconButton>

      <IconButton
        title="تعديل المحامي"
        onClick={onEdit}
        className="bg-[#f5f6f8] text-[#62718a] hover:bg-[#e9edf3]"
      >
        <Pencil size={13} />
      </IconButton>

      <IconButton
        title="حذف المحامي"
        onClick={onDelete}
        className="bg-[#fff0f0] text-[#c94a4a] hover:bg-[#ffe4e4]"
      >
        <Trash2 size={13} />
      </IconButton>
    </div>
  );
};

/* =====================================================
   Modal
===================================================== */

const LawyerModal = ({
  type,
  lawyer,
  onClose,
}) => {
  const isDelete = type === "delete";
  const isEdit = type === "edit";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#111827]/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md overflow-hidden bg-white shadow-2xl rounded-2xl">
        <div className="flex items-center justify-between border-b border-[#edf0f4] px-5 py-4">
          <div>
            <h3 className="text-[13px] font-bold text-[#111827]">
              {isDelete
                ? "حذف المحامي"
                : isEdit
                ? "تعديل بيانات المحامي"
                : "تفاصيل المحامي"}
            </h3>

            <p className="mt-1 text-[9px] text-[#98a2b3]">
              {lawyer?.name}
            </p>
          </div>

          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#98a2b3] hover:bg-[#f5f7fa]"
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-5">
          <div className="flex items-center gap-3 rounded-xl bg-[#f8f9fb] p-3">
            <Avatar
              lawyer={lawyer}
              size="h-12 w-12"
            />

            <div>
              <p className="text-[12px] font-bold text-[#111827]">
                {lawyer?.name}
              </p>

              <div className="mt-1">
                <Status active={lawyer?.isActive} />
              </div>
            </div>
          </div>

          {isDelete ? (
            <>
              <p className="mt-4 text-[10px] leading-6 text-[#687282]">
                هل أنت متأكد من حذف هذا المحامي؟ سيتم تنفيذ عملية
                الحذف من خلال النظام.
              </p>

              <div className="flex gap-2 mt-5">
                <button
                  onClick={onClose}
                  className="h-10 flex-1 rounded-xl border border-[#e2e6ed] text-[10px] font-bold text-[#45464d]"
                >
                  إلغاء
                </button>

                <button
                  className="h-10 flex-1 rounded-xl bg-[#c94a4a] text-[10px] font-bold text-white"
                >
                  تأكيد الحذف
                </button>
              </div>
            </>
          ) : isEdit ? (
            <div className="mt-5 space-y-3">
              <InfoRow
                label="البريد الإلكتروني"
                value={lawyer?.email}
              />

              <InfoRow
                label="رقم الهاتف"
                value={lawyer?.phone}
              />

              <InfoRow
                label="عدد القضايا"
                value={`${lawyer?.casesCount || 0} قضية`}
              />

              <p className="pt-2 text-[9px] text-[#98a2b3]">
                اربط هنا Modal التعديل الموجود عندك في المشروع.
              </p>
            </div>
          ) : (
            <div className="mt-5 space-y-3">
              <InfoRow
                label="البريد الإلكتروني"
                value={lawyer?.email}
              />

              <InfoRow
                label="رقم الهاتف"
                value={lawyer?.phone}
              />

              <InfoRow
                label="الحالة"
                value={lawyer?.isActive ? "نشط" : "غير نشط"}
              />

              <InfoRow
                label="القضايا المسندة"
                value={`${lawyer?.casesCount || 0} قضية`}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* =====================================================
   Small Components
===================================================== */

const Avatar = ({ lawyer, size = "h-10 w-10" }) =>
  lawyer?.profileImage?.url ? (
    <img
      src={lawyer.profileImage.url}
      alt={lawyer?.name || "lawyer"}
      className={`${size} shrink-0 rounded-full object-cover ring-2 ring-[#f0f3f7]`}
    />
  ) : (
    <div
      className={`${size} flex shrink-0 items-center justify-center rounded-full bg-[#111827] text-[13px] font-bold text-white ring-2 ring-[#f0f3f7]`}
    >
      {lawyer?.name?.charAt(0) || "م"}
    </div>
  );

const Status = ({ active }) => (
  <span
    className={`inline-flex rounded-full px-2 py-1 text-[8px] font-bold ${
      active
        ? "bg-[#eaf8f1] text-[#21885a]"
        : "bg-[#f1f3f6] text-[#7a8494]"
    }`}
  >
    {active ? "نشط" : "غير نشط"}
  </span>
);

const HeaderStat = ({ value, label }) => (
  <div className="min-w-[72px] px-4 py-2 text-center">
    <p className="text-[17px] font-bold text-white">
      {value}
    </p>

    <p className="mt-0.5 text-[8px] text-[#9da8ba]">
      {label}
    </p>
  </div>
);

const ViewButton = ({
  active,
  onClick,
  children,
}) => (
  <button
    onClick={onClick}
    className={`flex h-8 w-9 items-center justify-center rounded-lg transition ${
      active
        ? "bg-white text-[#111827] shadow-sm"
        : "text-[#9aa3b1] hover:text-[#111827]"
    }`}
  >
    {children}
  </button>
);

const IconButton = ({
  title,
  onClick,
  className,
  children,
}) => (
  <button
    onClick={onClick}
    title={title}
    className={`flex h-8 w-8 items-center justify-center rounded-lg transition ${className}`}
  >
    {children}
  </button>
);

const PageButton = ({
  disabled,
  onClick,
  children,
}) => (
  <button
    disabled={disabled}
    onClick={onClick}
    className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#e7ebf2] bg-white text-[#687282] transition hover:bg-[#f7f9fc] disabled:cursor-not-allowed disabled:opacity-40"
  >
    {children}
  </button>
);

const InfoRow = ({ label, value }) => (
  <div className="flex items-center justify-between rounded-xl bg-[#fafbfc] px-3 py-2.5">
    <span className="text-[9px] text-[#98a2b3]">
      {label}
    </span>

    <span className="max-w-[60%] truncate text-[9px] font-bold text-[#344054]">
      {value || "غير متوفر"}
    </span>
  </div>
);

export default Table;