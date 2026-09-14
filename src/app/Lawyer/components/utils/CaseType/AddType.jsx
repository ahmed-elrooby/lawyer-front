
"use client";

import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  FaGavel,
  FaTimes,
  FaPlus,
  FaAlignRight,
} from "react-icons/fa";
import { LawyerContext } from "../../../../../Providers/LawyerContext/lawyer.js";

const AddType = () => {
  const {
 setOpenAddCaseType,openAddCaseType,handleAddCaseTypeFun,
    loadding,
  } = useContext(LawyerContext);

  if (!openAddCaseType) return null;

  const validationSchema = Yup.object({
    name: Yup.string()
      .trim()
      .required("اسم نوع القضية مطلوب")
      .min(2, "اسم نوع القضية يجب أن يكون حرفين على الأقل")
      .max(100, "اسم نوع القضية يجب ألا يتجاوز 100 حرف"),

    description: Yup.string()
      .trim()
      .max(500, "الوصف يجب ألا يتجاوز 500 حرف"),
  });

  const initialValues = {
    name: "",
    description: "",
  };


  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
      onClick={() => !loadding && setOpenAddCaseType(false)}
    >
      <div
        className="w-full max-w-lg overflow-hidden border shadow-2xl bg-slate-900 border-slate-700/60 shadow-black/30 rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative px-6 py-5 border-b border-slate-700/60">
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center border w-11 h-11 text-emerald-400 rounded-2xl bg-emerald-500/10 border-emerald-500/20"
            >
              <FaGavel className="text-lg" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-white">
                إضافة نوع قضية
              </h2>

              <p className="mt-0.5 text-xs text-slate-500">
                أضف نوع قضية جديد للمنصة
              </p>
            </div>
          </div>

          {/* Close */}
          <button
            type="button"
            onClick={() => setOpenAddCaseType(false)}
            disabled={loadding}
            className="absolute flex items-center justify-center transition-colors left-5 top-5 w-9 h-9 text-slate-400 rounded-xl hover:bg-slate-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            <FaTimes />
          </button>
        </div>

        {/* Form */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleAddCaseTypeFun}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="px-6 py-6 space-y-5">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-semibold text-slate-300"
                  >
                    اسم نوع القضية
                    <span className="mr-1 text-red-400">*</span>
                  </label>

                  <div className="relative">
                    <FaGavel
                      className="absolute -translate-y-1/2 pointer-events-none right-4 top-1/2 text-slate-500"
                    />

                    <Field
                      id="name"
                      name="name"
                      type="text"
                      placeholder="مثال: قضية جنائية"
                      className="
                        w-full
                        py-3.5 pr-11 pl-4
                        text-sm
                        transition-all
                        border
                        rounded-xl
                        outline-none

                        border-slate-700
                        bg-slate-800
                        text-white
                        placeholder:text-slate-500

                        focus:border-emerald-500
                        focus:ring-4
                        focus:ring-emerald-500/10
                      "
                    />
                  </div>

                  <ErrorMessage
                    name="name"
                    component="p"
                    className="
                      mt-1.5
                      text-xs font-medium
                      text-red-400
                    "
                  />
                </div>

                {/* Description */}
                <div>
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-semibold text-slate-300"
                  >
                    وصف النوع

                    <span
                      className="mr-1 text-xs font-normal text-slate-500"
                    >
                      (اختياري)
                    </span>
                  </label>

                  <div className="relative">
                    <FaAlignRight
                      className="absolute pointer-events-none right-4 top-4 text-slate-500"
                    />

                    <Field
                      as="textarea"
                      id="description"
                      name="description"
                      rows="4"
                      placeholder="اكتب وصفًا مختصرًا لنوع القضية..."
                      className="
                        w-full
                        py-3.5 pr-11 pl-4
                        text-sm
                        transition-all
                        border
                        rounded-xl
                        outline-none
                        resize-none

                        border-slate-700
                        bg-slate-800
                        text-white
                        placeholder:text-slate-500

                        focus:border-emerald-500
                        focus:ring-4
                        focus:ring-emerald-500/10
                      "
                    />
                  </div>

                  <ErrorMessage
                    name="description"
                    component="p"
                    className="
                      mt-1.5
                      text-xs font-medium
                      text-red-400
                    "
                  />
                </div>
              </div>

              {/* Footer */}
              <div
                className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-700/60 bg-slate-800/40"
              >
                {/* Cancel */}
                <button
                  type="button"
                  onClick={() => setOpenAddCaseType(false)}
                  className="
                    px-5 py-2.5
                    text-sm font-semibold
                    transition-colors
                    rounded-xl
                    text-slate-300
                    hover:bg-slate-800
                    hover:text-white
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                  "
                >
                  إلغاء
                </button>

                {/* Submit */}
                <button
                  type="submit"
                  className="
                    inline-flex items-center justify-center gap-2
                    px-5 py-2.5
                    text-sm font-semibold
                    text-white
                    transition-all
                    bg-emerald-500
                    shadow-lg
                    rounded-xl
                    shadow-emerald-950/30
                    hover:bg-emerald-600
                    hover:-translate-y-0.5
                    active:translate-y-0
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                    disabled:hover:translate-y-0
                  "
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
