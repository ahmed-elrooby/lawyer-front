"use client";

import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import {
  FaGavel,
  FaTimes,
  FaSave,
  FaCalendarAlt,
} from "react-icons/fa";

import { LawyerContext } from "../../../../../Providers/LawyerContext/lawyer.js";
import { authContext } from "../../../../../Providers/AuthProvider/Auth.js";

const AddCase = () => {
  const {
    handleAddCaseFun,
    openAddCase,
    setOpenAddCase,
    clients,
    caseTypes,
    loadding,
  } = useContext(LawyerContext);

  const { profile } = useContext(authContext);

  if (!openAddCase) return null;

  const initialValues = {
    clientId: "",
    lawyers: profile?.user?._id ? [profile.user._id] : [],
    caseTypeId: "",
    caseNumber: "",
    title: "",
    court: "",
    status: "active",
    filingDate: "",
    nextHearingDate: "",
    description: "",
    notes: "",
  };

  const validationSchema = Yup.object({
    clientId: Yup.string().required("العميل مطلوب"),

    caseTypeId: Yup.string().required("نوع القضية مطلوب"),

    caseNumber: Yup.string()
      .trim()
      .required("رقم القضية مطلوب")
      .max(100, "رقم القضية يجب ألا يتجاوز 100 حرف"),

    title: Yup.string()
      .trim()
      .required("عنوان القضية مطلوب")
      .min(3, "عنوان القضية يجب أن يكون 3 أحرف على الأقل")
      .max(200, "عنوان القضية يجب ألا يتجاوز 200 حرف"),

    court: Yup.string()
      .trim()
      .required("اسم المحكمة مطلوب")
      .max(200, "اسم المحكمة يجب ألا يتجاوز 200 حرف"),

    status: Yup.string()
      .oneOf(
        ["active", "reserved_for_judgment", "judged"],
        "حالة القضية غير صحيحة"
      )
      .required("حالة القضية مطلوبة"),

    filingDate: Yup.date()
      .required("تاريخ رفع القضية مطلوب")
      .typeError("تاريخ رفع القضية غير صحيح"),

    nextHearingDate: Yup.date()
      .nullable()
      .typeError("تاريخ الجلسة القادمة غير صحيح"),

    description: Yup.string()
      .trim()
      .max(2000, "الوصف يجب ألا يتجاوز 2000 حرف"),

    notes: Yup.string()
      .trim()
      .max(2000, "الملاحظات يجب ألا تتجاوز 2000 حرف"),
  });

 
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <div className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl">
          {/* ================= HEADER ================= */}
          <div className="flex items-center justify-between px-6 py-4 border-b shrink-0 border-slate-700 bg-slate-800/90">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center h-11 w-11 rounded-xl bg-emerald-500/10 text-emerald-400">
                <FaGavel className="text-lg" />
              </div>

              <div>
                <h2 className="text-lg font-bold text-white">
                  إضافة قضية جديدة
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                  قم بإدخال بيانات القضية لإضافتها إلى النظام
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setOpenAddCase(false)}
              className="flex items-center justify-center transition-colors h-9 w-9 rounded-xl text-slate-400 hover:bg-slate-700 hover:text-white"
            >
              <FaTimes />
            </button>
          </div>

          {/* ================= FORMIK ================= */}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleAddCaseFun}
            enableReinitialize
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col flex-1 min-h-0">
                {/* ================= SCROLL AREA ================= */}
                <div className="flex-1 min-h-0 overflow-y-auto add-case-scrollbar">
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

                        {clients?.map((client) => (
                          <option
                            key={client?._id}
                            value={client?._id}
                          >
                            {client?.name}
                          </option>
                        ))}
                      </Field>

                      <ErrorMessage
                        name="clientId"
                        component="p"
                        className="mt-1 text-xs text-red-400"
                      />
                    </div>

                    {/* ================= CASE TYPE ================= */}
                    <div>
                      <label
                        htmlFor="caseTypeId"
                        className="block mb-2 text-sm font-medium text-slate-300"
                      >
                        نوع القضية
                      </label>

                      <Field
                        as="select"
                        name="caseTypeId"
                        id="caseTypeId"
                        className="w-full px-4 py-3 text-sm text-white transition-colors border outline-none rounded-xl border-slate-700 bg-slate-800 focus:border-emerald-500"
                      >
                        <option value="">
                          اختر نوع القضية
                        </option>

                        {caseTypes?.map((type) => (
                          <option
                            key={type?._id}
                            value={type?._id}
                          >
                            {type?.name}
                          </option>
                        ))}
                      </Field>

                      <ErrorMessage
                        name="caseTypeId"
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

                    {/* ================= TITLE ================= */}
                    <div>
                      <label
                        htmlFor="title"
                        className="block mb-2 text-sm font-medium text-slate-300"
                      >
                        عنوان القضية
                      </label>

                      <Field
                        type="text"
                        name="title"
                        id="title"
                        placeholder="مثال: قضية مطالبة مالية"
                        className="w-full px-4 py-3 text-sm text-white transition-colors border outline-none rounded-xl border-slate-700 bg-slate-800 placeholder:text-slate-600 focus:border-emerald-500"
                      />

                      <ErrorMessage
                        name="title"
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
                        المحكمة
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
                  </div>
                </div>

                {/* ================= FOOTER ================= */}
                <div className="px-6 py-4 border-t shrink-0 border-slate-700 bg-slate-800/95">
                  <div className="flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setOpenAddCase(false)}
                      className="rounded-xl border border-slate-700 px-5 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
                    >
                      إلغاء
                    </button>

                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <FaSave />

                      {loadding 
                        ? "جاري الحفظ..."
                        : "حفظ القضية"}
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      {/* ================= DARK SCROLLBAR ================= */}
   
    </>
  );
};

export default AddCase;