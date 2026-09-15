"use client";

import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../../Images/image.png";

const Footer = () => {
  const phone = "201125161651";

  const message =
    "السلام عليكم، أريد التواصل مع الدعم الفني لمنصة قضاء.";

  const whatsappLink = `https://wa.me/${phone}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <footer className="mt-10 border-t border-slate-700/50 bg-gradient-to-br from-slate-900/90 to-slate-800/90">
      <div className="px-4 py-6 mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">

          {/* Brand */}
          <div className="flex items-center gap-3">
            <Image
              src={logo}
              alt="قضاء Logo"
              className="object-cover w-10 h-10 rounded-full"
            />

            <div>
              <p className="text-sm font-bold text-white">
                قضاء
              </p>

              <p className="text-[11px] text-slate-400">
                منصة إدارة المحامين
              </p>
            </div>
          </div>

          {/* WhatsApp */}
          <Link
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-all duration-300 bg-green-500 shadow-lg rounded-xl hover:bg-green-600 hover:scale-105 shadow-green-500/20"
          >
            <FaWhatsapp className="w-5 h-5" />
            تواصل مع الدعم
          </Link>

          {/* Copyright */}
          <div className="text-xs text-center sm:text-right text-slate-400">
            <p>
              © {new Date().getFullYear()} قضاء
            </p>

            <p className="mt-1 text-[10px] text-slate-500">
              Powered by Main Tech
            </p>
          </div>

        </div>
      </div>

      {/* Glow line */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-green-500/40 to-transparent" />
    </footer>
  );
};

export default Footer;