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
  X,
  Save,
  LoaderCircle,
  CalendarDays,
  Clock3,
  FileText,
  CheckCircle2,
} from "lucide-react";
import { OwnerContext } from "../../../../../Providers/LawyerOwner/OwnerProvider.js";

const UpdateSession = ({selectSession}) => {
  const {
    handleUpdateSessionFun,
    openUpdateSession,
    setOpenUpdateSession,
    cases = [],
    loadding,
  } = useContext(OwnerContext);

  if (!openUpdateSession) return null;


  const formatDateForInput = (date) => {
    if (!date) return "";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) return "";

    return parsedDate.toISOString().split("T")[0];
  };

  const initialValues = {
    caseId:
      typeof selectSession.caseId === "object"
        ? selectSession.caseId?._id || ""
        : selectSession.caseId || "",

    title: selectSession.title || "",

    sessionDate: formatDateForInput(selectSession.sessionDate),

    sessionTime: selectSession.sessionTime || "",

    status: selectSession.status || "scheduled",

    notes: selectSession.notes || "",

    decision: selectSession.decision || "",

    nextSessionDate: formatDateForInput(
      selectSession.nextSessionDate
    ),
  };

  const validationSchema = Yup.object({
    caseId: Yup.string().required("اختيار القضية مطلوب"),

    title: Yup.string()
      .trim()
      .min(3, "عنوان الجلسة يجب أن يكون 3 أحرف على الأقل")
      .required("عنوان الجلسة مطلوب"),

    sessionDate: Yup.date()
      .typeError("تاريخ الجلسة غير صحيح")
      .required("تاريخ الجلسة مطلوب"),

    sessionTime: Yup.string().required(
      "وقت الجلسة مطلوب"
    ),

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
      2000,
      "الملاحظات يجب ألا تتجاوز 2000 حرف"
    ),

    decision: Yup.string().max(
      2000,
      "القرار يجب ألا يتجاوز 2000 حرف"
    ),

    nextSessionDate: Yup.date()
      .nullable()
      .transform((value, originalValue) =>
        originalValue === "" ? null : value
      )
      .typeError("تاريخ الجلسة القادمة غير صحيح"),
  });

  const handleSubmit = async (
    values,
    { setSubmitting }
  ) => {
    try {
      await handleUpdateSessionFun(
        session._id,
        values
      );

      setOpenUpdateSession(false);
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setOpenUpdateSession(false);
  };

  const statusOptions = [
    {
      value: "scheduled",
      label: "مجدولة",
      icon: CalendarDays,
    },
    {
      value: "attended",
      label: "تم الحضور",
      icon: CheckCircle2,
    },
    {
      value: "postponed",
      label: "مؤجلة",
      icon: Clock3,
    },
    {
      value: "completed",
      label: "مكتملة",
      icon: CheckCircle2,
    },
    {
      value: "cancelled",
      label: "ملغاة",
      icon: X,
    },
  ];

  return (
    <div
     
      className="fixed inset-0 z-[120] flex items-center justify-center bg-[#0f172a]/60 px-4 py-6 backdrop-blur-[2px]"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
    >
      <div className="flex max-h-[90vh] w-full max-w-[560px] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">

        {/* Header */}
        <div className="flex shrink-0 items-center justify-between bg-[#111827] px-5 py-4">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#c9a227] text-white">
              <CalendarDays size={19} />
            </div>

            <div>
              <h2 className="text-[14px] font-bold text-white">
                تعديل الجلسة
              </h2>

              <p className="mt-1 text-[10px] text-gray-400">
                تعديل بيانات الجلسة ومواعيدها
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={handleClose}
            className="flex items-center justify-center w-8 h-8 text-gray-400 transition rounded-lg hover:bg-white/10 hover:text-white"
          >
            <X size={17} />
          </button>

        </div>

        {/* Form */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
              handleUpdateSessionFun({values, id: selectSession._id});
          }}
          enableReinitialize
        >
          {({ values, setFieldValue }) => (
            <Form
              id="update-session-form"
              className="flex flex-col flex-1 min-h-0"
            >

              {/* Body */}
              <div className="flex-1 min-h-0 px-5 py-5 overflow-y-auto">

                <div className="space-y-4">

                  {/* Case */}
                  <div>

                    <label className="block mb-2 text-xs font-semibold text-slate-700">
                      القضية{" "}
                      <span className="text-red-500">*</span>
                    </label>

                    <Field
                      as="select"
                      name="caseId"
                      className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 outline-none transition focus:border-[#c9a227] focus:bg-white"
                    >
                      <option value="">
                        اختر القضية
                      </option>

                      {cases.map((caseItem) => (
                        <option
                          key={caseItem._id}
                          value={caseItem._id}
                        >
                          {caseItem.caseNumber}
                        </option>
                      ))}
                    </Field>

                    <ErrorMessage
                      name="caseId"
                      component="p"
                      className="mt-1 text-[11px] text-red-500"
                    />

                  </div>

                  {/* Title */}
                  <div>

                    <label className="block mb-2 text-xs font-semibold text-slate-700">
                      عنوان الجلسة{" "}
                      <span className="text-red-500">*</span>
                    </label>

                    <div className="relative">

                      <FileText
                        size={15}
                        className="absolute -translate-y-1/2 right-3 top-1/2 text-slate-400"
                      />

                      <Field
                        name="title"
                        type="text"
                        placeholder="مثال: جلسة المرافعة الأولى"
                        className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-3 pr-10 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#c9a227] focus:bg-white"
                      />

                    </div>

                    <ErrorMessage
                      name="title"
                      component="p"
                      className="mt-1 text-[11px] text-red-500"
                    />

                  </div>

                  {/* Date + Time */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                    <div>

                      <label className="block mb-2 text-xs font-semibold text-slate-700">
                        تاريخ الجلسة{" "}
                        <span className="text-red-500">*</span>
                      </label>

                      <Field
                        name="sessionDate"
                        type="date"
                        className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 outline-none transition focus:border-[#c9a227] focus:bg-white"
                      />

                      <ErrorMessage
                        name="sessionDate"
                        component="p"
                        className="mt-1 text-[11px] text-red-500"
                      />

                    </div>

                    <div>

                      <label className="block mb-2 text-xs font-semibold text-slate-700">
                        وقت الجلسة{" "}
                        <span className="text-red-500">*</span>
                      </label>

                      <Field
                        name="sessionTime"
                        type="time"
                        className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 outline-none transition focus:border-[#c9a227] focus:bg-white"
                      />

                      <ErrorMessage
                        name="sessionTime"
                        component="p"
                        className="mt-1 text-[11px] text-red-500"
                      />

                    </div>

                  </div>

                  {/* Status */}
                  <div>

                    <label className="block mb-2 text-xs font-semibold text-slate-700">
                      حالة الجلسة{" "}
                      <span className="text-red-500">*</span>
                    </label>

                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">

                      {statusOptions.map((status) => {

                        const Icon = status.icon;

                        const selected =
                          values.status === status.value;

                        return (
                          <button
                            key={status.value}
                            type="button"
                            onClick={() =>
                              setFieldValue(
                                "status",
                                status.value
                              )
                            }
                            className={`flex min-h-[68px] flex-col items-center justify-center gap-1.5 rounded-xl border transition ${
                              selected
                                ? "border-[#c9a227] bg-[#fffcf3] text-[#9a7919]"
                                : "border-slate-200 bg-slate-50 text-slate-400 hover:border-slate-300 hover:bg-white"
                            }`}
                          >
                            <Icon size={16} />

                            <span className="text-[10px] font-semibold">
                              {status.label}
                            </span>
                          </button>
                        );
                      })}

                    </div>

                    <ErrorMessage
                      name="status"
                      component="p"
                      className="mt-1 text-[11px] text-red-500"
                    />

                  </div>

                  {/* Next Session */}
                  <div>

                    <label className="block mb-2 text-xs font-semibold text-slate-700">
                      موعد الجلسة القادمة
                    </label>

                    <Field
                      name="nextSessionDate"
                      type="date"
                      className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 outline-none transition focus:border-[#c9a227] focus:bg-white"
                    />

                    <ErrorMessage
                      name="nextSessionDate"
                      component="p"
                      className="mt-1 text-[11px] text-red-500"
                    />

                  </div>

                  {/* Notes */}
                  <div>

                    <label className="block mb-2 text-xs font-semibold text-slate-700">
                      الملاحظات
                    </label>

                    <Field
                      as="textarea"
                      name="notes"
                      rows={3}
                      placeholder="أضف أي ملاحظات خاصة بالجلسة..."
                      className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#c9a227] focus:bg-white"
                    />

                    <ErrorMessage
                      name="notes"
                      component="p"
                      className="mt-1 text-[11px] text-red-500"
                    />

                  </div>

                  {/* Decision */}
                  <div>

                    <label className="block mb-2 text-xs font-semibold text-slate-700">
                      القرار
                    </label>

                    <Field
                      as="textarea"
                      name="decision"
                      rows={3}
                      placeholder="أضف قرار الجلسة إن وجد..."
                      className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#c9a227] focus:bg-white"
                    />

                    <ErrorMessage
                      name="decision"
                      component="p"
                      className="mt-1 text-[11px] text-red-500"
                    />

                  </div>

                </div>

              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-2 px-5 py-4 bg-white border-t shrink-0 border-slate-100">

                <button
                  type="button"
                  onClick={handleClose}
                  className="h-10 px-5 text-xs font-semibold transition border rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50"
                >
                  إلغاء
                </button>

                <button
                  type="submit"
                  disabled={loadding}
                  className="flex h-10 items-center gap-2 rounded-xl bg-[#111827] px-5 text-xs font-semibold text-white transition hover:bg-[#1f2937] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loadding ? (
                    <>
                      <LoaderCircle
                        size={15}
                        className="animate-spin"
                      />
                      جاري الحفظ...
                    </>
                  ) : (
                    <>
                      <Save size={15} />
                      حفظ التعديلات
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

export default UpdateSession;