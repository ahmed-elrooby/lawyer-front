import Home from "./components/Home/Home";

export const metadata = {
  title: "لوحة تحكم المحامي",
  description:
    "لوحة تحكم المحامي في منصة قضاء لإدارة القضايا والعملاء والجلسات.",

  robots: {
    index: false,
    follow: false,
  },
};

const Page = () => {
  return <Home />;
};

export default Page;