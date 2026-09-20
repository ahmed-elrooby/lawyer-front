"use client";

import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import {
  FaTimes,
  FaGavel,
  FaCalendarAlt,
  FaFileAlt,
  FaUpload,
  FaImage,
  FaTrash,
  FaExternalLinkAlt,
} from "react-icons/fa";

import { OwnerContext } from "../../../../../Providers/LawyerOwner/OwnerProvider.js";

import ClientDropdown from "./ClientDropdown";
import LawyersDropdown from "./LawyersDropdown";

const UpdateCase = ({ selectCase }) => {
  const {
    openUpdateCase,
    setOpenUpdateCase,
    loadding,
    handleUpdateCaseFun,
    clients,
    lawyers,
  } = useContext(OwnerContext);

  const [newDocuments, setNewDocuments] = useState([]);

  const [clientDropdownOpen, setClientDropdownOpen] =
    useState(false);

  const [lawyersDropdownOpen, setLawyersDropdownOpen] =
    useState(false);

  const clientDropdownRef = useRef(null);
  const lawyersDropdownRef = useRef(null);

  /* =========================
     Close Dropdowns Outside
  ========================= */

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        clientDropdownRef.current &&
        !clientDropdownRef.current.contains(event.target)
      ) {
        setClientDropdownOpen(false);
      }

      if (
        lawyersDropdownRef.current &&
        !lawyersDropdownRef.current.contains(event.target)
      ) {
        setLawyersDropdownOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  if (!openUpdateCase || !selectCase) return null;

  /* =========================
     Current Client
  ========================= */

  const clientId =
    typeof selectCase.clientId === "object"
      ? selectCase.clientId?._id || ""
      : selectCase.clientId || "";

  /* =========================
     Current Lawyers
  ========================= */

  const selectedLawyers = Array.isArray(selectCase.lawyers)
    ? selectCase.lawyers
        .map((lawyer) =>
          typeof lawyer === "object"
            ? lawyer?._id
            : lawyer
        )
        .filter(Boolean)
    : [];

  /* =========================
     Initial Values
  ========================= */

  const initialValues = {
    clientId,

    lawyers: selectedLawyers,

    caseNumber: selectCase.caseNumber || "",

    court: selectCase.court || "",

    status: selectCase.status || "active",

    filingDate:
      selectCase.filingDate?.slice(0, 10) || "",

    nextHearingDate:
      selectCase.nextHearingDate?.slice(0, 10) || "",

    description: selectCase.description || "",

    notes: selectCase.notes || "",

    documents: [],

    deleteDocumentIds: [],
  };

  /* =========================
     Validation
  ========================= */

  const validationSchema = Yup.object({
    clientId: Yup.string().required("اختر العميل"),

    lawyers: Yup.array()
      .min(1, "اختر محامي واحد على الأقل")
      .required("اختر المحامي"),

    caseNumber: Yup.string()
      .trim()
      .required("رقم القضية مطلوب"),

    court: Yup.string()
      .trim()
,
    status: Yup.string()
      .oneOf(
        [
          "active",
          "reserved_for_judgment",
          "judged",
        ],
        "حالة القضية غير صحيحة"
      )
      .required("حالة القضية مطلوبة"),

    filingDate: Yup.date()
      .required("تاريخ تسجيل القضية مطلوب")
      .typeError("تاريخ التسجيل غير صحيح"),

    nextHearingDate: Yup.date()
      .nullable()
      .typeError("تاريخ الجلسة غير صحيح"),

    description: Yup.string().max(
      2000,
      "الوصف يجب ألا يتجاوز 2000 حرف"
    ),

    notes: Yup.string().max(
      2000,
      "الملاحظات يجب ألا تتجاوز 2000 حرف"
    ),
  });

  /* =========================
     Close Modal
  ========================= */

  const handleClose = () => {
    setNewDocuments([]);

    setClientDropdownOpen(false);
    setLawyersDropdownOpen(false);

    setOpenUpdateCase(false);
  };

  /* =========================
     Add New Documents
  ========================= */

  const handleDocumentsChange = (
    event,
    setFieldValue
  ) => {
    const files = Array.from(
      event.target.files || []
    );

    if (!files.length) return;

    const documents = files.map((file) => ({
      file,
      name: file.name,
    }));

    const updated = [
      ...newDocuments,
      ...documents,
    ];

    setNewDocuments(updated);

    setFieldValue(
      "documents",
      updated
    );

    event.target.value = "";
  };

  /* =========================
     Remove New Document
  ========================= */

  const removeNewDocument = (
    index,
    setFieldValue
  ) => {
    const updated = newDocuments.filter(
      (_, i) => i !== index
    );

    setNewDocuments(updated);

    setFieldValue(
      "documents",
      updated
    );
  };

  /* =========================
     Delete Existing Document
  ========================= */

  const toggleDeleteDocument = (
    documentId,
    values,
    setFieldValue
  ) => {
    const current =
      values.deleteDocumentIds || [];

    setFieldValue(
      "deleteDocumentIds",
      current.includes(documentId)
        ? current.filter(
            (id) => id !== documentId
          )
        : [...current, documentId]
    );
  };

  /* =========================
     File Size
  ========================= */

  const formatFileSize = (size) => {
    if (!size) return "0 KB";

    return size < 1024 * 1024
      ? `${(size / 1024).toFixed(1)} KB`
      : `${(
          size /
          1024 /
          1024
        ).toFixed(2)} MB`;
  };

  return (
    <div
      dir="rtl"
      className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        className="flex w-full max-w-3xl max-h-[92vh] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
        onClick={(e) =>
          e.stopPropagation()
        }
      >
        {/* =========================
            Header
        ========================= */}

        <div className="flex items-center justify-between px-6 py-5 border-b shrink-0 border-slate-100">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-50">
              <FaGavel className="text-blue-600" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-800">
                تعديل القضية
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                القضية رقم{" "}
                <span className="font-semibold text-blue-600">
                  {selectCase.caseNumber ||
                    "غير محدد"}
                </span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="flex items-center justify-center transition rounded-lg h-9 w-9 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <FaTimes />
          </button>
        </div>

        {/* =========================
            Form
        ========================= */}

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={(values) => {
            handleUpdateCaseFun({
              id: selectCase._id,

              values: {
                ...values,

                clientId:
                  typeof values.clientId ===
                  "object"
                    ? values.clientId?._id
                    : values.clientId,

                lawyers:
                  Array.isArray(
                    values.lawyers
                  )
                    ? values.lawyers
                        .map((lawyer) =>
                          typeof lawyer ===
                          "object"
                            ? lawyer?._id
                            : lawyer
                        )
                        .filter(Boolean)
                    : [],
              },
            });
          }}
        >
          {({
            isSubmitting,
            values,
            setFieldValue,
          }) => (
            <Form
              id="update-case-form"
              className="flex flex-col flex-1 min-h-0"
            >
              {/* =========================
                  Body
              ========================= */}

              <div className="flex-1 p-6 overflow-y-auto">
                <div className="space-y-6">

                  {/* =========================
                      Case Data
                  ========================= */}

                  <section>
                    <SectionTitle
                      icon={<FaFileAlt />}
                      title="بيانات القضية"
                    />

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                      <InputField
                        name="caseNumber"
                        label="رقم القضية"
                        placeholder="رقم القضية"
                        required
                      />

                      <InputField
                        name="court"
                        label="المحكمة"
                        placeholder="اسم المحكمة"
                        required
                      />

                      {/* Client */}

                      <ClientDropdown
                        clients={clients}
                        value={values.clientId}
                        open={
                          clientDropdownOpen
                        }
                        setOpen={
                          setClientDropdownOpen
                        }
                        setFieldValue={
                          setFieldValue
                        }
                        dropdownRef={
                          clientDropdownRef
                        }
                      />

                      {/* Lawyers */}

                      <LawyersDropdown
                        lawyers={lawyers}
                        selectedIds={
                          values.lawyers
                        }
                        open={
                          lawyersDropdownOpen
                        }
                        setOpen={
                          setLawyersDropdownOpen
                        }
                        setFieldValue={
                          setFieldValue
                        }
                        dropdownRef={
                          lawyersDropdownRef
                        }
                      />
                    </div>
                  </section>

                  {/* =========================
                      Status & Dates
                  ========================= */}

                  <section>
                    <SectionTitle
                      icon={<FaCalendarAlt />}
                      title="الحالة والمواعيد"
                    />

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

                      <SelectField
                        name="status"
                        label="حالة القضية"
                        required
                      >
                        <option value="active">
                          نشطة
                        </option>

                        <option value="judged">
                          تم الحكم
                        </option>

                        <option value="reserved_for_judgment">
                          محجوزة للحكم
                        </option>
                      </SelectField>

                      <InputField
                        name="filingDate"
                        label="تاريخ القيد"
                        type="date"
                        required
                      />

                      <InputField
                        name="nextHearingDate"
                        label="الجلسة القادمة"
                        type="date"
                      />
                    </div>
                  </section>

                  {/* =========================
                      Description & Notes
                  ========================= */}

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                    <TextareaField
                      name="description"
                      label="وصف القضية"
                      placeholder="اكتب وصف القضية..."
                    />

                    <TextareaField
                      name="notes"
                      label="ملاحظات"
                      placeholder="أضف ملاحظات..."
                    />

                  </div>

                  {/* =========================
                      Existing Documents
                  ========================= */}

                  <section>

                    <div className="flex items-center justify-between mb-4">

                      <div className="flex items-center gap-2">
                        <FaFileAlt className="text-sm text-blue-600" />

                        <div>
                          <h3 className="text-sm font-bold text-slate-800">
                            مستندات القضية
                          </h3>

                          <p className="mt-1 text-[11px] text-slate-400">
                            إدارة المستندات الحالية وإضافة مستندات جديدة
                          </p>
                        </div>
                      </div>

                      <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold text-blue-600">
                        {selectCase.documents
                          ?.length || 0}{" "}
                        مستند
                      </span>

                    </div>

                    {/* Existing Documents */}

                    {selectCase.documents
                      ?.length > 0 && (
                      <div className="grid grid-cols-1 gap-3 mb-4 sm:grid-cols-2">

                        {selectCase.documents.map(
                          (document) => {
                            const deleted =
                              values.deleteDocumentIds?.includes(
                                document._id
                              );

                            return (
                              <div
                                key={
                                  document._id
                                }
                                className={`flex items-center gap-3 rounded-xl border p-3 transition ${
                                  deleted
                                    ? "border-red-200 bg-red-50"
                                    : "border-slate-200 bg-slate-50"
                                }`}
                              >

                                {/* File Preview */}

                                {document.fileType ===
                                  "image" &&
                                document.url ? (
                                  <img
                                    src={
                                      document.url
                                    }
                                    alt={
                                      document.name
                                    }
                                    className="object-cover w-12 h-12 rounded-lg shrink-0"
                                  />
                                ) : (
                                  <div className="flex items-center justify-center w-12 h-12 text-blue-600 bg-white border rounded-lg shrink-0 border-slate-200">
                                    <FaFileAlt />
                                  </div>
                                )}

                                {/* Info */}

                                <div className="flex-1 min-w-0">

                                  <p className="text-sm font-semibold truncate text-slate-700">
                                    {document.name ||
                                      "مستند"}
                                  </p>

                                  <p className="mt-1 text-[11px] text-slate-400">
                                    {deleted
                                      ? "سيتم حذفه عند الحفظ"
                                      : document.fileType ===
                                        "image"
                                      ? "صورة"
                                      : "ملف"}
                                  </p>

                                </div>

                                {/* Open */}

                                {!deleted &&
                                  document.url && (
                                    <a
                                      href={
                                        document.url
                                      }
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center justify-center text-blue-600 transition rounded-lg h-9 w-9 shrink-0 hover:bg-blue-50"
                                      title="فتح المستند"
                                    >
                                      <FaExternalLinkAlt className="text-xs" />
                                    </a>
                                  )}

                                {/* Delete */}

                                <button
                                  type="button"
                                  onClick={() =>
                                    toggleDeleteDocument(
                                      document._id,
                                      values,
                                      setFieldValue
                                    )
                                  }
                                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition ${
                                    deleted
                                      ? "text-blue-600 hover:bg-white"
                                      : "text-red-400 hover:bg-red-50 hover:text-red-500"
                                  }`}
                                  title={
                                    deleted
                                      ? "تراجع"
                                      : "حذف"
                                  }
                                >
                                  {deleted ? (
                                    <FaTimes />
                                  ) : (
                                    <FaTrash />
                                  )}
                                </button>

                              </div>
                            );
                          }
                        )}

                      </div>
                    )}

                    {/* =========================
                        Upload New Documents
                    ========================= */}

                    <label
                      htmlFor="update-case-documents"
                      className="flex flex-col items-center justify-center p-6 transition border-2 border-dashed cursor-pointer rounded-xl border-slate-200 bg-slate-50 hover:border-blue-400 hover:bg-blue-50/30"
                    >
                      <div className="flex items-center justify-center mb-2 text-blue-600 rounded-full h-11 w-11 bg-blue-50">
                        <FaUpload />
                      </div>

                      <p className="text-sm font-semibold text-slate-700">
                        إضافة مستندات جديدة
                      </p>

                      <p className="mt-1 text-[11px] text-slate-400">
                        يمكنك اختيار أكثر من ملف
                      </p>

                      <input
                        id="update-case-documents"
                        type="file"
                        multiple
                        className="hidden"
                        accept=".jpg,.jpeg,.png,.webp,.pdf,.doc,.docx"
                        onChange={(event) =>
                          handleDocumentsChange(
                            event,
                            setFieldValue
                          )
                        }
                      />
                    </label>

                    {/* New Documents */}

                    {newDocuments.length >
                      0 && (
                      <div className="mt-4 space-y-2">

                        {newDocuments.map(
                          (
                            document,
                            index
                          ) => (
                            <div
                              key={`${document.name}-${index}`}
                              className="flex items-center gap-3 p-3 border rounded-xl border-slate-200 bg-slate-50"
                            >

                              <div className="flex items-center justify-center w-10 h-10 text-blue-600 bg-white border rounded-lg shrink-0 border-slate-200">

                                {document.file?.type?.startsWith(
                                  "image/"
                                ) ? (
                                  <FaImage />
                                ) : (
                                  <FaFileAlt />
                                )}

                              </div>

                              <div className="flex-1 min-w-0">

                                <p className="text-sm font-semibold truncate text-slate-700">
                                  {
                                    document.name
                                  }
                                </p>

                                <p className="mt-1 text-[11px] text-slate-400">
                                  {formatFileSize(
                                    document
                                      .file
                                      ?.size
                                  )}
                                </p>

                              </div>

                              <button
                                type="button"
                                onClick={() =>
                                  removeNewDocument(
                                    index,
                                    setFieldValue
                                  )
                                }
                                className="flex items-center justify-center text-red-400 transition rounded-lg h-9 w-9 shrink-0 hover:bg-red-50 hover:text-red-500"
                              >
                                <FaTrash />
                              </button>

                            </div>
                          )
                        )}

                      </div>
                    )}

                    <p className="mt-2 text-[11px] text-slate-400">
                      الملفات المسموح بها: JPG, PNG,
                      WEBP, PDF, DOC, DOCX — الحد الأقصى
                      10MB
                    </p>

                  </section>
                </div>
              </div>

              {/* =========================
                  Footer
              ========================= */}

              <div className="flex items-center justify-end gap-3 px-6 py-4 bg-white border-t shrink-0 border-slate-100">

                <button
                  type="button"
                  onClick={handleClose}
                  className="px-5 text-sm font-semibold transition border h-11 rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50"
                >
                  إلغاء
                </button>

                <button
                  type="submit"
                  disabled={
                    loadding ||
                    isSubmitting
                  }
                  className="px-6 text-sm font-semibold text-white transition bg-blue-600 shadow-sm h-11 rounded-xl hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loadding ||
                  isSubmitting
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

/* =========================
   Section Title
========================= */

const SectionTitle = ({
  icon,
  title,
}) => (
  <div className="flex items-center gap-2 mb-4">
    <span className="text-sm text-blue-600">
      {icon}
    </span>

    <h3 className="text-sm font-bold text-slate-800">
      {title}
    </h3>
  </div>
);

/* =========================
   Input
========================= */

const InputField = ({
  name,
  label,
  placeholder,
  type = "text",
  required = false,
}) => (
  <div>
    <label className="block mb-2 text-xs font-semibold text-slate-700">
      {label}

      {required && (
        <span className="text-red-500">
          {" "}
          *
        </span>
      )}
    </label>

    <Field
      name={name}
      type={type}
      placeholder={placeholder}
      className="w-full px-3 text-sm transition border outline-none h-11 rounded-xl border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
    />

    <ErrorMessage
      name={name}
      component="p"
      className="mt-1 text-xs text-red-500"
    />
  </div>
);

/* =========================
   Select
========================= */

const SelectField = ({
  name,
  label,
  children,
  required = false,
}) => (
  <div>
    <label className="block mb-2 text-xs font-semibold text-slate-700">
      {label}

      {required && (
        <span className="text-red-500">
          {" "}
          *
        </span>
      )}
    </label>

    <Field
      as="select"
      name={name}
      className="w-full px-3 text-sm transition border outline-none h-11 rounded-xl border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
    >
      {children}
    </Field>

    <ErrorMessage
      name={name}
      component="p"
      className="mt-1 text-xs text-red-500"
    />
  </div>
);

/* =========================
   Textarea
========================= */

const TextareaField = ({
  name,
  label,
  placeholder,
}) => (
  <div>
    <label className="block mb-2 text-xs font-semibold text-slate-700">
      {label}
    </label>

    <Field
      as="textarea"
      name={name}
      rows="4"
      placeholder={placeholder}
      className="w-full p-3 text-sm transition border outline-none resize-none rounded-xl border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
    />

    <ErrorMessage
      name={name}
      component="p"
      className="mt-1 text-xs text-red-500"
    />
  </div>
);

export default UpdateCase;