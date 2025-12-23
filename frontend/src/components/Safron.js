

import React, { useState, useRef } from "react";
import Saffron from "../assets/saf-v1.mp4";
import Shila from "../assets/PixVerse_V5_Image_Text_360P (1).mp4";

function Safron() {
  const videos = [Saffron, Shila]; // All videos here
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleVideoEnd = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length); 
  };

  return (
    <div className="relative w-full h-64 sm:h-80 md:h-[32rem] overflow-hidden shadow-xl">
      {/* Video */}
      <div className="absolute inset-0">
        <video
          key={currentIndex} // IMPORTANT to reload new video
          src={videos[currentIndex]}
          autoPlay
          muted
          playsInline
          onEnded={handleVideoEnd}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>

      {/* Title */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="uppercase font-extrabold tracking-wide text-4xl sm:text-6xl md:text-7xl text-white drop-shadow-xl text-center px-4">
          Saffron
        </h1>
      </div>
    </div>
  );
}

export default Safron;
