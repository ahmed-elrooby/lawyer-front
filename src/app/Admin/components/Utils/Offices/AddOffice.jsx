"use client";

import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import {
  FaBuilding,
  FaTimes,
  FaPlus,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaGlobe,
} from "react-icons/fa";

import { AdminContext } from "../../../../../Providers/AdminContext/Admin.js";

const AddOffice = () => {
  const { handleAddOfficeFun, openAddOffice, setOpenAddOffice, loadding } =
    useContext(AdminContext);

  const initialValues = {
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    country: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .trim()
      .required("اسم المكتب مطلوب")
      .min(2, "اسم المكتب يجب أن يكون حرفين على الأقل"),

    phone: Yup.string()
      .trim()
      .required("رقم الهاتف مطلوب")
      .matches(/^(01)[0-9]{9}$/, "أدخل رقم هاتف مصري صحيح"),

    email: Yup.string()
      .trim()
      .email("البريد الإلكتروني غير صحيح")
      .required("البريد الإلكتروني مطلوب"),

    address: Yup.string().trim().required("العنوان مطلوب"),

    city: Yup.string().trim().required("المدينة مطلوبة"),

    country: Yup.string().trim().required("الدولة مطلوبة"),
  });

  if (!openAddOffice) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 px-4 py-6 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          setOpenAddOffice(false);
        }
      }}
    >
      <div
        dir="rtl"
        className="relative w-full max-w-2xl overflow-hidden bg-white border shadow-2xl rounded-3xl border-gray-200/70"
      >
        {/* ============================================
            HEADER
        ============================================ */}

        <div className="relative px-6 py-5 border-b border-gray-100 bg-gradient-to-l from-blue-50/70 via-white to-white">
          {/* Decorative Circle */}
          <div className="absolute rounded-full pointer-events-none -left-8 -top-8 h-28 w-28 bg-blue-500/5 blur-2xl" />

          <div className="relative flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {/* Icon */}
              <div className="flex items-center justify-center w-12 h-12 shadow-lg rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-blue-500/20">
                <FaBuilding className="text-xl text-white" />
              </div>

              <div>
                <h2 className="text-lg font-bold text-gray-800">
                  إضافة مكتب جديد
                </h2>

                <p className="mt-0.5 text-xs text-gray-400">
                  أضف بيانات مكتب المحاماة الجديد
                </p>
              </div>
            </div>

            {/* Close */}
            <button
              type="button"
              onClick={() => setOpenAddOffice(false)}
              className="flex items-center justify-center text-gray-400 transition-all h-9 w-9 rounded-xl hover:bg-red-50 hover:text-red-500"
            >
              <FaTimes />
            </button>
          </div>

          {/* Accent */}
          <div className="absolute bottom-0 right-0 h-0.5 w-28 rounded-l-full bg-gradient-to-l from-blue-500 to-transparent" />
        </div>

        {/* ============================================
            FORM
        ============================================ */}

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleAddOfficeFun}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="max-h-[70vh] custom-scrollbar overflow-y-auto px-6 py-6">
                {/* Section Title */}
                <div className="mb-5">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-5 bg-blue-600 rounded-full" />

                    <h3 className="text-sm font-bold text-gray-800">
                      بيانات المكتب
                    </h3>
                  </div>

                  <p className="mt-1 mr-3 text-xs text-gray-400">
                    أدخل البيانات الأساسية للمكتب
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  {/* Office Name */}
                  <div className="md:col-span-2">
                    <label className="block mb-2 text-xs font-semibold text-gray-700">
                      اسم المكتب
                      <span className="mr-1 text-red-500">*</span>
                    </label>

                    <div className="relative">
                      <FaBuilding className="absolute text-sm text-gray-400 -translate-y-1/2 right-3 top-1/2" />

                      <Field
                        name="name"
                        type="text"
                        placeholder="مثال: مكتب العدالة للمحاماة"
                        className="w-full py-3 pl-4 pr-10 text-sm text-gray-700 transition-all border border-gray-200 outline-none rounded-xl bg-gray-50/50 placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                      />
                    </div>

                    <ErrorMessage
                      name="name"
                      component="p"
                      className="mt-1.5 text-xs font-medium text-red-500"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block mb-2 text-xs font-semibold text-gray-700">
                      رقم الهاتف
                      <span className="mr-1 text-red-500">*</span>
                    </label>

                    <div className="relative">
                      <FaPhone className="absolute text-sm text-gray-400 -translate-y-1/2 right-3 top-1/2" />

                      <Field
                        name="phone"
                        type="tel"
                        dir="ltr"
                        placeholder="01012345678"
                        className="w-full py-3 pl-4 pr-10 text-sm text-left text-gray-700 transition-all border border-gray-200 outline-none rounded-xl bg-gray-50/50 placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                      />
                    </div>

                    <ErrorMessage
                      name="phone"
                      component="p"
                      className="mt-1.5 text-xs font-medium text-red-500"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block mb-2 text-xs font-semibold text-gray-700">
                      البريد الإلكتروني
                      <span className="mr-1 text-red-500">*</span>
                    </label>

                    <div className="relative">
                      <FaEnvelope className="absolute text-sm text-gray-400 -translate-y-1/2 right-3 top-1/2" />

                      <Field
                        name="email"
                        type="email"
                        dir="ltr"
                        placeholder="office@example.com"
                        className="w-full py-3 pl-4 pr-10 text-sm text-left text-gray-700 transition-all border border-gray-200 outline-none rounded-xl bg-gray-50/50 placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                      />
                    </div>

                    <ErrorMessage
                      name="email"
                      component="p"
                      className="mt-1.5 text-xs font-medium text-red-500"
                    />
                  </div>

                  {/* Address */}
                  <div className="md:col-span-2">
                    <label className="block mb-2 text-xs font-semibold text-gray-700">
                      العنوان
                      <span className="mr-1 text-red-500">*</span>
                    </label>

                    <div className="relative">
                      <FaMapMarkerAlt className="absolute right-3 top-3.5 text-sm text-gray-400" />

                      <Field
                        as="textarea"
                        name="address"
                        rows="3"
                        placeholder="أدخل العنوان بالتفصيل"
                        className="w-full py-3 pl-4 pr-10 text-sm text-gray-700 transition-all border border-gray-200 outline-none resize-none rounded-xl bg-gray-50/50 placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                      />
                    </div>

                    <ErrorMessage
                      name="address"
                      component="p"
                      className="mt-1.5 text-xs font-medium text-red-500"
                    />
                  </div>

                  {/* City */}
                  <div>
                    <label className="block mb-2 text-xs font-semibold text-gray-700">
                      المدينة
                      <span className="mr-1 text-red-500">*</span>
                    </label>

                    <div className="relative">
                      <FaMapMarkerAlt className="absolute text-sm text-gray-400 -translate-y-1/2 right-3 top-1/2" />

                      <Field
                        name="city"
                        type="text"
                        placeholder="مثال: القاهرة"
                        className="w-full py-3 pl-4 pr-10 text-sm text-gray-700 transition-all border border-gray-200 outline-none rounded-xl bg-gray-50/50 placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                      />
                    </div>

                    <ErrorMessage
                      name="city"
                      component="p"
                      className="mt-1.5 text-xs font-medium text-red-500"
                    />
                  </div>

                  {/* Country */}
                  <div>
                    <label className="block mb-2 text-xs font-semibold text-gray-700">
                      الدولة
                      <span className="mr-1 text-red-500">*</span>
                    </label>

                    <div className="relative">
                      <FaGlobe className="absolute text-sm text-gray-400 -translate-y-1/2 right-3 top-1/2" />

                      <Field
                        name="country"
                        type="text"
                        placeholder="مثال: مصر"
                        className="w-full py-3 pl-4 pr-10 text-sm text-gray-700 transition-all border border-gray-200 outline-none rounded-xl bg-gray-50/50 placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                      />
                    </div>

                    <ErrorMessage
                      name="country"
                      component="p"
                      className="mt-1.5 text-xs font-medium text-red-500"
                    />
                  </div>
                </div>
              </div>

              {/* ============================================
                  FOOTER
              ============================================ */}

              <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50/70">
                {/* Cancel */}
                <button
                  type="button"
                  onClick={() => setOpenAddOffice(false)}
                  disabled={isSubmitting || loadding}
                  className="rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-600 transition-all hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  إلغاء
                </button>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting || loadding}
                  className="flex min-w-[140px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                >
                  {isSubmitting || loadding ? (
                    <>
                      <span className="w-4 h-4 border-2 rounded-full animate-spin border-white/30 border-t-white" />
                      <span>جاري الإضافة...</span>
                    </>
                  ) : (
                    <>
                      <FaPlus className="text-xs" />
                      <span>إضافة المكتب</span>
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

export default AddOffice;
