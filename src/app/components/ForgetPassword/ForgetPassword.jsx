
"use client";

import React, { useContext } from "react";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaEnvelope, FaArrowRight, FaSpinner } from "react-icons/fa";
import { authContext } from "../../../Providers/AuthProvider/Auth.js";

const ForgetPassword = () => {
  const { handleForgetPasswordFun, loadding } = useContext(authContext);

  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("البريد الإلكتروني غير صحيح")
      .required("البريد الإلكتروني مطلوب"),
  });

 
  return (
    <div

      className="flex items-center justify-center min-h-screen px-4 py-10 bg-slate-50"
    >
      <div className="w-full max-w-md">
        <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-3xl sm:p-8">
          {/* Header */}
          <div className="text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto text-blue-600 bg-blue-50 rounded-2xl">
              <FaEnvelope className="text-2xl" />
            </div>

            <h1 className="mt-5 text-2xl font-bold text-gray-800">
              نسيت كلمة المرور؟
            </h1>

            <p className="mt-2 text-sm leading-6 text-gray-400">
              أدخل البريد الإلكتروني المرتبط بحسابك، وسنرسل لك رابطًا
              لإعادة تعيين كلمة المرور.
            </p>
          </div>

          {/* Form */}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleForgetPasswordFun}
          >
            {({ errors, touched }) => (
              <Form className="mt-8 space-y-5">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-semibold text-gray-700"
                  >
                    البريد الإلكتروني
                  </label>

                  <div className="relative">
                    <FaEnvelope className="absolute text-sm text-gray-400 -translate-y-1/2 right-4 top-1/2" />

                    <Field
                      id="email"
                      name="email"
                      type="email"
                      placeholder="example@email.com"
                      className={`w-full py-3 pr-11 pl-4 text-sm text-gray-700 bg-gray-50 border rounded-xl outline-none transition-all placeholder:text-gray-400 ${
                        errors.email && touched.email
                          ? "border-red-300 focus:ring-2 focus:ring-red-100"
                          : "border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                      }`}
                    />
                  </div>

                  <ErrorMessage
                    name="email"
                    component="p"
                    className="mt-1.5 text-xs font-medium text-red-500"
                  />
                </div>

                <button
                  type="submit"
                  className="flex items-center justify-center w-full gap-2 py-3.5 text-sm font-bold text-white transition-all bg-blue-600 rounded-xl hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.99]"
                >
                  {loadding ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      جاري الإرسال...
                    </>
                  ) : (
                    <>
                      إرسال رابط إعادة التعيين
                      <FaArrowRight className="text-xs" />
                    </>
                  )}
                </button>
              </Form>
            )}
          </Formik>

          {/* Back to Login */}
          <div className="mt-6 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700"
            >
              <FaArrowRight className="text-xs" />
              العودة إلى تسجيل الدخول
            </Link>
          </div>
        </div>

        <p className="mt-5 text-xs text-center text-gray-400">
          سيتم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني.
        </p>
      </div>
    </div>
  );
};

export default ForgetPassword;
