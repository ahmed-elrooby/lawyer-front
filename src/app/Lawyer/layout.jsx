import LayoutClient from "./LayoutClient";

export const metadata = {
  title: "لوحة تحكم المحامي",
  description: "لوحة تحكم المحامي في منصة قضاء لإدارة القضايا والعملاء والجلسات.",

  robots: {
    index: false,
    follow: false,
  },
};

export default function Layout({ children }) {
  return <LayoutClient>{children}</LayoutClient>;
}