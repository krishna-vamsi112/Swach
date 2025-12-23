import React from "react";
import { motion } from "framer-motion";
// import sideone from "../assets/SA1.webp";
// import vec1 from "../assets/icon3.png";
const sideone = "https://swacchh-assets.s3.eu-north-1.amazonaws.com/assets/SA1.webp";
const vec1 = "https://swacchh-assets.s3.eu-north-1.amazonaws.com/assets/icon3.png";
function Greenbodyone() {
  return (
    <section className="relative w-full min-h-screen bg-[#5C7455] overflow-hidden flex items-center justify-center px-4 sm:px-6 lg:px-20 py-12">

      {/* Soft Background Circle */}
      <div className="absolute w-72 h-72 sm:w-96 sm:h-96 lg:w-[500px] lg:h-[500px] bg-[#ffffff20] rounded-full blur-3xl -top-24 -left-16"></div>

      {/* Floating Icon */}
      <motion.img
        src={vec1}
        alt="Vector"
        className="absolute top-6 right-6 sm:top-10 sm:right-10 w-12 sm:w-16 md:w-20 lg:w-24"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10">

        {/* Left – Image */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="relative flex justify-center"
        >
          <div className="absolute w-52 h-52 sm:w-64 sm:h-64 lg:w-72 lg:h-72 bg-[#ffffff30] rounded-full blur-2xl"></div>

          <motion.img
            src={sideone}
            alt="Saffron"
            className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 object-cover rounded-3xl shadow-2xl"
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </motion.div>

        {/* Right – Content */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-white space-y-5 sm:space-y-6 bg-[#ffffff15] backdrop-blur-lg p-6 sm:p-8 rounded-3xl shadow-xl border border-[#ffffff20]"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold">
            Go Organic
          </h2>

          <p className="text-base sm:text-lg md:text-xl font-medium opacity-90">
            Elevate your lifestyle with nature’s purest wellness ingredients.
          </p>

          <ul className="space-y-3 text-base sm:text-lg md:text-xl leading-relaxed">
            <li>
              <span className="font-bold">Saffron:</span> Supports mood, improves skin health, and adds rich natural aroma.
            </li>
            <li>
              <span className="font-bold">100% Pure Ingredients:</span> No chemicals, no artificial colors—only authenticity.
            </li>
            <li>
              <span className="font-bold">Well-being Support:</span> Nourishes your body and promotes natural detoxification.
            </li>
          </ul>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-2 sm:mt-4 bg-white text-[#5C7455] font-semibold px-5 sm:px-6 py-3 rounded-xl shadow-lg text-sm sm:text-base"
          >
            Explore More
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
}

export default Greenbodyone;
