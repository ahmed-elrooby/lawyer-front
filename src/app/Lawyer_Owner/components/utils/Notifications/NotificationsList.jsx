"use client";
import React, { useMemo, useState } from "react";
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

const NotificationsList = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("الكل");
  const [typeFilter, setTypeFilter] = useState("الكل");

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "جلسة قريبة",
      description:
        "جلسة قضية شركة النور التجارية ستبدأ بعد 30 دقيقة.",
      time: "منذ 10 دقائق",
      type: "الجلسات",
      status: "غير مقروءة",
      icon: CalendarCheck2,
      iconBg: "bg-[#EAF0FF]",
      iconColor: "text-[#4868B4]",
    },
    {
      id: 2,
      title: "تم إضافة مستند جديد",
      description:
        "تمت إضافة مستند جديد إلى قضية أحمد محمود عبد الله.",
      time: "منذ ساعة",
      type: "المستندات",
      status: "غير مقروءة",
      icon: FileText,
      iconBg: "bg-[#F2ECFF]",
      iconColor: "text-[#7551A8]",
    },
    {
      id: 3,
      title: "تحديث حالة القضية",
      description:
        'تم تغيير حالة القضية "شركة الأمل" إلى قيد المراجعة.',
      time: "منذ ساعتين",
      type: "القضايا",
      status: "غير مقروءة",
      icon: BellRing,
      iconBg: "bg-[#EAF7F0]",
      iconColor: "text-[#25804D]",
    },
    {
      id: 4,
      title: "جلسة تم تأجيلها",
      description:
        "تم تأجيل جلسة القضية رقم #1048 إلى موعد جديد.",
      time: "منذ 3 ساعات",
      type: "الجلسات",
      status: "غير مقروءة",
      icon: CalendarCheck2,
      iconBg: "bg-[#FFF4D6]",
      iconColor: "text-[#8A6A00]",
    },
    {
      id: 5,
      title: "إضافة عميل جديد",
      description:
        "تم تسجيل العميل محمد أحمد حسن في النظام.",
      time: "منذ 5 ساعات",
      type: "العملاء",
      status: "مقروءة",
      icon: UserRound,
      iconBg: "bg-[#EAF7F0]",
      iconColor: "text-[#25804D]",
    },
    {
      id: 6,
      title: "تم تحديث بيانات القضية",
      description:
        "تم تعديل بيانات قضية مؤسسة المستقبل بواسطة أحمد محمد.",
      time: "أمس",
      type: "القضايا",
      status: "مقروءة",
      icon: FileText,
      iconBg: "bg-[#EAF0FF]",
      iconColor: "text-[#4868B4]",
    },
    {
      id: 7,
      title: "تذكير بمراجعة المستندات",
      description:
        "يوجد 4 مستندات تحتاج إلى مراجعة قبل موعد الجلسة القادمة.",
      time: "أمس",
      type: "المستندات",
      status: "مقروءة",
      icon: CircleAlert,
      iconBg: "bg-[#FFF4D6]",
      iconColor: "text-[#8A6A00]",
    },
    {
      id: 8,
      title: "تحديث النظام",
      description:
        "تم تحديث إعدادات النظام بنجاح.",
      time: "منذ يومين",
      type: "النظام",
      status: "مقروءة",
      icon: Bell,
      iconBg: "bg-[#F2ECFF]",
      iconColor: "text-[#7551A8]",
    },
  ]);

  const filteredNotifications = useMemo(() => {
    return notifications.filter((notification) => {
      const matchesSearch =
        notification.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        notification.description
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "الكل" ||
        notification.status === statusFilter;

      const matchesType =
        typeFilter === "الكل" ||
        notification.type === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [notifications, search, statusFilter, typeFilter]);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, status: "مقروءة" }
          : notification
      )
    );
  };

  const deleteNotification = (id) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("الكل");
    setTypeFilter("الكل");
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
                onChange={(e) => setSearch(e.target.value)}
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
              onChange={(e) => setStatusFilter(e.target.value)}
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
              onChange={(e) => setTypeFilter(e.target.value)}
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

          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => {
              const Icon = notification.icon;

              const isUnread =
                notification.status === "غير مقروءة";

              return (
                <div
                  key={notification.id}
                  className={`
                    group flex flex-col gap-4 p-5
                    transition
                    hover:bg-[#FAFBFC]
                    sm:flex-row sm:items-start
                    ${isUnread ? "bg-[#FBFCFF]" : "bg-white"}
                  `}
                >
                  {/* Icon */}
                  <div
                    className={`
                      flex h-10 w-10 shrink-0
                      items-center justify-center
                      rounded-lg
                      ${notification.iconBg}
                    `}
                  >
                    <Icon
                      size={18}
                      className={notification.iconColor}
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
                        {notification.title}
                      </h3>

                      {isUnread && (
                        <span className="h-1.5 w-1.5 rounded-full bg-[#4868B4]" />
                      )}

                      <span className="rounded-full bg-[#F3F4F6] px-2 py-0.5 text-[9px] font-semibold text-[#737984]">
                        {notification.type}
                      </span>
                    </div>

                    <p className="mt-1.5 max-w-3xl text-[11px] leading-5 text-[#737984]">
                      {notification.description}
                    </p>

                    <div className="mt-2 text-[10px] font-medium text-[#A0A5AD]">
                      {notification.time}
                    </div>
                  </div>

                  {/* Actions */}
                  <div
                    className="flex items-center gap-1 opacity-100  shrink-0 sm:opacity-0 sm:transition sm:group-hover:opacity-100"
                  >
                    {isUnread && (
                      <button
                        onClick={() =>
                          markAsRead(notification.id)
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

                    <button
                      onClick={() =>
                        deleteNotification(notification.id)
                      }
                      title="حذف الإشعار"
                      className="
                        flex h-8 w-8 items-center justify-center
                        rounded-lg
                        text-[#8A9099]
                        transition
                        hover:bg-[#FFF0F0]
                        hover:text-[#C74B4B]
                      "
                    >
                      <Trash2 size={15} />
                    </button>
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
              عرض 1 - {filteredNotifications.length} من{" "}
              {notifications.length}
            </p>

            <div className="flex items-center gap-1">

              <button
                className="
                  flex h-8 w-8 items-center justify-center
                  rounded-lg border border-[#E1E4E9]
                  text-[#737984]
                  transition hover:bg-[#F7F8FA]
                "
              >
                <ChevronRight size={14} />
              </button>

              <button
                className="
                  flex h-8 min-w-8 items-center justify-center
                  rounded-lg bg-[#0B1C30]
                  px-2
                  text-[10px] font-bold text-white
                "
              >
                1
              </button>

              <button
                className="
                  flex h-8 min-w-8 items-center justify-center
                  rounded-lg border border-[#E1E4E9]
                  px-2
                  text-[10px] font-semibold text-[#59616D]
                  transition hover:bg-[#F7F8FA]
                "
              >
                2
              </button>

              <button
                className="
                  flex h-8 min-w-8 items-center justify-center
                  rounded-lg border border-[#E1E4E9]
                  px-2
                  text-[10px] font-semibold text-[#59616D]
                  transition hover:bg-[#F7F8FA]
                "
              >
                3
              </button>

              <button
                className="
                  flex h-8 w-8 items-center justify-center
                  rounded-lg border border-[#E1E4E9]
                  text-[#737984]
                  transition hover:bg-[#F7F8FA]
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