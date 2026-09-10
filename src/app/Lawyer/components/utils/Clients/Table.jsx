"use client";

import React, { useState, useMemo } from "react";
import {
  Briefcase,
  Calendar,
  FolderOpen,
  CheckSquare,
  Eye,
  Edit,
  Trash2,
  ChevronRight,
  ChevronLeft,
  UserCheck,
  AlertTriangle,
  Search,
} from "lucide-react";

// Sample client data
const allClients = [
  {
    id: 5,
    name: "ليلى السعيد",
    phone: "0561122334",
    casesCount: 1,
    upcomingSessions: 2,
    lastActivity: "منذ ساعات",
    status: "active",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
  },
  {
    id: 4,
    name: "مؤسسة البناء الحديث",
    phone: "0598765432",
    casesCount: 7,
    upcomingSessions: 1,
    lastActivity: "منذ يومين",
    status: "active",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    id: 3,
    name: "نورة الحارثي",
    phone: "0556789123",
    casesCount: 2,
    upcomingSessions: 0,
    lastActivity: "منذ 5 أيام",
    status: "inactive",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    id: 2,
    name: "شركة التقنية المتقدمة",
    phone: "0112345678",
    casesCount: 12,
    upcomingSessions: 3,
    lastActivity: "منذ 3 ساعات",
    status: "active",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    id: 1,
    name: "أحمد المنصوري",
    phone: "0501234567",
    casesCount: 4,
    upcomingSessions: 2,
    lastActivity: "منذ ساعة",
    status: "active",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
  },
];

const getStatusBadge = (status) => {
  if (status === "active") {
    return {
      text: "نشط",
      className: "bg-emerald-900/40 text-emerald-300",
      icon: UserCheck,
    };
  }
  return {
    text: "غير نشط",
    className: "bg-rose-900/40 text-rose-300",
    icon: AlertTriangle,
  };
};

