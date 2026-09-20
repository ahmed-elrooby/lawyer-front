"use client";

import React, { useContext, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  X,
  Upload,
  FileText,
  File,
  Trash2,
} from "lucide-react";
import { OwnerContext } from "../../../../../Providers/LawyerOwner/OwnerProvider.js";

const AddFile = () => {
  const {
    openAddDocument,
    setOpenAddDocument,
    handleAddDocumentFun,
    loadding,
  } = useContext(OwnerContext);

  const fileInputRef = useRef(null);

  const initialValues = {
    name: "",
    description: "",
    file: null,
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .trim()
      .min(3, "اسم الصيغة يجب أن يكون 3 أحرف على الأقل")
      .required("اسم الصيغة مطلوب"),

    description: Yup.string()
      .trim()
      .max(1000, "الوصف لا يمكن أن يتجاوز 1000 حرف"),

    file: Yup.mixed()
      .required("يجب اختيار ملف")
      .test(
        "fileType",
        "يسمح فقط بملفات PDF و Word",
        (value) => {
          if (!value) return false;

          const allowedTypes = [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          ];

          return allowedTypes.includes(value.type);
        }
      )
      .test(
        "fileSize",
        "حجم الملف يجب ألا يتجاوز 10 ميجابايت",
        (value) => {
          if (!value) return false;

          return value.size <= 10 * 1024 * 1024;
        }
      ),
  });

  if (!openAddDocument) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
      dir="rtl"
    >
      <div className="flex max-h-[90vh] w-full max-w-xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header - Fixed */}
        <div className="flex items-center justify-between px-6 py-5 bg-white border-b border-gray-100 shrink-0">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              إضافة صيغة دعوى
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              أضف صيغة دعوى جديدة للمكتب
            </p>
          </div>

          <button
            type="button"
            onClick={() => setOpenAddDocument(false)}
            className="flex items-center justify-center text-gray-500 transition rounded-lg h-9 w-9 hover:bg-gray-100 hover:text-gray-700"
          >
            <X size={19} />
          </button>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleAddDocumentFun(values);
          }}
        >
          {({ values, setFieldValue, setFieldTouched }) => (
            <Form className="flex flex-col flex-1 min-h-0">
              {/* Scrollable Content */}
              <div className="flex-1 min-h-0 px-6 py-6 overflow-y-auto">
                <div className="space-y-5">
                  {/* Name */}
                  <div>
                    <label className="block mb-2 text-sm font-semibold text-gray-700">
                      اسم الصيغة
                    </label>

                    <Field
                      name="name"
                      type="text"
                      placeholder="مثال: صيغة دعوى مطالبة بمبلغ مالي"
                      className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#C9A227] focus:ring-2 focus:ring-[#C9A227]/10"
                    />

                    <ErrorMessage
                      name="name"
                      component="div"
                      className="mt-1.5 text-xs text-red-500"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block mb-2 text-sm font-semibold text-gray-700">
                      وصف الصيغة
                    </label>

                    <Field
                      as="textarea"
                      name="description"
                      rows={5}
                      placeholder="اكتب وصفًا مختصرًا للصيغة..."
                      className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#C9A227] focus:ring-2 focus:ring-[#C9A227]/10"
                    />

                    <ErrorMessage
                      name="description"
                      component="div"
                      className="mt-1.5 text-xs text-red-500"
                    />
                  </div>

                  {/* File */}
                  <div>
                    <label className="block mb-2 text-sm font-semibold text-gray-700">
                      ملف الصيغة
                    </label>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      onChange={(event) => {
                        const file =
                          event.currentTarget.files?.[0] || null;

                        setFieldValue("file", file);
                        setFieldTouched("file", true);
                      }}
                    />

                    {!values.file ? (
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex w-full flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 px-5 py-8 transition hover:border-[#C9A227] hover:bg-[#C9A227]/5"
                      >
                        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[#C9A227]/10 text-[#C9A227]">
                          <Upload size={22} />
                        </div>

                        <p className="text-sm font-semibold text-gray-700">
                          اضغط لاختيار ملف
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                          PDF أو Word — بحد أقصى 10 ميجابايت
                        </p>
                      </button>
                    ) : (
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-gray-50">
                        <div className="flex items-center min-w-0 gap-3">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#C9A227]/10 text-[#C9A227]">
                            {values.file.type === "application/pdf" ? (
                              <FileText size={21} />
                            ) : (
                              <File size={21} />
                            )}
                          </div>

                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-gray-800 truncate">
                              {values.file.name}
                            </p>

                            <p className="mt-1 text-xs text-gray-400">
                              {(values.file.size / (1024 * 1024)).toFixed(2)}{" "}
                              MB
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            setFieldValue("file", null);

                            if (fileInputRef.current) {
                              fileInputRef.current.value = "";
                            }
                          }}
                          className="flex items-center justify-center text-red-500 transition rounded-lg h-9 w-9 shrink-0 hover:bg-red-50"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    )}

                    <ErrorMessage
                      name="file"
                      component="div"
                      className="mt-1.5 text-xs text-red-500"
                    />
                  </div>
                </div>
              </div>

              {/* Footer - Fixed */}
              <div className="flex items-center justify-start gap-3 px-6 py-4 border-t border-gray-100 shrink-0 bg-gray-50">
                <button
                  type="button"
                  onClick={() => setOpenAddDocument(false)}
                  className="h-10 px-5 text-sm font-medium text-gray-700 transition bg-white border border-gray-200 rounded-xl hover:bg-gray-100"
                >
                  إلغاء
                </button>

                <button
                  type="submit"
                  disabled={loadding}
                  className="h-10 rounded-xl bg-[#C9A227] px-6 text-sm font-semibold text-white transition hover:bg-[#b8901f] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loadding ? "جاري الإضافة..." : "إضافة الصيغة"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddFile;