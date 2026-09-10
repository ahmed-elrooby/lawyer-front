'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaWhatsapp, FaCode, FaHeart } from 'react-icons/fa';
import logo from "../../../../Images/image.png";
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-8 bg-white border-t border-gray-100">
      <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-5 md:flex-row">
          {/* لوجو الشركة */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 ">
              <Image src={logo} alt="Main Tech Logo" className="w-10 h-10 rounded-full" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-800">Main Tech</p>
              <p className="text-xs text-gray-400">ماين تك</p>
            </div>
          </div>

          {/* نص حقوق الملكية وتخصيص النظام للمحامين */}
          <div className="text-center">
            <p className="text-sm text-gray-500">
              © {currentYear} منصة سوليسقضاء – نظام إدارة المحامين
            </p>
            <p className="flex items-center justify-center gap-1 mt-1 text-xs text-gray-400">
              طور بواسطة <span className="font-medium text-gray-600">Main Tech</span>
              <FaHeart className="text-xs text-red-400" />
            </p>
          </div>

          {/* زر واتساب */}
          <a
            href="https://wa.me/+201125161651" // استبدل بالرقم الفعلي
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-green-700 transition bg-green-50 hover:bg-green-100 rounded-xl"
          >
            <FaWhatsapp className="text-lg text-green-600" />
            <span>واتساب الدعم الفني</span>
          </a>
        </div>

    
      </div>
    </footer>
  );
};

export default Footer;