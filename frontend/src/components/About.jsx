


import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import saf1 from "../assets/saf1.jpg";
import saf2 from "../assets/saf2.jpg";
import SA4 from "../assets/SA4.webp";
import icon from "../assets/icon.png";
import icon3 from "../assets/icon3.png";
import saffMain from "../assets/saf1.jpg"; // Add a main saffron image

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [mainImage, setMainImage] = useState(saf2);

  return (
    <div className="w-full">

      {/* ===================== ABOUT US ===================== */}
      <section className="bg-[#667D60] text-white py-12 px-4 md:py-16 md:px-16 relative">
        <img
          src={icon3}
          alt="Leaf Decoration"
          className="absolute right-2 md:right-6 top-4 md:top-10 w-10 md:w-24 opacity-90"
        />
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center text-center md:text-left">

          {/* Left Content */}
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">ABOUT US</h2>
            <p className="leading-relaxed text-sm md:text-lg text-white">
              We are committed to delivering the highest quality Kashmiri saffron,
              harvested with care to preserve its natural aroma, purity, and potency.
              Our mission is to provide premium, authentic saffron that enriches
              your wellness, beauty, and culinary experience.
            </p>
          </div>

          {/* Right Image */}
          <div className="flex justify-center">
            <img
              src={saffMain}
              alt="Premium Saffron"
              className="rounded-xl shadow-lg w-60 md:w-96 object-cover"
            />
          </div>
        </div>
      </section>

      {/* ===================== HISTORY ===================== */}
      <section className="bg-[#fffaf3] py-14 px-4 md:py-16 md:px-16 relative">
        {/* Decorations */}
        <img
          src={icon}
          className="absolute left-2 md:left-0 top-3 md:top-10 w-10 md:w-20 opacity-90"
          alt="Leaf Icon"
        />
        <img
          src={icon}
          className="absolute -bottom-10 md:-bottom-32 right-4 md:right-8 w-10 md:w-20 opacity-90"
          alt="Leaf Icon"
        />

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

          {/* Left - Main Image */}
          <div className="w-full h-80 md:h-96">
            <img
              src={mainImage}
              className="w-full h-full rounded-xl shadow-lg object-cover px-4"
              alt="Saffron History"
            />
          </div>

          {/* Right - Text + Thumbnails */}
          <div>
            <h3 className="text-xl md:text-4xl font-bold mb-4 text-center md:text-left">
              The Legacy of Saffron
            </h3>
            <p className="text-gray-700 leading-relaxed mb-6 text-sm md:text-lg">
              Our saffron is sourced from Kashmir's pristine fields, where each strand
              is handpicked with centuries-old traditional harvesting methods.
              From ancient Ayurveda to modern wellness, saffron has been treasured
              for its medicinal, culinary, and cosmetic benefits.
            </p>

            {/* Thumbnails */}
            <div className="flex justify-center md:justify-start space-x-4">
              {[saf1, saf2, SA4].map((thumb, index) => (
                <img
                  key={index}
                  src={thumb}
                  onClick={() => setMainImage(thumb)}
                  className={`w-16 h-16 md:w-20 md:h-20 rounded-lg shadow-md cursor-pointer border-2 
                  ${mainImage === thumb ? "border-[#c49a6c]" : "border-transparent"}`}
                  alt="Thumbnail"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================== OUR STORES ===================== */}
      <section className="bg-[#667D60] py-12 px-4 md:py-16 md:px-16 text-white relative">
        <motion.img
          src={icon}
          className="absolute left-2 md:left-4 top-3 w-10 md:w-20 opacity-90"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          alt="Icon"
        />

        <div className="max-w-7xl mx-auto">
          <h3 className="text-center text-2xl md:text-4xl font-bold mb-10">
            Our Stores
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Card 1 */}
            <div className="bg-[#fff7ef] rounded-lg shadow-md p-6 text-center">
              <img
                src={saf1}
                className="w-20 h-20 md:w-32 md:h-32 mx-auto rounded-full object-cover mb-4"
                alt="Natural Fields"
              />
              <h4 className="font-bold text-black text-lg mb-2">Natural Farms</h4>
              <p className="text-black text-sm md:text-base">
                Our saffron grows in the serene climate of Kashmir,
                nurtured naturally without chemicals.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-[#fff7ef] rounded-lg shadow-md p-6 text-center">
              <img
                src={saf2}
                className="w-20 h-20 md:w-32 md:h-32 mx-auto rounded-full object-cover mb-4"
                alt="Handpicked"
              />
              <h4 className="font-bold text-black text-lg mb-2">Handpicked Crops</h4>
              <p className="text-black text-sm md:text-base">
                Every saffron strand is carefully handpicked to ensure purity,
                aroma, and full potency.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-[#fff7ef] rounded-lg shadow-md p-6 text-center">
              <img
                src={SA4}
                className="w-20 h-20 md:w-32 md:h-32 mx-auto rounded-full object-cover mb-4"
                alt="Traditional Care"
              />
              <h4 className="font-bold text-black text-lg mb-2">
                Traditional Harvesting
              </h4>
              <p className="text-black text-sm md:text-base">
                We preserve ancient harvesting traditions to bring you
                saffron in its most authentic form.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ===================== PRODUCTS ===================== */}
      <section className="py-12 px-4 md:py-16 md:px-16 bg-[#fffaf3] relative">
        <h3 className="text-center text-xl md:text-2xl font-bold mb-10">
          OUR PRODUCTS
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 max-w-7xl mx-auto">

          {[saf1, saf2, SA4, saffMain].map((product, index) => (
            <img
              key={index}
              src={product}
              alt="Saffron Product"
              className="rounded-lg shadow-md w-full h-32 md:h-64 object-cover"
            />
          ))}

        </div>
      </section>

    </div>
  );
}
