import React, { useContext } from "react";
import { AdminContext } from "../../../../../Providers/AdminContext/Admin.js";
import { FaExclamationTriangle, FaTimes, FaTrash } from "react-icons/fa";

const DeleteModel = ({ user }) => {
  const { openDeleteUser, setOpenDeleteUser, handleDeleteUserFun } =
    useContext(AdminContext);

  if (!openDeleteUser) return null;

  const handleDelete = () => {
    handleDeleteUserFun(user?._id || user?.id);
  };

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm"
      onClick={() => setOpenDeleteUser(false)}
    >
      <div
        className="w-full max-w-md overflow-hidden bg-white shadow-2xl rounded-2xl"
        dir="rtl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center text-red-600 h-11 w-11 rounded-xl bg-red-50">
              <FaTrash size={17} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900">حذف المستخدم</h2>

              <p className="mt-1 text-sm text-gray-500">تأكيد حذف المستخدم</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOpenDeleteUser(false)}
            className="flex items-center justify-center text-gray-400 transition rounded-lg h-9 w-9 hover:bg-gray-100 hover:text-gray-700"
          >
            <FaTimes />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          <div className="p-4 border border-red-100 rounded-xl bg-red-50">
            <div className="flex gap-3">
              <div className="mt-0.5 text-red-600">
                <FaExclamationTriangle size={18} />
              </div>

              <div>
                <p className="text-sm font-semibold text-red-800">
                  هل أنت متأكد من حذف هذا المستخدم؟
                </p>

                <p className="mt-1 text-sm leading-6 text-red-700">
                  سيتم حذف المستخدم نهائيًا من النظام، ولا يمكن التراجع عن هذه
                  العملية.
                </p>
              </div>
            </div>
          </div>

          {/* User */}
          <div className="flex items-center gap-3 p-4 mt-5 border border-gray-100 rounded-xl bg-gray-50">
            {user?.profileImage?.url ? (
              <img
                src={user.profileImage.url}
                alt={user?.name || "User"}
                className="object-cover w-12 h-12 rounded-full"
              />
            ) : (
              <div className="flex items-center justify-center w-12 h-12 font-bold text-blue-600 bg-blue-100 rounded-full">
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
            )}

            <div className="min-w-0">
              <p className="font-semibold text-gray-900 truncate">
                {user?.name || "مستخدم"}
              </p>

              <p className="text-sm text-gray-500 truncate">
                {user?.email || "لا يوجد بريد إلكتروني"}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50">
          <button
            type="button"
            onClick={() => setOpenDeleteUser(false)}
            className="flex-1 px-4 py-3 text-sm font-semibold text-gray-700 transition bg-white border border-gray-200 rounded-xl hover:bg-gray-100"
          >
            إلغاء
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-700 active:scale-[0.98]"
          >
            <FaTrash size={14} />
            حذف المستخدم
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModel;
