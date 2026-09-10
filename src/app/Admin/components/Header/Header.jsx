'use client';

import React from 'react';
import { FaSearch, FaBell, FaBars } from 'react-icons/fa';

const Header = ({ onMenuClick }) => {
  return (
    <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-10 border-b border-gray-100 px-3 sm:px-6 py-3 flex items-center justify-between gap-3">

      {/* زر القائمة (موبايل) */}
      <button
        onClick={onMenuClick}
        className="lg:hidden text-gray-600 hover:text-blue-500 transition p-2"
        aria-label="فتح القائمة"
      >
        <FaBars className="text-xl" />
      </button>

      {/* البحث */}
      <div className="relative flex-1 sm:flex-none sm:w-80">
        <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
        <input
          type="text"
          placeholder="بحث في لوحة التحكم..."
          className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 pr-10 pl-4 text-sm focus:ring-2 focus:ring-blue-200 outline-none"
        />
      </div>

      {/* الإشعارات + المستخدم */}
      <div className="flex items-center gap-2 sm:gap-4">
        <div className="relative">
          <FaBell className="text-gray-600 text-xl cursor-pointer hover:text-blue-500 transition" />
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
            3
          </span>
        </div>

        <div className="h-6 w-px bg-gray-200 hidden sm:block" />

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
            أ
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-700">أحمد المنصور</p>
            <p className="text-xs text-gray-400">مدير النظام</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;