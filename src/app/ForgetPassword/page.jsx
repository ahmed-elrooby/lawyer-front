import ForgetPassword from "../components/ForgetPassword/ForgetPassword.jsx";

export const metadata = {
  title: "نسيت كلمة المرور",
  description: "استعادة كلمة المرور لحسابك في منصة قضاء.",

  robots: {
    index: false,
    follow: false,
  },
};

const Page = () => {
  return <ForgetPassword />;
};

export default Page;