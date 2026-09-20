"use client";

import React, { useContext, useMemo } from "react";
import { MdOutlineShowChart } from "react-icons/md";
import { OwnerContext } from "../../../../../Providers/LawyerOwner/OwnerProvider.js";

const Operation = () => {
  const {
    cases = [],
    documents = [],
    lawyers = [],
  } = useContext(OwnerContext);

  const activities = useMemo(() => {
    const result = [];

    // القضايا
    cases.forEach((item) => {
      const createdAt = item?.createdAt
        ? new Date(item.createdAt)
        : null;

      const updatedAt = item?.updatedAt
        ? new Date(item.updatedAt)
        : null;

      const isUpdated =
        createdAt &&
        updatedAt &&
        updatedAt.getTime() > createdAt.getTime();

      result.push({
        id: `case-${item?._id}`,
        date: isUpdated ? updatedAt : createdAt,
        title: isUpdated
          ? `${item?.createdBy?.name || "المكتب"} حدّث قضية`
          : `${item?.createdBy?.name || "المكتب"} أضاف قضية جديدة`,
        description: item?.caseNumber
          ? `القضية رقم ${item.caseNumber}${
              item?.title ? ` - ${item.title}` : ""
            }`
          : "تمت إضافة قضية جديدة إلى النظام",
        color: isUpdated ? "#755B00" : "#000000",
      });
    });

    // المستندات
    documents.forEach((item) => {
      const date = item?.createdAt
        ? new Date(item.createdAt)
        : item?.updatedAt
        ? new Date(item.updatedAt)
        : null;

      result.push({
        id: `document-${item?._id}`,
        date,
        title: `${item?.uploadedBy?.name || "المكتب"} رفع مستندًا`,
        description:
          item?.name ||
          item?.originalName ||
          "تم رفع مستند قانوني جديد",
        color: "#755B00",
      });
    });

    // المحامين
    lawyers.forEach((item) => {
      const date = item?.createdAt
        ? new Date(item.createdAt)
        : item?.updatedAt
        ? new Date(item.updatedAt)
        : null;

      result.push({
        id: `lawyer-${item?._id}`,
        date,
        title: `${item?.name || "محامي"} انضم إلى الفريق`,
        description: "تمت إضافة محامٍ جديد إلى فريق المكتب",
        color: "#B91C1C",
      });
    });

    return result
      .filter((item) => item.date instanceof Date && !isNaN(item.date))
      .sort((a, b) => b.date - a.date)
      .slice(0, 5);
  }, [cases, documents, lawyers]);

  const formatTime = (date) => {
    return new Intl.DateTimeFormat("ar-EG", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(date);
  };

  return (
    <section className="p-6 bg-white border border-blue-100 rounded-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center h-8 w-8 justify-center rounded-lg bg-[#E5EEFF]">
            <MdOutlineShowChart />
          </div>

          <div>
            <h2 className="md:font-bold text-sm md:text-lg font-semibold text-[#0B1C30]">
              اليوم في المكتب
            </h2>

            <p className="text-[#45464D] text-xs">
              السجل المباشر للأنشطة القانونية
            </p>
          </div>
        </div>

        <span className="md:px-2 px-1 py-0.5 bg-[#DCE9FF] text-[#0B1C30] rounded-full text-xs">
          {activities.length} أحداث مسجلة
        </span>
      </div>

      <div className="relative w-full mt-4 space-y-4">
        <span className="absolute top-0 -right-[2px] h-full bg-[#DCE9FF] w-0.5" />

        {activities.length > 0 ? (
          activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start w-full gap-3"
            >
              <span
                className="w-4 h-4 bg-transparent border-4 rounded-full shrink-0"
                style={{ borderColor: activity.color }}
              />

              <div className="bg-[#EFF4FF] w-full p-2.5 rounded-xl flex items-start justify-between">
                <div>
                  <h3 className="text-[#0B1C30] mb-0.5 font-bold text-xs">
                    {activity.title}
                  </h3>

                  <p className="text-[#45464D] text-xs">
                    {activity.description}
                  </p>
                </div>

                <span className="text-[#45464D] font-semibold text-xs whitespace-nowrap">
                  {formatTime(activity.date)}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="py-6 text-center text-xs text-[#45464D]">
            لا توجد أنشطة مسجلة حتى الآن
          </div>
        )}
      </div>
    </section>
  );
};

export default Operation;