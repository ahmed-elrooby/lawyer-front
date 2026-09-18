"use client";

import React, { useEffect, useState, useContext } from "react";

import {
  FaTimes,
  FaFileAlt,
  FaUpload,
  FaSave,
  FaSpinner,
} from "react-icons/fa";

import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from "formik";

import * as Yup from "yup";

import { LawyerContext } from "../../../../../Providers/LawyerContext/lawyer.js";

const UpdateFile = ({ selectFile }) => {
  const {
    openUpdateDocument,
    setOpenUpdateDocument,
    handleUpdateDocumentFun,
    loadding,
  } = useContext(LawyerContext);

  const [selectedFile, setSelectedFile] =
    useState(null);

  /* =========================================================
     Reset Selected File
  ========================================================= */

  useEffect(() => {
    if (!openUpdateDocument) {
      setSelectedFile(null);
    }
  }, [openUpdateDocument]);

  if (!openUpdateDocument || !selectFile) {
    return null;
  }

  /* =========================================================
     Initial Values
  ========================================================= */

  const initialValues = {
    name: selectFile?.name || "",
    description: selectFile?.description || "",
    file: null,
  };

  /* =========================================================
     Validation
  ========================================================= */

  const validationSchema = Yup.object({
    name: Yup.string()
      .trim()
      .required("اسم المستند مطلوب")
      .min(
        2,
        "اسم المستند يجب أن يكون حرفين على الأقل"
      )
      .max(
        200,
        "اسم المستند لا يجب أن يتجاوز 200 حرف"
      ),

    description: Yup.string()
      .trim()
      .max(
        1000,
        "الوصف لا يجب أن يتجاوز 1000 حرف"
      ),

    file: Yup.mixed(),
  });

  return (
    <div
      className="
        fixed
        inset-0
        z-[100]
        flex
        items-center
        justify-center
        bg-slate-950/80
        p-4
        backdrop-blur-sm
      "
      onClick={() =>
        !loadding &&
        setOpenUpdateDocument(false)
      }
    >
      <div
        onClick={(e) =>
          e.stopPropagation()
        }
        className="
          flex
          max-h-[90vh]
          w-full
          max-w-2xl
          flex-col
          overflow-hidden
          rounded-3xl
          border
          border-slate-700
          bg-slate-900
          shadow-2xl
        "
      >
        {/* =================================================
            HEADER
        ================================================= */}

        <div
          className="flex items-center justify-between px-5 py-4 border-b  border-slate-800 shrink-0"
        >
          <div className="flex items-center gap-3 ">
            <div
              className="flex items-center justify-center  h-11 w-11 rounded-xl bg-cyan-500/10 text-cyan-400"
            >
              <FaFileAlt />
            </div>

            <div>
              <h2 className="text-base font-bold text-white ">
                تعديل المستند
              </h2>

              <p className="mt-1 text-xs  text-slate-400">
                تعديل بيانات المستند أو استبدال الملف
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              setOpenUpdateDocument(false)
            }
            disabled={loadding}
            className="p-2 transition rounded-lg  text-slate-400 hover:bg-slate-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            <FaTimes />
          </button>
        </div>

        {/* =================================================
            FORM
        ================================================= */}

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={(values) => {
            handleUpdateDocumentFun({
              id: selectFile?._id,
              values,
            });
          }}
        >
          {({
            setFieldValue,
            values,
          }) => (
            <Form className="overflow-y-auto  add-case-scrollbar">
              <div className="p-5 space-y-5  sm:p-6">

                {/* =================================================
                    NAME
                ================================================= */}

                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-semibold  text-slate-200"
                  >
                    اسم المستند
                  </label>

                  <Field
                    id="name"
                    name="name"
                    type="text"
                    disabled={loadding}
                    placeholder="مثال: عقد إيجار المكتب"
                    className="w-full px-4 py-3 text-sm text-white transition border outline-none  rounded-xl border-slate-700 bg-slate-800/70 placeholder:text-slate-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                  />

                  <ErrorMessage
                    name="name"
                    component="p"
                    className="
                      mt-1.5
                      text-xs
                      font-medium
                      text-red-400
                    "
                  />
                </div>

                {/* =================================================
                    DESCRIPTION
                ================================================= */}

                <div>
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-semibold  text-slate-200"
                  >
                    وصف المستند

                    <span className="mr-1 text-xs font-normal  text-slate-500">
                      (اختياري)
                    </span>
                  </label>

                  <Field
                    as="textarea"
                    id="description"
                    name="description"
                    rows={4}
                    disabled={loadding}
                    placeholder="اكتب وصفًا مختصرًا للمستند..."
                    className="w-full px-4 py-3 text-sm leading-7 text-white transition border outline-none resize-none  rounded-xl border-slate-700 bg-slate-800/70 placeholder:text-slate-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                  />

                  <ErrorMessage
                    name="description"
                    component="p"
                    className="
                      mt-1.5
                      text-xs
                      font-medium
                      text-red-400
                    "
                  />
                </div>

                {/* =================================================
                    CURRENT FILE
                ================================================= */}

                <div
                  className="p-4 border  rounded-2xl border-slate-700 bg-slate-800/40"
                >
                  <p className="mb-3 text-xs font-medium  text-slate-400">
                    الملف الحالي
                  </p>

                  <div className="flex items-center gap-3 ">
                    <div
                      className="flex items-center justify-center  h-11 w-11 shrink-0 rounded-xl bg-cyan-500/10 text-cyan-400"
                    >
                      <FaFileAlt />
                    </div>

                    <div className="min-w-0">
                      <p
                        className="text-sm font-semibold truncate  text-slate-200"
                        title={
                          selectFile?.originalName
                        }
                      >
                        {selectFile?.originalName ||
                          selectFile?.name ||
                          "بدون اسم"}
                      </p>

                      <div className="flex flex-wrap items-center gap-2 mt-1 ">
                        {selectFile?.extension && (
                          <span className="
                            rounded-md
                            bg-slate-900
                            px-2
                            py-1
                            text-[10px]
                            font-bold
                            uppercase
                            text-slate-400
                          ">
                            {selectFile.extension}
                          </span>
                        )}

                        {selectFile?.size && (
                          <span className="
                            text-[11px]
                            text-slate-500
                          ">
                            {(
                              selectFile.size /
                              1024
                            ).toFixed(1)}{" "}
                            KB
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* =================================================
                    REPLACE FILE
                ================================================= */}

                <div>
                  <label className="block mb-2 text-sm font-semibold  text-slate-200">
                    استبدال الملف

                    <span className="mr-1 text-xs font-normal  text-slate-500">
                      (اختياري)
                    </span>
                  </label>

                  <label
                    htmlFor="update-file"
                    className={`
                      group
                      flex
                      cursor-pointer
                      flex-col
                      items-center
                      justify-center
                      rounded-2xl
                      border
                      border-dashed
                      px-4
                      py-7
                      transition-all
                      ${
                        selectedFile
                          ? "border-cyan-500/40 bg-cyan-500/5"
                          : "border-slate-700 bg-slate-800/30 hover:border-cyan-500/40 hover:bg-slate-800/50"
                      }
                    `}
                  >
                    <div
                      className={`
                        mb-3
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-2xl
                        transition
                        ${
                          selectedFile
                            ? "bg-cyan-500/10 text-cyan-400"
                            : "bg-slate-800 text-slate-400 group-hover:text-cyan-400"
                        }
                      `}
                    >
                      <FaUpload />
                    </div>

                    <span className="max-w-full px-4 text-sm font-medium truncate  text-slate-300">
                      {selectedFile
                        ? selectedFile.name
                        : "اضغط لاختيار ملف جديد"}
                    </span>

                    <span className="mt-2 text-xs  text-slate-500">
                      اترك الحقل فارغًا للاحتفاظ بالملف الحالي
                    </span>
                  </label>

                  <input
                    id="update-file"
                    name="file"
                    type="file"
                    className="hidden"
                    disabled={loadding}
                    onChange={(event) => {
                      const file =
                        event.currentTarget.files?.[0];

                      if (!file) return;

                      setSelectedFile(file);

                      setFieldValue(
                        "file",
                        file
                      );
                    }}
                  />

                  {/* Selected File */}
                  {values.file && (
                    <div className="flex items-center justify-between gap-3 p-3 mt-3 border  rounded-xl border-cyan-500/20 bg-cyan-500/5">
                      <div className="flex items-center min-w-0 gap-2 ">
                        <FaFileAlt className=" shrink-0 text-cyan-400" />

                        <p className="text-xs truncate  text-slate-300">
                          {values.file.name}
                        </p>
                      </div>

                      <button
                        type="button"
                        disabled={loadding}
                        onClick={() => {
                          setSelectedFile(null);

                          setFieldValue(
                            "file",
                            null
                          );

                          const input =
                            window.document.getElementById(
                              "update-file"
                            );

                          if (input) {
                            input.value = "";
                          }
                        }}
                        className="text-xs text-red-400 transition  shrink-0 hover:text-red-300"
                      >
                        إزالة
                      </button>
                    </div>
                  )}
                </div>

                {/* =================================================
                    INFO
                ================================================= */}

                <div className="p-4 border  rounded-xl border-slate-700/60 bg-slate-800/30">
                  <div className="flex items-start gap-3 ">
                    <FaFileAlt className="
                      mt-0.5
                      shrink-0
                      text-cyan-400
                    " />

                    <div>
                      <p className="text-xs font-semibold  text-slate-300">
                        ملاحظة
                      </p>

                      <p className="mt-1 text-xs leading-6  text-slate-500">
                        يمكنك تعديل اسم المستند أو وصفه
                        بدون تغيير الملف. وإذا اخترت ملفًا
                        جديدًا فسيتم استخدامه بدل الملف الحالي.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* =================================================
                  FOOTER
              ================================================= */}

              <div className="flex gap-3 px-5 py-4 border-t  border-slate-800 bg-slate-950/30 shrink-0">
                <button
                  type="button"
                  onClick={() =>
                    setOpenUpdateDocument(false)
                  }
                  disabled={loadding}
                  className="flex-1 px-4 py-3 text-sm font-semibold transition border  rounded-xl border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  إلغاء
                </button>

                <button
                  type="submit"
                  disabled={loadding}
                  className="flex items-center justify-center flex-1 gap-2 px-4 py-3 text-sm font-semibold text-white transition  rounded-xl bg-cyan-500 hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loadding ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      جاري حفظ التعديلات...
                    </>
                  ) : (
                    <>
                      <FaSave />
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

export default UpdateFile;