"use client";
import React, { useContext } from "react";
import { UserRound, Pencil } from "lucide-react";
import { authContext } from "../../../../../Providers/AuthProvider/Auth.js";
import UpdateProfile from "./UpdateProfile.jsx";

const Header = () => {
  const {setOpenUpdateProfile,openUpdateProfile}=useContext(authContext)
  return <>
{
  openUpdateProfile && <UpdateProfile/>
}
 
    <header  className="w-full mb-7">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">

        {/* Right Side */}
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-[22px] font-bold text-[#0B1C30]">
              الملف الشخصي
            </h1>

            <span className="flex items-center gap-1.5 rounded-full bg-[#EAF0FF] px-2.5 py-1 text-[10px] font-bold text-[#4868B4]">
              <UserRound size={11} />
              حسابي
            </span>
          </div>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#45464D]">
            إدارة بياناتك الشخصية ومعلومات الحساب وبيانات المكتب
            وإعدادات الأمان الخاصة بك.
          </p>
        </div>

        {/* Left Side */}
        <div className="flex flex-wrap items-center gap-2">
          <button
          onClick={()=>{
            setOpenUpdateProfile(true)
          }}
            className="
              flex h-10 items-center gap-2
              rounded-lg
              bg-[#0B1C30]
              px-4
              text-[11px] font-bold text-white
              shadow-sm
              transition
              hover:bg-[#142A42]
            "
          >
            <Pencil size={15} />
            تعديل الملف الشخصي
          </button>
        </div>

      </div>
    </header>
  </>
};

export default Header;