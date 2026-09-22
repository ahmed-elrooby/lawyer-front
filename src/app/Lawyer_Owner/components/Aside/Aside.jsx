"use client";

import React, { useContext } from "react";
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
  FaUser,
  FaTasks,FaGlobe,FaBalanceScale
} from "react-icons/fa";
import { OwnerContext } from "../../../../Providers/LawyerOwner/OwnerProvider.js";
import { authContext } from "../../../../Providers/AuthProvider/Auth.js";
import logo from "../../../../Images/قضاء.jpg"
import Image from "next/image.js";
const Aside = ({ sidebarOpen, onClose }) => {
  const {dashboardStatisics,unreadNotifications} = useContext(OwnerContext);
  const {profile}=useContext(authContext)
  const pathname = usePathname();
  const menuItems = [
    {
      title: "الرئيسية",
      icon: FaHome,
      href: "/Lawyer_Owner",
    },
    {
      title: "إدارة المكتب",
      icon: FaCompass,
      href: "/Lawyer_Owner/Managment",
    },
    {
      title: "فريق المحامين",
      icon: FaUserTie,
      href: "/Lawyer_Owner/LawyersPage",
      badge: dashboardStatisics?.lawyers?.total || 0,
      badgeClass: "bg-blue-50 text-blue-600",
    },
    {
      title: "العملاء",
      icon: FaUsers,
      href: "/Lawyer_Owner/ClientsPage",
      badge: dashboardStatisics?.clients?.total || 0,
      badgeClass: "bg-blue-50 text-blue-600",
    },
    {
      title: "القضايا",
      icon: FaBriefcase,
      href: "/Lawyer_Owner/Cases",
      badge: dashboardStatisics?.cases?.total || 0,
      badgeClass: "bg-blue-50 text-blue-600",
    },
    {
      title: "الجلسات",
      icon: FaClock,
      href: "/Lawyer_Owner/Sessions",
      badge: dashboardStatisics?.sessions?.total || 0,
      badgeClass: "bg-amber-100 text-amber-700",
    },
    {
      title: "صيغ الدعاوي",
      icon: FaFolder,
      href: "/Lawyer_Owner/Files",
    }, {
  title: "منظومة النيابة العامة",
  icon: FaBalanceScale,
  href: "https://www.ppo.gov.eg/ppo/r/ppoportal/ppoportal/home",
  external: true,
},
{
  title: "مصر الرقمية",
  icon: FaGlobe,
  href: "https://digital.gov.eg/",
  external: true,
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
      badge: unreadNotifications?.count || 0,
      badgeClass: "bg-red-100 text-red-600",
    },
    {
      title:"توزيع المهام",
      icon:FaTasks,
      href:"/Lawyer_Owner/Tasks"
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
  <div className="relative overflow-hidden shadow-sm h-9 w-9 shrink-0 rounded-xl">
    <Image
      src={logo}
      alt="قضاء"
      fill
      className="object-cover"
    />
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
               {profile?.user?.officeId?.name}
              </div>

              <div className="truncate text-[8px] text-slate-400">
                مكتب محاماة • {dashboardStatisics?.lawyers?.total || 0} موظف
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
  const isActive = !item.external && pathname === item.href;

  const content = (
    <>
      {/* Menu Item */}
      <span className="flex items-center gap-2">
        <Icon
          size={13}
          className={isActive ? "text-white" : "text-slate-400"}
        />

        <span>{item.title}</span>
      </span>

      {/* Badge */}
      {item.badge > 0 && (
        <span
          className={`
            ml-2
            min-w-[22px]
            rounded-full
            px-2 py-0.5
            text-center
            text-[8px]
            ${item.badgeClass}
            ${item.badgeBold ? "font-bold" : "font-semibold"}
          `}
        >
          {item.badge}
        </span>
      )}
    </>
  );

  const className = `
    flex w-full items-center rounded-xl
    px-3 py-2.5
    text-[11px]
    transition-colors duration-150
    ${
      isActive
        ? "bg-slate-900 text-white"
        : "justify-start text-slate-600 hover:bg-slate-100"
    }
    ${item.badge > 0 ? "justify-between" : ""}
  `;

  return item.external ? (
    <a
      key={item.title}
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClose}
      className={className}
    >
      {content}
    </a>
  ) : (
    <Link
      key={item.title}
      href={item.href}
      onClick={onClose}
      className={className}
    >
      {content}
    </Link>
  );
})}
        </nav>

        {/* ================= User ================= */}
        <Link href="/Lawyer_Owner/Profile" className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-2.5">
          <div className="flex items-center gap-2">
            {/* Avatar */}
           <div className="flex items-center justify-center w-8 h-8 overflow-hidden rounded-full shrink-0 bg-slate-200">
  {profile?.user?.profileImage ? (
    <img
      src={profile?.user?.profileImage?.url}
      alt={profile?.user?.name || "المستخدم"}
      className="object-cover w-full h-full"
    />
  ) : (
    <FaUser size={12} className="text-slate-400" />
  )}
</div>

            {/* User Info */}
            <div className="flex-1 min-w-0">
              <div className="truncate text-[10px] font-bold text-slate-800">
               {profile?.user?.name}
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