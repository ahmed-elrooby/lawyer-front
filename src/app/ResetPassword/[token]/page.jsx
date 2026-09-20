import ResetPassword from "../../components/ResetPassword/ResetPassword.jsx";

export const metadata = {
  title: "إعادة تعيين كلمة المرور",
  description: "إعادة تعيين كلمة المرور لحسابك في منصة قضاء.",

  robots: {
    index: false,
    follow: false,
  },
};

const Page = () => {
  return <ResetPassword />;
};

export default Page;