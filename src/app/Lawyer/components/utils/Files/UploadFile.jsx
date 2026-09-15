
"use client";

import React, { useEffect, useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import {
  FiX,
  FiUploadCloud,
  FiFile,
  FiFolder,
  FiBriefcase,
  FiUser,
  FiCalendar,
} from "react-icons/fi";

import { LawyerContext } from "../../../../../Providers/LawyerContext/lawyer.js";

const UploadFile = () => {
  const {
    handleAddDocumentFun,
    openAddDocument,
    setOpenAddDocument,
    loadding,
    categories,
    cases,
    clients,
    sessions,
  } = useContext(LawyerContext);

  const initialValues = {
    name: "",
    categoryId: "",
    caseId: "",
    clientId: "",
    sessionId: "",
    description: "",
    file: null,
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .trim()
      .required("اسم الملف مطلوب")
      .min(2, "اسم الملف يجب أن يكون حرفين على الأقل")
      .max(200, "اسم الملف لا يجب أن يتجاوز 200 حرفًا"),

    categoryId: Yup.string()
      .required("تصنيف المستند مطلوب"),

    caseId: Yup.string(),

    clientId: Yup.string(),

    sessionId: Yup.string(),

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
                رفع مستند جديد
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                أضف المستند واربطه بالقضية والبيانات المناسبة
              </p>
            </div>
          </div>

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
          {({
            values,
            setFieldValue,
          }) => {
            const selectedCase = cases?.find(
              (item) => item?._id === values.caseId
            );

            const caseClientId =
              typeof selectedCase?.clientId === "object"
                ? selectedCase?.clientId?._id
                : selectedCase?.clientId;

            const selectedCaseClient = clients?.find(
              (client) => client?._id === caseClientId
            );

            const caseSessions =
              sessions?.filter((session) => {
                const sessionCaseId =
                  typeof session?.caseId === "object"
                    ? session?.caseId?._id
                    : session?.caseId;

                return sessionCaseId === values.caseId;
              }) || [];

            useEffect(() => {
              if (selectedCase?.clientId) {
                setFieldValue(
                  "clientId",
                  caseClientId || "",
                  false
                );
              } else if (!values.caseId) {
                setFieldValue("clientId", "", false);
              }

              setFieldValue("sessionId", "", false);
            }, [
              values.caseId,
              caseClientId,
              setFieldValue,
            ]);

            return (
              <Form className="max-h-[78vh] add-case-scrollbar overflow-y-auto">
                <div className="p-6 space-y-5">

                  {/* File Upload */}
                  <div>
                    <label className="block mb-2 text-sm font-semibold text-slate-200">
                      المستند
                    </label>

                    <label
                      htmlFor="document-file"
                      className={`
                        group
                        flex flex-col items-center justify-center
                        w-full
                        px-6 py-7
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
                      <div
                        className={`
                          flex items-center justify-center
                          w-12 h-12
                          mb-3
                          rounded-xl
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
                          <FiFile size={21} />
                        ) : (
                          <FiUploadCloud size={22} />
                        )}
                      </div>

                      {values.file ? (
                        <>
                          <p className="max-w-full px-4 text-sm font-semibold text-white truncate">
                            {values.file.name}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            اضغط لاختيار ملف آخر
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="text-sm font-semibold text-slate-200">
                            اختر المستند
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            PDF أو Word أو Excel وغيرها
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
                          const fileName =
                            file.name.replace(
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

                  {/* Name + Category */}
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                    {/* Name */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-semibold text-slate-200"
                      >
                        اسم المستند
                      </label>

                      <Field
                        id="name"
                        name="name"
                        type="text"
                        disabled={loadding}
                        placeholder="مثال: عقد البيع"
                        className="w-full px-4 py-3 text-sm text-white transition-all duration-200 border outline-none rounded-xl border-slate-700 bg-slate-800 placeholder:text-slate-500 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 disabled:opacity-60 disabled:cursor-not-allowed"
                      />

                      <ErrorMessage
                        name="name"
                        component="p"
                        className="mt-1.5 text-xs font-medium text-red-400"
                      />
                    </div>

                    {/* Category */}
                    <div>
                      <label
                        htmlFor="categoryId"
                        className="block mb-2 text-sm font-semibold text-slate-200"
                      >
                        تصنيف المستند
                      </label>

                      <div className="relative">
                        <FiFolder
                          className="absolute -translate-y-1/2 pointer-events-none right-4 top-1/2 text-slate-500"
                          size={17}
                        />

                        <Field
                          as="select"
                          id="categoryId"
                          name="categoryId"
                          disabled={loadding}
                          className="w-full px-10 py-3 text-sm text-white transition-all duration-200 border outline-none appearance-none rounded-xl border-slate-700 bg-slate-800 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                          <option value="">
                            اختر التصنيف
                          </option>

                          {categories?.map((category) => (
                            <option
                              key={category._id}
                              value={category._id}
                            >
                              {category.name}
                            </option>
                          ))}
                        </Field>
                      </div>

                      <ErrorMessage
                        name="categoryId"
                        component="p"
                        className="mt-1.5 text-xs font-medium text-red-400"
                      />
                    </div>
                  </div>

                  {/* Relations */}
                  <div className="p-4 border rounded-2xl border-slate-700/60 bg-slate-800/40">

                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="flex items-center justify-center w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400"
                      >
                        <FiBriefcase size={17} />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-slate-200">
                          ربط المستند
                        </p>

                        <p className="mt-0.5 text-xs text-slate-500">
                          يمكنك ربط المستند بقضية وعميل وجلسة
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                      {/* Case */}
                      <div>
                        <label
                          htmlFor="caseId"
                          className="block mb-2 text-sm font-semibold text-slate-300"
                        >
                          القضية
                        </label>

                        <Field
                          as="select"
                          id="caseId"
                          name="caseId"
                          disabled={loadding}
                          className="w-full px-4 py-3 text-sm text-white transition-all duration-200 border outline-none rounded-xl border-slate-700 bg-slate-800 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                          <option value="">
                            بدون قضية
                          </option>

                          {cases?.map((caseItem) => (
                            <option
                              key={caseItem._id}
                              value={caseItem._id}
                            >
                              {caseItem.caseNumber} -{" "}
                              {caseItem.title}
                            </option>
                          ))}
                        </Field>

                        <ErrorMessage
                          name="caseId"
                          component="p"
                          className="mt-1.5 text-xs font-medium text-red-400"
                        />
                      </div>

                      {/* Client */}
                      <div>
                        <label
                          htmlFor="clientId"
                          className="block mb-2 text-sm font-semibold text-slate-300"
                        >
                          العميل
                        </label>

                        <div className="relative">
                          <FiUser
                            className="absolute -translate-y-1/2 pointer-events-none right-4 top-1/2 text-slate-500"
                            size={16}
                          />

                          <Field
                            as="select"
                            id="clientId"
                            name="clientId"
                            disabled={
                              loadding ||
                              Boolean(values.caseId)
                            }
                            className={`
                              w-full
                              appearance-none
                              px-10 py-3
                              text-sm
                              transition-all duration-200
                              border
                              outline-none
                              rounded-xl
                              border-slate-700
                              focus:border-emerald-500
                              focus:ring-4
                              focus:ring-emerald-500/10
                              ${
                                values.caseId
                                  ? `
                                    cursor-not-allowed
                                    bg-slate-700/60
                                    text-slate-500
                                  `
                                  : `
                                    bg-slate-800
                                    text-white
                                  `
                              }
                            `}
                          >
                            <option value="">
                              {values.caseId
                                ? "يتم تحديد العميل تلقائيًا"
                                : "اختر العميل"}
                            </option>

                            {!values.caseId &&
                              clients?.map((client) => (
                                <option
                                  key={client._id}
                                  value={client._id}
                                >
                                  {client.name}
                                </option>
                              ))}

                            {values.caseId &&
                              selectedCaseClient && (
                                <option
                                  value={
                                    selectedCaseClient._id
                                  }
                                >
                                  {selectedCaseClient.name}
                                </option>
                              )}
                          </Field>
                        </div>

                        {values.caseId && (
                          <p className="mt-1.5 text-[11px] font-medium text-emerald-400/70">
                            العميل مرتبط بالقضية تلقائيًا
                          </p>
                        )}

                        <ErrorMessage
                          name="clientId"
                          component="p"
                          className="mt-1.5 text-xs font-medium text-red-400"
                        />
                      </div>

                      {/* Session */}
                      <div className="md:col-span-2">
                        <label
                          htmlFor="sessionId"
                          className="flex items-center gap-2 mb-2 text-sm font-semibold text-slate-300"
                        >
                          <FiCalendar
                            size={15}
                            className="text-slate-500"
                          />

                          الجلسة
                        </label>

                        <Field
                          as="select"
                          id="sessionId"
                          name="sessionId"
                          disabled={
                            loadding ||
                            !values.caseId
                          }
                          className={`
                            w-full
                            px-4 py-3
                            text-sm
                            transition-all duration-200
                            border
                            outline-none
                            rounded-xl
                            border-slate-700
                            focus:border-emerald-500
                            focus:ring-4
                            focus:ring-emerald-500/10
                            ${
                              !values.caseId
                                ? `
                                  cursor-not-allowed
                                  bg-slate-700/50
                                  text-slate-600
                                `
                                : `
                                  bg-slate-800
                                  text-white
                                `
                            }
                          `}
                        >
                          <option value="">
                            {!values.caseId
                              ? "اختر قضية أولًا"
                              : "بدون جلسة"}
                          </option>

                          {caseSessions.map((session) => (
                            <option
                              key={session._id}
                              value={session._id}
                            >
                              {session.sessionDate
                                ? new Date(
                                    session.sessionDate
                                  ).toLocaleDateString(
                                    "ar-EG"
                                  )
                                : "بدون تاريخ"}

                              {session.sessionTime
                                ? ` - ${session.sessionTime}`
                                : ""}
                            </option>
                          ))}
                        </Field>

                        <ErrorMessage
                          name="sessionId"
                          component="p"
                          className="mt-1.5 text-xs font-medium text-red-400"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label
                      htmlFor="description"
                      className="block mb-2 text-sm font-semibold text-slate-200"
                    >
                      وصف المستند
                    </label>

                    <Field
                      as="textarea"
                      id="description"
                      name="description"
                      rows={3}
                      disabled={loadding}
                      placeholder="مثال: عقد البيع الخاص بالقضية"
                      className="w-full px-4 py-3 text-sm leading-7 text-white transition-all duration-200 border outline-none resize-none rounded-xl border-slate-700 bg-slate-800 placeholder:text-slate-500 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 disabled:opacity-60 disabled:cursor-not-allowed"
                    />

                    <ErrorMessage
                      name="description"
                      component="p"
                      className="mt-1.5 text-xs font-medium text-red-400"
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 pt-5 border-t border-slate-700/60">

                    {/* Cancel */}
                    <button
                      type="button"
                      onClick={() =>
                        setOpenAddDocument(false)
                      }
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
                        text-sm font-semibold
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

                          جاري الرفع...
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
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default UploadFile;
