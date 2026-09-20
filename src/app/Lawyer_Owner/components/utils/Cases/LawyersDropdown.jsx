
"use client";

import React from "react";
import { ErrorMessage } from "formik";
import {
  FaUsers,
  FaChevronDown,
  FaCheck,
} from "react-icons/fa";

const FALLBACK_IMAGE = "/images/avatar-placeholder.png";

const LawyersDropdown = ({
  lawyers = [],
  selectedIds = [],
  open,
  setOpen,
  setFieldValue,
  dropdownRef,
}) => {
  const selectedLawyers = lawyers.filter((lawyer) =>
    selectedIds.includes(lawyer._id)
  );

  const getImage = (lawyer) =>
    lawyer?.profileImage?.url || FALLBACK_IMAGE;

  const toggleLawyer = (lawyerId) => {
    const exists = selectedIds.includes(lawyerId);

    const updated = exists
      ? selectedIds.filter((id) => id !== lawyerId)
      : [...selectedIds, lawyerId];

    setFieldValue("lawyers", updated);
  };

  return (
    <div ref={dropdownRef}>
      <label className="block mb-2 text-xs font-semibold text-slate-700">
        المحامون <span className="text-red-500">*</span>
      </label>

      <div className="relative">
        {/* Selected */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex items-center w-full gap-2 px-3 py-2 transition border outline-none min-h-11 rounded-xl border-slate-200 bg-slate-50 hover:border-blue-400 focus:border-blue-500"
        >
          {selectedLawyers.length === 0 ? (
            <>
              <div className="flex items-center justify-center flex-shrink-0 rounded-full w-7 h-7 bg-blue-50">
                <FaUsers className="text-xs text-blue-500" />
              </div>

              <span className="flex-1 text-sm text-right text-slate-400">
                اختر المحامين
              </span>
            </>
          ) : (
            <div className="flex flex-wrap flex-1 gap-1.5">
              {selectedLawyers.map((lawyer) => (
                <span
                  key={lawyer._id}
                  className="inline-flex items-center gap-1.5 px-2 py-1 text-[11px] font-medium text-blue-700 bg-blue-50 rounded-lg"
                >
                  {/* هنا الإصلاح */}
                  <img
                    src={getImage(lawyer)}
                    alt={lawyer.name}
                    className="object-cover w-5 h-5 border border-blue-100 rounded-full"
                    onError={(e) => {
                      if (
                        !e.currentTarget.src.includes(
                          FALLBACK_IMAGE
                        )
                      ) {
                        e.currentTarget.src =
                          FALLBACK_IMAGE;
                      }
                    }}
                  />

                  <span className="max-w-[100px] truncate">
                    {lawyer.name}
                  </span>
                </span>
              ))}
            </div>
          )}

          <FaChevronDown
            className={`flex-shrink-0 text-xs text-slate-400 transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Dropdown */}
        {open && (
          <div className="absolute left-0 right-0 z-40 mt-2 overflow-hidden bg-white border shadow-xl rounded-xl border-slate-200">
            <div className="px-3 py-2 border-b border-slate-100 bg-slate-50">
              <p className="text-[11px] font-semibold text-slate-500">
                اختر المحامين المسؤولين عن القضية
              </p>
            </div>

            <div className="max-h-64 overflow-y-auto p-1.5">
              {lawyers.length === 0 ? (
                <div className="px-4 py-6 text-xs text-center text-slate-400">
                  لا يوجد محامين
                </div>
              ) : (
                lawyers.map((lawyer) => {
                  const selected =
                    selectedIds.includes(lawyer._id);

                  return (
                    <button
                      key={lawyer._id}
                      type="button"
                      onClick={() =>
                        toggleLawyer(lawyer._id)
                      }
                      className={`flex items-center w-full gap-3 px-3 py-2.5 rounded-lg transition ${
                        selected
                          ? "bg-blue-50"
                          : "hover:bg-slate-50"
                      }`}
                    >
                      <img
                        src={getImage(lawyer)}
                        alt={lawyer.name}
                        className="flex-shrink-0 object-cover w-10 h-10 border rounded-full border-slate-200 bg-slate-100"
                        onError={(e) => {
                          if (
                            !e.currentTarget.src.includes(
                              FALLBACK_IMAGE
                            )
                          ) {
                            e.currentTarget.src =
                              FALLBACK_IMAGE;
                          }
                        }}
                      />

                      <div className="flex-1 min-w-0 text-right">
                        <p className="text-sm font-semibold truncate text-slate-700">
                          {lawyer.name}
                        </p>

                        {lawyer.email && (
                          <p className="mt-0.5 text-[10px] truncate text-slate-400">
                            {lawyer.email}
                          </p>
                        )}
                      </div>

                      <div
                        className={`flex items-center justify-center flex-shrink-0 w-6 h-6 rounded-md border transition ${
                          selected
                            ? "bg-blue-600 border-blue-600 text-white"
                            : "border-slate-300 text-transparent"
                        }`}
                      >
                        <FaCheck className="text-[10px]" />
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>

      <p className="mt-1 text-[11px] text-slate-400">
        يمكنك اختيار أكثر من محامي
      </p>

      <ErrorMessage
        name="lawyers"
        component="p"
        className="mt-1 text-xs text-red-500"
      />
    </div>
  );
};

export default LawyersDropdown;
