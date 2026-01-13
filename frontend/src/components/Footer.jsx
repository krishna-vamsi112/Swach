import React from "react";
import { Link } from "react-router-dom";
// import logo from "../assets/logo.jpg";
// import bg from "../assets/bg.jpg";
import { FaInstagram, FaFacebookF, FaWhatsapp } from "react-icons/fa";
// import Fssai from "../assets/fssai-seeklogo.png";
// import s2 from "../assets/saf3.jpg";
const logo = "https://swacchh-assets.s3.eu-north-1.amazonaws.com/assets/logo.jpg";
const bg = "https://swacchh-assets.s3.eu-north-1.amazonaws.com/assets/bg.jpg";
const Fssai = "https://swacchh-assets.s3.eu-north-1.amazonaws.com/assets/fssai-seeklogo.png";
const s2 = "https://swacchh-assets.s3.eu-north-1.amazonaws.com/assets/saf3.jpg";

const Footer = () => {
  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="relative text-white py-12 bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#667D60] bg-opacity-90"></div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-8
        grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12 items-start">

        {/* Logo & Brand */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-3">
          <img src={logo} alt="Logo" className="w-24 sm:w-28" />

          <h2 className="text-lg sm:text-xl font-bold">
            The Swacchh Products
          </h2>

          <p className="text-sm md:max-w-sm leading-relaxed">
            Bringing you nature’s purest treasure – premium saffron for health,
            wellness, and vitality.
          </p>

          <div className="bg-white w-24 rounded-md p-2 flex flex-col items-center">
            <img src={Fssai} alt="FSSAI" className="w-20" />
            <p className="text-xs text-black mt-1">13625013000984</p>
          </div>
        </div>

        {/* Quick Links & Policies */}
        <div className="flex justify-center md:justify-start gap-16 sm:gap-24 text-center md:text-left">

          {/* Quick Links */}
          <div className="flex flex-col space-y-3">
            <h3 className="text-lg font-semibold underline underline-offset-4 decoration-white/40">
              Quick Links
            </h3>
            {["/", "/products", "/about", "/Blog", "/contact"].map(
              (path, i) => (
                <Link
                  key={i}
                  to={path}
                  onClick={handleLinkClick}
                  className="hover:text-yellow-200 transition"
                >
                  {["Home", "Products", "About", "Blogs", "Contact"][i]}
                </Link>
              )
            )}
          </div>

          {/* Policies */}
          <div className="flex flex-col space-y-3">
            <h3 className="text-lg font-semibold underline underline-offset-4 decoration-white/40">
              Our Policies
            </h3>
            {[
              "/TermsPage",
              "/Privacypolicypage",
              "/Refundpolicypage",
              "/Returnpolicypage",
              "/Shippingpolicypage",
            ].map((path, i) => (
              <Link
                key={i}
                to={path}
                onClick={handleLinkClick}
                className="hover:text-yellow-200 transition"
              >
                {[
                  "Terms & Conditions",
                  "Privacy Policy",
                  "Refund & Cancellation Policy",
                  "Return Policy",
                  "Shipping Policy",
                ][i]}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4">
          <img src={s2} alt="Product" className="w-28 md:w-32 lg:w-40 rounded" />

          <h3 className="text-lg font-semibold underline underline-offset-4 decoration-white/40">
            Get in Touch
          </h3>

          <p className="text-sm">Email: support@saffronshilajit.com</p>
          <p className="text-sm">Phone: +91 9160213146</p>
          <p className="text-sm">Mon – Fri: 10am – 5pm</p>

          <div className="flex gap-4 mt-2">
            <a
              href="https://www.instagram.com/swacchh_products"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-pink-400"
            >
              <FaInstagram />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-blue-400"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://wa.me/9160213146"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-green-400"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <p className="relative mt-10 pt-4 text-center text-xs sm:text-sm border-t border-white/20">
        © {new Date().getFullYear()} Saffron. All Rights Reserved. Powered by{" "}
        <span className="font-semibold text-yellow-200">Maxzen.Tech</span>
      </p>
    </footer>
  );
};

export default Footer;
