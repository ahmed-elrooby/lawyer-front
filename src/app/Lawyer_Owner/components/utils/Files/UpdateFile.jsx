"use client";

import React, { useContext, useEffect, useState } from "react";
import { X, FileText, Upload, Save } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { OwnerContext } from "../../../../../Providers/LawyerOwner/OwnerProvider.js";

const UpdateFile = ({ document }) => {
  const {
    openUpdateDocument,
    setOpenUpdateDocument,
    handleUpdateDocumentFun,
    loadding,
  } = useContext(OwnerContext);

  const [file, setFile] = useState(null);

  useEffect(() => {
    if (document) {
      setFile(null);
    }
  }, [document]);

  if (!openUpdateDocument || !document) return null;

  const validationSchema = Yup.object({
    name: Yup.string()
      .trim()
      .required("اسم الصيغة مطلوب")
      .min(3, "اسم الصيغة يجب أن يكون 3 أحرف على الأقل"),

    description: Yup.string()
      .trim()
      .max(500, "الوصف يجب ألا يتجاوز 500 حرف"),
  });

  const handleClose = () => {
    if (loadding) return;

    setOpenUpdateDocument(false);
    setFile(null);
  };


  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50 p-4">
      <div className="flex max-h-[90vh] w-full max-w-xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-[#EEF0F3] px-5 py-4">
          <div>
            <h2 className="text-[15px] font-bold text-[#0B1C30]">
              تعديل صيغة الدعوى
            </h2>

            <p className="mt-1 text-[10px] text-[#8A8E96]">
              تعديل بيانات الصيغة واستبدال الملف عند الحاجة
            </p>
          </div>

          <button
            type="button"
            disabled={loadding}
            onClick={handleClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#8A8E96] transition hover:bg-[#F5F6F8] hover:text-[#0B1C30] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={17} />
          </button>
        </div>

        <Formik
          initialValues={{
            name: document?.name || "",
            description: document?.description || "",
          }}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={(values) => {
  handleUpdateDocumentFun({
    id: document._id,
    values: {
      ...values,
      file,
    },
  });
}}
        >
          {({ setFieldValue }) => (
            <Form className="flex flex-col flex-1 min-h-0">
              {/* Content */}
              <div className="flex-1 min-h-0 px-6 py-6 overflow-y-auto">
                {/* Name */}
                <div>
                  <label className="mb-2 block text-[10px] font-bold text-[#45464D]">
                    اسم الصيغة
                  </label>

                  <Field
                    name="name"
                    type="text"
                    placeholder="مثال: صيغة دعوى مطالبة مالية"
                    className="h-10 w-full rounded-lg border border-[#E1E4E9] bg-white px-3 text-[11px] text-[#0B1C30] outline-none transition placeholder:text-[#A0A5AD] focus:border-[#B8C5DD] focus:ring-2 focus:ring-[#EAF0FF]"
                  />

                  <ErrorMessage
                    name="name"
                    component="p"
                    className="mt-1.5 text-[9px] font-medium text-[#C24A4A]"
                  />
                </div>

                {/* Description */}
                <div className="mt-5">
                  <label className="mb-2 block text-[10px] font-bold text-[#45464D]">
                    وصف الصيغة
                  </label>

                  <Field
                    as="textarea"
                    name="description"
                    rows={4}
                    placeholder="اكتب وصفاً مختصراً للصيغة..."
                    className="w-full resize-none rounded-lg border border-[#E1E4E9] bg-white px-3 py-3 text-[11px] leading-5 text-[#0B1C30] outline-none transition placeholder:text-[#A0A5AD] focus:border-[#B8C5DD] focus:ring-2 focus:ring-[#EAF0FF]"
                  />

                  <ErrorMessage
                    name="description"
                    component="p"
                    className="mt-1.5 text-[9px] font-medium text-[#C24A4A]"
                  />
                </div>

                {/* Current File */}
                <div className="mt-5">
                  <label className="mb-2 block text-[10px] font-bold text-[#45464D]">
                    الملف الحالي
                  </label>

                  <div className="flex items-center gap-3 rounded-lg border border-[#E8EAF0] bg-[#FAFBFC] px-3 py-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#EAF0FF]">
                      <FileText
                        size={17}
                        className="text-[#4868B4]"
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-[10px] font-bold text-[#0B1C30]">
                        {document?.originalName ||
                          document?.name ||
                          "الملف الحالي"}
                      </p>

                      <p className="mt-1 text-[9px] text-[#9AA0A8]">
                        {document?.extension
                          ?.replace(".", "")
                          .toUpperCase() || "FILE"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Replace File */}
                <div className="mt-5">
                  <label className="mb-2 block text-[10px] font-bold text-[#45464D]">
                    استبدال الملف
                    <span className="mr-1 font-normal text-[#9AA0A8]">
                      (اختياري)
                    </span>
                  </label>

                  <label
                    className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed px-4 py-5 transition ${
                      file
                        ? "border-[#B8C5DD] bg-[#F8FAFD]"
                        : "border-[#D9DDE4] bg-[#FAFBFC] hover:border-[#B8C5DD] hover:bg-[#F8FAFD]"
                    }`}
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EAF0FF]">
                      <Upload
                        size={17}
                        className="text-[#4868B4]"
                      />
                    </div>

                    <p className="mt-2 text-[10px] font-bold text-[#59616D]">
                      {file
                        ? file.name
                        : "اضغط لاختيار ملف جديد"}
                    </p>

                    <p className="mt-1 text-[9px] text-[#9AA0A8]">
                      PDF أو Word — بحد أقصى 10 MB
                    </p>

                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      onChange={(e) => {
                        const selectedFile = e.target.files?.[0];

                        if (!selectedFile) return;

                        const allowedTypes = [
                          "application/pdf",
                          "application/msword",
                          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                        ];

                        if (!allowedTypes.includes(selectedFile.type)) {
                          setFieldValue("fileError", "نوع الملف غير مدعوم");
                          setFile(null);
                          return;
                        }

                        if (selectedFile.size > 10 * 1024 * 1024) {
                          setFieldValue(
                            "fileError",
                            "حجم الملف يجب ألا يتجاوز 10 MB"
                          );
                          setFile(null);
                          return;
                        }

                        setFieldValue("fileError", "");
                        setFile(selectedFile);
                      }}
                    />
                  </label>

                  <ErrorMessage
                    name="fileError"
                    component="p"
                    className="mt-1.5 text-[9px] font-medium text-[#C24A4A]"
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="flex shrink-0 items-center justify-start gap-2 border-t border-[#EEF0F3] bg-[#FAFBFC] px-5 py-4">
                <button
                  type="button"
                  onClick={handleClose}
                  className="h-9 rounded-lg border border-[#E1E4E9] bg-white px-5 text-[10px] font-bold text-[#59616D] transition hover:bg-[#F5F6F8] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  إلغاء
                </button>

                <button
                  type="submit"
                  className="flex h-9 items-center gap-2 rounded-lg bg-[#0B1C30] px-5 text-[10px] font-bold text-white transition hover:bg-[#142A42] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Save size={14} />

                  {loadding
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

export default UpdateFile;