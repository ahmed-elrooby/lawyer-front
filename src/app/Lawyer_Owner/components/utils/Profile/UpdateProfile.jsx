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
import { authContext } from "../../../../../Providers/AuthProvider/Auth.js";

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

  

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B1C30]/35 backdrop-blur-sm">
      <div
        className="w-full max-w-lg max-h-[90vh] overflow-hidden border shadow-2xl bg-white border-[#E6E8EC] rounded-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E8EAF0] bg-white">
          <div>
            <h2 className="text-lg font-bold text-[#0B1C30]">
              تعديل الملف الشخصي
            </h2>

            <p className="mt-1 text-xs text-[#8A9099]">
              قم بتعديل بيانات حسابك الشخصية
            </p>
          </div>

          <button
            type="button"
            onClick={() => setOpenUpdateProfile(false)}
            className="flex items-center justify-center transition rounded-lg w-9 h-9 text-[#59616D] bg-[#F3F5F8] hover:bg-[#E8EBF0] hover:text-[#0B1C30]"
          >
            <FaTimes />
          </button>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={handleUpdateProfileFun}
        >
          {({ setFieldValue }) => (
            <Form className="flex flex-col max-h-[calc(90vh-81px)]">
              {/* Scrollable Content */}
              <div className="flex-1 p-6 space-y-5 overflow-y-auto bg-[#FAFBFC]">
                {/* Profile Image */}
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <div className="flex items-center justify-center w-24 h-24 overflow-hidden border-4 border-white rounded-2xl bg-[#EAF0FF] shadow-sm">
                      {preview ? (
                        <img
                          src={preview}
                          alt={user?.name || "Profile"}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <FaUser className="text-3xl text-[#4868B4]" />
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => fileRef.current?.click()}
                      className="absolute bottom-0 left-0 flex items-center justify-center w-8 h-8 text-white transition rounded-full shadow-lg bg-[#4868B4] hover:bg-[#3B599C]"
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

                  <p className="mt-2 text-xs text-[#8A9099]">
                    اضغط على الكاميرا لتغيير الصورة
                  </p>
                </div>

                {/* Name */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-[#45464D]">
                    الاسم
                  </label>

                  <div className="relative">
                    <FaUser className="absolute -translate-y-1/2 right-3 top-1/2 text-[#8A9099]" />

                    <Field
                      name="name"
                      type="text"
                      placeholder="أدخل الاسم"
                      className="w-full py-3 pl-4 pr-10 text-sm text-[#0B1C30] transition bg-white border border-[#E1E5EB] outline-none rounded-xl placeholder:text-[#A0A6AE] focus:border-[#4868B4] focus:ring-2 focus:ring-[#4868B4]/10"
                    />
                  </div>

                  <ErrorMessage
                    name="name"
                    component="p"
                    className="mt-1 text-xs text-red-500"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-[#45464D]">
                    رقم الهاتف
                  </label>

                  <div className="relative">
                    <FaPhone className="absolute -translate-y-1/2 right-3 top-1/2 text-[#8A9099]" />

                    <Field
                      name="phone"
                      type="text"
                      placeholder="أدخل رقم الهاتف"
                      className="w-full py-3 pl-4 pr-10 text-sm text-[#0B1C30] transition bg-white border border-[#E1E5EB] outline-none rounded-xl placeholder:text-[#A0A6AE] focus:border-[#4868B4] focus:ring-2 focus:ring-[#4868B4]/10"
                    />
                  </div>

                  <ErrorMessage
                    name="phone"
                    component="p"
                    className="mt-1 text-xs text-red-500"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-[#45464D]">
                    البريد الإلكتروني
                  </label>

                  <input
                    type="email"
                    value={user?.email || ""}
                    disabled
                    className="w-full px-4 py-3 text-sm border outline-none cursor-not-allowed text-[#8A9099] bg-[#F3F5F8] border-[#E1E5EB] rounded-xl"
                  />

                  <p className="mt-1 text-xs text-[#9AA0A8]">
                    لا يمكن تعديل البريد الإلكتروني
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center gap-3 px-6 py-5 bg-white border-t border-[#E8EAF0]">
                <button
                  type="button"
                  onClick={() => setOpenUpdateProfile(false)}
                  disabled={loadding}
                  className="flex-1 px-4 py-3 text-sm font-semibold transition border rounded-xl text-[#59616D] bg-[#F3F5F8] border-[#E1E5EB] hover:bg-[#E8EBF0] disabled:opacity-50"
                >
                  إلغاء
                </button>

                <button
                  type="submit"
                  disabled={loadding}
                  className="flex items-center justify-center flex-1 gap-2 px-4 py-3 text-sm font-semibold text-white transition rounded-xl bg-[#4868B4] hover:bg-[#3B599C] disabled:opacity-50 disabled:cursor-not-allowed"
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