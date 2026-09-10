"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle, Clock, AlertCircle } from "lucide-react";

const Tasks = () => {
  const tasksData = [
    {
      id: 1,
      title: "مراجعة العقد",
      dueDate: "2025-05-18",
      status: "قيد التنفيذ",
      statusType: "in-progress",
      progress: 60,
    },
    {
      id: 2,
      title: "تقديم لائحة دعوى",
      dueDate: "2025-05-20",
      status: "قيد الانتظار",
      statusType: "pending",
      progress: 10,
    },
    {
      id: 3,
      title: "تحضير اجتماع العميل",
      dueDate: "2025-05-22",
      status: "مكتمل",
      statusType: "completed",
      progress: 100,
    },
  ];

  const getStatusClass = (type) => {
    switch (type) {
      case "in-progress":
        return "bg-purple-900/30 text-purple-300";
      case "pending":
        return "bg-slate-700 text-gray-300";
      case "completed":
        return "bg-emerald-900/30 text-emerald-300";
      default:
        return "bg-slate-700 text-gray-300";
    }
  };

  const getProgressBarColor = (progress) => {
    if (progress === 100) return "bg-emerald-500";
    if (progress >= 60) return "bg-blue-500";
    return "bg-amber-500";
  };

  return (
    <div className="overflow-hidden transition-all duration-300 border shadow-sm bg-slate-800 rounded-2xl border-slate-700 hover:shadow-md">
      <div className="flex items-center justify-between p-5 border-b border-slate-700">
        <h3 className="text-lg font-semibold text-white">المهام الأخيرة</h3>
        <Link
          href="/tasks"
          className="text-sm text-blue-400 transition hover:text-blue-300"
        >
          عرض الكل
        </Link>
      </div>

      <div className="divide-y divide-slate-700">
        {tasksData.map((task) => (
          <div key={task.id} className="p-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-medium text-gray-100">{task.title}</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  يستحق {new Date(task.dueDate).toLocaleDateString("ar-EG")}
                </p>
              </div>
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(
                  task.statusType
                )}`}
              >
                {task.statusType === "completed" && <CheckCircle className="w-3 h-3" />}
                {task.statusType === "pending" && <Clock className="w-3 h-3" />}
                {task.statusType === "in-progress" && <AlertCircle className="w-3 h-3" />}
                {task.status}
              </span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-1.5">
              <div
                className={`${getProgressBarColor(
                  task.progress
                )} h-1.5 rounded-full transition-all duration-500`}
                style={{ width: `${task.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;