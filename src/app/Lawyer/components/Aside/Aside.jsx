
"use client";

import React, { useContext, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  FolderOpen,
  Users,
  Scale,
  Calendar,
  BarChart3,
  ChevronRight,
  ChevronLeft,
  Menu,
  X,
  Tags,
  FileText,
  Bell,
} from "lucide-react";
import { FaStickyNote, FaTasks } from "react-icons/fa";
import { authContext } from "../../../../Providers/AuthProvider/Auth.js";
import logo from "../../../../Images/قضاء.jpg"
import Image from "next/image.js";

const Aside = ({ collapsed, setCollapsed }) => {
  const pathname = usePathname();

  const [openMobile, setOpenMobile] = useState(false);
const {profile,handleLogoutFun} = useContext(authContext);
  const menu = [

    {
      title: "لوحة التحكم",
      icon: LayoutDashboard,
      href: "/Lawyer",
    },  {
      title: "العملاء",
      icon: Users,
      href: "/Lawyer/ClientsPage",
    },
    
    {
      title: "القضايا",
      icon: Scale,
      href: "/Lawyer/CasesPage",
    },
   
    {
      title: "صيغ الدعاوي",
      icon: FolderOpen,
      href: "/Lawyer/FilesPage",
    },
  
    
    {
      title: "الجلسات",
      icon: Calendar,
      href: "/Lawyer/Session",
    },
     ...(profile?.user?.role === "lawyer" && profile?.user?.officeId
    ? [
        {
          title: "توزيع المهام",
          icon: FaTasks,
          href: "/Lawyer/Tasks",
        },
      ]
    : []),

  {
  title: "الملاحظات",
  icon: FaStickyNote,
  href: "/Lawyer/Notes",
},
{ title: "الإشعارات", icon: Bell, href: "/Lawyer/Notification", },
  ];

  return (
    <>
      {/* ================= Mobile Menu Button ================= */}
      <button
        type="button"
        onClick={() => setOpenMobile(true)}
        className="fixed z-50 flex items-center justify-center w-10 h-10 transition-all duration-200 border shadow-lg top-4 right-4 rounded-xl bg-slate-900 border-slate-700 hover:bg-slate-800 md:hidden"
      >
        <Menu className="w-5 h-5 text-white" />
      </button>

      {/* ================= Overlay ================= */}
      {openMobile && (
        <div
          onClick={() => setOpenMobile(false)}
          className="
            fixed
            inset-0
            z-40
            bg-black/60
            backdrop-blur-[2px]
            md:hidden
          "
        />
      )}

      {/* ================= Sidebar ================= */}
      <aside
        className={`
          fixed
          top-0
          right-0
          z-50
          flex
          flex-col
          h-full
          bg-slate-900
          border-l
          border-slate-800
          transition-all
          duration-300

          ${collapsed ? "md:w-[80px]" : "md:w-[260px]"}

          ${
            openMobile
              ? "translate-x-0 w-[260px]"
              : "translate-x-full md:translate-x-0"
          }
        `}
      >
        {/* ================= Header ================= */}
        <div
          className="flex items-center justify-between px-4 py-5 border-b border-slate-800 shrink-0"
        >
      
{!collapsed && (
  <div className="flex items-center gap-2.5">
    <div className="flex items-center justify-center overflow-hidden border w-9 h-9 rounded-xl border-slate-700/50">
      <Image
        src={logo}
        alt="قضاء Logo"
        className="object-cover w-full h-full rounded-xl"
      />
    </div>

    <div className="flex flex-col">
      <span className="text-sm font-bold text-white">
        قضاء
      </span>

      <span className="text-[10px] text-slate-500">
        منصة إدارة المحامين
      </span>
    </div>
  </div>
)}




          {/* Collapsed Logo */}
          {collapsed && (
        
<div className="flex items-center justify-center w-10 h-10 mx-auto overflow-hidden border rounded-xl bg-emerald-500/10 border-emerald-500/20">
  <Image
    src={logo}
    alt="قضاء"
    className="object-cover w-full h-full rounded-xl"
  />
</div>


          )}

          <div className="flex items-center gap-1">
            {/* Desktop Collapse */}
            <button
              type="button"
              onClick={() => setCollapsed(!collapsed)}
              className="items-center justify-center hidden w-8 h-8 transition-all duration-200 rounded-lg md:flex text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              {collapsed ? (
                <ChevronLeft className="w-5 h-5" />
              ) : (
                <ChevronRight className="w-5 h-5" />
              )}
            </button>

            {/* Mobile Close */}
            <button
              type="button"
              onClick={() => setOpenMobile(false)}
              className="flex items-center justify-center w-8 h-8 transition rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white md:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ================= Menu ================= */}
        <nav
          className="
            flex-1
            px-3
            py-5
            space-y-1.5
            overflow-y-auto

            [&::-webkit-scrollbar]:w-1.5
            [&::-webkit-scrollbar-track]:bg-slate-900
            [&::-webkit-scrollbar-thumb]:bg-slate-700
            [&::-webkit-scrollbar-thumb]:rounded-full
            hover:[&::-webkit-scrollbar-thumb]:bg-slate-600

            scrollbar-thin
            scrollbar-track-slate-900
            scrollbar-thumb-slate-700
          "
        >
          {/* Section Label */}
          {!collapsed && (
            <div className="px-3 pb-2">
              <span className="text-[10px] font-semibold tracking-wider text-slate-500">
                القائمة الرئيسية
              </span>
            </div>
          )}

          {menu.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpenMobile(false)}
                className={`
                  relative
                  flex
                  items-center
                  gap-3
                  px-3
                  py-3
                  rounded-xl
                  transition-all
                  duration-200
                  group

                  ${
                    isActive
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }

                  ${collapsed ? "justify-center" : ""}
                `}
              >
                {/* Active Indicator */}
                {isActive && (
                  <span
                    className="absolute right-0 w-1 h-6 -translate-y-1/2 rounded-l-full top-1/2 bg-emerald-500"
                  />
                )}

                {/* Icon */}
                <item.icon
                  className={`
                    w-5
                    h-5
                    shrink-0
                    transition-colors

                    ${
                      isActive
                        ? "text-emerald-400"
                        : "text-slate-400 group-hover:text-white"
                    }
                  `}
                />

                {/* Title */}
                {!collapsed && (
                  <span
                    className={`
                      text-sm
                      font-medium
                      truncate

                      ${
                        isActive
                          ? "text-emerald-400"
                          : "text-slate-300 group-hover:text-white"
                      }
                    `}
                  >
                    {item.title}
                  </span>
                )}

                {/* Tooltip when collapsed */}
                {collapsed && (
                  <span
                    className="absolute invisible px-3 py-2 mr-3 text-xs font-medium text-white transition-all duration-200 translate-x-1 border rounded-lg shadow-xl opacity-0 pointer-events-none right-full whitespace-nowrap bg-slate-800 border-slate-700 group-hover:opacity-100 group-hover:visible group-hover:translate-x-0"
                  >
                    {item.title}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* ================= Bottom Section ================= */}
        <div
          className="p-3 border-t shrink-0 border-slate-800"
        >
          {/* Profile */}
          <Link
            href="/Lawyer/Profile"
            onClick={() => setOpenMobile(false)}
            className={`
              flex
              items-center
              gap-3
              px-3
              py-3
              rounded-xl
              text-slate-200
              transition-all
              duration-200
              hover:bg-slate-800
              group

              ${collapsed ? "justify-center" : ""}
            `}
          >
            <img
              src={profile?.user?.profileImage?.url}
              alt="profile"
              className="object-cover w-8 h-8 border rounded-full border-slate-700"
            />

            {!collapsed && (
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-medium text-white truncate">
                 {profile?.user?.name}
                </span>

                <span className="text-xs text-slate-500">
                  محامي
                </span>
              </div>
            )}
          </Link>

          {/* Logout */}
          <button
            type="button"
            className={`
              flex
              items-center
              w-full
              gap-3
              px-3
              py-3
              mt-2
              rounded-xl
              text-slate-400
              transition-all
              duration-200
              hover:bg-slate-800
              hover:text-red-400

              ${collapsed ? "justify-center" : ""}
            `}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 shrink-0"
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
              <span onClick={handleLogoutFun} className="text-sm font-medium">
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
