import React from "react";
import Tasks from "../components/Tasks/Tasks.jsx";

export const metadata = {
  title: "توزيع المهام | قضاء",
  description:
    "إدارة وتوزيع المهام على محامي المكتب ومتابعة حالة تنفيذها عبر منصة قضاء.",
};

const page = () => {
  return (
    <>
      <Tasks />
    </>
  );
};

export default page;