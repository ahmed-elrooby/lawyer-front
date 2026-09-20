"use client";

import React, { useContext, useMemo, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  Eye,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  FileText,
  File,
} from "lucide-react";
import { OwnerContext } from "../../../../../Providers/LawyerOwner/OwnerProvider.js";
import DeleteFile from "./DeleteFile.jsx";
import UpdateFile from "./UpdateFile.jsx";

const TemplatesLibrary = () => {
  const { documents = [],openDeleteDocument, setOpenDeleteDocument,openUpdateDocument, setOpenUpdateDocument } = useContext(OwnerContext);

  const [search, setSearch] = useState("");
  const [type, setType] = useState("الكل");
  const [sortBy, setSortBy] = useState("الأحدث");
  const [currentPage, setCurrentPage] = useState(1);
const [document,setDocument]=useState(null)
  const itemsPerPage = 6;

  const formatDate = (date) => {
    if (!date) return "-";

    const createdDate = new Date(date);

    return createdDate.toLocaleDateString("ar-EG", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getFileType = (document) => {
    if (document?.extension) {
      return document.extension.replace(".", "").toUpperCase();
    }

    if (document?.mimeType === "application/pdf") {
      return "PDF";
    }

    if (
      document?.mimeType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      return "DOCX";
    }

    if (document?.mimeType === "application/msword") {
      return "DOC";
    }

    return "FILE";
  };

  const getFileIcon = (document) => {
    const extension = document?.extension?.toLowerCase();

    if (extension === ".pdf") {
      return FileText;
    }

    return File;
  };

  const getFileSize = (size) => {
    if (!size) return "0 KB";

    if (size < 1024) {
      return `${size} B`;
    }

    if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(1)} KB`;
    }

    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  };

  const getRelativeDate = (date) => {
    if (!date) return "-";

    const now = new Date();
    const targetDate = new Date(date);

    const difference =
      now.getTime() - targetDate.getTime();

    const days = Math.floor(
      difference / (1000 * 60 * 60 * 24)
    );

    if (days <= 0) {
      return "اليوم";
    }

    if (days === 1) {
      return "منذ يوم";
    }

    if (days <= 30) {
      return `منذ ${days} أيام`;
    }

    const months = Math.floor(days / 30);

    if (months === 1) {
      return "منذ شهر";
    }

    if (months < 12) {
      return `منذ ${months} أشهر`;
    }

    return formatDate(date);
  };

  const filteredDocuments = useMemo(() => {
    let result = [...documents];

    /* Search */
    if (search.trim()) {
      const searchValue = search.toLowerCase().trim();

      result = result.filter((document) => {
        const name = document?.name?.toLowerCase() || "";
        const description =
          document?.description?.toLowerCase() || "";
        const originalName =
          document?.originalName?.toLowerCase() || "";
        const uploadedBy =
          document?.uploadedBy?.name?.toLowerCase() || "";

        return (
          name.includes(searchValue) ||
          description.includes(searchValue) ||
          originalName.includes(searchValue) ||
          uploadedBy.includes(searchValue)
        );
      });
    }

    /* File Type */
    if (type !== "الكل") {
      result = result.filter((document) => {
        const extension =
          document?.extension?.replace(".", "").toLowerCase();

        return extension === type.toLowerCase();
      });
    }

    /* Sorting */
    if (sortBy === "الأحدث") {
      result.sort(
        (a, b) =>
          new Date(b?.createdAt || 0) -
          new Date(a?.createdAt || 0)
      );
    }

    if (sortBy === "الأقدم") {
      result.sort(
        (a, b) =>
          new Date(a?.createdAt || 0) -
          new Date(b?.createdAt || 0)
      );
    }

    if (sortBy === "الاسم") {
      result.sort((a, b) =>
        (a?.name || "").localeCompare(
          b?.name || "",
          "ar"
        )
      );
    }

    return result;
  }, [documents, search, type, sortBy]);

  const totalPages = Math.ceil(
    filteredDocuments.length / itemsPerPage
  );

  const paginatedDocuments = filteredDocuments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const resetFilters = () => {
    setSearch("");
    setType("الكل");
    setSortBy("الأحدث");
    setCurrentPage(1);
  };

  const handleSearch = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleType = (value) => {
    setType(value);
    setCurrentPage(1);
  };

  const handleSort = (value) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  return <>
  {
    openDeleteDocument && <DeleteFile document={document}/>
  }
 {
  openUpdateDocument && <UpdateFile document={document}/>
 }
    <section  className="w-full">
      <div className="overflow-hidden rounded-xl border border-[#E8EAF0] bg-white shadow-[0_2px_8px_rgba(11,28,48,0.03)]">
        {/* Header */}
        <div className="border-b border-[#EEF0F3] p-5">
          <div>
            <h2 className="text-[15px] font-bold text-[#0B1C30]">
              مكتبة صيغ الدعاوى
            </h2>

            <p className="mt-1 text-[11px] text-[#8A8E96]">
              البحث والوصول السريع إلى جميع الصيغ القانونية
              المحفوظة
            </p>
          </div>

          {/* Filters */}
          <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-[1.7fr_1fr_1fr_auto]">
            {/* Search */}
            <div className="relative">
              <Search
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9AA0A8]"
              />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  handleSearch(e.target.value)
                }
                placeholder="ابحث عن صيغة دعوى..."
                className="h-10 w-full rounded-lg border border-[#E1E4E9] bg-white pr-9 pl-3 text-[11px] text-[#0B1C30] outline-none transition placeholder:text-[#A0A5AD] focus:border-[#B8C5DD] focus:ring-2 focus:ring-[#EAF0FF]"
              />
            </div>

            {/* Type */}
            <select
              value={type}
              onChange={(e) =>
                handleType(e.target.value)
              }
              className="h-10 rounded-lg border border-[#E1E4E9] bg-white px-3 text-[11px] text-[#45464D] outline-none"
            >
              <option value="الكل">
                كل أنواع الملفات
              </option>
              <option value="pdf">PDF</option>
              <option value="doc">Word DOC</option>
              <option value="docx">Word DOCX</option>
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) =>
                handleSort(e.target.value)
              }
              className="h-10 rounded-lg border border-[#E1E4E9] bg-white px-3 text-[11px] text-[#45464D] outline-none"
            >
              <option value="الأحدث">الأحدث</option>
              <option value="الأقدم">الأقدم</option>
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

        {/* Cards */}
        {paginatedDocuments.length > 0 && (
          <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 xl:grid-cols-3">
            {paginatedDocuments.map((document) => {
              const Icon = getFileIcon(document);
              const fileType = getFileType(document);

              return (
                <div
                  key={document?._id}
                  className="rounded-xl border border-[#E8EAF0] p-4 transition hover:-translate-y-0.5 hover:border-[#D7DCE5] hover:shadow-sm"
                >
                  {/* Top */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center min-w-0 gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#EAF0FF]">
                        <Icon
                          size={18}
                          className="text-[#4868B4]"
                        />
                      </div>

                      <div className="min-w-0">
                        <h3 className="truncate text-[11px] font-bold text-[#0B1C30]">
                          {document?.name || "بدون اسم"}
                        </h3>

                        <p className="mt-1 truncate text-[9px] text-[#9AA0A8]">
                          بواسطة{" "}
                          {document?.uploadedBy?.name ||
                            "غير محدد"}
                        </p>
                      </div>
                    </div>

                    <span className="shrink-0 rounded-md bg-[#EAF0FF] px-2 py-1 text-[9px] font-bold text-[#4868B4]">
                      {fileType}
                    </span>
                  </div>

                  {/* Description */}
                  <div className="mt-4 min-h-[42px]">
                    <p className="line-clamp-2 text-[10px] leading-5 text-[#777B84]">
                      {document?.description ||
                        "لا يوجد وصف لهذه الصيغة."}
                    </p>
                  </div>

                  {/* Info */}
                  <div className="mt-4 grid grid-cols-2 gap-3 border-y border-[#F0F1F4] py-3">
                    <div>
                      <p className="text-[9px] text-[#9AA0A8]">
                        حجم الملف
                      </p>

                      <p className="mt-1 text-[11px] font-bold text-[#0B1C30]">
                        {getFileSize(document?.size)}
                      </p>
                    </div>

                    <div>
                      <p className="text-[9px] text-[#9AA0A8]">
                        آخر تحديث
                      </p>

                      <p className="mt-1 text-[10px] font-semibold text-[#59616D]">
                        {getRelativeDate(
                          document?.updatedAt ||
                            document?.createdAt
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex items-center justify-between mt-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E8F6EF] px-2.5 py-1 text-[9px] font-bold text-[#258A5A]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#258A5A]" />
                      متاحة
                    </span>

                    <span className="text-[9px] text-[#9AA0A8]">
                      {getRelativeDate(document?.createdAt)}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 mt-4">
                    <a
                      href={document?.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-8 flex-1 items-center justify-center gap-1.5 rounded-md bg-[#0B1C30] text-[10px] font-bold text-white transition hover:bg-[#142A42]"
                    >
                      <Eye size={13} />
                      عرض الصيغة
                    </a>

                    <button
                    onClick={()=>{
                      setDocument(document)
                      setOpenUpdateDocument(true)
                    }}
                      title="تعديل"
                      className="flex h-8 w-8 items-center justify-center rounded-md border border-[#E4E7EC] text-[#59616D] transition hover:border-[#E4D7A8] hover:bg-[#FFF9E8] hover:text-[#806700]"
                    >
                      <Pencil size={13} />
                    </button>

                    <button
                    onClick={()=>{
                      setDocument(document)
                      setOpenDeleteDocument(true)
                    }}
                      title="حذف"
                      className="flex h-8 w-8 items-center justify-center rounded-md border border-[#E4E7EC] text-[#C24A4A] transition hover:bg-[#FFF3F3]"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Empty */}
        {paginatedDocuments.length === 0 && (
          <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F4F5F7]">
              <FileText
                size={24}
                className="text-[#9AA0A8]"
              />
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
        {filteredDocuments.length > 0 && (
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
                  filteredDocuments.length
                )}
              </span>{" "}
              من{" "}
              <span className="font-bold text-[#59616D]">
                {filteredDocuments.length}
              </span>{" "}
              صيغة
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
                  className={`flex h-8 min-w-8 items-center justify-center rounded-md px-2 text-[10px] font-bold transition ${
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
   </>
};

export default TemplatesLibrary;