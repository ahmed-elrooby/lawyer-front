
"use client";

import React, { useState } from "react";
import OwnerProvider from "../../Providers/LawyerOwner/OwnerProvider.js";
import Header from "./components/Header/Header.jsx";
import Aside from "./components/Aside/Aside.jsx";
import Footer from "./components/Footer/Footer.jsx";
// import Aside from "./components/Aside/Aside.jsx";
// import Footer from "./components/Footer/Footer.jsx";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <OwnerProvider>
      <div
     
        className="min-h-screen w-full overflow-x-hidden bg-[#f5f7fb] font-cairo text-slate-900"
      >
        {/* ================= MOBILE OVERLAY ================= */}
        <div
          onClick={closeSidebar}
          className={`fixed inset-0 z-40 bg-slate-900/35 transition-opacity duration-300 md:hidden ${
            sidebarOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }`}
        />

        {/* ================= SIDEBAR ================= */}
        <aside
          className={`
            fixed
            right-0
            top-0
            z-50
            flex
            h-screen
            w-[250px]
            flex-col
            border-l
            border-slate-200
            bg-white
            px-3
            py-4
            transition-transform
            duration-300
            ease-in-out

            ${
              sidebarOpen
                ? "translate-x-0"
                : "translate-x-full md:translate-x-0"
            }
          `}
        >
    
          
          <Aside
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
          
        </aside>

        {/* ================= MAIN ================= */}
        <div
          className="
            min-h-screen
            mr-0
            transition-all
            duration-300
            md:mr-[250px]
          "
        >
          <main className="w-full min-h-screen px-2 py-4 md:px-6 ">
            {/* Header */}
            <Header onMenuClick={toggleSidebar} />

            {/* Page Content */}
            <div className="w-full min-w-0">
              {children}
            </div>

            {/* Footer */}
            <Footer/>
          </main>
        </div>
      </div>
    </OwnerProvider>
  );
};

export default Layout;

