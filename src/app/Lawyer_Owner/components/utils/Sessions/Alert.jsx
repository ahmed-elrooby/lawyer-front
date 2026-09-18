import React from "react";
import {
  BellRing,
  Clock3,
  AlertTriangle,
  FileWarning,
  CalendarClock,
  ChevronLeft,
  MapPin,
  UserRound,
  CheckCircle2,
} from "lucide-react";

const UpcomingImportantAlerts = () => {
  const upcomingSessions = [
    {
      id: 1,
      time: "بعد 35 دقيقة",
      hour: "10:30 ص",
      caseName: "قضية أحمد محمود عبد الله",
      caseNumber: "#1031",
      lawyer: "خالد عبد الرحمن",
      court: "محكمة جنوب القاهرة",
      chamber: "الدائرة 8",
      priority: "عاجل",
    },
    {
      id: 2,
      time: "بعد ساعتين",
      hour: "12:00 م",
      caseName: "قضية مؤسسة المستقبل",
      caseNumber: "#1048",
      lawyer: "محمد أحمد حسن",
      court: "محكمة الجيزة",
      chamber: "الدائرة 5",
      priority: "متوسط",
    },
    {
      id: 3,
      time: "بعد 4 ساعات",
      hour: "02:00 م",
      caseName: "قضية شركة الأمل",
      caseNumber: "#1106",
      lawyer: "ياسر إبراهيم",
      court: "محكمة الجيزة",
      chamber: "الدائرة 7",
      priority: "عادي",
    },
  ];

  const alerts = [
    {
      id: 1,
      type: "urgent",
      icon: <AlertTriangle size={16} />,
      title: "جلسة تبدأ قريباً",
      description:
        "جلسة قضية أحمد محمود عبد الله ستبدأ خلال 35 دقيقة.",
      time: "منذ 5 دقائق",
      action: "عرض الجلسة",
    },
    {
      id: 2,
      type: "warning",
      icon: <FileWarning size={16} />,
      title: "مستندات تحتاج مراجعة",
      description:
        "هناك 3 مستندات مرتبطة بجلسات اليوم لم تتم مراجعتها بعد.",
      time: "منذ 18 دقيقة",
      action: "مراجعة المستندات",
    },
    {
      id: 3,
      type: "info",
      icon: <CalendarClock size={16} />,
      title: "جلسة مؤجلة تحتاج متابعة",
      description:
        "جلسة القضية رقم #1130 تم تأجيلها وتحتاج إلى تحديد موعد جديد.",
      time: "منذ ساعة",
      action: "متابعة الجلسة",
    },
    {
      id: 4,
      type: "success",
      icon: <CheckCircle2 size={16} />,
      title: "تم تحديث جلسة",
      description:
        "تم تحديث بيانات جلسة قضية شركة النور التجارية بنجاح.",
      time: "منذ ساعتين",
      action: "عرض التفاصيل",
    },
  ];

  const alertStyles = {
    urgent: {
      wrapper: "border-[#F1D5D5] bg-[#FFF9F9]",
      icon: "bg-[#FCE8E8] text-[#B44E4E]",
      title: "text-[#9D4545]",
    },
    warning: {
      wrapper: "border-[#F0E2B9] bg-[#FFFCF4]",
      icon: "bg-[#FFF2CC] text-[#9A7800]",
      title: "text-[#806500]",
    },
    info: {
      wrapper: "border-[#D8E1F4] bg-[#F8FAFF]",
      icon: "bg-[#EAF0FF] text-[#4A67A8]",
      title: "text-[#405B96]",
    },
    success: {
      wrapper: "border-[#D5EBDD] bg-[#F8FCF9]",
      icon: "bg-[#E6F5EB] text-[#258055]",
      title: "text-[#24724D]",
    },
  };

  const priorityStyles = {
    عاجل: "bg-[#FCE8E8] text-[#B44E4E]",
    متوسط: "bg-[#FFF2CC] text-[#8D7100]",
    عادي: "bg-[#EEF2F8] text-[#5E6B80]",
  };

  return (
    <section dir="rtl" className="mt-6 w-full">
      <div className="overflow-hidden rounded-2xl border border-[#E7EAF0] bg-white">

        {/* Header */}
        <div className="border-b border-[#EEF0F4] px-5 py-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            <div className="flex items-center gap-3">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF4D9] text-[#947300]">
                <BellRing size={19} />

                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#B44E4E] px-1 text-[8px] font-bold text-white">
                  4
                </span>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-[17px] font-bold text-[#0B1C30]">
                    التنبيهات والجلسات القادمة
                  </h2>

                  <span className="rounded-full bg-[#FFF2D3] px-2 py-1 text-[9px] font-bold text-[#8A6D00]">
                    4 تنبيهات
                  </span>
                </div>

                <p className="mt-1 text-[11px] text-[#7A818C]">
                  أهم التنبيهات والجلسات التي تحتاج إلى انتباه ومتابعة
                </p>
              </div>
            </div>

            <button className="flex items-center justify-center gap-2 rounded-lg border border-[#E3E6EC] px-3.5 py-2 text-[10px] font-semibold text-[#626A76] transition hover:bg-[#F7F8FA]">
              عرض كل التنبيهات
              <ChevronLeft size={13} />
            </button>

          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-5 p-5 xl:grid-cols-[1.1fr_1.9fr]">

          {/* Upcoming Sessions */}
          <div className="rounded-2xl border border-[#EEF0F4] bg-[#FCFDFE] p-4">

            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-[13px] font-bold text-[#273243]">
                  الجلسات القادمة
                </h3>

                <p className="mt-1 text-[9px] text-[#969DA7]">
                  أقرب الجلسات المجدولة اليوم
                </p>
              </div>

              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EEF3FF] text-[#4A67A8]">
                <CalendarClock size={15} />
              </div>
            </div>

            <div className="space-y-2.5">

              {upcomingSessions.map((session) => (
                <div
                  key={session.id}
                  className="group rounded-xl border border-[#E9ECF1] bg-white p-3.5 transition hover:border-[#D4DAE5] hover:shadow-sm"
                >
                  <div className="flex items-start gap-3">

                    {/* Time */}
                    <div className="flex w-[58px] shrink-0 flex-col items-center rounded-lg bg-[#F5F7FA] px-2 py-2">
                      <Clock3
                        size={13}
                        className="text-[#667286]"
                      />

                      <span className="mt-1 text-[10px] font-bold text-[#3E4858]">
                        {session.hour}
                      </span>
                    </div>

                    {/* Info */}
                    <div className="min-w-0 flex-1">

                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="truncate text-[11px] font-bold text-[#293342]">
                            {session.caseName}
                          </p>

                          <p className="mt-1 text-[9px] text-[#9198A3]">
                            {session.caseNumber}
                          </p>
                        </div>

                        <span
                          className={`shrink-0 rounded-full px-2 py-1 text-[8px] font-bold ${priorityStyles[session.priority]}`}
                        >
                          {session.priority}
                        </span>
                      </div>

                      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5">

                        <span className="flex items-center gap-1 text-[9px] text-[#737C89]">
                          <UserRound size={11} />
                          {session.lawyer}
                        </span>

                        <span className="flex items-center gap-1 text-[9px] text-[#737C89]">
                          <MapPin size={11} />
                          {session.court}
                        </span>

                      </div>

                      <div className="mt-2.5 flex items-center justify-between">
                        <span className="text-[9px] font-semibold text-[#8A919C]">
                          {session.time}
                        </span>

                        <button className="text-[9px] font-bold text-[#4A67A8] opacity-0 transition group-hover:opacity-100">
                          التفاصيل
                        </button>
                      </div>

                    </div>

                  </div>
                </div>
              ))}

            </div>
          </div>

          {/* Alerts */}
          <div className="rounded-2xl border border-[#EEF0F4] bg-[#FCFDFE] p-4">

            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-[13px] font-bold text-[#273243]">
                  التنبيهات المهمة
                </h3>

                <p className="mt-1 text-[9px] text-[#969DA7]">
                  آخر التنبيهات التي تحتاج إلى متابعة
                </p>
              </div>

              <span className="text-[9px] text-[#9298A2]">
                آخر تحديث منذ 5 دقائق
              </span>
            </div>

            <div className="space-y-2.5">

              {alerts.map((alert) => {
                const style = alertStyles[alert.type];

                return (
                  <div
                    key={alert.id}
                    className={`group flex items-start gap-3 rounded-xl border p-3.5 transition hover:shadow-sm ${style.wrapper}`}
                  >

                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${style.icon}`}
                    >
                      {alert.icon}
                    </div>

                    <div className="min-w-0 flex-1">

                      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                        <p
                          className={`text-[11px] font-bold ${style.title}`}
                        >
                          {alert.title}
                        </p>

                        <span className="text-[8px] text-[#9A9FA7]">
                          {alert.time}
                        </span>
                      </div>

                      <p className="mt-1.5 max-w-2xl text-[9px] leading-5 text-[#777F8B]">
                        {alert.description}
                      </p>

                      <button
                        className={`mt-2 flex items-center gap-1 text-[9px] font-bold ${style.title}`}
                      >
                        {alert.action}
                        <ChevronLeft size={11} />
                      </button>

                    </div>

                  </div>
                );
              })}

            </div>
          </div>

        </div>

        {/* Bottom Summary */}
        <div className="border-t border-[#EEF0F4] bg-[#FAFBFC] px-5 py-4">

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E9F7EF] text-[#258055]">
                <CheckCircle2 size={14} />
              </div>

              <div>
                <p className="text-[10px] font-bold text-[#394352]">
                  حالة المتابعة
                </p>

                <p className="mt-0.5 text-[9px] text-[#8D949E]">
                  لا توجد تنبيهات حرجة غير معالجة
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-[9px] text-[#7D858F]">

              <span>
                <strong className="text-[#B44E4E]">1</strong> عاجل
              </span>

              <span>
                <strong className="text-[#967700]">1</strong> يحتاج مراجعة
              </span>

              <span>
                <strong className="text-[#4A67A8]">2</strong> معلومات
              </span>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default UpcomingImportantAlerts;