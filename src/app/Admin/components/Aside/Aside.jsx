"use client";

import React, { useContext, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  FaBalanceScale,
  FaTachometerAlt,
  FaUsers,
  FaUserTie,
  FaBuilding,
  FaChartLine,
  FaHistory,
  FaSlidersH,
  FaUserCircle,
  FaSignOutAlt,
  FaFolderOpen,
  FaBell,
  FaGavel,
} from "react-icons/fa";

import { AdminContext } from "../../../../Providers/AdminContext/Admin.js";

const navGroups = [
  {
    id: "main",
    items: [
      {
        href: "/Admin",
        label: "الرئيسية",
        icon: FaTachometerAlt,
        page: "dashboard",
      },
    ],
  },

  {
    id: "management",
    label: "الإدارة",
    items: [
      {
        href: "/Admin/User",
        label: "المستخدمين",
        icon: FaUsers,
        page: "user",
        statKey: "users",
      },
      {
        href: "/Admin/Offices",
        label: "المكاتب",
        icon: FaBuilding,
        page: "Offices",
        statKey: "offices",
      },
      {
        href: "/Admin/LawyerPage",
        label: "المحامين",
        icon: FaUserTie,
        page: "lawyers",
        statKey: "lawyers",
      },
      {
        href: "/Admin/CaseType",
        label: "أنواع القضايا",
        icon: FaGavel,
        page: "case-types",
        statKey: "caseTypes",
      },
      {
        href: "/Admin/FileCategories",
        label: "تصنيفات الملفات",
        icon: FaFolderOpen,
        page: "file-categories",
        statKey: "categories",
      },
    ],
  },

  {
    id: "reports",
    label: "التقارير",
    items: [
      {
        href: "/Admin/Reports",
        label: "التقارير والإحصائيات",
        icon: FaChartLine,
        page: "reports",
      },
    ],
  },

  {
    id: "system",
    label: "النظام",
    items: [
      {
        href: "/Admin/Notifications",
        label: "الإشعارات",
        icon: FaBell,
        page: "notifications",
        statKey: "notifications",
      },
      {
        href: "/Admin/ActivityLogs",
        label: "سجل النشاطات",
        icon: FaHistory,
        page: "activity-logs",
        statKey: "activityLogs",
      },
    ],
  },

  {
    id: "settings",
    label: "الإعدادات",
    items: [
      {
        href: "/Admin/Settings",
        label: "الإعدادات العامة",
        icon: FaSlidersH,
        page: "settings",
      },
    ],
  },
];

const Sidebar = () => {
  const { users, offices, lawyers, caseTypes, categories, activityLogs } =
    useContext(AdminContext);

  const pathname = usePathname();

  const stats = useMemo(() => {
    return {
      users: Array.isArray(users) ? users.length : 0,
      offices: Array.isArray(offices) ? offices.length : 0,
      lawyers: Array.isArray(lawyers) ? lawyers.length : 0,
      caseTypes: Array.isArray(caseTypes) ? caseTypes.length : 0,
      categories: Array.isArray(categories) ? categories.length : 0,
      activityLogs: Array.isArray(activityLogs) ? activityLogs.length : 0,

      // سيتم ربطها لاحقًا من خلال AdminContext
      notifications: 0,
    };
  }, [users, offices, lawyers, caseTypes, categories, activityLogs]);

  const isActive = useMemo(
    () => (href) => {
      if (href === "/Admin") {
        return pathname === href;
      }

      return pathname.startsWith(href);
    },
    [pathname],
  );

  const handleLogout = () => {
    // سيتم ربط تسجيل الخروج بالـ backend لاحقًا
  };

  return (
    <aside className="relative z-20 flex flex-col flex-shrink-0 w-64 h-screen overflow-hidden border-l shadow-2xl bg-slate-50 sidebar-scroll border-gray-200/60">
      {/* Logo */}
      <div className="relative px-5 py-6 bg-white border-b border-gray-200/70">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center shadow-lg h-11 w-11 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-blue-500/30">
            <FaBalanceScale className="text-2xl text-white" />
          </div>

          <div>
            <span className="text-xl font-bold tracking-tight text-gray-800">
              سوليس
              <span className="text-blue-600">قضاء</span>
            </span>

            <p className="text-[11px] font-medium text-gray-400/80 leading-tight">
              منصة إدارة المحامين الذكية
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 h-0.5 w-1/3 rounded-full bg-gradient-to-r from-blue-500 to-transparent" />
      </div>

      {/* Navigation */}
      <div className="flex-1 px-3 py-4 overflow-y-auto">
        <nav className="space-y-6">
          {navGroups.map((group) => (
            <div key={group.id}>
              {group.label && (
                <div className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400/80">
                  {group.label}
                </div>
              )}

              <ul className="space-y-1.5">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        data-page={item.page}
                        className={`
                          group relative flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200
                          ${
                            active
                              ? "bg-gradient-to-r from-blue-50/80 to-blue-100/40 text-blue-700 shadow-sm shadow-blue-500/10"
                              : "text-gray-600 hover:bg-gray-100/70 hover:text-gray-900"
                          }
                        `}
                      >
                        {active && (
                          <span className="absolute right-0 w-1 h-8 -translate-y-1/2 rounded-l-full shadow-sm top-1/2 bg-gradient-to-b from-blue-400 to-blue-600 shadow-blue-500/40" />
                        )}

                        <Icon
                          className={`
                            w-5 transition-all duration-200
                            ${
                              active
                                ? "text-blue-600"
                                : "text-gray-400 group-hover:text-gray-600"
                            }
                          `}
                        />

                        <span className="flex-1">{item.label}</span>

                        {item.statKey && (
                          <span
                            className={`
                              min-w-[26px]
                              rounded-full
                              px-1.5
                              py-0.5
                              text-center
                              text-[10px]
                              font-bold
                              transition-all
                              ${
                                active
                                  ? "bg-blue-600 text-white shadow-sm shadow-blue-500/30"
                                  : "bg-gray-100 text-gray-500 group-hover:bg-gray-200 group-hover:text-gray-700"
                              }
                            `}
                          >
                            {stats[item.statKey] ?? 0}
                          </span>
                        )}

                        {active && !item.statKey && (
                          <span className="w-2 h-2 bg-blue-500 rounded-full shadow-md shadow-blue-500/50" />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              {group.id !== navGroups[navGroups.length - 1].id && (
                <div className="my-4 border-t border-gray-200/60" />
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Bottom */}
      <div className="px-4 py-4 border-t border-gray-200/70 bg-white/80 backdrop-blur-sm">
        <Link
          href="/Admin/Profile"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-200 hover:bg-gray-100/80"
        >
          <div className="flex items-center justify-center text-blue-600 rounded-full shadow-sm h-9 w-9 bg-gradient-to-br from-blue-100 to-blue-200">
            <FaUserCircle className="text-xl" />
          </div>

          <div className="flex-1">
            <p className="font-semibold text-gray-700">الملف الشخصي</p>

            <p className="text-[11px] text-gray-400">إدارة الحساب</p>
          </div>

          <span className="text-xs text-gray-300">⚡</span>
        </Link>

        <button
          type="button"
          onClick={handleLogout}
          className="mt-2 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-500 transition-all duration-200 hover:bg-red-50/80 hover:text-red-600"
        >
          <FaSignOutAlt className="text-lg" />

          <span>تسجيل الخروج</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
