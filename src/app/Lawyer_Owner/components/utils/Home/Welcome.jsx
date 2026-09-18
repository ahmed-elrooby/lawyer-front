"use client";

import React from "react";

const Welcome = () => {
  return (
    <section
      className="
        relative mb-4 overflow-hidden rounded-2xl
        bg-[#111827] p-5 text-white shadow-xl
      "
      style={{
        backgroundImage: `
          linear-gradient(
            30deg,
            rgba(255,255,255,.025) 12%,
            transparent 12.5%,
            transparent 87%,
            rgba(255,255,255,.025) 87.5%,
            rgba(255,255,255,.025)
          ),
          linear-gradient(
            150deg,
            rgba(255,255,255,.025) 12%,
            transparent 12.5%,
            transparent 87%,
            rgba(255,255,255,.025) 87.5%,
            rgba(255,255,255,.025)
          ),
          linear-gradient(
            30deg,
            rgba(255,255,255,.025) 12%,
            transparent 12.5%,
            transparent 87%,
            rgba(255,255,255,.025) 87.5%,
            rgba(255,255,255,.025)
          ),
          linear-gradient(
            150deg,
            rgba(255,255,255,.025) 12%,
            transparent 12.5%,
            transparent 87%,
            rgba(255,255,255,.025) 87.5%,
            rgba(255,255,255,.025)
          ),
          linear-gradient(
            60deg,
            rgba(255,255,255,.025) 25%,
            transparent 25.5%,
            transparent 75%,
            rgba(255,255,255,.025) 75%
          )
        `,
        backgroundSize: "58px 100px",
        backgroundPosition:
          "0 0, 0 0, 29px 50px, 29px 50px, 0 0",
      }}
    >
      {/* Glow */}
      <div className="absolute w-32 h-32 rounded-full -left-12 -top-12 bg-blue-500/10 blur-2xl" />

      <div className="absolute w-32 h-32 rounded-full -bottom-12 right-20 bg-amber-400/10 blur-2xl" />

      {/* Content */}
      <div className="relative grid items-center gap-5 lg:grid-cols-[1.25fr_.9fr]">
        {/* Right Content */}
        <div>
          {/* Badges */}
          <div className="flex items-center gap-2 mb-2">
            <span className="rounded-full bg-amber-400/15 px-2.5 py-1 text-[8px] text-amber-200">
              ✦ مكتب موثوق
            </span>

            <span className="rounded-full bg-emerald-400/10 px-2.5 py-1 text-[8px] text-emerald-300">
              ● نشط الآن
            </span>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-extrabold leading-tight sm:text-3xl">
            مكتب العدالة للمحاماة
            <br />
            والاستشارات القانونية
          </h2>

          {/* Description */}
          <p className="mt-2 max-w-xl text-[10px] leading-6 text-slate-300">
            مركز قيادة المكتب لمتابعة أداء الفريق، إدارة القضايا، ومراقبة سير
            العمل في مكان واحد.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="rounded-lg bg-white/10 px-2.5 py-1.5 text-[9px]">
              12 محامي
            </span>

            <span className="rounded-lg bg-white/10 px-2.5 py-1.5 text-[9px]">
              128 قضية
            </span>

            <span className="rounded-lg bg-white/10 px-2.5 py-1.5 text-[9px]">
              342 عميل
            </span>

            <span className="rounded-lg bg-white/10 px-2.5 py-1.5 text-[9px]">
              47 جلسة هذا الأسبوع
            </span>
          </div>
        </div>

        {/* Performance Card */}
        <div className="flex items-center justify-center">
          <div className="w-full max-w-[310px] rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
            <div className="flex items-center gap-5">
              {/* Circle */}
              <div
                className="relative p-2 rounded-full h-28 w-28 shrink-0"
                style={{
                  background:
                    "conic-gradient(#60d394 0 72%, #d6c14c 72% 87%, rgba(255,255,255,.12) 87% 100%)",
                }}
              >
                <div className="flex h-full w-full flex-col items-center justify-center rounded-full bg-[#172033]">
                  <strong className="text-3xl leading-none">87</strong>

                  <span className="mt-1 text-[8px] text-slate-400">
                    من 100
                  </span>

                  <span className="mt-0.5 text-[8px] text-emerald-300">
                    أداء المكتب
                  </span>
                </div>
              </div>

              {/* Progress */}
              <div className="flex-1 space-y-3">
                {/* Team Efficiency */}
                <div>
                  <div className="mb-1 flex justify-between text-[8px] text-slate-300">
                    <span>كفاءة الفريق</span>

                    <b className="text-white">91%</b>
                  </div>

                  <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-emerald-400"
                      style={{ width: "91%" }}
                    />
                  </div>
                </div>

                {/* Cases Progress */}
                <div>
                  <div className="mb-1 flex justify-between text-[8px] text-slate-300">
                    <span>تقدم القضايا</span>

                    <b className="text-white">83%</b>
                  </div>

                  <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full bg-blue-400 rounded-full"
                      style={{ width: "83%" }}
                    />
                  </div>
                </div>

                {/* Client Satisfaction */}
                <div>
                  <div className="mb-1 flex justify-between text-[8px] text-slate-300">
                    <span>رضا العملاء</span>

                    <b className="text-white">88%</b>
                  </div>

                  <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-amber-300"
                      style={{ width: "88%" }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Growth */}
            <div className="mt-3 text-center text-[8px] text-emerald-300">
              ↗ +12.4% مقارنة بالشهر الماضي
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;