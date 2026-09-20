"use client";

import React, {
  useContext,
  useEffect,
  useState,
} from "react";

import {
  X,
  User,
  Phone,
  Mail,
  CreditCard,
  MapPin,
  Globe,
  Save,
  FileText,
  ExternalLink,
  Trash2,
  Plus,
} from "lucide-react";

import { OwnerContext } from "../../../../../Providers/LawyerOwner/OwnerProvider.js";

const Update = ({ selectedClient }) => {
  const {
    handleUpdateClientFun,
    handleDeleteClientDocumentFun,
    openUpdateClient,
    setOpenUpdateClient,
    loadding
  } = useContext(OwnerContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    nationalId: "",
    address: "",
    city: "",
    country: "",
    notes: "",
    isActive: true,
    profileImage: null,
    documents: [],
  });

  const [documentPreviews, setDocumentPreviews] =
    useState([]);

  useEffect(() => {
    if (!selectedClient) return;

    setFormData({
      name: selectedClient?.name || "",
      email: selectedClient?.email || "",
      phone: selectedClient?.phone || "",
      nationalId:
        selectedClient?.nationalId || "",
      address: selectedClient?.address || "",
      city: selectedClient?.city || "",
      country: selectedClient?.country || "",
      notes: selectedClient?.notes || "",
      isActive:
        selectedClient?.isActive ?? true,
      profileImage: null,
      documents: [],
    });

    setDocumentPreviews([]);
  }, [selectedClient]);

  if (!openUpdateClient || !selectedClient) {
    return null;
  }

  const existingDocuments = Array.isArray(
    selectedClient?.documents,
  )
    ? selectedClient.documents
    : [];

  // ==============================
  // Handle Inputs
  // ==============================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==============================
  // Profile Image
  // ==============================

  const handleProfileImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      profileImage: file,
    }));

    e.target.value = "";
  };

  // ==============================
  // Add New Documents
  // ==============================

  const handleDocumentsChange = (e) => {
    const files = Array.from(
      e.target.files || [],
    );

    if (!files.length) return;

    const newDocuments = files.map((file) => ({
      name: "",
      file,
    }));

    setFormData((prev) => ({
      ...prev,
      documents: [
        ...(Array.isArray(prev.documents)
          ? prev.documents
          : []),
        ...newDocuments,
      ],
    }));

    const newPreviews = files.map((file) => ({
      id: `${file.name}-${file.lastModified}-${Math.random()}`,
      name: file.name,
      file,
      preview: file.type.startsWith("image/")
        ? URL.createObjectURL(file)
        : null,
    }));

    setDocumentPreviews((prev) => [
      ...prev,
      ...newPreviews,
    ]);

    e.target.value = "";
  };

  // ==============================
  // Change New Document Name
  // ==============================

  const handleDocumentNameChange = (
    index,
    value,
  ) => {
    setFormData((prev) => ({
      ...prev,
      documents: prev.documents.map(
        (document, documentIndex) =>
          documentIndex === index
            ? {
                ...document,
                name: value,
              }
            : document,
      ),
    }));
  };

  // ==============================
  // Remove New Document
  // ==============================

  const handleRemoveNewDocument = (index) => {
    const documentPreview =
      documentPreviews[index];

    if (documentPreview?.preview) {
      URL.revokeObjectURL(
        documentPreview.preview,
      );
    }

    setFormData((prev) => ({
      ...prev,
      documents: prev.documents.filter(
        (_, documentIndex) =>
          documentIndex !== index,
      ),
    }));

    setDocumentPreviews((prev) =>
      prev.filter(
        (_, documentIndex) =>
          documentIndex !== index,
      ),
    );
  };

  // ==============================
  // Delete Existing Document
  // ==============================

  const handleDeleteExistingDocument =
    async (documentId) => {
      await handleDeleteClientDocumentFun({
        clientId: selectedClient?._id,
        documentId,
      });
    };

  // ==============================
  // Submit
  // ==============================

  const handleSubmit = async (e) => {
    e.preventDefault();

    await handleUpdateClientFun({
      id: selectedClient?._id,
      values: formData,
    });
  };

  return (
    <div
      dir="rtl"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4"
      onClick={() =>
        setOpenUpdateClient(false)
      }
    >
      <div
        className="w-full max-w-2xl overflow-hidden rounded-xl border border-[#e7ebf2] bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ================= Header ================= */}

        <div className="flex items-center justify-between border-b border-[#edf0f5] px-5 py-4">
          <div>
            <h2 className="text-[13px] font-bold text-[#172033]">
              تعديل بيانات العميل
            </h2>

            <p className="mt-1 text-[8px] text-[#99a2b1]">
              تعديل بيانات العميل الأساسية
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              setOpenUpdateClient(false)
            }
            className="flex h-7 w-7 items-center justify-center rounded-md border border-[#e8ebf0] text-[#768195] transition hover:bg-[#f5f7fa] hover:text-[#111827]"
          >
            <X size={14} />
          </button>
        </div>

        {/* ================= Form ================= */}

        <form onSubmit={handleSubmit}>
          <div className="max-h-[70vh] overflow-y-auto p-5">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {/* Name */}

