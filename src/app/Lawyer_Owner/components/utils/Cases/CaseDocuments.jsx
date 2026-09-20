
"use client";

import React from "react";
import {
  FaFileAlt,
  FaFilePdf,
  FaFileWord,
  FaTrash,
  FaPlus,
} from "react-icons/fa";

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const CaseDocuments = ({
  documents,
  setDocuments,
  setFieldValue,
}) => {
  const handleChange = (event) => {
    const files = Array.from(event.target.files || []);

    if (!files.length) return;

    const validFiles = files.filter((file) => {
      if (!ALLOWED_TYPES.includes(file.type)) {
        alert(`الملف ${file.name} غير مسموح به`);
        return false;
      }

      if (file.size > 10 * 1024 * 1024) {
        alert(`الملف ${file.name} أكبر من 10MB`);
        return false;
      }

      return true;
    });

    const newDocuments = validFiles.map((file) => ({
      file,
      name: file.name.replace(/\.[^/.]+$/, ""),
    }));

    const updated = [...documents, ...newDocuments];

    setDocuments(updated);
    setFieldValue("documents", updated);

    event.target.value = "";
  };

  const updateName = (index, name) => {
    const updated = documents.map((document, i) =>
      i === index
        ? { ...document, name }
        : document
    );

    setDocuments(updated);
    setFieldValue("documents", updated);
  };

  const remove = (index) => {
    const updated = documents.filter(
      (_, i) => i !== index
    );

    setDocuments(updated);
    setFieldValue("documents", updated);
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FaFileAlt className="text-sm text-blue-600" />

          <h3 className="text-sm font-bold text-slate-800">
            مستندات القضية
          </h3>
        </div>

        <label
          htmlFor="caseDocuments"
          className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-blue-600 transition rounded-lg cursor-pointer bg-blue-50 hover:bg-blue-100"
        >
          <FaPlus />
          إضافة مستند
        </label>

        <input
          id="caseDocuments"
          type="file"
          multiple
          hidden
          accept=".jpg,.jpeg,.png,.webp,.pdf,.doc,.docx"
          onChange={handleChange}
        />
      </div>

      {documents.length === 0 ? (
        <div className="flex items-center justify-center h-24 border border-dashed rounded-xl border-slate-200 bg-slate-50">
          <p className="text-xs text-slate-400">
            لا توجد مستندات مضافة
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {documents.map((document, index) => (
            <div
              key={`${document.file.name}-${index}`}
              className="flex items-center gap-3 p-3 border rounded-xl border-slate-200 bg-slate-50"
            >
              <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-white border rounded-lg border-slate-200">
                <DocumentIcon file={document.file} />
              </div>

              <div className="flex-1 min-w-0">
                <input
                  type="text"
                  value={document.name}
                  onChange={(e) =>
                    updateName(index, e.target.value)
                  }
                  placeholder="اسم المستند"
                  className="w-full px-3 text-sm bg-white border rounded-lg outline-none h-9 border-slate-200 focus:border-blue-500"
                />

                <p className="mt-1 text-[11px] truncate text-slate-400">
                  {document.file.name}
                </p>
              </div>

              <button
                type="button"
                onClick={() => remove(index)}
                className="flex items-center justify-center flex-shrink-0 text-red-400 transition rounded-lg w-9 h-9 hover:bg-red-50 hover:text-red-500"
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      )}

      <p className="mt-2 text-[11px] text-slate-400">
        الملفات المسموح بها: JPG, PNG, WEBP, PDF, DOC, DOCX
        — الحد الأقصى 10MB
      </p>
    </section>
  );
};

const DocumentIcon = ({ file }) => {
  if (file?.type === "application/pdf") {
    return <FaFilePdf className="text-red-500" />;
  }

  if (
    file?.type === "application/msword" ||
    file?.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    return <FaFileWord className="text-blue-500" />;
  }

  return <FaFileAlt className="text-slate-400" />;
};

export default CaseDocuments;
