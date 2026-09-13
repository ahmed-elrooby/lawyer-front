"use client";

import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaGavel, FaTimes, FaPlus, FaAlignRight } from "react-icons/fa";

import { AdminContext } from "../../../../../Providers/AdminContext/Admin.js";

const AddType = () => {
  const {
    openAddCaseType,
    setOpenAddCaseType,
    handleAddCaseTypeFun,
    loadding,
  } = useContext(AdminContext);

  if (!openAddCaseType) return null;

  const validationSchema = Yup.object({
    name: Yup.string()
      .trim()
      .required("اسم نوع القضية مطلوب")
      .min(2, "اسم نوع القضية يجب أن يكون حرفين على الأقل")
      .max(100, "اسم نوع القضية يجب ألا يتجاوز 100 حرف"),

    description: Yup.string().trim().max(500, "الوصف يجب ألا يتجاوز 500 حرف"),
  });

  const initialValues = {
    name: "",
    description: "",
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await handleAddCaseTypeFun(values);
      resetForm();
      setOpenAddCaseType(false);
    } catch (error) {
      // الـ Context مسؤول عن التعامل مع الخطأ
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm"
      onClick={() => setOpenAddCaseType(false)}
    >
      <div
        className="w-full max-w-lg overflow-hidden bg-white shadow-2xl rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative px-6 py-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center text-blue-600 w-11 h-11 bg-blue-50 rounded-2xl">
              <FaGavel className="text-lg" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-800">
                إضافة نوع قضية
              </h2>

              <p className="mt-0.5 text-xs text-slate-400">
                أضف نوع قضية جديد للمنصة
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOpenAddCaseType(false)}
            className="absolute flex items-center justify-center transition-colors w-9 h-9 text-slate-400 rounded-xl left-5 top-5 hover:bg-slate-100 hover:text-slate-600"
          >
            <FaTimes />
          </button>
        </div>

        {/* Form */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="px-6 py-6 space-y-5">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-semibold text-slate-700"
                  >
                    اسم نوع القضية
                    <span className="mr-1 text-red-500">*</span>
                  </label>

                  <div className="relative">
                    <FaGavel className="absolute -translate-y-1/2 pointer-events-none right-4 top-1/2 text-slate-400" />

                    <Field
                      id="name"
                      name="name"
                      type="text"
                      placeholder="مثال: قضية جنائية"
                      className="w-full py-3.5 pr-11 pl-4 text-sm transition-all border rounded-xl outline-none border-slate-200 bg-slate-50/50 text-slate-700 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                    />
                  </div>

                  <ErrorMessage
                    name="name"
                    component="p"
                    className="mt-1.5 text-xs font-medium text-red-500"
                  />
                </div>

                {/* Description */}
                <div>
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-semibold text-slate-700"
                  >
                    وصف النوع
                    <span className="mr-1 text-xs font-normal text-slate-400">
                      (اختياري)
                    </span>
                  </label>

                  <div className="relative">
                    <FaAlignRight className="absolute pointer-events-none right-4 top-4 text-slate-400" />

                    <Field
                      as="textarea"
                      id="description"
                      name="description"
                      rows="4"
                      placeholder="اكتب وصفًا مختصرًا لنوع القضية..."
                      className="w-full py-3.5 pr-11 pl-4 text-sm transition-all border rounded-xl outline-none resize-none border-slate-200 bg-slate-50/50 text-slate-700 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                    />
                  </div>

                  <ErrorMessage
                    name="description"
                    component="p"
                    className="mt-1.5 text-xs font-medium text-red-500"
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-3 px-6 py-4 border-t bg-slate-50/70 border-slate-100">
                <button
                  type="button"
                  onClick={() => setOpenAddCaseType(false)}
                  disabled={isSubmitting}
                  className="px-5 py-2.5 text-sm font-semibold transition-colors rounded-xl text-slate-600 hover:bg-slate-200/70 disabled:opacity-50"
                >
                  إلغاء
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white transition-all bg-blue-600 shadow-lg rounded-xl shadow-blue-600/20 hover:bg-blue-700 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                >
                  <FaPlus className="text-xs" />

                  {loadding ? "جاري الإضافة..." : "إضافة نوع القضية"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddType;
