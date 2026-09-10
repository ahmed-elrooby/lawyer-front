"use client";

import React, { useState, useRef } from "react";
import { CloudUpload, FileText, X } from "lucide-react";

const FileUpload = () => {
  const [files, setFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(null);
  const inputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles.length) {
      setFiles((prev) => [...prev, ...droppedFiles]);
      simulateUpload();
    }
  };

  const handleChange = (e) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...selectedFiles]);
      simulateUpload();
    }
  };

  const simulateUpload = () => {
    setUploadProgress(0);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => setUploadProgress(null), 1000);
      }
    }, 200);
  };

  const removeFile = (indexToRemove) => {
    setFiles((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-sm border border-slate-700/50 transition-all duration-500 hover:scale-[1.01] hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-400/50">
      {/* Animated gradient background on hover */}
      <div className="absolute inset-0 transition-all duration-700 bg-gradient-to-br from-blue-600/0 via-purple-600/0 to-emerald-600/0 group-hover:from-blue-600/10 group-hover:via-purple-600/5 group-hover:to-emerald-600/10 rounded-2xl" />

      {/* Glass reflection effect */}
      <div className="absolute transition-all duration-1000 transform -skew-x-12 opacity-0 -inset-full group-hover:inset-0 group-hover:opacity-20 bg-gradient-to-r from-white/0 via-white/20 to-white/0" />

      <div
        className={`
          relative z-10 cursor-pointer p-6 transition-all duration-300
          ${dragActive ? "bg-blue-500/10" : ""}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={onButtonClick}
      >
        {/* Drag overlay with dashed border */}
        <div
          className={`
            absolute inset-3 rounded-xl border-2 border-dashed transition-all duration-300 pointer-events-none
            ${dragActive 
              ? "border-blue-400 bg-blue-500/5 scale-[1.02]" 
              : "border-slate-600 group-hover:border-blue-500/50"}
          `}
        />

        <div className="relative z-20 text-center">
          {/* Animated icon */}
          <div className="relative inline-block">
            <div className="absolute inset-0 rounded-full bg-blue-500/30 blur-xl animate-pulse" />
            <CloudUpload className="relative w-16 h-16 mx-auto mb-4 text-blue-400 transition-transform duration-300 drop-shadow-lg group-hover:scale-110 group-hover:rotate-3" />
          </div>

          <h4 className="mb-1 text-xl font-bold text-white">
            رفع الملفات
          </h4>
          <p className="mb-2 text-sm text-slate-300">
            اسحب ملفاتك هنا أو اضغط للاختيار
          </p>
          <p className="text-xs text-slate-400">
            يدعم PDF، Word، Excel، الصور (حتى 10MB)
          </p>

          {/* File list preview */}
          {files.length > 0 && (
            <div className="max-w-md mx-auto mt-6 text-right">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-slate-400">الملفات المرفوعة</span>
                <span className="text-xs text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full">
                  {files.length} ملف
                </span>
              </div>
              <ul className="space-y-2 overflow-y-auto max-h-32 custom-scrollbar">
                {files.map((file, idx) => (
                  <li key={idx} className="flex items-center justify-between gap-2 p-2 border rounded-lg bg-white/5 backdrop-blur-sm border-white/10 group/file">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <FileText className="w-4 h-4 text-blue-400 shrink-0" />
                      <span className="text-sm truncate text-slate-200">{file.name}</span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFile(idx);
                      }}
                      className="p-1 transition-colors rounded-full hover:bg-red-500/20"
                    >
                      <X className="w-3.5 h-3.5 text-red-400" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Progress bar */}
          {uploadProgress !== null && (
            <div className="w-full max-w-md mx-auto mt-6">
              <div className="flex justify-between mb-1 text-xs text-slate-400">
                <span>جاري الرفع...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full shadow-inner bg-slate-700">
                <div
                  className="relative h-2 transition-all duration-300 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
                  style={{ width: `${uploadProgress}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                </div>
              </div>
            </div>
          )}

          <input
            ref={inputRef}
            type="file"
            multiple
            className="hidden"
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Bottom decorative bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
};

export default FileUpload;