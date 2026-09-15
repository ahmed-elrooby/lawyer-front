
"use client";

import React, { useContext } from "react";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from "formik";
import * as Yup from "yup";

import {
  FaCalendarPlus,
  FaTimes,
  FaSave,
  FaSpinner,
} from "react-icons/fa";

import { LawyerContext } from "../../../../../Providers/LawyerContext/lawyer.js";

const AddSession = () => {
  const {
    handleAddSessionFun,
    openAddSession,
    setOpenAddSession,
    cases,
    loadding,
  } = useContext(LawyerContext);

  if (!openAddSession) return null;

  const initialValues = {
    caseId: "",
    title: "",
    sessionDate: "",
    sessionTime: "",
    status: "scheduled",
    notes: "",
    decision: "",
    nextSessionDate: "",
  };

  const validationSchema = Yup.object({
    caseId: Yup.string().required("القضية مطلوبة"),

    title: Yup.string()
      .trim()
      .required("عنوان الجلسة مطلوب")
      .min(3, "عنوان الجلسة يجب أن يكون 3 أحرف على الأقل"),

    sessionDate: Yup.string().required("تاريخ الجلسة مطلوب"),

    sessionTime: Yup.string().required("وقت الجلسة مطلوب"),

    status: Yup.string()
      .oneOf(
        [
          "scheduled",
          "attended",
          "postponed",
          "completed",
          "cancelled",
        ],
        "حالة الجلسة غير صحيحة"
      )
      .required("حالة الجلسة مطلوبة"),

    notes: Yup.string().max(
      1000,
      "الملاحظات يجب ألا تتجاوز 1000 حرف"
    ),

    decision: Yup.string().max(
      1000,
      "القرار يجب ألا يتجاوز 1000 حرف"
    ),

    nextSessionDate: Yup.string().nullable(),
  });

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
    >
      <div className="flex max-h-[92vh] add-case-scrollbar w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-slate-800 bg-[#111827] shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b shrink-0 border-slate-800">
          <div className="flex items-center gap-3">

            <div className="flex items-center justify-center h-11 w-11 rounded-xl bg-cyan-500/10 text-cyan-400">
              <FaCalendarPlus className="text-lg" />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white">
                إضافة جلسة جديدة
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                أضف تفاصيل الجلسة وموعدها
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={() => setOpenAddSession(false)}
            className="flex items-center justify-center transition rounded-lg h-9 w-9 text-slate-500 hover:bg-slate-800 hover:text-white"
          >
            <FaTimes />
          </button>
        </div>

        {/* Form */}
        <div className="overflow-y-auto">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleAddSessionFun}
          >
            <Form className="p-6 space-y-5">

              {/* Case */}
              <div>
                <label className="block mb-2 text-sm font-medium text-slate-300">
                  القضية
                  <span className="mr-1 text-cyan-400">*</span>
                </label>

                <Field
                  as="select"
                  name="caseId"
                  className="w-full px-4 py-3 text-sm text-white transition border outline-none rounded-xl border-slate-800 bg-slate-950/50 focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-500/10"
                >
                  <option value="" className="bg-slate-900">
                    اختر القضية
                  </option>

                  {cases?.map((caseItem) => (
                    <option
                      key={caseItem?._id}
                      value={caseItem?._id}
                      className="bg-slate-900"
                    >
                      {caseItem?.caseNumber} - {caseItem?.title}
                    </option>
                  ))}
                </Field>

                <ErrorMessage
                  name="caseId"
                  component="p"
                  className="mt-1.5 text-xs text-red-400"
                />
              </div>

              {/* Title */}
              <div>
                <label className="block mb-2 text-sm font-medium text-slate-300">
                  عنوان الجلسة
                  <span className="mr-1 text-cyan-400">*</span>
                </label>

                <Field
                  name="title"
                  type="text"
                  placeholder="مثال: جلسة المرافعة الأولى"
                  className="w-full px-4 py-3 text-sm text-white transition border outline-none rounded-xl border-slate-800 bg-slate-950/50 placeholder:text-slate-600 focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-500/10"
                />

                <ErrorMessage
                  name="title"
                  component="p"
                  className="mt-1.5 text-xs text-red-400"
                />
              </div>

              {/* Date + Time */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                {/* Date */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-slate-300">
                    تاريخ الجلسة
                    <span className="mr-1 text-cyan-400">*</span>
                  </label>

                  <Field
                    name="sessionDate"
                    type="date"
                    className="w-full px-4 py-3 text-sm text-white transition border outline-none rounded-xl border-slate-800 bg-slate-950/50 focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-500/10"
                  />

                  <ErrorMessage
                    name="sessionDate"
                    component="p"
                    className="mt-1.5 text-xs text-red-400"
                  />
                </div>

                {/* Time */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-slate-300">
                    وقت الجلسة
                    <span className="mr-1 text-cyan-400">*</span>
                  </label>

                  <Field
                    name="sessionTime"
                    type="time"
                    className="w-full px-4 py-3 text-sm text-white transition border outline-none rounded-xl border-slate-800 bg-slate-950/50 focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-500/10"
                  />

                  <ErrorMessage
                    name="sessionTime"
                    component="p"
                    className="mt-1.5 text-xs text-red-400"
                  />
                </div>

              </div>

              {/* Status */}
              <div>
                <label className="block mb-2 text-sm font-medium text-slate-300">
                  حالة الجلسة
                </label>

                <Field
                  as="select"
                  name="status"
                  className="w-full px-4 py-3 text-sm text-white transition border outline-none rounded-xl border-slate-800 bg-slate-950/50 focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-500/10"
                >
                  <option value="scheduled">مجدولة</option>
                  <option value="attended">تم الحضور</option>
                  <option value="postponed">مؤجلة</option>
                  <option value="completed">مكتملة</option>
                  <option value="cancelled">ملغاة</option>
                </Field>

                <ErrorMessage
                  name="status"
                  component="p"
                  className="mt-1.5 text-xs text-red-400"
                />
              </div>

              {/* Notes */}
              <div>
                <label className="block mb-2 text-sm font-medium text-slate-300">
                  الملاحظات
                </label>

                <Field
                  as="textarea"
                  name="notes"
                  rows="3"
                  placeholder="اكتب ملاحظات الجلسة..."
                  className="w-full px-4 py-3 text-sm text-white transition border outline-none resize-none rounded-xl border-slate-800 bg-slate-950/50 placeholder:text-slate-600 focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-500/10"
                />

                <ErrorMessage
                  name="notes"
                  component="p"
                  className="mt-1.5 text-xs text-red-400"
                />
              </div>

              {/* Decision */}
              <div>
                <label className="block mb-2 text-sm font-medium text-slate-300">
                  القرار
                </label>

                <Field
                  as="textarea"
                  name="decision"
                  rows="3"
                  placeholder="اكتب قرار الجلسة إن وجد..."
                  className="w-full px-4 py-3 text-sm text-white transition border outline-none resize-none rounded-xl border-slate-800 bg-slate-950/50 placeholder:text-slate-600 focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-500/10"
                />

                <ErrorMessage
                  name="decision"
                  component="p"
                  className="mt-1.5 text-xs text-red-400"
                />
              </div>

              {/* Next Session */}
              <div>
                <label className="block mb-2 text-sm font-medium text-slate-300">
                  موعد الجلسة القادمة
                </label>

                <Field
                  name="nextSessionDate"
                  type="date"
                  className="w-full px-4 py-3 text-sm text-white transition border outline-none rounded-xl border-slate-800 bg-slate-950/50 focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-500/10"
                />

                <ErrorMessage
                  name="nextSessionDate"
                  component="p"
                  className="mt-1.5 text-xs text-red-400"
                />
              </div>

              {/* Footer */}
              <div className="flex flex-col-reverse gap-3 pt-5 border-t border-slate-800 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  onClick={() => setOpenAddSession(false)}
                  className="px-6 py-3 text-sm font-medium transition border rounded-xl border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white"
                >
                  إلغاء
                </button>

                <button
                  type="submit"
                  disabled={loadding}
                  className="inline-flex items-center justify-center gap-2 py-3 text-sm font-semibold text-white transition rounded-xl bg-cyan-500 px-7 hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loadding ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      جاري الحفظ...
                    </>
                  ) : (
                    <>
                      <FaSave />
                      حفظ الجلسة
                    </>
                  )}
                </button>

              </div>

            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default AddSession;
