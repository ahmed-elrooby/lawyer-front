
"use client";

import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  FaTimes,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaCamera,
  FaSave,
  FaSpinner,
} from "react-icons/fa";

import { authContext } from "../../../../Providers/AuthProvider/Auth.js";

const UpdateProfile = ({ selectProfile }) => {
  const {
    openUpdateProfile,
    setOpenUpdateProfile,
    handleUpdateProfileFun,
    loadding,
  } = useContext(authContext);

  const [preview, setPreview] = useState(
    selectProfile?.profileImage?.url || ""
  );

  useEffect(() => {
    setPreview(selectProfile?.profileImage?.url || "");
  }, [selectProfile]);

  const initialValues = {
    name: selectProfile?.name || "",
    phone: selectProfile?.phone || "",
    profileImage: null,
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .trim()
      .required("الاسم مطلوب")
      .min(3, "الاسم يجب أن يكون 3 أحرف على الأقل")
      .max(100, "الاسم يجب ألا يتجاوز 100 حرف"),

    phone: Yup.string()
      .required("رقم الهاتف مطلوب")
      .matches(
        /^01[0125][0-9]{8}$/,
        "رقم الهاتف المصري غير صحيح"
      ),

    profileImage: Yup.mixed()
      .nullable()
      .test(
        "fileType",
        "يسمح فقط بصور JPG أو JPEG أو PNG أو WEBP",
        (value) => {
          if (!value) return true;

          return [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/webp",
          ].includes(value.type);
        }
      )
      .test(
        "fileSize",
        "حجم الصورة يجب ألا يتجاوز 5MB",
        (value) => {
          if (!value) return true;

          return value.size <= 5 * 1024 * 1024;
        }
      ),
  });

  if (!openUpdateProfile) return null;


return (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
  >
    <div className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">

      {/* Header - ثابت */}
      <div className="flex items-center justify-between px-6 py-5 bg-white border-b shrink-0 border-slate-100">
        <div>
          <h2 className="text-xl font-bold text-slate-800">
            تعديل الملف الشخصي
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            قم بتعديل بياناتك الشخصية
          </p>
        </div>

        <button
          type="button"
          onClick={() => setOpenUpdateProfile(false)}
          className="flex items-center justify-center transition rounded-full h-9 w-9 bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700"
        >
          <FaTimes />
        </button>
      </div>

      {/* Content - Scroll */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={handleUpdateProfileFun}
        >
          {({ setFieldValue, isSubmitting }) => (
            <Form className="p-6">

              {/* Profile Image */}
              <div className="flex flex-col items-center mb-7">
                <div className="relative">
                  <div className="flex items-center justify-center overflow-hidden border-4 border-white rounded-full shadow-lg h-28 w-28 bg-slate-100">
                    {preview ? (
                      <img
                        src={preview}
                        alt={selectProfile?.name || "Profile"}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <FaUser className="text-4xl text-slate-400" />
                    )}
                  </div>

                  <label
                    htmlFor="profileImage"
                    className="absolute bottom-0 left-0 flex items-center justify-center text-white transition bg-blue-600 border-4 border-white rounded-full shadow-md cursor-pointer h-9 w-9 hover:bg-blue-700"
                  >
                    <FaCamera className="text-sm" />
                  </label>

                  <input
                    id="profileImage"
                    name="profileImage"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(event) => {
                      const file = event.currentTarget.files?.[0];

                      if (!file) return;

                      setFieldValue("profileImage", file);
                      setPreview(URL.createObjectURL(file));
                    }}
                  />
                </div>

                <p className="mt-3 text-xs text-slate-400">
                  JPG, PNG أو WEBP — بحد أقصى 5MB
                </p>

                <ErrorMessage
                  name="profileImage"
                  component="p"
                  className="mt-1 text-xs text-red-500"
                />
              </div>

              <div className="space-y-5">

                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-semibold text-slate-700"
                  >
                    الاسم
                  </label>

                  <div className="relative">
                    <div className="absolute -translate-y-1/2 pointer-events-none right-3 top-1/2 text-slate-400">
                      <FaUser />
                    </div>

                    <Field
                      id="name"
                      name="name"
                      type="text"
                      placeholder="أدخل الاسم"
                      className="w-full py-3 pl-4 pr-10 text-sm transition border outline-none rounded-xl border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <ErrorMessage
                    name="name"
                    component="p"
                    className="mt-1.5 text-xs text-red-500"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-semibold text-slate-700"
                  >
                    رقم الهاتف
                  </label>

                  <div className="relative">
                    <div className="absolute -translate-y-1/2 pointer-events-none right-3 top-1/2 text-slate-400">
                      <FaPhone />
                    </div>

                    <Field
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="أدخل رقم الهاتف"
                      className="w-full py-3 pl-4 pr-10 text-sm transition border outline-none rounded-xl border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <ErrorMessage
                    name="phone"
                    component="p"
                    className="mt-1.5 text-xs text-red-500"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-semibold text-slate-700"
                  >
                    البريد الإلكتروني
                  </label>

                  <div className="relative">
                    <div className="absolute -translate-y-1/2 pointer-events-none right-3 top-1/2 text-slate-400">
                      <FaEnvelope />
                    </div>

                    <input
                      id="email"
                      type="email"
                      value={selectProfile?.email || ""}
                      disabled
                      className="w-full py-3 pl-4 pr-10 text-sm border outline-none cursor-not-allowed rounded-xl border-slate-200 bg-slate-100 text-slate-500"
                    />
                  </div>

                  <p className="mt-1.5 text-xs text-slate-400">
                    لا يمكن تعديل البريد الإلكتروني من هنا
                  </p>
                </div>

              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-5 border-t mt-7 border-slate-100">
                <button
                  type="button"
                  onClick={() => setOpenUpdateProfile(false)}
                  disabled={loadding || isSubmitting}
                  className="flex-1 px-4 py-3 text-sm font-semibold transition bg-white border rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  إلغاء
                </button>

                <button
                  type="submit"
                  disabled={loadding || isSubmitting}
                  className="flex items-center justify-center flex-1 gap-2 px-4 py-3 text-sm font-semibold text-white transition bg-blue-600 rounded-xl hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loadding || isSubmitting ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      جاري الحفظ...
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
  </div>
);




};

export default UpdateProfile;
