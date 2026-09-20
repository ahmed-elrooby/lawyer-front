"use client";

import React from "react";
import { FaArrowRight } from "react-icons/fa";

const BackButton = () => {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <button
      type="button"
      onClick={handleGoBack}
      className="inline-flex items-center justify-center gap-2 px-6 py-3 mt-8 text-sm font-semibold text-white transition rounded-xl bg-[#0B1C30] hover:bg-[#162B42]"
    >
      <FaArrowRight />
      العودة للصفحة السابقة
    </button>
  );
};

export default BackButton;