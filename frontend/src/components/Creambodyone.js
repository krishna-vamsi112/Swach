import React from "react";
  import saf1 from "../assets/saf1.jpg";
  import vec2 from "../assets/icon.png";
  import shil1 from "../assets/shil1.jpg";
  import { Link } from "react-router-dom";

  function Creambodyone() {
    return (
      <section className="relative py-16 md:py-20 bg-[#FFF7EC] overflow-hidden">

        {/* Floating Icon */}
        <img
          src={vec2}
          alt="icon"
          className="absolute top-5 right-5 md:top-10 md:right-10 w-12 md:w-16 animate-bounce"
        />

        {/* Curved Section Top */}
        <div className="absolute top-0 left-0 w-full h-24 md:h-32 bg-orange-200 rounded-b-[50%] opacity-40"></div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
          
          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-10 md:mb-12">
            Our Premium Products
          </h2>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 place-items-center">

            {/* SAFFRON CARD */}
            <div className="w-full max-w-md backdrop-blur-xl bg-white/50 border border-white/40 shadow-xl rounded-3xl p-5 sm:p-6 transform hover:-translate-y-2 transition-all duration-500 hover:shadow-2xl">
              
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 text-center">
                Saffron
              </h3>

              <div className="rounded-2xl overflow-hidden mb-4 shadow-md">
                <img
                  src={saf1}
                  alt="Saffron"
                  className="w-full h-48 sm:h-56 md:h-60 object-cover"
                />
              </div>

              <Link to="/product/68b69058231173fb3013de62">
                <button className="w-full py-3 mt-3 rounded-xl text-white font-medium text-sm sm:text-base
                  bg-gradient-to-r from-orange-400 to-orange-600
                  hover:from-orange-500 hover:to-orange-700
                  transition-all shadow-md">
                  Buy Now
                </button>
              </Link>
            </div>

            {/* SHILAJIT CARD */}
            <div className="w-full max-w-md backdrop-blur-xl bg-white/50 border border-white/40 shadow-xl rounded-3xl p-5 sm:p-6 transform hover:-translate-y-2 transition-all duration-500 hover:shadow-2xl">
              
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 text-center">
                Shilajit
              </h3>

              <div className="rounded-2xl overflow-hidden mb-4 shadow-md">
                <img
                  src={shil1}
                  alt="Shilajit"
                  className="w-full h-48 sm:h-56 md:h-60 object-cover"
                />
              </div>

              <Link to="/product/your-shilajit-product-id">
                <button className="w-full py-3 mt-3 rounded-xl text-white font-medium text-sm sm:text-base
                  bg-gradient-to-r from-orange-400 to-orange-600
                  hover:from-orange-500 hover:to-orange-700
                  transition-all shadow-md">
                  Buy Now
                </button>
              </Link>
            </div>

          </div>
        </div>
      </section>
    );
  }

  export default Creambodyone;