<div className="sm:col-span-2">
  <label className="mb-1.5 block text-[8px] font-semibold text-[#667085]">
    صورة العميل
  </label>

  <div className="flex items-center gap-3 rounded-lg border border-[#e7ebf2] bg-[#fafbfc] p-3">
    {/* Current / New Image */}

    <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#e7ebf2] bg-[#111827]">
      {formData.profileImage ? (
        <img
          src={URL.createObjectURL(
            formData.profileImage,
          )}
          alt="صورة العميل"
          className="object-cover w-full h-full"
        />
      ) : selectedClient?.profileImage?.url ? (
        <img
          src={selectedClient.profileImage.url}
          alt={
            selectedClient?.name ||
            "صورة العميل"
          }
          className="object-cover w-full h-full"
        />
      ) : (
        <span className="text-[14px] font-bold text-white">
          {selectedClient?.name?.charAt(0) ||
            "ع"}
        </span>
      )}
    </div>

    <div className="flex-1 min-w-0">
      <p className="text-[8px] font-semibold text-[#111827]">
        {formData.profileImage
          ? "الصورة الجديدة"
          : "الصورة الحالية"}
      </p>

      <p className="mt-1 text-[7px] text-[#99a2b1]">
        يمكنك اختيار صورة جديدة لتغيير الصورة الحالية
      </p>

      <label className="mt-2 inline-flex h-7 cursor-pointer items-center gap-1.5 rounded-md border border-[#e7ebf2] bg-white px-2.5 text-[7px] font-semibold text-[#62718a] transition hover:border-[#315DAA] hover:bg-[#edf3ff] hover:text-[#315DAA]">
        <Plus size={10} />

        تغيير الصورة

        <input
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          onChange={handleProfileImageChange}
          className="hidden"
        />
      </label>
    </div>
  </div>
