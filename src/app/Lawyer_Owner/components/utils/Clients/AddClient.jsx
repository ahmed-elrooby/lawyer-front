"use client";

import React, { useContext, useRef, useState } from "react";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from "formik";

import {
  LuX,
  LuUserPlus,
  LuLoaderCircle,
  LuFilePlus,
  LuTrash2,
  LuFileText,
  LuImage,
} from "react-icons/lu";

import * as Yup from "yup";

import { OwnerContext } from "../../../../../Providers/LawyerOwner/OwnerProvider.js";

const validationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .required("اسم العميل مطلوب"),

  email: Yup.string().email(
    "البريد الإلكتروني غير صحيح",
  ),

  phone: Yup.string()
    .trim()
    .required("رقم الهاتف مطلوب"),

  nationalId: Yup.string()
    .trim()
    .required("الرقم القومي مطلوب"),

  address: Yup.string()
    .trim()
    .required("العنوان مطلوب"),

  city: Yup.string()
    .trim()
    .required("المدينة مطلوبة"),

  country: Yup.string()
    .trim()
    .required("الدولة مطلوبة"),

  documents: Yup.array().of(
    Yup.object({
      name: Yup.string()
        .trim()
        .required("اسم المستند مطلوب"),

      file: Yup.mixed()
        .required("ملف المستند مطلوب")
        .test(
          "fileType",
          "يسمح فقط بالصور أو PDF",
          (value) => {
            if (!value) return false;

            return [
              "image/jpeg",
              "image/jpg",
              "image/png",
              "image/webp",
              "application/pdf",
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

const AddClient = () => {
  const {
    handleAddClientFun,
    openAddClient,
    setOpenAddClient,
    loadding,
  } = useContext(OwnerContext);

  const profileInputRef = useRef(null);

  const [imagePreview, setImagePreview] =
    useState(null);

  const [documentPreviews, setDocumentPreviews] =
    useState([]);

  const inputClass =
    "w-full h-10 px-3 text-xs text-[#0B1C30] bg-[#F8FAFD] border border-[#E5EEFF] rounded-lg outline-none transition focus:border-[#B8CCF5] focus:bg-white";

  const labelClass =
    "block mb-1.5 text-[11px] font-medium text-[#45464D]";

  const errorClass =
    "mt-1 text-[10px] text-[#C94A4A]";

  if (!openAddClient) return null;

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
  };

  // ==========================================
  // Document Change
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

    const previewUrl =
      URL.createObjectURL(file);

    setDocumentPreviews((prev) => {
      const updated = [...prev];

      if (updated[index]?.url) {
        URL.revokeObjectURL(
          updated[index].url,
        );
      }

      updated[index] = {
        type: file.type.startsWith(
          "image/",
        )
          ? "image"
          : "pdf",

        url: previewUrl,

        name: file.name,
      };

      return updated;
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B1C30]/40 backdrop-blur-[2px]"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          setOpenAddClient(false);
        }
      }}
    >
      <div
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-xl"
        dir="rtl"
      >
        {/* ================= Header ================= */}

        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E5EEFF]">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#E5EEFF] text-[#315DAA]">
              <LuUserPlus size={17} />
            </div>

            <div>
              <h2 className="text-sm font-bold text-[#0B1C30]">
                إضافة عميل جديد
              </h2>

              <p className="mt-0.5 text-[10px] text-[#586377]">
                أضف بيانات العميل الأساسية والمستندات
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              setOpenAddClient(false)
            }
            className="flex items-center justify-center w-8 h-8 rounded-lg text-[#586377] bg-[#F8FAFD] hover:bg-[#F1F5FC] transition"
          >
            <LuX size={16} />
          </button>
        </div>

        {/* ================= Form ================= */}

        <Formik
          initialValues={{
            name: "",
            email: "",
            phone: "",
            nationalId: "",
            address: "",
            city: "",
            country: "مصر",
            profileImage: null,
            documents: [],
          }}
          validationSchema={validationSchema}
          onSubmit={handleAddClientFun}
        >
          {({
            setFieldValue,
            values,
          }) => (
            <Form>
              <div className="p-5 space-y-5">

                {/* ================= Profile Image ================= */}

                <div className="p-4 border border-[#E5EEFF] rounded-xl bg-[#F8FAFD]">
                  <div className="flex items-center gap-4">

                    <div className="flex items-center justify-center w-14 h-14 overflow-hidden rounded-full bg-[#E5EEFF] text-[#315DAA] shrink-0">
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="صورة العميل"
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <LuUserPlus size={22} />
                      )}
                    </div>

                    <div className="flex-1">
                      <label
                        className={labelClass}
                      >
                        صورة العميل
                      </label>

                      <input
                        ref={profileInputRef}
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={(e) => {
                          const file =
                            e.currentTarget
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
                        className="w-full text-[11px] text-[#586377] file:ml-3 file:px-3 file:py-2 file:border-0 file:rounded-lg file:bg-[#E5EEFF] file:text-[#315DAA] file:text-[10px] file:font-medium file:cursor-pointer"
                      />

                      <p className="mt-1 text-[10px] text-[#8A94A6]">
                        اختياري — JPG أو PNG أو WEBP بحد أقصى 5MB
                      </p>

                      <ErrorMessage
                        name="profileImage"
                        component="p"
                        className={errorClass}
                      />
                    </div>
                  </div>
                </div>

                {/* ================= Basic Data ================= */}

                <div>
                  <h3 className="mb-3 text-xs font-semibold text-[#0B1C30]">
                    البيانات الأساسية
                  </h3>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                    {/* Name */}

                    <div>
                      <label
                        className={labelClass}
                      >
                        اسم العميل
                      </label>

                      <Field
                        name="name"
                        type="text"
                        placeholder="اكتب اسم العميل"
                        className={inputClass}
                      />

                      <ErrorMessage
                        name="name"
                        component="p"
                        className={errorClass}
                      />
                    </div>

                    {/* Phone */}

                    <div>
                      <label
                        className={labelClass}
                      >
                        رقم الهاتف
                      </label>

                      <Field
                        name="phone"
                        type="text"
                        placeholder="01012345678"
                        className={inputClass}
                      />

                      <ErrorMessage
                        name="phone"
                        component="p"
                        className={errorClass}
                      />
                    </div>

                    {/* Email */}

                    <div>
                      <label
                        className={labelClass}
                      >
                        البريد الإلكتروني
                      </label>

                      <Field
                        name="email"
                        type="email"
                        placeholder="example@gmail.com"
                        className={inputClass}
                      />

                      <ErrorMessage
                        name="email"
                        component="p"
                        className={errorClass}
                      />
                    </div>

                    {/* National ID */}

                    <div>
                      <label
                        className={labelClass}
                      >
                        الرقم القومي
                      </label>

                      <Field
                        name="nationalId"
                        type="text"
                        placeholder="أدخل الرقم القومي"
                        className={inputClass}
                      />

                      <ErrorMessage
                        name="nationalId"
                        component="p"
                        className={errorClass}
                      />
                    </div>
                  </div>
                </div>

                {/* ================= Address ================= */}

                <div>
                  <h3 className="mb-3 text-xs font-semibold text-[#0B1C30]">
                    بيانات العنوان
                  </h3>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                    {/* Address */}

                    <div className="md:col-span-2">
                      <label
                        className={labelClass}
                      >
                        العنوان
                      </label>

                      <Field
                        name="address"
                        type="text"
                        placeholder="شارع التحرير، ..."
                        className={inputClass}
                      />

                      <ErrorMessage
                        name="address"
                        component="p"
                        className={errorClass}
                      />
                    </div>

                    {/* City */}

                    <div>
                      <label
                        className={labelClass}
                      >
                        المدينة
                      </label>

                      <Field
                        name="city"
                        type="text"
                        placeholder="بني سويف"
                        className={inputClass}
                      />

                      <ErrorMessage
                        name="city"
                        component="p"
                        className={errorClass}
                      />
                    </div>

                    {/* Country */}

                    <div>
                      <label
                        className={labelClass}
                      >
                        الدولة
                      </label>

                      <Field
                        name="country"
                        type="text"
                        className={inputClass}
                      />

                      <ErrorMessage
                        name="country"
                        component="p"
                        className={errorClass}
                      />
                    </div>
                  </div>
                </div>

                {/* ================= Documents ================= */}

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="text-xs font-semibold text-[#0B1C30]">
                        مستندات العميل
                      </h3>

                      <p className="mt-1 text-[10px] text-[#8A94A6]">
                        يمكنك إضافة صور أو ملفات PDF
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
                      className="flex items-center gap-1.5 h-8 px-3 rounded-lg text-[10px] font-medium text-[#315DAA] bg-[#E5EEFF] hover:bg-[#DCE8FC] transition"
                    >
                      <LuFilePlus size={13} />
                      إضافة مستند
                    </button>
                  </div>

                  {values.documents?.length ===
                  0 ? (
                    <div className="flex flex-col items-center justify-center py-7 border border-dashed border-[#E5EEFF] rounded-xl bg-[#F8FAFD]">
                      <LuFileText
                        size={22}
                        className="mb-2 text-[#9AA6B8]"
                      />

                      <p className="text-[10px] text-[#8A94A6]">
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
                              className="p-3 border border-[#E5EEFF] rounded-xl bg-[#F8FAFD]"
                            >
                              <div className="flex items-start gap-3">

                                {/* Preview */}

                                <div className="flex items-center justify-center w-12 h-12 overflow-hidden border rounded-lg shrink-0 border-[#E5EEFF] bg-white">
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
                                  ) : preview?.type ===
                                    "pdf" ? (
                                    <LuFileText
                                      size={21}
                                      className="text-[#315DAA]"
                                    />
                                  ) : (
                                    <LuFilePlus
                                      size={20}
                                      className="text-[#9AA6B8]"
                                    />
                                  )}
                                </div>

                                {/* Fields */}

                                <div className="flex-1 space-y-2">

                                  <Field
                                    name={`documents[${index}].name`}
                                    type="text"
                                    placeholder="اسم المستند - مثال: صورة البطاقة"
                                    className="w-full h-9 px-3 text-[10px] text-[#0B1C30] bg-white border border-[#E5EEFF] rounded-lg outline-none focus:border-[#B8CCF5]"
                                  />

                                  <input
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp,application/pdf"
                                    onChange={(event) =>
                                      handleDocumentChange(
                                        event,
                                        index,
                                        setFieldValue,
                                      )
                                    }
                                    className="w-full text-[10px] text-[#586377] file:ml-3 file:px-3 file:py-2 file:border-0 file:rounded-lg file:bg-[#E5EEFF] file:text-[#315DAA] file:text-[10px] file:font-medium file:cursor-pointer"
                                  />

                                  {preview?.name && (
                                    <p className="text-[10px] text-[#8A94A6] truncate">
                                      {preview.name}
                                    </p>
                                  )}

                                  <ErrorMessage
                                    name={`documents[${index}].name`}
                                    component="p"
                                    className={errorClass}
                                  />

                                  <ErrorMessage
                                    name={`documents[${index}].file`}
                                    component="p"
                                    className={errorClass}
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
                                  className="flex items-center justify-center w-8 h-8 rounded-lg text-[#C94A4A] hover:bg-[#FFF0F0] transition"
                                  title="حذف المستند"
                                >
                                  <LuTrash2
                                    size={14}
                                  />
                                </button>
                              </div>
                            </div>
                          );
                        },
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* ================= Footer ================= */}

              <div className="flex items-center justify-end gap-2 px-5 py-4 border-t border-[#E5EEFF] bg-[#FAFBFD]">

                <button
                  type="button"
                  onClick={() =>
                    setOpenAddClient(false)
                  }
                  className="h-9 px-4 rounded-lg text-[11px] font-medium text-[#586377] bg-[#F1F5FC] hover:bg-[#E5EEFF] transition"
                >
                  إلغاء
                </button>

                <button
                  type="submit"
                  disabled={loadding}
                  className="flex items-center justify-center gap-2 h-9 px-5 rounded-lg text-[11px] font-medium text-white bg-[#315DAA] hover:bg-[#274F98] disabled:opacity-60 disabled:cursor-not-allowed transition"
                >
                  {loadding ? (
                    <>
                      <LuLoaderCircle
                        size={14}
                        className="animate-spin"
                      />
                      جاري الحفظ...
                    </>
                  ) : (
                    <>
                      <LuUserPlus size={14} />
                      إضافة العميل
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

export default AddClient;