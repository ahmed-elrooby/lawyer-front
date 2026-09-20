"use client";

import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { OwnerContext } from "../../../../../Providers/LawyerOwner/OwnerProvider.js";

const UpdateLawyer = ({ selectedLawyer }) => {
  const {
    handleUpdateLawyerFun,
    loadding,
    setOpenUpdateLawyer,
    openUpdateLawyer,
  } = useContext(OwnerContext);

  if (!selectedLawyer || !openUpdateLawyer) return null;

  const initialValues = {
    name: selectedLawyer?.name || "",
    email: selectedLawyer?.email || "",
    phone: selectedLawyer?.phone || "",
    password: "",
    profileImage: null,
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "الاسم يجب أن يكون 3 أحرف على الأقل")
      .required("اسم المحامي مطلوب"),

    email: Yup.string()
      .email("البريد الإلكتروني غير صحيح")
      .required("البريد الإلكتروني مطلوب"),

    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "رقم الهاتف غير صحيح")
      .required("رقم الهاتف مطلوب"),

    password: Yup.string()
      .min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل")
      .nullable(),

    profileImage: Yup.mixed()
      .nullable()
      .test(
        "fileType",
        "الصورة يجب أن تكون JPG أو PNG أو WEBP",
        (value) =>
          !value ||
          ["image/jpeg", "image/png", "image/webp"].includes(value.type)
      )
      .test(
        "fileSize",
        "حجم الصورة يجب ألا يتجاوز 5MB",
        (value) => !value || value.size <= 5 * 1024 * 1024
      ),
  });

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0f172a]/60 px-4 backdrop-blur-[2px]">
      <div className="flex max-h-[90vh] w-full max-w-[520px] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.18)]">

        {/* ================= Header ================= */}
        <div className="flex shrink-0 items-center justify-between border-b border-gray-100 bg-[#111827] px-6 py-5">
          <div className="text-right">
            <h2 className="text-[16px] font-bold text-white">
              تعديل بيانات المحامي
            </h2>

            <p className="mt-1 text-[11px] text-gray-400">
              تعديل بيانات المحامي {selectedLawyer?.name}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setOpenUpdateLawyer(false)}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-[18px] leading-none text-gray-300 transition hover:bg-white/10 hover:text-white"
          >
            ×
          </button>
        </div>

        {/* ================= Body Scroll ================= */}
        <div className="flex-1 min-h-0 overflow-y-auto">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) =>
              handleUpdateLawyerFun({
                values,
                id: selectedLawyer._id,
              })
            }
            enableReinitialize
          >
            {({ setFieldValue }) => (
              <Form className="p-6 space-y-4">

                {/* ================= Name ================= */}
                <div>
                  <label className="mb-1.5 block text-right text-[12px] font-semibold text-[#374151]">
                    اسم المحامي
                  </label>

                  <Field
                    name="name"
                    type="text"
                    placeholder="أدخل اسم المحامي"
                    className="h-[42px] w-full rounded-xl border border-gray-200 bg-[#f9fafb] px-4 text-right text-[13px] text-[#111827] outline-none transition placeholder:text-gray-400 focus:border-[#c9a227] focus:bg-white focus:ring-2 focus:ring-[#c9a227]/10"
                  />

                  <ErrorMessage
                    name="name"
                    component="div"
                    className="mt-1 text-right text-[11px] text-red-500"
                  />
                </div>

                {/* ================= Email ================= */}
                <div>
                  <label className="mb-1.5 block text-right text-[12px] font-semibold text-[#374151]">
                    البريد الإلكتروني
                  </label>

                  <Field
                    name="email"
                    type="email"
                    placeholder="example@email.com"
                    className="h-[42px] w-full rounded-xl border border-gray-200 bg-[#f9fafb] px-4 text-right text-[13px] text-[#111827] outline-none transition placeholder:text-gray-400 focus:border-[#c9a227] focus:bg-white focus:ring-2 focus:ring-[#c9a227]/10"
                  />

                  <ErrorMessage
                    name="email"
                    component="div"
                    className="mt-1 text-right text-[11px] text-red-500"
                  />
                </div>

                {/* ================= Phone ================= */}
                <div>
                  <label className="mb-1.5 block text-right text-[12px] font-semibold text-[#374151]">
                    رقم الهاتف
                  </label>

                  <Field
                    name="phone"
                    type="text"
                    placeholder="01xxxxxxxxx"
                    className="h-[42px] w-full rounded-xl border border-gray-200 bg-[#f9fafb] px-4 text-right text-[13px] text-[#111827] outline-none transition placeholder:text-gray-400 focus:border-[#c9a227] focus:bg-white focus:ring-2 focus:ring-[#c9a227]/10"
                  />

                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="mt-1 text-right text-[11px] text-red-500"
                  />
                </div>

                {/* ================= Password ================= */}
                <div>
                  <label className="mb-1.5 block text-right text-[12px] font-semibold text-[#374151]">
                    كلمة المرور الجديدة

                    <span className="mr-1 text-[10px] font-normal text-gray-400">
                      (اختياري)
                    </span>
                  </label>

                  <Field
                    name="password"
                    type="password"
                    placeholder="اتركها فارغة إذا لم ترد تغييرها"
                    className="h-[42px] w-full rounded-xl border border-gray-200 bg-[#f9fafb] px-4 text-right text-[13px] text-[#111827] outline-none transition placeholder:text-gray-400 focus:border-[#c9a227] focus:bg-white focus:ring-2 focus:ring-[#c9a227]/10"
                  />

                  <ErrorMessage
                    name="password"
                    component="div"
                    className="mt-1 text-right text-[11px] text-red-500"
                  />
                </div>

              {/* ================= Profile Image ================= */}
<div>
  <label className="mb-1.5 block text-right text-[12px] font-semibold text-[#374151]">
    صورة المحامي
  </label>

  <label className="group flex h-[86px] w-full cursor-pointer items-center justify-center rounded-xl border border-dashed border-gray-300 bg-[#f9fafb] transition hover:border-[#c9a227] hover:bg-[#fffcf3]">
    <div className="flex items-center gap-3">

      {/* Icon */}
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#111827] text-white transition group-hover:bg-[#c9a227]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="19"
          height="19"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="18" height="18" x="3" y="3" rx="2" />
          <circle cx="9" cy="9" r="2" />
          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
        </svg>
      </div>

      <div className="text-right">
        <p className="text-[12px] font-semibold text-[#374151]">
          اختر صورة المحامي
        </p>

        <p className="mt-1 text-[10px] text-gray-400">
          JPG, PNG أو WEBP — بحد أقصى 5MB
        </p>
      </div>
    </div>

    <input
      type="file"
      accept="image/jpeg,image/png,image/webp"
      onChange={(event) => {
        setFieldValue(
          "profileImage",
          event.currentTarget.files?.[0] || null
        );
      }}
      className="hidden"
    />
  </label>

  <ErrorMessage
    name="profileImage"
    component="div"
    className="mt-1 text-right text-[11px] text-red-500"
  />
</div>

              </Form>
            )}
          </Formik>
        </div>

        {/* ================= Footer ================= */}
        <div className="px-6 py-4 bg-white border-t border-gray-100 shrink-0">
          <div className="flex items-center gap-3">

            <button
              type="button"
              onClick={() => setOpenUpdateLawyer(false)}
              className="h-[42px] flex-1 rounded-xl border border-gray-200 bg-white text-[12px] font-semibold text-gray-600 transition hover:border-gray-300 hover:bg-gray-50"
            >
              إلغاء
            </button>

            <button
              type="submit"
              form="update-lawyer-form"
              disabled={loadding}
              className="h-[42px] flex-1 rounded-xl bg-[#111827] text-[12px] font-semibold text-white shadow-sm transition hover:bg-[#1f2937] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loadding ? "جاري الحفظ..." : "حفظ التعديلات"}
            </button>

          </div>
        </div>

      </div>
    </div>
  );
};

export default UpdateLawyer;