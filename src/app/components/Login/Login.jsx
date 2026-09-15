"use client";

import React, { useContext, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { authContext } from "../../../Providers/AuthProvider/Auth.js";
import Link from "next/link.js";
import Image from "next/image";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import logo from "../../../Images/image.png";

const Login = () => {
  const { loadding, handleLoginFun } = useContext(authContext);

  const [showPassword, setShowPassword] = useState(false);

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
    <div
      dir="rtl"
      className="relative flex items-center justify-center w-full h-screen overflow-hidden bg-slate-950"
    >
      {/* Background Glow */}
      <div className="absolute w-64 h-64 rounded-full bg-blue-600/10 blur-3xl -top-20 -right-20" />

      <div className="absolute w-64 h-64 rounded-full bg-amber-500/5 blur-3xl -bottom-20 -left-20" />

      {/* Login Card */}
      <div className="relative w-full max-w-md px-4">
        <div className="p-6 border shadow-2xl bg-slate-900/95 border-slate-800 rounded-3xl shadow-black/30 sm:p-8">

          {/* Logo & Brand */}
          <div className="flex flex-col items-center mb-6">
            <div className="flex items-center justify-center w-16 h-16 p-1 mb-3 overflow-hidden border rounded-full bg-slate-800 border-slate-700">
              <Image
                src={logo}
                alt="قضاء Logo"
                width={64}
                height={64}
                priority
                className="object-cover w-full h-full rounded-full"
              />
            </div>

            <h1 className="text-2xl font-bold text-white">
              قضاء
            </h1>

            <p className="mt-1 text-xs text-slate-400">
              منصة إدارة المحامين
            </p>
          </div>

          {/* Header */}
          <div className="mb-5">
            <h2 className="text-lg font-bold text-white">
              تسجيل الدخول
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              قم بتسجيل الدخول للوصول إلى حسابك
            </p>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleLoginFun}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-1.5 text-sm font-medium text-slate-300"
                  >
                    البريد الإلكتروني
                  </label>

                  <Field
                    id="email"
                    name="email"
                    type="email"
                    placeholder="example@email.com"
                    className="w-full px-4 py-2.5 text-sm text-white transition border outline-none bg-slate-800/80 border-slate-700 rounded-xl placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                  />

                  <ErrorMessage
                    name="email"
                    component="div"
                    className="mt-1 text-xs text-red-400"
                  />
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-1.5 text-sm font-medium text-slate-300"
                  >
                    كلمة المرور
                  </label>

                  <div className="relative">
                    <Field
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="w-full px-4 py-2.5 pl-11 text-sm text-white transition border outline-none bg-slate-800/80 border-slate-700 rounded-xl placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((prev) => !prev)
                      }
                      className="absolute flex items-center justify-center transition -translate-y-1/2 left-3 top-1/2 text-slate-500 hover:text-slate-300"
                      aria-label={
                        showPassword
                          ? "إخفاء كلمة المرور"
                          : "إظهار كلمة المرور"
                      }
                    >
                      {showPassword ? (
                        <FaEyeSlash className="w-4 h-4" />
                      ) : (
                        <FaEye className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <ErrorMessage
                    name="password"
                    component="div"
                    className="mt-1 text-xs text-red-400"
                  />
                </div>

                {/* Forgot Password */}
                <div className="flex justify-start">
                  <Link
                    href="/ForgetPassword"
                    className="text-xs font-medium text-blue-400 transition hover:text-blue-300"
                  >
                    نسيت كلمة المرور؟
                  </Link>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loadding || isSubmitting}
                  className="w-full py-3 font-semibold text-white transition-all duration-300 bg-blue-600 shadow-lg rounded-xl hover:bg-blue-500 hover:shadow-blue-600/20 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loadding
                    ? "جاري تسجيل الدخول..."
                    : "تسجيل الدخول"}
                </button>
              </Form>
            )}
          </Formik>

          {/* Footer */}
          <div className="pt-4 mt-5 text-center border-t border-slate-800">
            <p className="text-[11px] text-slate-500">
              © {new Date().getFullYear()} قضاء
            </p>

            <p className="mt-1 text-[9px] text-slate-600">
              منصة إدارة المحامين
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;