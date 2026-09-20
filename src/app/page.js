
import Login from "./components/Login/Login.jsx";

export const metadata = {
  title: "تسجيل الدخول | قضاء",
  description:
    "تسجيل الدخول إلى منصة قضاء لإدارة مكاتب المحاماة وتنظيم القضايا والعملاء والمحامين.",

  robots: {
    index: false,
    follow: false,
    nocache: true,
  },

  openGraph: {
    title: "تسجيل الدخول | قضاء",
    description:
      "تسجيل الدخول إلى منصة قضاء لإدارة مكاتب المحاماة.",
    type: "website",
    locale: "ar_EG",
    siteName: "قضاء",
  },

  twitter: {
    card: "summary",
    title: "تسجيل الدخول | قضاء",
    description:
      "تسجيل الدخول إلى منصة قضاء لإدارة مكاتب المحاماة.",
  },
};

export default function Home() {
  return <Login />;
}
