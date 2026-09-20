"use client";

import React, { useContext } from "react";
import {
  FaCalendarPlus,
  FaCalendarAlt,
} from "react-icons/fa";

import { LawyerContext } from "../../../../../Providers/LawyerContext/lawyer.js";
import { authContext } from "../../../../../Providers/AuthProvider/Auth.js";
import AddSession from "./AddSession.jsx";

const Header = () => {
  const { setOpenAddSession, openAddSession } =
    useContext(LawyerContext);

  const { isIndependentLawyer } = useContext(authContext);

  return (
    <>
      {openAddSession && isIndependentLawyer && <AddSession />}

      <div
        className="flex flex-col gap-4 p-5 mb-6 border shadow-lg rounded-2xl border-slate-700/50 bg-slate-900 sm:flex-row sm:items-center sm:justify-between"
      >
        {/* Title */}
        <div className="flex items-center gap-4">
          {/* Icon */}
          <div className="flex items-center justify-center w-12 h-12 shrink-0 rounded-xl bg-cyan-500/10 text-cyan-400">
            <FaCalendarAlt className="text-xl" />
          </div>

          {/* Text */}
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-white sm:text-2xl">
                الجلسات
              </h1>

              <span className="hidden rounded-full border border-cyan-500/20 bg-cyan-500/10 px-2.5 py-1 text-[11px] font-medium text-cyan-400 sm:inline-flex">
                إدارة الجلسات
              </span>
            </div>

            <p className="mt-1 text-sm text-slate-400">
              إدارة ومتابعة جلسات القضايا والمواعيد القادمة
            </p>
          </div>
        </div>

        {/* Add Button */}
        {isIndependentLawyer && (
          <button
            type="button"
            onClick={() => setOpenAddSession(true)}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/10 transition hover:bg-cyan-400 active:scale-[0.98] sm:w-auto"
          >
            <FaCalendarPlus className="text-sm" />
            إضافة جلسة
          </button>
        )}
      </div>
    </>
  );
};

export default Header;