"use client";

import React, { useContext, useState } from "react";
import {
  FaUserShield,
  FaEnvelope,
  FaPhone,
  FaCalendarAlt,
  FaClock,
  FaShieldAlt,
  FaEdit,
  FaCheckCircle,
  FaLock,
  FaSignOutAlt,
} from "react-icons/fa";
import { authContext } from "../../../../Providers/AuthProvider/Auth.js";
import UpdateProfile from "./UpdateProfile.jsx";

const Profile = () => {
  const { profile,openUpdateProfile, setOpenUpdateProfile,handleLogoutFun } = useContext(authContext);
const [selectProfile,setSelectProfile]=useState(null)
  const user = profile?.user;

  if (!user) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 mx-auto mb-4 border-4 rounded-full animate-spin border-slate-200 border-t-blue-600" />
          <p className="text-sm font-medium text-slate-500">
            جاري تحميل بيانات الملف الشخصي...
          </p>
        </div>
      </div>
    );
  }

  const formatDate = (date) => {
    if (!date) return "غير متوفر";

    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatDateTime = (date) => {
    if (!date) return "غير متوفر";

    return new Date(date).toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getInitials = (name = "") => {
    const words = name.trim().split(" ");

    if (words.length >= 2) {
      return `${words[0][0]}${words[1][0]}`.toUpperCase();
    }

    return name.slice(0, 2).toUpperCase();
  };

  return <>
{
    openUpdateProfile && <UpdateProfile selectProfile={selectProfile}/>
}
 
    <div className="min-h-screen p-4 bg-slate-50 sm:p-6 lg:p-8" dir="rtl">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-7">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            الملف الشخصي
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            إدارة معلومات حسابك الشخصي وإعدادات الأمان
          </p>
        </div>

        {/* Profile Hero */}
        <div className="relative mb-6 overflow-hidden bg-white border shadow-sm rounded-3xl border-slate-200">
          {/* Cover */}
          <div className="relative overflow-hidden h-36 bg-gradient-to-l from-slate-950 via-slate-900 to-blue-900 sm:h-44">
            <div className="absolute w-64 h-64 rounded-full -right-16 -top-24 bg-blue-500/10 blur-2xl" />
            <div className="absolute rounded-full -bottom-32 left-10 h-72 w-72 bg-blue-400/10 blur-3xl" />

            <div className="absolute inset-0 opacity-20">
              <div
                className="w-full h-full"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                  backgroundSize: "24px 24px",
                }}
              />
            </div>
          </div>

          {/* Profile Content */}
          <div className="relative px-5 pb-6 sm:px-8">
            <div className="flex flex-col gap-5 -mt-14 sm:-mt-16 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end">
                {/* Avatar */}
                <div className="relative">
                  <div className="flex items-center justify-center overflow-hidden text-3xl font-bold text-white border-4 border-white shadow-xl h-28 w-28 rounded-3xl bg-gradient-to-br from-blue-600 to-blue-800">
                    {user?.profileImage?.url ? (
                      <img
                        src={user.profileImage.url}
                        alt={user.name}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      getInitials(user.name)
                    )}
                  </div>

                  <span className="absolute flex items-center justify-center w-5 h-5 border-2 border-white rounded-full bottom-2 left-2 bg-emerald-500">
                    <span className="w-2 h-2 bg-white rounded-full" />
                  </span>
                </div>

                {/* Name */}
                <div className="pb-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-2xl font-bold text-slate-900">
                      {user.name}
                    </h2>

                    <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-bold text-blue-700 rounded-full bg-blue-50">
                      <FaUserShield />
                      مدير النظام
                    </span>
                  </div>

                  <p className="mt-1 text-sm text-slate-500">
                    {user.email}
                  </p>

                  <div className="flex items-center gap-2 mt-3">
                    <span className="flex w-2 h-2 rounded-full bg-emerald-500" />

                    <span className="text-xs font-semibold text-emerald-600">
                      الحساب نشط
                    </span>
                  </div>
                </div>
              </div>

              {/* Edit */}
              <button
              onClick={()=>{
                setSelectProfile(user)
                setOpenUpdateProfile(true)
              }}
                type="button"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-bold text-white transition rounded-xl bg-slate-900 hover:bg-slate-800"
              >
                <FaEdit />
                تعديل الملف الشخصي
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="p-5 bg-white border shadow-sm rounded-2xl border-slate-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-400">
                  تاريخ إنشاء الحساب
                </p>

                <p className="mt-2 text-lg font-bold text-slate-900">
                  {formatDate(user.createdAt)}
                </p>
              </div>

              <div className="flex items-center justify-center text-blue-600 h-11 w-11 rounded-xl bg-blue-50">
                <FaCalendarAlt />
              </div>
            </div>
          </div>

          <div className="p-5 bg-white border shadow-sm rounded-2xl border-slate-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-400">
                  آخر تسجيل دخول
                </p>

                <p className="mt-2 text-lg font-bold text-slate-900">
                  {formatDateTime(user.lastLogin)}
                </p>
              </div>

              <div className="flex items-center justify-center h-11 w-11 rounded-xl bg-emerald-50 text-emerald-600">
                <FaClock />
              </div>
            </div>
          </div>

          <div className="p-5 bg-white border shadow-sm rounded-2xl border-slate-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-400">
                  حالة الحساب
                </p>

                <p className="mt-2 text-lg font-bold text-emerald-600">
                  نشط
                </p>
              </div>

              <div className="flex items-center justify-center h-11 w-11 rounded-xl bg-emerald-50 text-emerald-600">
                <FaCheckCircle />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Personal Information */}
          <div className="lg:col-span-2">
            <div className="overflow-hidden bg-white border shadow-sm rounded-2xl border-slate-200">
              <div className="px-6 py-5 border-b border-slate-100">
                <h3 className="text-lg font-bold text-slate-900">
                  المعلومات الشخصية
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  البيانات الأساسية الخاصة بحسابك
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 p-6 sm:grid-cols-2">
                {/* Name */}
                <div>
                  <label className="block mb-2 text-xs font-bold text-slate-500">
                    الاسم بالكامل
                  </label>

                  <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5">
                    <FaUserShield className="text-slate-400" />

                    <span className="text-sm font-semibold text-slate-800">
                      {user.name}
                    </span>
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block mb-2 text-xs font-bold text-slate-500">
                    البريد الإلكتروني
                  </label>

                  <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5">
                    <FaEnvelope className="text-slate-400" />

                    <span
                      dir="ltr"
                      className="text-sm font-semibold text-slate-800"
                    >
                      {user.email}
                    </span>
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block mb-2 text-xs font-bold text-slate-500">
                    رقم الهاتف
                  </label>

                  <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5">
                    <FaPhone className="text-slate-400" />

                    <span
                      dir="ltr"
                      className="text-sm font-semibold text-slate-800"
                    >
                      {user.phone || "غير متوفر"}
                    </span>
                  </div>
                </div>

                {/* Role */}
                <div>
                  <label className="block mb-2 text-xs font-bold text-slate-500">
                    نوع الحساب
                  </label>

                  <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5">
                    <FaShieldAlt className="text-slate-400" />

                    <span className="text-sm font-semibold text-slate-800">
                      مدير النظام
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Security */}
          <div>
            <div className="overflow-hidden bg-white border shadow-sm rounded-2xl border-slate-200">
              <div className="px-6 py-5 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 text-blue-600 rounded-xl bg-blue-50">
                    <FaLock />
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      أمان الحساب
                    </h3>

                    <p className="mt-1 text-xs text-slate-500">
                      إدارة حماية حسابك
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-4">
                
                <div className="p-4 border rounded-xl border-emerald-100 bg-emerald-50">
                  <div className="flex items-start gap-3">
                    <FaCheckCircle className="mt-0.5 text-emerald-600" />

                    <div>
                      <p className="text-sm font-bold text-emerald-800">
                        الحساب مؤمن
                      </p>

                      <p className="mt-1 text-xs leading-5 text-emerald-700">
                        حسابك نشط وجميع بيانات المصادقة الأساسية مفعلة.
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleLogoutFun}
                  className="flex items-center justify-center w-full gap-2 px-4 py-3 text-sm font-bold text-red-600 transition border border-red-200 rounded-xl bg-red-50 hover:bg-red-100"
                >
                  <FaSignOutAlt />
                  تسجيل الخروج من جميع الأجهزة
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Account Details */}
        <div className="mt-6 overflow-hidden bg-white border shadow-sm rounded-2xl border-slate-200">
          <div className="px-6 py-5 border-b border-slate-100">
            <h3 className="text-lg font-bold text-slate-900">
              معلومات الحساب
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              معلومات تقنية مرتبطة بحسابك
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 p-6 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <p className="text-xs font-semibold text-slate-400">
                معرف المستخدم
              </p>

              <p
                dir="ltr"
                className="mt-2 text-sm font-semibold break-all text-slate-700"
              >
                {user._id}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-400">
                تاريخ إنشاء الحساب
              </p>

              <p className="mt-2 text-sm font-semibold text-slate-700">
                {formatDate(user.createdAt)}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-400">
                آخر تحديث
              </p>

              <p className="mt-2 text-sm font-semibold text-slate-700">
                {formatDateTime(user.updatedAt)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
};

export default Profile;