
"use client";

import React, { useContext, useEffect, useMemo, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  FaTimes,
  FaStickyNote,
  FaSave,
} from "react-icons/fa";

import { LawyerContext } from "../../../../../Providers/LawyerContext/lawyer.js";

const AddNotes = () => {
  const {
    openAddNote,
    setOpenAddNote,
    handleAddNoteFun,
    cases,
    clients,
    sessions,
    loadding,
  } = useContext(LawyerContext);

  const validationSchema = Yup.object({
    caseId: Yup.string().required("اختار القضية"),
    clientId: Yup.string().required("اختار العميل"),
    sessionId: Yup.string(),
    content: Yup.string()
      .trim()
      .required("اكتب محتوى الملاحظة")
      .min(3, "الملاحظة يجب أن تكون 3 أحرف على الأقل"),
  });

  const initialValues = {
    caseId: "",
    clientId: "",
    sessionId: "",
    content: "",
  };

  if (!openAddNote) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-900 shadow-2xl">

        {/* ================= Header ================= */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-700/50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-11 w-11 rounded-xl bg-cyan-500/10 text-cyan-400">
              <FaStickyNote className="text-lg" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-white">
                إضافة ملاحظة
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                أضف ملاحظة جديدة مرتبطة بقضية
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOpenAddNote(false)}
            className="flex items-center justify-center transition rounded-lg h-9 w-9 text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <FaTimes />
          </button>
        </div>

        {/* ================= Form ================= */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleAddNoteFun}
        >
          {({ values, setFieldValue }) => {
            /*
             * القضية المختارة
             */
            const selectedCase = Array.isArray(cases)
              ? cases.find((item) => item._id === values.caseId)
              : null;

            /*
             * العميل المرتبط بالقضية
             *
             * ممكن clientId يكون ObjectId populated
             * أو مجرد string
             */
            const caseClientId =
              selectedCase?.clientId?._id ||
              selectedCase?.clientId ||
              "";

            /*
             * العميل الموجود في قائمة العملاء
             */
            const selectedClient = Array.isArray(clients)
              ? clients.find((item) => item._id === caseClientId)
              : null;

            /*
             * جلسات القضية فقط
             */
            const caseSessions = useMemo(() => {
              if (!values.caseId || !Array.isArray(sessions)) {
                return [];
              }

              return sessions.filter((session) => {
                const sessionCaseId =
                  session?.caseId?._id ||
                  session?.caseId;

                return sessionCaseId === values.caseId;
              });
            }, [values.caseId, sessions]);

            /*
             * عند اختيار قضية:
             * حدد العميل تلقائيًا
             * وامسح الجلسة القديمة
             */
            useEffect(() => {
              setFieldValue("clientId", caseClientId);
              setFieldValue("sessionId", "");
            }, [values.caseId, caseClientId, setFieldValue]);

            return (
              <Form className="flex flex-col flex-1 min-h-0">

                {/* ================= Body ================= */}
                <div className="flex flex-col flex-1 min-h-0 p-6 space-y-5 overflow-y-auto add-case-scrollbar">

                  {/* ================= Case ================= */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-slate-300">
                      القضية
                    </label>

                    <Field
                      as="select"
                      name="caseId"
                      className="w-full px-4 py-3 text-sm text-white transition border outline-none rounded-xl border-slate-700 bg-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                    >
                      <option value="">اختر القضية</option>

                      {Array.isArray(cases) &&
                        cases.map((item) => (
                          <option key={item._id} value={item._id}>
                            {item.title}
                            {item.caseNumber
                              ? ` - ${item.caseNumber}`
                              : ""}
                          </option>
                        ))}
                    </Field>

                    <ErrorMessage
                      name="caseId"
                      component="p"
                      className="mt-1 text-xs text-red-400"
                    />
                  </div>

                  {/* ================= Client ================= */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-slate-300">
                      العميل
                    </label>

                    <div className="w-full px-4 py-3 text-sm border rounded-xl border-slate-700 bg-slate-800 text-slate-300">
                      {selectedClient ? (
                        <div className="flex items-center justify-between">
                          <span className="text-white">
                            {selectedClient.name}
                          </span>

                          <span className="text-xs text-cyan-400">
                            مرتبط بالقضية
                          </span>
                        </div>
                      ) : values.caseId ? (
                        <span className="text-red-400">
                          لا يوجد عميل مرتبط بهذه القضية
                        </span>
                      ) : (
                        <span className="text-slate-500">
                          اختر القضية أولًا
                        </span>
                      )}
                    </div>

                    <ErrorMessage
                      name="clientId"
                      component="p"
                      className="mt-1 text-xs text-red-400"
                    />
                  </div>

                  {/* ================= Session ================= */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-slate-300">
                      الجلسة
                    </label>

                    <Field
                      as="select"
                      name="sessionId"
                      disabled={!values.caseId}
                      className="w-full px-4 py-3 text-sm text-white transition border outline-none rounded-xl border-slate-700 bg-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="">
                        {!values.caseId
                          ? "اختر القضية أولًا"
                          : caseSessions.length > 0
                          ? "اختر الجلسة"
                          : "لا توجد جلسات لهذه القضية"}
                      </option>

                      {caseSessions.map((session) => (
                        <option key={session._id} value={session._id}>
                          {session.title}

                          {session.sessionDate
                            ? ` - ${new Date(
                                session.sessionDate
                              ).toLocaleDateString("ar-EG")}`
                            : ""}

                          {session.sessionTime
                            ? ` - ${session.sessionTime}`
                            : ""}
                        </option>
                      ))}
                    </Field>

                    <ErrorMessage
                      name="sessionId"
                      component="p"
                      className="mt-1 text-xs text-red-400"
                    />
                  </div>

                  {/* ================= Content ================= */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-slate-300">
                      محتوى الملاحظة
                    </label>

                    <Field
                      as="textarea"
                      name="content"
                      rows={8}
                      placeholder="اكتب الملاحظة هنا..."
                      className="w-full px-4 py-3 text-sm leading-7 text-white transition border outline-none resize-none rounded-xl border-slate-700 bg-slate-800 placeholder:text-slate-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                    />

                    <ErrorMessage
                      name="content"
                      component="p"
                      className="mt-1 text-xs text-red-400"
                    />
                  </div>
                </div>

                {/* ================= Footer ================= */}
                <div className="flex items-center justify-end gap-3 px-6 py-4 border-t shrink-0 border-slate-700/50 bg-slate-900">

                  <button
                    type="button"
                    onClick={() => setOpenAddNote(false)}
                    className="px-5 py-3 text-sm font-medium transition border rounded-xl border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                  >
                    إلغاء
                  </button>

                  <button
                    type="submit"
                    disabled={loadding}
                    className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white transition shadow-lg rounded-xl bg-cyan-500 shadow-cyan-500/10 hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <FaSave />

                    {loadding
                      ? "جاري الحفظ..."
                      : "حفظ الملاحظة"}
                  </button>

                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default AddNotes;
