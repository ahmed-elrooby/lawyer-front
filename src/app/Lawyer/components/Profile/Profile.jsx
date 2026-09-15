
"use client";

import React, { useContext } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaBriefcase,
  FaCalendarAlt,
  FaCircle,
  FaBuilding,
  FaEdit,
  FaSignOutAlt,
} from "react-icons/fa";

import { authContext } from "../../../../Providers/AuthProvider/Auth.js";
import UpdateProfile from "./UpdateProfile.jsx";

const Profile = () => {
  const {
    profile,

    setOpenUpdateProfile,openUpdateProfile,
    handleLogoutFun,
  } = useContext(authContext);

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-slate-400">جاري تحميل البيانات...</p>
      </div>
    );
  }

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("ar-EG", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const roleName = {
    admin: "مدير النظام",
    office_owner: "مالك مكتب",
    lawyer: "محامي",
  };

  return <>
{
    openUpdateProfile && <UpdateProfile/>
}
  
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          الملف الشخصي
        </h1>

        <p className="mt-1 text-slate-400">
          عرض وإدارة بيانات حسابك الشخصية
        </p>
      </div>

      {/* Profile Header */}
      <div className="overflow-hidden border bg-slate-900 border-slate-700/50 rounded-2xl">
        <div className="h-32 bg-gradient-to-l from-slate-800 to-slate-900" />

        <div className="px-6 pb-6">
          <div className="flex flex-col gap-4 -mt-12 sm:flex-row sm:items-end">
            {/* Image */}
            <div className="flex items-center justify-center w-24 h-24 overflow-hidden border-4 rounded-2xl bg-slate-800 border-slate-900 shrink-0">
              {profile?.user?.profileImage?.url ? (
                <img
                  src={profile?.user?.profileImage?.url}
                  alt={profile?.user?.name || "Profile"}
                  className="object-cover w-full h-full"
                />
              ) : (
                <FaUser className="text-3xl text-slate-500" />
              )}
            </div>

            {/* Name */}
            <div className="flex-1 pb-1">
              <h2 className="text-xl font-bold text-white">
                {profile?.user?.name || "-"}
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                {roleName[profile?.user?.role] ||
                  profile?.user?.role ||
                  "-"}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3 pb-1">
              {/* Status */}
              <span
                className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold ${
                  profile?.user?.isActive
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "bg-red-500/10 text-red-400"
                }`}
              >
                <FaCircle className="text-[7px]" />

                {profile?.user?.isActive
                  ? "الحساب نشط"
                  : "الحساب غير نشط"}
              </span>

              {/* Edit */}
              <button
                type="button"
                onClick={() => setOpenUpdateProfile(true)}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-blue-400 transition border rounded-xl bg-blue-500/10 hover:bg-blue-500/20 border-blue-500/20"
              >
                <FaEdit />
                تعديل الملف
              </button>

              {/* Logout */}
              <button
                type="button"
                onClick={handleLogoutFun}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-red-400 transition border rounded-xl bg-red-500/10 hover:bg-red-500/20 border-red-500/20"
              >
                <FaSignOutAlt />
                تسجيل الخروج
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="overflow-hidden border bg-slate-900 border-slate-700/50 rounded-2xl">
        <div className="px-6 py-5 border-b border-slate-700/50">
          <h2 className="font-bold text-white">
            البيانات الشخصية
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            المعلومات الأساسية الخاصة بحسابك
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">
          {/* Name */}
          <div className="p-4 bg-slate-800/50 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-500/10">
                <FaUser className="text-blue-400" />
              </div>

              <div>
                <p className="mb-1 text-xs text-slate-500">
                  الاسم
                </p>

                <p className="text-sm font-semibold text-white">
                  {profile?.user?.name || "-"}
                </p>
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="p-4 bg-slate-800/50 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-purple-500/10">
                <FaEnvelope className="text-purple-400" />
              </div>

              <div className="min-w-0">
                <p className="mb-1 text-xs text-slate-500">
                  البريد الإلكتروني
                </p>

                <p className="text-sm font-semibold text-white truncate">
                  {profile?.user?.email || "-"}
                </p>
              </div>
            </div>
          </div>

          {/* Phone */}
          <div className="p-4 bg-slate-800/50 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-500/10">
                <FaPhone className="text-emerald-400" />
              </div>

              <div>
                <p className="mb-1 text-xs text-slate-500">
                  رقم الهاتف
                </p>

                <p className="text-sm font-semibold text-white">
                  {profile?.user?.phone || "-"}
                </p>
              </div>
            </div>
          </div>

          {/* Role */}
          <div className="p-4 bg-slate-800/50 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-orange-500/10">
                <FaBriefcase className="text-orange-400" />
              </div>

              <div>
                <p className="mb-1 text-xs text-slate-500">
                  نوع الحساب
                </p>

                <p className="text-sm font-semibold text-white">
                  {roleName[profile?.user?.role] || "-"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Account Information */}
      <div className="overflow-hidden border bg-slate-900 border-slate-700/50 rounded-2xl">
        <div className="px-6 py-5 border-b border-slate-700/50">
          <h2 className="font-bold text-white">
            معلومات الحساب
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">
          {/* Created At */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-slate-800">
              <FaCalendarAlt className="text-slate-400" />
            </div>

            <div>
              <p className="text-xs text-slate-500">
                تاريخ إنشاء الحساب
              </p>

              <p className="mt-1 text-sm font-medium text-white">
                {formatDate(profile?.user?.createdAt)}
              </p>
            </div>
          </div>

          {/* Last Login */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-slate-800">
              <FaCircle className="text-xs text-emerald-400" />
            </div>

            <div>
              <p className="text-xs text-slate-500">
                آخر تسجيل دخول
              </p>

              <p className="mt-1 text-sm font-medium text-white">
                {formatDate(profile?.user?.lastLogin)}
              </p>
            </div>
          </div>

          {/* Office */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-slate-800">
              <FaBuilding className="text-slate-400" />
            </div>

            <div>
              <p className="text-xs text-slate-500">
                المكتب
              </p>

              <p className="mt-1 text-sm font-medium text-white">
                {profile?.user?.officeId
                  ? "تابع لمكتب"
                  : "محامي مستقل"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div></>

};

export default Profile;
