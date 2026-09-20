
import Login from "./components/Login/Login.jsx";

export const metadata = {
  title: "قضاء | منصة إدارة مكاتب المحاماة",
  description:
    "قضاء منصة ذكية لإدارة مكاتب المحاماة، تساعدك على تنظيم القضايا والعملاء والمحامين والجلسات والمواعيد من مكان واحد.",

  keywords: [
    "قضاء",
    "إدارة مكاتب المحاماة",
    "برنامج إدارة مكاتب المحاماة",
    "برنامج للمحامين",
    "إدارة القضايا",
    "إدارة العملاء",
    "برنامج محاماة",
  ],

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "قضاء | منصة إدارة مكاتب المحاماة",
    description:
      "منصة متكاملة لإدارة مكاتب المحاماة وتنظيم القضايا والعملاء والمحامين والجلسات.",
    type: "website",
    locale: "ar_EG",
    siteName: "قضاء",
  },

  twitter: {
    card: "summary",
    title: "قضاء | منصة إدارة مكاتب المحاماة",
    description:
      "منصة متكاملة لإدارة مكاتب المحاماة وتنظيم القضايا والعملاء والمحامين والجلسات.",
  },
};

export default function Home() {
  return <Login />;
}

