import BackButton from "./components/BackButton/BackButton";

export default function NotFound() {
  return (
    <main
      dir="rtl"
      className="flex items-center justify-center min-h-screen px-4 bg-[#f5f7fb]"
    >
      <div className="w-full max-w-lg text-center">
        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center justify-center w-20 h-20 bg-white border shadow-sm rounded-2xl border-slate-200">
            <span className="text-3xl font-bold text-[#C9A227]">!</span>
          </div>
        </div>

        <h1 className="text-7xl font-extrabold tracking-tight text-[#0B1C30]">
          404
        </h1>

        <h2 className="mt-4 text-2xl font-bold text-[#0B1C30]">
          الصفحة غير موجودة
        </h2>

        <p className="max-w-md mx-auto mt-3 text-sm leading-7 text-slate-500">
          عذرًا، الصفحة التي تبحث عنها غير موجودة أو ربما تم نقلها إلى مكان
          آخر.
        </p>

        <BackButton />

        <p className="mt-10 text-xs font-semibold tracking-wide text-slate-400">
          قضاء — منصة إدارة مكاتب المحاماة
        </p>
      </div>
    </main>
  );
}