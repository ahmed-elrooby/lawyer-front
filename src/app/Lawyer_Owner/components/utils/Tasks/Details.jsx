"use client";

import React from "react";
import {
  FaTimes,
  FaTasks,
  FaUserTie,
  FaUser,
  FaCalendarAlt,
  FaFlag,
  FaClock,
} from "react-icons/fa";

const Details = ({ selectTask, setOpenDetails, openDetails }) => {
  if (!openDetails || !selectTask) return null;

  const priorityMap = {
    high: {
      label: "عالية",
      style:
        "text-[#8A5A00] bg-[#F4EFD9] border-[#E5DDBB]",
    },
    medium: {
      label: "متوسطة",
      style:
        "text-[#755B00] bg-[#F4EFD9] border-[#E5DDBB]",
    },
    low: {
      label: "منخفضة",
      style:
        "text-[#496B5A] bg-[#E6F0EA] border-[#D3E3D9]",
    },
  };

  const statusMap = {
    todo: {
      label: "لم تبدأ",
      style:
        "text-[#45464D] bg-[#F1F3F6] border-[#E1E5EB]",
    },
    in_progress: {
      label: "قيد التنفيذ",
      style:
        "text-[#455D80] bg-[#E8EDF6] border-[#D5DDEB]",
    },
    completed: {
      label: "مكتملة",
      style:
        "text-[#496B5A] bg-[#E6F0EA] border-[#D3E3D9]",
    },
  };

  const priority = priorityMap[selectTask.priority];
  const status = statusMap[selectTask.status];

  const formatDate = (date) => {
    if (!date) return "بدون موعد";

    return new Date(date).toLocaleDateString("ar-EG", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-white border shadow-2xl rounded-2xl border-[#E7EBF2]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-[#E7EBF2] sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#D5E0F8] text-[#0B1C30]">
              <FaTasks />
            </div>

            <div>
              <h2 className="text-lg font-bold text-[#0B1C30]">
                تفاصيل المهمة
              </h2>

              <p className="mt-1 text-xs text-[#45464D]">
                عرض تفاصيل ومعلومات المهمة
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOpenDetails(false)}
            className="flex items-center justify-center transition rounded-lg w-9 h-9 text-[#45464D] bg-[#F8F9FB] hover:bg-[#E7EBF2]"
          >
            <FaTimes className="text-sm" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-5 sm:p-6">
          {/* Title & Description */}
          <div className="p-4 border rounded-xl border-[#E7EBF2] bg-[#F8F9FB]">
            <h3 className="text-base font-bold text-[#0B1C30]">
              {selectTask.title}
            </h3>

            <p className="mt-2 text-sm leading-6 text-[#45464D]">
              {selectTask.description || "لا يوجد وصف للمهمة"}
            </p>
          </div>

          {/* Status & Priority */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="p-4 border rounded-xl border-[#E7EBF2]">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#E8EDF6] text-[#455D80]">
                  <FaClock className="text-sm" />
                </div>

                <div>
                  <p className="text-xs text-[#7A7D85]">
                    حالة المهمة
                  </p>

                  <span
                    className={`inline-flex mt-1 px-3 py-1 text-xs font-semibold border rounded-full ${status?.style}`}
                  >
                    {status?.label}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 border rounded-xl border-[#E7EBF2]">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#F4EFD9] text-[#755B00]">
                  <FaFlag className="text-sm" />
                </div>

                <div>
                  <p className="text-xs text-[#7A7D85]">
                    الأولوية
                  </p>

                  <span
                    className={`inline-flex mt-1 px-3 py-1 text-xs font-semibold border rounded-full ${priority?.style}`}
                  >
                    {priority?.label}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Lawyer */}
          <div className="p-4 border rounded-xl border-[#E7EBF2]">
            <p className="mb-3 text-xs font-semibold text-[#7A7D85]">
              المحامي المسؤول
            </p>

            <div className="flex items-center gap-3">
              {selectTask.assignedTo?.profileImage?.url ? (
                <img
                  src={selectTask.assignedTo.profileImage.url}
                  alt={selectTask.assignedTo.name}
                  className="object-cover border rounded-full w-11 h-11 border-[#D5DDEB]"
                />
              ) : (
                <div className="flex items-center justify-center border rounded-full w-11 h-11 bg-[#D5E0F8] border-[#D5DDEB]">
                  <FaUserTie className="text-[#0B1C30]" />
                </div>
              )}

              <div>
                <p className="text-sm font-semibold text-[#0B1C30]">
                  {selectTask.assignedTo?.name || "غير محدد"}
                </p>

                <p className="mt-1 text-xs text-[#7A7D85]">
                  {selectTask.assignedTo?.email || "لا يوجد بريد إلكتروني"}
                </p>
              </div>
            </div>
          </div>

          {/* Assigned By & Due Date */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="p-4 border rounded-xl border-[#E7EBF2]">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#D5E0F8] text-[#0B1C30]">
                  <FaUser />
                </div>

                <div>
                  <p className="text-xs text-[#7A7D85]">
                    تم التكليف بواسطة
                  </p>

                  <p className="mt-1 text-sm font-semibold text-[#0B1C30]">
                    {selectTask.assignedBy?.name || "غير محدد"}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 border rounded-xl border-[#E7EBF2]">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#F4EFD9] text-[#755B00]">
                  <FaCalendarAlt />
                </div>

                <div>
                  <p className="text-xs text-[#7A7D85]">
                    تاريخ الاستحقاق
                  </p>

                  <p className="mt-1 text-sm font-semibold text-[#0B1C30]">
                    {formatDate(selectTask.dueDate)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end pt-4 border-t border-[#E7EBF2]">
            <button
              type="button"
              onClick={() => setOpenDetails(false)}
              className="px-5 py-2.5 text-sm font-semibold transition rounded-lg border border-[#E7EBF2] text-[#45464D] bg-white hover:bg-[#F8F9FB]"
            >
              إغلاق
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;