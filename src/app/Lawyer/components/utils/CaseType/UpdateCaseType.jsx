
"use client";

import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import {
  FaGavel,
  FaTimes,
  FaSave,
  FaAlignRight,
} from "react-icons/fa";

import { LawyerContext } from "../../../../../Providers/LawyerContext/lawyer.js";

const UpdateCaseType = ({ selectCaseType }) => {
  const {
    openUpdateCase,
        setOpenUpdateCase,
    handleUpdateCaseFun,
    loadding,
  } = useContext(LawyerContext);

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
    name: selectCaseType?.name || "",
    description: selectCaseType?.description || "",
  };

  if (!openUpdateCase || !selectCaseType) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
      onClick={() => {
        if (!loadding) {
          setOpenUpdateCase(false);
        }
      }}
    >
      <div
        className="w-full max-w-lg overflow-hidden border shadow-2xl bg-slate-900 border-slate-700/60 rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-5 border-b border-slate-700/60"
        >
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center border w-11 h-11 text-emerald-400 rounded-xl bg-emerald-500/10 border-emerald-500/20"
            >
              <FaGavel className="text-base" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-white">
                تعديل نوع القضية
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                تعديل بيانات نوع القضية
              </p>
            </div>
          </div>

          <button
            type="button"
            disabled={loadding}
            onClick={() => setOpenUpdateCase(false)}
            className="flex items-center justify-center transition-all border rounded-lg w-9 h-9 text-slate-500 bg-slate-800 border-slate-700 hover:bg-slate-700 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <FaTimes className="text-sm" />
          </button>
        </div>

        {/* Form */}
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={
            (values)=>{
              handleUpdateCaseFun({values, id: selectCaseType._id});
            }
          }
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="px-6 py-6 space-y-5">
                {/* Name */}
                <div>
                  <label
                    className="block mb-2 text-sm font-semibold text-slate-300"
                  >
                    اسم نوع القضية

                    <span className="mr-1 text-red-400">
                      *
                    </span>
                  </label>

                  <div className="relative">
                    <FaGavel
                      className="absolute text-sm -translate-y-1/2 right-4 top-1/2 text-slate-500"
                    />

                    <Field
                      type="text"
                      name="name"
                      disabled={loadding}
                      placeholder="مثال: قضية جنائية"
                      className="w-full py-3 pl-4 text-sm text-white transition-all border outline-none pr-11 rounded-xl bg-slate-800 border-slate-700 placeholder:text-slate-500 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 disabled:bg-slate-800/60 disabled:text-slate-500 disabled:cursor-not-allowed"
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
                  <label
                    className="block mb-2 text-sm font-semibold text-slate-300"
                  >
                    وصف نوع القضية
                  </label>

                  <div className="relative">
                    <FaAlignRight
                      className="absolute text-sm right-4 top-4 text-slate-500"
                    />

                    <Field
                      as="textarea"
                      name="description"
                      rows={4}
                      disabled={loadding || isSubmitting}
                      placeholder="اكتب وصفًا مختصرًا لنوع القضية..."
                      className="w-full py-3 pl-4 text-sm text-white transition-all border outline-none resize-none pr-11 rounded-xl bg-slate-800 border-slate-700 placeholder:text-slate-500 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 disabled:bg-slate-800/60 disabled:text-slate-500 disabled:cursor-not-allowed"
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
                {/* Cancel */}
                <button
                  type="button"
                  disabled={loadding }
                  onClick={() => setOpenUpdateCase(false)}
                  className="
                    px-5 py-2.5
                    text-sm
                    font-semibold
                    transition-all
                    border
                    rounded-xl

                    bg-slate-800
                    border-slate-700
                    text-slate-300

                    hover:bg-slate-700
                    hover:text-white

                    disabled:opacity-40
                    disabled:cursor-not-allowed
                  "
                >
                  إلغاء
                </button>

                {/* Save */}
                <button
                  type="submit"
                  disabled={loadding || isSubmitting}
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

                    bg-emerald-500
                    rounded-xl

                    shadow-lg
                    shadow-emerald-950/30

                    hover:bg-emerald-600
                    hover:-translate-y-0.5

                    disabled:opacity-50
                    disabled:cursor-not-allowed
                    disabled:hover:translate-y-0
                  "
                >
                  <FaSave className="text-xs" />

                  {loadding || isSubmitting
                    ? "جاري الحفظ..."
                    : "حفظ التعديلات"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UpdateCaseType;
