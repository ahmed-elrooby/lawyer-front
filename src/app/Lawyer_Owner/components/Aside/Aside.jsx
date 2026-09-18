"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaGavel,
  FaHome,
  FaCompass,
  FaBriefcase,
  FaUsers,
  FaUserTie,
  FaClock,
  FaFolder,
  FaChartBar,
  FaBuilding,
  FaBell,
  FaCog,
  FaEllipsisV,
} from "react-icons/fa";

const Aside = ({ sidebarOpen, onClose }) => {
  const pathname = usePathname();

  const menuItems = [
    {
      title: "الرئيسية",
      icon: FaHome,
      href: "/Lawyer_Owner",
    },
    {
      title: "مركز القيادة",
      icon: FaCompass,
      href: "/Lawyer_Owner/Managment",
    },
    {
      title: "القضايا",
      icon: FaBriefcase,
      href: "/Lawyer_Owner/Cases",
      badge: "128",
      badgeClass: "bg-blue-50 text-blue-600",
    },
    {
      title: "العملاء",
      icon: FaUsers,
      href: "/Lawyer_Owner/ClientsPage",
    },
    {
      title: "فريق المحامين",
      icon: FaUserTie,
      href: "/Lawyer_Owner/LawyersPage",
      badge: "12",
      badgeClass: "bg-blue-50 text-blue-600",
    },
    {
      title: "الجلسات",
      icon: FaClock,
      href: "/Lawyer_Owner/Sessions",
      badge: "47",
      badgeClass: "bg-amber-100 text-amber-700",
    },
    {
      title: "صيغ الدعاوي",
      icon: FaFolder,
      href: "/Lawyer_Owner/Files",
    },
    {
      title: "أداء المكتب",
      icon: FaChartBar,
      href: "/Lawyer_Owner/PerformanceOffice",
    },
  
    {
      title: "التنبيهات",
      icon: FaBell,
      href: "/Lawyer_Owner/Notifications",
      badge: "4",
      badgeClass: "bg-red-100 text-red-600",
      badgeBold: true,
    }
  ];

  return (
    <>
      {/* Overlay - Mobile */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-slate-900/35 transition-opacity duration-300 md:hidden ${
          sidebarOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* Sidebar */}
      <aside
        className={`
          fixed right-0 top-0 bottom-0 z-50
          flex w-[250px] flex-col
          border-l border-slate-200
          bg-white px-3 py-4
          transition-transform duration-300 ease-in-out
          ${
            sidebarOpen
              ? "translate-x-0"
              : "translate-x-full md:translate-x-0"
          }
        `}
      >
        {/* ================= Brand ================= */}
        <div className="mb-5 flex items-center gap-2.5 px-2">
          <div className="flex items-center justify-center text-white shadow-sm h-9 w-9 rounded-xl bg-slate-900">
            <span className="text-lg font-extrabold">ق</span>
          </div>

          <div className="leading-tight">
            <div className="text-sm font-extrabold text-slate-900">
              قضاء
            </div>

            <div className="text-[9px] text-slate-400">
              منصة إدارة مكاتب المحاماة
            </div>
          </div>
        </div>

        {/* ================= Office Card ================= */}
        <div className="mb-4 rounded-xl border border-slate-200 bg-slate-50 p-2.5">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 text-blue-700 bg-blue-100 rounded-lg shrink-0">
              <FaGavel size={14} />
            </div>

            <div className="flex-1 min-w-0">
              <div className="truncate text-[10px] font-bold text-slate-800">
                مكتب العدالة
              </div>

              <div className="truncate text-[8px] text-slate-400">
                مكتب محاماة • 48 موظف
              </div>
            </div>

            <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[8px] text-blue-700">
              نشط
            </span>
          </div>
        </div>

        {/* ================= Section Title ================= */}
        <div className="mb-2 px-2 text-[9px] font-bold text-slate-400">
          القائمة الرئيسية
        </div>

        {/* ================= Navigation ================= */}
        <nav className="flex-1 space-y-1 overflow-y-auto scrollbar">
          {menuItems.map((item) => {
            const Icon = item.icon;

            // Active حسب الـ pathname
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.title}
                href={item.href}
                onClick={onClose}
                className={`
                  flex w-full items-center rounded-xl
                  px-3 py-2.5
                  text-[11px]
                  transition-colors duration-150
                  ${
                    isActive
                      ? "bg-slate-900 text-white"
                      : "justify-start text-slate-600 hover:bg-slate-100"
                  }
                  ${item.badge ? "justify-between" : ""}
                `}
              >
                {/* Menu Item */}
                <span className="flex items-center gap-2">
                  <Icon
                    size={13}
                    className={
                      isActive
                        ? "text-white"
                        : "text-slate-400"
                    }
                  />

                  <span>{item.title}</span>
                </span>

                {/* Badge */}
                {item.badge && (
                  <span
                    className={`
                      rounded-full
                      px-1.5 py-0.5
                      text-[8px]
                      ${item.badgeClass}
                      ${item.badgeBold ? "font-bold" : ""}
                    `}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* ================= User ================= */}
        <Link href="/Lawyer_Owner/Profile" className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-2.5">
          <div className="flex items-center gap-2">
            {/* Avatar */}
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-[10px] font-bold text-white">
              أ
            </div>

            {/* User Info */}
            <div className="flex-1 min-w-0">
              <div className="truncate text-[10px] font-bold text-slate-800">
                أحمد الروبي
              </div>

              <div className="truncate text-[8px] text-slate-400">
                مدير المكتب • متصل
              </div>
            </div>

            {/* More */}
           
          </div>
        </Link>
      </aside>
    </>
  );
};

export default Aside;