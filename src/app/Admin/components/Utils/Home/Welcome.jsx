'use client';

import React, { useContext } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import { authContext } from '../../../../../Providers/AuthProvider/Auth.js';

const Welcome = () => {
  const {profile}=useContext(authContext)

  // Get current date in Arabic format
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('ar-EG', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">
          مرحبًا، {profile?.user?.name} 👋
        </h1>
        <p className="mt-1 text-gray-500">
          إليك نظرة عامة على أداء النظام اليوم
        </p>
        <div className="flex items-center gap-2 mt-2 text-sm">
          <FaCalendarAlt className="text-blue-500" />
          <span className="text-gray-600">{formattedDate}</span>
        </div>
      </div>
      <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 shadow-sm rounded-2xl">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex w-full h-full bg-green-400 rounded-full opacity-75 animate-ping"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
        </span>
        <span className="text-sm font-medium text-gray-700">
          حالة النظام: <span className="text-green-600">Online / مستقرة</span>
        </span>
      </div>
    </div>
  );
};

export default Welcome;