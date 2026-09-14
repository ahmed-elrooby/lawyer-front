
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaWhatsapp, FaHeart } from "react-icons/fa";

import logo from "../../../../Images/image.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const whatsappNumber = "201125161651";

  const whatsappMessage = encodeURIComponent(
    "السلام عليكم، أحتاج إلى مساعدة بخصوص منصة سوليسقضاء."
  );

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <footer className="mt-8 bg-white border-t border-gray-100">
      <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-5 md:flex-row">

          {/* Company Logo */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10">
              <Image
                src={logo}
                alt="Main Tech Logo"
                className="w-10 h-10 rounded-full"
              />
            </div>

            <div>
              <p className="text-sm font-bold text-gray-800">
                Main Tech
              </p>

              <p className="text-xs text-gray-400">
                ماين تك
              </p>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-sm text-gray-500">
              © {currentYear} منصة سوليسقضاء – نظام إدارة المحامين
            </p>

            <p className="flex items-center justify-center gap-1 mt-1 text-xs text-gray-400">
              طور بواسطة
              <span className="font-medium text-gray-600">
                Main Tech
              </span>

              <FaHeart className="text-xs text-red-400" />
            </p>
          </div>

          {/* WhatsApp Support */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex
              items-center
              gap-2
              px-4
              py-2.5
              text-sm
              font-medium
              text-green-700
              transition-all
              duration-200
              bg-green-50
              border
              border-green-100
              rounded-xl
              hover:bg-green-100
              hover:border-green-200
              hover:-translate-y-0.5
            "
          >
            <FaWhatsapp className="text-lg text-green-600" />

            <span>
              واتساب الدعم الفني
            </span>
          </a>

        </div>
      </div>
    </footer>
  );
};

export default Footer;

