"use client";

import React from "react";
import Link from "next/link";
import { Folder, Eye } from "lucide-react";

const LastFiles = () => {
  const filesData = [
    {
      id: 1,
      name: "عقد البيع النهائي.pdf",
      case: "Estate v. Wilson",
      lastUpdate: "منذ ساعة",
    },
    {
      id: 2,
      name: "لائحة الدعوى.docx",
      case: "Tech Corp",
      lastUpdate: "أمس",
    },
    {
      id: 3,
      name: "مستندات الإفصاح.zip",
      case: "IP Dispute",
      lastUpdate: "منذ 3 أيام",
    },
  ];

  return (
    <div className="overflow-hidden transition-all duration-300 border shadow-sm bg-slate-800 rounded-2xl border-slate-700 hover:shadow-md">
      <div className="p-5 border-b border-slate-700">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-white">
          <Folder className="w-5 h-5 text-blue-400" />
          الملفات الأخيرة
        </h3>
      </div>
      <div className="divide-y divide-slate-700">
        {filesData.map((file) => (
          <div
            key={file.id}
            className="flex items-center justify-between p-4 transition hover:bg-slate-700/50"
          >
            <div>
              <p className="font-medium text-gray-100">{file.name}</p>
              <p className="text-xs text-gray-400 mt-0.5">
                قضية: {file.case} • آخر تحديث: {file.lastUpdate}
              </p>
            </div>
            <button
              className="text-gray-400 transition hover:text-blue-400"
              title="معاينة"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LastFiles;