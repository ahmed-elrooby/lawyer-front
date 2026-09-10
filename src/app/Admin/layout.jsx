"use client";

import React, { useState } from "react";
import Header from "./components/Header/Header";
import Sidebar from "./components/Aside/Aside";
import Footer from "./components/Footer/Footer";
import Admin from "../../Providers/AdminContext/Admin.js";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <>
      <Admin>
        <div className="relative flex h-screen ">
          {/* Sidebar - Responsive */}
          <div
            className={`
          fixed inset-y-0 right-0 z-30 transform transition-transform duration-300 ease-in-out
          lg:relative lg:translate-x-0 lg:flex lg:z-auto
          ${sidebarOpen ? "translate-x-0" : "translate-x-full"}
        `}
          >
            <Sidebar onClose={closeSidebar} />
          </div>

          {/* Overlay when sidebar is open on mobile */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 z-20 bg-black/50 lg:hidden"
              onClick={closeSidebar}
            />
          )}

          {/* Main Content */}
          <div className="flex flex-col flex-1 overflow-hidden">
            {/* Header with toggle button */}
            <Header onMenuClick={toggleSidebar} />

            {/* Page Content */}
            <main className="flex-1 p-4 overflow-y-auto md:p-6">
              {children}
            </main>
            <Footer />
          </div>
        </div>
      </Admin>
    </>
  );
};

export default Layout;
