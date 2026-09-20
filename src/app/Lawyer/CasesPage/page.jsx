import Cases from "../components/Cases/Cases";

export const metadata = {
  title: "القضايا",
  description: "إدارة ومتابعة القضايا الخاصة بالمحامي في منصة قضاء.",

  robots: {
    index: false,
    follow: false,
  },
};

const Page = () => {
  return <Cases />;
};

export default Page;