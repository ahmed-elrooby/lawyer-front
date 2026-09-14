
"use client";

import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FiX, FiFolderPlus } from "react-icons/fi";

import { LawyerContext } from "../../../../../Providers/LawyerContext/lawyer.js";

const AddFileCategory = () => {
  const {
    openAddCategory,
    setOpenAddCategory,
    handleAddCategoryFun,
    loadding,
  } = useContext(LawyerContext);

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
    <div
      className="
        fixed inset-0 z-[100]
        flex items-center justify-center
        p-4
        bg-slate-950/80
        backdrop-blur-sm
      "
      onClick={() => !loadding && setOpenAddCategory(false)}
    >
      <div
        className="w-full max-w-lg overflow-hidden border shadow-2xl bg-slate-900 border-slate-700/60 shadow-black/30 rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-700/60">
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center border w-11 h-11 rounded-xl bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
            >
              <FiFolderPlus size={22} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-white">
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
            disabled={loadding}
            className="flex items-center justify-center transition-colors rounded-lg w-9 h-9 text-slate-400 hover:bg-slate-800 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
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
          <Form className="p-6 space-y-5">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-semibold text-slate-200"
              >
                اسم التصنيف
              </label>

              <Field
                id="name"
                name="name"
                type="text"
                disabled={loadding}
                placeholder="مثال: عقود"
                className="w-full px-4 py-3 text-sm text-white transition-all duration-200 border outline-none rounded-xl border-slate-700 bg-slate-800 placeholder:text-slate-500 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 disabled:opacity-60 disabled:cursor-not-allowed"
              />

              <ErrorMessage
                name="name"
                component="p"
                className="mt-1.5 text-xs font-medium text-red-400"
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-semibold text-slate-200"
              >
                وصف التصنيف
              </label>

              <Field
                as="textarea"
                id="description"
                name="description"
                rows={4}
                disabled={loadding}
                placeholder="مثال: جميع المستندات والعقود القانونية"
                className="w-full px-4 py-3 text-sm leading-7 text-white transition-all duration-200 border outline-none resize-none rounded-xl border-slate-700 bg-slate-800 placeholder:text-slate-500 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 disabled:opacity-60 disabled:cursor-not-allowed"
              />

              <ErrorMessage
                name="description"
                component="p"
                className="mt-1.5 text-xs font-medium text-red-400"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-5 border-t border-slate-700/60">
              {/* Cancel */}
              <button
                type="button"
                onClick={() => setOpenAddCategory(false)}
                disabled={loadding}
                className="flex-1 px-4 py-3 text-sm font-semibold transition-all duration-200 border rounded-xl border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                إلغاء
              </button>

              {/* Submit */}
              <button
                type="submit"
                disabled={loadding}
                className="
                  flex-1
                  px-4 py-3
                  text-sm font-semibold
                  text-white
                  rounded-xl
                  bg-emerald-500
                  shadow-lg
                  shadow-emerald-500/20
                  transition-all duration-200
                  hover:bg-emerald-600
                  hover:-translate-y-0.5
                  active:translate-y-0
                  disabled:opacity-60
                  disabled:cursor-not-allowed
                  disabled:hover:translate-y-0
                "
              >
                {loadding ? "جاري الإضافة..." : "إضافة التصنيف"}
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default AddFileCategory;
