"use client";

import React from "react";
import { Star } from "lucide-react";

const TodayTasks = () => {
  const tasks = [
    { id: 1, text: "📄 مراجعة عقد Tech Corp", time: "قبل 3 ساعات", timeColor: "text-amber-400" },
    { id: 2, text: "⚖️ تجهيز مذكرة الدفاع لقضية Wilson", time: "عاجل", timeColor: "text-red-400" },
    { id: 3, text: "📞 اجتماع مع العميلة إيما الساعة 3م", time: "اليوم", timeColor: "text-green-400" },
  ];

  return (
    <div className="p-5 transition-all duration-300 border shadow-sm bg-slate-800 rounded-2xl border-blue-800/50 ring-1 ring-blue-800/30 hover:shadow-md">
      <h3 className="flex items-center gap-2 mb-3 text-lg font-bold text-white">
        <Star className="w-5 h-5 text-amber-400" />
        مهامي اليوم
      </h3>
      <ul className="space-y-3">
        {tasks.map((task) => (
          <li key={task.id} className="flex items-center justify-between pb-2 border-b border-slate-700">
            <span className="text-gray-200">{task.text}</span>
            <span className={`text-xs ${task.timeColor}`}>{task.time}</span>
          </li>
        ))}
      </ul>
      <div className="pt-2 mt-4 border-t border-slate-700">
        <p className="text-sm text-gray-300">
          أقرب جلسة: <span className="text-blue-400">غداً 10:00 ص - قضية Wilson</span>
        </p>
      </div>
    </div>
  );
};

export default TodayTasks;