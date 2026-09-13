
"use client";

import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FiX, FiFolderPlus } from "react-icons/fi";

import { AdminContext } from "../../../../../Providers/AdminContext/Admin.js";

const AddFileCategory = () => {
  const {
    openAddCategory,
    setOpenAddCategory,
    handleAddCategoryFun,loadding
  } = useContext(AdminContext);

  const initialValues = {
    name: "",
    description: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .trim()
      .required("اسم التصنيف مطلوب")
      .min(2, "اسم التصنيف يجب أن يكون حرفين على الأقل")
      .max(50, "اسم التصنيف لا يجب أن يتجاوز 50 حرفًا"),

    description: Yup.string()
      .trim()
      .required("وصف التصنيف مطلوب")
      .min(5, "الوصف يجب أن يكون 5 أحرف على الأقل")
      .max(250, "الوصف لا يجب أن يتجاوز 250 حرفًا"),
  });

  if (!openAddCategory) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg overflow-hidden bg-white shadow-2xl rounded-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center text-blue-600 h-11 w-11 rounded-xl bg-blue-50">
              <FiFolderPlus size={22} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-800">
                إضافة تصنيف جديد
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                أضف تصنيفًا جديدًا لتنظيم الملفات والمستندات
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOpenAddCategory(false)}
            className="flex items-center justify-center transition rounded-lg h-9 w-9 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Form */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleAddCategoryFun}
        >
          {({ isSubmitting }) => (
            <Form className="p-6 space-y-5">
              
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-semibold text-slate-700"
                >
                  اسم التصنيف
                </label>

                <Field
                  id="name"
                  name="name"
                  type="text"
                  placeholder="مثال: عقود"
                  className="w-full px-4 py-3 text-sm transition border outline-none rounded-xl border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                />

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
                  وصف التصنيف
                </label>

                <Field
                  as="textarea"
                  id="description"
                  name="description"
                  rows={4}
                  placeholder="مثال: جميع المستندات والعقود القانونية"
                  className="w-full px-4 py-3 text-sm leading-7 transition border outline-none resize-none rounded-xl border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                />

                <ErrorMessage
                  name="description"
                  component="p"
                  className="mt-1.5 text-xs font-medium text-red-500"
                />
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-5 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setOpenAddCategory(false)}
                  className="flex-1 px-4 py-3 text-sm font-semibold transition border rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  إلغاء
                </button>

                <button
                  type="submit"
                  className="flex-1 px-4 py-3 text-sm font-semibold text-white transition bg-blue-600 shadow-sm rounded-xl hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loadding ? "جاري الإضافة..." : "إضافة التصنيف"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddFileCategory;
