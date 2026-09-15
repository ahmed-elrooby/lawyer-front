
"use client";

import React, { useContext } from "react";
import { Users, Search, Upload, Plus } from "lucide-react";
import { LawyerContext } from "../../../../../Providers/LawyerContext/lawyer.js";
import AddClient from "./AddClient.jsx";

const Header = () => {
  const {openAddClient,
        setOpenAddClient}=useContext(LawyerContext)
  return <>
  {
    openAddClient && <AddClient/>
  }
 
    <div className="w-full p-5 mb-8 border rounded-2xl border-slate-700/50 bg-gradient-to-br from-slate-900 to-slate-800 md:p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        {/* Title */}
        <div className="flex items-center min-w-0 gap-3">
          <div className="p-3 border shrink-0 rounded-xl border-white/10 bg-emerald-500/10">
            <Users className="w-6 h-6 text-emerald-400" />
          </div>

          <div className="min-w-0">
            <h1 className="text-2xl font-bold text-white md:text-3xl">
              العملاء
            </h1>

            <p className="mt-1 text-sm text-slate-400">
              إدارة العملاء والقضايا والجلسات الخاصة بهم
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col w-full gap-3 sm:flex-row lg:w-auto">

    

          {/* Import */}
      

          {/* Add */}
          <button
            type="button"
            onClick={()=>{
              setOpenAddClient(true)
            }}
            className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:from-emerald-500 hover:to-teal-500"
          >
            <Plus className="w-5 h-5" />
            إضافة عميل
          </button>

        </div>
      </div>
    </div>
  </>
};

export default Header;
