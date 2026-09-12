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
  FaCamera,
  FaImage,
} from "react-icons/fa";

import { AdminContext } from "../../../../../Providers/AdminContext/Admin.js";

const UpdateLawyer = ({ lawyer }) => {
  const {
    handleUpdateLawyerFun,
    openUpdateLawyer,
    setOpenUpdateLawyer,
    loadding,
  } = useContext(AdminContext);

  const [imagePreview, setImagePreview] = useState(null);

  const validationSchema = Yup.object({
    name: Yup.string()
      .trim()
      .min(2, "الاسم يجب أن يكون حرفين على الأقل")
      .required("اسم المحامي مطلوب"),

    email: Yup.string()
      .email("البريد الإلكتروني غير صحيح")
      .required("البريد الإلكتروني مطلوب"),

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
    if (lawyer?.profileImage?.url) {
      setImagePreview(lawyer.profileImage.url);
    } else {
      setImagePreview(null);
    }
  }, [lawyer]);

  if (!openUpdateLawyer || !lawyer) return null;

  const initialValues = {
    name: lawyer?.name || "",
    email: lawyer?.email || "",
    phone: lawyer?.phone || "",
    profileImage: null,
  };

  const handleClose = () => {
    if (!loadding) {
      setOpenUpdateLawyer(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-950/60 p-3 backdrop-blur-sm sm:p-4">
      {/* Overlay */}
      <button
        type="button"
        aria-label="إغلاق"
        onClick={handleClose}
        className="absolute inset-0 cursor-default"
      />

      {/* Modal */}
      <div className="relative z-10 flex max-h-[90vh] w-full max-w-xl flex-col overflow-hidden rounded-3xl border border-white/60 bg-white shadow-2xl shadow-slate-900/20">
        {/* Top gradient */}
        <div className="absolute top-0 left-0 z-20 w-full h-1 bg-gradient-to-l from-blue-600 via-indigo-500 to-blue-400" />

        {/* Header */}
        <div className="relative px-5 pb-5 border-b shrink-0 border-slate-100 pt-7 sm:px-7">
          <div className="absolute w-32 h-32 rounded-full -left-12 -top-12 bg-blue-500/5 blur-2xl" />
          <div className="absolute top-0 rounded-full -right-10 h-28 w-28 bg-indigo-500/5 blur-2xl" />

          <div className="relative flex items-start justify-between gap-4">
            <div className="flex items-center min-w-0 gap-4">
              <div className="flex items-center justify-center shadow-lg h-14 w-14 shrink-0 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-blue-500/20">
                <FaUserTie className="text-xl text-white" />
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-lg font-bold tracking-tight text-slate-800 sm:text-xl">
                    تعديل بيانات المحامي
                  </h2>

                  <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-[9px] font-bold text-indigo-600 sm:text-[10px]">
                    EDIT LAWYER
                  </span>
                </div>

                <p className="mt-1.5 text-xs leading-5 text-slate-500 sm:text-sm">
                  قم بتعديل بيانات المحامي ثم احفظ التغييرات
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleClose}
              disabled={loadding}
              className="flex items-center justify-center w-10 h-10 transition-all bg-white border shrink-0 rounded-xl border-slate-200 text-slate-400 hover:border-red-200 hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <FaTimes />
            </button>
          </div>
        </div>

        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, formikHelpers) =>
            handleUpdateLawyerFun({
              values,
              id: lawyer?._id || lawyer?.id,
              ...formikHelpers,
            })
          }
        >
          {({ isSubmitting, setFieldValue, values }) => (
            <>
              <Form
                id="update-lawyer-form"
                className="flex-1 min-h-0 px-5 py-6 overflow-y-auto modal-scroll sm:px-7"
              >
                {/* Profile Image */}
                <div className="flex flex-col items-center mb-6">
                  <div className="relative">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt={lawyer?.name || "المحامي"}
                        className="object-cover shadow-lg h-28 w-28 rounded-3xl ring-4 ring-white"
                      />
                    ) : (
                      <div className="flex items-center justify-center text-3xl font-bold text-white shadow-lg h-28 w-28 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-600 ring-4 ring-white">
                        {lawyer?.name?.charAt(0) || "م"}
                      </div>
                    )}

                    <label
                      htmlFor="update-lawyer-image"
                      className="absolute flex items-center justify-center w-10 h-10 text-white transition bg-blue-600 border-4 border-white shadow-lg cursor-pointer -bottom-2 -right-2 rounded-xl hover:bg-blue-700"
                    >
                      <FaCamera className="text-sm" />

                      <input
                        id="update-lawyer-image"
                        type="file"
                        accept="image/jpeg,image/jpg,image/png,image/webp"
                        className="hidden"
                        onChange={(event) => {
                          const file = event.currentTarget.files?.[0];

                          if (!file) return;

                          setFieldValue("profileImage", file);
                          setImagePreview(URL.createObjectURL(file));
                        }}
                      />
                    </label>
                  </div>

                  <p className="mt-3 flex items-center gap-1.5 text-xs text-slate-400">
                    <FaImage />
                    اضغط على الكاميرا لتغيير الصورة
                  </p>

                  <ErrorMessage
                    name="profileImage"
                    component="p"
                    className="mt-1 text-xs font-medium text-red-500"
                  />
                </div>

                {/* Fields */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {/* Name */}
                  <div className="sm:col-span-2">
                    <label className="block mb-2 text-sm font-semibold text-slate-700">
                      اسم المحامي
                    </label>

                    <div className="relative">
                      <FaUser className="absolute -translate-y-1/2 right-4 top-1/2 text-slate-400" />

                      <Field
                        name="name"
                        type="text"
                        placeholder="أدخل اسم المحامي"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pr-11 pl-4 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
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
                    <label className="block mb-2 text-sm font-semibold text-slate-700">
                      البريد الإلكتروني
                    </label>

                    <div className="relative">
                      <FaEnvelope className="absolute -translate-y-1/2 right-4 top-1/2 text-slate-400" />

                      <Field
                        name="email"
                        type="email"
                        dir="ltr"
                        placeholder="example@email.com"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-4 pr-11 text-left text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                      />
                    </div>

                    <ErrorMessage
                      name="email"
                      component="p"
                      className="mt-1.5 text-xs font-medium text-red-500"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block mb-2 text-sm font-semibold text-slate-700">
                      رقم الهاتف
                    </label>

                    <div className="relative">
                      <FaPhone className="absolute -translate-y-1/2 right-4 top-1/2 text-slate-400" />

                      <Field
                        name="phone"
                        type="tel"
                        dir="ltr"
                        placeholder="01012345678"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-4 pr-11 text-left text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                      />
                    </div>

                    <ErrorMessage
                      name="phone"
                      component="p"
                      className="mt-1.5 text-xs font-medium text-red-500"
                    />
                  </div>
                </div>

                <div className="h-2" />
              </Form>

              {/* Footer */}
              <div className="px-5 py-4 bg-white border-t shrink-0 border-slate-100 sm:px-7">
                <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={handleClose}
                    disabled={loadding || isSubmitting}
                    className="px-6 py-3 text-sm font-bold transition-all bg-white border rounded-xl border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    إلغاء
                  </button>

                  <button
                    type="submit"
                    form="update-lawyer-form"
                    disabled={loadding || isSubmitting}
                    className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-blue-600 to-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all hover:from-blue-700 hover:to-indigo-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loadding || isSubmitting ? (
                      <>
                        <FaSpinner className="text-sm animate-spin" />
                        <span>جاري الحفظ...</span>
                      </>
                    ) : (
                      <>
                        <FaSave className="text-sm" />
                        <span>حفظ التعديلات</span>
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

export default UpdateLawyer;
