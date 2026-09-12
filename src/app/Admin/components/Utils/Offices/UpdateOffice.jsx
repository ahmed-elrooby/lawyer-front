"use client";

import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  FaBuilding,
  FaTimes,
  FaSave,
  FaSpinner,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaGlobe,
} from "react-icons/fa";

import { AdminContext } from "../../../../../Providers/AdminContext/Admin.js";

const UpdateOffice = ({ office }) => {
  const {
    handleUpdateOfficeFun,
    openUpdateOffice,
    setOpenUpdateOffice,
    loadding,
  } = useContext(AdminContext);

  if (!openUpdateOffice || !office) return null;

  const validationSchema = Yup.object({
    name: Yup.string()
      .trim()
      .min(2, "اسم المكتب يجب أن يكون حرفين على الأقل")
      .required("اسم المكتب مطلوب"),

    phone: Yup.string()
      .matches(/^(01)[0-9]{9}$/, "رقم الهاتف يجب أن يكون رقم مصري صحيح")
      .required("رقم الهاتف مطلوب"),

    email: Yup.string()
      .email("البريد الإلكتروني غير صحيح")
      .required("البريد الإلكتروني مطلوب"),

    address: Yup.string().trim().required("العنوان مطلوب"),

    city: Yup.string().trim().required("المدينة مطلوبة"),

    country: Yup.string().trim().required("الدولة مطلوبة"),
  });
  const initialValues = {
    name: office?.name || "",
    phone: office?.phone || "",
    email: office?.email || "",
    address: office?.address || "",
    city: office?.city || "",
    country: office?.country || "",
  };
  const handleClose = () => {
    if (loadding) return;

    setOpenUpdateOffice(false);
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/50 px-4 py-6 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
    >
      <div className="relative max-h-[92vh] w-full max-w-2xl overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl">
        {/* Top Line */}
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-400" />

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 sm:px-7">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 text-white shadow-lg rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-blue-500/20">
              <FaBuilding className="text-lg" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-800">تعديل المكتب</h2>

              <p className="mt-0.5 text-xs text-gray-400">
                تعديل بيانات المكتب وإدارة معلوماته
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={loadding}
            className="flex items-center justify-center text-gray-400 transition-all bg-gray-100 h-9 w-9 rounded-xl hover:bg-gray-200 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <FaTimes className="text-xs" />
          </button>
        </div>

        {/* Form */}
        <div className="max-h-[calc(92vh-90px)] overflow-y-auto p-6 sm:p-7">
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              handleUpdateOfficeFun({ id: office._id, values });
            }}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-5">
                {/* Office Name */}
                <div>
                  <label className="block mb-2 text-xs font-bold text-gray-700">
                    اسم المكتب
                  </label>

                  <div className="relative">
                    <FaBuilding className="absolute text-gray-400 -translate-y-1/2 right-4 top-1/2" />

                    <Field
                      name="name"
                      type="text"
                      placeholder="مثال: مكتب أحمد للمحاماة"
                      className="w-full h-12 pl-4 text-sm text-gray-700 transition-all border border-gray-200 outline-none rounded-xl bg-gray-50 pr-11 placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                    />
                  </div>

                  <ErrorMessage
                    name="name"
                    component="p"
                    className="mt-1.5 text-xs font-medium text-red-500"
                  />
                </div>

                {/* Phone + Email */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {/* Phone */}
                  <div>
                    <label className="block mb-2 text-xs font-bold text-gray-700">
                      رقم الهاتف
                    </label>

                    <div className="relative">
                      <FaPhone className="absolute text-gray-400 -translate-y-1/2 right-4 top-1/2" />

                      <Field
                        name="phone"
                        type="tel"
                        dir="ltr"
                        placeholder="01012345678"
                        className="w-full h-12 pl-4 text-sm text-gray-700 transition-all border border-gray-200 outline-none rounded-xl bg-gray-50 pr-11 placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
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
                    <label className="block mb-2 text-xs font-bold text-gray-700">
                      البريد الإلكتروني
                    </label>

                    <div className="relative">
                      <FaEnvelope className="absolute text-gray-400 -translate-y-1/2 right-4 top-1/2" />

                      <Field
                        name="email"
                        type="email"
                        dir="ltr"
                        placeholder="office@example.com"
                        className="w-full h-12 pl-4 text-sm text-gray-700 transition-all border border-gray-200 outline-none rounded-xl bg-gray-50 pr-11 placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                      />
                    </div>

                    <ErrorMessage
                      name="email"
                      component="p"
                      className="mt-1.5 text-xs font-medium text-red-500"
                    />
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block mb-2 text-xs font-bold text-gray-700">
                    العنوان
                  </label>

                  <div className="relative">
                    <FaMapMarkerAlt className="absolute text-gray-400 right-4 top-4" />

                    <Field
                      as="textarea"
                      name="address"
                      rows="3"
                      placeholder="أدخل عنوان المكتب بالتفصيل"
                      className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 py-3.5 pr-11 pl-4 text-sm text-gray-700 outline-none transition-all placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                    />
                  </div>

                  <ErrorMessage
                    name="address"
                    component="p"
                    className="mt-1.5 text-xs font-medium text-red-500"
                  />
                </div>

                {/* City + Country */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {/* City */}
                  <div>
                    <label className="block mb-2 text-xs font-bold text-gray-700">
                      المدينة
                    </label>

                    <div className="relative">
                      <FaMapMarkerAlt className="absolute text-gray-400 -translate-y-1/2 right-4 top-1/2" />

                      <Field
                        name="city"
                        type="text"
                        placeholder="بني سويف"
                        className="w-full h-12 pl-4 text-sm text-gray-700 transition-all border border-gray-200 outline-none rounded-xl bg-gray-50 pr-11 placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
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
                    <label className="block mb-2 text-xs font-bold text-gray-700">
                      الدولة
                    </label>

                    <div className="relative">
                      <FaGlobe className="absolute text-gray-400 -translate-y-1/2 right-4 top-1/2" />

                      <Field
                        name="country"
                        type="text"
                        placeholder="Egypt"
                        className="w-full h-12 pl-4 text-sm text-gray-700 transition-all border border-gray-200 outline-none rounded-xl bg-gray-50 pr-11 placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                      />
                    </div>

                    <ErrorMessage
                      name="country"
                      component="p"
                      className="mt-1.5 text-xs font-medium text-red-500"
                    />
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col-reverse gap-3 pt-5 border-t border-gray-100 sm:flex-row">
                  <button
                    type="button"
                    onClick={handleClose}
                    disabled={loadding || isSubmitting}
                    className="flex-1 h-12 text-sm font-bold text-gray-600 transition-all bg-white border border-gray-200 rounded-xl hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    إلغاء
                  </button>

                  <button
                    type="submit"
                    disabled={loadding || isSubmitting}
                    className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-500/25 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                  >
                    {loadding || isSubmitting ? (
                      <>
                        <FaSpinner className="animate-spin" />
                        جاري الحفظ...
                      </>
                    ) : (
                      <>
                        <FaSave className="text-xs" />
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
    </div>
  );
};

export default UpdateOffice;
