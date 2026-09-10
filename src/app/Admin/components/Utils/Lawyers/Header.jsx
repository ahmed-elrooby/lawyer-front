'use client';

import React from 'react';
import { FaGavel, FaPlus } from 'react-icons/fa';

const Header = () => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="flex items-center gap-2 text-2xl font-bold text-gray-800 md:text-3xl">
          <FaGavel className="text-2xl text-blue-500 md:text-3xl" />
          إدارة المحامين
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          إدارة حسابات المحامين والتحكم في الصلاحيات والحالة
        </p>
      </div>
      <button
        className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2 transform hover:-translate-y-0.5"
        aria-label="إضافة محامي جديد"
      >
        <FaPlus className="text-sm" />
        إضافة محامي جديد
      </button>
    </div>
  );
};

export default Header;