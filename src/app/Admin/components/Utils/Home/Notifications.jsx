'use client';

import React from 'react';
import {
  FaBell,
  FaUserPlus,
  FaHourglassHalf,
  FaChartLine,
  FaGavel,
} from 'react-icons/fa';

const Notifications = () => {
  const notificationsData = [
    {
      id: 1,
      icon: FaUserPlus,
      iconColor: 'text-blue-400',
      message: 'تم إضافة محامي جديد: <strong>نورة السديري</strong>',
      time: 'منذ ساعة',
    },
    {
      id: 2,
      icon: FaHourglassHalf,
      iconColor: 'text-orange-400',
      message: 'اشتراك المحامي خالد على وشك الانتهاء (باقي 3 أيام)',
      time: 'منذ 5 ساعات',
    },
    {
      id: 3,
      icon: FaChartLine,
      iconColor: 'text-green-400',
      message: 'تم إنشاء تقرير الأداء الشهري الجديد',
      time: 'أمس',
    },
    {
      id: 4,
      icon: FaGavel,
      iconColor: 'text-purple-400',
      message: 'تم إضافة قضية جديدة بقسم التجاري',
      time: 'أمس',
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm p-2 md:p-5">
      <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
        <FaBell className="text-amber-500" />
        الإشعارات
      </h2>

      <div className="space-y-3">
        {notificationsData.map((notif) => {
          const Icon = notif.icon;
          return (
            <div
              key={notif.id}
              className="flex items-start gap-3 p-2 rounded-xl hover:bg-gray-50 transition duration-150"
            >
              <Icon className={`${notif.iconColor} mt-1 flex-shrink-0`} />
              <div>
                <p
                  className="text-sm"
                  dangerouslySetInnerHTML={{ __html: notif.message }}
                />
                <p className="text-xs text-gray-400 mt-0.5">{notif.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Notifications;