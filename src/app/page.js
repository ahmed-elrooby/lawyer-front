import Login from "./components/Login/Login.jsx";

export const metadata = {
  title: "تسجيل الدخول",
  description: "تسجيل الدخول إلى منصة قضاء لإدارة مكاتب المحاماة.",

  robots: {
    index: false,
    follow: false,
  },
};

export default function Home() {
  return <Login />;
}