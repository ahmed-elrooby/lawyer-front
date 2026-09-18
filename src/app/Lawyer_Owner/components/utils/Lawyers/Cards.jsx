import React from "react";
import { BsPatchCheck } from "react-icons/bs";
import { FaGavel, FaRegAddressCard } from "react-icons/fa";
import { RiUserVoiceLine } from "react-icons/ri";
import { TfiMedall } from "react-icons/tfi";

const Cards = () => {
  const cards = [
    {
      title: "إجمالي الهيئة القانونية",
      value: "12",
      description: "محامياً ومستشاراً",
      icon: <FaRegAddressCard />,
      iconColor: "text-[#545F73]",
      iconBg: "bg-[#E5EEFF]",
    },
    {
      title: "المحامون النشطون اليوم",
      value: "12",
      description: "متصلون وميدانيون",
      icon: <RiUserVoiceLine />,
      iconColor: "text-[#545F73]",
      iconBg: "bg-[#E5EEFF]",
      progress: true,
      progressValue: 83,
    },
    {
      title: "القضايا قيد الترافع",
      value: "12",
      description: "قضية نشطة",
      icon: <FaGavel />,
      iconColor: "text-[#131B2E]",
      iconBg: "bg-[#E5EEFF]",
      extra: "6.3 قضية / محامٍ",
    },
    {
      title: "معدل كفاءة الإغلاق والنجاح",
      value: "88.5%",
      description: "تصنيف متميز (A)",
      icon: <TfiMedall />,
      iconColor: "text-[#755B00]",
      iconBg: "bg-[#FFE08E]",
      success: true,
    },
  ];

  return (
    <div
      dir="rtl"
      className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
    >
      {cards.map((card, index) => (
        <div
          key={index}
          className="p-5 transition-all duration-200 bg-white shadow-lg  sm:p-6 rounded-xl hover:-translate-y-1 hover:shadow-xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-[#45464D] font-bold text-sm">
              {card.title}
            </h3>

            <div
              className={`
                flex
                h-10
                w-10
                shrink-0
                rounded-lg
                text-lg
                items-center
                justify-center
                ${card.iconBg}
                ${card.iconColor}
              `}
            >
              {card.icon}
            </div>
          </div>

          {/* Main Value */}
          <div className="flex items-center gap-2 mt-3 text-right">
            <h1 className="text-3xl sm:text-4xl text-[#0B1C30] font-bold">
              {card.value}
            </h1>

            <span
              className={`
                text-xs
                ${
                  card.success
                    ? "text-[#755B00] font-bold"
                    : "text-[#45464D]"
                }
              `}
            >
              {card.description}
            </span>
          </div>

          {/* Progress */}
          {card.progress && (
            <div className="flex items-center justify-between gap-3 mt-3">
              <div className="flex-1 h-1.5 bg-[#E5EEFF] rounded-full overflow-hidden">
                <span
                  className="block h-full bg-[#111827] rounded-full"
                  style={{ width: `${card.progressValue}%` }}
                />
              </div>

              <span className="text-sm font-bold text-[#0B1C30] whitespace-nowrap">
                {card.progressValue}% جاهزية
              </span>
            </div>
          )}

          {/* Extra Info */}
          {card.extra && (
            <div className="flex items-center justify-between gap-2 mt-3 text-xs">
              <span className="text-[#45464D]">
                متوسط الإسناد الفردي:
              </span>

              <span className="font-bold text-[#0B1C30] whitespace-nowrap">
                {card.extra}
              </span>
            </div>
          )}

          {/* Success Info */}
          {card.success && (
            <div className="flex items-center gap-1.5 mt-3">
              <BsPatchCheck className="text-[#755B00] shrink-0" />

              <p className="text-[#45464D] text-xs leading-5">
                أحكام مكتسبة وتسويات لصالح الموكلين
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Cards;