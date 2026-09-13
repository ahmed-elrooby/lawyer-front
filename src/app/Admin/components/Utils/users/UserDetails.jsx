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
      className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-950/60 px-3 py-4 backdrop-blur-sm sm:px-4 sm:py-6"
      dir="rtl"
      onClick={() => setOpenDetails(false)}
    >
      <div
        className="flex w-full max-w-2xl max-h-[92vh] flex-col overflow-hidden rounded-3xl border border-white/20 bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative px-4 pt-5 overflow-hidden shrink-0 pb-14 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 sm:px-6 sm:pt-6 sm:pb-16">
          <div className="absolute w-32 h-32 rounded-full -left-10 -top-10 bg-white/10 sm:w-40 sm:h-40" />

          <div className="absolute w-40 h-40 rounded-full -bottom-20 right-10 bg-white/10 sm:w-48 sm:h-48" />

          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-blue-100 sm:text-sm">
                معلومات المستخدم
              </p>

              <h2 className="mt-1 text-xl font-bold text-white sm:text-2xl">
                تفاصيل المستخدم
              </h2>
            </div>

            <button
              type="button"
              onClick={() => setOpenDetails(false)}
              className="flex items-center justify-center text-white transition w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 sm:w-10 sm:h-10"
            >
              <FaTimes />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto">
          {/* Profile */}
          <div className="relative px-4 sm:px-6">
            <div className="flex flex-col items-center -mt-10 sm:-mt-12 sm:flex-row sm:items-end sm:gap-4">
              <div className="relative w-20 h-20 overflow-hidden border-4 border-white shadow-xl shrink-0 rounded-2xl bg-slate-100 sm:w-24 sm:h-24">
                {user?.profileImage?.url ? (
                  <img
                    src={user.profileImage.url}
                    alt={user?.name || "User"}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full text-blue-600 bg-blue-50">
                    <FaUser size={28} />
                  </div>
                )}
              </div>

              <div className="pt-2 pb-2 text-center sm:pt-3 sm:text-right">
                <h3 className="text-lg font-bold text-slate-900 sm:text-xl">
                  {user?.name || "بدون اسم"}
                </h3>

                <span className="inline-flex px-3 py-1 mt-1 text-xs font-semibold text-blue-700 rounded-full bg-blue-50">
                  {getRoleName(user?.role)}
                </span>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="px-4 pt-5 pb-4 sm:px-6 sm:pt-7 sm:pb-6">
            <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
              {/* Email */}
              <div className="p-3 border rounded-2xl border-slate-100 bg-slate-50 sm:p-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center text-blue-600 bg-blue-100 w-9 h-9 shrink-0 rounded-xl sm:w-10 sm:h-10">
                    <FaEnvelope />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-medium text-slate-400">
                      البريد الإلكتروني
                    </p>

                    <p className="mt-1 text-xs font-semibold truncate text-slate-800 sm:text-sm">
                      {user?.email || "غير متوفر"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="p-3 border rounded-2xl border-slate-100 bg-slate-50 sm:p-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-9 h-9 shrink-0 rounded-xl bg-emerald-100 text-emerald-600 sm:w-10 sm:h-10">
                    <FaPhone />
                  </div>

                  <div>
                    <p className="text-xs font-medium text-slate-400">
                      رقم الهاتف
                    </p>

                    <p className="mt-1 text-xs font-semibold text-slate-800 sm:text-sm">
                      {user?.phone || "غير متوفر"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Role */}
              <div className="p-3 border rounded-2xl border-slate-100 bg-slate-50 sm:p-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-9 h-9 shrink-0 rounded-xl bg-violet-100 text-violet-600 sm:w-10 sm:h-10">
                    <FaUserShield />
                  </div>

                  <div>
                    <p className="text-xs font-medium text-slate-400">
                      الصلاحية
                    </p>

                    <p className="mt-1 text-xs font-semibold text-slate-800 sm:text-sm">
                      {getRoleName(user?.role)}
                    </p>
                  </div>
                </div>
              </div>

              {/* ID */}
              <div className="p-3 border rounded-2xl border-slate-100 bg-slate-50 sm:p-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-9 h-9 shrink-0 rounded-xl bg-amber-100 text-amber-600 sm:w-10 sm:h-10">
                    <FaIdCard />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-medium text-slate-400">
                      معرف المستخدم
                    </p>

                    <p
                      className="mt-1 text-xs font-semibold truncate text-slate-800 sm:text-sm"
                      title={user?._id || user?.id}
                    >
                      {user?._id || user?.id || "غير متوفر"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Created At */}
              <div className="p-3 border rounded-2xl border-slate-100 bg-slate-50 sm:col-span-2 sm:p-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-9 h-9 shrink-0 rounded-xl bg-cyan-100 text-cyan-600 sm:w-10 sm:h-10">
                    <FaCalendarAlt />
                  </div>

                  <div>
                    <p className="text-xs font-medium text-slate-400">
                      تاريخ إنشاء الحساب
                    </p>

                    <p className="mt-1 text-xs font-semibold text-slate-800 sm:text-sm">
                      {formatDate(user?.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t shrink-0 border-slate-100 bg-slate-50 sm:px-6 sm:py-4">
          <button
            type="button"
            onClick={() => setOpenDetails(false)}
            className="w-full px-5 py-2.5 text-sm font-semibold text-white transition rounded-xl bg-slate-900 hover:bg-slate-800 sm:py-3"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
