"use client";

import React, { useContext, useEffect, useMemo, useState } from "react";

import {
  FaSearch,
  FaEdit,
  FaTrash,
  FaFolderOpen,
  FaChevronRight,
  FaChevronLeft,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

import { AdminContext } from "../../../../../Providers/AdminContext/Admin.js";
import HandleDeleteFileCategory from "./HandleDeleteFileCategory.jsx";
import UpdateFileCategory from "./UpdateFileCategory.jsx";

const Table = () => {
  const {
    categories,
    setOpenDeleteCategory,
     openDeleteCategory,openUpdateCategory,setOpenUpdateCategory
  } = useContext(AdminContext);

  const [selectedCategory, setSelectedCategory] = useState(null);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const categoryList = Array.isArray(categories) ? categories : [];

  // Search
  const filteredCategories = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) return categoryList;

    return categoryList.filter((category) => {
      const name = category?.name?.toLowerCase() || "";
      const description = category?.description?.toLowerCase() || "";

      return (
        name.includes(value) ||
        description.includes(value)
      );
    });
  }, [categoryList, search]);

  // Pagination
  const totalPages = Math.ceil(
    filteredCategories.length / itemsPerPage
  );

  const paginatedCategories = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;

    return filteredCategories.slice(
      startIndex,
      startIndex + itemsPerPage
    );
  }, [filteredCategories, currentPage, itemsPerPage]);

  // Reset page when search or page size changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search, itemsPerPage]);

  // Prevent invalid page
  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setOpenUpdateCategory(true);
  };

  const handleDelete = (category) => {
    setSelectedCategory(category);
    setOpenDeleteCategory(true);
  };

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return <>
  {
    openDeleteCategory && (
      <HandleDeleteFileCategory
        selectedCategory={selectedCategory}
      />
    )
  }
   {
    openUpdateCategory && <UpdateFileCategory
    selectedCategory={selectedCategory}
  />
  }
  
    <div className="overflow-hidden bg-white border shadow-sm rounded-2xl border-slate-100">
      {/* Header */}
      <div className="flex flex-col gap-4 p-5 border-b border-slate-100 lg:flex-row lg:items-center lg:justify-between">
        
        <div>
          <h2 className="text-lg font-bold text-slate-800">
            تصنيفات الملفات
          </h2>

          <p className="mt-1 text-xs text-slate-400">
            إدارة وتنظيم تصنيفات الملفات والمستندات
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          
          {/* Search */}
          <div className="relative">
            <FaSearch className="absolute text-xs -translate-y-1/2 right-4 top-1/2 text-slate-400" />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ابحث عن تصنيف..."
              className="w-full py-2.5 pr-10 pl-4 text-sm transition-all border outline-none sm:w-64 rounded-xl border-slate-200 text-slate-700 placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            />
          </div>

          {/* Items Per Page */}
          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="px-4 py-2.5 text-sm border outline-none cursor-pointer rounded-xl border-slate-200 text-slate-600 bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
          >
            <option value={5}>5 عناصر</option>
            <option value={10}>10 عناصر</option>
            <option value={20}>20 عنصر</option>
            <option value={50}>50 عنصر</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px] text-right">
          <thead>
            <tr className="border-b bg-slate-50/70 border-slate-100">
              <th className="px-5 py-4 text-xs font-semibold text-slate-500">
                التصنيف
              </th>

              <th className="px-5 py-4 text-xs font-semibold text-slate-500">
                الوصف
              </th>

              <th className="px-5 py-4 text-xs font-semibold text-slate-500">
                الحالة
              </th>

              <th className="px-5 py-4 text-xs font-semibold text-slate-500">
                تاريخ الإضافة
              </th>

              <th className="px-5 py-4 text-xs font-semibold text-slate-500">
                الإجراءات
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {paginatedCategories.length > 0 ? (
              paginatedCategories.map((category) => (
                <tr
                  key={category?._id}
                  className="transition-colors hover:bg-slate-50/60"
                >
                  {/* Category */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-blue-600 rounded-xl bg-blue-50">
                        <FaFolderOpen className="text-sm" />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-slate-700">
                          {category?.name || "—"}
                        </p>

                        <p className="mt-0.5 text-xs text-slate-400">
                          تصنيف ملفات
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Description */}
                  <td className="max-w-xs px-5 py-4">
                    <p className="text-sm leading-6 truncate text-slate-500">
                      {category?.description || "لا يوجد وصف"}
                    </p>
                  </td>

                  {/* Status */}
                  <td className="px-5 py-4">
                    {category?.isActive ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-emerald-600 rounded-lg bg-emerald-50">
                        <FaCheckCircle className="text-[10px]" />
                        نشط
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-red-500 rounded-lg bg-red-50">
                        <FaTimesCircle className="text-[10px]" />
                        غير نشط
                      </span>
                    )}
                  </td>

                  {/* Date */}
                  <td className="px-5 py-4">
                    <span className="text-sm text-slate-500">
                      {formatDate(category?.createdAt)}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedCategory(category);
                          setOpenUpdateCategory(true);
                        }}
                        className="flex items-center justify-center text-blue-600 transition-colors rounded-lg w-9 h-9 bg-blue-50 hover:bg-blue-100"
                        title="تعديل"
                      >
                        <FaEdit className="text-xs" />
                      </button>

                      <button
                        type="button"
                        onClick={()=>{
                          setSelectedCategory(category)
                          setOpenDeleteCategory(true)
                        }}
                        className="flex items-center justify-center text-red-500 transition-colors rounded-lg w-9 h-9 bg-red-50 hover:bg-red-100"
                        title="حذف"
                      >
                        <FaTrash className="text-xs" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="px-5 text-center py-14"
                >
                  <div className="flex flex-col items-center justify-center">
                    <div className="flex items-center justify-center mb-4 w-14 h-14 rounded-2xl bg-slate-100 text-slate-400">
                      <FaFolderOpen className="text-xl" />
                    </div>

                    <h3 className="text-sm font-bold text-slate-700">
                      لا توجد تصنيفات
                    </h3>

                    <p className="mt-1 text-xs text-slate-400">
                      {search
                        ? "لم يتم العثور على نتائج مطابقة للبحث"
                        : "لم تتم إضافة أي تصنيفات للملفات حتى الآن"}
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer / Pagination */}
      {filteredCategories.length > 0 && (
        <div className="flex flex-col gap-3 px-5 py-4 border-t border-slate-100 sm:flex-row sm:items-center sm:justify-between">
          
          <p className="text-xs text-slate-400">
            عرض{" "}
            <span className="font-semibold text-slate-600">
              {filteredCategories.length === 0
                ? 0
                : (currentPage - 1) * itemsPerPage + 1}
            </span>{" "}
            إلى{" "}
            <span className="font-semibold text-slate-600">
              {Math.min(
                currentPage * itemsPerPage,
                filteredCategories.length
              )}
            </span>{" "}
            من{" "}
            <span className="font-semibold text-slate-600">
              {filteredCategories.length}
            </span>{" "}
            تصنيف
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage((prev) => prev - 1)
              }
              className="flex items-center justify-center text-sm transition-colors border rounded-lg w-9 h-9 border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <FaChevronRight />
            </button>

            <div className="flex items-center justify-center px-3 text-xs font-semibold text-white bg-blue-600 rounded-lg min-w-9 h-9">
              {currentPage}
            </div>

            <button
              type="button"
              disabled={
                totalPages === 0 || currentPage === totalPages
              }
              onClick={() =>
                setCurrentPage((prev) => prev + 1)
              }
              className="flex items-center justify-center text-sm transition-colors border rounded-lg w-9 h-9 border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <FaChevronLeft />
            </button>
          </div>
        </div>
      )}
    </div>
  </>
};

export default Table;