
"use client";

import React, {
  useContext,
  useRef,
  useState,
} from "react";

import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from "formik";

import * as Yup from "yup";

import {
  FaTimes,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaIdCard,
  FaMapMarkerAlt,
  FaCity,
  FaGlobe,
  FaStickyNote,
  FaCamera,
  FaTrash,
  FaImage,
  FaPlus,
  FaFileAlt,
  FaFilePdf,
  FaFileWord,
} from "react-icons/fa";

import { LawyerContext } from "../../../../../Providers/LawyerContext/lawyer.js";

const AddClient = () => {
  const {
    loadding,
    openAddClient,
    setOpenAddClient,
    handleAddClientFun,
  } = useContext(LawyerContext);

  const fileInputRef = useRef(null);

  const documentInputRefs = useRef([]);

  const [imagePreview, setImagePreview] =
    useState(null);

  const [documentPreviews, setDocumentPreviews] =
    useState([]);

  // ==========================================
  // Initial Values
  // ==========================================

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    nationalId: "",
    address: "",
    city: "",
    country: "مصر",
    notes: "",
    profileImage: null,

    documents: [],
  };

  // ==========================================
  // Validation
  // ==========================================

  const validationSchema = Yup.object({
    name: Yup.string()
      .trim()
      .required("اسم العميل مطلوب"),

    email: Yup.string().email(
      "البريد الإلكتروني غير صحيح",
    ),

    phone: Yup.string().trim(),

    nationalId: Yup.string()
      .trim()
      .matches(
        /^(\d{14})?$/,
        "الرقم القومي يجب أن يكون 14 رقم",
      ),

    address: Yup.string().trim(),

    city: Yup.string().trim(),

    country: Yup.string().trim(),

    notes: Yup.string().trim(),

    profileImage: Yup.mixed()
      .nullable()
      .test(
        "fileType",
        "يسمح فقط بصور JPG أو JPEG أو PNG أو WEBP",
        (value) => {
          if (!value) return true;

          return [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/webp",
          ].includes(value.type);
        },
      )
      .test(
        "fileSize",
        "حجم الصورة يجب ألا يتجاوز 5MB",
        (value) => {
          if (!value) return true;

          return (
            value.size <=
            5 * 1024 * 1024
          );
        },
      ),

    documents: Yup.array().of(
      Yup.object({
        name: Yup.string()
          .trim()
          .required("اسم المستند مطلوب"),

        file: Yup.mixed()
          .required("ملف المستند مطلوب")
          .test(
            "fileType",
            "نوع الملف غير مسموح",
            (value) => {
              if (!value) return false;

              return [
                "image/jpeg",
                "image/png",
                "image/webp",
                "application/pdf",
                "application/msword",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
              ].includes(value.type);
            },
          )
          .test(
            "fileSize",
            "حجم المستند يجب ألا يتجاوز 10MB",
            (value) => {
              if (!value) return false;

              return (
                value.size <=
                10 * 1024 * 1024
              );
            },
          ),
      }),
    ),
  });

  // ==========================================
  // Don't Render
  // ==========================================

  if (!openAddClient) return null;

  // ==========================================
  // Classes
  // ==========================================

  const inputClass = `
    w-full
    rounded-lg
    border border-slate-700
    bg-slate-900
    px-4 py-2.5 pr-10
    text-sm text-slate-100
    outline-none
    transition
    placeholder:text-slate-600
    focus:border-blue-500
    focus:ring-1
    focus:ring-blue-500/30
    autofill:bg-slate-900
  `;

  const textareaClass = `
    w-full
    rounded-lg
    border border-slate-700
    bg-slate-900
    px-4 py-2.5 pr-10
    text-sm text-slate-100
    outline-none
    transition
    resize-none
    placeholder:text-slate-600
    focus:border-blue-500
    focus:ring-1
    focus:ring-blue-500/30
  `;

  // ==========================================
  // Document File Handler
  // ==========================================

  const handleDocumentChange = (
    event,
    index,
    setFieldValue,
  ) => {
    const file =
      event.currentTarget.files?.[0];

    if (!file) return;

    setFieldValue(
      `documents[${index}].file`,
      file,
    );

    // Preview
    if (file.type.startsWith("image/")) {
      const previewUrl =
        URL.createObjectURL(file);

      setDocumentPreviews((prev) => {
        const updated = [...prev];

        updated[index] = {
          type: "image",
          url: previewUrl,
          name: file.name,
        };

        return updated;
      });
    } else {
      setDocumentPreviews((prev) => {
        const updated = [...prev];

        updated[index] = {
          type: "file",
          url: null,
          name: file.name,
        };

        return updated;
      });
    }
  };

  // ==========================================
  // Add Document
  // ==========================================

  const handleAddDocument = (
    values,
    setFieldValue,
  ) => {
    const documents = [
      ...(values.documents || []),
    ];

    documents.push({
      name: "",
      file: null,
    });

    setFieldValue(
      "documents",
      documents,
    );

    setDocumentPreviews((prev) => [
      ...prev,
      null,
    ]);
  };

  // ==========================================
  // Remove Document
  // ==========================================

  const handleRemoveDocument = (
    index,
    values,
    setFieldValue,
  ) => {
    const documents = [
      ...(values.documents || []),
    ];

    documents.splice(index, 1);

    setFieldValue(
      "documents",
      documents,
    );

    setDocumentPreviews((prev) => {
      const updated = [...prev];

      if (updated[index]?.url) {
        URL.revokeObjectURL(
          updated[index].url,
        );
      }

      updated.splice(index, 1);

      return updated;
    });

    documentInputRefs.current.splice(
      index,
      1,
    );
  };

  // ==========================================
  // Render
  // ==========================================

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-3xl overflow-hidden border shadow-2xl rounded-xl border-slate-700 bg-slate-800">

        {/* ============================== */}
        {/* Header */}
        {/* ============================== */}

        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-700">
          <div>
            <h2 className="text-base font-semibold text-white">
              إضافة عميل جديد
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              أضف بيانات العميل الأساسية والمستندات
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              setOpenAddClient(false)
            }
            className="flex items-center justify-center w-8 h-8 transition rounded-lg text-slate-500 hover:bg-slate-700 hover:text-white"
          >
            <FaTimes className="text-sm" />
          </button>
        </div>

        {/* ============================== */}
        {/* Form */}
        {/* ============================== */}

        <Formik
          initialValues={initialValues}
          validationSchema={
            validationSchema
          }
          onSubmit={handleAddClientFun}
        >
          {({
            setFieldValue,
            values,
          }) => (
            <Form className="dark-scrollbar max-h-[75vh] overflow-y-auto p-5">

              {/* ============================== */}
              {/* Profile Image */}
              {/* ============================== */}

              <div className="flex items-center gap-4 p-4 mb-5 border rounded-xl border-slate-700 bg-slate-900/50">

                <div className="relative shrink-0">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="صورة العميل"
                      className="object-cover w-20 h-20 border-2 rounded-full border-slate-600"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-20 h-20 border-2 border-dashed rounded-full border-slate-600 bg-slate-800">
                      <FaUser className="text-2xl text-slate-600" />
                    </div>
                  )}

                  {imagePreview && (
                    <button
                      type="button"
                      onClick={() => {
                        setFieldValue(
                          "profileImage",
                          null,
                        );

                        setImagePreview(null);

                        if (
                          fileInputRef.current
                        ) {
                          fileInputRef.current.value =
                            "";
                        }
                      }}
                      className="absolute flex items-center justify-center w-6 h-6 text-xs text-white transition bg-red-500 rounded-full -top-1 -right-1 hover:bg-red-600"
                    >
                      <FaTrash />
                    </button>
                  )}
                </div>

                <div className="flex-1">
                  <p className="mb-1 text-sm font-medium text-slate-200">
                    صورة العميل
                  </p>

                  <p className="mb-3 text-xs text-slate-500">
                    JPG, PNG, WEBP بحد أقصى 5MB
                  </p>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={(event) => {
                      const file =
                        event.currentTarget
                          .files?.[0];

                      if (!file) return;

                      setFieldValue(
                        "profileImage",
                        file,
                      );

                      const previewUrl =
                        URL.createObjectURL(
                          file,
                        );

                      setImagePreview(
                        previewUrl,
                      );
                    }}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      fileInputRef.current?.click()
                    }
                    className="inline-flex items-center gap-2 px-3 py-2 text-xs font-medium text-white transition border rounded-lg border-slate-700 bg-slate-800 hover:bg-slate-700"
                  >
                    {imagePreview ? (
                      <>
                        <FaCamera />
                        تغيير الصورة
                      </>
                    ) : (
                      <>
                        <FaImage />
                        اختيار صورة
                      </>
                    )}
                  </button>

                  <ErrorMessage
                    name="profileImage"
                    component="p"
                    className="mt-2 text-xs text-red-400"
                  />
                </div>
              </div>

              {/* ============================== */}
              {/* Client Information */}
              {/* ============================== */}

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                {/* Name */}
                <div className="md:col-span-2">
                  <label className="mb-1.5 block text-xs font-medium text-slate-300">
                    اسم العميل{" "}
                    <span className="text-red-400">
                      *
                    </span>
                  </label>

                  <div className="relative">
                    <FaUser className="absolute text-xs -translate-y-1/2 right-3 top-1/2 text-slate-600" />

                    <Field
                      name="name"
                      type="text"
                      placeholder="أدخل اسم العميل"
                      className={inputClass}
                    />
                  </div>

                  <ErrorMessage
                    name="name"
                    component="p"
                    className="mt-1 text-xs text-red-400"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-300">
                    البريد الإلكتروني
                  </label>

                  <div className="relative">
                    <FaEnvelope className="absolute text-xs -translate-y-1/2 right-3 top-1/2 text-slate-600" />

                    <Field
                      name="email"
                      type="email"
                      placeholder="example@email.com"
                      className={inputClass}
                    />
                  </div>

                  <ErrorMessage
                    name="email"
                    component="p"
                    className="mt-1 text-xs text-red-400"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-300">
                    رقم الهاتف
                  </label>

                  <div className="relative">
                    <FaPhone className="absolute text-xs -translate-y-1/2 right-3 top-1/2 text-slate-600" />

                    <Field
                      name="phone"
                      type="text"
                      placeholder="01xxxxxxxxx"
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* National ID */}
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-300">
                    الرقم القومي
                  </label>

                  <div className="relative">
                    <FaIdCard className="absolute text-xs -translate-y-1/2 right-3 top-1/2 text-slate-600" />

                    <Field
                      name="nationalId"
                      type="text"
                      maxLength={14}
                      inputMode="numeric"
                      placeholder="أدخل الرقم القومي"
                      className={inputClass}
                    />
                  </div>

                  <ErrorMessage
                    name="nationalId"
                    component="p"
                    className="mt-1 text-xs text-red-400"
                  />
                </div>

                {/* City */}
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-300">
                    المدينة
                  </label>

                  <div className="relative">
                    <FaCity className="absolute text-xs -translate-y-1/2 right-3 top-1/2 text-slate-600" />

                    <Field
                      name="city"
                      type="text"
                      placeholder="مثال: بني سويف"
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* Country */}
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-300">
                    الدولة
                  </label>

                  <div className="relative">
                    <FaGlobe className="absolute text-xs -translate-y-1/2 right-3 top-1/2 text-slate-600" />

                    <Field
                      name="country"
                      type="text"
                      placeholder="الدولة"
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* Address */}
                <div className="md:col-span-2">
                  <label className="mb-1.5 block text-xs font-medium text-slate-300">
                    العنوان
                  </label>

                  <div className="relative">
                    <FaMapMarkerAlt className="absolute right-3 top-3.5 text-xs text-slate-600" />

                    <Field
                      as="textarea"
                      name="address"
                      rows={2}
                      placeholder="أدخل عنوان العميل"
                      className={textareaClass}
                    />
                  </div>
                </div>

                {/* Notes */}
                <div className="md:col-span-2">
                  <label className="mb-1.5 block text-xs font-medium text-slate-300">
                    ملاحظات
                  </label>

                  <div className="relative">
                    <FaStickyNote className="absolute right-3 top-3.5 text-xs text-slate-600" />

                    <Field
                      as="textarea"
                      name="notes"
                      rows={3}
                      placeholder="أضف أي ملاحظات خاصة بالعميل..."
                      className={textareaClass}
                    />
                  </div>
                </div>
              </div>

              {/* ============================== */}
              {/* Documents */}
              {/* ============================== */}

              <div className="p-4 mt-5 border rounded-xl border-slate-700 bg-slate-900/50">

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-200">
                      مستندات العميل
                    </h3>

                    <p className="mt-1 text-xs text-slate-500">
                      يمكنك إضافة صورة البطاقة أو التوكيل أو أي مستند آخر
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      handleAddDocument(
                        values,
                        setFieldValue,
                      )
                    }
                    className="inline-flex items-center gap-2 px-3 py-2 text-xs font-medium text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
                  >
                    <FaPlus />
                    إضافة مستند
                  </button>
                </div>

                {values.documents?.length ===
                0 ? (
                  <div className="py-8 text-center border border-dashed rounded-lg border-slate-700">
                    <FaFileAlt className="mx-auto mb-2 text-2xl text-slate-600" />

                    <p className="text-xs text-slate-500">
                      لا توجد مستندات مضافة
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {values.documents.map(
                      (document, index) => {
                        const preview =
                          documentPreviews[
                            index
                          ];

                        return (
                          <div
                            key={index}
                            className="p-3 border rounded-lg border-slate-700 bg-slate-800"
                          >
                            <div className="flex items-start gap-3">

                              {/* Preview */}
                              <div className="flex items-center justify-center w-12 h-12 overflow-hidden border rounded-lg shrink-0 border-slate-700 bg-slate-900">
                                {preview?.type ===
                                "image" ? (
                                  <img
                                    src={
                                      preview.url
                                    }
                                    alt={
                                      document.name ||
                                      "مستند"
                                    }
                                    className="object-cover w-full h-full"
                                  />
                                ) : (
                                  <FaFileAlt className="text-lg text-slate-500" />
                                )}
                              </div>

                              {/* Fields */}
                              <div className="flex-1 space-y-2">

                                <Field
                                  name={`documents[${index}].name`}
                                  type="text"
                                  placeholder="اسم المستند - مثال: صورة البطاقة"
                                  className="w-full px-3 py-2 text-xs border rounded-lg outline-none border-slate-700 bg-slate-900 text-slate-100 placeholder:text-slate-600 focus:border-blue-500"
                                />

                                <input
                                  ref={(element) => {
                                    documentInputRefs.current[
                                      index
                                    ] = element;
                                  }}
                                  type="file"
                                  accept="
                                    image/jpeg,
                                    image/png,
                                    image/webp,
                                    application/pdf,
                                    application/msword,
                                    application/vnd.openxmlformats-officedocument.wordprocessingml.document
                                  "
                                  className="block w-full text-xs text-slate-500 file:mr-3 file:rounded-lg file:border-0 file:bg-slate-700 file:px-3 file:py-2 file:text-xs file:font-medium file:text-slate-200 hover:file:bg-slate-600"
                                  onChange={(event) =>
                                    handleDocumentChange(
                                      event,
                                      index,
                                      setFieldValue,
                                    )
                                  }
                                />

                                {preview?.name && (
                                  <p className="text-[11px] text-slate-500 truncate">
                                    {preview.name}
                                  </p>
                                )}

                                <ErrorMessage
                                  name={`documents[${index}].name`}
                                  component="p"
                                  className="text-xs text-red-400"
                                />

                                <ErrorMessage
                                  name={`documents[${index}].file`}
                                  component="p"
                                  className="text-xs text-red-400"
                                />
                              </div>

                              {/* Delete */}
                              <button
                                type="button"
                                onClick={() =>
                                  handleRemoveDocument(
                                    index,
                                    values,
                                    setFieldValue,
                                  )
                                }
                                className="flex items-center justify-center w-8 h-8 text-xs text-red-400 transition rounded-lg hover:bg-red-500/10 hover:text-red-300"
                                title="حذف المستند"
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </div>
                        );
                      },
                    )}
                  </div>
                )}
              </div>

              {/* ============================== */}
              {/* Footer */}
              {/* ============================== */}

              <div className="flex items-center justify-end gap-2 pt-4 mt-5 border-t border-slate-700">

                <button
                  type="button"
                  onClick={() =>
                    setOpenAddClient(false)
                  }
                  className="px-4 py-2 text-xs font-medium transition border rounded-lg border-slate-700 text-slate-400 hover:bg-slate-700 hover:text-white"
                >
                  إلغاء
                </button>

                <button
                  type="submit"
                  disabled={loadding}
                  className="px-5 py-2 text-xs font-semibold text-white transition bg-blue-600 rounded-lg hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loadding
                    ? "جاري الإضافة..."
                    : "إضافة العميل"}
                </button>
              </div>

            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddClient;

