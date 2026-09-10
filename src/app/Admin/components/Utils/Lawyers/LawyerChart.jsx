'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { FaChartPie, FaChartBar } from 'react-icons/fa';

const LawyersCharts = () => {
  // بيانات توزيع المحامين حسب الحالة
  const statusData = [
    { name: 'نشط', value: 48, color: '#10B981' },
    { name: 'غير نشط', value: 12, color: '#EF4444' },
    { name: 'معلق', value: 8, color: '#F59E0B' },
  ];

  // بيانات المحامين المضافة خلال الأشهر الستة الماضية
  const monthlyData = [
    { month: 'يناير', count: 12 },
    { month: 'فبراير', count: 19 },
    { month: 'مارس', count: 15 },
    { month: 'أبريل', count: 25 },
    { month: 'مايو', count: 22 },
    { month: 'يونيو', count: 18 },
  ];



  return (
    <div className="space-y-6">
      {/* عنوان القسم */}
      <div className="flex items-center gap-2 mb-2">
        <FaChartPie className="text-xl text-blue-500" />
        <h3 className="text-lg font-semibold text-gray-800">إحصائيات المحامين</h3>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* المخطط الدائري: توزيع الحالة */}
        <div className="p-1 bg-white shadow-sm md:p-5 rounded-2xl">
          <h4 className="flex items-center gap-2 mb-4 font-medium text-gray-700 text-md">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            توزيع المحامين حسب الحالة
          </h4>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} محامي`, 'العدد']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* المخطط العمودي: الإضافات الشهرية */}
        <div className="p-1 bg-white shadow-sm md:p-5 rounded-2xl">
          <h4 className="flex items-center gap-2 mb-4 font-medium text-gray-700 text-md">
            <FaChartBar className="text-blue-400" />
            عدد المحامين المضافة شهرياً
          </h4>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value} محامي`, 'الإضافات']} />
              <Bar dataKey="count" fill="#3B82F6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

      
      </div>
    </div>
  );
};

export default LawyersCharts;