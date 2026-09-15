
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
  FaTimes,
  FaEdit,
  FaSave,
  FaGavel,
} from "react-icons/fa";

import { LawyerContext } from "../../../../../Providers/LawyerContext/lawyer.js";

const UpdateCase = ({ selectCase }) => {
  const {
    handleUpdateCaseFun,
    openUpdateCase,
    setOpenUpdateCase,
    clients = [],
    caseTypes = [],
  } = useContext(LawyerContext);

  if (!openUpdateCase || !selectCase) {
    return null;
  }

  const validationSchema = Yup.object({
    clientId: Yup.string().required("العميل مطلوب"),

    caseTypeId: Yup.string().required(
      "نوع القضية مطلوب",
    ),

    caseNumber: Yup.string()
      .trim()
      .required("رقم القضية مطلوب"),

    title: Yup.string()
      .trim()
      .min(2, "عنوان القضية يجب أن يكون حرفين على الأقل")
      .required("عنوان القضية مطلوب"),

    court: Yup.string()
      .trim()
      .min(2, "اسم المحكمة يجب أن يكون حرفين على الأقل")
      .required("اسم المحكمة مطلوب"),

    status: Yup.string()
      .oneOf([
        "active",
        "reserved_for_judgment",
        "judged",
      ])
      .required("حالة القضية مطلوبة"),

    filingDate: Yup.string().required(
      "تاريخ رفع القضية مطلوب",
    ),

    nextHearingDate: Yup.string().nullable(),

    description: Yup.string().max(
      5000,
      "الوصف يجب ألا يتجاوز 5000 حرف",
    ),

    notes: Yup.string().max(
      5000,
      "الملاحظات يجب ألا تتجاوز 5000 حرف",
    ),
  });

  const initialValues = {
    clientId: selectCase.clientId?._id || "",
    caseTypeId: selectCase.caseTypeId?._id || "",
    caseNumber: selectCase.caseNumber || "",
    title: selectCase.title || "",
    court: selectCase.court || "",
    status: selectCase.status || "active",

    filingDate: selectCase.filingDate
      ? new Date(selectCase.filingDate)
          .toISOString()
          .split("T")[0]
      : "",

    nextHearingDate: selectCase.nextHearingDate
      ? new Date(selectCase.nextHearingDate)
          .toISOString()
          .split("T")[0]
      : "",

    description: selectCase.description || "",
    notes: selectCase.notes || "",
  };

  const inputClass =
    "w-full rounded-xl border border-slate-700/70 bg-slate-800/40 px-4 py-3 text-sm text-slate-200 outline-none transition-all placeholder:text-slate-600 focus:border-emerald-500/50 focus:bg-slate-800/60";

  const labelClass =
    "mb-2 block text-xs font-medium text-slate-400";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={() => setOpenUpdateCase(false)}
    >
      <div
        className="dark-scrollbar max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-slate-700/70 bg-slate-900 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-700/60 bg-slate-900">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-11 w-11 rounded-xl bg-emerald-500/10 text-emerald-400">
              <FaEdit />
            </div>

            <div>
              <h2 className="text-lg font-bold text-white">
                تعديل القضية
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                تعديل بيانات القضية رقم{" "}
                <span className="font-medium text-slate-300">
                  {selectCase.caseNumber}
                </span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOpenUpdateCase(false)}
            className="flex items-center justify-center transition-colors h-9 w-9 rounded-xl text-slate-500 hover:bg-slate-800 hover:text-white"
          >
            <FaTimes />
          </button>
        </div>

        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={
            (values)=>{
                handleUpdateCaseFun({values,id:selectCase?._id})
            }
          }
        >
          {({ isSubmitting }) => (
            <Form className="p-6 space-y-6">
              {/* البيانات الأساسية */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <FaGavel className="text-xs text-emerald-400" />

                  <h3 className="text-sm font-bold text-white">
                    البيانات الأساسية
                  </h3>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {/* العميل */}
                  <div>
                    <label
                      htmlFor="clientId"
                      className={labelClass}
                    >
                      العميل
                    </label>

                    <Field
                      as="select"
                      name="clientId"
                      id="clientId"
                      className={inputClass}
                    >
                      <option value="">
                        اختر العميل
                      </option>

                      {clients.map((client) => (
                        <option
                          key={client._id}
                          value={client._id}
                        >
                          {client.name}
                        </option>
                      ))}
                    </Field>

                    <ErrorMessage
                      name="clientId"
                      component="div"
                      className="mt-1.5 text-xs text-red-400"
                    />
                  </div>

                  {/* نوع القضية */}
                  <div>
                    <label
                      htmlFor="caseTypeId"
                      className={labelClass}
                    >
                      نوع القضية
                    </label>

                    <Field
                      as="select"
                      name="caseTypeId"
                      id="caseTypeId"
                      className={inputClass}
                    >
                      <option value="">
                        اختر نوع القضية
                      </option>

                      {caseTypes.map((type) => (
                        <option
                          key={type._id}
                          value={type._id}
                        >
                          {type.name}
                        </option>
                      ))}
                    </Field>

                    <ErrorMessage
                      name="caseTypeId"
                      component="div"
                      className="mt-1.5 text-xs text-red-400"
                    />
                  </div>

                  {/* رقم القضية */}
                  <div>
                    <label
                      htmlFor="caseNumber"
                      className={labelClass}
                    >
                      رقم القضية
                    </label>

                    <Field
                      type="text"
                      name="caseNumber"
                      id="caseNumber"
                      placeholder="مثال: 1254 لسنة 2026"
                      className={inputClass}
                    />

                    <ErrorMessage
                      name="caseNumber"
                      component="div"
                      className="mt-1.5 text-xs text-red-400"
                    />
                  </div>

                  {/* اسم القضية */}
                  <div>
                    <label
                      htmlFor="title"
                      className={labelClass}
                    >
                      اسم القضية
                    </label>

                    <Field
                      type="text"
                      name="title"
                      id="title"
                      placeholder="اسم أو عنوان القضية"
                      className={inputClass}
                    />

                    <ErrorMessage
                      name="title"
                      component="div"
                      className="mt-1.5 text-xs text-red-400"
                    />
                  </div>

                  {/* المحكمة */}
                  <div>
                    <label
                      htmlFor="court"
                      className={labelClass}
                    >
                      المحكمة
                    </label>

                    <Field
                      type="text"
                      name="court"
                      id="court"
                      placeholder="اسم المحكمة"
                      className={inputClass}
                    />

                    <ErrorMessage
                      name="court"
                      component="div"
                      className="mt-1.5 text-xs text-red-400"
                    />
                  </div>

                  {/* الحالة */}
                  <div>
                    <label
                      htmlFor="status"
                      className={labelClass}
                    >
                      حالة القضية
                    </label>

                    <Field
                      as="select"
                      name="status"
                      id="status"
                      className={inputClass}
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
                      component="div"
                      className="mt-1.5 text-xs text-red-400"
                    />
                  </div>

                  {/* تاريخ رفع القضية */}
                  <div>
                    <label
                      htmlFor="filingDate"
                      className={labelClass}
                    >
                      تاريخ رفع القضية
                    </label>

                    <Field
                      type="date"
                      name="filingDate"
                      id="filingDate"
                      className={inputClass}
                    />

                    <ErrorMessage
                      name="filingDate"
                      component="div"
                      className="mt-1.5 text-xs text-red-400"
                    />
                  </div>

                  {/* الجلسة القادمة */}
                  <div>
                    <label
                      htmlFor="nextHearingDate"
                      className={labelClass}
                    >
                      الجلسة القادمة
                    </label>

                    <Field
                      type="date"
                      name="nextHearingDate"
                      id="nextHearingDate"
                      className={inputClass}
                    />

                    <ErrorMessage
                      name="nextHearingDate"
                      component="div"
                      className="mt-1.5 text-xs text-red-400"
                    />
                  </div>
                </div>
              </section>

              {/* الوصف */}
              <section>
                <label
                  htmlFor="description"
                  className={labelClass}
                >
                  وصف القضية
                </label>

                <Field
                  as="textarea"
                  name="description"
                  id="description"
                  rows={4}
                  placeholder="اكتب وصف القضية..."
                  className={`${inputClass} resize-none`}
                />

                <ErrorMessage
                  name="description"
                  component="div"
                  className="mt-1.5 text-xs text-red-400"
                />
              </section>

              {/* الملاحظات */}
              <section>
                <label
                  htmlFor="notes"
                  className={labelClass}
                >
                  الملاحظات
                </label>

                <Field
                  as="textarea"
                  name="notes"
                  id="notes"
                  rows={4}
                  placeholder="أضف أي ملاحظات..."
                  className={`${inputClass} resize-none`}
                />

                <ErrorMessage
                  name="notes"
                  component="div"
                  className="mt-1.5 text-xs text-red-400"
                />
              </section>

              {/* Footer */}
              <div className="flex items-center justify-end gap-3 pt-5 border-t border-slate-700/60">
                <button
                  type="button"
                  onClick={() =>
                    setOpenUpdateCase(false)
                  }
                  className="rounded-xl border border-slate-700/70 px-5 py-2.5 text-sm font-medium text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
                >
                  إلغاء
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <FaSave />

                  {isSubmitting
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

export default UpdateCase;

