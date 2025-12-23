import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";
import { ShoppingCart, User } from "lucide-react";
import LoginOptionsModal from "./Loginoptions";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const handleCartUpdate = () => {
      const savedCart = localStorage.getItem("cartItems");
      setCartItems(savedCart ? JSON.parse(savedCart) : []);
    };
    window.addEventListener("cartUpdated", handleCartUpdate);
    window.addEventListener("storage", handleCartUpdate);
    handleCartUpdate();
    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
      window.removeEventListener("storage", handleCartUpdate);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    localStorage.removeItem("cartItems")
    localStorage.removeItem("checkoutItems")
    localStorage.removeItem("rzp_checkout_anon_id")
    localStorage.removeItem("rzp_device_id")
    localStorage.removeItem("rzp_stored_checkout_id")
    setIsLoggedIn(false);
    navigate("/");
    window.location.reload();
  };

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        profileRef.current &&
        !profileRef.current.contains(e.target)
      ) {
        setProfileMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Desktop NavLink class (with pseudo-element effect)
  const navLinkClasses = ({ isActive }) =>
    `relative px-3 py-1 transition-all duration-300 border rounded-md ${
      isActive
        ? "text-white border-[#667D60] before:absolute before:inset-0 before:rounded-md before:bg-[#667D60] before:-z-10 before:scale-x-100 before:opacity-100"
        : "border-transparent hover:text-black hover:border-[#667D60] before:absolute before:inset-0 before:rounded-md before:-z-10 before:scale-x-0 before:opacity-0 hover:before:scale-x-100 hover:before:opacity-100"
    } before:transition-transform before:duration-300 before:origin-left`;

  // Mobile NavLink class (border only on hover, active has background)
  const mobileNavLinkClasses = ({ isActive }) =>
    `relative px-3 py-2 transition-all duration-300 border border-transparent font-semibold ${
      isActive
        ? "bg-[#667D60] text-white rounded-md"
        : "hover:border-[#667D60] hover:text-[#667D60]"
    }`;

  return (
    <div className="sticky top-0 z-50">
      {/* Top Bar */}
      <div className="card shadow-lg bg-[#667D60] w-full h-12 flex items-center overflow-hidden relative">
        <div className="animate-marquee flex whitespace-nowrap">
          {Array(4)
            .fill("⭐ The Swacchh Products - From Soil to Soul ⭐")
            .map((text, i) => (
              <span key={i} className="text-white font-semibold mx-8">
                {text}
              </span>
            ))}
        </div>
        <style>
          {`
            @keyframes marquee {
              0% { transform: translateX(-50%); }
              100% { transform: translateX(100%); }
            }
            .animate-marquee {
              min-width: 80%;
              display: flex;
              animation: marquee 20s linear infinite;
            }
          `}
        </style>
      </div>

      {/* Main Navbar */}
      <div className="card shadow-lg bg-[#f8f5ee] w-full md:h-20 relative z-50">
        <div className="flex justify-between items-center px-6 md:px-10 h-full">
          {/* Logo */}
          <Link to="/" onClick={() => setMenuOpen(false)}>
            <img
              src={logo}
              alt="Logo"
              className="w-20 h-20 md:w-20 md:h-16 xl:w-28 xl:h-20 lg:w-24 lg:h-20 cursor-pointer"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex lg:flex flex-row items-center md:space-x-2 xl:space-x-8 lg:space-x-6 font-bold text-gray-700 relative">
            <NavLink to="/" end className={navLinkClasses}>
              Home
            </NavLink>
            <NavLink to="/products" className={navLinkClasses}>
              Products
            </NavLink>
            <NavLink to="/about" className={navLinkClasses}>
              About Us
            </NavLink>
            <NavLink to="/blog" className={navLinkClasses}>
              Blog
            </NavLink>
            <NavLink to="/contact" className={navLinkClasses}>
              Contact Us
            </NavLink>
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center md:space-x-4 lg:space-x-6 xl:space-x-6">
            <Link to="/cart" className="relative">
              <ShoppingCart className="w-8 h-8 text-green-700" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {cartItems.reduce((a, c) => a + (c.qty || 1), 0)}
                </span>
              )}
            </Link>

            {isLoggedIn ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileMenu(!profileMenu)}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-[#667D60] text-white hover:bg-green-700 transition"
                >
                  <User className="w-6 h-6" />
                </button>

                <div
                  className={`absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50 transform transition-all duration-300 ease-out origin-top-right ${
                    profileMenu
                      ? "opacity-100 scale-100 translate-y-0"
                      : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                  }`}
                >
                  <Link
                    to="/ProfilePage"
                    className="block px-4 py-2 hover:bg-gray-100 transition"
                  >
                    My Profile
                  </Link>
                  <Link
                    to="/Myorders"
                    className="block px-4 py-2 hover:bg-gray-100 transition"
                  >
                    My Orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                  >
                    Log Out
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowLoginModal(true)}
                className="bg-[#667D60] text-white md:px-1.5 md:py-1.5 xl:px-6 xl:py-2 lg:px-6 lg:py-2 rounded-lg hover:bg-green-700 transition"
              >
                Log In
              </button>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-gray-700 focus:outline-none text-3xl"
            aria-label="Toggle Menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-[#f8f5ee] shadow-lg transition-all duration-300 ${
          menuOpen
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="flex flex-col space-y-4 py-4 px-6 font-bold text-gray-700">
          <NavLink
            to="/"
            end
            className={mobileNavLinkClasses}
            onClick={() => setMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            className={mobileNavLinkClasses}
            onClick={() => setMenuOpen(false)}
          >
            Products
          </NavLink>
          <NavLink
            to="/about"
            className={mobileNavLinkClasses}
            onClick={() => setMenuOpen(false)}
          >
            About Us
          </NavLink>
          <NavLink
            to="/blog"
            className={mobileNavLinkClasses}
            onClick={() => setMenuOpen(false)}
          >
            Blog
          </NavLink>
          <NavLink
            to="/contact"
            className={mobileNavLinkClasses}
            onClick={() => setMenuOpen(false)}
          >
            Contact Us
          </NavLink>

          <Link
            to="/cart"
            className="flex items-center gap-2"
            onClick={() => setMenuOpen(false)}
          >
            <ShoppingCart className="w-6 h-6 text-green-700" />
            Cart ({cartItems.reduce((a, c) => a + (c.qty || 1), 0)})
          </Link>

          {isLoggedIn ? (
            <>
              <Link to="/ProfilePage" onClick={() => setMenuOpen(false)}>
                My Profile
              </Link>
              <Link to="/Myorders" onClick={() => setMenuOpen(false)}>
                My Orders
              </Link>
              <button
                onClick={handleLogout}
                className="text-red-600 text-left"
              >
                Log Out
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                setShowLoginModal(true);
                setMenuOpen(false);
              }}
              className="bg-[#667D60] text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Log In
            </button>
          )}
        </div>
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <LoginOptionsModal onClose={() => setShowLoginModal(false)} />
      )}
    </div>
  );
}

export default Header;