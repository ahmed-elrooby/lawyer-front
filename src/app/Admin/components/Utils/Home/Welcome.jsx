'use client';

import React from 'react';
import { FaCalendarAlt } from 'react-icons/fa';

const Welcome = () => {
  // Get current date in Arabic format
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('ar-EG', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          مرحبًا، أحمد 👋
        </h1>
        <p className="text-gray-500 mt-1">
          إليك نظرة عامة على أداء النظام اليوم
        </p>
        <div className="flex items-center gap-2 mt-2 text-sm">
          <FaCalendarAlt className="text-blue-500" />
          <span className="text-gray-600">{formattedDate}</span>
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow-sm px-4 py-2 flex items-center gap-2 border border-gray-100">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
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