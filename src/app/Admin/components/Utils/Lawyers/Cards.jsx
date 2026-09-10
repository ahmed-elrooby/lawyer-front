'use client';

import React from 'react';
import {
  FaUsers,
  FaGavel,
  FaCalendarWeek,
  FaUserCheck,
  FaArrowUp,
  FaArrowDown,
  FaChartLine,
} from 'react-icons/fa';



const StatCard = ({
  title,
  value,
  change,
  trend,
  description,
  icon: Icon,
  iconBgColor,
  borderColor,
  trendColor,
}) => {
  const TrendIcon = trend === 'up' ? FaArrowUp : FaArrowDown;
  const trendBgColor = trend === 'up' ? 'bg-green-50' : 'bg-red-50';

  return (
    <div
      className={`bg-white rounded-2xl shadow-sm p-5 border-r-4 ${borderColor} transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-1 text-3xl font-bold text-gray-800">{value}</p>
          <div className={`flex items-center gap-1 mt-2 text-sm ${trendColor}`}>
            <span className={`inline-flex items-center justify-center rounded-full p-0.5 ${trendBgColor}`}>
              <TrendIcon className="text-xs" />
            </span>
            <span className="font-medium">{change}</span>
            <span className="mr-1 text-xs text-gray-400">{description}</span>
          </div>
        </div>
        <div className={`w-12 h-12 rounded-2xl ${iconBgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="text-2xl" />
        </div>
      </div>
      {/* Mini sparkline effect (optional decorative line) */}
      <div className="mt-3 h-0.5 w-full bg-gradient-to-r from-transparent via-gray-100 to-transparent"></div>
    </div>
  );
};

const StatsCards = () => {
  const statsData = [
    {
      title: 'عدد المحامين',
      value: '48',
      change: '+12%',
      trend: 'up' ,
      description: 'عن الشهر الماضي',
      icon: FaUsers,
      iconBgColor: 'bg-blue-100 text-blue-500',
      borderColor: 'border-blue-400',
      trendColor: 'text-green-600',
    },
    {
      title: 'القضايا النشطة',
      value: '124',
      change: '+8%',
      trend: 'up' ,
      description: 'عن الأسبوع الماضي',
      icon: FaGavel,
      iconBgColor: 'bg-emerald-100 text-emerald-500',
      borderColor: 'border-emerald-400',
      trendColor: 'text-green-600',
    },
    {
      title: 'الجلسات القادمة',
      value: '37',
      change: '-3%',
      trend: 'down' ,
      description: 'عن الأسبوع الماضي',
      icon: FaCalendarWeek,
      iconBgColor: 'bg-amber-100 text-amber-500',
      borderColor: 'border-amber-400',
      trendColor: 'text-red-500',
    },
    {
      title: 'المستخدمين النشطين',
      value: '32',
      change: '+5%',
      trend: 'up' ,
      description: 'خلال اليوم',
      icon: FaUserCheck,
      iconBgColor: 'bg-purple-100 text-purple-500',
      borderColor: 'border-purple-400',
      trendColor: 'text-green-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {statsData.map((stat, idx) => (
        <StatCard key={idx} {...stat} />
      ))}
    </div>
  );
};

export default StatsCards;