"use client";

import React, { useContext,useState } from "react";
import {
  FaEye,
  FaEdit,
  FaTrash,
  FaUserTie,
  FaCalendarAlt,
} from "react-icons/fa";
import { OwnerContext } from "../../../../../Providers/LawyerOwner/OwnerProvider.js";
import Details from "./Details.jsx";
import Delete from "./Delete.jsx";
import Update from "./Update.jsx";


const Table = () => {
  const { tasks = [],openDeleteTask,setOpenDeleteTask,openUpdateTask,setOpenUpdateTask } = useContext(OwnerContext);
const [selectTask, setSelectTask] = useState(null);
const [openDetails, setOpenDetails] = useState(false);
  const priorityMap = {
    high: {
      label: "عالية",
      style:
        "text-[#8A5A00] bg-[#F4EFD9] border-[#E5DDBB]",
    },
    medium: {
      label: "متوسطة",
      style:
        "text-[#755B00] bg-[#F4EFD9] border-[#E5DDBB]",
    },
    low: {
      label: "منخفضة",
      style:
        "text-[#496B5A] bg-[#E6F0EA] border-[#D3E3D9]",
    },
  };

  const statusMap = {
    todo: {
      label: "لم تبدأ",
      style:
        "text-[#45464D] bg-[#F1F3F6] border-[#E1E5EB]",
    },
    in_progress: {
      label: "قيد التنفيذ",
      style:
        "text-[#455D80] bg-[#E8EDF6] border-[#D5DDEB]",
    },
    completed: {
      label: "مكتملة",
      style:
        "text-[#496B5A] bg-[#E6F0EA] border-[#D3E3D9]",
    },
  };

  return <>
  {
    openDetails && <Details selectTask={selectTask} openDetails={openDetails} setOpenDetails={setOpenDetails}/>
  }
  {
    openDeleteTask && <Delete selectTask={selectTask}/>
  }
  {
    openUpdateTask && <Update selectTask={selectTask}/>
  }

    <div className="mt-6 overflow-hidden border shadow-sm rounded-2xl border-[#E7EBF2] bg-white">
      <div className="flex flex-col gap-3 px-6 py-5 border-b border-[#E7EBF2] sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-bold text-[#0B1C30]">
            جميع المهام
          </h2>

          <p className="mt-1 text-sm text-[#45464D]">
            متابعة وإدارة المهام الموزعة على محامي المكتب
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-right">
          <thead>
            <tr className="border-b border-[#E7EBF2] bg-[#F8F9FB]">
              <th className="px-6 py-4 text-xs font-semibold text-[#45464D]">
                المهمة
              </th>

              <th className="px-6 py-4 text-xs font-semibold text-[#45464D]">
                المحامي المسؤول
              </th>

              <th className="px-6 py-4 text-xs font-semibold text-[#45464D]">
                الأولوية
              </th>

              <th className="px-6 py-4 text-xs font-semibold text-[#45464D]">
                الحالة
              </th>

              <th className="px-6 py-4 text-xs font-semibold text-[#45464D]">
                تاريخ الاستحقاق
              </th>

              <th className="px-6 py-4 text-xs font-semibold text-[#45464D]">
                الإجراءات
              </th>
            </tr>
          </thead>

          <tbody>
            {tasks.map((task) => {
              const priority = priorityMap[task.priority];
              const status = statusMap[task.status];

              return (
                <tr
                  key={task._id}
                  className="transition-colors border-b border-[#E7EBF2] last:border-b-0 hover:bg-[#F8F9FB]"
                >
                  {/* Task */}
                  <td className="px-6 py-5">
                    <div>
                      <p className="text-sm font-semibold text-[#0B1C30]">
                        {task.title}
                      </p>

                      <p className="max-w-xs mt-1 text-xs truncate text-[#7A7D85]">
                        {task.description || "لا يوجد وصف"}
                      </p>
                    </div>
                  </td>

                  {/* Lawyer */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      {task.assignedTo?.profileImage?.url ? (
                        <img
                          src={task.assignedTo.profileImage.url}
                          alt={task.assignedTo.name}
                          className="object-cover border rounded-full w-9 h-9 border-[#D5DDEB]"
                        />
                      ) : (
                        <div className="flex items-center justify-center border rounded-full w-9 h-9 bg-[#D5E0F8] border-[#D5DDEB]">
                          <FaUserTie className="text-sm text-[#0B1C30]" />
                        </div>
                      )}

                      <span className="text-sm font-medium text-[#0B1C30]">
                        {task.assignedTo?.name || "غير محدد"}
                      </span>
                    </div>
                  </td>

                  {/* Priority */}
                  <td className="px-6 py-5">
                    <span
                      className={`inline-flex items-center px-3 py-1.5 text-xs font-semibold border rounded-full ${priority?.style}`}
                    >
                      {priority?.label}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-5">
                    <span
                      className={`inline-flex items-center px-3 py-1.5 text-xs font-semibold border rounded-full ${status?.style}`}
                    >
                      {status?.label}
                    </span>
                  </td>

                  {/* Due Date */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-sm text-[#45464D]">
                      <FaCalendarAlt className="text-xs text-[#755B00]" />

                      {task.dueDate
                        ? new Date(task.dueDate).toLocaleDateString(
                            "ar-EG",
                            {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            },
                          )
                        : "بدون موعد"}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <button
                      onClick={()=>{
                        setSelectTask(task)
                        setOpenDetails(true)
                      }}
                        type="button"
                        className="flex items-center justify-center text-[#455D80] transition border rounded-lg w-9 h-9 border-[#D5DDEB] bg-[#E8EDF6] hover:bg-[#D5E0F8]"
                      >
                        <FaEye className="text-xs" />
                      </button>

                      <button
                      onClick={
                        ()=>{
                            setSelectTask(task)
                            setOpenUpdateTask(true)
                        }
                      }
                        type="button"
                        className="flex items-center justify-center text-[#755B00] transition border rounded-lg w-9 h-9 border-[#E5DDBB] bg-[#F4EFD9] hover:bg-[#EEE5C7]"
                      >
                        <FaEdit className="text-xs" />
                      </button>

                      <button
                      onClick={
                        ()=>{
                            setSelectTask(task)
                            setOpenDeleteTask(true)
                        }
                      }
                        type="button"
                        className="flex items-center justify-center text-[#A04A4A] transition border rounded-lg w-9 h-9 border-[#E8D1D1] bg-[#F8EDED] hover:bg-[#F3E2E2]"
                      >
                        <FaTrash className="text-xs" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
      </>
  
};

export default Table;