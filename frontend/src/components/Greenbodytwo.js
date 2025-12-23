

import React from "react";
import sidefive from "../assets/SA1.webp";
import sidefour from "../assets/saf2.jpg";
import shil from "../assets/SH2.png";
import shil1 from "../assets/shil2.jpg";
import vec1 from "../assets/icon3.png";
import vec3 from "../assets/Vec3.png";
import vec4 from "../assets/vec4.png";
import { RiDoubleQuotesL } from "react-icons/ri";

function OrganicSection() {
  return (
    <section className="bg-[#5a6d53] py-12 px-6">
      <div className="flex flex-col items-center">
        {/* First Row */}
        <div className="flex flex-col lg:flex-row items-center lg:justify-center gap-10 lg:gap-20">
          {/* Images */}
          <div className="relative w-[220px] h-[220px] sm:w-[300px] sm:h-[300px] lg:w-[380px] lg:h-[380px]">
            <div className="absolute top-0 left-0 w-[70%] h-[70%] rounded-xl overflow-hidden shadow-lg">
              <img
                src={shil}
                alt="Black Food"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-[70%] h-[70%] rounded-xl overflow-hidden shadow-lg">
              <img
                src={sidefive}
                alt="Saffron"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Quote + Text */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-md mt-8 lg:mt-0">
            <RiDoubleQuotesL size={50} className="text-white mb-4" />
            <p className="text-base sm:text-lg lg:text-xl text-white font-semibold">
              <span>Experience the Richness of Pure Saffron</span><br/>
Boost vitality, improve mood, and support overall wellness 
with premium, 100% natural saffron sourced from the finest farms.

            </p>
            <img src={vec1} alt="Black" className="w-24 sm:w-28 h-20 mt-6 lg:mt-10" />
          </div>
        </div>

        {/* Second Row */}
        <div className="flex flex-col lg:flex-row items-center lg:justify-center gap-10 lg:gap-20 mt-16">
          {/* Quote + Text */}
          <div className="flex flex-col items-center lg:items-end text-center lg:text-left max-w-md order-2 lg:order-1 mt-8 lg:mt-0">
            <RiDoubleQuotesL size={50} className="text-white mb-4" />
            <p className="text-base sm:text-lg lg:text-xl text-white font-semibold">
              The Finest Saffron for Health and Taste -
Rich in antioxidants and flavor, our saffron promotes vitality, improves mood, and adds a golden touch to your culinary creations.
            </p>
            <img src={vec1} alt="Black" className="w-24 sm:w-28 h-20 mt-6 lg:mt-10" />
          </div>

          {/* Images */}
          <div className="relative w-[220px] h-[220px] sm:w-[300px] sm:h-[300px] lg:w-[380px] lg:h-[380px] order-1 lg:order-2">
            <div className="absolute top-0 left-0 w-[70%] h-[70%] rounded-xl overflow-hidden shadow-lg">
              <img
                src={shil1}
                alt="Black Food"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-[70%] h-[70%] rounded-xl overflow-hidden shadow-lg">
              <img
                src={sidefour}
                alt="Saffron"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Bottom Icons */}
        <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-10 lg:gap-20 mt-16">
          {/* First Item */}
          <div className="flex flex-col items-center text-center max-w-sm">
            <img src={vec3} alt="Farm Raised" className="w-16 sm:w-20 h-20 mb-4" />
            <p className="font-semibold text-base sm:text-lg lg:text-xl text-white">
              Farm raised food <br />
              Our products are cultivated with care, ensuring purity, sustainability, and unmatched quality.
            </p>
          </div>

          {/* Second Item */}
          <div className="flex flex-col items-center text-center max-w-sm">
            <img src={vec4} alt="Organic Food" className="w-16 sm:w-20 h-20 mb-4" />
            <p className="font-semibold text-base sm:text-lg lg:text-xl text-white">
              100% organic food <br />
              Certified organic ingredients that nurture your health naturally and safely.
            </p>
          </div>

          {/* Third Item */}
          <div className="flex flex-col items-center text-center">
            <img src={vec1} alt="Vector Icon" className="w-24 sm:w-28 h-20 mt-6" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default OrganicSection;