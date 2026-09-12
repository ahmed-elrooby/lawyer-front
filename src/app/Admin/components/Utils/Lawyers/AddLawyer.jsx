"use client";

import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import {
  FaUserTie,
  FaTimes,
  FaSave,
  FaSpinner,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaCamera,
  FaImage,
} from "react-icons/fa";

import { AdminContext } from "../../../../../Providers/AdminContext/Admin.js";

const AddLawyer = () => {
  const { openAddLawyer, setOpenAddLawyer, handleAddLawyerFun, loadding } =
    useContext(AdminContext);

  const [showPassword, setShowPassword] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const initialValues = {
    name: "",
    email: "",
    password: "",
    phone: "",
    profileImage: null,
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .trim()
      .min(2, "الاسم يجب أن يكون حرفين على الأقل")
      .required("اسم المحامي مطلوب"),

    email: Yup.string()
      .email("البريد الإلكتروني غير صحيح")
      .required("البريد الإلكتروني مطلوب"),

    password: Yup.string()
      .min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل")
      .required("كلمة المرور مطلوبة"),

    phone: Yup.string()
      .matches(/^(01)[0-9]{9}$/, "رقم الهاتف يجب أن يكون رقم مصري صحيح")
      .required("رقم الهاتف مطلوب"),

    profileImage: Yup.mixed()
      .nullable()
      .test("fileSize", "حجم الصورة يجب ألا يتجاوز 5MB", (value) => {
        if (!value) return true;

        return value.size <= 5 * 1024 * 1024;
      })
      .test(
        "fileType",
        "الصورة يجب أن تكون JPG أو JPEG أو PNG أو WEBP",
        (value) => {
          if (!value) return true;

          return [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/webp",
          ].includes(value.type);
        },
      ),
  });

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  if (!openAddLawyer) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-950/60 p-3 backdrop-blur-sm sm:p-4">
      {/* Overlay */}
      <button
        type="button"
        aria-label="إغلاق"
        onClick={() => !loadding && setOpenAddLawyer(false)}
        className="absolute inset-0 cursor-default"
      />

      {/* Modal */}
      <div className="relative z-10 flex w-full max-w-xl max-h-[90vh] flex-col overflow-hidden rounded-3xl border border-white/60 bg-white shadow-2xl shadow-slate-900/20">
        {/* Top Gradient */}
        <div className="absolute top-0 left-0 z-20 w-full h-1 bg-gradient-to-l from-blue-600 via-indigo-500 to-blue-400" />

        {/* ================= HEADER ================= */}
        <div className="relative px-5 pb-5 border-b shrink-0 border-slate-100 pt-7 sm:px-7">
          {/* Decorative Background */}
          <div className="absolute w-32 h-32 rounded-full -left-12 -top-12 bg-blue-500/5 blur-2xl" />

          <div className="absolute top-0 rounded-full -right-10 h-28 w-28 bg-indigo-500/5 blur-2xl" />

          <div className="relative flex items-start justify-between gap-4">
            {/* Title */}
            <div className="flex items-center min-w-0 gap-4">
              <div className="flex items-center justify-center shadow-lg h-14 w-14 shrink-0 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-blue-500/20">
                <FaUserTie className="text-xl text-white" />
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-lg font-bold tracking-tight text-slate-800 sm:text-xl">
                    إضافة محامي جديد
                  </h2>

                  <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[9px] font-bold text-blue-600 sm:text-[10px]">
                    NEW LAWYER
                  </span>
                </div>

                <p className="mt-1.5 text-xs leading-5 text-slate-500 sm:text-sm">
                  أدخل بيانات المحامي لإنشاء حساب جديد على المنصة
                </p>
              </div>
            </div>

            {/* Close */}
            <button
              type="button"
              onClick={() => !loadding && setOpenAddLawyer(false)}
              disabled={loadding}
              className="flex items-center justify-center w-10 h-10 transition-all bg-white border shrink-0 rounded-xl border-slate-200 text-slate-400 hover:border-red-200 hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <FaTimes />
            </button>
          </div>
        </div>

        {/* ================= FORMIK ================= */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleAddLawyerFun}
        >
          {({ isSubmitting, setFieldValue, values }) => (
            <>
              {/* ================= SCROLL CONTENT ================= */}
              <Form
                id="add-lawyer-form"
                className="flex-1 min-h-0 px-5 py-6 overflow-y-auto modal-scroll sm:px-7"
              >
                {" "}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {/* ================= PROFILE IMAGE ================= */}
                  <div className="sm:col-span-2">
                    <label className="block mb-2 text-sm font-semibold text-slate-700">
                      صورة المحامي
                    </label>

                    <div className="flex flex-col items-center justify-center gap-4 p-5 border border-dashed rounded-2xl border-slate-200 bg-slate-50/50 sm:flex-row sm:justify-start">
                      {/* Preview */}
                      <div className="relative shrink-0">
                        <div className="flex items-center justify-center w-24 h-24 overflow-hidden bg-white border-4 border-white shadow-md rounded-2xl ring-1 ring-slate-200">
                          {imagePreview ? (
                            <img
                              src={imagePreview}
                              alt="صورة المحامي"
                              className="object-cover w-full h-full"
                            />
                          ) : (
                            <div className="flex flex-col items-center justify-center text-slate-300">
                              <FaUserTie className="text-3xl" />

                              <span className="mt-1 text-[9px] font-medium">
                                بدون صورة
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Camera */}
                        <div className="absolute flex items-center justify-center w-8 h-8 text-white rounded-lg shadow-md -bottom-2 -right-2 bg-gradient-to-br from-blue-600 to-indigo-600">
                          <FaCamera className="text-xs" />
                        </div>
                      </div>

                      {/* Upload */}
                      <div className="flex-1 w-full">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                          <div>
                            <p className="text-sm font-semibold text-slate-700">
                              ارفع صورة شخصية
                            </p>

                            <p className="mt-1 text-xs leading-5 text-slate-400">
                              JPG, JPEG, PNG أو WEBP
                              <br />
                              الحد الأقصى 5MB
                            </p>
                          </div>

                          <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-blue-100 bg-white px-4 py-2.5 text-xs font-bold text-blue-600 transition-all hover:border-blue-600 hover:bg-blue-600 hover:text-white">
                            <FaImage />

                            <span>
                              {values.profileImage
                                ? "تغيير الصورة"
                                : "اختيار صورة"}
                            </span>

                            <input
                              type="file"
                              accept="image/png,image/jpeg,image/jpg,image/webp"
                              className="hidden"
                              disabled={loadding || isSubmitting}
                              onChange={(event) => {
                                const file =
                                  event.currentTarget.files?.[0] || null;

                                setFieldValue("profileImage", file);

                                if (file) {
                                  const previewUrl = URL.createObjectURL(file);

                                  setImagePreview(previewUrl);
                                } else {
                                  setImagePreview(null);
                                }
                              }}
                            />
                          </label>
                        </div>

                        <ErrorMessage
                          name="profileImage"
                          component="p"
                          className="mt-2 text-xs font-medium text-red-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* ================= NAME ================= */}
                  <div className="sm:col-span-2">
                    <label className="block mb-2 text-sm font-semibold text-slate-700">
                      اسم المحامي
                    </label>

                    <div className="relative">
                      <FaUser className="absolute text-sm -translate-y-1/2 pointer-events-none right-4 top-1/2 text-slate-400" />

                      <Field
                        name="name"
                        type="text"
                        placeholder="مثال: أحمد محمد علي"
                        className="w-full h-12 pl-4 text-sm transition-all border outline-none rounded-xl border-slate-200 bg-slate-50/70 pr-11 text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                      />
                    </div>

                    <ErrorMessage
                      name="name"
                      component="p"
                      className="mt-1.5 text-xs font-medium text-red-500"
                    />
                  </div>

                  {/* ================= EMAIL ================= */}
                  <div>
                    <label className="block mb-2 text-sm font-semibold text-slate-700">
                      البريد الإلكتروني
                    </label>

                    <div className="relative">
                      <FaEnvelope className="absolute text-sm -translate-y-1/2 pointer-events-none right-4 top-1/2 text-slate-400" />

                      <Field
                        name="email"
                        type="email"
                        placeholder="lawyer@example.com"
                        className="w-full h-12 pl-4 text-sm transition-all border outline-none rounded-xl border-slate-200 bg-slate-50/70 pr-11 text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                      />
                    </div>

                    <ErrorMessage
                      name="email"
                      component="p"
                      className="mt-1.5 text-xs font-medium text-red-500"
                    />
                  </div>

                  {/* ================= PHONE ================= */}
                  <div>
                    <label className="block mb-2 text-sm font-semibold text-slate-700">
                      رقم الهاتف
                    </label>

                    <div className="relative">
                      <FaPhone className="absolute text-sm -translate-y-1/2 pointer-events-none right-4 top-1/2 text-slate-400" />

                      <Field
                        name="phone"
                        type="tel"
                        inputMode="numeric"
                        placeholder="01012345678"
                        className="w-full h-12 pl-4 text-sm transition-all border outline-none rounded-xl border-slate-200 bg-slate-50/70 pr-11 text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                      />
                    </div>

                    <ErrorMessage
                      name="phone"
                      component="p"
                      className="mt-1.5 text-xs font-medium text-red-500"
                    />
                  </div>

                  {/* ================= PASSWORD ================= */}
                  <div className="sm:col-span-2">
                    <label className="block mb-2 text-sm font-semibold text-slate-700">
                      كلمة المرور
                    </label>

                    <div className="relative">
                      <FaLock className="absolute text-sm -translate-y-1/2 pointer-events-none right-4 top-1/2 text-slate-400" />

                      <Field
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="أدخل كلمة مرور قوية"
                        className="w-full h-12 pl-12 text-sm transition-all border outline-none rounded-xl border-slate-200 bg-slate-50/70 pr-11 text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute flex items-center justify-center w-8 h-8 transition-colors -translate-y-1/2 rounded-lg left-3 top-1/2 text-slate-400 hover:bg-blue-50 hover:text-blue-600"
                        aria-label={
                          showPassword
                            ? "إخفاء كلمة المرور"
                            : "إظهار كلمة المرور"
                        }
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <ErrorMessage
                        name="password"
                        component="p"
                        className="text-xs font-medium text-red-500"
                      />

                      <span className="mr-auto text-[11px] text-slate-400">
                        6 أحرف على الأقل
                      </span>
                    </div>
                  </div>
                </div>
                {/* مساحة بسيطة أسفل المحتوى */}
                <div className="h-2" />
              </Form>

              {/* ================= FOOTER ================= */}
              <div className="px-5 py-4 bg-white border-t shrink-0 border-slate-100 sm:px-7">
                <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                  {/* Cancel */}
                  <button
                    type="button"
                    onClick={() => !loadding && setOpenAddLawyer(false)}
                    disabled={loadding || isSubmitting}
                    className="h-12 px-6 text-sm font-semibold transition-all bg-white border rounded-xl border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    إلغاء
                  </button>

                  {/* Submit */}
                  <button
                    type="submit"
                    form="add-lawyer-form"
                    disabled={loadding}
                    className="flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-7 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-500/25 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                  >
                    {loadding ? (
                      <>
                        <FaSpinner className="text-sm animate-spin" />

                        <span>جاري الحفظ...</span>
                      </>
                    ) : (
                      <>
                        <FaSave className="text-sm" />

                        <span>إضافة المحامي</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddLawyer;