const Table = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter clients based on search term (name or phone)
  const filteredClients = useMemo(() => {
    if (!searchTerm.trim()) return allClients;
    const term = searchTerm.trim().toLowerCase();
    return allClients.filter(
      (client) =>
        client.name.toLowerCase().includes(term) ||
        client.phone.includes(term)
    );
  }, [searchTerm]);

  // Pagination logic applied to filtered data
  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedClients = filteredClients.slice(startIndex, startIndex + itemsPerPage);

  // Reset to page 1 when filter changes
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  // Avatar helper (fallback if image fails)
  const ClientAvatar = ({ src, name }) => (
    <div className="flex items-center justify-center w-10 h-10 overflow-hidden border rounded-full border-emerald-500 bg-slate-700">
      {src ? (
        <img src={src} alt={name} className="object-cover w-full h-full" />
      ) : (
        <span className="text-sm font-bold text-white">{name.charAt(0)}</span>
      )}
    </div>
  );

  return (
    <div className="mt-6 overflow-hidden border shadow-xl rounded-2xl bg-slate-800/60 border-slate-700">
      {/* Search Bar */}
      <div className="p-4 border-b border-slate-700">
        <div className="relative">
          <Search className="absolute w-4 h-4 -translate-y-1/2 right-3 top-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="ابحث باسم العميل أو رقم الهاتف..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full py-2 pl-4 pr-10 text-sm text-white border bg-slate-800 border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none placeholder:text-slate-500"
          />
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden overflow-x-auto md:block">
        <table className="min-w-full divide-y divide-slate-700">
          <thead className="sticky top-0 bg-slate-800">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-right uppercase text-slate-400">
                صورة العميل
              </th>
              <th className="px-6 py-4 text-xs font-bold text-right uppercase text-slate-400">
                الاسم
              </th>
              <th className="px-6 py-4 text-xs font-bold text-right uppercase text-slate-400">
                رقم الهاتف
              </th>
              <th className="px-6 py-4 text-xs font-bold text-right uppercase text-slate-400">
                عدد القضايا
              </th>
              <th className="px-6 py-4 text-xs font-bold text-right uppercase text-slate-400">
                عدد الجلسات القادمة
              </th>
              <th className="px-6 py-4 text-xs font-bold text-right uppercase text-slate-400">
                آخر نشاط
              </th>
              <th className="px-6 py-4 text-xs font-bold text-right uppercase text-slate-400">
                الحالة
              </th>
              <th className="px-6 py-4 text-xs font-bold text-right uppercase text-slate-400">
                إجراءات سريعة
              </th>
              <th className="px-6 py-4 text-xs font-bold text-right uppercase text-slate-400">
                إجراءات
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {paginatedClients.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-6 py-12 text-center text-slate-400">
                  لا يوجد عملاء مطابقون للبحث
                </td>
              </tr>
            ) : (
              paginatedClients.map((client) => {
                const badge = getStatusBadge(client.status);
                const StatusIcon = badge.icon;
                return (
                  <tr
                    key={client.id}
                    className="transition duration-200 hover:bg-slate-700/40"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <ClientAvatar src={client.image} name={client.name} />
                    </td>
                    <td className="px-6 py-4 font-semibold text-white whitespace-nowrap">
                      {client.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-300">
                      {client.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs rounded-full bg-slate-700 text-slate-200">
                        {client.casesCount} قضية
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs rounded-full bg-amber-900/30 text-amber-300">
                        {client.upcomingSessions} جلسة
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-400">
                      {client.lastActivity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${badge.className}`}
                      >
                        <StatusIcon className="w-3 h-3" />
                        {badge.text}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        <button className="transition text-emerald-400 hover:scale-110">
                          <Briefcase className="w-4 h-4" />
                        </button>
                        <button className="text-blue-400 transition hover:scale-110">
                          <Calendar className="w-4 h-4" />
                        </button>
                        <button className="text-purple-400 transition hover:scale-110">
                          <FolderOpen className="w-4 h-4" />
                        </button>
                        <button className="transition text-amber-400 hover:scale-110">
                          <CheckSquare className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        <button className="transition text-emerald-400 hover:scale-110">
                          <Eye className="w-5 h-5" />
                        </button>
                        <button className="text-blue-400 transition hover:scale-110">
                          <Edit className="w-5 h-5" />
                        </button>
                        <button className="text-red-400 transition hover:scale-110">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="divide-y md:hidden divide-slate-700">
        {paginatedClients.length === 0 ? (
          <div className="p-8 text-center text-slate-400">
            لا يوجد عملاء مطابقون للبحث
          </div>
        ) : (
          paginatedClients.map((client) => {
            const badge = getStatusBadge(client.status);
            const StatusIcon = badge.icon;
            return (
              <div key={client.id} className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <ClientAvatar src={client.image} name={client.name} />
                    <div>
                      <p className="font-semibold text-white">{client.name}</p>
                      <p className="text-sm text-slate-400">{client.phone}</p>
                    </div>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${badge.className}`}
                  >
                    <StatusIcon className="w-3 h-3" />
                    {badge.text}
                  </span>
                </div>
                <div className="flex flex-wrap gap-3 text-sm">
                  <span className="px-2 py-1 text-xs rounded-full bg-slate-700 text-slate-200">
                    📋 {client.casesCount} قضية
                  </span>
                  <span className="px-2 py-1 text-xs rounded-full bg-amber-900/30 text-amber-300">
                    🗓️ {client.upcomingSessions} جلسة
                  </span>
                  <span className="text-xs text-slate-400">
                    🕒 {client.lastActivity}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-700">
                  <div className="flex gap-3">
                    <button className="text-emerald-400">
                      <Briefcase className="w-4 h-4" />
                    </button>
                    <button className="text-blue-400">
                      <Calendar className="w-4 h-4" />
                    </button>
                    <button className="text-purple-400">
                      <FolderOpen className="w-4 h-4" />
                    </button>
                    <button className="text-amber-400">
                      <CheckSquare className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex gap-3">
                    <button className="text-emerald-400">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="text-blue-400">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="text-red-400">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between p-4 border-t border-slate-700">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition ${
              currentPage === 1
                ? "bg-slate-700 text-slate-500 cursor-not-allowed"
                : "bg-slate-700 text-slate-200 hover:bg-slate-600"
            }`}
          >
            <ChevronRight className="w-4 h-4" /> السابق
          </button>
          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`w-8 h-8 rounded-lg text-sm font-medium transition ${
                  page === currentPage
                    ? "bg-emerald-600 text-white"
                    : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition ${
              currentPage === totalPages
                ? "bg-slate-700 text-slate-500 cursor-not-allowed"
                : "bg-slate-700 text-slate-200 hover:bg-slate-600"
            }`}
          >
            التالي <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Table;