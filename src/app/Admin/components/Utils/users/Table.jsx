"use client";

import React, { useContext, useEffect, useMemo, useState } from "react";

import {
  FiEye,
  FiEdit2,
  FiTrash2,
  FiMail,
  FiPhone,
  FiCalendar,
  FiSearch,
  FiUserPlus,
  FiGrid,
  FiList,
  FiChevronRight,
  FiChevronLeft,
  FiChevronsRight,
  FiChevronsLeft,
  FiClock,
  FiBriefcase,
  FiShield,
} from "react-icons/fi";

import { AdminContext } from "../../../../../Providers/AdminContext/Admin.js";
import UpdateUser from "./UpdateUser.jsx";
import DeleteModel from "./DeleteModel.jsx";
import UserDetails from "./UserDetails.jsx";

/* =========================================================
   Roles
========================================================= */

const ROLE_MAP = {
  admin: {
    label: "مدير النظام",
    icon: FiShield,
    badge: "bg-purple-50 text-purple-700 border border-purple-100",
    dot: "bg-purple-500",
    gradient: "from-purple-500 to-indigo-500",
  },

  office_owner: {
    label: "صاحب مكتب",
    icon: FiBriefcase,
    badge: "bg-blue-50 text-blue-700 border border-blue-100",
    dot: "bg-blue-500",
    gradient: "from-blue-500 to-indigo-500",
  },

  lawyer: {
    label: "محامي",
    icon: FiBriefcase,
    badge: "bg-emerald-50 text-emerald-700 border border-emerald-100",
    dot: "bg-emerald-500",
    gradient: "from-emerald-500 to-teal-500",
  },
};

/* =========================================================
   Helpers
========================================================= */

const getRole = (role) => {
  return (
    ROLE_MAP[role] || {
      label: role || "غير محدد",
      icon: FiBriefcase,
      badge: "bg-slate-50 text-slate-600 border border-slate-100",
      dot: "bg-slate-400",
      gradient: "from-slate-400 to-slate-500",
    }
  );
};

const formatDate = (date) => {
  if (!date) return "-";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "-";
  }

  return parsedDate.toLocaleDateString("ar-EG", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const formatRelative = (date) => {
  if (!date) return "لم يسجل دخول";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "لم يسجل دخول";
  }

  const now = new Date();
  const diff = now - parsedDate;

  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (minutes < 1) {
    return "منذ لحظات";
  }

  if (minutes < 60) {
    return `منذ ${minutes} دقيقة`;
  }

  if (hours < 24) {
    return `منذ ${hours} ساعة`;
  }

  if (days === 1) {
    return "أمس";
  }

  if (days < 7) {
    return `منذ ${days} أيام`;
  }

  return formatDate(date);
};

/* =========================================================
   Main Component
========================================================= */

