"use client";

import React, {
  useContext,
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
  FaGavel,
  FaTimes,
  FaSave,
  FaCalendarAlt,
  FaFileAlt,
  FaFilePdf,
  FaFileWord,
  FaTrash,
  FaPlus,
} from "react-icons/fa";

import { LawyerContext } from "../../../../../Providers/LawyerContext/lawyer.js";

const UpdateCase = ({ selectCase }) => {
  const {
    handleUpdateCaseFun,
    openUpdateCase,
    setOpenUpdateCase,
    clients,
    lawyers,
    loadding,handleDeleteDocumentOfCaseFun
  } = useContext(LawyerContext);

  const [documents, setDocuments] =
    useState([]);

  const [deletedDocumentIds, setDeletedDocumentIds] =
    useState([]);

  if (!openUpdateCase || !selectCase) {
    return null;
  }

  /*
  |--------------------------------------------------------------------------
  | Initial Documents
  |--------------------------------------------------------------------------
  */

  const existingDocuments =
    selectCase?.documents || [];

  /*
  |--------------------------------------------------------------------------
  | Initial Values
  |--------------------------------------------------------------------------
  */

  const initialValues = {
    clientId:
      selectCase?.clientId?._id ||
      selectCase?.clientId ||
      "",

    lawyers:
      selectCase?.lawyers?.map((lawyer) =>
        typeof lawyer === "object"
          ? lawyer._id
          : lawyer
      ) || [],

    caseNumber:
      selectCase?.caseNumber || "",

    court:
      selectCase?.court || "",

    status:
      selectCase?.status || "active",

    filingDate: selectCase?.filingDate
      ? new Date(
          selectCase.filingDate
        )
          .toISOString()
          .split("T")[0]
      : "",

    nextHearingDate:
      selectCase?.nextHearingDate
        ? new Date(
            selectCase.nextHearingDate
          )
            .toISOString()
            .split("T")[0]
        : "",

    description:
      selectCase?.description || "",

    notes:
      selectCase?.notes || "",

    documents: [],

    deleteDocumentIds: [],
  };

  /*
  |--------------------------------------------------------------------------
  | Validation
  |--------------------------------------------------------------------------
  */

  const validationSchema = Yup.object({
    clientId: Yup.string().required(
      "العميل مطلوب"
    ),

    caseNumber: Yup.string()
      .trim()
      .required("رقم القضية مطلوب")
      .max(
        100,
        "رقم القضية يجب ألا يتجاوز 100 حرف"
      ),

    court: Yup.string()
      .trim()
      .max(
        200,
        "اسم المحكمة يجب ألا يتجاوز 200 حرف"
      )
      .nullable(),

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
      .required(
        "تاريخ رفع القضية مطلوب"
      )
      .typeError(
        "تاريخ رفع القضية غير صحيح"
      ),

    nextHearingDate: Yup.date()
      .nullable()
      .typeError(
        "تاريخ الجلسة القادمة غير صحيح"
      ),

    description: Yup.string()
      .trim()
      .max(
        2000,
        "الوصف يجب ألا يتجاوز 2000 حرف"
      ),

    notes: Yup.string()
      .trim()
      .max(
        2000,
        "الملاحظات يجب ألا تتجاوز 2000 حرف"
      ),

    lawyers: Yup.array().min(
      1,
      "يجب تحديد محامي للقضية"
    ),
  });

  /*
  |--------------------------------------------------------------------------
  | Document Change
  |--------------------------------------------------------------------------
  */

  const handleDocumentsChange = (
    event,
    setFieldValue,
    values
  ) => {
    const files = Array.from(
      event.target.files || []
    );

    if (!files.length) return;

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    const validFiles = files.filter(
      (file) => {
        if (
          !allowedTypes.includes(
            file.type
          )
        ) {
          alert(
            `الملف ${file.name} غير مسموح به`
          );

          return false;
        }

        if (
          file.size >
          10 * 1024 * 1024
        ) {
          alert(
            `الملف ${file.name} أكبر من 10MB`
          );

          return false;
        }

        return true;
      }
    );

    const newDocuments =
      validFiles.map((file) => ({
        file,

        name: file.name.replace(
          /\.[^/.]+$/,
          ""
        ),
      }));

    const updatedDocuments = [
      ...documents,
      ...newDocuments,
    ];

    setDocuments(
      updatedDocuments
    );

    setFieldValue(
      "documents",
      updatedDocuments
    );

    event.target.value = "";
  };

  /*
  |--------------------------------------------------------------------------
  | Change New Document Name
  |--------------------------------------------------------------------------
  */

  const handleDocumentNameChange = (
    index,
    value,
    setFieldValue
  ) => {
    const updatedDocuments =
      documents.map(
        (document, i) =>
          i === index
            ? {
                ...document,
                name: value,
              }
            : document
      );

    setDocuments(
      updatedDocuments
    );

    setFieldValue(
      "documents",
      updatedDocuments
    );
  };

  /*
  |--------------------------------------------------------------------------
  | Remove New Document
  |--------------------------------------------------------------------------
  */

  const removeDocument = (
    index,
    setFieldValue
  ) => {
    const updatedDocuments =
      documents.filter(
        (_, i) => i !== index
      );

    setDocuments(
      updatedDocuments
    );

    setFieldValue(
      "documents",
      updatedDocuments
    );
  };

  /*
  |--------------------------------------------------------------------------
  | Delete Existing Document
  |--------------------------------------------------------------------------
  */

  const deleteExistingDocument = (
    documentId,
    setFieldValue,
    values
  ) => {
    const updatedDeletedIds = [
      ...(values.deleteDocumentIds || []),
      documentId,
    ];

    setDeletedDocumentIds(
      updatedDeletedIds
    );

    setFieldValue(
      "deleteDocumentIds",
      updatedDeletedIds
    );
  };

  /*
  |--------------------------------------------------------------------------
  | Document Icon
  |--------------------------------------------------------------------------
  */

  const getDocumentIcon = (
    document
  ) => {
    if (!document) {
      return <FaFileAlt />;
    }

    const fileType =
      document.fileType ||
      document.file?.type;

    if (
      fileType === "pdf" ||
      fileType ===
        "application/pdf"
    ) {
      return <FaFilePdf />;
    }

    if (
      fileType === "word" ||
      fileType ===
        "application/msword" ||
      fileType ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      return <FaFileWord />;
    }

    return <FaFileAlt />;
  };

  /*
  |--------------------------------------------------------------------------
  | UI
  |--------------------------------------------------------------------------
  */

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={() =>
        setOpenUpdateCase(false)
      }
    >
      <div
        className="flex add-case-scrollbar max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl"
        onClick={(e) =>
          e.stopPropagation()
        }
      >
        {/* ================= HEADER ================= */}

        <div className="flex items-center justify-between px-6 py-4 border-b shrink-0 border-slate-700 bg-slate-800/90">
          <div className="flex items-center gap-3">

            <div className="flex items-center justify-center h-11 w-11 rounded-xl bg-emerald-500/10 text-emerald-400">
              <FaGavel className="text-lg" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-white">
                تعديل القضية
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                تعديل بيانات القضية رقم{" "}
                <span className="font-medium text-slate-300">
                  {selectCase?.caseNumber}
                </span>
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={() =>
              setOpenUpdateCase(false)
            }
            className="flex items-center justify-center transition-colors h-9 w-9 rounded-xl text-slate-400 hover:bg-slate-700 hover:text-white"
          >
            <FaTimes />
          </button>
        </div>

        {/* ================= FORMIK ================= */}

        <Formik
          initialValues={initialValues}
          validationSchema={
            validationSchema
          }
          enableReinitialize
          onSubmit={(values) => {
            handleUpdateCaseFun({
              values,
              id: selectCase?._id,
            });
          }}
        >
          {({
            values,
            setFieldValue,
            isSubmitting,
          }) => (
            <Form className="flex flex-col flex-1 min-h-0">

              {/* ================= SCROLL AREA ================= */}

              <div className="flex-1 min-h-0 overflow-y-auto">

                <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">

                  {/* ================= CLIENT ================= */}

                  <div>
                    <label
                      htmlFor="clientId"
                      className="block mb-2 text-sm font-medium text-slate-300"
                    >
                      العميل
                    </label>

                    <Field
                      as="select"
                      name="clientId"
                      id="clientId"
                      className="w-full px-4 py-3 text-sm text-white transition-colors border outline-none rounded-xl border-slate-700 bg-slate-800 focus:border-emerald-500"
                    >
                      <option value="">
                        اختر العميل
                      </option>

                      {clients?.map(
                        (client) => (
                          <option
                            key={
                              client?._id
                            }
                            value={
                              client?._id
                            }
                          >
                            {client?.name}
                          </option>
                        )
                      )}
                    </Field>

                    <ErrorMessage
                      name="clientId"
                      component="p"
                      className="mt-1 text-xs text-red-400"
                    />
                  </div>

                  {/* ================= LAWYERS ================= */}

                  <div className="hidden">
                    <label
                      htmlFor="lawyers"
                      className="block mb-2 text-sm font-medium text-slate-300"
                    >
                      المحامي
                    </label>

                    <Field
                      as="select"
                      name="lawyers"
                      id="lawyers"
                      value={
                        values.lawyers?.[0] ||
                        ""
                      }
                      onChange={(e) => {
                        setFieldValue(
                          "lawyers",
                          e.target.value
                            ? [
                                e.target
                                  .value,
                              ]
                            : []
                        );
                      }}
                      className="w-full px-4 py-3 text-sm text-white transition-colors border outline-none rounded-xl border-slate-700 bg-slate-800 focus:border-emerald-500"
                    >
                      <option value="">
                        اختر المحامي
                      </option>

                      {lawyers?.map(
                        (lawyer) => (
                          <option
                            key={
                              lawyer?._id
                            }
                            value={
                              lawyer?._id
                            }
                          >
                            {lawyer?.name}
                          </option>
                        )
                      )}
                    </Field>

                    <ErrorMessage
                      name="lawyers"
                      component="p"
                      className="mt-1 text-xs text-red-400"
                    />
                  </div>

                  {/* ================= CASE NUMBER ================= */}

                  <div>
                    <label
                      htmlFor="caseNumber"
                      className="block mb-2 text-sm font-medium text-slate-300"
                    >
                      رقم القضية
                    </label>

                    <Field
                      type="text"
                      name="caseNumber"
                      id="caseNumber"
                      placeholder="مثال: 2026/001"
                      className="w-full px-4 py-3 text-sm text-white transition-colors border outline-none rounded-xl border-slate-700 bg-slate-800 placeholder:text-slate-600 focus:border-emerald-500"
                    />

                    <ErrorMessage
                      name="caseNumber"
                      component="p"
                      className="mt-1 text-xs text-red-400"
                    />
                  </div>

                  {/* ================= COURT ================= */}

                  <div>
                    <label
                      htmlFor="court"
                      className="block mb-2 text-sm font-medium text-slate-300"
                    >
                      المحكمة{" "}
                      <span className="text-xs text-slate-500">
                        (اختياري)
                      </span>
                    </label>

                    <Field
                      type="text"
                      name="court"
                      id="court"
                      placeholder="مثال: محكمة بني سويف الابتدائية"
                      className="w-full px-4 py-3 text-sm text-white transition-colors border outline-none rounded-xl border-slate-700 bg-slate-800 placeholder:text-slate-600 focus:border-emerald-500"
                    />

                    <ErrorMessage
                      name="court"
                      component="p"
                      className="mt-1 text-xs text-red-400"
                    />
                  </div>

                  {/* ================= STATUS ================= */}

                  <div>
                    <label
                      htmlFor="status"
                      className="block mb-2 text-sm font-medium text-slate-300"
                    >
                      حالة القضية
                    </label>

                    <Field
                      as="select"
                      name="status"
                      id="status"
                      className="w-full px-4 py-3 text-sm text-white transition-colors border outline-none rounded-xl border-slate-700 bg-slate-800 focus:border-emerald-500"
                    >
                      <option value="active">
                        نشطة
                      </option>

                      <option value="reserved_for_judgment">
                        محجوزة للحكم
                      </option>

                      <option value="judged">
                        تم الحكم
                      </option>
                    </Field>

                    <ErrorMessage
                      name="status"
                      component="p"
                      className="mt-1 text-xs text-red-400"
                    />
                  </div>

                  {/* ================= FILING DATE ================= */}

                  <div>
                    <label
                      htmlFor="filingDate"
                      className="block mb-2 text-sm font-medium text-slate-300"
                    >
                      تاريخ رفع القضية
                    </label>

                    <div className="relative">
                      <Field
                        type="date"
                        name="filingDate"
                        id="filingDate"
                        className="w-full px-4 py-3 text-sm text-white transition-colors border outline-none rounded-xl border-slate-700 bg-slate-800 focus:border-emerald-500"
                      />

                      <FaCalendarAlt className="absolute text-xs -translate-y-1/2 pointer-events-none left-4 top-1/2 text-slate-500" />
                    </div>

                    <ErrorMessage
                      name="filingDate"
                      component="p"
                      className="mt-1 text-xs text-red-400"
                    />
                  </div>

                  {/* ================= NEXT HEARING ================= */}

                  <div>
                    <label
                      htmlFor="nextHearingDate"
                      className="block mb-2 text-sm font-medium text-slate-300"
                    >
                      تاريخ الجلسة القادمة
                    </label>

                    <div className="relative">
                      <Field
                        type="date"
                        name="nextHearingDate"
                        id="nextHearingDate"
                        className="w-full px-4 py-3 text-sm text-white transition-colors border outline-none rounded-xl border-slate-700 bg-slate-800 focus:border-emerald-500"
                      />

                      <FaCalendarAlt className="absolute text-xs -translate-y-1/2 pointer-events-none left-4 top-1/2 text-slate-500" />
                    </div>

                    <ErrorMessage
                      name="nextHearingDate"
                      component="p"
                      className="mt-1 text-xs text-red-400"
                    />
                  </div>

                  {/* ================= DESCRIPTION ================= */}

                  <div className="md:col-span-2">
                    <label
                      htmlFor="description"
                      className="block mb-2 text-sm font-medium text-slate-300"
                    >
                      وصف القضية
                    </label>

                    <Field
                      as="textarea"
                      name="description"
                      id="description"
                      rows={4}
                      placeholder="اكتب وصفًا مختصرًا عن القضية..."
                      className="w-full px-4 py-3 text-sm text-white transition-colors border outline-none resize-none rounded-xl border-slate-700 bg-slate-800 placeholder:text-slate-600 focus:border-emerald-500"
                    />

                    <ErrorMessage
                      name="description"
                      component="p"
                      className="mt-1 text-xs text-red-400"
                    />
                  </div>

                  {/* ================= NOTES ================= */}

                  <div className="md:col-span-2">
                    <label
                      htmlFor="notes"
                      className="block mb-2 text-sm font-medium text-slate-300"
                    >
                      ملاحظات
                    </label>

                    <Field
                      as="textarea"
                      name="notes"
                      id="notes"
                      rows={4}
                      placeholder="أضف أي ملاحظات خاصة بالقضية..."
                      className="w-full px-4 py-3 text-sm text-white transition-colors border outline-none resize-none rounded-xl border-slate-700 bg-slate-800 placeholder:text-slate-600 focus:border-emerald-500"
                    />

                    <ErrorMessage
                      name="notes"
                      component="p"
                      className="mt-1 text-xs text-red-400"
                    />
                  </div>

                  {/* ================================================== */}
                  {/* OLD DOCUMENTS */}
                  {/* ================================================== */}

                  <div className="md:col-span-2">

                    <div className="flex items-center justify-between mb-3">
                      <label className="text-sm font-medium text-slate-300">
                        المستندات الحالية
                      </label>

                      <span className="text-xs text-slate-500">
                        {existingDocuments.length} مستند
                      </span>
                    </div>

                    {existingDocuments.filter(
                      (document) =>
                        !values.deleteDocumentIds?.includes(
                          document._id
                        )
                    ).length === 0 ? (
                      <div className="flex items-center justify-center p-8 border border-dashed rounded-xl border-slate-700 bg-slate-800/50">
                        <p className="text-sm text-slate-500">
                          لا توجد مستندات حالية
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3">

                        {existingDocuments
                          .filter(
                            (document) =>
                              !values.deleteDocumentIds?.includes(
                                document._id
                              )
                          )
                          .map(
                            (document) => (
                              <div
                                key={
                                  document._id
                                }
                                className="flex items-center gap-3 p-3 border rounded-xl border-slate-700 bg-slate-800"
                              >

                                <div className="flex items-center justify-center w-10 h-10 rounded-lg shrink-0 bg-slate-700 text-emerald-400">
                                  {getDocumentIcon(
                                    document
                                  )}
                                </div>

                                <div className="flex-1 min-w-0">

                                  <p className="text-sm font-medium text-white truncate">
                                    {
                                      document.name
                                    }
                                  </p>

                                  <a
                                    href={
                                      document.url
                                    }
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-xs text-emerald-400 hover:text-emerald-300"
                                  >
                                    فتح المستند
                                  </a>

                                </div>

                                <button
                                  type="button"
                                  onClick={() =>{
handleDeleteDocumentOfCaseFun({caseId:selectCase._id,documentId:document._id})
                                  }
                                  }
                                  className="flex items-center justify-center text-red-400 transition-colors rounded-lg w-9 h-9 hover:bg-red-500/10 hover:text-red-300"
                                  title="حذف المستند"
                                >
                                  <FaTrash />
                                </button>

                              </div>
                            )
                          )}

                      </div>
                    )}

                  </div>

                  {/* ================================================== */}
                  {/* NEW DOCUMENTS */}
                  {/* ================================================== */}

                  <div className="md:col-span-2">

                    <div className="flex items-center justify-between mb-3">

                      <label className="text-sm font-medium text-slate-300">
                        إضافة مستندات جديدة
                      </label>

                      <label
                        htmlFor="caseDocumentsUpdate"
                        className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-white transition-colors cursor-pointer rounded-xl bg-emerald-600 hover:bg-emerald-500"
                      >
                        <FaPlus />
                        إضافة مستند
                      </label>

                      <input
                        id="caseDocumentsUpdate"
                        type="file"
                        multiple
                        hidden
                        accept=".jpg,.jpeg,.png,.webp,.pdf,.doc,.docx"
                        onChange={(event) =>
                          handleDocumentsChange(
                            event,
                            setFieldValue,
                            values
                          )
                        }
                      />

                    </div>

                    {documents.length === 0 ? (
                      <div className="flex items-center justify-center p-8 border border-dashed rounded-xl border-slate-700 bg-slate-800/50">
                        <p className="text-sm text-slate-500">
                          لا توجد مستندات جديدة
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3">

                        {documents.map(
                          (
                            document,
                            index
                          ) => (
                            <div
                              key={index}
                              className="flex items-center gap-3 p-3 border rounded-xl border-slate-700 bg-slate-800"
                            >

                              <div className="flex items-center justify-center w-10 h-10 rounded-lg shrink-0 bg-slate-700 text-emerald-400">
                                {getDocumentIcon(
                                  document
                                )}
                              </div>

                              <div className="flex-1 min-w-0">

                                <input
                                  type="text"
                                  value={
                                    document.name
                                  }
                                  onChange={(e) =>
                                    handleDocumentNameChange(
                                      index,
                                      e.target.value,
                                      setFieldValue
                                    )
                                  }
                                  placeholder="اسم المستند"
                                  className="w-full px-3 py-2 mb-1 text-sm text-white border rounded-lg outline-none border-slate-700 bg-slate-900 focus:border-emerald-500"
                                />

                                <p className="text-xs truncate text-slate-500">
                                  {
                                    document
                                      .file
                                      ?.name
                                  }
                                </p>

                              </div>

                              <button
                                type="button"
                                onClick={() =>
                                  removeDocument(
                                    index,
                                    setFieldValue
                                  )
                                }
                                className="flex items-center justify-center text-red-400 transition-colors rounded-lg w-9 h-9 hover:bg-red-500/10 hover:text-red-300"
                              >
                                <FaTrash />
                              </button>

                            </div>
                          )
                        )}

                      </div>
                    )}

                  </div>

                </div>
              </div>

              {/* ================= FOOTER ================= */}

              <div className="px-6 py-4 border-t shrink-0 border-slate-700 bg-slate-800/95">

                <div className="flex items-center justify-end gap-3">

                  <button
                    type="button"
                    onClick={() =>
                      setOpenUpdateCase(false)
                    }
                    className="rounded-xl border border-slate-700 px-5 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
                  >
                    إلغاء
                  </button>

                  <button
                    type="submit"
                    disabled={
                      loadding 
                      
                    }
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <FaSave />

                    {loadding 
                    
                      ? "جاري الحفظ..."
                      : "حفظ التعديلات"}
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

export default UpdateCase;