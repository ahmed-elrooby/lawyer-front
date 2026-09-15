"use client";

import React, { useContext } from "react";
import { FaPlus, FaStickyNote } from "react-icons/fa";
import { LawyerContext } from "../../../../../Providers/LawyerContext/lawyer.js";
import AddNotes from "./AddNotes.jsx";

const Header = () => {
  const { 
        openAddNote,
        setOpenAddNote, } = useContext(LawyerContext);

  return<>
  {
    openAddNote && <AddNotes/>
  }
  
 
    <div  className="mb-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Title */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400">
            <FaStickyNote className="text-xl" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-white">
              الملاحظات
            </h1>

            <p className="mt-1 text-sm text-slate-400">
              إدارة ومتابعة ملاحظات القضايا الخاصة بك
            </p>
          </div>
        </div>

        {/* Add Button */}
        <button
          type="button"
          onClick={()=>{
            setOpenAddNote(true)
          }}
          className="flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/10 transition hover:bg-cyan-600 active:scale-[0.98]"
        >
          <FaPlus />
          <span>إضافة ملاحظة</span>
        </button>
      </div>
    </div>
   </>
};

export default Header;