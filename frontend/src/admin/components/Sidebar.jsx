// import { Link, useLocation } from "react-router-dom";
// import {
//   Package,
//   Users,
//   ShoppingCart,
//   CreditCard,
//   Home,
//   LogOut,
//   Library,
// } from "lucide-react";

// function Sidebar() {
//   const location = useLocation();

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("userId");
//     localStorage.removeItem("role");

//     window.location.href = "/login";
//   };

//   // ✅ Check if the path is active
//   const isActive = (path) =>
//     location.pathname === path
//       ? "bg-gray-800 text-green-400 border-l-4 border-green-500"
//       : "text-white hover:bg-gray-800";

//   return (
//     <aside className="w-64 bg-gray-900 text-white flex flex-col">
//       <div className="h-16 flex items-center justify-center text-xl font-bold border-b border-gray-700">
//         Swachh Admin
//       </div>

//       <nav className="flex-1 p-4 space-y-2">
//         <Link to="/admin">
//           <button
//             className={`flex items-center space-x-3 p-2 rounded-r-lg w-full text-left transition-all duration-300 ${isActive(
//               "/admin"
//             )}`}
//           >
//             <Home size={18} /> <span>Dashboard</span>
//           </button>
//         </Link>

//         <Link to="/admin/allproducts">
//           <button
//             className={`flex items-center space-x-3 p-2 rounded-r-lg w-full text-left transition-all duration-300 ${isActive(
//               "/admin/allproducts"
//             )}`}
//           >
//             <Package size={18} /> <span>All Products</span>
//           </button>
//         </Link>

//         <Link to="/admin/customers">
//           <button
//             className={`flex items-center space-x-3 p-2 rounded-r-lg w-full text-left transition-all duration-300 ${isActive(
//               "/admin/customers"
//             )}`}
//           >
//             <Users size={18} /> <span>Customers</span>
//           </button>
//         </Link>

//         <Link to="/admin/orders">
//           <button
//             className={`flex items-center space-x-3 p-2 rounded-r-lg w-full text-left transition-all duration-300 ${isActive(
//               "/admin/orders"
//             )}`}
//           >
//             <ShoppingCart size={18} /> <span>Orders</span>
//           </button>
//         </Link>

//         <Link to="/admin/coupons">
//           <button
//             className={`flex items-center space-x-3 p-2 rounded-r-lg w-full text-left transition-all duration-300 ${isActive(
//               "/admin/coupons"
//             )}`}
//           >
//             <CreditCard size={18} /> <span>Coupons</span>
//           </button>
//         </Link>

//         <Link to="/admin/leads">
//           <button
//             className={`flex items-center space-x-3 p-2 rounded-r-lg w-full text-left transition-all duration-300 ${isActive(
//               "/admin/leads"
//             )}`}
//           >
//             <Library size={18} /> <span>Leads</span>
//           </button>
//         </Link>

//         {/* <Link to="/admin/celebrity-leads">
//           <button
//             className={`flex items-center space-x-3 p-2 rounded-r-lg w-full text-left transition-all duration-300 ${isActive(
//               "/admin/celebrity-leads"
//             )}`}
//           >
//             <Library size={18} /> <span>Celebrity Leads</span>
//           </button>
//         </Link> */}

//         <button
//           onClick={handleLogout}
//           className="flex items-center space-x-3 p-2 rounded-r-lg w-full text-left text-red-400 hover:bg-gray-800"
//         >
//           <LogOut size={18} /> <span>Logout</span>
//         </button>
//       </nav>
//     </aside>
//   );
// }

// export default Sidebar;

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Package,
  Users,
  ShoppingCart,
  CreditCard,
  Home,
  LogOut,
  Library,
  Menu,
  X,
} from "lucide-react";

function Sidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true); // sidebar open state
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Handle screen resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    window.location.href = "/login";
  };

  const isActive = (path) =>
    location.pathname === path
      ? "bg-gray-800 text-green-400 border-l-4 border-green-500"
      : "text-white hover:bg-gray-800";

  // Toggle sidebar for small screens
  const toggleSidebar = () => setIsOpen(!isOpen);

  // Determine if we are on mobile/tablet
  const isMobile = windowWidth < 1024; // <1024px = tablet/mobile

  return (
    <>
      {/* Toggle button for mobile/tablet */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 bg-gray-900 p-2 rounded-md text-white shadow-lg"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-gray-900 text-white flex flex-col transition-transform duration-300 z-40 ${
          isMobile
            ? isOpen
              ? "translate-x-0 w-64"
              : "-translate-x-full w-64"
            : "translate-x-0 w-64"
        }`}
      >
        <div className="h-16 flex items-center justify-center text-xl font-bold border-b border-gray-700">
          Swachh Admin
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Link to="/admin">
            <button
              className={`flex items-center space-x-3 p-2 rounded-r-lg w-full text-left transition-all duration-300 ${isActive(
                "/admin"
              )}`}
            >
              <Home size={18} /> <span>Dashboard</span>
            </button>
          </Link>

          <Link to="/admin/allproducts">
            <button
              className={`flex items-center space-x-3 p-2 rounded-r-lg w-full text-left transition-all duration-300 ${isActive(
                "/admin/allproducts"
              )}`}
            >
              <Package size={18} /> <span>All Products</span>
            </button>
          </Link>

          <Link to="/admin/customers">
            <button
              className={`flex items-center space-x-3 p-2 rounded-r-lg w-full text-left transition-all duration-300 ${isActive(
                "/admin/customers"
              )}`}
            >
              <Users size={18} /> <span>Customers</span>
            </button>
          </Link>

          <Link to="/admin/orders">
            <button
              className={`flex items-center space-x-3 p-2 rounded-r-lg w-full text-left transition-all duration-300 ${isActive(
                "/admin/orders"
              )}`}
            >
              <ShoppingCart size={18} /> <span>Orders</span>
            </button>
          </Link>

          <Link to="/admin/coupons">
            <button
              className={`flex items-center space-x-3 p-2 rounded-r-lg w-full text-left transition-all duration-300 ${isActive(
                "/admin/coupons"
              )}`}
            >
              <CreditCard size={18} /> <span>Coupons</span>
            </button>
          </Link>

          <Link to="/admin/leads">
            <button
              className={`flex items-center space-x-3 p-2 rounded-r-lg w-full text-left transition-all duration-300 ${isActive(
                "/admin/leads"
              )}`}
            >
              <Library size={18} /> <span>Leads</span>
            </button>
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 p-2 rounded-r-lg w-full text-left text-red-400 hover:bg-gray-800"
          >
            <LogOut size={18} /> <span>Logout</span>
          </button>
        </nav>
      </aside>

      {/* Overlay for mobile when sidebar is open */}
      {isMobile && isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black opacity-50 z-30"
        />
      )}
    </>
  );
}

export default Sidebar;
