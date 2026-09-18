"use client";
import React, { useMemo, useState } from "react";
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
  Check,
} from "lucide-react";

const Table = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("الكل");
  const [specializationFilter, setSpecializationFilter] = useState("الكل");
  const [sortBy, setSortBy] = useState("default");
  const [viewMode, setViewMode] = useState("grid");

  const [lawyers, setLawyers] = useState([
    {
      id: 1,
      name: "أحمد محمد علي",
      role: "محامي استئناف",
      status: "نشط",
      specialization: "القانون الجنائي",
      image: "https://i.pravatar.cc/150?img=11",
      phone: "01012345678",
      email: "ahmed@example.com",
      cases: 22,
      completed: 14,
      success: 92,
      progress: 82,
    },
    {
      id: 2,
      name: "محمد أحمد حسن",
      role: "محامي ومستشار قانوني",
      status: "مشغول",
      specialization: "القانون التجاري",
      image: "https://i.pravatar.cc/150?img=47",
      phone: "01023456789",
      email: "mohamed@example.com",
      cases: 38,
      completed: 24,
      success: 88,
      progress: 74,
    },
    {
      id: 3,
      name: "خالد عبد الرحمن",
      role: "محامي أحوال شخصية",
      status: "نشط",
      specialization: "أحوال شخصية",
      image: "https://i.pravatar.cc/150?img=32",
      phone: "01034567890",
      email: "khaled@example.com",
      cases: 24,
      completed: 18,
      success: 95,
      progress: 90,
    },
    {
      id: 4,
      name: "سامي محمود",
      role: "محامي مدني",
      status: "نشط",
      specialization: "القانون المدني",
      image: "https://i.pravatar.cc/150?img=5",
      phone: "01045678901",
      email: "samy@example.com",
      cases: 14,
      completed: 11,
      success: 91,
      progress: 79,
    },
    {
      id: 5,
      name: "ياسر إبراهيم",
      role: "محامي تجاري",
      status: "نشط",
      specialization: "القانون التجاري",
      image: "https://i.pravatar.cc/150?img=44",
      phone: "01056789012",
      email: "yasser@example.com",
      cases: 31,
      completed: 21,
      success: 87,
      progress: 67,
    },
    {
      id: 6,
      name: "عمر حسن",
      role: "محامي استئناف",
      status: "نشط",
      specialization: "القانون الجنائي",
      image: "https://i.pravatar.cc/150?img=68",
      phone: "01067890123",
      email: "omar@example.com",
      cases: 19,
      completed: 15,
      success: 94,
      progress: 84,
    },
  ]);

  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedLawyer, setSelectedLawyer] = useState(null);

  const specializations = [
    "الكل",
    ...new Set(lawyers.map((lawyer) => lawyer.specialization)),
  ];

  const getStatusStyle = (status) => {
    if (status === "نشط") {
      return "bg-[#EFFAF5] text-[#3D9561] border-[#D6F1E3]";
    }

    if (status === "مشغول") {
      return "bg-[#FFF8E8] text-[#A87A16] border-[#F6E5B7]";
    }

    return "bg-[#FFF0F0] text-[#C94A4A] border-[#F5D1D1]";
  };

  const getProgressColor = (progress) => {
    if (progress >= 85) return "bg-[#3D9561]";
    if (progress >= 75) return "bg-[#111827]";
    return "bg-[#8AA8D8]";
  };

  const filteredLawyers = useMemo(() => {
    let result = [...lawyers];

    if (search.trim()) {
      const value = search.toLowerCase();

      result = result.filter(
        (lawyer) =>
          lawyer.name.toLowerCase().includes(value) ||
          lawyer.role.toLowerCase().includes(value) ||
          lawyer.specialization.toLowerCase().includes(value)
      );
    }

    if (statusFilter !== "الكل") {
      result = result.filter(
        (lawyer) => lawyer.status === statusFilter
      );
    }

    if (specializationFilter !== "الكل") {
      result = result.filter(
        (lawyer) =>
          lawyer.specialization === specializationFilter
      );
    }

    if (sortBy === "cases") {
      result.sort((a, b) => b.cases - a.cases);
    }

    if (sortBy === "success") {
      result.sort((a, b) => b.success - a.success);
    }

    if (sortBy === "progress") {
      result.sort((a, b) => b.progress - a.progress);
    }

    return result;
  }, [
    lawyers,
    search,
    statusFilter,
    specializationFilter,
    sortBy,
  ]);

  // =========================
  // Actions
  // =========================

  const handleView = (lawyer) => {
    console.log("عرض تفاصيل المحامي:", lawyer);

    // هنا تقدر تفتح Modal أو تعمل Navigate
    alert(`تفاصيل المحامي: ${lawyer.name}`);
  };

  const handleEdit = (lawyer) => {
    console.log("تعديل المحامي:", lawyer);

    // هنا تقدر تفتح Edit Modal
    alert(`تعديل بيانات: ${lawyer.name}`);
  };

  const handleDeleteClick = (lawyer) => {
    setSelectedLawyer(lawyer);
    setDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    if (!selectedLawyer) return;

    setLawyers((prev) =>
      prev.filter((lawyer) => lawyer.id !== selectedLawyer.id)
    );

    setDeleteModal(false);
    setSelectedLawyer(null);
  };

  return (
    <div
      className="w-full p-4 mt-10 bg-white rounded-2xl md:p-5"
    >
      {/* =========================
          Filters
      ========================= */}
      <div className="mb-6 rounded-2xl border border-[#EEF1F5] bg-[#FAFBFC] p-4">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">

          {/* Search */}
          <div className="relative">
            <Search
              size={17}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9AA3B1]"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ابحث عن محامي..."
              className="h-10 w-full rounded-xl border border-[#E7EBF2] bg-white pr-10 pl-3 text-sm text-[#111827] outline-none transition placeholder:text-[#A0A7B2] focus:border-[#B7C5DD]"
            />
          </div>

          {/* Status */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 rounded-xl border border-[#E7EBF2] bg-white px-3 text-sm text-[#45464D] outline-none"
          >
            <option value="الكل">كل الحالات</option>
            <option value="نشط">نشط</option>
            <option value="مشغول">مشغول</option>
          </select>

          {/* Specialization */}
          <select
            value={specializationFilter}
            onChange={(e) =>
              setSpecializationFilter(e.target.value)
            }
            className="h-10 rounded-xl border border-[#E7EBF2] bg-white px-3 text-sm text-[#45464D] outline-none"
          >
            {specializations.map((item) => (
              <option key={item} value={item}>
                {item === "الكل"
                  ? "كل التخصصات"
                  : item}
              </option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="h-10 rounded-xl border border-[#E7EBF2] bg-white px-3 text-sm text-[#45464D] outline-none"
          >
            <option value="default">الترتيب الافتراضي</option>
            <option value="cases">الأكثر قضايا</option>
            <option value="success">الأعلى نجاحاً</option>
            <option value="progress">الأعلى كفاءة</option>
          </select>
        </div>
      </div>

      {/* =========================
          Header
      ========================= */}
      <div className="flex flex-col gap-4 mb-5 md:flex-row md:items-center md:justify-between">

        <div>
          <h2 className="text-lg font-bold text-[#0B1C30]">
            قائمة المحامين
          </h2>

          <p className="mt-1 text-xs text-[#8993A5]">
            {filteredLawyers.length} محامي ظاهر في النظام
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex w-fit items-center rounded-xl border border-[#E7EBF2] bg-[#FAFBFC] p-1">

          <button
            onClick={() => setViewMode("grid")}
            className={`flex h-8 w-9 items-center justify-center rounded-lg transition ${
              viewMode === "grid"
                ? "bg-white text-[#111827] shadow-sm"
                : "text-[#9AA3B1]"
            }`}
          >
            <Grid3X3 size={16} />
          </button>

          <button
            onClick={() => setViewMode("list")}
            className={`flex h-8 w-9 items-center justify-center rounded-lg transition ${
              viewMode === "list"
                ? "bg-white text-[#111827] shadow-sm"
                : "text-[#9AA3B1]"
            }`}
          >
            <List size={17} />
          </button>
        </div>
      </div>

      {/* =========================
          Empty State
      ========================= */}
      {filteredLawyers.length === 0 && (
        <div className="flex min-h-[250px] flex-col items-center justify-center rounded-2xl border border-dashed border-[#E5E9F0]">
          <UserRound
            size={38}
            className="mb-3 text-[#B7BFCC]"
          />

          <h3 className="text-sm font-bold text-[#45464D]">
            لا توجد نتائج
          </h3>

          <p className="mt-1 text-xs text-[#9AA3B1]">
            جرّب تغيير الفلاتر أو كلمة البحث
          </p>
        </div>
      )}

      {/* =========================
          GRID VIEW
      ========================= */}
      {viewMode === "grid" &&
        filteredLawyers.length > 0 && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">

            {filteredLawyers.map((lawyer) => (
              <div
                key={lawyer.id}
                className="group overflow-hidden rounded-2xl border border-[#E7EBF2] bg-white transition duration-200 hover:-translate-y-1 hover:border-[#D5DDEB] hover:shadow-[0_10px_30px_rgba(15,23,42,0.07)]"
              >

                {/* Card Header */}
                <div className="p-4">

                  <div className="flex items-start justify-between gap-3">

                    <div className="flex items-center min-w-0 gap-3">

                      <img
                        src={lawyer.image}
                        alt={lawyer.name}
                        className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-[#F0F3F7]"
                      />

                      <div className="min-w-0">
                        <h3 className="truncate text-sm font-bold text-[#0B1C30]">
                          {lawyer.name}
                        </h3>

                        <p className="mt-1 truncate text-[11px] text-[#8993A5]">
                          {lawyer.role}
                        </p>
                      </div>
                    </div>

                    <button className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[#9AA3B1] transition hover:bg-[#F5F7FA] hover:text-[#111827]">
                      <MoreVertical size={17} />
                    </button>
                  </div>

                  {/* Status + Specialization */}
                  <div className="flex flex-wrap items-center gap-2 mt-4">

                    <span
                      className={`rounded-full border px-2.5 py-1 text-[10px] font-bold ${getStatusStyle(
                        lawyer.status
                      )}`}
                    >
                      {lawyer.status}
                    </span>

                    <span className="rounded-full bg-[#F4F6F9] px-2.5 py-1 text-[10px] font-medium text-[#687282]">
                      {lawyer.specialization}
                    </span>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-2 mt-5">

                    <div className="rounded-xl bg-[#F8F9FB] p-3 text-center">
                      <p className="text-[10px] text-[#8993A5]">
                        القضايا
                      </p>

                      <p className="mt-1 text-sm font-bold text-[#111827]">
                        {lawyer.cases}
                      </p>
                    </div>

                    <div className="rounded-xl bg-[#F8F9FB] p-3 text-center">
                      <p className="text-[10px] text-[#8993A5]">
                        مكتملة
                      </p>

                      <p className="mt-1 text-sm font-bold text-[#111827]">
                        {lawyer.completed}
                      </p>
                    </div>

                    <div className="rounded-xl bg-[#F8F9FB] p-3 text-center">
                      <p className="text-[10px] text-[#8993A5]">
                        النجاح
                      </p>

                      <p className="mt-1 text-sm font-bold text-[#3D9561]">
                        {lawyer.success}%
                      </p>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="mt-5">

                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-medium text-[#8993A5]">
                        معدل الكفاءة
                      </span>

                      <span className="text-[10px] font-bold text-[#45464D]">
                        {lawyer.progress}%
                      </span>
                    </div>

                    <div className="h-2 w-full overflow-hidden rounded-full bg-[#EEF1F5]">
                      <div
                        className={`h-full rounded-full transition-all ${getProgressColor(
                          lawyer.progress
                        )}`}
                        style={{
                          width: `${lawyer.progress}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Contact */}
                <div className="border-t border-[#EEF1F5] px-4 py-3">

                  <div className="flex items-center gap-2">

                    <button
                      onClick={() =>
                        (window.location.href = `tel:${lawyer.phone}`)
                      }
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E7EBF2] text-[#8993A5] transition hover:border-[#D5DDEB] hover:bg-[#F7F9FC] hover:text-[#111827]"
                      title="اتصال"
                    >
                      <Phone size={14} />
                    </button>

                    <button
                      onClick={() =>
                        (window.location.href = `mailto:${lawyer.email}`)
                      }
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E7EBF2] text-[#8993A5] transition hover:border-[#D5DDEB] hover:bg-[#F7F9FC] hover:text-[#111827]"
                      title="البريد الإلكتروني"
                    >
                      <Mail size={14} />
                    </button>

                    <div className="flex items-center gap-2 mr-auto">

                      {/* Details */}
                      <button
                        onClick={() => handleView(lawyer)}
                        className="flex h-8 items-center gap-1.5 rounded-lg border border-[#DCE4F0] bg-white px-2.5 text-[10px] font-bold text-[#344054] transition hover:border-[#BFCBDE] hover:bg-[#F7F9FC]"
                        title="عرض التفاصيل"
                      >
                        <Eye size={13} />
                        التفاصيل
                      </button>

                      {/* Edit */}
                      <button
                        onClick={() => handleEdit(lawyer)}
                        className="flex h-8 items-center gap-1.5 rounded-lg bg-[#EEF5FF] px-2.5 text-[10px] font-bold text-[#3E67A5] transition hover:bg-[#E1EDFF]"
                        title="تعديل"
                      >
                        <Pencil size={13} />
                        تعديل
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => handleDeleteClick(lawyer)}
                        className="flex h-8 items-center gap-1.5 rounded-lg bg-[#FFF1F1] px-2.5 text-[10px] font-bold text-[#C94A4A] transition hover:bg-[#FFE5E5]"
                        title="حذف"
                      >
                        <Trash2 size={13} />
                        حذف
                      </button>

                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      {/* =========================
          LIST VIEW
      ========================= */}
      {viewMode === "list" &&
        filteredLawyers.length > 0 && (
          <div className="space-y-3">

            {filteredLawyers.map((lawyer) => (
              <div
                key={lawyer.id}
                className="rounded-2xl border border-[#E7EBF2] bg-white p-4 transition hover:border-[#D5DDEB] hover:shadow-sm"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center">

                  {/* Lawyer */}
                  <div className="flex min-w-[230px] items-center gap-3">

                    <img
                      src={lawyer.image}
                      alt={lawyer.name}
                      className="object-cover w-12 h-12 rounded-full"
                    />

                    <div>
                      <h3 className="text-sm font-bold text-[#0B1C30]">
                        {lawyer.name}
                      </h3>

                      <p className="mt-1 text-[11px] text-[#8993A5]">
                        {lawyer.role}
                      </p>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex flex-wrap items-center gap-2 lg:min-w-[180px]">

                    <span
                      className={`rounded-full border px-2.5 py-1 text-[10px] font-bold ${getStatusStyle(
                        lawyer.status
                      )}`}
                    >
                      {lawyer.status}
                    </span>

                    <span className="rounded-full bg-[#F4F6F9] px-2.5 py-1 text-[10px] text-[#687282]">
                      {lawyer.specialization}
                    </span>
                  </div>

                  {/* Stats */}
                  <div className="grid flex-1 grid-cols-3 gap-3">

                    <div>
                      <p className="text-[10px] text-[#8993A5]">
                        القضايا
                      </p>
                      <p className="mt-1 text-sm font-bold text-[#111827]">
                        {lawyer.cases}
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] text-[#8993A5]">
                        المكتملة
                      </p>
                      <p className="mt-1 text-sm font-bold text-[#111827]">
                        {lawyer.completed}
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] text-[#8993A5]">
                        النجاح
                      </p>
                      <p className="mt-1 text-sm font-bold text-[#3D9561]">
                        {lawyer.success}%
                      </p>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="w-full lg:w-[130px]">

                    <div className="flex justify-between mb-1">
                      <span className="text-[9px] text-[#8993A5]">
                        الكفاءة
                      </span>

                      <span className="text-[9px] font-bold text-[#45464D]">
                        {lawyer.progress}%
                      </span>
                    </div>

                    <div className="h-1.5 overflow-hidden rounded-full bg-[#EEF1F5]">
                      <div
                        className={`h-full rounded-full ${getProgressColor(
                          lawyer.progress
                        )}`}
                        style={{
                          width: `${lawyer.progress}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 lg:mr-2">

                    <button
                      onClick={() => handleView(lawyer)}
                      className="flex h-9 items-center gap-1.5 rounded-lg border border-[#DCE4F0] px-3 text-[10px] font-bold text-[#344054] transition hover:bg-[#F7F9FC]"
                    >
                      <Eye size={14} />
                      التفاصيل
                    </button>

                    <button
                      onClick={() => handleEdit(lawyer)}
                      className="flex h-9 items-center gap-1.5 rounded-lg bg-[#EEF5FF] px-3 text-[10px] font-bold text-[#3E67A5] transition hover:bg-[#E1EDFF]"
                    >
                      <Pencil size={14} />
                      تعديل
                    </button>

                    <button
                      onClick={() => handleDeleteClick(lawyer)}
                      className="flex h-9 items-center gap-1.5 rounded-lg bg-[#FFF1F1] px-3 text-[10px] font-bold text-[#C94A4A] transition hover:bg-[#FFE5E5]"
                    >
                      <Trash2 size={14} />
                      حذف
                    </button>

                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      {/* =========================
          Delete Modal
      ========================= */}
      {deleteModal && selectedLawyer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">

          <div
            dir="rtl"
            className="w-full max-w-md p-6 bg-white shadow-2xl rounded-2xl"
          >

            {/* Modal Header */}
            <div className="flex items-start justify-between">

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FFF1F1]">
                  <Trash2
                    size={20}
                    className="text-[#C94A4A]"
                  />
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#111827]">
                    حذف المحامي
                  </h3>

                  <p className="mt-1 text-xs text-[#8993A5]">
                    هل أنت متأكد من حذف هذا المحامي؟
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setDeleteModal(false);
                  setSelectedLawyer(null);
                }}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-[#8993A5] hover:bg-[#F5F7FA]"
              >
                <X size={17} />
              </button>
            </div>

            {/* Lawyer */}
            <div className="mt-5 flex items-center gap-3 rounded-xl bg-[#F8F9FB] p-3">

              <img
                src={selectedLawyer.image}
                alt={selectedLawyer.name}
                className="object-cover rounded-full h-11 w-11"
              />

              <div>
                <p className="text-sm font-bold text-[#111827]">
                  {selectedLawyer.name}
                </p>

                <p className="mt-1 text-[11px] text-[#8993A5]">
                  {selectedLawyer.role}
                </p>
              </div>
            </div>

            <p className="mt-4 text-xs leading-6 text-[#687282]">
              سيتم حذف بيانات المحامي من القائمة الحالية.
              هذا الإجراء لا يمكن التراجع عنه.
            </p>

            {/* Buttons */}
            <div className="flex items-center gap-2 mt-6">

              <button
                onClick={() => {
                  setDeleteModal(false);
                  setSelectedLawyer(null);
                }}
                className="flex h-10 flex-1 items-center justify-center gap-2 rounded-xl border border-[#E2E6ED] text-xs font-bold text-[#45464D] transition hover:bg-[#F7F8FA]"
              >
                <X size={15} />
                إلغاء
              </button>

              <button
                onClick={handleDeleteConfirm}
                className="flex h-10 flex-1 items-center justify-center gap-2 rounded-xl bg-[#C94A4A] text-xs font-bold text-white transition hover:bg-[#B83F3F]"
              >
                <Check size={15} />
                تأكيد الحذف
              </button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;