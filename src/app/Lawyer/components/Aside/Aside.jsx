"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderOpen,
  Users,
  Scale,
  Calendar,
  CheckSquare,
  BarChart3,
  ChevronRight,
  ChevronLeft,
  Menu,
  X,
  CheckCircle2,
  Archive,
} from "lucide-react";

const Aside = ({ collapsed, setCollapsed }) => {
  const pathname = usePathname();
  const [openCases, setOpenCases] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);
const menu = [
  { title: "لوحة التحكم", icon: LayoutDashboard, href: "/User" },

  { title: "إدارة الملفات", badge: "4", icon: FolderOpen, href: "/User/FilesPage" },
  { title: "العملاء", badge: "4", icon: Users, href: "/User/ClientsPage" },

  {
    title: "القضايا",
    icon: Scale,
    badge: "3",

children: [
  { title: "كل القضايا", badge: "3", icon: Scale, href: "/User/CasesPage" },
  { title: "القضايا الحالية", badge: "2", icon: CheckCircle2, href: "/cases/active" },
  { title: "القضايا المؤرشفة", badge: "1", icon: Archive, href: "/cases/archived" },
],
  },

  { title: "الجلسات", badge: "8", icon: Calendar, href: "/sessions" },
  { title: "المهام", badge: "3", icon: CheckSquare, href: "/tasks" },
  { title: "التقارير", icon: BarChart3, href: "/reports" },
];
  return (
    <>
      {/* 📱 زرار الموبايل */}
      <button
        onClick={() => setOpenMobile(true)}
        className="fixed z-50 p-2 rounded-lg shadow-md bg-slate-900 top-4 right-4 md:hidden"
      >
        <Menu className="text-white" />
      </button>

      {/* Overlay */}
      {openMobile && (
        <div
          onClick={() => setOpenMobile(false)}
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed top-0 right-0 h-full bg-slate-900 z-50 flex flex-col
        transition-all duration-300

        ${collapsed ? "md:w-[80px]" : "md:w-[260px]"}
        

        ${openMobile ? "translate-x-0" : "translate-x-full md:translate-x-0"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-5 border-b border-slate-800">
          {!collapsed && (
            <div className="flex items-center gap-2.5">
              <Scale className="w-6 h-6 text-blue-500" />
              <span className="text-lg font-bold text-white">
                Main Tech
              </span>
            </div>
          )}

          <div className="flex items-center gap-2">
            {/* Collapse (Desktop فقط) */}
       <button
  onClick={() => setCollapsed(!collapsed)}
  className="p-1.5 rounded-lg hover:bg-slate-700 transition"
>
  {collapsed ? (
    <ChevronLeft className="w-5 h-5 text-gray-400" />
  ) : (
    <ChevronRight className="w-5 h-5 text-gray-400" />
  )}
</button>

            {/* Close Mobile */}
            <button
              onClick={() => setOpenMobile(false)}
              className="md:hidden p-1.5"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Menu */}
        <nav className="flex-1 px-2 mt-6 space-y-2 overflow-y-auto">
          {menu.map((item) => {
  const isActive = item.href && pathname === item.href;
  const isCases = item.title === "القضايا";

  return (
    <div key={item.title}>
      {/* MAIN ITEM */}
      <div
        onClick={() => {
          if (isCases) {
            setOpenCases(!openCases);
          }
        }}
      >
        <Link
          href={item.href || "#"}
          onClick={() => setOpenMobile(false)}
          className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group
          ${
            isActive
              ? "bg-slate-700 text-white"
              : "text-gray-300 hover:bg-slate-700 hover:text-white"
          }`}
        >
          <item.icon className="w-5 h-5" />

          {!collapsed && (
            <span className="flex items-center justify-between w-full gap-2 text-sm font-medium">
              {item.title}

              {isCases && (
               <ChevronRight
  className={`w-4 h-4 transition ${openCases ? "rotate-90" : ""}`}
/>
              )}
            </span>
          )}

          {item.badge && (
            <span className="mr-auto text-xs font-semibold bg-blue-500 text-white px-2 py-0.5 rounded-full">
              {item.badge}
            </span>
          )}
        </Link>
      </div>

      {/* SUB MENU - CASES ONLY */}
      {isCases && openCases && !collapsed && (
        <div className="pr-3 mt-2 ml-6 space-y-2 border-r border-slate-700">
          {item.children.map((child) => {
            const isChildActive = pathname === child.href;

            return (
              <Link
                key={child.href}
                href={child.href}
                onClick={() => setOpenMobile(false)}
                className={`flex items-center gap-3 text-sm px-2 py-2 rounded-lg transition
                ${
                  isChildActive
                    ? "text-white bg-slate-700"
                    : "text-gray-400 hover:text-white hover:bg-slate-700"
                }`}
              >
                <child.icon className="w-4 h-4" />
                {child.title}
                {child.badge && (
                  <span className="mr-auto text-xs font-semibold bg-blue-500 text-white px-2 py-0.5 rounded-full">
                    {child.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
})}
        </nav>

        {/* Bottom Section */}
        <div className="p-3 border-t border-slate-800">
          {/* Profile */}
          <Link
            href="/profile"
            className="flex items-center gap-3 px-3 py-3 text-gray-200 transition rounded-xl hover:bg-slate-700"
          >
            <img
              src="https://i.pravatar.cc/40"
              alt="profile"
              className="object-cover w-8 h-8 rounded-full"
            />

            {!collapsed && (
              <div className="flex flex-col">
                <span className="text-sm font-medium">
                  أحمد عيد
                </span>
                <span className="text-xs text-gray-400">
                  محامي
                </span>
              </div>
            )}
          </Link>

          {/* Logout */}
          <button
            className="flex items-center w-full gap-3 px-3 py-3 mt-2 text-red-400 transition rounded-xl hover:bg-red-500/10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2h5a2 2 0 012 2v1"
              />
            </svg>

            {!collapsed && (
              <span className="text-sm font-medium">
                تسجيل الخروج
              </span>
            )}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Aside;