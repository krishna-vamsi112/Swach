import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SA1 from "../assets/SA1.webp";
import saf1 from "../assets/saf1.jpg";
import saf2 from "../assets/saf2.jpg";
import SA3 from "../assets/SA3.webp";
import saf3 from "../assets/saf3.jpg";
import icon from "../assets/icon.png";
import icon3 from "../assets/icon3.png";

function ProductCard() {
  // Keep track of the selected image
  const [selectedImage, setSelectedImage] = useState(SA1);

  const thumbnails = [saf1, saf2, SA3, saf3];

  return (
    <div className="w-full overflow-x-hidden">
      
      {/* Product Section */}
      <section className="bg-[#667D60] py-16 px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Side Content */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
            viewport={{ once: true }}
          >
            <motion.h1
              className="text-4xl text-left font-bold text-white mb-4"
              initial={{ opacity: 0, y: -40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, ease: "easeInOut", delay: 0.2 }}
              viewport={{ once: true }}
            >
              SAFFRON
            </motion.h1>

            <motion.p
              className="text-lg text-white text-left font-medium mb-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeInOut", delay: 0.4 }}
              viewport={{ once: true }}
            >
              Rs 500/kg
            </motion.p>

            {/* Rating */}
            <motion.div
              className="flex items-center mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeInOut", delay: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="text-yellow-400 text-xl">★★★☆☆</span>
              <span className="ml-3 text-white">(200 customers)</span>
            </motion.div>

            {/* Description */}
            <motion.p
              className="text-white text-left leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.6, ease: "easeInOut", delay: 0.8 }}
              viewport={{ once: true }}
            >
              There is an enormous amount of interest in raw and organic foods,
              but more recently it is superfoods. People want to know more about
              chia seeds, mocha, raw chocolate and cocoa, and what they can do
              for you.
            </motion.p>
          </motion.div>

          {/* Right Side Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease: "easeInOut", delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="rounded-2xl overflow-hidden shadow-lg">
              {/* Animate main image when it changes */}
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImage} // trigger animation on change
                  src={selectedImage}
                  alt="Saffron"
                  className="w-full h-96 object-cover"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                />
              </AnimatePresence>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4 mt-4">
              {thumbnails.map((img, index) => (
                <motion.img
                  key={index}
                  src={img}
                  alt="Saffron small"
                  onClick={() => setSelectedImage(img)} // click to change main image
                  className={`w-20 h-20 rounded-lg object-cover shadow-md cursor-pointer border-2 ${
                    selectedImage === img
                      ? "border-yellow-500"
                      : "border-transparent"
                  }`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 1.2,
                    ease: "easeInOut",
                    delay: 0.3 + index * 0.3,
                  }}
                  whileHover={{ scale: 1.15, rotate: 3 }}
                  viewport={{ once: true }}
                />
              ))}
            </div>

            {/* Decorative Leaf Icon */}
            <motion.img
              src={icon3}
              alt="Leaf Icon"
              className="absolute -bottom-12 right-2 w-12 md:w-24 opacity-80"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, ease: "easeInOut", delay: 1 }}
              viewport={{ once: true }}
            />
          </motion.div>
        </div>
      </section>


      

      {/* Related Images Section */}
      <section className="py-12 bg-[#fff7ef] relative">
        <div className="max-w-7xl mx-auto px-4">
          {/* Heading */}
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-10 font-[cursive]"
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
            viewport={{ once: true }}
          >
            Related images
          </motion.h2>

          {/* Decorative Icons */}
          <motion.img
            src={icon}
            alt="Leaf Left"
            className="absolute left-4 bottom-0 w-14 md:left-6 md:bottom-8 md:w-20 opacity-80"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.4, ease: "easeInOut", delay: 0.3 }}
            viewport={{ once: true }}
          />

          <motion.img
            src={icon}
            alt="Leaf Right"
            className="absolute right-6 top-10 transform -translate-y-1/2 w-16 md:w-20 opacity-80 rotate-180"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.4, ease: "easeInOut", delay: 0.5 }}
            viewport={{ once: true }}
          />

          {/* Images Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 justify-items-center">
            {thumbnails.map((img, index) => (
              <motion.img
                key={index}
                src={img}
                alt="Saffron small"
                className="w-48 h-48 rounded-xl object-cover shadow-lg"
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 1.2,
                  ease: "easeInOut",
                  delay: index * 0.3,
                }}
                whileHover={{ scale: 1.15 }}
                viewport={{ once: true }}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductCard;
