import React from "react";
// import card from "../assets/card.webp";
// import shil1 from "../assets/shil1.jpg";

// import saf1 from "../assets/saf1.jpg";

import { motion } from "framer-motion";
// import saf3 from "../assets/saf3.jpg";
// import icon from "../assets/icon.png";
// import bg1 from "../assets/bg1.jpg";
// import prat from "../assets/profile.jpg";


import { Link } from "react-router-dom";

// import vec2 from "../assets/icon.png"
// import shi1 from "../assets/1.jpg";
import { useEffect } from "react";

import Greenbodythree from "./Greenbodythree";
// import user2 from "../assets/profile.jpg";
// import user3 from "../assets/profile.jpg";
// import user4 from "../assets/profile.jpg";


const shil1 = "https://swacchh-assets.s3.eu-north-1.amazonaws.com/assets/shil1.jpg";
const saf1 = "https://swacchh-assets.s3.eu-north-1.amazonaws.com/assets/saf1.jpg";
const saf3 = "https://swacchh-assets.s3.eu-north-1.amazonaws.com/assets/saf3.jpg";
const icon = "https://swacchh-assets.s3.eu-north-1.amazonaws.com/assets/icon.png";
const bg1 = "https://swacchh-assets.s3.eu-north-1.amazonaws.com/assets/bg1.jpg";
const prat="https://swacchh-assets.s3.eu-north-1.amazonaws.com/assets/profile.jpg";
const vec2 = "https://swacchh-assets.s3.eu-north-1.amazonaws.com/assets/icon.png";
const shi1 = "https://swacchh-assets.s3.eu-north-1.amazonaws.com/assets/1.jpg";
const user2 ="https://swacchh-assets.s3.eu-north-1.amazonaws.com/assets/profile.jpg";
const user3 ="https://swacchh-assets.s3.eu-north-1.amazonaws.com/assets/profile.jpg";
const user4="https://swacchh-assets.s3.eu-north-1.amazonaws.com/assets/profile.jpg";




export default function HomePage() {

  
// ⭐ Star SVG
const Star = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="#fbbf24"
    viewBox="0 0 24 24"
    className="w-5 h-5"
  >
    <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.868 1.48 8.24L12 18.896l-7.416 4.518 1.48-8.24L0 9.306l8.332-1.151z" />
  </svg>
);

