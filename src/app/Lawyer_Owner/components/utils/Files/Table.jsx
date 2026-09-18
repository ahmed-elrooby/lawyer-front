"use client";
import React, { useMemo, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  LayoutGrid,
  List,
  Eye,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  FileText,
  MoreHorizontal,
} from "lucide-react";

const TemplatesLibrary = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("الكل");
  const [type, setType] = useState("الكل");
  const [sortBy, setSortBy] = useState("الأحدث");
  const [viewMode, setViewMode] = useState("table");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;

  const templates = [
    {
      id: 1,
      title: "دعوى مطالبة بمبلغ مالي",
      category: "مدني",
      type: "دعاوى",
      usage: 42,
      updatedAt: "منذ يومين",
      status: "نشطة",
      author: "أحمد محمد",
    },
    {
      id: 2,
      title: "دعوى صحة ونفاذ",
      category: "مدني",
      type: "دعاوى",
      usage: 38,
      updatedAt: "منذ 3 أيام",
      status: "نشطة",
      author: "محمد أحمد",
    },
    {
      id: 3,
      title: "دعوى طلاق للضرر",
      category: "أسرة",
      type: "دعاوى",
      usage: 35,
      updatedAt: "منذ 5 أيام",
      status: "نشطة",
      author: "خالد عبد الرحمن",
    },
    {
      id: 4,
      title: "دعوى نفقة زوجية",
      category: "أسرة",
      type: "دعاوى",
      usage: 31,
      updatedAt: "منذ أسبوع",
      status: "نشطة",
      author: "سامي محمود",
    },
    {
      id: 5,
      title: "دعوى تعويض عن أضرار",
      category: "مدني",
      type: "دعاوى",
      usage: 28,
      updatedAt: "منذ أسبوع",
      status: "نشطة",
      author: "أحمد محمد",
    },
    {
      id: 6,
      title: "دعوى فرز وتجنيب",
      category: "مدني",
      type: "دعاوى",
      usage: 24,
      updatedAt: "منذ 10 أيام",
      status: "نشطة",
      author: "عمر حسن",
    },
    {
      id: 7,
      title: "إنذار رسمي على يد محضر",
      category: "مدني",
      type: "إنذارات",
      usage: 22,
      updatedAt: "منذ أسبوعين",
      status: "نشطة",
      author: "محمد أحمد",
    },
    {
      id: 8,
      title: "مذكرة دفاع",
      category: "جنائي",
      type: "مذكرات",
      usage: 20,
      updatedAt: "منذ أسبوعين",
      status: "نشطة",
      author: "خالد عبد الرحمن",
    },
    {
      id: 9,
      title: "صحيفة استئناف",
      category: "مدني",
      type: "استئناف",
      usage: 18,
      updatedAt: "منذ 3 أسابيع",
      status: "نشطة",
      author: "سامي محمود",
    },
    {
      id: 10,
      title: "صحيفة نقض",
      category: "جنائي",
      type: "نقض",
      usage: 15,
      updatedAt: "منذ شهر",
      status: "نشطة",
      author: "عمر حسن",
    },
    {
      id: 11,
      title: "دعوى فسخ عقد",
      category: "تجاري",
      type: "دعاوى",
      usage: 14,
      updatedAt: "منذ شهر",
      status: "نشطة",
      author: "أحمد محمد",
    },
    {
      id: 12,
      title: "دعوى إخلاء",
      category: "مدني",
      type: "دعاوى",
      usage: 12,
      updatedAt: "منذ شهر",
      status: "نشطة",
      author: "محمد أحمد",
    },
  ];

  const filteredTemplates = useMemo(() => {
    let result = [...templates];

    if (search.trim()) {
      result = result.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== "الكل") {
      result = result.filter((item) => item.category === category);
    }

    if (type !== "الكل") {
      result = result.filter((item) => item.type === type);
    }

    if (sortBy === "الأكثر استخداماً") {
      result.sort((a, b) => b.usage - a.usage);
    }

    if (sortBy === "الأحدث") {
      result.sort((a, b) => b.id - a.id);
    }

    if (sortBy === "الاسم") {
      result.sort((a, b) => a.title.localeCompare(b.title, "ar"));
    }

    return result;
  }, [search, category, type, sortBy]);

  const totalPages = Math.ceil(filteredTemplates.length / itemsPerPage);

  const paginatedTemplates = filteredTemplates.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const resetFilters = () => {
    setSearch("");
    setCategory("الكل");
    setType("الكل");
    setSortBy("الأحدث");
    setCurrentPage(1);
  };

  return (
    <section dir="rtl" className="w-full">
      <div className="overflow-hidden rounded-xl border border-[#E8EAF0] bg-white shadow-[0_2px_8px_rgba(11,28,48,0.03)]">

        {/* Header */}
        <div className="border-b border-[#EEF0F3] p-5">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

            <div>
              <h2 className="text-[15px] font-bold text-[#0B1C30]">
                مكتبة صيغ الدعاوى
              </h2>

              <p className="mt-1 text-[11px] text-[#8A8E96]">
                البحث والوصول السريع إلى جميع الصيغ القانونية المحفوظة
              </p>
            </div>

            {/* View Mode */}
            <div className="flex items-center gap-1 rounded-lg border border-[#E4E7EC] bg-[#F8F9FB] p-1">
              <button
                onClick={() => setViewMode("table")}
                className={`flex h-8 w-8 items-center justify-center rounded-md transition ${
                  viewMode === "table"
                    ? "bg-white text-[#0B1C30] shadow-sm"
                    : "text-[#8A8E96]"
                }`}
              >
                <List size={16} />
              </button>

              <button
                onClick={() => setViewMode("cards")}
                className={`flex h-8 w-8 items-center justify-center rounded-md transition ${
                  viewMode === "cards"
                    ? "bg-white text-[#0B1C30] shadow-sm"
                    : "text-[#8A8E96]"
                }`}
              >
                <LayoutGrid size={16} />
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-[1.7fr_1fr_1fr_1fr_auto]">

            {/* Search */}
            <div className="relative">
              <Search
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9AA0A8]"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="ابحث عن صيغة دعوى..."
                className="h-10 w-full rounded-lg border border-[#E1E4E9] bg-white pr-9 pl-3 text-[11px] text-[#0B1C30] outline-none transition placeholder:text-[#A0A5AD] focus:border-[#B8C5DD] focus:ring-2 focus:ring-[#EAF0FF]"
              />
            </div>

            {/* Category */}
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setCurrentPage(1);
              }}
              className="h-10 rounded-lg border border-[#E1E4E9] bg-white px-3 text-[11px] text-[#45464D] outline-none"
            >
              <option value="الكل">كل المجالات</option>
              <option value="مدني">مدني</option>
              <option value="تجاري">تجاري</option>
              <option value="أسرة">أسرة</option>
              <option value="جنائي">جنائي</option>
              <option value="إداري">إداري</option>
            </select>

            {/* Type */}
            <select
              value={type}
              onChange={(e) => {
                setType(e.target.value);
                setCurrentPage(1);
              }}
              className="h-10 rounded-lg border border-[#E1E4E9] bg-white px-3 text-[11px] text-[#45464D] outline-none"
            >
              <option value="الكل">كل التصنيفات</option>
              <option value="دعاوى">دعاوى</option>
              <option value="إنذارات">إنذارات</option>
              <option value="مذكرات">مذكرات</option>
              <option value="استئناف">استئناف</option>
              <option value="نقض">نقض</option>
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setCurrentPage(1);
              }}
              className="h-10 rounded-lg border border-[#E1E4E9] bg-white px-3 text-[11px] text-[#45464D] outline-none"
            >
              <option value="الأحدث">الأحدث</option>
              <option value="الأكثر استخداماً">الأكثر استخداماً</option>
              <option value="الاسم">حسب الاسم</option>
            </select>

            {/* Reset */}
            <button
              onClick={resetFilters}
              className="flex h-10 items-center justify-center gap-2 rounded-lg border border-[#E1E4E9] px-4 text-[11px] font-bold text-[#59616D] transition hover:bg-[#F8F9FB]"
            >
              <SlidersHorizontal size={14} />
              إعادة ضبط
            </button>
          </div>
        </div>

        {/* TABLE */}
        {viewMode === "table" && (
          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full min-w-[900px] text-right">
              <thead>
                <tr className="border-b border-[#EEF0F3] bg-[#FAFBFC]">
                  <th className="px-5 py-3 text-[10px] font-bold text-[#777B84]">
                    الصيغة القانونية
                  </th>

                  <th className="px-4 py-3 text-[10px] font-bold text-[#777B84]">
                    المجال
                  </th>

                  <th className="px-4 py-3 text-[10px] font-bold text-[#777B84]">
                    التصنيف
                  </th>

                  <th className="px-4 py-3 text-[10px] font-bold text-[#777B84]">
                    الاستخدام
                  </th>

                  <th className="px-4 py-3 text-[10px] font-bold text-[#777B84]">
                    آخر تحديث
                  </th>

                  <th className="px-4 py-3 text-[10px] font-bold text-[#777B84]">
                    الحالة
                  </th>

                  <th className="px-5 py-3 text-center text-[10px] font-bold text-[#777B84]">
                    الإجراءات
                  </th>
                </tr>
              </thead>

              <tbody>
                {paginatedTemplates.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-[#F0F1F4] transition hover:bg-[#FBFCFE]"
                  >
                    {/* Name */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#EAF0FF]">
                          <FileText
                            size={16}
                            className="text-[#4868B4]"
                          />
                        </div>

                        <div>
                          <p className="text-[11px] font-bold text-[#0B1C30]">
                            {item.title}
                          </p>

                          <p className="mt-1 text-[9px] text-[#9AA0A8]">
                            بواسطة {item.author}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-4 py-4">
                      <span className="rounded-md bg-[#F4F5F7] px-2.5 py-1 text-[9px] font-semibold text-[#59616D]">
                        {item.category}
                      </span>
                    </td>

                    {/* Type */}
                    <td className="px-4 py-4">
                      <span className="text-[10px] font-medium text-[#59616D]">
                        {item.type}
                      </span>
                    </td>

                    {/* Usage */}
                    <td className="px-4 py-4">
                      <span className="text-[11px] font-bold text-[#0B1C30]">
                        {item.usage}
                      </span>

                      <span className="mr-1 text-[9px] text-[#9AA0A8]">
                        مرة
                      </span>
                    </td>

                    {/* Updated */}
                    <td className="px-4 py-4 text-[10px] text-[#777B84]">
                      {item.updatedAt}
                    </td>

                    {/* Status */}
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E8F6EF] px-2.5 py-1 text-[9px] font-bold text-[#258A5A]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#258A5A]" />
                        {item.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          title="عرض"
                          className="flex h-8 w-8 items-center justify-center rounded-md border border-[#E4E7EC] text-[#59616D] transition hover:border-[#C8D2E5] hover:bg-[#F5F7FB] hover:text-[#4868B4]"
                        >
                          <Eye size={14} />
                        </button>

                        <button
                          title="تعديل"
                          className="flex h-8 w-8 items-center justify-center rounded-md border border-[#E4E7EC] text-[#59616D] transition hover:border-[#E4D7A8] hover:bg-[#FFF9E8] hover:text-[#806700]"
                        >
                          <Pencil size={14} />
                        </button>

                        <button
                          title="حذف"
                          className="flex h-8 w-8 items-center justify-center rounded-md border border-[#E4E7EC] text-[#59616D] transition hover:border-[#F0CACA] hover:bg-[#FFF3F3] hover:text-[#C24A4A]"
                        >
                          <Trash2 size={14} />
                        </button>

                        <button className="flex h-8 w-8 items-center justify-center rounded-md text-[#9AA0A8] hover:bg-[#F5F6F8]">
                          <MoreHorizontal size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* CARDS */}
        {viewMode === "cards" && (
          <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 xl:grid-cols-3">
            {paginatedTemplates.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-[#E8EAF0] p-4 transition hover:-translate-y-0.5 hover:border-[#D7DCE5] hover:shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EAF0FF]">
                      <FileText
                        size={18}
                        className="text-[#4868B4]"
                      />
                    </div>

                    <div>
                      <h3 className="text-[11px] font-bold text-[#0B1C30]">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-[9px] text-[#9AA0A8]">
                        بواسطة {item.author}
                      </p>
                    </div>
                  </div>

                  <button className="text-[#9AA0A8]">
                    <MoreHorizontal size={17} />
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="rounded-md bg-[#F4F5F7] px-2 py-1 text-[9px] font-semibold text-[#59616D]">
                    {item.category}
                  </span>

                  <span className="rounded-md bg-[#F4F5F7] px-2 py-1 text-[9px] font-semibold text-[#59616D]">
                    {item.type}
                  </span>

                  <span className="rounded-full bg-[#E8F6EF] px-2 py-1 text-[9px] font-bold text-[#258A5A]">
                    {item.status}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 border-y border-[#F0F1F4] py-3">
                  <div>
                    <p className="text-[9px] text-[#9AA0A8]">
                      مرات الاستخدام
                    </p>
                    <p className="mt-1 text-[12px] font-bold text-[#0B1C30]">
                      {item.usage}
                    </p>
                  </div>

                  <div>
                    <p className="text-[9px] text-[#9AA0A8]">
                      آخر تحديث
                    </p>
                    <p className="mt-1 text-[10px] font-semibold text-[#59616D]">
                      {item.updatedAt}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-3">
                  <button className="flex h-8 flex-1 items-center justify-center gap-1.5 rounded-md bg-[#0B1C30] text-[10px] font-bold text-white transition hover:bg-[#142A42]">
                    <Eye size={13} />
                    عرض الصيغة
                  </button>

                  <button className="flex h-8 w-8 items-center justify-center rounded-md border border-[#E4E7EC] text-[#59616D] hover:bg-[#F8F9FB]">
                    <Pencil size={13} />
                  </button>

                  <button className="flex h-8 w-8 items-center justify-center rounded-md border border-[#E4E7EC] text-[#C24A4A] hover:bg-[#FFF3F3]">
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty */}
        {paginatedTemplates.length === 0 && (
          <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F4F5F7]">
              <FileText size={24} className="text-[#9AA0A8]" />
            </div>

            <h3 className="mt-4 text-sm font-bold text-[#0B1C30]">
              لا توجد صيغ مطابقة
            </h3>

            <p className="mt-1 text-[10px] text-[#8A8E96]">
              جرّب تغيير كلمات البحث أو الفلاتر المستخدمة.
            </p>
          </div>
        )}

        {/* Pagination */}
        {filteredTemplates.length > 0 && (
          <div className="flex flex-col gap-3 border-t border-[#EEF0F3] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[10px] text-[#8A8E96]">
              عرض{" "}
              <span className="font-bold text-[#59616D]">
                {(currentPage - 1) * itemsPerPage + 1}
              </span>{" "}
              إلى{" "}
              <span className="font-bold text-[#59616D]">
                {Math.min(
                  currentPage * itemsPerPage,
                  filteredTemplates.length
                )}
              </span>{" "}
              من{" "}
              <span className="font-bold text-[#59616D]">
                {filteredTemplates.length}
              </span>{" "}
              صيغة
            </p>

            <div className="flex items-center gap-1">
              <button
                disabled={currentPage === 1}
                onClick={() =>
                  setCurrentPage((prev) => Math.max(prev - 1, 1))
                }
                className="flex h-8 w-8 items-center justify-center rounded-md border border-[#E4E7EC] text-[#59616D] transition hover:bg-[#F5F6F8] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronRight size={14} />
              </button>

              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`flex h-8 min-w-8 items-center justify-center rounded-md px-2 text-[10px] font-bold transition ${
                      currentPage === page
                        ? "bg-[#0B1C30] text-white"
                        : "border border-[#E4E7EC] text-[#59616D] hover:bg-[#F5F6F8]"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}

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

export default TemplatesLibrary;