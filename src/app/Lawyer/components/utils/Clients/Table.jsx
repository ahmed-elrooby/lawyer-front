"use client";

import React, { useContext, useMemo, useState } from "react";
import {
  FaSearch,
  FaList,
  FaThLarge,
  FaEye,
  FaEdit,
  FaTrash,
  FaChevronRight,
  FaChevronLeft,
  FaUser,
} from "react-icons/fa";

import { LawyerContext } from "../../../../../Providers/LawyerContext/lawyer.js";
import { authContext } from "../../../../../Providers/AuthProvider/Auth.js";
import Details from "./Details.jsx";
import DeleteModel from "./DeleteModel.jsx";
import UpdateClient from "./UpdateClient.jsx";

const Table = () => {
  const {
    clients = [],
    openDeleteClient,
    setOpenDeleteClient,
    openUpdateClient,
    setOpenUpdateClient,
  } = useContext(LawyerContext);

  const { isIndependentLawyer } = useContext(authContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState("table");
  const [openDetails, setOpenDetails] = useState(false);
  const [client, setClient] = useState(null);

  const itemsPerPage = 5;

  const filteredClients = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    if (!term) return clients;

    return clients.filter(
      (client) =>
        client.name?.toLowerCase().includes(term) ||
        client.phone?.includes(term) ||
        client.nationalId?.includes(term)
    );
  }, [clients, searchTerm]);

  const totalPages = Math.ceil(
    filteredClients.length / itemsPerPage
  );

  const startIndex = (currentPage - 1) * itemsPerPage;

  const paginatedClients = filteredClients.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <>
      {openDetails && (
        <Details
          client={client}
          setOpenDetails={setOpenDetails}
        />
      )}

      {openDeleteClient && isIndependentLawyer && (
        <DeleteModel client={client} />
      )}

      {openUpdateClient && isIndependentLawyer && (
        <UpdateClient client={client} />
      )}

      <div className="w-full mt-6 overflow-hidden border rounded-xl border-slate-700 bg-slate-800/60">

        {/* Header */}
        <div className="flex flex-col gap-3 p-4 border-b border-slate-700 sm:flex-row sm:items-center sm:justify-between">

          {/* Search */}
          <div className="relative w-full sm:max-w-sm">
            <FaSearch className="absolute text-xs -translate-y-1/2 right-3 top-1/2 text-slate-500" />

            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="ابحث عن عميل..."
              className="
                w-full rounded-lg
                border border-slate-700
                bg-slate-900
                py-2.5 pl-4 pr-9
                text-sm text-slate-100
                outline-none
                placeholder:text-slate-500
                focus:border-emerald-500
              "
            />
          </div>

          {/* View Mode */}
          <div className="flex items-center gap-1 p-1 border rounded-lg border-slate-700 bg-slate-900">

            <button
              type="button"
              onClick={() => setViewMode("table")}
              title="جدول"
              className={`flex h-8 w-8 items-center justify-center rounded-md transition ${
                viewMode === "table"
                  ? "bg-emerald-600 text-white"
                  : "text-slate-500 hover:text-white"
              }`}
            >
              <FaList className="text-sm" />
            </button>

            <button
              type="button"
              onClick={() => setViewMode("cards")}
              title="كروت"
              className={`flex h-8 w-8 items-center justify-center rounded-md transition ${
                viewMode === "cards"
                  ? "bg-emerald-600 text-white"
                  : "text-slate-500 hover:text-white"
              }`}
            >
              <FaThLarge className="text-sm" />
            </button>

          </div>
        </div>

        {/* Empty */}
        {paginatedClients.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-slate-500">
            <FaUser className="mb-3 text-3xl" />
            <p className="text-sm">لا يوجد عملاء</p>
          </div>
        ) : viewMode === "table" ? (

          /* ================= TABLE ================= */

          <div className="w-full overflow-x-auto table-scroll">
            <table className="w-full min-w-[750px] text-right">

              <thead>
                <tr className="border-b border-slate-700 bg-slate-800">

                  <th className="px-5 py-3 text-xs font-medium text-slate-500">
                    العميل
                  </th>

                  <th className="px-5 py-3 text-xs font-medium text-slate-500">
                    الهاتف
                  </th>

                  <th className="px-5 py-3 text-xs font-medium text-slate-500">
                    الرقم القومي
                  </th>

                  <th className="px-5 py-3 text-xs font-medium text-slate-500">
                    المدينة
                  </th>

                  <th className="px-5 py-3 text-xs font-medium text-slate-500">
                    الحالة
                  </th>

                  <th className="px-5 py-3 text-xs font-medium text-slate-500">
                    الإجراءات
                  </th>

                </tr>
              </thead>

              <tbody>
                {paginatedClients.map((client) => (
                  <tr
                    key={client._id}
                    className="border-b border-slate-700/70 hover:bg-slate-700/30"
                  >

                    {/* Client */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">

                        {client.profileImage?.url ? (
                          <img
                            src={client.profileImage.url}
                            alt={client.name}
                            className="object-cover rounded-full h-9 w-9 shrink-0"
                          />
                        ) : (
                          <div className="flex items-center justify-center rounded-full h-9 w-9 shrink-0 bg-slate-700 text-emerald-400">
                            <FaUser className="text-sm" />
                          </div>
                        )}

                        <div>
                          <p className="text-sm font-medium text-white">
                            {client.name}
                          </p>

                          {client.email && (
                            <p className="mt-0.5 text-xs text-slate-500">
                              {client.email}
                            </p>
                          )}
                        </div>

                      </div>
                    </td>

                    {/* Phone */}
                    <td className="px-5 py-4 text-sm text-slate-300">
                      {client.phone || "-"}
                    </td>

                    {/* National ID */}
                    <td className="px-5 py-4 text-sm text-slate-400">
                      {client.nationalId || "-"}
                    </td>

                    {/* City */}
                    <td className="px-5 py-4 text-sm text-slate-400">
                      {client.city || "-"}
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs ${
                          client.isActive
                            ? "bg-emerald-500/10 text-emerald-400"
                            : "bg-red-500/10 text-red-400"
                        }`}
                      >
                        {client.isActive ? "نشط" : "غير نشط"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">

                        {/* Details - متاح للجميع */}
                        <button
                          onClick={() => {
                            setClient(client);
                            setOpenDetails(true);
                          }}
                          type="button"
                          title="التفاصيل"
                          className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-500 hover:bg-emerald-500/10 hover:text-emerald-400"
                        >
                          <FaEye />
                        </button>

                        {/* Edit - للمحامي المستقل فقط */}
                        {isIndependentLawyer && (
                          <button
                            type="button"
                            title="تعديل"
                            onClick={() => {
                              setClient(client);
                              setOpenUpdateClient(true);
                            }}
                            className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-500 hover:bg-blue-500/10 hover:text-blue-400"
                          >
                            <FaEdit />
                          </button>
                        )}

                        {/* Delete - للمحامي المستقل فقط */}
                        {isIndependentLawyer && (
                          <button
                            onClick={() => {
                              setClient(client);
                              setOpenDeleteClient(true);
                            }}
                            type="button"
                            title="حذف"
                            className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-500 hover:bg-red-500/10 hover:text-red-400"
                          >
                            <FaTrash />
                          </button>
                        )}

                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>

        ) : (

          /* ================= CARDS ================= */

          <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">

            {paginatedClients.map((client) => (
              <div
                key={client._id}
                className="p-4 transition border rounded-xl border-slate-700 bg-slate-800 hover:border-slate-600"
              >

                {/* Card Header */}
                <div className="flex items-start justify-between gap-3">

                  <div className="flex items-center gap-3">

                    {client.profileImage?.url ? (
                      <img
                        src={client.profileImage.url}
                        alt={client.name}
                        className="object-cover rounded-full h-9 w-9 shrink-0"
                      />
                    ) : (
                      <div className="flex items-center justify-center rounded-full h-9 w-9 shrink-0 bg-slate-700 text-emerald-400">
                        <FaUser className="text-sm" />
                      </div>
                    )}

                    <div>
                      <h3 className="text-sm font-semibold text-white">
                        {client.name}
                      </h3>

                      <p className="mt-1 text-xs text-slate-500">
                        {client.phone || "لا يوجد هاتف"}
                      </p>
                    </div>

                  </div>

                  <span
                    className={`rounded-full px-2 py-1 text-[11px] ${
                      client.isActive
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "bg-red-500/10 text-red-400"
                    }`}
                  >
                    {client.isActive ? "نشط" : "غير نشط"}
                  </span>

                </div>

                {/* Card Info */}
                <div className="pt-3 mt-4 space-y-3 border-t border-slate-700">

                  <div className="flex justify-between gap-3 text-xs">
                    <span className="text-slate-500">
                      الرقم القومي
                    </span>

                    <span className="text-slate-300">
                      {client.nationalId || "-"}
                    </span>
                  </div>

                  <div className="flex justify-between gap-3 text-xs">
                    <span className="text-slate-500">
                      المدينة
                    </span>

                    <span className="text-slate-300">
                      {client.city || "-"}
                    </span>
                  </div>

                  <div className="flex justify-between gap-3 text-xs">
                    <span className="text-slate-500">
                      البريد
                    </span>

                    <span className="max-w-[180px] truncate text-slate-300">
                      {client.email || "-"}
                    </span>
                  </div>

                </div>

                {/* Card Actions */}
                <div className="flex justify-end gap-2 pt-3 mt-4 border-t border-slate-700">

                  {/* Details - متاح للجميع */}
                  <button
                    onClick={() => {
                      setClient(client);
                      setOpenDetails(true);
                    }}
                    type="button"
                    title="التفاصيل"
                    className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-500 hover:bg-emerald-500/10 hover:text-emerald-400"
                  >
                    <FaEye />
                  </button>

                  {/* Edit - للمحامي المستقل فقط */}
                  {isIndependentLawyer && (
                    <button
                      onClick={() => {
                        setClient(client);
                        setOpenUpdateClient(true);
                      }}
                      type="button"
                      title="تعديل"
                      className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-500 hover:bg-blue-500/10 hover:text-blue-400"
                    >
                      <FaEdit />
                    </button>
                  )}

                  {/* Delete - للمحامي المستقل فقط */}
                  {isIndependentLawyer && (
                    <button
                      onClick={() => {
                        setClient(client);
                        setOpenDeleteClient(true);
                      }}
                      type="button"
                      title="حذف"
                      className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-500 hover:bg-red-500/10 hover:text-red-400"
                    >
                      <FaTrash />
                    </button>
                  )}

                </div>

              </div>
            ))}

          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between p-4 border-t border-slate-700">

            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="flex items-center gap-1 text-xs transition text-slate-400 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
            >
              <FaChevronRight />
              السابق
            </button>

            <div className="flex items-center gap-1">

              {Array.from(
                { length: totalPages },
                (_, index) => index + 1
              ).map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`flex h-7 min-w-7 items-center justify-center rounded-md px-2 text-xs transition ${
                    currentPage === page
                      ? "bg-emerald-600 text-white"
                      : "text-slate-500 hover:bg-slate-700 hover:text-white"
                  }`}
                >
                  {page}
                </button>
              ))}

            </div>

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="flex items-center gap-1 text-xs transition text-slate-400 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
            >
              التالي
              <FaChevronLeft />
            </button>

          </div>
        )}

      </div>
    </>
  );
};

export default Table;