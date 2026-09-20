"use client";

import React, { useContext } from "react";
import {
  FaBars,
  FaCalendarAlt,
} from "react-icons/fa";
import NotificationsDropdown from "./NotificationsDropdown.jsx";
import ProfileDropdown from "./ProfileDropdown.jsx";
import { authContext } from "../../../../Providers/AuthProvider/Auth.js";

const Header = ({ onMenuClick }) => {
  const { profile } = useContext(authContext);

  const today = new Date();

  const formattedDate = new Intl.DateTimeFormat("ar-EG", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(today);

  return (
    <header className="mb-5 flex items-center justify-between gap-3">
      
      {/* Right Side */}
      <div className="flex items-center gap-3">

        {/* Mobile Menu */}
        <button
          type="button"
          onClick={onMenuClick}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition-all duration-200 hover:bg-slate-50 hover:text-slate-900 active:scale-95 md:hidden"
          aria-label="فتح القائمة"
        >
          <FaBars size={15} />
        </button>

        {/* Welcome */}
        <div>
          <h1 className="text-sm font-extrabold leading-5 text-slate-900 sm:text-base">
            صباح الخير، {profile?.user?.name || "المستخدم"} 👋
          </h1>

          <p className="mt-0.5 text-[9px] text-slate-400 sm:text-[10px]">
            إليك نظرة سريعة على أداء مكتبك اليوم
          </p>
        </div>
      </div>

      {/* Left Side */}
      <div className="flex items-center gap-2">

        {/* Date */}
        <button
          type="button"
          className="hidden h-9 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-[9px] font-medium text-slate-500 shadow-sm transition hover:bg-slate-50 sm:flex"
        >
          <FaCalendarAlt
            size={11}
            className="text-slate-400"
          />

          <span>{formattedDate}</span>
        </button>

        {/* Notifications */}
        <NotificationsDropdown />

        {/* Profile */}
        <ProfileDropdown />

      </div>
    </header>
  );
};

export default Header;