
"use client";

import React, { useContext, useEffect, useState } from "react";
import {
  FaTimes,
  FaFileAlt,
  FaUpload,
  FaSave,
  FaSpinner,
} from "react-icons/fa";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { LawyerContext } from "../../../../../Providers/LawyerContext/lawyer.js";

const UpdateFile = ({ selectFile }) => {
  const {
    openUpdateDocument,
    setOpenUpdateDocument,
    handleUpdateDocumentFun,
    loadding,
  } = useContext(LawyerContext);

  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    if (!openUpdateDocument) {
      setSelectedFile(null);
    }
  }, [openUpdateDocument]);

  if (!openUpdateDocument || !selectFile) return null;

  const initialValues = {
    name: selectFile?.name || "",
    categoryId: selectFile?.categoryId?._id || selectFile?.categoryId || "",
    description: selectFile?.description || "",
    caseId: selectFile?.caseId?._id || selectFile?.caseId || "",
    clientId: selectFile?.clientId?._id || selectFile?.clientId || "",
    sessionId: selectFile?.sessionId?._id || selectFile?.sessionId || "",
    file: null,
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .trim()
      .required("اسم الملف مطلوب")
      .max(200, "اسم الملف يجب ألا يتجاوز 200 حرف"),

    categoryId: Yup.string().required("تصنيف الملف مطلوب"),

    description: Yup.string().max(
      1000,
      "الوصف يجب ألا يتجاوز 1000 حرف",
    ),
  });

 
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 px-4 py-6 backdrop-blur-sm"
   
    >
      <div className="flex max-h-[90vh] add-case-scrollbar w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b shrink-0 border-slate-800">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400">
              <FaFileAlt />
            </div>

            <div>
              <h2 className="text-base font-bold text-white">
                تعديل الملف
              </h2>

              <p className="mt-0.5 text-xs text-slate-400">
                تعديل بيانات المستند
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOpenUpdateDocument(false)}
            className="p-2 transition rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <FaTimes />
          </button>
        </div>

        {/* Form */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values)=>{
handleUpdateDocumentFun({id:selectFile?._id,values})
          }}
          enableReinitialize
        >
          {({ setFieldValue, values }) => (
            <Form className="overflow-y-auto">
              <div className="p-5 space-y-5">
                {/* File Name */}
                <div>
                  <label className="block mb-2 text-sm font-semibold text-slate-200">
                    اسم الملف
                  </label>

                  <Field
                    name="name"
                    type="text"
                    placeholder="أدخل اسم الملف"
                    className="w-full px-4 py-3 text-sm text-white transition border outline-none rounded-xl border-slate-700 bg-slate-800/70 placeholder:text-slate-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10"
                  />

                  <ErrorMessage
                    name="name"
                    component="p"
                    className="mt-1.5 text-xs text-red-400"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block mb-2 text-sm font-semibold text-slate-200">
                    تصنيف الملف
                  </label>

                  <Field
                    as="select"
                    name="categoryId"
                    className="w-full px-4 py-3 text-sm text-white transition border outline-none rounded-xl border-slate-700 bg-slate-800/70 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10"
                  >
                    <option value="">اختر التصنيف</option>

                    {/* لو عندك categories في Context حطها هنا */}
                  </Field>

                  <ErrorMessage
                    name="categoryId"
                    component="p"
                    className="mt-1.5 text-xs text-red-400"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block mb-2 text-sm font-semibold text-slate-200">
                    وصف الملف
                  </label>

                  <Field
                    as="textarea"
                    name="description"
                    rows={4}
                    placeholder="أدخل وصف الملف..."
                    className="w-full px-4 py-3 text-sm text-white transition border outline-none resize-none rounded-xl border-slate-700 bg-slate-800/70 placeholder:text-slate-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10"
                  />

                  <ErrorMessage
                    name="description"
                    component="p"
                    className="mt-1.5 text-xs text-red-400"
                  />
                </div>

                {/* Current File */}
                <div className="p-4 border rounded-xl border-slate-700 bg-slate-800/40">
                  <p className="mb-2 text-xs font-medium text-slate-400">
                    الملف الحالي
                  </p>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg shrink-0 bg-cyan-500/10 text-cyan-400">
                      <FaFileAlt />
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm font-semibold truncate text-slate-200">
                        {selectFile?.originalName || selectFile?.name}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        يمكنك اختيار ملف جديد لاستبدال الملف الحالي
                      </p>
                    </div>
                  </div>
                </div>

                {/* Replace File */}
                <div>
                  <label className="block mb-2 text-sm font-semibold text-slate-200">
                    استبدال الملف
                    <span className="mr-2 text-xs font-normal text-slate-500">
                      (اختياري)
                    </span>
                  </label>

                  <label
                    htmlFor="update-file"
                    className="flex flex-col items-center justify-center px-4 py-6 transition border border-dashed cursor-pointer rounded-xl border-slate-600 bg-slate-800/30 hover:border-cyan-500 hover:bg-cyan-500/5"
                  >
                    <FaUpload className="mb-2 text-xl text-slate-400" />

                    <span className="text-sm font-medium text-slate-300">
                      {selectedFile
                        ? selectedFile.name
                        : "اضغط لاختيار ملف جديد"}
                    </span>

                    <span className="mt-1 text-xs text-slate-500">
                      اترك الحقل فارغًا للاحتفاظ بالملف الحالي
                    </span>
                  </label>

                  <input
                    id="update-file"
                    type="file"
                    className="hidden"
                    onChange={(event) => {
                      const file = event.currentTarget.files?.[0] || null;

                      setSelectedFile(file);
                      setFieldValue("file", file);
                    }}
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="flex gap-3 px-5 py-4 border-t shrink-0 border-slate-800 bg-slate-950/30">
                <button
                  type="button"
                  onClick={() => setOpenUpdateDocument(false)}
                  className="flex-1 px-4 py-3 text-sm font-semibold transition border rounded-xl border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  إلغاء
                </button>

                <button
                  type="submit"
                  disabled={loadding}
                  className="flex items-center justify-center flex-1 gap-2 px-4 py-3 text-sm font-semibold text-white transition rounded-xl bg-cyan-500 hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loadding ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      جاري الحفظ...
                    </>
                  ) : (
                    <>
                      <FaSave />
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
  );
};

export default UpdateFile;
