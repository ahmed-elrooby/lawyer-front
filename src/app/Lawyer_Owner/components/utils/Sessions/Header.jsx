"use client";

import React, { useContext } from "react";
import { CalendarPlus, Download, Gavel } from "lucide-react";
import { OwnerContext } from "../../../../../Providers/LawyerOwner/OwnerProvider.js";
import AddSession from "./AddSession.jsx";

const Header = () => {
  const {
    openAddSession,
    setOpenAddSession,
    sessions = [],
  } = useContext(OwnerContext);

  const today = new Date();

  const todayString = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  const getDateString = (date) => {
    if (!date) return null;

    return new Date(date).toISOString().split("T")[0];
  };

  const todaySessions = sessions.filter(
    (session) =>
      getDateString(session.sessionDate) === todayString
  );

  return (
    <>
      {openAddSession && <AddSession />}

      <header className="w-full mb-7">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          {/* Right Side */}
          <div className="min-w-0">
            {/* Title */}
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-[22px] font-bold text-[#0B1C30]">
                الجلسات
              </h1>

              <span className="flex items-center gap-1 rounded-full bg-[#D5E0F8] px-2.5 py-1 text-[10px] font-bold text-[#45464D]">
                <Gavel size={11} />

                {todaySessions.length} جلسة اليوم
              </span>
            </div>

            {/* Description */}
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#45464D]">
              إدارة ومتابعة جميع جلسات القضايا ومواعيد الترافع،
              مع متابعة حالة كل جلسة والمحامي المسؤول عنها.
            </p>
          </div>

          {/* Left Side */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Export */}
            <button
              className="
                flex items-center gap-2
                rounded-lg
                border border-[#E7EBF2]
                bg-white
                px-4 py-2
                text-[10px]
                font-bold
                text-[#0B1C30]
                transition
                hover:border-[#D5DDEB]
                hover:bg-[#F8F9FB]
                active:scale-[0.98]
              "
            >
              <Download
                size={15}
                className="text-[#755B00]"
              />

              تصدير الجلسات
            </button>

            {/* Add Session */}
            <button
              onClick={() => {
                setOpenAddSession(true);
              }}
              className="
                flex items-center gap-2
                rounded-lg
                bg-[#111827]
                px-4 py-2
                text-[10px]
                font-bold
                text-white
                shadow-sm
                transition
                hover:bg-[#1D2738]
                active:scale-[0.98]
              "
            >
              <CalendarPlus size={15} />

              إضافة جلسة جديدة
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;