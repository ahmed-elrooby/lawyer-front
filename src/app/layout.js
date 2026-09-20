import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryProvider from "../Providers/QueryProvider/query.js";
import Auth from "../Providers/AuthProvider/Auth.js";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "قضاء | منصة إدارة مكاتب المحاماة",
    template: "%s | قضاء",
  },

  description:
    "قضاء منصة ذكية لإدارة مكاتب المحاماة وتنظيم القضايا والعملاء والجلسات والمحامين والملفات من مكان واحد.",

  keywords: [
    "قضاء",
    "إدارة مكاتب المحاماة",
    "برنامج إدارة مكاتب المحاماة",
    "نظام إدارة المحامين",
    "إدارة القضايا",
    "إدارة العملاء",
    "إدارة جلسات المحاكم",
    "برنامج للمحامين",
    "نظام مكاتب المحاماة",
  ],

  authors: [
    {
      name: "Main Tech",
    },
  ],

  creator: "Main Tech",
  publisher: "Main Tech",

  applicationName: "قضاء",

  metadataBase: new URL("https://rassid.tech"),

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "ar_EG",
    url: "https://rassid.tech",
    siteName: "قضاء",
    title: "قضاء | منصة إدارة مكاتب المحاماة",
    description:
      "منصة ذكية لإدارة مكاتب المحاماة وتنظيم القضايا والعملاء والجلسات والملفات من مكان واحد.",
  },

  twitter: {
    card: "summary_large_image",
    title: "قضاء | منصة إدارة مكاتب المحاماة",
    description:
      "منصة ذكية لإدارة مكاتب المحاماة وتنظيم القضايا والعملاء والجلسات والملفات.",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body>
        <QueryProvider>
          <Auth>{children}</Auth>
        </QueryProvider>

        <Toaster />
      </body>
    </html>
  );
}