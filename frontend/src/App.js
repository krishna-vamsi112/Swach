import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./admin/components/Sidebar";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  const location = useLocation();

  // 🔹 Hide Header & Footer for admin dashboard
  const isDashboard = location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen flex flex-col">
      {!isDashboard && <Header />}

      <main>
        {/* {isDashboard && <Sidebar />} */}
        <Outlet /> {/* Pages will render here */}

            </main>
       {/* WhatsApp Button */}
        {/* <a
          href="https://wa.me/919160213146"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-20 right-6 p-3 rounded-full bg-[#25D366] text-white shadow-lg hover:bg-green-600 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32" fill="currentColor">
            <path d="M16 3C9.373 3 4 8.373 4 15c0 2.637.86 5.08 2.34 7.09L4 29l7.18-2.31A12.93 12.93 0 0 0 16 27c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 22c-1.98 0-3.89-.52-5.54-1.5l-.39-.23-4.28 1.38 1.4-4.17-.25-.4A9.94 9.94 0 0 1 6 15c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10zm5.13-7.47c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.4-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.32.42-.48.14-.16.18-.28.28-.46.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47-.16-.01-.34-.01-.52-.01-.18 0-.48.07-.73.34-.25.27-.97.95-.97 2.3 0 1.35.99 2.65 1.13 2.83.14.18 1.95 2.98 4.74 4.06.66.23 1.18.37 1.58.47.66.17 1.26.15 1.74.09.53-.08 1.65-.67 1.89-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.19-.53-.33z"/>
          </svg>
        </a> */}
      {!isDashboard && <Footer />}
      
            <ScrollToTop />

    </div>
  );
}
