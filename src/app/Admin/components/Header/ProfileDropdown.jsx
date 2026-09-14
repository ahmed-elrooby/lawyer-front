
"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FaCog, FaUser, FaSignOutAlt, FaChevronDown } from "react-icons/fa";

const ProfileDropdown = ({ profile,handleLogoutFun }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const roleName = {
    admin: "مدير النظام",
    office_owner: "مالك المكتب",
    lawyer: "محامي",
  };

  const name = profile?.
user?.name || "المستخدم";
  const image = profile?.
user?.profileImage?.url;

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-50 transition"
      >
        {image ? (
          <img
            src={image}
            alt={name}
            className="object-cover w-9 h-9 rounded-xl"
          />
        ) : (
          <div className="flex items-center justify-center text-sm font-bold text-white w-9 h-9 rounded-xl bg-gradient-to-r from-blue-500 to-blue-700">
            {name.charAt(0)}
          </div>
        )}

        <div className="hidden text-right md:block">
          <p className="max-w-[130px] truncate text-sm font-semibold text-slate-700">
            {name}
          </p>

          <p className="text-xs text-slate-400">
            {roleName[profile?.user?.role] || "مستخدم"}
          </p>
        </div>

        <FaChevronDown
          className={`hidden text-[9px] text-slate-400 transition-transform md:block ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute left-0 top-[calc(100%+10px)] z-[100] w-[270px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
          {/* Profile Info */}
          <div className="p-4 border-b border-slate-100 bg-slate-50/70">
            <div className="flex items-center gap-3">
              {image ? (
                <img
                  src={image}
                  alt={name}
                  className="object-cover w-12 h-12 rounded-xl"
                />
              ) : (
                <div className="flex items-center justify-center w-12 h-12 text-base font-bold text-white rounded-xl bg-gradient-to-r from-blue-500 to-blue-700">
                  {name.charAt(0)}
                </div>
              )}

              <div className="min-w-0">
                <p className="text-sm font-bold truncate text-slate-800">
                  {name}
                </p>

                <p className="text-[11px] truncate text-slate-400">
                  {profile?.
user?.email}
                </p>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="p-2">
            <Link
              href="/Admin/Profile"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50 group"
            >
              <span className="flex items-center justify-center text-blue-600 rounded-lg w-9 h-9 bg-blue-50">
                <FaUser className="text-xs" />
              </span>

              <div>
                <p className="text-xs font-bold text-slate-700">
                  الملف الشخصي
                </p>
                <p className="text-[10px] text-slate-400">
                  عرض وتعديل بياناتك
                </p>
              </div>
            </Link>

         
          </div>

          {/* Logout */}
          <div className="p-2 border-t border-slate-100">
            <button
              type="button"
              onClick={()=>{
                handleLogoutFun()
              }}
              className="flex items-center justify-center w-full gap-2 py-2.5 text-xs font-bold text-red-600 rounded-xl hover:bg-red-50"
            >
              <FaSignOutAlt className="text-xs" />
              تسجيل الخروج
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;

