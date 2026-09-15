
"use client";

import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  FaEdit,
  FaTimes,
  FaStickyNote,
} from "react-icons/fa";

import { LawyerContext } from "../../../../../Providers/LawyerContext/lawyer.js";

const UpdateNote = ({ selectNote }) => {
  const {
    handleUpdateNoteFun,
    openUpdateNote,
    setOpenUpdateNote,
  } = useContext(LawyerContext);

  if (!openUpdateNote || !selectNote) return null;

  const validationSchema = Yup.object({
    content: Yup.string()
      .trim()
      .min(1, "محتوى الملاحظة مطلوب")
      .max(5000, "الملاحظة يجب ألا تتجاوز 5000 حرف")
      .required("محتوى الملاحظة مطلوب"),
  });



  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={() => setOpenUpdateNote(false)}
    >
      <div
        className="w-full max-w-xl overflow-hidden border shadow-2xl rounded-2xl border-slate-700/50 bg-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-700/50">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-500/10">
              <FaEdit className="text-blue-400" />
            </div>

            <div>
              <h2 className="text-base font-semibold text-white">
                تعديل الملاحظة
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                تعديل محتوى الملاحظة
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOpenUpdateNote(false)}
            className="flex items-center justify-center transition rounded-lg h-9 w-9 text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <FaTimes />
          </button>
        </div>

        {/* Form */}
        <Formik
          initialValues={{
            content: selectNote?.content || "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values)=>{
            handleUpdateNoteFun({id:selectNote?._id,values})
          }}
          enableReinitialize
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="p-5">
                {/* Content */}
                <div>
                  <label
                    htmlFor="content"
                    className="block mb-2 text-sm font-medium text-slate-300"
                  >
                    محتوى الملاحظة
                  </label>

                  <div className="relative">
                    <div className="absolute pointer-events-none right-3 top-3">
                      <FaStickyNote className="text-slate-500" />
                    </div>

                    <Field
                      as="textarea"
                      id="content"
                      name="content"
                      rows={7}
                      placeholder="اكتب محتوى الملاحظة..."
                      className="w-full py-3 pl-4 pr-10 text-sm leading-6 text-white transition border outline-none resize-none rounded-xl border-slate-700 bg-slate-800/50 placeholder:text-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <ErrorMessage name="content">
                    {(message) => (
                      <p className="mt-1.5 text-xs text-red-400">
                        {message}
                      </p>
                    )}
                  </ErrorMessage>
                </div>

                {/* Info */}
                <div className="p-3 mt-4 border rounded-xl border-slate-700/50 bg-slate-800/30">
                  <p className="text-xs leading-5 text-slate-500">
                    سيتم تعديل محتوى الملاحظة فقط، ولن يتم تغيير القضية أو
                    العميل أو الجلسة المرتبطة بها.
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-3 px-5 py-4 border-t border-slate-700/50 bg-slate-950/30">
                <button
                  type="button"
                  onClick={() => setOpenUpdateNote(false)}
                  className="rounded-xl border border-slate-700 bg-slate-800 px-5 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-slate-700 hover:text-white"
                >
                  إلغاء
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <FaEdit className="text-xs" />

                  {isSubmitting ? "جاري الحفظ..." : "حفظ التعديل"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UpdateNote;
