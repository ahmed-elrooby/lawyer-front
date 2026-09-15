"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  FaTimes,
  FaSave,
  FaUser,
  FaPhone,
  FaCamera,
} from "react-icons/fa";

import { authContext } from "../../../../Providers/AuthProvider/Auth.js";

const UpdateProfile = () => {
  const {
    profile,
    setOpenUpdateProfile,
    openUpdateProfile,
    handleUpdateProfileFun,
    loadding,
  } = useContext(authContext);

  const fileRef = useRef(null);
  const [preview, setPreview] = useState(null);

  const user = profile?.user;

  useEffect(() => {
    if (openUpdateProfile && user?.profileImage?.url) {
      setPreview(user.profileImage.url);
    }

    if (!openUpdateProfile) {
      setPreview(null);
    }
  }, [openUpdateProfile, user?.profileImage?.url]);

  if (!openUpdateProfile) return null;

  const validationSchema = Yup.object({
    name: Yup.string()
      .trim()
      .min(3, "الاسم يجب أن يكون 3 أحرف على الأقل")
      .required("الاسم مطلوب"),

    phone: Yup.string()
      .matches(/^[0-9]{11}$/, "رقم الهاتف يجب أن يكون 11 رقم")
      .required("رقم الهاتف مطلوب"),
  });

  const initialValues = {
    name: user?.name || "",
    phone: user?.phone || "",
    profileImage: null,
  };

  const handleImageChange = (event, setFieldValue) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setFieldValue("profileImage", file);

    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
  };

  const handleSubmit = async (values) => {
    const success = await handleUpdateProfileFun(values);

    if (success !== false) {
      setOpenUpdateProfile(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div
        className="w-full max-w-lg overflow-hidden border shadow-2xl bg-slate-900 border-slate-700/50 rounded-2xl"
        dir="rtl"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-700/50">
          <div>
            <h2 className="text-lg font-bold text-white">
              تعديل الملف الشخصي
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              قم بتعديل بيانات حسابك الشخصية
            </p>
          </div>

          <button
            type="button"
            onClick={() => setOpenUpdateProfile(false)}
            className="flex items-center justify-center transition rounded-lg w-9 h-9 text-slate-400 bg-slate-800 hover:bg-slate-700 hover:text-white"
          >
            <FaTimes />
          </button>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form>
              <div className="p-6 space-y-5">
                {/* Profile Image */}
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <div className="flex items-center justify-center w-24 h-24 overflow-hidden border-4 rounded-2xl bg-slate-800 border-slate-700">
                      {preview ? (
                        <img
                          src={preview}
                          alt={user?.name || "Profile"}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <FaUser className="text-3xl text-slate-500" />
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => fileRef.current?.click()}
                      className="absolute bottom-0 left-0 flex items-center justify-center w-8 h-8 text-white transition bg-blue-600 rounded-full shadow-lg hover:bg-blue-500"
                    >
                      <FaCamera className="text-xs" />
                    </button>
                  </div>

                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(event) =>
                      handleImageChange(event, setFieldValue)
                    }
                  />

                  <p className="mt-2 text-xs text-slate-500">
                    اضغط على الكاميرا لتغيير الصورة
                  </p>
                </div>

                {/* Name */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-slate-300">
                    الاسم
                  </label>

                  <div className="relative">
                    <FaUser className="absolute -translate-y-1/2 right-3 top-1/2 text-slate-500" />

                    <Field
                      name="name"
                      type="text"
                      placeholder="أدخل الاسم"
                      className="w-full py-3 pl-4 pr-10 text-sm text-white transition border outline-none bg-slate-800 border-slate-700 rounded-xl focus:border-blue-500"
                    />
                  </div>

                  <ErrorMessage
                    name="name"
                    component="p"
                    className="mt-1 text-xs text-red-400"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-slate-300">
                    رقم الهاتف
                  </label>

                  <div className="relative">
                    <FaPhone className="absolute -translate-y-1/2 right-3 top-1/2 text-slate-500" />

                    <Field
                      name="phone"
                      type="text"
                      placeholder="أدخل رقم الهاتف"
                      className="w-full py-3 pl-4 pr-10 text-sm text-white transition border outline-none bg-slate-800 border-slate-700 rounded-xl focus:border-blue-500"
                    />
                  </div>

                  <ErrorMessage
                    name="phone"
                    component="p"
                    className="mt-1 text-xs text-red-400"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-slate-300">
                    البريد الإلكتروني
                  </label>

                  <input
                    type="email"
                    value={user?.email || ""}
                    disabled
                    className="w-full px-4 py-3 text-sm border outline-none cursor-not-allowed text-slate-500 bg-slate-800/50 border-slate-700 rounded-xl"
                  />

                  <p className="mt-1 text-xs text-slate-600">
                    لا يمكن تعديل البريد الإلكتروني
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center gap-3 px-6 py-5 border-t border-slate-700/50">
                <button
                  type="button"
                  onClick={() => setOpenUpdateProfile(false)}
                  disabled={loadding}
                  className="flex-1 px-4 py-3 text-sm font-semibold transition border rounded-xl text-slate-300 bg-slate-800 border-slate-700 hover:bg-slate-700 disabled:opacity-50"
                >
                  إلغاء
                </button>

                <button
                  type="submit"
                  disabled={loadding}
                  className="flex items-center justify-center flex-1 gap-2 px-4 py-3 text-sm font-semibold text-white transition bg-blue-600 rounded-xl hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaSave />

                  {loadding ? "جاري الحفظ..." : "حفظ التعديلات"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UpdateProfile;
