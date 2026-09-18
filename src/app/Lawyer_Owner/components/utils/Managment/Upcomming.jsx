import React from 'react';
import { MdOutlineCalendarMonth } from 'react-icons/md';

const UpcomingSessions = () => {
  // بيانات تجريبية مطابقة للصورة
  const sessions = [
    {
      id: 1,
      date: '18 سبتمبر',
      time: '10:30 ص',
      urgent: true,
      caseName: 'قضية أحمد محمد',
      caseNumber: '#1089',
      court: 'محكمة بني سويف',
      lawyerName: 'أحمد علي',
      lawyerInitials: 'أ.ع',
      avatarColor: '#111827',
      status: 'مجدولة',
    },
    {
      id: 2,
      date: '19 سبتمبر',
      time: '11:00 ص',
      caseName: 'قضية سارة محمود',
      caseNumber: '#1038',
      court: 'محكمة القاهرة',
      lawyerName: 'سارة محمود',
      lawyerInitials: 'س.م',
      avatarColor: '#1E3A5F',
      status: 'مجدولة',
    },
    {
      id: 3,
      date: '20 سبتمبر',
      time: '12:30 م',
      caseName: 'قضية محمد حسن',
      caseNumber: '#1021',
      court: 'محكمة الجيزة',
      lawyerName: 'محمد حسن',
      lawyerInitials: 'م.ح',
      avatarColor: '#134E4A',
      status: 'مؤكدة',
    },
    {
      id: 4,
      date: '22 سبتمبر',
      time: '09:30 ص',
      caseName: 'نزاع عقاري وتوريد',
      caseNumber: '#984',
      court: 'محكمة شمال القاهرة',
      lawyerName: 'يوسف أحمد',
      lawyerInitials: 'ي.ا',
      avatarColor: '#0F766E',
      status: 'مجدولة',
    },
  ];

  return (
    // الحاوية الرئيسية مع اتجاه RTL
    <div  className="p-6 font-sans bg-white border border-blue-100 rounded-xl shadow-sm-xl">

      {/* رأس المكون (Header) */}
      <div className="flex items-center justify-between pb-4 mb-4 ">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 bg-[#E5EEFF] rounded-xl shrink-0">
            <MdOutlineCalendarMonth className="text-[#2E63F0]" size={18} />
          </div>
          <div>
            <h2 className="text-[#0B1C30] font-bold text-base leading-tight">الجلسات القادمة</h2>
            <p className="text-[#8A8C94] text-xs mt-0.5">المواعيد القضائية الملزمة للأيام المقبلة</p>
          </div>
        </div>
        <span className="text-[#8A8C94] text-xs">أجندة المحاكم</span>
      </div>

      {/* الجدول (Table) */}
      <div className="">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#EFF4FF]">
              <th className="px-1 py-2 font-bold text-[10px] text-[#0B1C30]">التاريخ والوقت</th>
              <th className="px-1 py-2 font-bold text-[10px] text-[#0B1C30]">القضية</th>
              <th className="px-1 py-2 font-bold text-[10px] text-[#0B1C30]">المحكمة</th>
              <th className="px-1 py-2 font-bold text-[10px] text-[#0B1C30]">المحامي</th>
              <th className="px-1 py-2 font-bold text-[10px] text-[#0B1C30]">الحالة</th>
            </tr>
          </thead>
          <tbody className="">
            {sessions.map((session) => (
              <tr key={session.id} className="transition-colors hover:bg-gray-50">
                {/* التاريخ والوقت */}
                <td className="px-2.5 py-2">
                  <div className="text-[10px] font-bold text-gray-900">{session.date}</div>
                  <div className={`text-[10px] ${session.urgent ? 'text-red-500 ' : 'text-gray-500'}`}>
                    {session.time}
                  </div>
                </td>

                {/* القضية */}
                <td className="px-2.5 py-2">
                  <div className="text-[10px] text-gray-900">{session.caseName}</div>
                  <div className="text-[10px] text-gray-400">{session.caseNumber}</div>
                </td>

                {/* المحكمة */}
                <td className="px-2.5 py-2 text-[10px] text-gray-700">{session.court}</td>

                {/* المحامي */}
                <td className="px-2.5 py-2">
                  <div className="flex items-center gap-1.5">
                    <div
                      className="flex items-center justify-center w-6 h-6 text-[10px]  text-white rounded-full "
                      style={{ backgroundColor: session.avatarColor }}
                    >
                      {session.lawyerInitials}
                    </div>
                    <span className="text-[10px] text-gray-700">{session.lawyerName}</span>
                  </div>
                </td>

                {/* الحالة */}
                <td className="px-2.5 py-2">
                  <span
                    className={`inline-block px-2.5 py-1 rounded-full text-[10px] ${
                      session.status === 'مؤكدة'
                        ? 'bg-gray-100 text-gray-600'
                        : 'bg-indigo-50 text-indigo-500'
                    }`}
                  >
                    {session.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* تذييل المكون (Footer) */}
      <div className="flex items-center justify-between pt-4 mt-2 text-sm border-t border-gray-100">
        <a href="#" className="font-medium text-blue-600 hover:underline">
          عرض كل الجلسات
        </a>
        <div className="text-gray-500">
          إجمالي الجلسات المبرمجة هذا الأسبوع: <span className="font-bold text-gray-800">12</span> جلسة
        </div>
      </div>
    </div>
  );
};

export default UpcomingSessions;