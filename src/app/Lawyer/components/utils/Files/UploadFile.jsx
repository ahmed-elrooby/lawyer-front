"use client";

import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import {
  FiX,
  FiUploadCloud,
  FiFile,
  FiFileText,
} from "react-icons/fi";

import { LawyerContext } from "../../../../../Providers/LawyerContext/lawyer.js";

const UploadFile = () => {
  const {
    handleAddDocumentFun,
    openAddDocument,
    setOpenAddDocument,
    loadding,
  } = useContext(LawyerContext);

  const initialValues = {
    name: "",
    description: "",
    file: null,
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .trim()
      .required("اسم المستند مطلوب")
      .min(2, "اسم المستند يجب أن يكون حرفين على الأقل")
      .max(200, "اسم المستند لا يجب أن يتجاوز 200 حرفًا"),

    description: Yup.string()
      .trim()
      .max(1000, "الوصف لا يجب أن يتجاوز 1000 حرف"),

    file: Yup.mixed()
      .required("الملف مطلوب"),
  });

  if (!openAddDocument) return null;

  return (
    <div
      className="
        fixed inset-0 z-[100]
        flex items-center justify-center
        p-4
        bg-slate-950/80
        backdrop-blur-sm
      "
      onClick={() => !loadding && setOpenAddDocument(false)}
    >
      <div
        className="w-full max-w-2xl overflow-hidden border shadow-2xl bg-slate-900 border-slate-700/60 shadow-black/30 rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-700/60">
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center border w-11 h-11 rounded-xl bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
            >
              <FiUploadCloud size={22} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-white">
                إضافة مستند جديد
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                أضف مستندًا واحفظه ضمن ملفات المكتب
              </p>
            </div>
          </div>

          {/* Close */}
          <button
            type="button"
            onClick={() => setOpenAddDocument(false)}
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
          onSubmit={handleAddDocumentFun}
        >
          {({ values, setFieldValue }) => (
            <Form className="max-h-[78vh] overflow-y-auto add-case-scrollbar">
              <div className="p-6 space-y-5">

                {/* File Upload */}
                <div>
                  <label className="block mb-2 text-sm font-semibold text-slate-200">
                    الملف
                  </label>

                  <label
                    htmlFor="document-file"
                    className={`
                      group
                      flex flex-col items-center justify-center
                      w-full
                      px-6 py-8
                      cursor-pointer
                      transition-all duration-200
                      border border-dashed
                      rounded-xl

                      ${
                        values.file
                          ? `
                            border-emerald-500/40
                            bg-emerald-500/5
                          `
                          : `
                            border-slate-700
                            bg-slate-800
                            hover:border-emerald-500/40
                            hover:bg-slate-800/80
                          `
                      }
                    `}
                  >
                    {/* Icon */}
                    <div
                      className={`
                        flex items-center justify-center
                        w-14 h-14
                        mb-4
                        rounded-2xl
                        transition-colors

                        ${
                          values.file
                            ? `
                              bg-emerald-500/10
                              text-emerald-400
                            `
                            : `
                              bg-slate-700
                              text-slate-400
                              group-hover:text-emerald-400
                            `
                        }
                      `}
                    >
                      {values.file ? (
                        <FiFile size={24} />
                      ) : (
                        <FiUploadCloud size={25} />
                      )}
                    </div>

                    {/* Selected File */}
                    {values.file ? (
                      <>
                        <p className="max-w-full px-4 text-sm font-semibold text-white truncate">
                          {values.file.name}
                        </p>

                        <p className="mt-2 text-xs text-slate-500">
                          اضغط لاختيار ملف آخر
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="text-sm font-semibold text-slate-200">
                          اختر المستند
                        </p>

                        <p className="mt-2 text-xs text-slate-500">
                          PDF أو Word أو Excel أو الصور
                        </p>
                      </>
                    )}
                  </label>

                  <input
                    id="document-file"
                    type="file"
                    className="hidden"
                    disabled={loadding}
                    onChange={(event) => {
                      const file =
                        event.currentTarget.files?.[0];

                      if (!file) return;

                      setFieldValue("file", file);

                      if (!values.name) {
                        const fileName = file.name.replace(
                          /\.[^/.]+$/,
                          ""
                        );

                        setFieldValue(
                          "name",
                          fileName
                        );
                      }
                    }}
                  />

                  <ErrorMessage
                    name="file"
                    component="p"
                    className="mt-1.5 text-xs font-medium text-red-400"
                  />
                </div>

                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-semibold text-slate-200"
                  >
                    اسم المستند
                  </label>

                  <div className="relative">
                    <FiFileText
                      className="absolute -translate-y-1/2 pointer-events-none right-4 top-1/2 text-slate-500"
                      size={17}
                    />

                    <Field
                      id="name"
                      name="name"
                      type="text"
                      disabled={loadding}
                      placeholder="مثال: عقد إيجار المكتب"
                      className="w-full py-3 text-sm text-white transition-all duration-200 border outline-none px-11 rounded-xl border-slate-700 bg-slate-800 placeholder:text-slate-500 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 disabled:opacity-60 disabled:cursor-not-allowed"
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
                    htmlFor="description"
                    className="block mb-2 text-sm font-semibold text-slate-200"
                  >
                    وصف المستند
                    <span className="mr-1 text-xs font-normal text-slate-500">
                      (اختياري)
                    </span>
                  </label>

                  <Field
                    as="textarea"
                    id="description"
                    name="description"
                    rows={4}
                    disabled={loadding}
                    placeholder="اكتب وصفًا مختصرًا للمستند..."
                    className="w-full px-4 py-3 text-sm leading-7 text-white transition-all duration-200 border outline-none resize-none rounded-xl border-slate-700 bg-slate-800 placeholder:text-slate-500 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 disabled:opacity-60 disabled:cursor-not-allowed"
                  />

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

                {/* Info */}
                <div
                  className="flex items-start gap-3 p-4 border rounded-xl border-slate-700/60 bg-slate-800/40"
                >
                  <FiFile
                    className="flex-shrink-0 mt-0.5 text-emerald-400"
                    size={18}
                  />

                  <div>
                    <p className="text-xs font-semibold text-slate-300">
                      ملاحظة
                    </p>

                    <p className="mt-1 text-xs leading-6 text-slate-500">
                      سيتم حفظ المستند ضمن ملفات المكتب ويمكن
                      الرجوع إليه أو تحميله وطباعته لاحقًا.
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-5 border-t border-slate-700/60">
                  {/* Cancel */}
                  <button
                    type="button"
                    onClick={() => setOpenAddDocument(false)}
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
                      flex items-center justify-center gap-2
                      px-4 py-3
                      text-sm
                      font-semibold
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
                    {loadding ? (
                      <>
                        <span
                          className="w-4 h-4 border-2 rounded-full animate-spin border-white/30 border-t-white"
                        />

                        جاري رفع المستند...
                      </>
                    ) : (
                      <>
                        <FiUploadCloud size={17} />
                        رفع المستند
                      </>
                    )}
                  </button>
                </div>

              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UploadFile;