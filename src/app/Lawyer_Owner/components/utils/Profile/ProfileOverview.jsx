"use client";

import React, { useContext } from "react";
import {
  Camera,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { authContext } from "../../../../../Providers/AuthProvider/Auth.js";

const ProfileOverview = () => {
  const { profile } = useContext(authContext);

  const user = profile?.user || profile || {};

  const roleLabel = {
    admin: "مدير النظام",
    office_owner: "مدير المكتب",
    lawyer: "محامي ومستشار قانوني",
  };

  const role = roleLabel[user?.role] || "مستخدم";

  const profileImage = user?.profileImage?.url;

  const location =
    user?.officeId?.city || user?.officeId?.country
      ? `${user?.officeId?.city || ""}${
          user?.officeId?.city && user?.officeId?.country
            ? "، "
            : ""
        }${user?.officeId?.country || ""}`
      : "غير محدد";

  return (
    <section dir="rtl" className="mb-7">
      <div className="overflow-hidden rounded-xl border border-[#E6E8EC] bg-white shadow-[0_2px_8px_rgba(11,28,48,0.03)]">
        {/* Top Cover */}
        <div className="h-28 bg-gradient-to-l from-[#0B1C30] via-[#142A42] to-[#1D3856]" />

        {/* Profile Content */}
        <div className="px-5 pb-5">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            {/* Profile Info */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
              {/* Profile Image */}
              <div className="relative -mt-14 shrink-0">
                <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-2xl border-4 border-white bg-[#EAF0FF] shadow-md">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt={user?.name || "صورة المستخدم"}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full text-3xl font-bold text-[#4868B4]">
                      {user?.name?.charAt(0) || "م"}
                    </div>
                  )}
                </div>

                {/* Camera Button */}
                <button
                  className="
                    absolute bottom-1 left-1
                    flex h-8 w-8 items-center justify-center
                    rounded-full
                    border-2 border-white
                    bg-[#0B1C30]
                    text-white
                    shadow-sm
                    transition hover:bg-[#142A42]
                  "
                  title="تغيير الصورة"
                  type="button"
                >
                  <Camera size={14} />
                </button>
              </div>

              {/* Name */}
              <div className="pb-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-[19px] font-bold text-[#0B1C30]">
                    {user?.name || "غير محدد"}
                  </h2>

                  <span className="flex items-center gap-1 rounded-full bg-[#EAF7F0] px-2.5 py-1 text-[9px] font-bold text-[#25804D]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#25804D]" />
                    {user?.isActive ? "نشط" : "غير نشط"}
                  </span>
                </div>

                <p className="mt-1 text-[11px] font-semibold text-[#59616D]">
                  {role}
                </p>

                <p className="mt-1 text-[10px] text-[#8A9099]">
                  {user?.officeId?.name
                    ? `عضو في ${user.officeId.name}`
                    : "بيانات الحساب الشخصي"}
                </p>
              </div>
            </div>

            {/* Profile Badge */}
            <div className="flex items-center gap-2 rounded-lg border border-[#E5E8ED] bg-[#FAFBFC] px-3 py-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EAF0FF]">
                <ShieldCheck
                  size={16}
                  className="text-[#4868B4]"
                />
              </div>

              <div>
                <p className="text-[9px] text-[#8A9099]">
                  حالة الحساب
                </p>

                <p
                  className={`mt-0.5 text-[10px] font-bold ${
                    user?.isActive
                      ? "text-[#25804D]"
                      : "text-[#B42318]"
                  }`}
                >
                  {user?.isActive
                    ? "حساب موثق ونشط"
                    : "الحساب غير نشط"}
                </p>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-6 grid grid-cols-1 gap-3 border-t border-[#EEF0F3] pt-5 sm:grid-cols-2 xl:grid-cols-3">
            {/* Email */}
            <div className="flex items-center gap-3 rounded-lg border border-[#EEF0F3] bg-[#FAFBFC] p-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#EAF0FF]">
                <Mail size={15} className="text-[#4868B4]" />
              </div>

              <div className="min-w-0">
                <p className="text-[9px] text-[#8A9099]">
                  البريد الإلكتروني
                </p>

                <p className="mt-1 truncate text-[10px] font-semibold text-[#45464D]">
                  {user?.email || "غير محدد"}
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-3 rounded-lg border border-[#EEF0F3] bg-[#FAFBFC] p-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#EAF7F0]">
                <Phone size={15} className="text-[#25804D]" />
              </div>

              <div>
                <p className="text-[9px] text-[#8A9099]">
                  رقم الهاتف
                </p>

                <p className="mt-1 text-[10px] font-semibold text-[#45464D]">
                  {user?.phone || "غير محدد"}
                </p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-3 rounded-lg border border-[#EEF0F3] bg-[#FAFBFC] p-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#FFF4D6]">
                <MapPin
                  size={15}
                  className="text-[#8A6A00]"
                />
              </div>

              <div>
                <p className="text-[9px] text-[#8A9099]">
                  الموقع
                </p>

                <p className="mt-1 text-[10px] font-semibold text-[#45464D]">
                  {location}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileOverview;