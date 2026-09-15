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
import logo from "../../../../Images/قضاء.jpg"
import { AdminContext } from "../../../../Providers/AdminContext/Admin.js";
import { authContext } from "../../../../Providers/AuthProvider/Auth.js";
import Image from "next/image.js";

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
        href: "/Admin/Activity",
        label: "سجل النشاطات",
        icon: FaHistory,
        page: "activity-logs",
        statKey: "timeLine",
      },
    ],
  },
];

const Sidebar = () => {
  const { users, offices, lawyers, timeLine, activityLogs, notifications } =
    useContext(AdminContext);
  const { profile, handleLogoutFun } = useContext(authContext);

  const pathname = usePathname();

  const stats = useMemo(() => {
    return {
      users: Array.isArray(users) ? users.length : 0,
      offices: Array.isArray(offices) ? offices.length : 0,
      lawyers: Array.isArray(lawyers) ? lawyers.length : 0,
      activityLogs: Array.isArray(activityLogs) ? activityLogs.length : 0,

      // سيتم ربطها لاحقًا من خلال AdminContext
      notifications: Array.isArray(notifications) ? notifications?.length : 0,
      timeLine: Array.isArray(timeLine) ? timeLine?.length : 0,
    };
  }, [users, offices, lawyers, activityLogs, notifications, timeLine]);

  const isActive = useMemo(
    () => (href) => {
      if (href === "/Admin") {
        return pathname === href;
      }

      return pathname.startsWith(href);
    },
    [pathname],
  );

 

  return (
    <aside className="relative z-20 flex flex-col flex-shrink-0 w-64 h-screen overflow-hidden border-l shadow-2xl bg-slate-50 sidebar-scroll border-gray-200/60">
      {/* Logo */}
 

<div className="flex items-center gap-3 p-3">
  <div className="flex items-center justify-center w-10 h-10">
    <Image
      src={logo}
      alt="قضاء Logo"
      className="object-cover w-10 h-10 rounded-full"
    />
  </div>

  <div>
    <p className="text-sm font-bold text-gray-800">
      قضاء
    </p>

    <p className="text-xs text-gray-400">
      منصة إدارة المحامين الذكية
    </p>
  </div>
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

      <div className="px-3 py-3 border-t border-gray-200/70 bg-white/80 backdrop-blur-sm">
        {/* Profile */}
        <Link
          href="/Admin/Profile"
          className="flex items-center w-full gap-3 px-3 py-3 transition-all duration-200 group rounded-2xl hover:bg-blue-50/70"
        >
          {/* Avatar */}
          <div className="relative flex items-center justify-center flex-shrink-0 w-10 h-10 overflow-hidden border border-blue-100 shadow-sm rounded-xl bg-gradient-to-br from-blue-100 to-blue-200">
            {profile?.user?.profileImage?.url ? (
              <img
                src={profile.user.profileImage.url}
                alt={profile?.user?.name || "المستخدم"}
                className="object-cover w-full h-full"
              />
            ) : (
              <span className="text-sm font-bold text-blue-600">
                {profile?.user?.name?.charAt(0) || "م"}
              </span>
            )}

            {/* Online indicator */}
            <span
              className="
          absolute
          bottom-0.5
          right-0.5
          w-2.5 h-2.5
          rounded-full
          bg-emerald-500
          border-2 border-white
        "
            />
          </div>

          {/* User Info */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-gray-800 truncate transition-colors group-hover:text-blue-600">
              {profile?.user?.name || "المستخدم"}
            </p>

            <p className="mt-0.5 text-[11px] text-gray-400 truncate">
              إدارة الحساب والملف الشخصي
            </p>
          </div>

          {/* Arrow */}
          <span className="flex items-center justify-center flex-shrink-0 text-xs text-gray-300 transition-all duration-200 rounded-lg w-7 h-7 group-hover:text-blue-500 group-hover:bg-blue-100">
            ←
          </span>
        </Link>

        {/* Logout */}
        <button
          type="button"
          onClick={handleLogoutFun}
          className="
      group
      flex items-center gap-3
      w-full
      mt-1
      px-3 py-2.5
      rounded-2xl
      text-sm font-medium
      text-red-500
      transition-all duration-200
      hover:bg-red-50
      hover:text-red-600
      active:scale-[0.98]
    "
        >
          <span className="flex items-center justify-center text-red-500 transition-all duration-200 w-9 h-9 rounded-xl bg-red-50 group-hover:bg-red-100">
            <FaSignOutAlt className="text-sm" />
          </span>

          <span className="flex-1 text-right">تسجيل الخروج</span>

          <span className="text-[10px] text-red-300 transition-transform duration-200 group-hover:-translate-x-1">
            ←
          </span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
