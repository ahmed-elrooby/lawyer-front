"use client";

import React from "react";
import { Cpu } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
import logo from "../../../../Images/image.png";
import Image from "next/image";

const Footer = () => {
  const phone = "201125161651"; // بدون + أو مسافات
  const message = "مرحبًا، أريد الاستفسار عن خدماتكم"; // optional

  const whatsappLink = `https://wa.me/${phone}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <footer className="mt-10 border-t border-slate-700/50 bg-gradient-to-br from-slate-900/90 to-slate-800/90">
      <div className="px-4 py-6 mx-auto max-w-7xl">

        <div className="flex items-center justify-between gap-2 ">

          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="">
              <Image src={logo} alt="Main Tech Logo" className="w-10 h-10 rounded-full" />
            </div>
            <span className="hidden text-lg font-bold text-white md:block">
              Main Tech
            </span>
          </div>

          {/* WhatsApp Button */}
          <Link
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-all duration-300 bg-green-500 shadow-lg rounded-xl hover:bg-green-600 hover:scale-105 shadow-green-500/20"
          >
            <FaWhatsapp className="w-5 h-5" />
            تواصل واتساب
          </Link>

          {/* Copyright */}
          <div className="text-xs text-center text-slate-400 sm:text-right">
            © {new Date().getFullYear()} Main Tech
          </div>

        </div>
      </div>

      {/* Glow line */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-green-500/40 to-transparent" />
    </footer>
  );
};

export default Footer;