"use client";

import React, { useContext } from "react";
import { FiPlus, FiSearch } from "react-icons/fi";
import { AdminContext } from "../../../../../Providers/AdminContext/Admin.js";
import AddUser from "./AddUser.jsx";

const Header = () => {
  const { openAddUser, setOpenAddUser } = useContext(AdminContext);
  return (
    <>
      {openAddUser && <AddUser />}
      <div className="flex flex-col gap-4 p-5 bg-white border shadow-sm rounded-2xl border-slate-200 md:flex-row md:items-center md:justify-between">
        {/* Title */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900">المستخدمين</h1>

          <p className="mt-1 text-sm text-slate-500">
            إدارة حسابات المستخدمين والصلاحيات داخل النظام
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 sm:flex-row">
          {/* Search */}

          {/* Add User */}
          <button
            onClick={() => {
              setOpenAddUser(true);
            }}
            type="button"
            className="flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98]"
          >
            <FiPlus size={19} />
            إضافة مستخدم
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
