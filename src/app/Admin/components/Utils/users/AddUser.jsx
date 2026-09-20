"use client";

import React, { useContext, useEffect, useState } from "react";
import {
  FiX,
  FiUser,
  FiMail,
  FiLock,
  FiPhone,
  FiBriefcase,
  FiShield,
  FiCamera,
  FiCheck,
  FiUploadCloud,
  FiHome,
} from "react-icons/fi";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { AdminContext } from "../../../../../Providers/AdminContext/Admin.js";

const AddUser = () => {
  const {
    openAddUser,
    setOpenAddUser,
    loadding,
    handleAddUserFun,
    offices,
  } = useContext(AdminContext);

  const [preview, setPreview] = useState(null);

  // =========================
  // Validation
  // =========================
  const validationSchema = Yup.object({
    name: Yup.string()
      .trim()
      .min(3, "الاسم يجب أن يكون 3 أحرف على الأقل")
      .required("الاسم مطلوب"),

    email: Yup.string()
      .email("البريد الإلكتروني غير صحيح")
      .required("البريد الإلكتروني مطلوب"),

    password: Yup.string()
      .min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل")
      .required("كلمة المرور مطلوبة"),

    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "رقم الهاتف المصري غير صحيح")
      .required("رقم الهاتف مطلوب"),

    role: Yup.string()
      .oneOf(["office_owner", "lawyer"], "اختر نوع الحساب الصحيح")
      .required("نوع الحساب مطلوب"),

    officeId: Yup.string().when("role", {
      is: "office_owner",
      then: (schema) =>
        schema.required("يجب اختيار المكتب لصاحب المكتب"),
      otherwise: (schema) => schema.nullable(),
    }),

    profileImage: Yup.mixed()
      .nullable()
      .test(
        "fileType",
        "الصورة يجب أن تكون PNG أو JPG أو WEBP",
        (file) => {
          if (!file) return true;

          return [
            "image/png",
            "image/jpeg",
            "image/webp",
          ].includes(file.type);
        },
      )
      .test(
        "fileSize",
        "حجم الصورة يجب ألا يتجاوز 5MB",
        (file) => {
          if (!file) return true;

          return file.size <= 5 * 1024 * 1024;
        },
      ),
  });

  // =========================
  // Cleanup
  // =========================
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  // =========================
  // Close
  // =========================
  const handleClose = () => {
    if (loadding) return;

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setPreview(null);
    setOpenAddUser(false);
  };

  if (!openAddUser) return null;

  return (
    <div
      dir="rtl"
      className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
    >
      <div className="flex max-h-[94vh] w-full max-w-4xl flex-col overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-2xl">
        {/* =====================================================
            HEADER
        ====================================================== */}
        <div className="relative px-6 py-5 overflow-hidden bg-white border-b shrink-0 border-slate-100 sm:px-8">
          <div className="absolute w-48 h-48 rounded-full -right-20 -top-24 bg-blue-100/50 blur-3xl" />

          <div className="absolute w-48 h-48 rounded-full -bottom-24 -left-20 bg-indigo-100/40 blur-3xl" />

          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 text-white shadow-lg shrink-0 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-blue-600/20">
                <FiUser size={22} />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-lg font-extrabold text-slate-900 sm:text-xl">
                    إضافة مستخدم جديد
                  </h2>

                  <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold text-blue-600">
                    حساب جديد
                  </span>
                </div>

                <p className="mt-1 text-xs text-slate-400 sm:text-sm">
                  أضف مستخدمًا جديدًا إلى نظام إدارة المكتب
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleClose}
              disabled={loadding}
              className="flex items-center justify-center w-10 h-10 transition border shrink-0 rounded-xl border-slate-200 text-slate-400 hover:border-red-200 hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <FiX size={19} />
            </button>
          </div>
        </div>

        {/* =====================================================
            FORMIK
        ====================================================== */}
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            phone: "",
            role: "lawyer",
            officeId: "",
            profileImage: null,
          }}
          validationSchema={validationSchema}
          onSubmit={handleAddUserFun}
        >
          {({
            values,
            setFieldValue,
            isSubmitting,
          }) => (
            <Form className="flex flex-col flex-1 min-h-0">
              {/* =================================================
                  BODY
              ================================================== */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-5 sm:p-8">

                  {/* =================================================
                      PROFILE SECTION
                  ================================================== */}
                  <div className="flex flex-col items-center p-5 mb-8 border rounded-3xl border-slate-100 bg-slate-50/70 sm:flex-row sm:items-center sm:gap-6 sm:p-6">

                    {/* Image */}
                    <div className="relative shrink-0">
                      <label
                        htmlFor="profileImage"
                        className="relative block cursor-pointer group"
                      >
                        <div className="relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-[5px] border-white bg-gradient-to-br from-slate-100 to-slate-200 shadow-lg ring-1 ring-slate-200 transition duration-300 group-hover:scale-[1.03]">
                          {preview ? (
                            <img
                              src={preview}
                              alt="Profile Preview"
                              className="object-cover w-full h-full"
                            />
                          ) : (
                            <FiUser
                              size={43}
                              className="text-slate-300"
                            />
                          )}

                          <div className="absolute inset-0 flex items-center justify-center transition opacity-0 bg-slate-950/50 group-hover:opacity-100">
                            <FiCamera
                              size={24}
                              className="text-white"
                            />
                          </div>
                        </div>

                        <div className="absolute bottom-0 left-0 flex items-center justify-center text-white transition bg-blue-600 border-4 border-white rounded-full shadow-md h-9 w-9 group-hover:scale-110">
                          <FiCamera size={15} />
                        </div>
                      </label>

                      <input
                        id="profileImage"
                        name="profileImage"
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        className="hidden"
                        onChange={(event) => {
                          const file =
                            event.currentTarget.files?.[0];

                          if (!file) {
                            setFieldValue(
                              "profileImage",
                              null,
                            );

                            setPreview(null);

                            return;
                          }

                          setFieldValue(
                            "profileImage",
                            file,
                          );

                          if (preview) {
                            URL.revokeObjectURL(preview);
                          }

                          setPreview(
                            URL.createObjectURL(file),
                          );
                        }}
                      />
                    </div>

                    {/* Image Info */}
                    <div className="mt-5 text-center sm:mt-0 sm:text-right">
                      <div className="flex items-center justify-center gap-2 sm:justify-start">
                        <h3 className="text-sm font-extrabold text-slate-800">
                          الصورة الشخصية
                        </h3>

                        <span className="rounded-full bg-white px-2 py-0.5 text-[9px] font-bold text-slate-400 ring-1 ring-slate-200">
                          اختياري
                        </span>
                      </div>

                      <p className="mt-1.5 text-xs leading-5 text-slate-400">
                        اختر صورة واضحة للمستخدم لتظهر في النظام
                      </p>

                      <div className="flex items-center justify-center gap-2 mt-3 sm:justify-start">
                        <div className="flex items-center gap-1.5 rounded-lg bg-white px-2.5 py-1.5 text-[10px] font-semibold text-slate-500 ring-1 ring-slate-100">
                          <FiUploadCloud
                            size={13}
                            className="text-blue-600"
                          />

                          PNG / JPG / WEBP
                        </div>

                        <span className="text-[10px] text-slate-400">
                          حتى 5MB
                        </span>
                      </div>

                      <ErrorMessage
                        name="profileImage"
                        component="p"
                        className="mt-2 text-xs font-semibold text-red-500"
                      />
                    </div>
                  </div>

                  {/* =================================================
                      BASIC INFORMATION
                  ================================================== */}
                  <section>
                    <div className="flex items-center gap-3 mb-5">
                      <div className="flex items-center justify-center text-blue-600 h-9 w-9 rounded-xl bg-blue-50">
                        <FiUser size={17} />
                      </div>

                      <div>
                        <h3 className="text-sm font-extrabold text-slate-800">
                          البيانات الأساسية
                        </h3>

                        <p className="mt-0.5 text-[11px] text-slate-400">
                          المعلومات الشخصية وبيانات التواصل
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                      {/* ================= NAME ================= */}
                      <div>
                        <label className="block mb-2 text-xs font-bold text-slate-700">
                          الاسم الكامل
                          <span className="mr-1 text-red-500">
                            *
                          </span>
                        </label>

                        <div className="relative">
                          <FiUser
                            size={17}
                            className="absolute -translate-y-1/2 pointer-events-none right-4 top-1/2 text-slate-400"
                          />

                          <Field
                            name="name"
                            type="text"
                            placeholder="مثال: أحمد محمد العتيبي"
                            className="w-full h-12 px-4 text-sm transition border outline-none rounded-2xl border-slate-200 bg-slate-50/50 pr-11 text-slate-800 placeholder:text-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                          />
                        </div>

                        <ErrorMessage
                          name="name"
                          component="p"
                          className="mt-1.5 text-xs font-medium text-red-500"
                        />
                      </div>

                      {/* ================= PHONE ================= */}
                      <div>
                        <label className="block mb-2 text-xs font-bold text-slate-700">
                          رقم الهاتف
                          <span className="mr-1 text-red-500">
                            *
                          </span>
                        </label>

                        <div className="relative">
                          <FiPhone
                            size={17}
                            className="absolute -translate-y-1/2 pointer-events-none right-4 top-1/2 text-slate-400"
                          />

                          <Field
                            name="phone"
                            type="tel"
                            dir="ltr"
                            placeholder="01012345678"
                            className="w-full h-12 px-4 text-sm text-left transition border outline-none rounded-2xl border-slate-200 bg-slate-50/50 pr-11 text-slate-800 placeholder:text-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                          />
                        </div>

                        <ErrorMessage
                          name="phone"
                          component="p"
                          className="mt-1.5 text-xs font-medium text-red-500"
                        />
                      </div>

                      {/* ================= EMAIL ================= */}
                      <div className="md:col-span-2">
                        <label className="block mb-2 text-xs font-bold text-slate-700">
                          البريد الإلكتروني
                          <span className="mr-1 text-red-500">
                            *
                          </span>
                        </label>

                        <div className="relative">
                          <FiMail
                            size={17}
                            className="absolute -translate-y-1/2 pointer-events-none right-4 top-1/2 text-slate-400"
                          />

                          <Field
                            name="email"
                            type="email"
                            dir="ltr"
                            placeholder="example@email.com"
                            className="w-full h-12 px-4 text-sm text-left transition border outline-none rounded-2xl border-slate-200 bg-slate-50/50 pr-11 text-slate-800 placeholder:text-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                          />
                        </div>

                        <ErrorMessage
                          name="email"
                          component="p"
                          className="mt-1.5 text-xs font-medium text-red-500"
                        />
                      </div>

                      {/* =================================================
                          OFFICE
                      ================================================== */}
                      <div className="md:col-span-2">
                        <div className="flex items-center justify-between mb-2">
                          <label className="block text-xs font-bold text-slate-700">
                            المكتب
                            {values.role === "office_owner" && (
                              <span className="mr-1 text-red-500">
                                *
                              </span>
                            )}
                          </label>

                          {values.role === "lawyer" && (
                            <span className="text-[10px] font-medium text-slate-400">
                              اختياري للمحامي المستقل
                            </span>
                          )}
                        </div>

                        <div className="relative">
                          <FiHome
                            size={17}
                            className="absolute z-10 -translate-y-1/2 pointer-events-none right-4 top-1/2 text-slate-400"
                          />

                          <Field
                            as="select"
                            name="officeId"
                            className="w-full h-12 px-4 text-sm transition border outline-none appearance-none cursor-pointer rounded-2xl border-slate-200 bg-slate-50/50 pr-11 text-slate-800 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                          >
                            <option value="">
                              {values.role === "office_owner"
                                ? "اختر المكتب"
                                : "بدون مكتب - محامي مستقل"}
                            </option>

                            {offices?.map((office) => (
                              <option
                                key={office._id}
                                value={office._id}
                              >
                                {office.name}
                              </option>
                            ))}
                          </Field>
                        </div>

                        <ErrorMessage
                          name="officeId"
                          component="p"
                          className="mt-1.5 text-xs font-medium text-red-500"
                        />
                      </div>
                    </div>
                  </section>

                  {/* =================================================
                      DIVIDER
                  ================================================== */}
                  <div className="h-px my-8 bg-slate-100" />

                  {/* =================================================
                      SECURITY
                  ================================================== */}
                  <section>
                    <div className="flex items-center gap-3 mb-5">
                      <div className="flex items-center justify-center h-9 w-9 rounded-xl bg-amber-50 text-amber-600">
                        <FiLock size={17} />
                      </div>

                      <div>
                        <h3 className="text-sm font-extrabold text-slate-800">
                          أمان الحساب
                        </h3>

                        <p className="mt-0.5 text-[11px] text-slate-400">
                          أنشئ كلمة مرور آمنة للحساب
                        </p>
                      </div>
                    </div>

                    <div>
                      <label className="block mb-2 text-xs font-bold text-slate-700">
                        كلمة المرور
                        <span className="mr-1 text-red-500">
                          *
                        </span>
                      </label>

                      <div className="relative">
                        <FiLock
                          size={17}
                          className="absolute -translate-y-1/2 pointer-events-none right-4 top-1/2 text-slate-400"
                        />

                        <Field
                          name="password"
                          type="password"
                          dir="ltr"
                          placeholder="••••••••"
                          className="w-full h-12 px-4 text-sm tracking-wider text-left transition border outline-none rounded-2xl border-slate-200 bg-slate-50/50 pr-11 text-slate-800 placeholder:text-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                        />
                      </div>

                      <div className="mt-2 flex items-center gap-1.5 text-[10px] text-slate-400">
                        <FiShield size={12} />

                        <span>
                          يجب أن تحتوي كلمة المرور على 6 أحرف على الأقل
                        </span>
                      </div>

                      <ErrorMessage
                        name="password"
                        component="p"
                        className="mt-1.5 text-xs font-medium text-red-500"
                      />
                    </div>
                  </section>

                  {/* =================================================
                      DIVIDER
                  ================================================== */}
                  <div className="h-px my-8 bg-slate-100" />

                  {/* =================================================
                      ROLE
                  ================================================== */}
                  <section>
                    <div className="flex items-center gap-3 mb-5">
                      <div className="flex items-center justify-center text-indigo-600 h-9 w-9 rounded-xl bg-indigo-50">
                        <FiBriefcase size={17} />
                      </div>

                      <div>
                        <h3 className="text-sm font-extrabold text-slate-800">
                          صلاحيات الحساب
                        </h3>

                        <p className="mt-0.5 text-[11px] text-slate-400">
                          حدد الدور المناسب للمستخدم
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                      {/* ================= LAWYER ================= */}
                      <button
                        type="button"
                        onClick={() => {
                          setFieldValue("role", "lawyer");
                        }}
                        className={`group relative overflow-hidden rounded-2xl border p-5 text-right transition-all duration-200 ${
                          values.role === "lawyer"
                            ? "border-blue-500 bg-blue-50/60 shadow-md shadow-blue-500/10"
                            : "border-slate-200 bg-white hover:border-blue-200 hover:bg-slate-50"
                        }`}
                      >
                        {values.role === "lawyer" && (
                          <div className="absolute flex items-center justify-center w-6 h-6 text-white bg-blue-600 rounded-full left-4 top-4">
                            <FiCheck size={13} />
                          </div>
                        )}

                        <div className="flex items-start gap-4">
                          <div
                            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition ${
                              values.role === "lawyer"
                                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                                : "bg-slate-100 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-500"
                            }`}
                          >
                            <FiBriefcase size={21} />
                          </div>

                          <div className="pt-0.5">
                            <h4 className="text-sm font-extrabold text-slate-800">
                              محامي
                            </h4>

                            <p className="mt-1 text-[11px] leading-5 text-slate-400">
                              إدارة القضايا والعملاء والمهام الخاصة به
                            </p>
                          </div>
                        </div>
                      </button>

                      {/* ================= OFFICE OWNER ================= */}
                      <button
                        type="button"
                        onClick={() => {
                          setFieldValue(
                            "role",
                            "office_owner",
                          );
                        }}
                        className={`group relative overflow-hidden rounded-2xl border p-5 text-right transition-all duration-200 ${
                          values.role === "office_owner"
                            ? "border-indigo-500 bg-indigo-50/60 shadow-md shadow-indigo-500/10"
                            : "border-slate-200 bg-white hover:border-indigo-200 hover:bg-slate-50"
                        }`}
                      >
                        {values.role === "office_owner" && (
                          <div className="absolute flex items-center justify-center w-6 h-6 text-white bg-indigo-600 rounded-full left-4 top-4">
                            <FiCheck size={13} />
                          </div>
                        )}

                        <div className="flex items-start gap-4">
                          <div
                            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition ${
                              values.role === "office_owner"
                                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                                : "bg-slate-100 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-500"
                            }`}
                          >
                            <FiShield size={21} />
                          </div>

                          <div className="pt-0.5">
                            <h4 className="text-sm font-extrabold text-slate-800">
                              صاحب مكتب
                            </h4>

                            <p className="mt-1 text-[11px] leading-5 text-slate-400">
                              إدارة المكتب والمستخدمين والصلاحيات
                            </p>
                          </div>
                        </div>
                      </button>
                    </div>

                    <ErrorMessage
                      name="role"
                      component="p"
                      className="mt-2 text-xs font-medium text-red-500"
                    />
                  </section>
                </div>
              </div>

              {/* =================================================
                  FOOTER
              ================================================== */}
              <div className="px-5 py-4 bg-white border-t shrink-0 border-slate-100 sm:px-8">
                <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">

                  <div className="hidden items-center gap-2 text-[10px] text-slate-400 sm:flex">
                    <FiShield size={13} />
                    <span>
                      بيانات المستخدم محمية وآمنة
                    </span>
                  </div>

                  <div className="flex w-full gap-3 sm:w-auto">
                    <button
                      type="button"
                      onClick={handleClose}
                      disabled={loadding || isSubmitting}
                      className="flex-1 px-6 text-sm font-bold transition bg-white border h-11 rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none"
                    >
                      إلغاء
                    </button>

                    <button
                      type="submit"
                      disabled={loadding || isSubmitting}
                      className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-7 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 sm:flex-none"
                    >
                      {loadding || isSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 rounded-full animate-spin border-white/30 border-t-white" />
                          جاري الحفظ...
                        </>
                      ) : (
                        <>
                          <FiCheck size={16} />
                          إضافة المستخدم
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddUser;