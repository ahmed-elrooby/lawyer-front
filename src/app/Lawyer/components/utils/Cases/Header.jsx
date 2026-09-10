
"use client";

import React from "react";
import { Menu, Scale, Plus } from "lucide-react";

const Header = () => {
  const toggleMobileMenu = () => {
    console.log("Toggle mobile menu – integrate with your sidebar state");
  };

  return (
    <header className="z-10 flex flex-wrap items-center justify-between gap-4 px-4 py-4 border-b rounded-lg bg-slate-900/90 backdrop-blur-md border-slate-800 md:px-6">
      <div className="flex items-center gap-4">
        <button
          id="mobileMenuBtn"
          onClick={toggleMobileMenu}
          className="p-2 transition rounded-lg md:hidden bg-slate-800 text-slate-200 hover:bg-slate-700"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold md:text-3xl">
            <Scale className="h-7 w-7 text-emerald-500" />
            كل القضايا
          </h1>
          <p className="hidden text-sm text-slate-400 md:block">
            إدارة ومتابعة جميع القضايا القانونية
          </p>
        </div>
      </div>
      <button
        id="addCaseBtn"
        className="flex items-center gap-2 px-5 py-2 text-white transition transform shadow-lg bg-emerald-600 hover:bg-emerald-700 rounded-xl hover:scale-105"
      >
        <Plus className="w-5 h-5" />
        إضافة قضية جديدة
      </button>
    </header>
  );
};

export default Header;