// ⭐ Reviews Data
const reviews = [
  {
    text: "I’ve been using Saffron daily and it helped me feel calmer and more positive. With Shilajit Resin, my energy improved naturally.",
    name: "Veera Pratap",
    img: prat,
    rating: 5,
  },
  {
    text: "The Saffron quality is pure and aromatic. It reduced my stress and improved sleep in days. Absolutely recommended!",
    name: "Harshini",
    img: user2,
    rating: 4.5,
  },
  {
    text: "Shilajit Resin boosted my stamina in a week. I feel active full day. Perfect natural supplement for busy life.",
    name: "Rahul Mehta",
    img: user3,
    rating: 5,
  },
  {
    text: "This combo improved my mood, energy, and sleep. Totally natural and effective. Loved the results!",
    name: "Lokesh Nani",
    img: user4,
    rating: 5,
  },
];


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>


      {/* Hero Section */}

      {/* Features Section */}

      {/* ===== New Product Cards Section ===== */}







      <section>
        
        <div className="card shadow-lg bg-[#FFF7EC] w-full h-full flex flex-col lg:flex-row justify-center gap-10 p-6 lg:p-20">

          {/* Left Side */}
          <div className="flex flex-col justify-center gap-6 lg:gap-10 items-center lg:items-start">
            {/* Main Image */}
            <div className="rounded-xl overflow-hidden">
              <img
                src={shi1}
                alt="Organic"
                className="w-full max-w-sm h-64 sm:h-80 lg:h-96 rounded-xl object-cover"
              />
            </div>

            {/* Icon */}
            <div>
              <img
                className="w-20 h-16 sm:w-28 sm:h-20"
                alt="Icon"
                src={vec2}
              />
            </div>
          </div>

          {/* Right Side */}
          <div className="flex flex-col gap-6 mt-6 lg:mt-10 text-black max-w-lg">
            {/* Section 1 */}
            <div className="text-lg sm:text-xl lg:text-4xl font-bold">Go Organic</div>
            <div className="text-base sm:text-base md:text-lg">

              <div className="text-lg sm:text-xl lg:text-xl font-semibold">Boosts Testosterone Naturally</div>
              <div>Shilajit is known to help increase testosterone levels,
                which plays a key role in building muscle,
                improving stamina, and supporting overall male vitality.</div>

            </div>

            {/* Section 2 */}
            <div className="text-base sm:text-base md:text-lg">
              <div className="text-lg sm:text-xl lg:text-xl font-semibold">Enhances Strength & Endurance</div>
              <div>Packed with essential minerals and fulvic acid,Shilajit fuels the body with natural energy,
                helping you push harder during workouts and recover faster.</div>
            </div>

            {/* Section 3 */}
            <div className="text-base sm:text-base md:text-lg">
              <div className="text-lg sm:text-xl lg:text-xl font-semibold">Speeds Up Muscle Recovery</div>
              <div>  Its anti-inflammatory and antioxidant properties support quicker recovery after intense training, reducing fatigue and muscle soreness.</div>

            </div>

            {/* Section 4 */}
            <div className="text-base sm:text-base md:text-lg">
              <div className="text-lg sm:text-xl lg:text-xl font-semibold">Why Gym Guys Swear by Shilajit</div>
              <div>From the gym floor to outdoor adventures, fitness enthusiasts trust Shilajit for sustained energy, performance, and all-round wellness.</div>

            </div>
          </div>
        </div>
      </section>


      <Greenbodythree/>


      

      <div className="py-16 bg-[#f8f5ee]">
      <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12">
        What Our Customers Say
      </h2>

      {/* Grid of Review Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-6 max-w-7xl mx-auto">
        {reviews.map((review, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-2xl transition-all duration-300"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Profile Image */}
            <img
              src={review.img}
              alt={review.name}
              className="w-20 h-20 rounded-full object-cover border-4 border-[#f8f5ee] mb-4"
            />

            {/* Name */}
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              {review.name}
            </h3>

            {/* Stars */}
            <div className="flex justify-center gap-1 mb-3">
              {Array.from({ length: review.rating }).map((_, i) => (
                <Star key={i} />
              ))}
            </div>

            {/* Review Text */}
            <p className="text-gray-700 text-sm leading-relaxed">
              {review.text}
            </p>
          </motion.div>
        ))}
      </div>
    </div>





      <section className="relative py-16 bg-[#6b7b57] overflow-hidden">
        {/* Decorative Image - Top Left */}
        <motion.img
          src={icon}
          alt="Decorative"
          className="absolute top-6 left-6 w-16 sm:top-10 sm:left-10 sm:w-32 md:w-24 
               opacity-80 pointer-events-none"
          animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Background Image - Bottom Right */}
        <motion.img
          src={bg1}
          alt="Background"
          className="absolute bottom-0 right-0 w-40 sm:w-60 md:w-96 lg:w-[500px] 
               opacity-40 pointer-events-none filter brightness-50"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, ease: "easeOut" }}
          animate={{ y: [0, 15, 0] }}
        />

        <div className="relative max-w-7xl mx-auto px-6">
          {/* Section Title */}
          <motion.h2
            className="text-center text-2xl md:text-3xl font-bold text-white mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            RECENT NEWS
          </motion.h2>

          {/* Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Saffron Card */}
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <img
                src={saf1}
                alt="Saffron"
                className="rounded-xl shadow-lg w-full md:w-96 h-64 object-cover"
              />
              <p className="text-gray-100 text-center md:text-lg mt-4 leading-relaxed max-w-sm">
                Naturally grown saffron with rich aroma and taste. Known for its
                calming effect and vibrant color, saffron has been treasured for
                centuries as a natural wellness booster.
              </p>
            </motion.div>

            {/* Shilajit Resin Card */}
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <img
                src={shil1}
                alt="Shilajit Resin"
                className="rounded-xl shadow-lg w-full md:w-96 h-64 object-cover"
              />
              <p className="text-gray-100 text-center md:text-lg mt-4 leading-relaxed max-w-sm">
                Pure Shilajit resin packed with natural minerals and energy. It helps
                in boosting stamina, improving focus, and maintaining overall body
                strength naturally.
              </p>
            </motion.div>
          </div>
        </div>
      </section>


      <section className="py-20 bg-[#FFF7EC] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
          {/* Decorative Leaf */}
          <img
            src={icon}
            alt="Leaf Decoration"
            className="absolute right-4 top-2 w-14 sm:w-20 md:w-24 opacity-80 pointer-events-none"
          />

          <div className="flex flex-col md:flex-row items-center md:items-start bg-[#667D60] gap-8 rounded-lg shadow-xl p-6 md:p-12">
            {/* Left Image Column */}
            <div className="w-full md:w-1/2">
              <motion.img
                src={saf3}
                alt="Healthy lifestyle"
                className="rounded-lg w-full h-64 sm:h-80 md:h-auto object-cover"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              />
            </div>

            {/* Right Content Column */}
            <div className="w-full md:w-1/2 flex flex-col justify-center space-y-4 sm:space-y-6 text-center md:text-left">
              <p className="text-lg sm:text-xl font-bold uppercase text-white">
                Follow Us
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug">
                Transform your wellness journey with nature.
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-white">
                Integrate the potent benefits of pure Saffron and authentic Shilajit Resin
                into your daily routine. Sourced from pristine environments, our products
                are designed to support your mental clarity, physical energy, and overall
                well-being.
              </p>
              <Link to="./products">
                <button className="bg-[#FFF7EC] text-black font-medium py-2 sm:py-3 px-6 sm:px-8 rounded-full hover:bg-orange-300 transition duration-300">
                  Explore Products
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>





    </div>
  );
}