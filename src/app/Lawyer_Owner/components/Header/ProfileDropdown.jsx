"use client";

import { useRouter } from "next/navigation.js";
import React, { useState, useRef, useEffect } from "react";
import {
  FaChevronDown,
  FaUser,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

const ProfileDropdown = () => {
  const [open, setOpen] = useState(false);

  const profileRef = useRef(null);
const router =useRouter()
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={profileRef}>
      {/* Profile Button */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-1.5 pr-2 shadow-sm transition-all duration-200 hover:bg-slate-50 active:scale-[0.98]"
      >
        {/* Image */}
        <div className="w-8 h-8 overflow-hidden rounded-lg bg-slate-200">
          <img
            src="https://i.pravatar.cc/150?img=12"
            alt="أحمد الروبي"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Name */}
        <div className="hidden text-right sm:block">
          <p className="text-[10px] font-bold leading-4 text-slate-800">
            أحمد الروبي
          </p>

          <p className="text-[8px] leading-3 text-slate-400">
            مدير المكتب
          </p>
        </div>

        {/* Arrow */}
        <FaChevronDown
          size={9}
          className={`mr-0.5 text-slate-400 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute left-0 top-[calc(100%+8px)] z-50 w-56 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_12px_35px_rgba(15,23,42,0.12)]">
          
          {/* Profile Header */}
          <div className="mb-2 flex items-center gap-3 rounded-xl bg-slate-50 p-2.5">
            <div className="w-10 h-10 overflow-hidden rounded-xl">
              <img
                src="https://i.pravatar.cc/150?img=12"
                alt="أحمد الروبي"
                className="object-cover w-full h-full"
              />
            </div>

            <div className="min-w-0">
              <p className="truncate text-[11px] font-bold text-slate-800">
                أحمد الروبي
              </p>

              <p className="mt-0.5 text-[8px] text-slate-400">
                مدير المكتب
              </p>
            </div>
          </div>

          {/* Profile */}
          <button
            type="button"
            onClick={() => {
              router.push("/Lawyer_Owner/Profile")
              setOpen(false)}}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-right text-[10px] font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
          >
            <FaUser size={12} className="text-slate-400" />
            <span>الملف الشخصي</span>
          </button>

          {/* Settings */}
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-right text-[10px] font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
          >
            <FaCog size={12} className="text-slate-400" />
            <span>الإعدادات</span>
          </button>

          <div className="my-1 border-t border-slate-100" />

          {/* Logout */}
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-right text-[10px] font-medium text-red-500 transition hover:bg-red-50"
          >
            <FaSignOutAlt size={12} />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;