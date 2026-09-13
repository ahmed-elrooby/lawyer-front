"use client";

import React, { useContext, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import {
  FaFolderOpen,
  FaTimes,
  FaSave,
  FaAlignRight,
} from "react-icons/fa";

import { AdminContext } from "../../../../../Providers/AdminContext/Admin.js";

const UpdateFileCategory = ({ selectedCategory }) => {
  const {
    openUpdateCategory,
    setOpenUpdateCategory,
    handleUpdateCategoryFun,
    loadding,
  } = useContext(AdminContext);

  const [isUpdating, setIsUpdating] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string()
      .trim()
      .required("اسم التصنيف مطلوب")
      .min(2, "اسم التصنيف يجب أن يكون حرفين على الأقل")
      .max(100, "اسم التصنيف يجب ألا يتجاوز 100 حرف"),

    description: Yup.string()
      .trim()
      .max(500, "الوصف يجب ألا يتجاوز 500 حرف"),
  });

  const initialValues = {
    name: selectedCategory?.name || "",
    description: selectedCategory?.description || "",
  };





  return <>
 
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm"
      onClick={() => setOpenUpdateCategory(false)}
    >
      <div
        className="w-full max-w-lg overflow-hidden bg-white shadow-2xl rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center text-blue-600 w-11 h-11 rounded-xl bg-blue-50">
              <FaFolderOpen className="text-base" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-800">
                تعديل تصنيف الملف
              </h2>

              <p className="mt-0.5 text-xs text-slate-400">
                تعديل بيانات تصنيف الملفات
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOpenUpdateCategory(false)}
            className="flex items-center justify-center transition-colors rounded-lg w-9 h-9 text-slate-400 hover:bg-slate-100 hover:text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaTimes className="text-sm" />
          </button>
        </div>

        {/* Form */}
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values)=>{
            handleUpdateCategoryFun({
              id: selectedCategory?.id,
              values,
            })
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="px-6 py-6 space-y-5">
                {/* Name */}
                <div>
                  <label className="block mb-2 text-sm font-semibold text-slate-700">
                    اسم التصنيف
                    <span className="mr-1 text-red-500">*</span>
                  </label>

                  <div className="relative">
                    <FaFolderOpen className="absolute text-sm -translate-y-1/2 right-4 top-1/2 text-slate-400" />

                    <Field
                      type="text"
                      name="name"
                      placeholder="مثال: عقود"
                      className="w-full py-3 pl-4 text-sm transition-all border outline-none pr-11 rounded-xl border-slate-200 text-slate-700 placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:bg-slate-50 disabled:cursor-not-allowed"
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
                  <label className="block mb-2 text-sm font-semibold text-slate-700">
                    وصف التصنيف
                  </label>

                  <div className="relative">
                    <FaAlignRight className="absolute text-sm right-4 top-4 text-slate-400" />

                    <Field
                      as="textarea"
                      name="description"
                      rows={4}
                      placeholder="اكتب وصفًا مختصرًا للتصنيف..."
                      className="w-full py-3 pl-4 text-sm transition-all border outline-none resize-none pr-11 rounded-xl border-slate-200 text-slate-700 placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:bg-slate-50 disabled:cursor-not-allowed"
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
              <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-100 bg-slate-50/50">
                <button
                  type="button"
                  onClick={() => setOpenUpdateCategory(false)}
                  className="px-5 py-2.5 text-sm font-semibold transition-colors border rounded-xl border-slate-200 text-slate-600 bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  إلغاء
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white transition-all bg-blue-600 shadow-lg rounded-xl shadow-blue-600/20 hover:bg-blue-700 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  <FaSave className="text-xs" />

                  {loadding 
                    ? "جاري الحفظ..."
                    : "حفظ التعديلات"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  </>;
};

export default UpdateFileCategory;