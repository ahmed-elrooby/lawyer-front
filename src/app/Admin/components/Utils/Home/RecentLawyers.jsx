"use client";

import React, { useContext, useMemo } from "react";
import Link from "next/link";
import { FaUserPlus, FaCircle, FaBan } from "react-icons/fa";
import { AdminContext } from "../../../../../Providers/AdminContext/Admin.js";

const RecentLawyers = () => {
  const { lawyers } = useContext(AdminContext);

  const lawyersData = useMemo(() => {
    if (!Array.isArray(lawyers)) return [];

    return [...lawyers]
      .filter((lawyer) => lawyer?.createdAt)
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
      .slice(0, 5);
  }, [lawyers]);

  const getStatusBadge = (isActive) => {
    if (isActive) {
      return {
        text: "نشط",
        className: "bg-green-100 text-green-700",
        icon: <FaCircle className="text-[8px]" />,
      };
    }

    return {
      text: "غير نشط",
      className: "bg-red-100 text-red-600",
      icon: <FaBan className="text-xs" />,
    };
  };

  return (
    <div className="p-5 bg-white shadow-sm rounded-2xl">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
          <FaUserPlus className="text-blue-500" />
          أحدث المحامين
        </h2>

        <Link
          href="/Admin/lawyersPage"
          className="text-sm text-blue-600 hover:underline"
        >
          عرض الكل ←
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full max-w-[600px]">
          <thead className="text-sm text-gray-500 bg-gray-50">
            <tr>
              <th className="p-3 text-right">الاسم</th>
              <th className="p-3 text-right">الحالة</th>
              <th className="p-3 text-right">تاريخ الإنشاء</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {lawyersData.length > 0 ? (
              lawyersData.map((lawyer) => {
                const badge = getStatusBadge(lawyer.isActive);

                return (
                  <tr key={lawyer._id} className="transition hover:bg-gray-50">
                    <td className="p-3 font-medium text-gray-800">
                      {lawyer.name || "بدون اسم"}
                    </td>

                    <td className="p-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${badge.className}`}
                      >
                        {badge.icon}
                        {badge.text}
                      </span>
                    </td>

                    <td className="p-3 text-gray-500">
                      {new Date(lawyer.createdAt).toLocaleDateString("ar-EG")}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan="3"
                  className="p-6 text-sm text-center text-gray-400"
                >
                  لا يوجد محامون
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentLawyers;
