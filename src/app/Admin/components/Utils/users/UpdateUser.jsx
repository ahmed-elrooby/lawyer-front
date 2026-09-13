"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  FaTimes,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCamera,
  FaImage,
  FaSave,
  FaSpinner,
  FaTrash,
} from "react-icons/fa";

import { AdminContext } from "../../../../../Providers/AdminContext/Admin.js";

const UpdateUser = ({ user }) => {
  const { openUpdateUser, setOpenUpdateUser, handleUpdateUserFun, loadding } =
    useContext(AdminContext);

  const fileInputRef = useRef(null);

  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // الصورة الحالية من السيرفر
  const currentImage = user?.profileImage?.url || null;

  // تنظيف الصورة عند إغلاق المودال
  useEffect(() => {
    if (!openUpdateUser) {
      setSelectedImage(null);
      setPreview(null);
    }
  }, [openUpdateUser]);

  // تنظيف Object URL
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  if (!openUpdateUser || !user) return null;

  const initialValues = {
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    role: user?.role || "",
    isActive: user?.isActive || false,
    profileImage: currentImage,
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .trim()
      .min(2, "الاسم يجب أن يكون حرفين على الأقل")
      .required("الاسم مطلوب"),

    email: Yup.string()
      .trim()
      .email("البريد الإلكتروني غير صحيح")
      .required("البريد الإلكتروني مطلوب"),

    phone: Yup.string()
      .trim()
      .matches(/^01[0125][0-9]{8}$/, "رقم الهاتف المصري غير صحيح")
      .required("رقم الهاتف مطلوب"),
  });

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    // نوع الملف
    if (!file.type.startsWith("image/")) {
      return;
    }

    // الحد الأقصى 5MB
    if (file.size > 5 * 1024 * 1024) {
      return;
    }

    // تنظيف preview القديم
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setSelectedImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const removeSelectedImage = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setSelectedImage(null);
    setPreview(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-950/60 px-3 py-4 backdrop-blur-sm sm:px-4 sm:py-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          setOpenUpdateUser(false);
        }
      }}
    >
      <div
        dir="rtl"
        className="flex w-full max-w-2xl max-h-[92vh] flex-col overflow-hidden rounded-3xl bg-white shadow-2xl"
      >
        {/* =========================
            Header
        ========================= */}
        <div className="relative px-4 py-4 text-white border-b shrink-0 border-slate-100 bg-gradient-to-l from-blue-600 to-indigo-600 sm:px-6 sm:py-5">
          <button
            type="button"
            onClick={() => setOpenUpdateUser(false)}
            className="absolute flex items-center justify-center transition left-4 top-4 h-9 w-9 rounded-xl bg-white/10 hover:bg-white/20 sm:left-5 sm:top-5"
          >
            <FaTimes size={14} />
          </button>

          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/15 sm:w-12 sm:h-12 sm:rounded-2xl">
              <FaUser size={18} />
            </div>

            <div className="pl-10 sm:pl-12">
              <h2 className="text-lg font-bold sm:text-xl">
                تعديل بيانات المستخدم
              </h2>

              <p className="mt-1 text-xs text-blue-100 sm:text-sm">
                تحديث بيانات الحساب والصورة الشخصية
              </p>
            </div>
          </div>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={(values) => {
            handleUpdateUserFun({
              id: user?._id || user?.id,
              values: {
                ...values,
                profileImage: selectedImage,
              },
            });
          }}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col min-h-0">
              {/* =========================
                  Scrollable Content
              ========================= */}
              <div className="flex-1 min-h-0 p-4 overflow-y-auto custom-scrollbar sm:p-6">
                {/* =========================
                    Profile Image
                ========================= */}
                <div className="mb-5 sm:mb-7">
                  <label className="block mb-3 text-sm font-bold text-slate-700">
                    الصورة الشخصية
                  </label>

                  <div className="flex flex-col items-center justify-center p-4 border rounded-2xl border-slate-200 bg-slate-50 sm:p-6">
                    <div className="relative">
                      <div className="flex items-center justify-center w-24 h-24 overflow-hidden border-4 border-white rounded-full shadow-lg sm:h-28 sm:w-28 bg-gradient-to-br from-blue-100 to-indigo-100">
                        {preview || currentImage ? (
                          <img
                            src={preview || currentImage}
                            alt={user?.name || "User"}
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <FaUser
                            size={34}
                            className="text-blue-500 sm:text-[38px]"
                          />
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute bottom-0 left-0 flex items-center justify-center w-8 h-8 text-white transition bg-blue-600 border-4 border-white rounded-full shadow-md hover:bg-blue-700 sm:h-9 sm:w-9"
                      >
                        <FaCamera size={12} />
                      </button>
                    </div>

                    <div className="mt-3 text-center sm:mt-4">
                      <p className="text-sm font-semibold text-slate-800">
                        {user?.name}
                      </p>

                      <p className="mt-1 text-[11px] text-slate-500 sm:text-xs">
                        JPG, JPEG أو PNG — الحد الأقصى 5MB
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-2 mt-3 sm:mt-4">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-blue-600 transition rounded-xl bg-blue-50 hover:bg-blue-100 sm:px-4 sm:text-sm"
                      >
                        <FaImage size={13} />
                        تغيير الصورة
                      </button>

                      {selectedImage && (
                        <button
                          type="button"
                          onClick={removeSelectedImage}
                          className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-red-600 transition rounded-xl bg-red-50 hover:bg-red-100 sm:px-4 sm:text-sm"
                        >
                          <FaTrash size={12} />
                          إلغاء
                        </button>
                      )}
                    </div>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/png,image/jpeg,image/jpg"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </div>
                </div>

                {/* =========================
                    Inputs
                ========================= */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 sm:gap-5">
                  {/* Name */}
                  <div>
                    <label className="block mb-2 text-sm font-bold text-slate-700">
                      الاسم الكامل
                    </label>

                    <div className="relative">
                      <FaUser className="absolute -translate-y-1/2 right-4 top-1/2 text-slate-400" />

                      <Field
                        name="name"
                        type="text"
                        placeholder="أدخل الاسم الكامل"
                        className="w-full py-3 pl-4 text-sm transition border outline-none rounded-xl border-slate-200 bg-slate-50 pr-11 text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                      />
                    </div>

                    <ErrorMessage
                      name="name"
                      component="p"
                      className="mt-1.5 text-xs font-medium text-red-500"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block mb-2 text-sm font-bold text-slate-700">
                      البريد الإلكتروني
                    </label>

                    <div className="relative">
                      <FaEnvelope className="absolute -translate-y-1/2 right-4 top-1/2 text-slate-400" />

                      <Field
                        name="email"
                        type="email"
                        placeholder="example@email.com"
                        dir="ltr"
                        className="w-full py-3 pl-4 text-sm transition border outline-none rounded-xl border-slate-200 bg-slate-50 pr-11 text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                      />
                    </div>

                    <ErrorMessage
                      name="email"
                      component="p"
                      className="mt-1.5 text-xs font-medium text-red-500"
                    />
                  </div>

                  {/* Phone */}
                  <div className="md:col-span-2">
                    <label className="block mb-2 text-sm font-bold text-slate-700">
                      رقم الهاتف
                    </label>

                    <div className="relative">
                      <FaPhone className="absolute -translate-y-1/2 right-4 top-1/2 text-slate-400" />

                      <Field
                        name="phone"
                        type="tel"
                        placeholder="01xxxxxxxxx"
                        dir="ltr"
                        className="w-full py-3 pl-4 text-sm transition border outline-none rounded-xl border-slate-200 bg-slate-50 pr-11 text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                      />
                    </div>

                    <ErrorMessage
                      name="phone"
                      component="p"
                      className="mt-1.5 text-xs font-medium text-red-500"
                    />
                  </div>
                </div>

                {/* =========================
                    User Info
                ========================= */}
                <div className="p-3 mt-5 border border-blue-100 rounded-2xl bg-blue-50/60 sm:p-4 sm:mt-6">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-slate-500">
                        البريد الحالي
                      </p>

                      <p className="mt-1 text-sm font-semibold truncate text-slate-800">
                        {user?.email || "—"}
                      </p>
                    </div>

                    <div className="hidden w-px h-8 bg-blue-100 sm:block" />

                    <div>
                      <p className="text-xs font-medium text-slate-500">
                        نوع الحساب
                      </p>

                      <p className="mt-1 text-sm font-semibold text-blue-600">
                        {user?.role === "office_owner"
                          ? "صاحب مكتب"
                          : user?.role === "lawyer"
                            ? "محامي"
                            : user?.role || "—"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* =========================
                  Footer
              ========================= */}
              <div className="flex flex-col-reverse gap-2 px-4 py-3 border-t shrink-0 border-slate-100 bg-slate-50 sm:flex-row sm:justify-end sm:gap-3 sm:px-6 sm:py-4">
                <button
                  type="button"
                  onClick={() => setOpenUpdateUser(false)}
                  disabled={isSubmitting || loadding}
                  className="w-full px-6 py-2.5 text-sm font-bold transition bg-white border rounded-xl sm:w-auto sm:py-3 border-slate-200 text-slate-600 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  إلغاء
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting || loadding}
                  className="flex items-center justify-center w-full gap-2 px-7 py-2.5 text-sm font-bold text-white transition shadow-lg rounded-xl sm:w-auto sm:py-3 bg-gradient-to-l from-blue-600 to-indigo-600 shadow-blue-600/20 hover:from-blue-700 hover:to-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loadding ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      جاري الحفظ...
                    </>
                  ) : (
                    <>
                      <FaSave />
                      حفظ التعديلات
                    </>
                  )}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UpdateUser;
