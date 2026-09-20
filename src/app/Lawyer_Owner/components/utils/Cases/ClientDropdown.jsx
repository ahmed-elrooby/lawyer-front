"use client";

import React from "react";
import { ErrorMessage } from "formik";
import {
  FaUser,
  FaChevronDown,
  FaCheck,
} from "react-icons/fa";

const FALLBACK_IMAGE = "/images/avatar-placeholder.png";

const ClientDropdown = ({
  clients = [],
  value,
  open,
  setOpen,
  setFieldValue,
  dropdownRef,
}) => {
  const selectedClient = clients.find(
    (client) => String(client._id) === String(value)
  );
const getImage = (client) => {
  return client?.profileImage?.url || "";
};

  const handleSelect = (clientId) => {
    setFieldValue("clientId", clientId);
    setOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative">
      {/* Label */}
      <label className="block mb-2 text-xs font-semibold text-slate-700">
        العميل <span className="text-red-500">*</span>
      </label>

      {/* Selected Client */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center w-full gap-3 px-3 transition border outline-none h-11 rounded-xl border-slate-200 bg-slate-50 hover:border-blue-400 focus:border-blue-500"
      >
        {selectedClient ? (
          <>
            <Avatar
              src={getImage(selectedClient)}
              alt={selectedClient.name}
              size="sm"
            />

            <span className="flex-1 text-sm font-medium text-right truncate text-slate-700">
              {selectedClient.name}
            </span>
          </>
        ) : (
          <>
            <div className="flex items-center justify-center rounded-full w-7 h-7 bg-blue-50">
              <FaUser className="text-xs text-blue-500" />
            </div>

            <span className="flex-1 text-sm text-right text-slate-400">
              اختر العميل
            </span>
          </>
        )}

        <FaChevronDown
          className={`text-xs text-slate-400 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute left-0 right-0 z-50 mt-2 overflow-hidden bg-white border shadow-xl rounded-xl border-slate-200">
          <div className="max-h-60 overflow-y-auto p-1.5">
            {clients.length === 0 ? (
              <Empty text="لا يوجد عملاء" />
            ) : (
              clients.map((client) => {
                const selected =
                  String(value) === String(client._id);

                return (
                  <button
                    key={client._id}
                    type="button"
                    onClick={() => handleSelect(client._id)}
                    className={`flex items-center w-full gap-3 px-3 py-2.5 rounded-lg transition ${
                      selected
                        ? "bg-blue-50"
                        : "hover:bg-slate-50"
                    }`}
                  >
                    {/* Client Image */}
                    <Avatar
                      src={getImage(client)}
                      alt={client.name}
                      size="md"
                    />

                    {/* Client Info */}
                    <div className="flex-1 min-w-0 text-right">
                      <p className="text-sm font-semibold truncate text-slate-700">
                        {client.name}
                      </p>

                      {client.phone && (
                        <p className="mt-0.5 text-[10px] truncate text-slate-400">
                          {client.phone}
                        </p>
                      )}
                    </div>

                    {/* Selected */}
                    {selected && <Check />}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}

      <ErrorMessage
        name="clientId"
        component="p"
        className="mt-1 text-xs text-red-500"
      />
    </div>
  );
};

/* =========================
   Avatar
========================= */

const Avatar = ({ src, alt, size = "md" }) => {
  const sizeClass =
    size === "sm"
      ? "w-7 h-7"
      : "w-10 h-10";

  return (
    <div
      className={`flex items-center justify-center flex-shrink-0 ${sizeClass} overflow-hidden rounded-full border border-slate-200 bg-slate-100`}
    >
      {src ? (
        <img
          src={src}
          alt={alt || "avatar"}
          className="object-cover w-full h-full"
        />
      ) : (
        <FaUser className="text-xs text-slate-400" />
      )}
    </div>
  );
};

/* =========================
   Check Icon
========================= */

const Check = () => (
  <div className="flex items-center justify-center flex-shrink-0 w-6 h-6 text-white bg-blue-600 rounded-full">
    <FaCheck className="text-[10px]" />
  </div>
);

/* =========================
   Empty
========================= */

const Empty = ({ text }) => (
  <div className="px-4 py-6 text-xs text-center text-slate-400">
    {text}
  </div>
);

export default ClientDropdown;