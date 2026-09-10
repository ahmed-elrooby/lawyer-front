"use client";

import React from "react";
import { Lightbulb } from "lucide-react";

const Discussions = () => {
  const suggestions = [
    "يُفضّل مراجعة قضية \"Estate v. Wilson\" قبل الجلسة القادمة (غداً).",
    "العميل \"James Miller\" لديه 3 قضايا متأخرة – يُنصح بتحديد اجتماع عاجل.",
    "المهمة \"تقديم لائحة دعوى\" متأخرة يومين – راجع الموعد.",
  ];

  return (
    <div className="p-5 transition-all duration-300 border shadow-sm bg-gradient-to-r from-slate-700 to-slate-800 rounded-2xl border-slate-700 hover:shadow-md">
      <h3 className="flex items-center gap-2 mb-3 text-lg font-bold text-white">
        <Lightbulb className="w-5 h-5 text-amber-400" />
        اقتراحات ذكية
      </h3>
      <ul className="space-y-2 text-sm text-gray-300">
        {suggestions.map((suggestion, idx) => (
          <li key={idx} className="flex items-start gap-1.5">
            <span className="text-amber-400">🔹</span>
            {suggestion}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Discussions;