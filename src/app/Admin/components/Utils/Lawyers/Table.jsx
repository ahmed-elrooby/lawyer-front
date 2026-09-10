'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FaSearch,
  FaEye,
  FaEdit,
  FaTrashAlt,
  FaCircle,
  FaBan,
  FaUserCheck,
  FaChevronLeft,
  FaChevronRight,
  FaTable,
  FaThLarge,
} from 'react-icons/fa';


const LawyersTable = () => {
  const [lawyers, setLawyers] = useState([
    {
      id: 1,
      name: 'د. محمد العتيبي',
      email: 'mohammed@example.com',
      phone: '0501234567',
      status: 'active',
      registeredAt: '2025-04-15',
    },
    {
      id: 2,
      name: 'نورة السديري',
      email: 'noura@example.com',
      phone: '0559876543',
      status: 'active',
      registeredAt: '2025-05-10',
    },
    {
      id: 3,
      name: 'خالد الزهراني',
      email: 'khalid@example.com',
      phone: '0561122334',
      status: 'inactive',
      registeredAt: '2025-05-18',
    },
    {
      id: 4,
      name: 'ريما الغامدي',
      email: 'rima@example.com',
      phone: '0544455667',
      status: 'active',
      registeredAt: '2025-05-20',
    },
    {
      id: 5,
      name: 'عبدالله الفهد',
      email: 'abdullah@example.com',
      phone: '0589988776',
      status: 'suspended',
      registeredAt: '2025-05-19',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'grid'
  const itemsPerPage = 6; // زيادة قليلاً لمناسبة شكل الشبكة

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return {
          text: 'نشط',
          className: 'bg-green-100 text-green-700',
          icon: <FaCircle className="text-[8px]" />,
        };
      case 'inactive':
        return {
          text: 'غير نشط',
          className: 'bg-red-100 text-red-600',
          icon: <FaBan className="text-xs" />,
        };
      case 'suspended':
        return {
          text: 'معلق',
          className: 'bg-amber-100 text-amber-700',
          icon: <FaUserCheck className="text-xs" />,
        };
      default:
        return { text: 'غير معروف', className: 'bg-gray-100 text-gray-600', icon: null };
    }
  };

  const filteredLawyers = lawyers.filter(
    (lawyer) =>
      lawyer.name.includes(searchTerm) ||
      lawyer.email.includes(searchTerm) ||
      lawyer.phone.includes(searchTerm)
  );

  const totalPages = Math.ceil(filteredLawyers.length / itemsPerPage);
  const paginatedLawyers = filteredLawyers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = (id) => {
    if (confirm('هل أنت متأكد من حذف هذا المحامي؟')) {
      setLawyers(lawyers.filter((lawyer) => lawyer.id !== id));
    }
  };

  return (
    <div className="p-2 mt-6 bg-white shadow-sm md:p-5 rounded-2xl">
      {/* الرأس: عنوان + بحث + زر التبديل */}
      <div className="flex flex-col items-center justify-between gap-4 mb-5 sm:flex-row">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
          📋 قائمة المحامين
        </h3>
        <div className="flex items-center w-full gap-3 sm:w-auto">
          {/* زر تبديل العرض */}
          <div className="flex p-1 bg-gray-100 rounded-lg">
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-md transition ${
                viewMode === 'table'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              title="عرض جدول"
            >
              <FaTable />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition ${
                viewMode === 'grid'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              title="عرض شبكة (بطاقات)"
            >
              <FaThLarge />
            </button>
          </div>
          {/* شريط البحث */}
          <div className="relative w-full sm:w-72">
            <FaSearch className="absolute text-sm text-gray-400 -translate-y-1/2 right-3 top-1/2" />
            <input
              type="text"
              placeholder="بحث باسم أو بريد أو هاتف..."
              className="w-full py-2 pl-4 pr-10 text-sm border border-gray-200 outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-blue-200"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>
      </div>

      {/* عرض الجدول (عند اختيار table) */}
      {viewMode === 'table' && (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead className="text-sm text-gray-500 bg-gray-50">
              <tr>
                <th className="p-3 text-right">الاسم</th>
                <th className="p-3 text-right">البريد الإلكتروني</th>
                <th className="p-3 text-right">الهاتف</th>
                <th className="p-3 text-right">الحالة</th>
                <th className="p-3 text-right">تاريخ التسجيل</th>
                <th className="p-3 text-right">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedLawyers.map((lawyer) => {
                const badge = getStatusBadge(lawyer.status);
                return (
                  <tr key={lawyer.id} className="transition hover:bg-gray-50">
                    <td className="p-3 font-medium text-gray-800">{lawyer.name}</td>
                    <td className="p-3 text-gray-600">{lawyer.email}</td>
                    <td className="p-3 text-gray-600">{lawyer.phone}</td>
                    <td className="p-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${badge.className}`}
                      >
                        {badge.icon && badge.icon}
                        {badge.text}
                      </span>
                    </td>
                    <td className="p-3 text-gray-500">
                      {new Date(lawyer.registeredAt).toLocaleDateString('ar-EG')}
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <Link
                          href={`/lawyers/${lawyer.id}`}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <FaEye />
                        </Link>
                        <Link
                          href={`/lawyers/edit/${lawyer.id}`}
                          className="text-amber-500 hover:text-amber-700"
                        >
                          <FaEdit />
                        </Link>
                        <button
                          onClick={() => handleDelete(lawyer.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FaTrashAlt />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* عرض الشبكة (عند اختيار grid) */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {paginatedLawyers.map((lawyer) => {
            const badge = getStatusBadge(lawyer.status);
            return (
              <div
                key={lawyer.id}
                className="p-4 transition bg-white border border-gray-100 shadow-sm rounded-2xl hover:shadow-md"
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-lg font-bold text-gray-800">{lawyer.name}</h4>
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${badge.className}`}
                  >
                    {badge.icon && badge.icon}
                    {badge.text}
                  </span>
                </div>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-600">
                    <span className="font-medium">✉️ البريد:</span> {lawyer.email}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">📞 الهاتف:</span> {lawyer.phone}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">📅 التسجيل:</span>{' '}
                    {new Date(lawyer.registeredAt).toLocaleDateString('ar-EG')}
                  </p>
                </div>
                <div className="flex gap-4 pt-3 mt-4 border-t border-gray-100">
                  <Link
                    href={`/lawyers/${lawyer.id}`}
                    className="flex items-center gap-1 text-blue-500 hover:text-blue-700"
                  >
                    <FaEye /> عرض
                  </Link>
                  <Link
                    href={`/lawyers/edit/${lawyer.id}`}
                    className="flex items-center gap-1 text-amber-500 hover:text-amber-700"
                  >
                    <FaEdit /> تعديل
                  </Link>
                  <button
                    onClick={() => handleDelete(lawyer.id)}
                    className="flex items-center gap-1 text-red-500 hover:text-red-700"
                  >
                    <FaTrashAlt /> حذف
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-3 mt-5 border-t border-gray-100">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-lg text-sm flex items-center gap-1 ${
              currentPage === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <FaChevronRight className="text-xs" /> السابق
          </button>
          <span className="text-sm text-gray-600">
            صفحة {currentPage} من {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded-lg text-sm flex items-center gap-1 ${
              currentPage === totalPages
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            التالي <FaChevronLeft className="text-xs" />
          </button>
        </div>
      )}

      {filteredLawyers.length === 0 && (
        <div className="py-10 text-center text-gray-400">لا يوجد محامون مطابقون للبحث</div>
      )}
    </div>
  );
};

export default LawyersTable;