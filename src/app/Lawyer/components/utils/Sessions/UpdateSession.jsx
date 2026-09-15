
"use client";

import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  FaTimes,
  FaCalendarAlt,
  FaClock,
  FaGavel,
  FaStickyNote,
  FaSave,
} from "react-icons/fa";

import { LawyerContext } from "../../../../../Providers/LawyerContext/lawyer.js";

const UpdateSession = ({ selectSession }) => {
  const {
    handleUpdateSessionFun,
    openUpdateSession,
    setOpenUpdateSession,
    loadding,
  } = useContext(LawyerContext);

  if (!openUpdateSession || !selectSession) return null;

  const validationSchema = Yup.object({
    title: Yup.string()
      .trim()
      .required("عنوان الجلسة مطلوب"),

    sessionDate: Yup.string()
      .required("تاريخ الجلسة مطلوب"),

    sessionTime: Yup.string()
      .required("وقت الجلسة مطلوب"),

    status: Yup.string()
      .oneOf(
        [
          "scheduled",
          "attended",
          "postponed",
          "completed",
          "cancelled",
        ],
        "حالة الجلسة غير صحيحة",
      )
      .required("حالة الجلسة مطلوبة"),

    notes: Yup.string(),

    decision: Yup.string(),

    nextSessionDate: Yup.string(),
  });

  const formatDateForInput = (date) => {
    if (!date) return "";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) return "";

    return parsedDate.toISOString().split("T")[0];
  };

  const initialValues = {
    title: selectSession?.title || "",

    sessionDate: formatDateForInput(
      selectSession?.sessionDate,
    ),

    sessionTime: selectSession?.sessionTime || "",

    status: selectSession?.status || "scheduled",

    notes: selectSession?.notes || "",

    decision: selectSession?.decision || "",

    nextSessionDate: formatDateForInput(
      selectSession?.nextSessionDate,
    ),
  };

  

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={() => setOpenUpdateSession(false)}
    >
      <div
        className="max-h-[90vh] w-full max-w-2xl add-case-scrollbar overflow-y-auto rounded-2xl border border-slate-700/50 bg-slate-900 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-4 border-b border-slate-700/50 bg-slate-900">
          <div>
            <h2 className="text-lg font-bold text-white">
              تعديل الجلسة
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              تعديل بيانات الجلسة الحالية
            </p>
          </div>

          <button
            type="button"
            onClick={() => setOpenUpdateSession(false)}
            className="flex items-center justify-center transition rounded-lg h-9 w-9 bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white"
          >
            <FaTimes />
          </button>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values)=>{
            handleUpdateSessionFun({values,id:selectSession?._id})
          }}
          enableReinitialize
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="p-5 space-y-5">
                {/* Title */}
                <div>
                  <label
                    htmlFor="title"
                    className="block mb-2 text-sm font-medium text-slate-300"
                  >
                    عنوان الجلسة
                  </label>

                  <div className="relative">
                    <FaGavel className="absolute -translate-y-1/2 right-3 top-1/2 text-slate-500" />

                    <Field
                      id="title"
                      name="title"
                      type="text"
                      placeholder="مثال: جلسة المرافعة الأولى"
                      className="w-full py-3 pl-4 pr-10 text-sm text-white transition border outline-none rounded-xl border-slate-700 bg-slate-800 placeholder:text-slate-500 focus:border-cyan-500"
                    />
                  </div>

                  <ErrorMessage
                    name="title"
                    component="p"
                    className="mt-1 text-xs text-red-400"
                  />
                </div>

                {/* Date + Time */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {/* Date */}
                  <div>
                    <label
                      htmlFor="sessionDate"
                      className="block mb-2 text-sm font-medium text-slate-300"
                    >
                      تاريخ الجلسة
                    </label>

                    <div className="relative">
                      <FaCalendarAlt className="absolute -translate-y-1/2 right-3 top-1/2 text-slate-500" />

                      <Field
                        id="sessionDate"
                        name="sessionDate"
                        type="date"
                        className="w-full py-3 pl-4 pr-10 text-sm text-white transition border outline-none rounded-xl border-slate-700 bg-slate-800 focus:border-cyan-500"
                      />
                    </div>

                    <ErrorMessage
                      name="sessionDate"
                      component="p"
                      className="mt-1 text-xs text-red-400"
                    />
                  </div>

                  {/* Time */}
                  <div>
                    <label
                      htmlFor="sessionTime"
                      className="block mb-2 text-sm font-medium text-slate-300"
                    >
                      وقت الجلسة
                    </label>

                    <div className="relative">
                      <FaClock className="absolute -translate-y-1/2 right-3 top-1/2 text-slate-500" />

                      <Field
                        id="sessionTime"
                        name="sessionTime"
                        type="time"
                        className="w-full py-3 pl-4 pr-10 text-sm text-white transition border outline-none rounded-xl border-slate-700 bg-slate-800 focus:border-cyan-500"
                      />
                    </div>

                    <ErrorMessage
                      name="sessionTime"
                      component="p"
                      className="mt-1 text-xs text-red-400"
                    />
                  </div>
                </div>

                {/* Status */}
                <div>
                  <label
                    htmlFor="status"
                    className="block mb-2 text-sm font-medium text-slate-300"
                  >
                    حالة الجلسة
                  </label>

                  <Field
                    as="select"
                    id="status"
                    name="status"
                    className="w-full px-4 py-3 text-sm text-white transition border outline-none rounded-xl border-slate-700 bg-slate-800 focus:border-cyan-500"
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
                    className="mt-1 text-xs text-red-400"
                  />
                </div>

                {/* Next Session */}
                <div>
                  <label
                    htmlFor="nextSessionDate"
                    className="block mb-2 text-sm font-medium text-slate-300"
                  >
                    تاريخ الجلسة القادمة
                  </label>

                  <div className="relative">
                    <FaCalendarAlt className="absolute -translate-y-1/2 right-3 top-1/2 text-slate-500" />

                    <Field
                      id="nextSessionDate"
                      name="nextSessionDate"
                      type="date"
                      className="w-full py-3 pl-4 pr-10 text-sm text-white transition border outline-none rounded-xl border-slate-700 bg-slate-800 focus:border-cyan-500"
                    />
                  </div>

                  <ErrorMessage
                    name="nextSessionDate"
                    component="p"
                    className="mt-1 text-xs text-red-400"
                  />
                </div>

                {/* Notes */}
                <div>
                  <label
                    htmlFor="notes"
                    className="flex items-center gap-2 mb-2 text-sm font-medium text-slate-300"
                  >
                    <FaStickyNote className="text-amber-400" />
                    الملاحظات
                  </label>

                  <Field
                    as="textarea"
                    id="notes"
                    name="notes"
                    rows="4"
                    placeholder="اكتب ملاحظات الجلسة..."
                    className="w-full px-4 py-3 text-sm leading-6 text-white transition border outline-none resize-none rounded-xl border-slate-700 bg-slate-800 placeholder:text-slate-500 focus:border-cyan-500"
                  />

                  <ErrorMessage
                    name="notes"
                    component="p"
                    className="mt-1 text-xs text-red-400"
                  />
                </div>

                {/* Decision */}
                <div>
                  <label
                    htmlFor="decision"
                    className="block mb-2 text-sm font-medium text-slate-300"
                  >
                    القرار
                  </label>

                  <Field
                    as="textarea"
                    id="decision"
                    name="decision"
                    rows="4"
                    placeholder="اكتب قرار الجلسة..."
                    className="w-full px-4 py-3 text-sm leading-6 text-white transition border outline-none resize-none rounded-xl border-slate-700 bg-slate-800 placeholder:text-slate-500 focus:border-cyan-500"
                  />

                  <ErrorMessage
                    name="decision"
                    component="p"
                    className="mt-1 text-xs text-red-400"
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="flex gap-3 px-5 py-4 border-t border-slate-700/50 bg-slate-900">
                <button
                  type="button"
                  onClick={() => setOpenUpdateSession(false)}
                  disabled={loadding || isSubmitting}
                  className="flex-1 px-4 py-3 text-sm font-medium transition rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  إلغاء
                </button>

                <button
                  type="submit"
                  disabled={loadding || isSubmitting}
                  className="flex items-center justify-center flex-1 gap-2 px-4 py-3 text-sm font-semibold text-white transition rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <FaSave />

                  {loadding || isSubmitting
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

export default UpdateSession;
