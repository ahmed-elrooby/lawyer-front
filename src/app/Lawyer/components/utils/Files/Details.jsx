"use client";

import React from "react";

import {
  X,
  FileText,
  Download,
  ExternalLink,
  CalendarDays,
  HardDrive,
  User,
  File,
  Clock3,
  Tag,
  FileType,
  Hash,
} from "lucide-react";

/* =========================================================
   Format File Size
========================================================= */

const formatFileSize = (bytes) => {
  if (!bytes) return "—";

  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

/* =========================================================
   Format Date
========================================================= */

const formatDate = (date) => {
  if (!date) return "—";

  return new Date(date).toLocaleDateString("ar-EG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

/* =========================================================
   Format Time
========================================================= */

const formatTime = (date) => {
  if (!date) return "—";

  return new Date(date).toLocaleTimeString("ar-EG", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

/* =========================================================
   File Type
========================================================= */

const getFileType = (
  extension = "",
  mimeType = ""
) => {
  const ext = extension.toLowerCase();
  const mime = mimeType.toLowerCase();

  if (
    ext === ".pdf" ||
    mime.includes("pdf")
  ) {
    return "PDF";
  }

  if (
    ext === ".doc" ||
    ext === ".docx" ||
    mime.includes("word")
  ) {
    return "Word";
  }

  if (
    ext === ".xls" ||
    ext === ".xlsx" ||
    mime.includes("excel") ||
    mime.includes("spreadsheet")
  ) {
    return "Excel";
  }

  if (
    mime.startsWith("image/") ||
    [
      ".jpg",
      ".jpeg",
      ".png",
      ".webp",
      ".gif",
      ".svg",
    ].includes(ext)
  ) {
    return "صورة";
  }

  if (
    ext === ".zip" ||
    ext === ".rar" ||
    ext === ".7z"
  ) {
    return "أرشيف";
  }

  return (
    extension?.replace(".", "").toUpperCase() ||
    "FILE"
  );
};

/* =========================================================
   Details
========================================================= */

const Details = ({
  setOpenDetails,
  openDetails,
  selectFile,
}) => {
  if (!openDetails || !selectFile) {
    return null;
  }

  const fileUrl = selectFile?.url;

  const fileName =
    selectFile?.name ||
    selectFile?.originalName ||
    "بدون اسم";

  const originalName =
    selectFile?.originalName ||
    "بدون اسم أصلي";

  const fileType = getFileType(
    selectFile?.extension,
    selectFile?.mimeType
  );

  return (
    <div
      className="
        fixed
        inset-0
        z-[100]
        flex
        items-center
        justify-center
        bg-slate-950/85
        p-4
        backdrop-blur-md
      "
      onClick={() => setOpenDetails(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          relative
          flex
          max-h-[92vh]
          w-full
          max-w-3xl
          flex-col
          overflow-hidden
          rounded-[28px]
          border
          border-slate-700/70
          bg-slate-900
          shadow-2xl
          shadow-black/50
        "
      >
        {/* =================================================
            TOP GLOW
        ================================================= */}

        <div
          className="absolute rounded-full pointer-events-none  -right-32 -top-32 h-72 w-72 bg-blue-500/10 blur-3xl"
        />

        <div
          className="
            pointer-events-none
            absolute
            -left-32
            top-1/3
            h-64
            w-64
            rounded-full
            bg-purple-500/[0.06]
            blur-3xl
          "
        />

        {/* =================================================
            HEADER
        ================================================= */}

        <div
          className="relative z-10 flex items-center justify-between px-5 py-4 border-b  border-slate-700/60 bg-slate-900/90 backdrop-blur-xl sm:px-6"
        >
          <div className="flex items-center min-w-0 gap-3 ">
            <div
              className="flex items-center justify-center border  h-11 w-11 shrink-0 rounded-2xl border-blue-500/20 bg-blue-500/10"
            >
              <FileText
                className="w-5 h-5 text-blue-400 "
              />
            </div>

            <div className="min-w-0">
              <h2 className="text-base font-bold text-white ">
                تفاصيل المستند
              </h2>

              <p className="
                mt-1
                max-w-[240px]
                truncate
                text-xs
                text-slate-500
                sm:max-w-md
              ">
                {fileName}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              setOpenDetails(false)
            }
            className="flex items-center justify-center transition-all border  h-9 w-9 shrink-0 rounded-xl border-slate-700 bg-slate-800/70 text-slate-400 hover:border-slate-600 hover:bg-slate-700 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* =================================================
            CONTENT
        ================================================= */}

        <div
          className="relative z-10 p-5 overflow-y-auto  dark-scrollbar sm:p-6"
        >
          {/* =================================================
              FILE HERO
          ================================================= */}

          <div
            className="relative p-6 overflow-hidden border  rounded-3xl border-slate-700/60 bg-gradient-to-br from-slate-800/80 to-slate-800/30"
          >
            {/* Decorative */}
            <div
              className="absolute rounded-full pointer-events-none  -right-12 -top-12 h-36 w-36 bg-blue-500/10 blur-3xl"
            />

            <div className="relative flex flex-col items-center text-center ">
              {/* File Icon */}

              <div className="relative mb-5 ">
                <div
                  className="absolute inset-0  rounded-3xl bg-blue-500/20 blur-2xl"
                />

                <div
                  className="relative flex items-center justify-center w-24 h-24 border shadow-xl  rounded-3xl border-blue-500/20 bg-blue-500/10 shadow-blue-500/5"
                >
                  <FileText
                    className="text-blue-400  h-11 w-11"
                  />
                </div>

                <span
                  className="
                    absolute
                    -bottom-2
                    -left-2
                    rounded-lg
                    border
                    border-slate-700
                    bg-slate-900
                    px-2
                    py-1
                    text-[10px]
                    font-bold
                    text-slate-300
                    shadow-lg
                  "
                >
                  {fileType}
                </span>
              </div>

              {/* Name */}

              <h3
                className="max-w-full px-4 text-lg font-bold text-white break-all  sm:text-xl"
              >
                {fileName}
              </h3>

              {/* Meta */}

              <div
                className="flex flex-wrap items-center justify-center gap-2 mt-3 text-xs  text-slate-500"
              >
                <span
                  className="
                    rounded-lg
                    bg-slate-900/70
                    px-2.5
                    py-1.5
                  "
                >
                  {fileType}
                </span>

                <span className="text-slate-700">
                  •
                </span>

                <span
                  className="
                    rounded-lg
                    bg-slate-900/70
                    px-2.5
                    py-1.5
                  "
                >
                  {formatFileSize(
                    selectFile?.size
                  )}
                </span>

                {selectFile?.extension && (
                  <>
                    <span className="text-slate-700">
                      •
                    </span>

                    <span
                      className="
                        rounded-lg
                        bg-slate-900/70
                        px-2.5
                        py-1.5
                      "
                    >
                      {selectFile.extension.toUpperCase()}
                    </span>
                  </>
                )}
              </div>

              {/* Buttons */}

              {fileUrl && (
                <div
                  className="flex flex-col w-full gap-2 mt-6  sm:w-auto sm:flex-row"
                >
                  <button
                    type="button"
                    onClick={() =>
                      window.open(
                        fileUrl,
                        "_blank",
                        "noopener,noreferrer"
                      )
                    }
                    className="
                      inline-flex
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      bg-blue-500
                      px-5
                      py-2.5
                      text-sm
                      font-bold
                      text-white
                      shadow-lg
                      shadow-blue-500/20
                      transition-all
                      hover:bg-blue-400
                      hover:shadow-blue-500/30
                      active:scale-[0.98]
                    "
                  >
                    <ExternalLink className="w-4 h-4" />

                    فتح المستند
                  </button>

                  <a
                    href={fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="
                      inline-flex
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      border
                      border-slate-700
                      bg-slate-900/70
                      px-5
                      py-2.5
                      text-sm
                      font-semibold
                      text-slate-300
                      transition-all
                      hover:border-slate-600
                      hover:bg-slate-800
                      hover:text-white
                    "
                  >
                    <Download className="w-4 h-4" />

                    تحميل
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* =================================================
              DETAILS TITLE
          ================================================= */}

          <div className="flex items-center gap-2 mt-6 mb-3 ">
            <div
              className="w-1 h-5 bg-blue-500 rounded-full "
            />

            <h3 className="text-sm font-bold text-white ">
              معلومات المستند
            </h3>
          </div>

          {/* =================================================
              INFO GRID
          ================================================= */}

          <div className="grid grid-cols-1 gap-3  sm:grid-cols-2">
            {/* File Type */}

            <InfoItem
              icon={FileType}
              iconClass="text-blue-400"
              label="نوع المستند"
              value={fileType}
            />

            {/* Size */}

            <InfoItem
              icon={HardDrive}
              iconClass="text-purple-400"
              label="حجم الملف"
              value={formatFileSize(
                selectFile?.size
              )}
            />

            {/* Uploaded By */}

            <InfoItem
              icon={User}
              iconClass="text-cyan-400"
              label="رُفع بواسطة"
              value={
                selectFile?.uploadedBy?.name ||
                "غير معروف"
              }
              extra={
                selectFile?.uploadedBy?.email ||
                null
              }
            />

            {/* Extension */}

            <InfoItem
              icon={FileText}
              iconClass="text-emerald-400"
              label="امتداد الملف"
              value={
                selectFile?.extension
                  ? selectFile.extension.toUpperCase()
                  : "—"
              }
            />

            {/* Date */}

            <InfoItem
              icon={CalendarDays}
              iconClass="text-blue-400"
              label="تاريخ الرفع"
              value={formatDate(
                selectFile?.createdAt
              )}
            />

            {/* Time */}

            <InfoItem
              icon={Clock3}
              iconClass="text-rose-400"
              label="وقت الرفع"
              value={formatTime(
                selectFile?.createdAt
              )}
            />
          </div>

          {/* =================================================
              DESCRIPTION
          ================================================= */}

          <div className="flex items-center gap-2 mt-6 mb-3 ">
            <div
              className="w-1 h-5 rounded-full  bg-emerald-500"
            />

            <h3 className="text-sm font-bold text-white ">
              وصف المستند
            </h3>
          </div>

          <div
            className="p-4 border  rounded-2xl border-slate-700/60 bg-slate-800/40"
          >
            <p
              className="text-sm leading-7 whitespace-pre-wrap  text-slate-300"
            >
              {selectFile?.description ||
                "لا يوجد وصف لهذا المستند"}
            </p>
          </div>

          {/* =================================================
              ORIGINAL NAME
          ================================================= */}

          <div
            className="flex items-start gap-3 p-4 mt-3 border  rounded-2xl border-slate-700/60 bg-slate-800/30"
          >
            <div
              className="flex items-center justify-center  h-9 w-9 shrink-0 rounded-xl bg-slate-800"
            >
              <Tag
                className="w-4 h-4  text-slate-400"
              />
            </div>

            <div className="min-w-0">
              <p className="text-xs  text-slate-500">
                اسم الملف الأصلي
              </p>

              <p className="mt-1 text-sm break-all  text-slate-300">
                {originalName}
              </p>
            </div>
          </div>

          {/* =================================================
              PUBLIC ID
          ================================================= */}

          {selectFile?.publicId && (
            <div
              className="flex items-start gap-3 p-4 mt-3 border  rounded-2xl border-slate-700/60 bg-slate-800/30"
            >
              <div
                className="flex items-center justify-center  h-9 w-9 shrink-0 rounded-xl bg-slate-800"
              >
                <Hash
                  className="w-4 h-4  text-slate-400"
                />
              </div>

              <div className="min-w-0">
                <p className="text-xs  text-slate-500">
                  معرف الملف
                </p>

                <p className="mt-1 font-mono text-xs break-all  text-slate-400">
                  {selectFile.publicId}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* =================================================
            FOOTER
        ================================================= */}

        <div
          className="relative z-20 flex items-center justify-between gap-3 px-5 py-4 border-t  border-slate-700/60 bg-slate-900/95 backdrop-blur-xl sm:px-6"
        >
          <div
            className="items-center hidden gap-2 text-xs  text-slate-500 sm:flex"
          >
            <File className="h-3.5 w-3.5" />

            <span>
              تفاصيل المستند
            </span>
          </div>

          <button
            type="button"
            onClick={() =>
              setOpenDetails(false)
            }
            className="
              w-full
              rounded-xl
              border
              border-slate-700
              bg-slate-800
              px-5
              py-2.5
              text-sm
              font-semibold
              text-slate-300
              transition-all
              hover:border-slate-600
              hover:bg-slate-700
              hover:text-white
              sm:w-auto
            "
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};

/* =========================================================
   Info Item
========================================================= */

const InfoItem = ({
  icon: Icon,
  iconClass,
  label,
  value,
  extra,
}) => {
  return (
    <div
      className="p-4 transition-all duration-300 border  rounded-2xl border-slate-700/60 bg-slate-800/40 group hover:border-slate-600 hover:bg-slate-800/70"
    >
      <div className="flex items-start gap-3 ">
        <div
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-slate-900/80
            transition-transform
            duration-300
            group-hover:-translate-y-0.5
          "
        >
          <Icon
            className={`
              h-4
              w-4
              ${iconClass}
            `}
          />
        </div>

        <div className="min-w-0">
          <p className="text-xs  text-slate-500">
            {label}
          </p>

          <p
            className="mt-1 text-sm font-semibold truncate  text-slate-200"
            title={value}
          >
            {value}
          </p>

          {extra && (
            <p
              className="
                mt-1
                truncate
                text-[11px]
                text-slate-500
              "
              title={extra}
            >
              {extra}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Details;