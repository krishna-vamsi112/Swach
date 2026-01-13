import React, { useState } from "react";
import { motion } from "framer-motion";
import SA1 from "../assets/SA1.webp";
import saf1 from "../assets/saf1.jpg";
import saf2 from "../assets/saf2.jpg";
import SA3 from "../assets/SA3.webp";

function ProductCard() {
  const [mainImages, setMainImages] = useState(SA3);

  const thumbnailstwo = [SA1, saf1, saf2, saf3,];



  return (
    <div className="w-full overflow-x-hidden">
      {/* Product Section */}

      {/* <section className="relative min-h-[90vh] flex items-center bg-gradient-to-r from-[#374331] to-[#667D60] text-white px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center md:text-left"
          >

            <div >

            </div>
            <h1 className="text-4xl md:text-6xl xl:mr-28  text-right font-bold mb-6 leading-tight">
              Shilajit – Nature’s Ancient Energy Booster
            </h1>
            <p className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto md:mx-0">
              Pure Himalayan Shilajit Resin – the powerhouse of minerals and
              fulvic acid. Boosts energy , enhances focus , and strengthens
              immunity for a healthier you.
            </p>
          </motion.div>

          
          <motion.div
            className="relative flex flex-col items-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          >
           
            <div className="w-full max-w-md">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <motion.img
                  src={mainImage}
                  alt="Shilajit"
                  className="w-full h-full object-contain object-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />
              </div>
            </div>

            <div className="flex gap-4 mt-6 flex-wrap justify-center">
              {thumbnails.map((img, index) => (
                <motion.img
                  key={index}
                  src={img}
                  alt={`Shilajit thumbnail ${index + 1}`}
                  className={`w-20 h-20 rounded-xl object-cover shadow-md cursor-pointer border-2 
              ${mainImage === img ? "border-yellow-400" : "border-transparent"
                    } hover:border-white`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    ease: "easeInOut",
                    delay: 0.3 + index * 0.2,
                  }}
                  whileHover={{ scale: 1.15, rotate: 2 }}
                  viewport={{ once: true }}
                  onClick={() => setMainImage(img)} // ✅ Update main image
                />
              ))}
            </div>
          </motion.div>
        </div>

      
        <motion.img
          src={icon3}
          alt="leaf"
          className="absolute bottom-6 right-6 w-14 md:w-20 opacity-70"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </section> */}


      {/* Related Images Section */}
      {/* <section className="py-12 bg-[#fff7ef] relative">
        <div className="max-w-7xl mx-auto px-4">
          
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-10 font-[cursive]"
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
            viewport={{ once: true }}
          >
            Related images
          </motion.h2>

          
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

         
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 justify-items-center">
            {thumbnails.map((img, index) => (
              <motion.img
                key={index}
                src={img}
                alt="Shilajit related"
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
      </section> */}


      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-r from-[#374331] to-[#667D60] text-white px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Side: Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center md:text-left"
          >
            <h1 className="text-4xl md:text-6xl text-right font-bold mb-6 leading-tight">
              Saffron – The Golden Spice of Wellness
            </h1>
            <p className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto md:mx-0">
              Premium Kashmiri Saffron – rich in antioxidants, supports glowing skin ,
              uplifts mood , and improves digestion . A natural spice for health,
              vitality, and luxury living.
            </p>
          </motion.div>


          {/* Right Side: Image + Thumbnails */}
          <motion.div
            className="relative flex flex-col items-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          >
            {/* Main Image */}
            {/* Main Image */}
            <div className="w-full max-w-md">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <motion.img
                  src={mainImages}
                  alt="Saffron"
                  className="w-full h-full object-cover object-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4 mt-6 flex-wrap justify-center">
              {thumbnailstwo.map((img, index) => (
                <motion.img
                  key={index}
                  src={img}
                  alt={`Shilajit thumbnail ${index + 1}`}
                  className={`w-20 h-20 rounded-xl object-cover shadow-md cursor-pointer border-2 
              ${mainImages === img ? "border-yellow-400" : "border-transparent"
                    } hover:border-white`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    ease: "easeInOut",
                    delay: 0.3 + index * 0.2,
                  }}
                  whileHover={{ scale: 1.15, rotate: 2 }}
                  viewport={{ once: true }}
                  onClick={() => setMainImages(img)} // ✅ Update main image
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Floating Leaf Icon */}
        <motion.img
          src={icon3}
          alt="leaf"
          className="absolute bottom-6 right-6 w-14 md:w-20 opacity-70"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </section>

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
            {thumbnailstwo.map((img, index) => (
              <motion.img
                key={index}
                src={img}
                alt="Shilajit related"
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