"use client";

import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { authContext } from "../../../Providers/AuthProvider/Auth.js";
import Link from "next/link.js";

const Login = () => {
  const { loadding, handleLoginFun } = useContext(authContext);
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("من فضلك أدخل بريد إلكتروني صحيح")
      .required("البريد الإلكتروني مطلوب"),

    password: Yup.string()
      .min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل")
      .required("كلمة المرور مطلوبة"),
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50">
      <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-2xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-800">تسجيل الدخول</h1>

          <p className="mt-2 text-sm text-gray-500">
            قم بتسجيل الدخول إلى حسابك
          </p>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleLoginFun}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-5">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  البريد الإلكتروني
                </label>

                <Field
                  id="email"
                  name="email"
                  type="email"
                  placeholder="example@email.com"
                  className="w-full px-4 py-3 text-sm transition border border-gray-200 outline-none rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

                <ErrorMessage
                  name="email"
                  component="div"
                  className="mt-1 text-xs text-red-500"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  كلمة المرور
                </label>

                <Field
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 text-sm transition border border-gray-200 outline-none rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

                <ErrorMessage
                  name="password"
                  component="div"
                  className="mt-1 text-xs text-red-500"
                />
              </div>

              {/* Remember / Forgot */}
              <div className="flex items-center justify-between text-sm">
                <Link
                  href="/ForgetPassword"
                  className="text-blue-500 transition hover:text-blue-600"
                >
                  نسيت كلمة المرور؟
                </Link>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-3 font-medium text-white transition bg-blue-500 rounded-xl hover:bg-blue-600 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loadding ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
