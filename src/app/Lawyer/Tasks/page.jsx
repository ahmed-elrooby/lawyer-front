import React from "react";
import Tasks from "../components/Tasks/Tasks.jsx";

export const metadata = {
  title: "المهام الموكلة إليك | قضاء",
  description:
    "تابع المهام والتعليمات الموكلة إليك من إدارة مكتب المحاماة وحدّث حالة تنفيذها بسهولة عبر منصة قضاء.",
};

const page = () => {
  return (
    <>
      <Tasks />
    </>
  );
};

export default page;