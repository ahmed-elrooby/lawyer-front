
"use client";

import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import {
  FaFolderOpen,
  FaTimes,
  FaSave,
  FaAlignRight,
} from "react-icons/fa";

import { LawyerContext } from "../../../../../Providers/LawyerContext/lawyer.js";

const UpdateFileCategory = ({ selectedCategory }) => {
  const {
    setOpenUpdateCategory,
    handleUpdateCategoryFun,
    loadding,
  } = useContext(LawyerContext);

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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
      onClick={() => setOpenUpdateCategory(false)}
    >
      <div
        className="w-full max-w-lg overflow-hidden border shadow-2xl rounded-3xl border-slate-700/60 bg-slate-900 shadow-slate-950/50"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-5 border-b border-slate-700/60"
        >
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center border w-11 h-11 rounded-xl border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
            >
              <FaFolderOpen className="text-base" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-white">
                تعديل تصنيف الملف
              </h2>

              <p className="mt-0.5 text-xs text-slate-500">
                تعديل بيانات تصنيف الملفات
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOpenUpdateCategory(false)}
            disabled={loadding}
            className="flex items-center justify-center transition-all rounded-lg w-9 h-9 text-slate-500 hover:bg-slate-800 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaTimes className="text-sm" />
          </button>
        </div>

        {/* Form */}
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleUpdateCategoryFun({
              id: selectedCategory?._id,
              values,
            });
          }}
        >
          <Form>
            <div className="px-6 py-6 space-y-5">
              {/* Name */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-slate-300">
                  اسم التصنيف
                  <span className="mr-1 text-emerald-400">*</span>
                </label>

                <div className="relative">
                  <FaFolderOpen
                    className="absolute text-sm -translate-y-1/2 right-4 top-1/2 text-slate-500"
                  />

                  <Field
                    type="text"
                    name="name"
                    placeholder="مثال: عقود"
                    disabled={loadding}
                    className="w-full py-3 pl-4 text-sm text-white transition-all border outline-none pr-11 rounded-xl border-slate-700 bg-slate-800 placeholder:text-slate-500 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>

                <ErrorMessage
                  name="name"
                  component="p"
                  className="
                    mt-1.5
                    text-xs
                    font-medium
                    text-red-400
                  "
                />
              </div>

              {/* Description */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-slate-300">
                  وصف التصنيف
                </label>

                <div className="relative">
                  <FaAlignRight
                    className="absolute text-sm right-4 top-4 text-slate-500"
                  />

                  <Field
                    as="textarea"
                    name="description"
                    rows={4}
                    placeholder="اكتب وصفًا مختصرًا للتصنيف..."
                    disabled={loadding}
                    className="w-full py-3 pl-4 text-sm text-white transition-all border outline-none resize-none pr-11 rounded-xl border-slate-700 bg-slate-800 placeholder:text-slate-500 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>

                <ErrorMessage
                  name="description"
                  component="p"
                  className="
                    mt-1.5
                    text-xs
                    font-medium
                    text-red-400
                  "
                />
              </div>
            </div>

            {/* Footer */}
            <div
              className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-700/60 bg-slate-800/40"
            >
              <button
                type="button"
                onClick={() => setOpenUpdateCategory(false)}
                disabled={loadding}
                className="
                  px-5
                  py-2.5
                  text-sm
                  font-semibold
                  transition-all
                  border
                  rounded-xl
                  border-slate-700
                  bg-slate-800
                  text-slate-300
                  hover:bg-slate-700
                  hover:text-white
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                "
              >
                إلغاء
              </button>

              <button
                type="submit"
                disabled={loadding}
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  px-5
                  py-2.5
                  text-sm
                  font-semibold
                  text-white
                  transition-all
                  rounded-xl
                  bg-emerald-600
                  shadow-lg
                  shadow-emerald-900/30
                  hover:bg-emerald-500
                  hover:-translate-y-0.5
                  disabled:opacity-60
                  disabled:cursor-not-allowed
                  disabled:hover:translate-y-0
                "
              >
                <FaSave className="text-xs" />

                {loadding
                  ? "جاري الحفظ..."
                  : "حفظ التعديلات"}
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default UpdateFileCategory;