</div>
              <div>
                <label className="mb-1.5 block text-[8px] font-semibold text-[#667085]">
                  اسم العميل
                </label>

                <div className="relative">
                  <User
                    size={13}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#98a2b3]"
                  />

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="اسم العميل"
                    className="h-9 w-full rounded-lg border border-[#e7ebf2] bg-white pr-9 pl-3 text-[9px] text-[#344054] outline-none transition placeholder:text-[#b0b7c3] focus:border-[#111827]"
                  />
                </div>
              </div>
{/* ================= Profile Image ================= */}

              {/* Email */}

              <div>
                <label className="mb-1.5 block text-[8px] font-semibold text-[#667085]">
                  البريد الإلكتروني
                </label>

                <div className="relative">
                  <Mail
                    size={13}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#98a2b3]"
                  />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="البريد الإلكتروني"
                    className="h-9 w-full rounded-lg border border-[#e7ebf2] bg-white pr-9 pl-3 text-[9px] text-[#344054] outline-none transition placeholder:text-[#b0b7c3] focus:border-[#111827]"
                  />
                </div>
              </div>

              {/* Phone */}

              <div>
                <label className="mb-1.5 block text-[8px] font-semibold text-[#667085]">
                  رقم الهاتف
                </label>

                <div className="relative">
                  <Phone
                    size={13}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#98a2b3]"
                  />

                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="رقم الهاتف"
                    className="h-9 w-full rounded-lg border border-[#e7ebf2] bg-white pr-9 pl-3 text-[9px] text-[#344054] outline-none transition placeholder:text-[#b0b7c3] focus:border-[#111827]"
                  />
                </div>
              </div>

              {/* National ID */}

              <div>
                <label className="mb-1.5 block text-[8px] font-semibold text-[#667085]">
                  الرقم القومي
                </label>

                <div className="relative">
                  <CreditCard
                    size={13}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#98a2b3]"
                  />

                  <input
                    type="text"
                    name="nationalId"
                    value={formData.nationalId}
                    onChange={handleChange}
                    placeholder="الرقم القومي"
                    className="h-9 w-full rounded-lg border border-[#e7ebf2] bg-white pr-9 pl-3 text-[9px] text-[#344054] outline-none transition placeholder:text-[#b0b7c3] focus:border-[#111827]"
                  />
                </div>
              </div>

              {/* City */}

              <div>
                <label className="mb-1.5 block text-[8px] font-semibold text-[#667085]">
                  المدينة
                </label>

                <div className="relative">
                  <MapPin
                    size={13}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#98a2b3]"
                  />

                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="المدينة"
                    className="h-9 w-full rounded-lg border border-[#e7ebf2] bg-white pr-9 pl-3 text-[9px] text-[#344054] outline-none transition placeholder:text-[#b0b7c3] focus:border-[#111827]"
                  />
                </div>
              </div>

              {/* Country */}

              <div>
                <label className="mb-1.5 block text-[8px] font-semibold text-[#667085]">
                  الدولة
                </label>

                <div className="relative">
                  <Globe
                    size={13}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#98a2b3]"
                  />

                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="الدولة"
                    className="h-9 w-full rounded-lg border border-[#e7ebf2] bg-white pr-9 pl-3 text-[9px] text-[#344054] outline-none transition placeholder:text-[#b0b7c3] focus:border-[#111827]"
                  />
                </div>
              </div>

              {/* Address */}

              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-[8px] font-semibold text-[#667085]">
                  العنوان
                </label>

                <div className="relative">
                  <MapPin
                    size={13}
                    className="absolute right-3 top-3 text-[#98a2b3]"
                  />

                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="العنوان"
                    rows={3}
                    className="w-full resize-none rounded-lg border border-[#e7ebf2] bg-white py-2.5 pr-9 pl-3 text-[9px] text-[#344054] outline-none transition placeholder:text-[#b0b7c3] focus:border-[#111827]"
                  />
                </div>
              </div>

              {/* Notes */}

              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-[8px] font-semibold text-[#667085]">
                  ملاحظات
                </label>

                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="ملاحظات"
                  rows={3}
                  className="w-full resize-none rounded-lg border border-[#e7ebf2] bg-white px-3 py-2.5 text-[9px] text-[#344054] outline-none transition placeholder:text-[#b0b7c3] focus:border-[#111827]"
                />
              </div>

              {/* Status */}

              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-[8px] font-semibold text-[#667085]">
                  حالة العميل
                </label>

                <select
                  name="isActive"
                  value={
                    formData.isActive
                      ? "true"
                      : "false"
                  }
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      isActive:
                        e.target.value ===
                        "true",
                    }))
                  }
                  className="h-9 w-full rounded-lg border border-[#e7ebf2] bg-white px-3 text-[9px] text-[#344054] outline-none transition focus:border-[#111827]"
                >
                  <option value="true">
                    نشط
                  </option>

                  <option value="false">
                    غير نشط
                  </option>
                </select>
              </div>

              {/* ================= Existing Documents ================= */}

              <div className="sm:col-span-2">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <label className="block text-[8px] font-semibold text-[#667085]">
                      المستندات الحالية
                    </label>

                    <p className="mt-1 text-[7px] text-[#99a2b1]">
                      يمكنك فتح أو حذف المستندات الحالية
                    </p>
                  </div>

                  <span className="rounded-full bg-[#edf3ff] px-2 py-1 text-[7px] text-[#315DAA]">
                    {existingDocuments.length}{" "}
                    مستند
                  </span>
                </div>

                {existingDocuments.length >
                0 ? (
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {existingDocuments.map(
                      (document) => {
                        const isImage =
                          document?.fileType ===
                            "image" ||
                          /\.(jpg|jpeg|png|webp)$/i.test(
                            document?.url || "",
                          );

                        return (
                          <div
                            key={
                              document?._id
                            }
                            className="flex items-center gap-2 rounded-lg border border-[#e7ebf2] bg-white p-2.5"
                          >
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-md border border-[#e7ebf2] bg-[#fafbfc]">
                              {isImage &&
                              document?.url ? (
                                <img
                                  src={
                                    document.url
                                  }
                                  alt={
                                    document?.name ||
                                    "مستند"
                                  }
                                  className="object-cover w-full h-full"
                                />
                              ) : (
                                <FileText
                                  size={16}
                                  className="text-[#315DAA]"
                                />
                              )}
                            </div>

                            <div className="flex-1 min-w-0">
                              <p className="truncate text-[8px] font-semibold text-[#111827]">
                                {document?.name ||
                                  "مستند"}
                              </p>

                              <p className="mt-1 text-[7px] text-[#99a2b1]">
                                {document?.fileType ===
                                "pdf"
                                  ? "PDF"
                                  : isImage
                                  ? "صورة"
                                  : "ملف"}
                              </p>
                            </div>

                            <div className="flex items-center gap-1 shrink-0">
                              {document?.url && (
                                <a
                                  href={
                                    document.url
                                  }
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex h-7 w-7 items-center justify-center rounded-md border border-[#e7ebf2] text-[#62718a] transition hover:border-[#315DAA] hover:bg-[#edf3ff] hover:text-[#315DAA]"
                                  title="فتح المستند"
                                >
                                  <ExternalLink
                                    size={11}
                                  />
                                </a>
                              )}

                              <button
                                type="button"
                                onClick={() =>
                                  handleDeleteExistingDocument(
                                    document?._id,
                                  )
                                }
                                className="flex h-7 w-7 items-center justify-center rounded-md border border-[#f0dede] text-[#d84b4b] transition hover:bg-[#fff0f0]"
                                title="حذف المستند"
                              >
                                <Trash2
                                  size={11}
                                />
                              </button>
                            </div>
                          </div>
                        );
                      },
                    )}
                  </div>
                ) : (
                  <div className="rounded-lg border border-dashed border-[#dfe4eb] bg-[#fafbfc] py-5 text-center text-[8px] text-[#99a2b1]">
                    لا توجد مستندات
                  </div>
                )}
              </div>

              {/* ================= Add Documents ================= */}

              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-[8px] font-semibold text-[#667085]">
                  إضافة مستندات جديدة
                </label>

                <label className="flex min-h-[70px] cursor-pointer items-center justify-center rounded-lg border border-dashed border-[#d8dee8] bg-[#fafbfc] transition hover:border-[#315DAA] hover:bg-[#f7f9fc]">
                  <div className="flex flex-col items-center gap-1">
                    <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#edf3ff] text-[#315DAA]">
                      <Plus size={13} />
                    </div>

                    <span className="text-[8px] font-semibold text-[#667085]">
                      اختر المستندات
                    </span>

                    <span className="text-[7px] text-[#99a2b1]">
                      صور أو PDF
                    </span>
                  </div>

                  <input
                    type="file"
                    multiple
                    accept="image/jpeg,image/jpg,image/png,image/webp,application/pdf"
                    onChange={
                      handleDocumentsChange
                    }
                    className="hidden"
                  />
                </label>
              </div>

              {/* ================= New Documents ================= */}

              {formData.documents.length >
                0 && (
                <div className="sm:col-span-2">
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-[8px] font-semibold text-[#667085]">
                      المستندات الجديدة
                    </label>

                    <span className="text-[7px] text-[#99a2b1]">
                      {
                        formData.documents
                          .length
                      }{" "}
                      مستند
                    </span>
                  </div>

                  <div className="space-y-2">
                    {formData.documents.map(
                      (document, index) => {
                        const preview =
                          documentPreviews[
                            index
                          ];

                        const isImage =
                          document?.file?.type?.startsWith(
                            "image/",
                          );

                        return (
                          <div
                            key={`${document.file?.name}-${index}`}
                            className="rounded-lg border border-[#e7ebf2] bg-white p-2.5"
                          >
                            <div className="flex items-center gap-2">
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-md border border-[#e7ebf2] bg-[#fafbfc]">
                                {isImage &&
                                preview?.preview ? (
                                  <img
                                    src={
                                      preview.preview
                                    }
                                    alt={
                                      document.name ||
                                      document
                                        .file
                                        ?.name ||
                                      "مستند"
                                    }
                                    className="object-cover w-full h-full"
                                  />
                                ) : (
                                  <FileText
                                    size={16}
                                    className="text-[#315DAA]"
                                  />
                                )}
                              </div>

                              <div className="flex-1 min-w-0">
                                <p className="truncate text-[8px] font-semibold text-[#111827]">
                                  {document
                                    ?.file
                                    ?.name ||
                                    "مستند جديد"}
                                </p>

                                <p className="mt-1 text-[7px] text-[#99a2b1]">
                                  مستند جديد
                                </p>
                              </div>

                              <button
                                type="button"
                                onClick={() =>
                                  handleRemoveNewDocument(
                                    index,
                                  )
                                }
                                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-[#f0dede] text-[#d84b4b] transition hover:bg-[#fff0f0]"
                                title="إزالة المستند"
                              >
                                <Trash2
                                  size={11}
                                />
                              </button>
                            </div>

                            {/* Document Name */}

                            <div className="mt-2">
                              <label className="mb-1 block text-[7px] font-semibold text-[#667085]">
                                اسم المستند
                              </label>

                              <input
                                type="text"
                                value={
                                  document.name
                                }
                                onChange={(e) =>
                                  handleDocumentNameChange(
                                    index,
                                    e.target
                                      .value,
                                  )
                                }
                                placeholder="مثال: صورة البطاقة"
                                className="h-8 w-full rounded-lg border border-[#e7ebf2] bg-white px-3 text-[8px] text-[#344054] outline-none transition placeholder:text-[#b0b7c3] focus:border-[#111827]"
                              />
                            </div>
                          </div>
                        );
                      },
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ================= Footer ================= */}

          <div className="flex items-center justify-end gap-2 border-t border-[#edf0f5] px-5 py-3">
            <button
              type="button"
              onClick={() =>
                setOpenUpdateClient(false)
              }
              className="h-8 rounded-lg border border-[#e8ebf0] px-4 text-[8px] font-semibold text-[#667085] transition hover:bg-[#f5f7fa]"
            >
              إلغاء
            </button>

            <button
              type="submit"
              className="flex h-8 items-center gap-1.5 rounded-lg bg-[#111827] px-4 text-[8px] font-semibold text-white transition hover:bg-[#1f2937]"
            >
              <Save size={12} />
              {loadding ?"جارى الحفظ..." : "حفظ التعديلات"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Update;