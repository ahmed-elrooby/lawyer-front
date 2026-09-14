
"use client";

import React, { useContext } from "react";
import { FaSearch, FaBars } from "react-icons/fa";

import { AdminContext } from "../../../../Providers/AdminContext/Admin.js";
import NotificationsDropdown from "./NotificationsDropdown.jsx";
import ProfileDropdown from "./ProfileDropdown.jsx";
import { authContext } from "../../../../Providers/AuthProvider/Auth.js";



const Header = ({ onMenuClick }) => {
  const {
    notifications,
    unreadNotifications,
    handleMarkAsReadFun,
    handleReadAllNotificationsFun,
    
  } = useContext(AdminContext);
const {profile,handleLogoutFun}=useContext(authContext)
  return (
    <header
      dir="rtl"
      className="sticky top-0 z-50 flex items-center justify-between gap-3 px-3 py-3 border-b border-gray-100 bg-white/90 backdrop-blur-sm sm:px-6"
    >
      {/* Mobile Menu */}
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="فتح القائمة"
        className="flex items-center justify-center w-10 h-10 text-gray-600 border border-gray-100 bg-gray-50 rounded-xl lg:hidden hover:text-blue-600 hover:bg-blue-50"
      >
        <FaBars />
      </button>

      {/* Search */}
   {/* Page Info */}
<div className="flex-1">
  <div className="flex items-center gap-2">
    <div className="items-center justify-center hidden text-blue-600 sm:flex w-9 h-9 bg-blue-50 rounded-xl">
      <span className="text-sm">✦</span>
    </div>

    <div>
      <h1 className="text-sm font-bold text-gray-800 sm:text-base">
        لوحة التحكم
      </h1>

      <p className="hidden mt-0.5 text-[11px] text-gray-400 sm:block">
        نظرة عامة على إدارة المنصة ومتابعة النشاط
      </p>
    </div>
  </div>
</div>

      {/* Right */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Notifications */}
   <NotificationsDropdown
  notifications={Array.isArray(notifications) ? notifications : []}
  unreadNotifications={unreadNotifications?.count ?? unreadNotifications ?? 0}
  handleMarkAsReadFun={handleMarkAsReadFun}
  handleReadAllNotificationsFun={handleReadAllNotificationsFun}
/>

        {/* Divider */}
        <div className="hidden w-px h-6 bg-gray-200 sm:block" />

        {/* Profile */}
        <ProfileDropdown profile={profile} handleLogoutFun={handleLogoutFun} />
      </div>
    </header>
  );
};

export default Header;

