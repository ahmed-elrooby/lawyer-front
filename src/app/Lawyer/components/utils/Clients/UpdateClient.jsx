"use client";

import React, { useContext, useRef, useState } from "react";

import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from "formik";

import * as Yup from "yup";

import { LawyerContext } from "../../../../../Providers/LawyerContext/lawyer.js";

import {
  FaTimes,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaIdCard,
  FaStickyNote,
  FaSave,
  FaCamera,
  FaFilePdf,
  FaFileWord,
  FaFileImage,
  FaFileAlt,
  FaEye,
  FaTrash,
  FaPlus,
} from "react-icons/fa";

import toast from "react-hot-toast";

const UpdateClient = ({ client }) => {
  const {
    handleUpdateClientFun,
    openUpdateClient,
    setOpenUpdateClient,
    handleDeleteClientDocumentFun,loadding
  } = useContext(LawyerContext);

  const profileInputRef = useRef(null);
  const documentsInputRef = useRef(null);

  const [profilePreview, setProfilePreview] = useState(
    client?.profileImage?.url || ""
  );

  const [newDocuments, setNewDocuments] = useState([]);

  if (!openUpdateClient || !client) return null;

  // =========================================================
  // Validation
  // =========================================================

  const validationSchema = Yup.object({
    name: Yup.string()
      .trim()
      .required("اسم العميل مطلوب")
      .min(
        2,
        "اسم العميل يجب أن يكون حرفين على الأقل"
      ),

    email: Yup.string()
      .email("البريد الإلكتروني غير صحيح")
      .nullable(),

    phone: Yup.string()
      .trim()
      .required("رقم الهاتف مطلوب")
      .min(
        10,
        "رقم الهاتف غير صحيح"
      ),

    address: Yup.string()
      .trim()
      .required("العنوان مطلوب"),

    city: Yup.string()
      .trim()
      .required("المدينة مطلوبة"),

    country: Yup.string()
      .trim()
      .required("الدولة مطلوبة"),

    nationalId: Yup.string()
      .trim()
      .required("الرقم القومي مطلوب")
      .matches(
        /^[0-9]{14}$/,
        "الرقم القومي يجب أن يتكون من 14 رقم"
      ),

    notes: Yup.string()
      .trim()
      .max(
        1000,
        "الملاحظات لا يمكن أن تتجاوز 1000 حرف"
      ),
  });

  // =========================================================
  // Initial Values
  // =========================================================

  const initialValues = {
    name: client.name || "",
    email: client.email || "",
    phone: client.phone || "",
    address: client.address || "",
    city: client.city || "",
    country: client.country || "مصر",
    nationalId: client.nationalId || "",
    notes: client.notes || "",
    profileImage: null,
  };

  // =========================================================
  // Profile Image
  // =========================================================

  const handleProfileImageChange = (
    event,
    setFieldValue
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error(
        "من فضلك اختر صورة صحيحة"
      );
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error(
        "حجم الصورة يجب ألا يتجاوز 5MB"
      );
      return;
    }

    setFieldValue(
      "profileImage",
      file
    );

    const previewUrl =
      URL.createObjectURL(file);

    setProfilePreview(previewUrl);
  };

  // =========================================================
  // Documents
  // Image + PDF + Word
  // =========================================================

  const allowedDocumentTypes = [
    // Images
    "image/jpeg",
    "image/png",
    "image/webp",

    // PDF
    "application/pdf",

    // Word
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  // =========================================================
  // Add Documents
  // =========================================================

  const handleDocumentsChange = (
    event
  ) => {
    const files = Array.from(
      event.target.files || []
    );

    if (!files.length) return;

    const validFiles = files.filter(
      (file) => {
        // Check Type
        if (
          !allowedDocumentTypes.includes(
            file.type
          )
        ) {
          toast.error(
            `الملف ${file.name} غير مسموح به. المسموح صور و PDF و Word فقط`
          );

          return false;
        }

        // Check Size
        if (
          file.size >
          10 * 1024 * 1024
        ) {
          toast.error(
            `الملف ${file.name} أكبر من 10MB`
          );

          return false;
        }

        return true;
      }
    );

    const mappedFiles =
      validFiles.map(
        (file) => ({
          file,
          name: file.name.replace(
            /\.[^/.]+$/,
            ""
          ),
        })
      );

    setNewDocuments(
      (prev) => [
        ...prev,
        ...mappedFiles,
      ]
    );

    // Reset input
    event.target.value = "";
  };

  // =========================================================
  // Change New Document Name
  // =========================================================

  const handleDocumentNameChange = (
    index,
    value
  ) => {
    setNewDocuments(
      (prev) =>
        prev.map(
          (document, i) =>
            i === index
              ? {
                  ...document,
                  name: value,
                }
              : document
        )
    );
  };

  // =========================================================
  // Remove New Document
  // =========================================================

  const removeNewDocument = (
    index
  ) => {
    setNewDocuments(
      (prev) =>
        prev.filter(
          (_, i) =>
            i !== index
        )
    );
  };

  // =========================================================
  // Get Document Icon
  // =========================================================

  const getDocumentIcon = (
    file
  ) => {
    if (!file) {
      return <FaFileAlt />;
    }

    // Image
    if (
      file.type.startsWith(
        "image/"
      )
    ) {
      return <FaFileImage />;
    }

    // PDF
    if (
      file.type ===
      "application/pdf"
    ) {
      return <FaFilePdf />;
    }

    // Word
    if (
      file.type ===
        "application/msword" ||
      file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      return <FaFileWord />;
    }

    return <FaFileAlt />;
  };

  // =========================================================
  // Get Existing Document Icon
  // =========================================================

  const getExistingDocumentIcon = (
    document
  ) => {
    if (
      document.fileType ===
      "image"
    ) {
      return <FaFileImage />;
    }

    if (
      document.fileType ===
      "pdf"
    ) {
      return <FaFilePdf />;
    }

    if (
      document.fileType ===
      "word"
    ) {
      return <FaFileWord />;
    }

    return <FaFileAlt />;
  };

  // =========================================================
  // Submit
  // =========================================================

const handleSubmit = (values)=>{
const formData = new FormData();

formData.append("name", values.name || "");
formData.append("email", values.email || "");
formData.append("phone", values.phone || "");
formData.append("address", values.address || "");
formData.append("city", values.city || "");
formData.append("country", values.country || "");
formData.append("nationalId", values.nationalId || "");
formData.append("notes", values.notes || "");

if (values.profileImage) {
  formData.append("profileImage", values.profileImage);
}

newDocuments.forEach((document) => {
  formData.append("documents", document.file);
  formData.append("documentNames", document.name || "");
});

handleUpdateClientFun({
  values: formData,
  id: client._id,
});
}
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">

      <div className="w-full max-w-4xl overflow-hidden border shadow-2xl rounded-2xl bg-slate-900 border-slate-700">

        {/* ================================================= */}
        {/* Header */}
        {/* ================================================= */}

        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-700">

          <div>
            <h2 className="text-xl font-bold text-white">
              تعديل بيانات العميل
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              قم بتعديل بيانات العميل وإضافة المستندات الجديدة
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              setOpenUpdateClient(
                false
              )
            }
            className="flex items-center justify-center text-gray-400 transition rounded-lg w-9 h-9 hover:bg-white/10 hover:text-white"
          >
            <FaTimes />
          </button>

        </div>

        {/* ================================================= */}
        {/* Formik */}
        {/* ================================================= */}

        <Formik
          initialValues={
            initialValues
          }
          validationSchema={
            validationSchema
          }
          enableReinitialize
          onSubmit={
            handleSubmit
          }
        >
          {({
            isSubmitting,
            setFieldValue,
          }) => (
            <Form className="max-h-[78vh] overflow-y-auto p-6">

              {/* ================================================= */}
              {/* Profile Image */}
              {/* ================================================= */}

              <div className="flex flex-col items-center mb-8">

                <div className="relative">

                  <div className="flex items-center justify-center overflow-hidden border-2 rounded-full w-28 h-28 bg-white/5 border-slate-700">

                    {profilePreview ? (
                      <img
                        src={
                          profilePreview
                        }
                        alt={
                          client.name
                        }
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <FaUser
                        size={45}
                        className="text-gray-500"
                      />
                    )}

                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      profileInputRef.current?.click()
                    }
                    className="absolute bottom-0 right-0 flex items-center justify-center text-white transition bg-blue-600 rounded-full w-9 h-9 hover:bg-blue-700"
                  >
                    <FaCamera size={14} />
                  </button>

                  <input
                    ref={
                      profileInputRef
                    }
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    hidden
                    onChange={(
                      event
                    ) =>
                      handleProfileImageChange(
                        event,
                        setFieldValue
                      )
                    }
                  />

                </div>

                <p className="mt-3 text-xs text-gray-400">
                  اضغط على الكاميرا لتغيير صورة العميل
                </p>

              </div>

              {/* ================================================= */}
              {/* Basic Information */}
              {/* ================================================= */}

              <div className="mb-8">

                <h3 className="pb-3 mb-5 text-lg font-semibold text-white border-b border-slate-700">
                  البيانات الأساسية
                </h3>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                  {/* Name */}

                  <div className="md:col-span-2">

                    <label className="block mb-2 text-sm text-gray-300">
                      اسم العميل
                    </label>

                    <div className="relative">

                      <FaUser className="absolute text-gray-500 -translate-y-1/2 right-3 top-1/2" />

                      <Field
                        type="text"
                        name="name"
                        placeholder="اسم العميل"
                        className="w-full py-3 pl-4 pr-10 text-sm text-white border outline-none rounded-xl bg-white/5 border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />

                    </div>

                    <ErrorMessage
                      name="name"
                      component="div"
                      className="mt-1 text-xs text-red-400"
                    />

                  </div>

                  {/* Email */}

                  <div>

                    <label className="block mb-2 text-sm text-gray-300">
                      البريد الإلكتروني
                    </label>

                    <div className="relative">

                      <FaEnvelope className="absolute text-gray-500 -translate-y-1/2 right-3 top-1/2" />

                      <Field
                        type="email"
                        name="email"
                        placeholder="البريد الإلكتروني"
                        className="w-full py-3 pl-4 pr-10 text-sm text-white border outline-none rounded-xl bg-white/5 border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />

                    </div>

                    <ErrorMessage
                      name="email"
                      component="div"
                      className="mt-1 text-xs text-red-400"
                    />

                  </div>

                  {/* Phone */}

                  <div>

                    <label className="block mb-2 text-sm text-gray-300">
                      رقم الهاتف
                    </label>

                    <div className="relative">

                      <FaPhone className="absolute text-gray-500 -translate-y-1/2 right-3 top-1/2" />

                      <Field
                        type="text"
                        name="phone"
                        placeholder="رقم الهاتف"
                        className="w-full py-3 pl-4 pr-10 text-sm text-white border outline-none rounded-xl bg-white/5 border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />

                    </div>

                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="mt-1 text-xs text-red-400"
                    />

                  </div>

                  {/* National ID */}

                  <div>

                    <label className="block mb-2 text-sm text-gray-300">
                      الرقم القومي
                    </label>

                    <div className="relative">

                      <FaIdCard className="absolute text-gray-500 -translate-y-1/2 right-3 top-1/2" />

                      <Field
                        type="text"
                        name="nationalId"
                        maxLength={14}
                        inputMode="numeric"
                        placeholder="الرقم القومي"
                        className="w-full py-3 pl-4 pr-10 text-sm text-white border outline-none rounded-xl bg-white/5 border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />

                    </div>

                    <ErrorMessage
                      name="nationalId"
                      component="div"
                      className="mt-1 text-xs text-red-400"
                    />

                  </div>

                  {/* Country */}

                  <div>

                    <label className="block mb-2 text-sm text-gray-300">
                      الدولة
                    </label>

                    <div className="relative">

                      <FaMapMarkerAlt className="absolute text-gray-500 -translate-y-1/2 right-3 top-1/2" />

                      <Field
                        type="text"
                        name="country"
                        placeholder="الدولة"
                        className="w-full py-3 pl-4 pr-10 text-sm text-white border outline-none rounded-xl bg-white/5 border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />

                    </div>

                    <ErrorMessage
                      name="country"
                      component="div"
                      className="mt-1 text-xs text-red-400"
                    />

                  </div>

                  {/* City */}

                  <div>

                    <label className="block mb-2 text-sm text-gray-300">
                      المدينة
                    </label>

                    <div className="relative">

                      <FaMapMarkerAlt className="absolute text-gray-500 -translate-y-1/2 right-3 top-1/2" />

                      <Field
                        type="text"
                        name="city"
                        placeholder="المدينة"
                        className="w-full py-3 pl-4 pr-10 text-sm text-white border outline-none rounded-xl bg-white/5 border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />

                    </div>

                    <ErrorMessage
                      name="city"
                      component="div"
                      className="mt-1 text-xs text-red-400"
                    />

                  </div>

                  {/* Address */}

                  <div className="md:col-span-2">

                    <label className="block mb-2 text-sm text-gray-300">
                      العنوان
                    </label>

                    <div className="relative">

                      <FaMapMarkerAlt className="absolute text-gray-500 right-3 top-4" />

                      <Field
                        as="textarea"
                        name="address"
                        rows={2}
                        placeholder="عنوان العميل"
                        className="w-full py-3 pl-4 pr-10 text-sm text-white border outline-none resize-none rounded-xl bg-white/5 border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />

                    </div>

                    <ErrorMessage
                      name="address"
                      component="div"
                      className="mt-1 text-xs text-red-400"
                    />

                  </div>

                  {/* Notes */}

                  <div className="md:col-span-2">

                    <label className="block mb-2 text-sm text-gray-300">
                      ملاحظات
                    </label>

                    <div className="relative">

                      <FaStickyNote className="absolute text-gray-500 right-3 top-4" />

                      <Field
                        as="textarea"
                        name="notes"
                        rows={4}
                        placeholder="اكتب ملاحظات عن العميل..."
                        className="w-full py-3 pl-4 pr-10 text-sm text-white border outline-none resize-none rounded-xl bg-white/5 border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />

                    </div>

                    <ErrorMessage
                      name="notes"
                      component="div"
                      className="mt-1 text-xs text-red-400"
                    />

                  </div>

                </div>

              </div>

              {/* ================================================= */}
              {/* Existing Documents */}
              {/* ================================================= */}

              <div className="mb-8">

                <div className="flex items-center justify-between pb-3 mb-5 border-b border-slate-700">

                  <div>

                    <h3 className="text-lg font-semibold text-white">
                      المستندات الحالية
                    </h3>

                    <p className="mt-1 text-xs text-gray-400">
                      المستندات الموجودة بالفعل لدى العميل
                    </p>

                  </div>

                  <span className="px-3 py-1 text-xs text-blue-400 rounded-lg bg-blue-500/10">
                    {client.documents?.length || 0} مستند
                  </span>

                </div>

                {client.documents?.length > 0 ? (

                  <div className="space-y-3">

                    {client.documents.map(
                      (document) => (

                        <div
                          key={
                            document._id
                          }
                          className="flex items-center gap-4 p-4 border rounded-xl bg-white/5 border-slate-700"
                        >

                          {/* Icon */}

                          <div className="flex items-center justify-center text-blue-400 rounded-lg w-11 h-11 bg-blue-500/10">

                            {getExistingDocumentIcon(
                              document
                            )}

                          </div>

                          {/* Info */}

                          <div className="flex-1 min-w-0">

                            <p className="text-sm font-medium text-white truncate">
                              {
                                document.name
                              }
                            </p>

                            <p className="mt-1 text-xs text-gray-500">
                              {document.fileType?.toUpperCase()}
                            </p>

                          </div>

                          {/* View */}

                          <a
                            href={
                              document.url
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-10 h-10 text-blue-400 transition rounded-lg bg-blue-500/10 hover:bg-blue-500 hover:text-white"
                            title="عرض المستند"
                          >
                            <FaEye />
                          </a>

                          {/* Delete */}

                          <button
                            type="button"
                            onClick={() =>
                              handleDeleteClientDocumentFun(
                                {
                                  clientId:
                                    client._id,
                                  documentId:
                                    document._id,
                                }
                              )
                            }
                            className="flex items-center justify-center w-10 h-10 text-red-400 transition rounded-lg bg-red-500/10 hover:bg-red-500 hover:text-white"
                            title="حذف المستند"
                          >
                            <FaTrash />
                          </button>

                        </div>

                      )
                    )}

                  </div>

                ) : (

                  <div className="p-6 text-sm text-center text-gray-500 border rounded-xl border-slate-700 bg-white/5">
                    لا توجد مستندات لهذا العميل
                  </div>

                )}

              </div>

              {/* ================================================= */}
              {/* Add New Documents */}
              {/* ================================================= */}

              <div className="mb-8">

                <div className="flex items-center justify-between pb-3 mb-5 border-b border-slate-700">

                  <div>

                    <h3 className="text-lg font-semibold text-white">
                      إضافة مستندات جديدة
                    </h3>

                    <p className="mt-1 text-xs text-gray-400">
                      صور - PDF - Word
                    </p>

                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      documentsInputRef.current?.click()
                    }
                    className="flex items-center gap-2 px-4 py-2 text-sm text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
                  >
                    <FaPlus />
                    إضافة مستند
                  </button>

                </div>

                <input
                  ref={
                    documentsInputRef
                  }
                  type="file"
                  multiple
                  accept=".jpg,.jpeg,.png,.webp,.pdf,.doc,.docx"
                  hidden
                  onChange={
                    handleDocumentsChange
                  }
                />

                {/* New Documents */}

                {newDocuments.length >
                  0 && (

                  <div className="space-y-3">

                    {newDocuments.map(
                      (
                        document,
                        index
                      ) => (

                        <div
                          key={`${document.file.name}-${index}`}
                          className="p-4 border rounded-xl bg-white/5 border-slate-700"
                        >

                          <div className="flex items-center gap-3">

                            {/* File Icon */}

                            <div className="flex items-center justify-center flex-shrink-0 text-blue-400 rounded-lg w-11 h-11 bg-blue-500/10">

                              {getDocumentIcon(
                                document.file
                              )}

                            </div>

                            {/* Document Name */}

                            <div className="flex-1">

                              <label className="block mb-2 text-xs text-gray-400">
                                اسم المستند
                              </label>

                              <input
                                type="text"
                                value={
                                  document.name
                                }
                                onChange={(
                                  e
                                ) =>
                                  handleDocumentNameChange(
                                    index,
                                    e
                                      .target
                                      .value
                                  )
                                }
                                placeholder="اكتب اسم المستند"
                                className="w-full px-3 py-2 text-sm text-white border rounded-lg outline-none bg-white/5 border-slate-700 focus:border-blue-500"
                              />

                            </div>

                            {/* Remove */}

                            <button
                              type="button"
                              onClick={() =>
                                removeNewDocument(
                                  index
                                )
                              }
                              className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-red-400 transition rounded-lg bg-red-500/10 hover:bg-red-500 hover:text-white"
                              title="إزالة المستند"
                            >
                              <FaTrash />
                            </button>

                          </div>

                          {/* Original File Name */}

                          <div className="flex items-center gap-2 mt-3">

                            <span className="text-xs text-gray-500">
                              الملف:
                            </span>

                            <span className="text-xs text-gray-400 truncate">
                              {
                                document
                                  .file
                                  .name
                              }
                            </span>

                          </div>

                        </div>

                      )
                    )}

                  </div>

                )}

              </div>

              {/* ================================================= */}
              {/* Actions */}
              {/* ================================================= */}

              <div className="flex gap-3 pt-6 border-t border-slate-700">

                <button
                  type="button"
                  onClick={() =>
                    setOpenUpdateClient(
                      false
                    )
                  }
                  className="flex-1 py-3 text-sm font-medium text-gray-300 transition rounded-xl bg-white/5 hover:bg-white/10"
                >
                  إلغاء
                </button>

                <button
                  type="submit"
               
                  className="flex items-center justify-center flex-1 gap-2 py-3 text-sm font-medium text-white transition bg-blue-600 rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >

                  <FaSave />

                  {loadding
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

export default UpdateClient;