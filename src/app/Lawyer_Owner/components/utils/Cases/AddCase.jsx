
"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  FaTimes,
  FaGavel,
  FaCalendarAlt,
  FaFileAlt,
} from "react-icons/fa";

import { OwnerContext } from "../../../../../Providers/LawyerOwner/OwnerProvider.js";

import ClientDropdown from "./ClientDropdown";
import LawyersDropdown from "./LawyersDropdown";
import CaseDocuments from "./CaseDocuments";

const AddCase = () => {
  const {
    setOpenAddCase,
    openAddCase,
    handleAddCaseFun,
    clients,
    lawyers,
    loadding,
  } = useContext(OwnerContext);

  const [documents, setDocuments] = useState([]);

  const [clientDropdownOpen, setClientDropdownOpen] = useState(false);
  const [lawyersDropdownOpen, setLawyersDropdownOpen] = useState(false);

  const clientDropdownRef = useRef(null);
  const lawyersDropdownRef = useRef(null);

  const initialValues = {
    clientId: "",
    lawyers: [],
    caseNumber: "",
    court: "",
    status: "active",
    filingDate: "",
    nextHearingDate: "",
    description: "",
    notes: "",
    documents: [],
  };

  const validationSchema = Yup.object({
    clientId: Yup.string().required("اختر العميل"),

    lawyers: Yup.array()
      .min(1, "اختر محامي واحد على الأقل")
      .required("اختر المحامي"),

    caseNumber: Yup.string().required("رقم القضية مطلوب"),

    court: Yup.string(),

    status: Yup.string().required("حالة القضية مطلوبة"),

    filingDate: Yup.string().required("تاريخ القيد مطلوب"),

    nextHearingDate: Yup.string().nullable(),

    description: Yup.string(),

    notes: Yup.string(),
  });

  // إغلاق القوائم عند الضغط خارجها
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

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!openAddCase) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-50">
              <FaGavel className="text-blue-600" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-800">
                إضافة قضية جديدة
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                أدخل بيانات القضية
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOpenAddCase(false)}
            className="flex items-center justify-center transition rounded-lg w-9 h-9 text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <FaTimes />
          </button>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleAddCaseFun}
        >
          {({ values, setFieldValue }) => (
            <Form className="p-6 space-y-6">
              {/* بيانات القضية */}
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
                  />

                  <ClientDropdown
                    clients={clients}
                    value={values.clientId}
                    open={clientDropdownOpen}
                    setOpen={setClientDropdownOpen}
                    setFieldValue={setFieldValue}
                    dropdownRef={clientDropdownRef}
                  />

                  <LawyersDropdown
                    lawyers={lawyers}
                    selectedIds={values.lawyers}
                    open={lawyersDropdownOpen}
                    setOpen={setLawyersDropdownOpen}
                    setFieldValue={setFieldValue}
                    dropdownRef={lawyersDropdownRef}
                  />
                </div>
              </section>

              {/* الحالة والمواعيد */}
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
                    <option value="active">نشطة</option>
                    <option value="judged">تم الحكم</option>
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

              {/* الوصف والملاحظات */}
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

              {/* المستندات */}
              <CaseDocuments
                documents={documents}
                setDocuments={setDocuments}
                setFieldValue={setFieldValue}
              />

              {/* Footer */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setOpenAddCase(false)}
                  className="px-5 text-sm font-semibold transition border h-11 rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50"
                >
                  إلغاء
                </button>

                <button
                  type="submit"
                  disabled={loadding}
                  className="px-6 text-sm font-semibold text-white transition bg-blue-600 shadow-sm h-11 rounded-xl hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loadding ? "جاري الإضافة..." : "إضافة القضية"}
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
   Reusable Components
========================= */

const SectionTitle = ({ icon, title }) => (
  <div className="flex items-center gap-2 mb-4">
    <span className="text-sm text-blue-600">{icon}</span>

    <h3 className="text-sm font-bold text-slate-800">
      {title}
    </h3>
  </div>
);

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

      {required && <span className="text-red-500"> *</span>}
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

const SelectField = ({
  name,
  label,
  children,
  required = false,
}) => (
  <div>
    <label className="block mb-2 text-xs font-semibold text-slate-700">
      {label}

      {required && <span className="text-red-500"> *</span>}
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

export default AddCase;
