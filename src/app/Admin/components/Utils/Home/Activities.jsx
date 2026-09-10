"use client";

import React, { useContext } from "react";
import { FaHistory, FaCircle } from "react-icons/fa";
import { AdminContext } from "../../../../../Providers/AdminContext/Admin.js";

const Activities = () => {
  const { timeLine } = useContext(AdminContext);

  const activitiesData = Array.isArray(timeLine) ? timeLine.slice(0, 5) : [];

  const formatTime = (date) => {
    if (!date) return "";

    const activityDate = new Date(date);

    if (Number.isNaN(activityDate.getTime())) return "";

    return activityDate.toLocaleString("ar-EG", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="p-5 bg-white shadow-sm rounded-2xl">
      <h2 className="flex items-center gap-2 mb-4 text-lg font-semibold text-gray-800">
        <FaHistory className="text-gray-500" />
        سجل النشاطات
      </h2>

      <div className="relative pr-2 space-y-4 overflow-y-auto max-h-64">
        {/* Vertical line */}
        {activitiesData.length > 0 && (
          <div className="absolute right-[11px] top-2 bottom-2 w-0.5 bg-blue-100" />
        )}

        {activitiesData.length > 0 ? (
          activitiesData.map((activity) => (
            <div key={activity._id} className="relative flex gap-3">
              {/* Timeline dot */}
              <div className="relative z-10 flex-shrink-0 w-5 h-5 mt-0.5">
                <div className="absolute right-0 w-2.5 h-2.5 rounded-full bg-blue-500 ring-4 ring-blue-100" />
              </div>

              {/* Content */}
              <div className="flex-1 pb-2">
                <p className="text-sm font-medium text-gray-800">
                  {activity.title || "نشاط جديد"}
                </p>

                {activity.description && (
                  <p className="mt-1 text-xs text-gray-500">
                    {activity.description}
                  </p>
                )}

                <div className="flex flex-wrap gap-1 mt-1 text-xs text-gray-400">
                  <span>{formatTime(activity.createdAt)}</span>

                  {activity.createdBy?.name && (
                    <>
                      <span>•</span>
                      <span>بواسطة {activity.createdBy.name}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="py-8 text-sm text-center text-gray-400">
            لا توجد نشاطات حتى الآن
          </div>
        )}
      </div>
    </div>
  );
};

export default Activities;
