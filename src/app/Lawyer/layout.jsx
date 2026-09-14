"use client";
import React, { useState } from "react";
import Aside from "./components/Aside/Aside";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import LawyerProvider from "../../Providers/LawyerContext/lawyer.js";

const Layout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  return <LawyerProvider>
  
    <div className="flex min-h-screen text-white bg-slate-800">
      
      {/* Sidebar */}
      <Aside collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Main */}
      <div
        className={`flex-1 transition-all duration-300
        ${collapsed ? "md:pr-[80px]" : "md:pr-[260px]"}
        pr-0`}
      >
        <Header />

        <main className="p-2 md:p-4">
          {children}
        </main>
         <Footer/>
      </div>
     
    </div>
</LawyerProvider>
};

export default Layout;