"use client";

import React, { useContext, useMemo, useState } from "react";
import {
  Bell,
  BellRing,
  CalendarCheck2,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  FileText,
  Search,
  Trash2,
  UserRound,
  X,
} from "lucide-react";
import { OwnerContext } from "../../../../../Providers/LawyerOwner/OwnerProvider.js";

const NotificationsList = () => {
  const {
    handleReadNoteFun,
    handleReadNotificationFun,
    unreadNotifications,
    notifications = [],
  } = useContext(OwnerContext);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("الكل");
  const [typeFilter, setTypeFilter] = useState("الكل");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  const getNotificationType = (notification) => {
    const type = notification?.type;

    if (
      type === "upcoming_session" ||
      type?.includes("session")
    ) {
      return "الجلسات";
    }

    if (
      type === "case_update" ||
      type === "case_status" ||
      type?.includes("case")
    ) {
      return "القضايا";
    }

    if (
      type === "document_added" ||
      type === "document_updated" ||
      type?.includes("document")
    ) {
      return "المستندات";
    }

    if (
      type === "client_added" ||
      type === "client_updated" ||
      type?.includes("client")
    ) {
      return "العملاء";
    }

    return "النظام";
  };

  const getNotificationIcon = (notification) => {
    const type = notification?.type;

    if (
      type === "upcoming_session" ||
      type?.includes("session")
    ) {
      return {
        icon: CalendarCheck2,
        iconBg: "bg-[#EAF0FF]",
        iconColor: "text-[#4868B4]",
      };
    }

    if (
      type === "document_added" ||
      type === "document_updated" ||
      type?.includes("document")
    ) {
      return {
        icon: FileText,
        iconBg: "bg-[#F2ECFF]",
        iconColor: "text-[#7551A8]",
      };
    }

    if (
      type === "case_update" ||
      type === "case_status" ||
      type?.includes("case")
    ) {
      return {
        icon: BellRing,
        iconBg: "bg-[#EAF7F0]",
        iconColor: "text-[#25804D]",
      };
    }

    if (
      type === "client_added" ||
      type === "client_updated" ||
      type?.includes("client")
    ) {
      return {
        icon: UserRound,
        iconBg: "bg-[#EAF7F0]",
        iconColor: "text-[#25804D]",
      };
    }

    return {
      icon: Bell,
      iconBg: "bg-[#F2ECFF]",
      iconColor: "text-[#7551A8]",
    };
  };

  const getRelativeTime = (date) => {
    if (!date) return "";

    const createdDate = new Date(date);
    const now = new Date();

    const diffInSeconds = Math.floor(
      (now - createdDate) / 1000
    );

    if (diffInSeconds < 60) {
      return "منذ أقل من دقيقة";
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);

    if (diffInMinutes < 60) {
      return `منذ ${diffInMinutes} دقيقة`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);

    if (diffInHours < 24) {
      return `منذ ${diffInHours} ساعة`;
    }

    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInDays === 1) {
      return "أمس";
    }

    if (diffInDays < 7) {
      return `منذ ${diffInDays} أيام`;
    }

    return createdDate.toLocaleDateString("ar-EG");
  };

  const filteredNotifications = useMemo(() => {
    return notifications.filter((notification) => {
      const title = notification?.title || "";
      const message = notification?.message || "";
      const type = getNotificationType(notification);

      const searchValue = search.trim().toLowerCase();

      const matchesSearch =
        !searchValue ||
        title.toLowerCase().includes(searchValue) ||
        message.toLowerCase().includes(searchValue);

      const notificationStatus = notification?.isRead
        ? "مقروءة"
        : "غير مقروءة";

      const matchesStatus =
        statusFilter === "الكل" ||
        notificationStatus === statusFilter;

      const matchesType =
        typeFilter === "الكل" ||
        type === typeFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesType
      );
    });
  }, [
    notifications,
    search,
    statusFilter,
    typeFilter,
  ]);

  const totalPages = Math.ceil(
    filteredNotifications.length / itemsPerPage
  );

  const paginatedNotifications = useMemo(() => {
    const startIndex =
      (currentPage - 1) * itemsPerPage;

    return filteredNotifications.slice(
      startIndex,
      startIndex + itemsPerPage
    );
  }, [filteredNotifications, currentPage]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1);
  };

  const handleTypeChange = (e) => {
    setTypeFilter(e.target.value);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("الكل");
    setTypeFilter("الكل");
    setCurrentPage(1);
  };

  const handleRead = (notification) => {
    if (notification?.isRead) return;

    if (handleReadNotificationFun) {
      handleReadNotificationFun(notification._id);
      return;
    }

    if (handleReadNoteFun) {
      handleReadNoteFun(notification._id);
    }
  };

  return (
    <section dir="rtl" className="mb-7">
      <div className="overflow-hidden rounded-xl border border-[#E6E8EC] bg-white shadow-[0_2px_8px_rgba(11,28,48,0.03)]">

        {/* Header */}
        <div className="border-b border-[#EEF0F3] p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            <div>
              <h2 className="text-[15px] font-bold text-[#0B1C30]">
                قائمة الإشعارات
              </h2>

              <p className="mt-1 text-[11px] text-[#8A9099]">
                جميع التنبيهات والإشعارات الخاصة بالمكتب
              </p>
            </div>

            <div className="text-[11px] font-semibold text-[#59616D]">
              {filteredNotifications.length} إشعار
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 gap-3 mt-5 md:grid-cols-3">

            {/* Search */}
            <div className="relative">
              <Search
                size={15}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A9099]"
              />

              <input
                type="text"
                value={search}
                onChange={handleSearchChange}
                placeholder="البحث في الإشعارات..."
                className="
                  h-10 w-full rounded-lg
                  border border-[#E1E4E9]
                  bg-[#FAFBFC]
                  pr-9 pl-3
                  text-[11px] text-[#45464D]
                  outline-none
                  transition
                  placeholder:text-[#A0A5AD]
                  focus:border-[#AAB9D4]
                  focus:bg-white
                "
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={handleStatusChange}
              className="
                h-10 rounded-lg
                border border-[#E1E4E9]
                bg-[#FAFBFC]
                px-3
                text-[11px] font-semibold
                text-[#45464D]
                outline-none
                focus:border-[#AAB9D4]
              "
            >
              <option value="الكل">كل الحالات</option>
              <option value="غير مقروءة">غير مقروءة</option>
              <option value="مقروءة">مقروءة</option>
            </select>

            {/* Type Filter */}
            <select
              value={typeFilter}
              onChange={handleTypeChange}
              className="
                h-10 rounded-lg
                border border-[#E1E4E9]
                bg-[#FAFBFC]
                px-3
                text-[11px] font-semibold
                text-[#45464D]
                outline-none
                focus:border-[#AAB9D4]
              "
            >
              <option value="الكل">كل الأنواع</option>
              <option value="الجلسات">الجلسات</option>
              <option value="القضايا">القضايا</option>
              <option value="المستندات">المستندات</option>
              <option value="العملاء">العملاء</option>
              <option value="النظام">النظام</option>
            </select>
          </div>

          {/* Clear Filters */}
          {(search ||
            statusFilter !== "الكل" ||
            typeFilter !== "الكل") && (
            <button
              onClick={clearFilters}
              className="
                mt-3 flex items-center gap-1.5
                text-[10px] font-bold
                text-[#6B7280]
                transition hover:text-[#0B1C30]
              "
            >
              <X size={13} />
              مسح الفلاتر
            </button>
          )}
        </div>

        {/* Notifications */}
        <div className="divide-y divide-[#EEF0F3]">

          {paginatedNotifications.length > 0 ? (
            paginatedNotifications.map((notification) => {
              const {
                icon: Icon,
                iconBg,
                iconColor,
              } = getNotificationIcon(notification);

              const isUnread = !notification?.isRead;

              return (
                <div
                  key={notification._id}
                  className={`
                    group flex flex-col gap-4 p-5
                    transition
                    hover:bg-[#FAFBFC]
                    sm:flex-row sm:items-start
                    ${
                      isUnread
                        ? "bg-[#FBFCFF]"
                        : "bg-white"
                    }
                  `}
                >
                  {/* Icon */}
                  <div
                    className={`
                      flex h-10 w-10 shrink-0
                      items-center justify-center
                      rounded-lg
                      ${iconBg}
                    `}
                  >
                    <Icon
                      size={18}
                      className={iconColor}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">

                    <div className="flex flex-wrap items-center gap-2">

                      <h3
                        className={`
                          text-[12px]
                          ${
                            isUnread
                              ? "font-bold text-[#0B1C30]"
                              : "font-semibold text-[#45464D]"
                          }
                        `}
                      >
                        {notification?.title}
                      </h3>

                      {isUnread && (
                        <span className="h-1.5 w-1.5 rounded-full bg-[#4868B4]" />
                      )}

                      <span className="rounded-full bg-[#F3F4F6] px-2 py-0.5 text-[9px] font-semibold text-[#737984]">
                        {getNotificationType(notification)}
                      </span>
                    </div>

                    <p className="mt-1.5 max-w-3xl text-[11px] leading-5 text-[#737984]">
                      {notification?.message}
                    </p>

                    <div className="mt-2 text-[10px] font-medium text-[#A0A5AD]">
                      {getRelativeTime(notification?.createdAt)}
                    </div>
                  </div>

                  {/* Actions */}
                  <div
                    className="flex items-center gap-1 opacity-100 shrink-0 sm:opacity-0 sm:transition sm:group-hover:opacity-100"
                  >
                    {isUnread && (
                      <button
                        onClick={() =>
                          handleRead(notification)
                        }
                        title="تحديد كمقروء"
                        className="
                          flex h-8 w-8 items-center justify-center
                          rounded-lg
                          text-[#59616D]
                          transition
                          hover:bg-[#EAF7F0]
                          hover:text-[#25804D]
                        "
                      >
                        <Check size={15} />
                      </button>
                    )}

                    
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex flex-col items-center justify-center px-5 py-16 text-center">

              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F4F6F8]">
                <Bell size={24} className="text-[#9AA1AA]" />
              </div>

              <h3 className="mt-4 text-[13px] font-bold text-[#45464D]">
                لا توجد إشعارات
              </h3>

              <p className="mt-1 text-[10px] text-[#9AA1AA]">
                لم نجد إشعارات مطابقة للفلاتر المحددة.
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredNotifications.length > 0 && (
          <div className="flex items-center justify-between border-t border-[#EEF0F3] px-5 py-4">

            <p className="text-[10px] font-medium text-[#8A9099]">
              عرض{" "}
              {((currentPage - 1) * itemsPerPage) + 1}
              {" - "}
              {Math.min(
                currentPage * itemsPerPage,
                filteredNotifications.length
              )}
              {" من "}
              {filteredNotifications.length}
            </p>

            <div className="flex items-center gap-1">

              <button
                disabled={currentPage === 1}
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.max(prev - 1, 1)
                  )
                }
                className="
                  flex h-8 w-8 items-center justify-center
                  rounded-lg border border-[#E1E4E9]
                  text-[#737984]
                  transition
                  hover:bg-[#F7F8FA]
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                "
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
                  className={`
                    flex h-8 min-w-8 items-center justify-center
                    rounded-lg
                    px-2
                    text-[10px] font-semibold
                    transition
                    ${
                      currentPage === page
                        ? "bg-[#0B1C30] font-bold text-white"
                        : "border border-[#E1E4E9] text-[#59616D] hover:bg-[#F7F8FA]"
                    }
                  `}
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
                className="
                  flex h-8 w-8 items-center justify-center
                  rounded-lg border border-[#E1E4E9]
                  text-[#737984]
                  transition
                  hover:bg-[#F7F8FA]
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                "
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

export default NotificationsList;