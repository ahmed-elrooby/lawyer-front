
"use client";

import React from "react";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";

import mainTech from "../../../../Images/image.png";
import logo from "../../../../Images/قضاء.jpg";

const Footer = () => {
  return (
    <footer className="mt-8 bg-white border-t border-slate-100">
      <div className="px-5 py-6 mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

          {/* Brands */}
          <div className="flex items-center gap-5" dir="rtl">

            {/* Qadaa */}
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-10 h-10 overflow-hidden rounded-xl bg-slate-50">
                <Image
                  src={logo}
                  alt="قضاء"
                  width={40}
                  height={40}
                  className="object-contain w-full h-full"
                />
              </div>

              <div>
                <div className="text-[11px] font-extrabold text-slate-900">
                  قضاء
                </div>

                <div className="mt-0.5 text-[8px] text-slate-400">
                  منصة إدارة مكاتب المحاماة
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="w-px h-9 bg-slate-200" />

            {/* Main Tech */}
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-10 h-10 overflow-hidden rounded-xl bg-slate-50">
                <Image
                  src={mainTech}
                  alt="Main Tech"
                  width={40}
                  height={40}
                  className="object-contain w-full h-full"
                />
              </div>

              <div>
                <div className="text-[11px] font-extrabold text-slate-900">
                  Main Tech
                </div>

                <div className="mt-0.5 text-[8px] text-slate-400">
                  تطوير البرمجيات والحلول الرقمية
                </div>
              </div>
            </div>
          </div>

          {/* Contact */}
          <a
            href="https://wa.me/201000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex w-fit items-center gap-2.5 rounded-xl border border-emerald-100 bg-emerald-50/60 px-4 py-2.5 transition hover:border-emerald-200 hover:bg-emerald-50"
          >
            <div className="flex items-center justify-center text-white rounded-lg h-7 w-7 bg-emerald-500">
              <FaWhatsapp className="text-sm" />
            </div>

            <div className="text-right">
              <div className="text-[9px] font-extrabold text-emerald-700">
                تواصل معنا
              </div>

              <div className="mt-0.5 text-[7px] text-emerald-600">
                عبر واتساب
              </div>
            </div>
          </a>
        </div>

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-2 pt-4 mt-5 border-t border-slate-100 sm:flex-row">
          <p className="text-[7px] text-slate-400">
            © 2026 Main Tech — جميع الحقوق محفوظة
          </p>

          <p className="text-[7px] text-slate-400">
            قضاء · منصة إدارة مكاتب المحاماة
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
