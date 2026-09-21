"use client";

import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  FaTimes,
  FaTasks,
} from "react-icons/fa";
import { OwnerContext } from "../../../../../Providers/LawyerOwner/OwnerProvider.js";

const Update = ({ selectTask }) => {
  const {
    openUpdateTask,
    setOpenUpdateTask,
    handleUpdateTaskFun,
    loadding,
    lawyers = [],
  } = useContext(OwnerContext);

  const initialValues = {
    title: selectTask?.title || "",
    description: selectTask?.description || "",
    assignedTo: selectTask?.assignedTo?._id || selectTask?.assignedTo || "",
    priority: selectTask?.priority || "medium",
    dueDate: selectTask?.dueDate
      ? new Date(selectTask.dueDate).toISOString().split("T")[0]
      : "",
    status: selectTask?.status || "todo",
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .trim()
      .min(3, "عنوان المهمة يجب أن يكون 3 أحرف على الأقل")
      .max(200, "عنوان المهمة يجب ألا يتجاوز 200 حرف")
      .required("عنوان المهمة مطلوب"),

    description: Yup.string()
      .trim()
      .max(1000, "وصف المهمة يجب ألا يتجاوز 1000 حرف"),

    assignedTo: Yup.string().required(
      "يجب اختيار المحامي المسؤول عن المهمة",
    ),

    priority: Yup.string()
      .oneOf(["low", "medium", "high"])
      .required("أولوية المهمة مطلوبة"),

    dueDate: Yup.date()
      .nullable()
      .typeError("تاريخ الاستحقاق غير صحيح"),

    status: Yup.string()
      .oneOf(["todo", "in_progress", "completed"])
      .required("حالة المهمة مطلوبة"),
  });

  if (!openUpdateTask || !selectTask) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/40 backdrop-blur-sm sm:p-4">
      <div className="w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-white border shadow-2xl rounded-2xl border-[#E7EBF2]">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-[#E7EBF2] sm:px-6 sm:py-5">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#D5E0F8] text-[#0B1C30]">
              <FaTasks />
            </div>

            <div>
              <h2 className="text-base font-bold text-[#0B1C30] sm:text-lg">
                تعديل المهمة
              </h2>

              <p className="mt-1 text-[11px] text-[#45464D] sm:text-xs">
                تعديل بيانات المهمة ومتابعة حالة التنفيذ
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOpenUpdateTask(false)}
            disabled={loadding}
            className="flex items-center justify-center transition rounded-lg w-9 h-9 text-[#45464D] bg-[#F8F9FB] hover:bg-[#E7EBF2] disabled:opacity-50"
          >
            <FaTimes className="text-sm" />
          </button>
        </div>

        {/* Form */}
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) =>
            handleUpdateTaskFun({id:selectTask._id, values})
          }
        >
          <Form className="p-4 space-y-4 sm:p-6 sm:space-y-5">
            {/* Title */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-[#0B1C30]">
                عنوان المهمة
              </label>

              <Field
                name="title"
                type="text"
                placeholder="مثال: مراجعة عقد الشركة"
                className="w-full px-4 py-3 text-sm transition bg-white border outline-none rounded-xl border-[#E7EBF2] text-[#0B1C30] placeholder:text-[#9A9DA5] focus:border-[#D5DDEB] focus:ring-2 focus:ring-[#D5E0F8]"
              />

              <ErrorMessage
                name="title"
                component="p"
                className="mt-1.5 text-xs text-red-500"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-[#0B1C30]">
                وصف المهمة
              </label>

              <Field
                as="textarea"
                name="description"
                rows="3"
                placeholder="اكتب تفاصيل وتعليمات المهمة..."
                className="w-full px-4 py-3 text-sm transition bg-white border outline-none resize-none rounded-xl border-[#E7EBF2] text-[#0B1C30] placeholder:text-[#9A9DA5] focus:border-[#D5DDEB] focus:ring-2 focus:ring-[#D5E0F8]"
              />

              <ErrorMessage
                name="description"
                component="p"
                className="mt-1.5 text-xs text-red-500"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
              {/* Lawyer */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-[#0B1C30]">
                  المحامي المسؤول
                </label>

                <Field
                  as="select"
                  name="assignedTo"
                  className="w-full px-4 py-3 text-sm transition bg-white border outline-none rounded-xl border-[#E7EBF2] text-[#0B1C30] focus:border-[#D5DDEB] focus:ring-2 focus:ring-[#D5E0F8]"
                >
                  <option value="">اختر المحامي</option>

                  {lawyers.map((lawyer) => (
                    <option key={lawyer._id} value={lawyer._id}>
                      {lawyer.name}
                    </option>
                  ))}
                </Field>

                <ErrorMessage
                  name="assignedTo"
                  component="p"
                  className="mt-1.5 text-xs text-red-500"
                />
              </div>

              {/* Priority */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-[#0B1C30]">
                  الأولوية
                </label>

                <Field
                  as="select"
                  name="priority"
                  className="w-full px-4 py-3 text-sm transition bg-white border outline-none rounded-xl border-[#E7EBF2] text-[#0B1C30] focus:border-[#D5DDEB] focus:ring-2 focus:ring-[#D5E0F8]"
                >
                  <option value="low">منخفضة</option>
                  <option value="medium">متوسطة</option>
                  <option value="high">عالية</option>
                </Field>

                <ErrorMessage
                  name="priority"
                  component="p"
                  className="mt-1.5 text-xs text-red-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
              {/* Status */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-[#0B1C30]">
                  حالة المهمة
                </label>

                <Field
                  as="select"
                  name="status"
                  className="w-full px-4 py-3 text-sm transition bg-white border outline-none rounded-xl border-[#E7EBF2] text-[#0B1C30] focus:border-[#D5DDEB] focus:ring-2 focus:ring-[#D5E0F8]"
                >
                  <option value="todo">لم تبدأ</option>
                  <option value="in_progress">قيد التنفيذ</option>
                  <option value="completed">مكتملة</option>
                </Field>

                <ErrorMessage
                  name="status"
                  component="p"
                  className="mt-1.5 text-xs text-red-500"
                />
              </div>

              {/* Due Date */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-[#0B1C30]">
                  تاريخ الاستحقاق
                </label>

                <Field
                  name="dueDate"
                  type="date"
                  className="w-full px-4 py-3 text-sm transition bg-white border outline-none rounded-xl border-[#E7EBF2] text-[#0B1C30] focus:border-[#D5DDEB] focus:ring-2 focus:ring-[#D5E0F8]"
                />

                <ErrorMessage
                  name="dueDate"
                  component="p"
                  className="mt-1.5 text-xs text-red-500"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E7EBF2]">
              <button
                type="button"
                onClick={() => setOpenUpdateTask(false)}
                disabled={loadding}
                className="px-4 py-2.5 text-sm font-semibold transition rounded-lg border border-[#E7EBF2] text-[#45464D] bg-white hover:bg-[#F8F9FB] disabled:opacity-50 sm:px-5"
              >
                إلغاء
              </button>

              <button
                type="submit"
                disabled={loadding}
                className="px-4 py-2.5 text-sm font-semibold text-white transition rounded-lg bg-[#111827] hover:bg-[#1D2738] disabled:opacity-60 sm:px-5"
              >
                {loadding ? "جاري التحديث..." : "حفظ التعديلات"}
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Update;