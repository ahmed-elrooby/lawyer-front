import React from "react";
import {
  FaTimes,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaUserShield,
  FaCalendarAlt,
  FaIdCard,
} from "react-icons/fa";

const UserDetails = ({ user, setOpenDetails, openDetails }) => {
  if (!openDetails || !user) return null;

  const formatDate = (date) => {
    if (!date) return "غير متوفر";

    return new Date(date).toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getRoleName = (role) => {
    switch (role) {
      case "office_owner":
        return "صاحب المكتب";

      case "lawyer":
        return "محامي";

      default:
        return role || "غير محدد";
    }
  };

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-950/60 px-4 py-6 backdrop-blur-sm"
      dir="rtl"
      onClick={() => setOpenDetails(false)}
    >
      <div
        className="w-full max-w-2xl overflow-hidden bg-white border shadow-2xl rounded-3xl border-white/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative px-6 pt-6 pb-16 overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800">
          <div className="absolute w-40 h-40 rounded-full -left-10 -top-10 bg-white/10" />
          <div className="absolute w-48 h-48 rounded-full -bottom-20 right-10 bg-white/10" />

          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-100">
                معلومات المستخدم
              </p>

              <h2 className="mt-1 text-2xl font-bold text-white">
                تفاصيل المستخدم
              </h2>
            </div>

            <button
              type="button"
              onClick={() => setOpenDetails(false)}
              className="flex items-center justify-center w-10 h-10 text-white transition rounded-xl bg-white/10 hover:bg-white/20"
            >
              <FaTimes />
            </button>
          </div>
        </div>

        {/* Profile */}
        <div className="relative px-6">
          <div className="flex flex-col items-center -mt-12 sm:flex-row sm:items-end sm:gap-4">
            <div className="relative w-24 h-24 overflow-hidden border-4 border-white shadow-xl shrink-0 rounded-2xl bg-slate-100">
              {user?.profileImage?.url ? (
                <img
                  src={user.profileImage.url}
                  alt={user?.name || "User"}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full text-blue-600 bg-blue-50">
                  <FaUser size={32} />
                </div>
              )}
            </div>

            <div className="pt-3 pb-2 text-center sm:text-right">
              <h3 className="text-xl font-bold text-slate-900">
                {user?.name || "بدون اسم"}
              </h3>

              <span className="inline-flex px-3 py-1 mt-1 text-xs font-semibold text-blue-700 rounded-full bg-blue-50">
                {getRoleName(user?.role)}
              </span>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="px-6 pb-6 pt-7">
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Email */}
            <div className="p-4 border rounded-2xl border-slate-100 bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 text-blue-600 bg-blue-100 shrink-0 rounded-xl">
                  <FaEnvelope />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-medium text-slate-400">
                    البريد الإلكتروني
                  </p>

                  <p className="mt-1 text-sm font-semibold truncate text-slate-800">
                    {user?.email || "غير متوفر"}
                  </p>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="p-4 border rounded-2xl border-slate-100 bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 shrink-0 rounded-xl bg-emerald-100 text-emerald-600">
                  <FaPhone />
                </div>

                <div>
                  <p className="text-xs font-medium text-slate-400">
                    رقم الهاتف
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {user?.phone || "غير متوفر"}
                  </p>
                </div>
              </div>
            </div>

            {/* Role */}
            <div className="p-4 border rounded-2xl border-slate-100 bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 shrink-0 rounded-xl bg-violet-100 text-violet-600">
                  <FaUserShield />
                </div>

                <div>
                  <p className="text-xs font-medium text-slate-400">الصلاحية</p>

                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {getRoleName(user?.role)}
                  </p>
                </div>
              </div>
            </div>

            {/* ID */}
            <div className="p-4 border rounded-2xl border-slate-100 bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 shrink-0 rounded-xl bg-amber-100 text-amber-600">
                  <FaIdCard />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-medium text-slate-400">
                    معرف المستخدم
                  </p>

                  <p
                    className="mt-1 text-sm font-semibold truncate text-slate-800"
                    title={user?._id || user?.id}
                  >
                    {user?._id || user?.id || "غير متوفر"}
                  </p>
                </div>
              </div>
            </div>

            {/* Created At */}
            <div className="p-4 border rounded-2xl border-slate-100 bg-slate-50 sm:col-span-2">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 shrink-0 rounded-xl bg-cyan-100 text-cyan-600">
                  <FaCalendarAlt />
                </div>

                <div>
                  <p className="text-xs font-medium text-slate-400">
                    تاريخ إنشاء الحساب
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {formatDate(user?.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50">
          <button
            type="button"
            onClick={() => setOpenDetails(false)}
            className="w-full px-5 py-3 text-sm font-semibold text-white transition rounded-xl bg-slate-900 hover:bg-slate-800"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
