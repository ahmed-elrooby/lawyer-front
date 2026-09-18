
import React, { useContext } from "react";
import { LawyerContext } from "../../../../../Providers/LawyerContext/lawyer.js";
import { FaTrash, FaTimes } from "react-icons/fa";

const DeleteModel = ({ client }) => {
  const {
    handleDeleteClientFun,
    openDeleteClient,
    setOpenDeleteClient,
  } = useContext(LawyerContext);

  if (!openDeleteClient) return null;

  const handleDelete = async () => {
    try {
      await handleDeleteClientFun(client._id);

      setOpenDeleteClient(false);
    } catch (error) {
      console.error("Delete Client Error:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md p-6 mx-4 border shadow-2xl rounded-2xl bg-slate-900 border-slate-700">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-white">
            حذف العميل
          </h2>

          <button
            type="button"
            onClick={() => setOpenDeleteClient(false)}
            className="flex items-center justify-center w-8 h-8 text-gray-400 transition rounded-lg hover:bg-white/10 hover:text-white"
          >
            <FaTimes />
          </button>
        </div>

        {/* Icon */}
        <div className="flex justify-center mb-5">
          <div className="flex items-center justify-center w-16 h-16 text-red-400 rounded-full bg-red-500/10">
            <FaTrash size={25} />
          </div>
        </div>

        {/* Message */}
        <div className="text-center">
          <h3 className="mb-2 text-xl font-bold text-white">
            هل أنت متأكد؟
          </h3>

          <p className="text-sm leading-6 text-gray-400">
            هل أنت متأكد أنك تريد حذف العميل{" "}
            <span className="font-semibold text-white">
              {client?.name}
            </span>
            ؟
          </p>

          <p className="mt-2 text-xs text-red-400">
            لا يمكن التراجع عن هذا الإجراء.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-7">
          <button
            type="button"
            onClick={() => setOpenDeleteClient(false)}
            className="flex-1 py-3 text-sm font-medium text-gray-300 transition rounded-xl bg-white/5 hover:bg-white/10"
          >
            إلغاء
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="flex items-center justify-center flex-1 gap-2 py-3 text-sm font-medium text-white transition bg-red-600 rounded-xl hover:bg-red-700"
          >
            <FaTrash />
            تأكيد الحذف
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModel;
