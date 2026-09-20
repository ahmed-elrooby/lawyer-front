"use client";

import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  X,
  User,
  Mail,
  Phone,
  Lock,
  ImagePlus,
  Loader2,
  UserPlus,
} from "lucide-react";

import { OwnerContext } from "../../../../../Providers/LawyerOwner/OwnerProvider.js";

const AddLawyer = () => {
  const {
    handleAddLawyerFun,
    openAddLawyer,
    setOpenAddLawyer,
    loadding,
  } = useContext(OwnerContext);

  const initialValues = {
    name: "",
    email: "",
    password: "",
    phone: "",
    profileImage: null,
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .trim()
      .required("اسم المحامي مطلوب")
      .min(3, "اسم المحامي يجب أن يكون 3 أحرف على الأقل"),

    email: Yup.string()
      .email("البريد الإلكتروني غير صحيح")
      .required("البريد الإلكتروني مطلوب"),

    password: Yup.string()
      .required("كلمة المرور مطلوبة")
      .min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),

    phone: Yup.string()
      .required("رقم الهاتف مطلوب")
      .matches(
        /^01[0125][0-9]{8}$/,
        "برجاء إدخال رقم هاتف مصري صحيح"
      ),

    profileImage: Yup.mixed()
      .nullable()
      .test(
        "fileType",
        "يرجى اختيار صورة صحيحة",
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

  if (!openAddLawyer) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg overflow-hidden bg-white shadow-2xl rounded-2xl">
        {/* Header */}

        <div className="flex items-center justify-between border-b border-[#EEF1F5] px-5 py-4">
          <div>
            <h2 className="text-[16px] font-bold text-[#111827]">
              إضافة محامي جديد
            </h2>

            <p className="mt-1 text-[11px] text-[#8993A5]">
              أضف بيانات المحامي إلى المكتب
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
             setOpenAddLawyer(false)
            }}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F5F7FA] text-[#687282] transition hover:bg-[#EEF1F5]"
          >
            <X size={17} />
          </button>
        </div>

        {/* Form */}

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleAddLawyerFun}
        >
          {({ setFieldValue, values }) => (
            <Form className="max-h-[75vh] overflow-y-auto p-5">
              <div className="space-y-4">
                 <div>
                  <label className="mb-2 block text-[11px] font-bold text-[#45464D]">
                    صورة المحامي
                  </label>

                  <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-[#DCE2EA] bg-[#FAFBFC] p-3 transition hover:border-[#3E67A5] hover:bg-[#F8FAFD]">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#EEF5FF]">
                      {values.profileImage ? (
                        <img
                          src={URL.createObjectURL(
                            values.profileImage
                          )}
                          alt="preview"
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <ImagePlus
                          size={18}
                          className="text-[#3E67A5]"
                        />
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="text-[11px] font-bold text-[#45464D]">
                        اختر صورة
                      </p>

                      <p className="mt-1 truncate text-[9px] text-[#8993A5]">
                        PNG, JPG, WEBP — بحد أقصى 5MB
                      </p>
                    </div>

                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/jpg,image/webp"
                      className="hidden"
                      onChange={(event) => {
                        const file = event.currentTarget.files?.[0];

                        setFieldValue(
                          "profileImage",
                          file || null
                        );
                      }}
                    />
                  </label>

                  <ErrorMessage
                    name="profileImage"
                    component="p"
                    className="mt-1.5 text-[10px] font-medium text-red-500"
                  />
                </div>
                {/* Name */}

                <div>
                  <label className="mb-2 block text-[11px] font-bold text-[#45464D]">
                    اسم المحامي
                  </label>

                  <div className="relative">
                    <User
                      size={16}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8993A5]"
                    />

                    <Field
                      name="name"
                      type="text"
                      placeholder="أدخل اسم المحامي"
                      className="h-11 w-full rounded-xl border border-[#E7EBF2] bg-[#FAFBFC] pr-10 pl-4 text-[12px] text-[#111827] outline-none transition placeholder:text-[#A7AFBC] focus:border-[#3E67A5] focus:bg-white"
                    />
                  </div>

                  <ErrorMessage
                    name="name"
                    component="p"
                    className="mt-1.5 text-[10px] font-medium text-red-500"
                  />
                </div>

                {/* Email */}

                <div>
                  <label className="mb-2 block text-[11px] font-bold text-[#45464D]">
                    البريد الإلكتروني
                  </label>

                  <div className="relative">
                    <Mail
                      size={16}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8993A5]"
                    />

                    <Field
                      name="email"
                      type="email"
                      dir="ltr"
                      placeholder="example@email.com"
                      className="h-11 w-full rounded-xl border border-[#E7EBF2] bg-[#FAFBFC] pr-10 pl-4 text-left text-[12px] text-[#111827] outline-none transition placeholder:text-[#A7AFBC] focus:border-[#3E67A5] focus:bg-white"
                    />
                  </div>

                  <ErrorMessage
                    name="email"
                    component="p"
                    className="mt-1.5 text-[10px] font-medium text-red-500"
                  />
                </div>

                {/* Phone */}

                <div>
                  <label className="mb-2 block text-[11px] font-bold text-[#45464D]">
                    رقم الهاتف
                  </label>

                  <div className="relative">
                    <Phone
                      size={16}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8993A5]"
                    />

                    <Field
                      name="phone"
                      type="tel"
                      dir="ltr"
                      placeholder="01xxxxxxxxx"
                      className="h-11 w-full rounded-xl border border-[#E7EBF2] bg-[#FAFBFC] pr-10 pl-4 text-left text-[12px] text-[#111827] outline-none transition placeholder:text-[#A7AFBC] focus:border-[#3E67A5] focus:bg-white"
                    />
                  </div>

                  <ErrorMessage
                    name="phone"
                    component="p"
                    className="mt-1.5 text-[10px] font-medium text-red-500"
                  />
                </div>

                {/* Password */}

                <div>
                  <label className="mb-2 block text-[11px] font-bold text-[#45464D]">
                    كلمة المرور
                  </label>

                  <div className="relative">
                    <Lock
                      size={16}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8993A5]"
                    />

                    <Field
                      name="password"
                      type="password"
                      placeholder="أدخل كلمة المرور"
                      className="h-11 w-full rounded-xl border border-[#E7EBF2] bg-[#FAFBFC] pr-10 pl-4 text-[12px] text-[#111827] outline-none transition placeholder:text-[#A7AFBC] focus:border-[#3E67A5] focus:bg-white"
                    />
                  </div>

                  <ErrorMessage
                    name="password"
                    component="p"
                    className="mt-1.5 text-[10px] font-medium text-red-500"
                  />
                </div>

                {/* Profile Image */}

               
              </div>

              {/* Buttons */}

              <div className="mt-6 flex items-center gap-3 border-t border-[#EEF1F5] pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setOpenAddLawyer(false)
                  }}
                  className="h-11 flex-1 rounded-xl border border-[#E7EBF2] bg-white text-[11px] font-bold text-[#687282] transition hover:bg-[#F8F9FB]"
                >
                  إلغاء
                </button>

                <button
                  type="submit"
                  disabled={loadding}
                  className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-[#111827] text-[11px] font-bold text-white transition hover:bg-[#1C2636] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loadding ? (
                    <>
                      <Loader2
                        size={15}
                        className="animate-spin"
                      />

                      جاري الإضافة...
                    </>
                  ) : (
                    <>
                      <UserPlus size={15} />
                      إضافة المحامي
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

export default AddLawyer;