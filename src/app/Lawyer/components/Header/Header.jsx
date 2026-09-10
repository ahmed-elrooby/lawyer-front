"use client";

import React, { useState } from "react";
import { Search, Bell, X } from "lucide-react";

const Header = () => {
  const [openSearch, setOpenSearch] = useState(false);

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between gap-3 px-4 py-3 border-b border-slate-700 bg-slate-800 sm:px-6">
      
      {/* 🔍 Search (Desktop) */}
      <div className="relative flex-1 hidden max-w-md md:block">
        <Search className="absolute w-4 h-4 text-gray-400 -translate-y-1/2 right-3 top-1/2" />
        <input
          type="text"
          placeholder="ابحث..."
          className="w-full py-2 pl-4 pr-10 text-sm text-white border bg-slate-700 border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      {/* 📱 Mobile Search Button */}
      <button
        onClick={() => setOpenSearch(true)}
        className="p-2 rounded-lg md:hidden hover:bg-slate-700"
      >
        <Search className="w-5 h-5 text-white" />
      </button>

      {/* Right Side */}
      <div className="flex items-center gap-2 sm:gap-3">
        
        {/* 🔔 Notifications */}
        <button className="relative p-2 transition rounded-lg hover:bg-slate-700">
          <Bell className="w-5 h-5 text-white" />
          <span className="absolute w-2 h-2 bg-red-500 rounded-full top-1.5 right-1.5"></span>
        </button>

        {/* 👤 Profile */}
        <button className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 overflow-hidden border-2 rounded-full border-emerald-500">
            <img
              src="https://i.pravatar.cc/100"
              alt="profile"
              className="object-cover w-full h-full"
            />
          </div>

          {/* الاسم يختفي في الموبايل */}
          <span className="hidden text-sm font-medium text-white lg:block">
            سارة الشين
          </span>
        </button>
      </div>

      {/* 🔍 Mobile Search Overlay */}
      {openSearch && (
        <div className="fixed inset-0 z-50 flex items-start p-4 bg-black/50 md:hidden">
          <div className="flex items-center w-full gap-2 p-3 bg-white rounded-xl">
            
            <input
              type="text"
              autoFocus
              placeholder="ابحث..."
              className="flex-1 px-3 py-2 text-sm border rounded-lg outline-none"
            />

            <button onClick={() => setOpenSearch(false)}>
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;