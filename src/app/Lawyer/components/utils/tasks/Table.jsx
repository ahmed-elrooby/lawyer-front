"use client";

import React, { useContext, useState } from "react";
import {
  FaEye,
  FaUserTie,
  FaCalendarAlt,
  FaExchangeAlt,
} from "react-icons/fa";
import Details from "./Details.jsx";
import { LawyerContext } from "../../../../../Providers/LawyerContext/lawyer.js";
import ChangeStatus from "./ChangeStatus.jsx";

const Table = () => {
  const {
    tasks = [],
   openChange, setOpenChange
  } = useContext(LawyerContext);
const [openDetails,setOpenDetails]=useState(false)
const [selectTask, setSelectTask] = useState(null);
  const priorityMap = {
    high: {
      label: "عالية",
      style:
        "text-orange-400 bg-orange-500/10 border-orange-500/20",
    },
    medium: {
      label: "متوسطة",
      style:
        "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
    },
    low: {
      label: "منخفضة",
      style:
        "text-slate-300 bg-slate-800 border-slate-700",
    },
  };

  const statusMap = {
    todo: {
      label: "لم تبدأ",
      style:
        "text-slate-300 bg-slate-800 border-slate-700",
    },
    in_progress: {
      label: "قيد التنفيذ",
      style:
        "text-blue-400 bg-blue-500/10 border-blue-500/20",
    },
    completed: {
      label: "مكتملة",
      style:
        "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    },
  };



  return <>
{
    openDetails && <Details selectTask={selectTask} setOpenDetails={setOpenDetails} openDetails={openDetails} />
}
 {
    openChange && <ChangeStatus selectTask={selectTask}/>
 }
    <div className="mt-6 overflow-hidden border shadow-xl rounded-2xl border-slate-800 bg-slate-900/60 shadow-black/10">
      {/* Header */}
      <div className="flex flex-col gap-3 px-5 py-4 border-b border-slate-800 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-bold text-white">
            المهام الموكلة إليك
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            متابعة المهام والتعليمات المرسلة إليك من إدارة المكتب
          </p>
        </div>

        <div className="px-3 py-1.5 text-xs font-semibold border rounded-lg text-emerald-400 border-emerald-500/20 bg-emerald-500/10">
          {tasks.length} مهمة
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-right">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950/30">
              <th className="px-5 py-3 text-xs font-semibold text-slate-400">
                المهمة
              </th>

              <th className="px-5 py-3 text-xs font-semibold text-slate-400">
                الأولوية
              </th>

              <th className="px-5 py-3 text-xs font-semibold text-slate-400">
                الحالة
              </th>

              <th className="px-5 py-3 text-xs font-semibold text-slate-400">
                تاريخ الاستحقاق
              </th>

              <th className="px-5 py-3 text-xs font-semibold text-slate-400">
                الإجراءات
              </th>
            </tr>
          </thead>

          <tbody>
            {tasks.length > 0 ? (
              tasks.map((task) => {
                const priority = priorityMap[task.priority];
                const status = statusMap[task.status];

                return (
                  <tr
                    key={task._id}
                    className="transition-colors border-b border-slate-800 last:border-b-0 hover:bg-slate-800/40"
                  >
                    {/* Task */}
                    <td className="px-5 py-4">
                      <div className="min-w-[200px]">
                        <p className="text-sm font-semibold text-white">
                          {task.title}
                        </p>

                        <p className="max-w-sm mt-1 text-xs truncate text-slate-500">
                          {task.description || "لا يوجد وصف للمهمة"}
                        </p>
                      </div>
                    </td>

                    {/* Priority */}
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 text-xs font-semibold border rounded-full ${priority?.style}`}
                      >
                        {priority?.label || "غير محددة"}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 text-xs font-semibold border rounded-full ${status?.style}`}
                      >
                        {status?.label || "غير محددة"}
                      </span>
                    </td>

                    {/* Due Date */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 text-sm text-slate-400 whitespace-nowrap">
                        <FaCalendarAlt className="text-xs text-emerald-400" />

                        {task.dueDate
                          ? new Date(task.dueDate).toLocaleDateString(
                              "ar-EG",
                              {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              }
                            )
                          : "بدون موعد"}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        {/* Details */}
                        <button
                          type="button"
                          title="عرض التفاصيل"
                          onClick={() => {
                            setSelectTask(task);
                            setOpenDetails(true);
                          }}
                          className="flex items-center justify-center w-8 h-8 text-blue-400 transition border rounded-lg border-blue-500/20 bg-blue-500/10 hover:bg-blue-500/20"
                        >
                          <FaEye className="text-xs" />
                        </button>

                        {/* Change Status */}
                        <button
                          type="button"
                          title="تغيير الحالة"
                          onClick={() =>{
                            setSelectTask(task);
                            setOpenChange(true);
                          }}
                          className="flex items-center justify-center w-8 h-8 transition border rounded-lg text-emerald-400 border-emerald-500/20 bg-emerald-500/10 hover:bg-emerald-500/20"
                        >
                          <FaExchangeAlt className="text-xs" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="px-5 text-center py-14"
                >
                  <div className="flex flex-col items-center justify-center">
                    <div className="flex items-center justify-center mb-4 border w-14 h-14 rounded-2xl border-slate-700 bg-slate-800 text-slate-500">
                      <FaUserTie className="text-xl" />
                    </div>

                    <p className="text-sm font-semibold text-white">
                      لا توجد مهام حاليًا
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      ستظهر هنا المهام الموكلة إليك من إدارة المكتب
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
   </>
};

export default Table;