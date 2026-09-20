"use client";

import React, { useContext, useMemo } from "react";
import {
  Scale,
  Crown,
  FileText,
  CalendarDays,
  Download,
} from "lucide-react";

import { OwnerContext } from "../../../../../Providers/LawyerOwner/OwnerProvider.js";

const NearActiveCase = () => {
  const { clients } = useContext(OwnerContext);

  /* ================= Get Active Case ================= */

  const activeCase = useMemo(() => {
    if (!Array.isArray(clients)) {
      return null;
    }

    const allCases = clients.flatMap((client) => {
      if (!Array.isArray(client?.cases)) {
        return [];
      }

      return client.cases.map((caseItem) => ({
        ...caseItem,
        client,
      }));
    });

    return (
      allCases.find(
        (caseItem) => caseItem?.status === "active"
      ) || null
    );
  }, [clients]);

  /* ================= Empty State ================= */

  if (!activeCase) {
    return (
      <div dir="rtl" className="w-full">

        <div className="mt-6 flex min-h-[180px] items-center justify-center rounded-xl border border-[#edf0f5] bg-white shadow-sm">

          <div className="text-center">

            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-[#edf3ff] text-[#52627c]">
              <Scale size={17} />
            </div>

            <p className="mt-3 text-[9px] font-bold text-[#354157]">
              لا توجد قضية نشطة حاليًا
            </p>

            <p className="mt-1 text-[7px] text-[#929baa]">
              ستظهر هنا أقرب قضية نشطة للمتابعة
            </p>

          </div>

        </div>

      </div>
    );
  }

  /* ================= Helpers ================= */

  const formatDate = (date) => {
    if (!date) {
      return "غير محدد";
    }

    return new Date(date).toLocaleDateString("ar-EG", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatDateLong = (date) => {
    if (!date) {
      return "غير محدد";
    }

    return new Date(date).toLocaleDateString("ar-EG", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getInitial = (name) => {
    return name?.charAt(0) || "ع";
  };

  /* ================= Case Status ================= */

  const caseStatusLabels = {
    active: "نشطة",
    reserved_for_judgment: "محجوزة للحكم",
    judged: "صدر فيها حكم",
  };

  const caseStatusStyles = {
    active: "bg-[#fff4cc] text-[#9c7d1a]",
    reserved_for_judgment:
      "bg-[#fff4cc] text-[#9c7d1a]",
    judged: "bg-[#edf3ff] text-[#62718a]",
  };

  const caseStatus =
    caseStatusLabels[activeCase?.status] ||
    activeCase?.status ||
    "غير محددة";

  const caseStatusClass =
    caseStatusStyles[activeCase?.status] ||
    "bg-[#edf3ff] text-[#62718a]";

  /* ================= Client ================= */

  const client = activeCase?.client;

  const clientName = client?.name || "غير معروف";

  const clientImage =
    client?.profileImage?.url || "";

  const clientIdentity = client?.nationalId
    ? `رقم الهوية: ${client.nationalId}`
    : "رقم الهوية: غير محدد";

  /* ================= Lawyers ================= */

  const lawyers = Array.isArray(activeCase?.lawyers)
    ? activeCase.lawyers
    : [];

  const mainLawyer = lawyers[0];

  const lawyerName =
    mainLawyer?.name || "غير محدد";

  const lawyerImage =
    mainLawyer?.profileImage?.url || "";

  const lawyerRole =
    mainLawyer?.role === "office_owner"
      ? "مدير المكتب"
      : mainLawyer?.role === "lawyer"
        ? "محامي"
        : mainLawyer?.role || "محامي مسؤول";

  /* ================= Sessions ================= */

  const sessions = Array.isArray(activeCase?.sessions)
    ? activeCase.sessions
    : [];

  const sortedSessions = [...sessions].sort(
    (a, b) => {
      return (
        new Date(a?.sessionDate || 0) -
        new Date(b?.sessionDate || 0)
      );
    }
  );

  const now = new Date();

  const upcomingSession = sortedSessions.find(
    (session) =>
      session?.sessionDate &&
      new Date(session.sessionDate) >= now
  );

  const lastSession = [...sortedSessions]
    .reverse()
    .find(
      (session) =>
        session?.sessionDate &&
        new Date(session.sessionDate) < now
    );

  /* ================= Updates ================= */

  const updates = [];

  if (upcomingSession) {
    updates.push({
      title: "تم تحديد موعد الجلسة القادمة",

      description: upcomingSession?.court
        ? `سيتم عقد الجلسة في ${upcomingSession.court}`
        : "تم تحديد موعد الجلسة القادمة",

      status: "جديد",

      statusClass:
        "bg-[#fff0f0] text-[#d34c4c]",
    });
  }

  if (activeCase?.updatedAt) {
    updates.push({
      title: "تم تحديث ملف القضية",

      description: `آخر تحديث ${formatDateLong(
        activeCase.updatedAt
      )}`,

      status: "مكتمل",

      statusClass:
        "bg-[#e8f1ff] text-[#60718d]",
    });
  }

  if (!updates.length) {
    updates.push({
      title: "لا توجد تحديثات جديدة",

      description:
        "لم يتم تسجيل تحديثات على القضية حتى الآن",

      status: "مكتمل",

      statusClass:
        "bg-[#e8f1ff] text-[#60718d]",
    });
  }

  /* ================= Dates ================= */

  const dates = [
    {
      label: "الجلسة القادمة",

      value: upcomingSession?.sessionDate
        ? formatDate(
            upcomingSession.sessionDate
          )
        : activeCase?.nextHearingDate
          ? formatDate(
              activeCase.nextHearingDate
            )
          : "غير محدد",
    },

    {
      label: "آخر جلسة",

      value: lastSession?.sessionDate
        ? formatDate(lastSession.sessionDate)
        : "غير محدد",
    },

    {
      label: "تاريخ التسجيل",

      value: activeCase?.filingDate
        ? formatDate(activeCase.filingDate)
        : activeCase?.createdAt
          ? formatDate(activeCase.createdAt)
          : "غير محدد",
    },
  ];

  /* ================= Sessions Count ================= */

  const sessionsCount =
    activeCase?.sessionsCount ??
    sessions.length ??
    0;

  return (
    <div dir="rtl" className="w-full">

      {/* ================= Info Banner ================= */}

      <div className="mt-6 flex flex-col gap-4 rounded-xl bg-[#e4efff] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">

        <div className="flex items-center gap-3">

          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-[#52627c]">

            <Crown size={17} />

          </div>

          <div>

            <h3 className="text-[10px] font-bold text-[#23314a]">

              متابعة القضايا والمستندات القانونية

            </h3>

            <p className="mt-1 text-[8px] text-[#71809a]">

              يمكنك متابعة جميع تفاصيل القضية من خلال صفحة التفاصيل.

            </p>

          </div>

        </div>

      </div>


      {/* ================= Active Case ================= */}

      <section className="mt-5 overflow-hidden rounded-xl border border-[#edf0f5] border-t-4 border-t-[#d8b63e] bg-white shadow-sm">


        {/* ================= Case Header ================= */}

        <div className="flex items-start justify-between px-6 py-5">

          <div className="text-right">

            <span
              className={`inline-flex rounded-full px-3 py-1 text-[7px] font-bold ${caseStatusClass}`}
            >

              {caseStatus}

            </span>

            <h2 className="mt-3 text-[14px] font-bold text-[#172033]">

              قضية رقم #
              {activeCase?.caseNumber ||
                "غير محدد"}

            </h2>

            <p className="mt-1 text-[8px] text-[#929baa]">

              تفاصيل القضية ومتابعة الإجراءات القانونية

            </p>

          </div>

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#111827] text-white">

            <Scale size={18} />

          </div>

        </div>


        {/* ================= Case Information ================= */}

        <div className="mx-6 grid grid-cols-1 gap-3 rounded-xl bg-[#edf3ff] p-4 sm:grid-cols-3">


          <div className="text-right">

            <p className="text-[7px] text-[#8995a8]">

              رقم القضية

            </p>

            <p className="mt-2 text-[10px] font-bold text-[#243149]">

              {activeCase?.caseNumber
                ? `#${activeCase.caseNumber}`
                : "غير محدد"}

            </p>

          </div>


          <div className="text-right">

            <p className="text-[7px] text-[#8995a8]">

              تاريخ الإنشاء

            </p>

            <p className="mt-2 text-[10px] font-bold text-[#243149]">

              {formatDateLong(
                activeCase?.createdAt ||
                  activeCase?.filingDate
              )}

            </p>

          </div>


          <div className="text-right">

            <p className="text-[7px] text-[#8995a8]">

              المحكمة

            </p>

            <p className="mt-2 text-[10px] font-bold text-[#243149]">

              {activeCase?.court ||
                "غير محددة"}

            </p>

          </div>


        </div>


        {/* ================= Client & Lawyer ================= */}

        <div className="grid grid-cols-1 gap-8 px-6 py-6 sm:grid-cols-2">


          {/* Client */}

          <div className="text-right">

            <p className="mb-3 text-[8px] font-bold text-[#697589]">

              بيانات العميل

            </p>

            <div className="flex items-center gap-3">


              <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#111827] text-[9px] font-bold text-white">

                {clientImage ? (

                  <img
                    src={clientImage}
                    alt={clientName}
                    className="object-cover w-full h-full"
                  />

                ) : (

                  getInitial(clientName)

                )}

              </div>


              <div>

                <p className="text-[9px] font-bold text-[#202a3b]">

                  {clientName}

                </p>

                <p className="mt-1 text-[7px] text-[#9aa3b1]">

                  {clientIdentity}

                </p>

              </div>

            </div>

          </div>


          {/* Lawyer */}

          <div className="text-right">

            <p className="mb-3 text-[8px] font-bold text-[#697589]">

              المحامي المسؤول

            </p>

            <div className="flex items-center gap-3">


              <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#edf3ff] text-[9px] font-bold text-[#526786]">

                {lawyerImage ? (

                  <img
                    src={lawyerImage}
                    alt={lawyerName}
                    className="object-cover w-full h-full"
                  />

                ) : (

                  getInitial(lawyerName)

                )}

              </div>


              <div>

                <p className="text-[9px] font-bold text-[#202a3b]">

                  {lawyerName}

                </p>

                <p className="mt-1 text-[7px] text-[#9aa3b1]">

                  {lawyerRole}

                </p>

              </div>

            </div>

          </div>

        </div>


        {/* ================= Case Summary ================= */}

        <div className="px-6">

          <div className="rounded-xl bg-[#dfeeff] p-5">

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">


              <div className="text-right">

                <p className="text-[8px] text-[#77869e]">

                  رقم القضية

                </p>

                <p className="mt-2 text-[22px] font-bold text-[#111827]">

                  #{activeCase?.caseNumber ||
                    "غير محدد"}

                </p>

              </div>


              <div className="text-right sm:text-left">

                <p className="text-[7px] text-[#8794a9]">

                  عدد الجلسات

                </p>

                <p className="mt-2 text-[9px] font-bold text-[#26344d]">

                  {sessionsCount} جلسة

                </p>

              </div>


            </div>

          </div>

        </div>


        {/* ================= Updates ================= */}

        <div className="px-6 py-6">


          <div className="flex items-center justify-between mb-3">

            <h3 className="text-[9px] font-bold text-[#354157]">

              آخر تحديثات القضية

            </h3>

            <span className="rounded-full bg-[#edf3ff] px-3 py-1 text-[7px] text-[#65748d]">

              آخر تحديث

            </span>

          </div>


          <div className="space-y-2">

            {updates.map((update, index) => (

              <div
                key={index}
                className="flex items-center justify-between gap-4 rounded-lg bg-[#edf3ff] px-4 py-3 transition hover:bg-[#e8f0fc]"
              >

                <div className="text-right">

                  <p className="text-[8px] font-bold text-[#29364c]">

                    {update.title}

                  </p>

                  <p className="mt-1 text-[7px] text-[#8a96a8]">

                    {update.description}

                  </p>

                </div>

                <span
                  className={`shrink-0 rounded-md px-2 py-1 text-[7px] font-bold ${update.statusClass}`}
                >

                  {update.status}

                </span>

              </div>

            ))}

          </div>


          {/* ================= Dates ================= */}

          <div className="mt-5">


            <div className="flex items-center gap-2 mb-4">

              <CalendarDays
                size={13}
                className="text-[#697589]"
              />

              <h3 className="text-[9px] font-bold text-[#354157]">

                مواعيد القضية

              </h3>

            </div>


            <div className="space-y-3">

              {dates.map((date, index) => (

                <div
                  key={index}
                  className="flex items-center justify-between border-b border-[#f0f2f6] pb-3 last:border-0"
                >

                  <span className="text-[8px] text-[#68758a]">

                    {date.label}

                  </span>

                  <span className="text-[8px] font-bold text-[#28354b]">

                    {date.value}

                  </span>

                </div>

              ))}

            </div>

          </div>


        

        </div>

      </section>

    </div>
  );
};

export default NearActiveCase;