const Table = ({ onView, onEdit }) => {
  const {
    users = [],
    setOpenAddUser,
    openUpdateUser,
    setOpenUpdateUser,
    openDeleteUser,
    setOpenDeleteUser,
  } = useContext(AdminContext);

  /* =========================================================
     States
  ========================================================= */

  const [query, setQuery] = useState("");
  const [view, setView] = useState("table");

  const [currentPage, setCurrentPage] = useState(1);
  const [openDetails, setOpenDetails] = useState(false);
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [user, setUser] = useState(null);
  const ITEMS_PER_PAGE = view === "cards" ? 8 : 6;

  /* =========================================================
     Filtering
  ========================================================= */

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return users.filter((user) => {
      const matchQuery =
        !q ||
        [user?.name, user?.email, user?.phone, user?.role]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(q));

      const matchRole = roleFilter === "all" || user?.role === roleFilter;

      const matchStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && user?.isActive) ||
        (statusFilter === "inactive" && !user?.isActive);

      return matchQuery && matchRole && matchStatus;
    });
  }, [users, query, roleFilter, statusFilter]);

  /* =========================================================
     Reset pagination
  ========================================================= */

  useEffect(() => {
    setCurrentPage(1);
  }, [query, roleFilter, statusFilter, view]);

  /* =========================================================
     Pagination
  ========================================================= */

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;

    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, currentPage, ITEMS_PER_PAGE]);

  /* =========================================================
     Pagination Component
  ========================================================= */

  const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
    totalItems,
    itemsPerPage,
  }) => {
    if (totalPages <= 1) {
      return null;
    }

    const start = (currentPage - 1) * itemsPerPage + 1;

    const end = Math.min(currentPage * itemsPerPage, totalItems);

    const getPages = () => {
      const pages = [];

      if (totalPages <= 7) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }

        return pages;
      }

      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      const startPage = Math.max(2, currentPage - 1);

      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      pages.push(totalPages);

      return pages;
    };

    return (
      <div className="flex flex-col gap-4 px-5 py-4 border-t border-slate-100 sm:flex-row sm:items-center sm:justify-between">
        {/* Info */}

        <div className="text-xs text-slate-500">
          عرض <span className="font-semibold text-slate-700">{start}</span> إلى{" "}
          <span className="font-semibold text-slate-700">{end}</span> من أصل{" "}
          <span className="font-semibold text-slate-700">{totalItems}</span>{" "}
          مستخدم
        </div>

        {/* Controls */}

        <div className="flex items-center gap-1">
          {/* First */}

          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => onPageChange(1)}
            className="flex items-center justify-center w-8 h-8 transition rounded-lg text-slate-500 hover:bg-slate-100 disabled:pointer-events-none disabled:opacity-30"
            title="الصفحة الأولى"
          >
            <FiChevronsRight size={15} />
          </button>

          {/* Previous */}

          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
            className="flex items-center justify-center w-8 h-8 transition rounded-lg text-slate-500 hover:bg-slate-100 disabled:pointer-events-none disabled:opacity-30"
            title="السابق"
          >
            <FiChevronRight size={15} />
          </button>

          {/* Pages */}

          <div className="flex items-center gap-1">
            {getPages().map((page, index) => {
              if (page === "...") {
                return (
                  <span
                    key={`dots-${index}`}
                    className="flex items-center justify-center w-8 h-8 text-xs text-slate-400"
                  >
                    ...
                  </span>
                );
              }

              return (
                <button
                  key={page}
                  type="button"
                  onClick={() => onPageChange(page)}
                  className={`flex h-8 min-w-8 items-center justify-center rounded-lg px-2 text-xs font-semibold transition ${
                    currentPage === page
                      ? "bg-blue-600 text-white shadow-sm shadow-blue-600/20"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {page}
                </button>
              );
            })}
          </div>

          {/* Next */}

          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            className="flex items-center justify-center w-8 h-8 transition rounded-lg text-slate-500 hover:bg-slate-100 disabled:pointer-events-none disabled:opacity-30"
            title="التالي"
          >
            <FiChevronLeft size={15} />
          </button>

          {/* Last */}

          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(totalPages)}
            className="flex items-center justify-center w-8 h-8 transition rounded-lg text-slate-500 hover:bg-slate-100 disabled:pointer-events-none disabled:opacity-30"
            title="الصفحة الأخيرة"
          >
            <FiChevronsLeft size={15} />
          </button>
        </div>
      </div>
    );
  };

  /* =========================================================
     Render
  ========================================================= */

  return (
    <>
      {openUpdateUser && <UpdateUser user={user} />}
      {openDeleteUser && <DeleteModel user={user} />}
      {openDetails && (
        <UserDetails
          user={user}
          openDetails={openDetails}
          setOpenDetails={setOpenDetails}
        />
      )}
      <section className="overflow-hidden bg-white border shadow-sm rounded-2xl border-slate-200">
        {/* =====================================================
          Header
      ===================================================== */}

        <div className="px-5 py-5 border-b border-slate-100">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            {/* Title */}

            <div>
              <h2 className="text-lg font-bold text-slate-800">المستخدمون</h2>

              <p className="mt-1 text-xs text-slate-400">
                إدارة جميع المستخدمين والصلاحيات
              </p>
            </div>

            {/* Actions */}

            <div className="flex flex-wrap items-center gap-2">
              {/* View Toggle */}

              <div className="flex items-center p-1 border bg-slate-50 border-slate-200 rounded-xl">
                <button
                  type="button"
                  onClick={() => setView("table")}
                  className={`flex items-center justify-center w-9 h-9 rounded-lg transition ${
                    view === "table"
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-slate-400 hover:text-slate-600"
                  }`}
                  title="عرض الجدول"
                >
                  <FiList size={17} />
                </button>

                <button
                  type="button"
                  onClick={() => setView("cards")}
                  className={`flex items-center justify-center w-9 h-9 rounded-lg transition ${
                    view === "cards"
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-slate-400 hover:text-slate-600"
                  }`}
                  title="عرض البطاقات"
                >
                  <FiGrid size={17} />
                </button>
              </div>

              {/* Add User */}

              <button
                type="button"
                onClick={() => setOpenAddUser?.(true)}
                className="inline-flex items-center justify-center h-10 gap-2 px-4 text-xs font-bold text-white transition bg-blue-600 shadow-sm rounded-xl hover:bg-blue-700 active:scale-[0.98] shadow-blue-600/20"
              >
                <FiUserPlus size={16} />

                <span>إضافة مستخدم</span>
              </button>
            </div>
          </div>

          {/* =================================================
            Filters
        ================================================= */}

          <div className="flex flex-col gap-3 mt-5 lg:flex-row">
            {/* Search */}

            <div className="relative flex-1">
              <FiSearch
                size={17}
                className="absolute -translate-y-1/2 right-3 top-1/2 text-slate-400"
              />

              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="ابحث بالاسم أو البريد أو رقم الهاتف..."
                className="w-full h-10 pl-4 pr-10 text-xs transition border outline-none rounded-xl border-slate-200 bg-slate-50/50 text-slate-700 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            {/* Role Filter */}

            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="h-10 px-3 text-xs bg-white border outline-none min-w-40 rounded-xl border-slate-200 text-slate-600 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            >
              <option value="all">كل الصلاحيات</option>

              <option value="admin">مدير النظام</option>

              <option value="office_owner">صاحب مكتب</option>

              <option value="lawyer">محامي</option>
            </select>

            {/* Status Filter */}

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-10 px-3 text-xs bg-white border outline-none min-w-36 rounded-xl border-slate-200 text-slate-600 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            >
              <option value="all">كل الحالات</option>

              <option value="active">نشط</option>

              <option value="inactive">غير نشط</option>
            </select>
          </div>
        </div>

        {/* =====================================================
          Results
      ===================================================== */}

        {paginated.length > 0 ? (
          <>
            {/* =================================================
              TABLE VIEW
          ================================================= */}

            {view === "table" ? (
              <div className="overflow-x-auto">
                <table className="w-full text-right">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/80">
                      <th className="px-5 py-3.5 text-[11px] font-semibold tracking-wide text-slate-500">
                        المستخدم
                      </th>

                      <th className="px-5 py-3.5 text-[11px] font-semibold tracking-wide text-slate-500">
                        رقم الهاتف
                      </th>

                      <th className="px-5 py-3.5 text-[11px] font-semibold tracking-wide text-slate-500">
                        الصلاحية
                      </th>

                      <th className="px-5 py-3.5 text-[11px] font-semibold tracking-wide text-slate-500">
                        الحالة
                      </th>

                      <th className="px-5 py-3.5 text-[11px] font-semibold tracking-wide text-slate-500">
                        آخر دخول
                      </th>

                      <th className="px-5 py-3.5 text-[11px] font-semibold tracking-wide text-center text-slate-500">
                        الإجراءات
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {paginated.map((user) => {
                      const role = getRole(user?.role);

                      const RoleIcon = role.icon;

                      return (
                        <tr
                          key={user?._id || user?.id}
                          className="transition-colors group hover:bg-slate-50/70"
                        >
                          {/* User */}

                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              {/* Avatar */}

                              <div className="relative flex items-center justify-center overflow-hidden w-11 h-11 rounded-xl shrink-0 bg-gradient-to-br from-blue-50 to-indigo-100">
                                {user?.profileImage?.url ? (
                                  <img
                                    src={user?.profileImage?.url}
                                    alt={user?.name || "User"}
                                    className="object-cover w-full h-full"
                                  />
                                ) : (
                                  <span className="text-sm font-bold text-blue-600">
                                    {(user?.name || "م")
                                      .trim()
                                      .charAt(0)
                                      .toUpperCase()}
                                  </span>
                                )}

                                {/* Active Dot */}

                                <span
                                  className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full ${
                                    user?.isActive
                                      ? "bg-emerald-500"
                                      : "bg-slate-300"
                                  }`}
                                />
                              </div>

                              {/* Info */}

                              <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                  <p className="font-semibold truncate text-slate-800">
                                    {user?.name || "بدون اسم"}
                                  </p>

                                  {user?.role === "admin" && (
                                    <span className="inline-flex items-center rounded-md bg-purple-100 px-1.5 py-0.5 text-[9px] font-bold text-purple-700">
                                      ADMIN
                                    </span>
                                  )}
                                </div>

                                <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-400">
                                  <FiMail size={12} className="shrink-0" />

                                  <span className="max-w-[220px] truncate">
                                    {user?.email || "-"}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Phone */}

                          <td className="px-5 py-4">
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                              <FiPhone size={14} className="text-slate-400" />

                              <span dir="ltr" className="font-medium">
                                {user?.phone || "-"}
                              </span>
                            </div>
                          </td>

                          {/* Role */}

                          <td className="px-5 py-4">
                            <span
                              className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-semibold ${role.badge}`}
                            >
                              <RoleIcon size={13} />

                              {role.label}
                            </span>
                          </td>

                          {/* Status */}

                          <td className="px-5 py-4">
                            {user?.isActive ? (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-semibold rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-100">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                نشط
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-semibold rounded-lg bg-slate-50 text-slate-500 border border-slate-100">
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                                غير نشط
                              </span>
                            )}
                          </td>

                          {/* Last Login */}

                          <td className="px-5 py-4">
                            <div className="flex items-center gap-2 text-xs text-slate-500">
                              <FiCalendar
                                size={13}
                                className="text-slate-400"
                              />

                              <span>{formatRelative(user?.lastLogin)}</span>
                            </div>

                            <p className="mt-0.5 pr-5 text-[10px] text-slate-400">
                              مسجل في {formatDate(user?.createdAt)}
                            </p>
                          </td>

                          {/* Actions */}

                          <td className="px-5 py-4">
                            <div className="flex items-center justify-center gap-1">
                              {/* View */}

                              <button
                                type="button"
                                onClick={() => {
                                  setUser(user);
                                  setOpenDetails(true);
                                }}
                                className="flex items-center justify-center w-8 h-8 transition rounded-lg text-slate-400 hover:bg-blue-50 hover:text-blue-600 active:scale-95"
                                title="عرض الملف"
                              >
                                <FiEye size={16} />
                              </button>

                              {/* Edit */}

                              <button
                                type="button"
                                onClick={() => {
                                  setUser(user);
                                  setOpenUpdateUser(true);
                                }}
                                className="flex items-center justify-center w-8 h-8 transition rounded-lg text-slate-400 hover:bg-amber-50 hover:text-amber-600 active:scale-95"
                                title="تعديل"
                              >
                                <FiEdit2 size={16} />
                              </button>

                              {/* Delete */}

                              <button
                                type="button"
                                onClick={() => {
                                  setUser(user);
                                  setOpenDeleteUser(true);
                                }}
                                className="flex items-center justify-center w-8 h-8 transition rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600 active:scale-95"
                                title="حذف"
                              >
                                <FiTrash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              /* =================================================
               CARDS VIEW
            ================================================= */

              <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 xl:grid-cols-3">
                {paginated.map((user) => {
                  const role = getRole(user?.role);

                  const RoleIcon = role.icon;

                  return (
                    <div
                      key={user?._id || user?.id}
                      className="relative overflow-hidden transition duration-300 bg-white border rounded-2xl group border-slate-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-900/5"
                    >
                      {/* Top Gradient */}

                      <div
                        className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-l ${role.gradient}`}
                      />

                      <div className="p-5">
                        {/* Header */}

                        <div className="flex items-start gap-3">
                          {/* Avatar */}

                          <div className="relative flex items-center justify-center w-12 h-12 overflow-hidden rounded-xl shrink-0 bg-gradient-to-br from-blue-50 to-indigo-100">
                            {user?.profileImage?.url ? (
                              <img
                                src={user?.profileImage?.url}
                                alt={user?.name || "User"}
                                className="object-cover w-full h-full"
                              />
                            ) : (
                              <span className="text-base font-bold text-blue-600">
                                {(user?.name || "م")
                                  .trim()
                                  .charAt(0)
                                  .toUpperCase()}
                              </span>
                            )}

                            <span
                              className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full ${
                                user?.isActive
                                  ? "bg-emerald-500"
                                  : "bg-slate-300"
                              }`}
                            />
                          </div>

                          {/* User Info */}

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h3 className="font-bold truncate text-slate-800">
                                {user?.name || "بدون اسم"}
                              </h3>

                              {user?.role === "admin" && (
                                <span className="rounded-md bg-purple-100 px-1.5 py-0.5 text-[9px] font-bold text-purple-700">
                                  ADMIN
                                </span>
                              )}
                            </div>

                            <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-400">
                              <FiMail size={12} />

                              <span className="truncate">
                                {user?.email || "-"}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Details */}

                        <div className="pt-4 mt-4 space-y-3 border-t border-slate-100">
                          {/* Phone */}

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-xs text-slate-500">
                              <FiPhone size={13} className="text-slate-400" />

                              <span
                                dir="ltr"
                                className="font-medium text-slate-700"
                              >
                                {user?.phone || "-"}
                              </span>
                            </div>
                          </div>

                          {/* Role + Status */}

                          <div className="flex items-center justify-between gap-3">
                            <span
                              className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-semibold ${role.badge}`}
                            >
                              <RoleIcon size={13} />

                              {role.label}
                            </span>

                            {user?.isActive ? (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-semibold rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-100">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                نشط
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-semibold rounded-lg bg-slate-50 text-slate-500 border border-slate-100">
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                                غير نشط
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Meta */}

                        <div className="flex items-center justify-between pt-3 mt-4 border-t border-slate-100">
                          <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                            <FiClock size={11} />

                            <span>{formatRelative(user?.lastLogin)}</span>
                          </div>

                          <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                            <FiCalendar size={11} />

                            <span>{formatDate(user?.createdAt)}</span>
                          </div>
                        </div>

                        {/* Actions */}

                        <div className="flex items-center gap-2 pt-4 mt-4 border-t border-slate-100">
                          {/* View */}

                          <button
                            type="button"
                            onClick={() => {
                              setUser(user);
                              setOpenDetails(true);
                            }}
                            className="flex items-center justify-center flex-1 gap-2 text-xs font-semibold text-blue-600 transition rounded-lg h-9 bg-blue-50 hover:bg-blue-100"
                          >
                            <FiEye size={14} />
                            عرض
                          </button>

                          {/* Edit */}

                          <button
                            type="button"
                            onClick={() => {
                              setUser(user);
                              setOpenUpdateUser(true);
                            }}
                            className="flex items-center justify-center flex-1 gap-2 text-xs font-semibold transition rounded-lg h-9 bg-amber-50 text-amber-600 hover:bg-amber-100"
                          >
                            <FiEdit2 size={14} />
                            تعديل
                          </button>

                          {/* Delete */}

                          <button
                            type="button"
                            onClick={() => {
                              setUser(user);
                              setOpenDeleteUser(true);
                            }}
                            className="flex items-center justify-center text-red-500 transition rounded-lg w-9 h-9 bg-red-50 hover:bg-red-100"
                            title="حذف"
                          >
                            <FiTrash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        ) : (
          /* =====================================================
           Empty State
        ===================================================== */

          <div className="flex flex-col items-center justify-center px-5 py-20 text-center">
            <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-2xl bg-slate-50 text-slate-300">
              <FiSearch size={28} />
            </div>

            <h3 className="text-sm font-bold text-slate-700">لا توجد نتائج</h3>

            <p className="max-w-sm mt-2 text-xs leading-6 text-slate-400">
              لم يتم العثور على مستخدمين مطابقين لخيارات البحث والتصفية الحالية.
            </p>

            {(query || roleFilter !== "all" || statusFilter !== "all") && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setRoleFilter("all");
                  setStatusFilter("all");
                }}
                className="px-4 py-2 mt-5 text-xs font-semibold text-blue-600 transition rounded-lg bg-blue-50 hover:bg-blue-100"
              >
                إعادة ضبط الفلاتر
              </button>
            )}
          </div>
        )}

        {/* =====================================================
          Pagination
      ===================================================== */}

        {filtered.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={filtered.length}
            itemsPerPage={ITEMS_PER_PAGE}
          />
        )}
      </section>
    </>
  );
};

export default Table;
