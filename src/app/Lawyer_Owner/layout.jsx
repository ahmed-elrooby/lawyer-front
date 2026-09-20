import LayoutClient from "./LayoutClient";

export const metadata = {
  title: "مركز قيادة المكتب",
  description:
    "مركز قيادة مكتب المحاماة في منصة قضاء لإدارة القضايا والعملاء والمحامين والجلسات.",

  robots: {
    index: false,
    follow: false,
  },
};

export default function Layout({ children }) {
  return <LayoutClient>{children}</LayoutClient>;
}