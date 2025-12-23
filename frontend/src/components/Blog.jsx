// import React from "react";
// import { motion, useAnimation } from "framer-motion";
// import blogImg1 from "../assets/sa1.png"; // saffron spoon image
// import blogImg2 from "../assets/SA3.webp"; // black stone image
// import blogImg3 from "../assets/saf3.jpg"; // saffron bowl image
// import blogImg4 from "../assets/SH2.png"; // charcoal image
// import leafIcon from "../assets/icon.png";   // leaf decorative icon

// export default function BlogSection() {
//   // Small inner component to give each image its own animation controls
//   function InteractiveImage({ src, alt, imgClass = "w-full h-56 object-cover", wrapperClass = "" }) {
//     const controls = useAnimation();

//     const start = () =>
//       controls.start({
//         scale: 1.08,
//         transition: { type: "spring", stiffness: 220, damping: 18 },
//       });
//     const stop = () =>
//       controls.start({
//         scale: 1,
//         transition: { type: "spring", stiffness: 220, damping: 18 },
//       });

//     // quickTap ensures a visible effect for short taps/clicks
//     const quickTap = () => {
//       controls.start({ scale: 1.08, transition: { duration: 0.08 } });
//       setTimeout(() => controls.start({ scale: 1, transition: { duration: 0.18 } }), 180);
//     };

//     return (
//       <motion.div
//         className={`overflow-hidden ${wrapperClass}`}
//         // entrance animation for the image wrapper (keeps it consistent with cards)
//         initial={{ opacity: 0, y: 30 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         viewport={{ once: true, amount: 0.2 }}
//       >
//         <div className="rounded-xl overflow-hidden transform-gpu">
//           <motion.img
//             src={src}
//             alt={alt}
//             className={`${imgClass} transform-gpu cursor-pointer`}
//             animate={controls}
//             initial={{ scale: 1 }}
//             onHoverStart={start}
//             onHoverEnd={stop}
//             onPointerDown={start}
//             onPointerUp={stop}
//             onTouchStart={start}
//             onTouchEnd={stop}
//             onTouchCancel={stop}
//             onClick={quickTap} // fallback for very short taps / clicks
//             draggable={false}
//           />
//         </div>
//       </motion.div>
//     );
//   }

//   return (
//     <div className="w-full">
//       {/* Top Section */}
//       <div className="bg-[#5C6F58] flex flex-col md:flex-row justify-between items-center px-6 md:px-10 py-8 md:py-10 overflow-hidden">
//         {/* Left Content */}
//         <motion.div
//           className="text-white md:w-1/2 space-y-4"
//           initial={{ opacity: 0, x: -100 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8 }}
//           viewport={{ once: true, amount: 0.2 }}
//         >
//           <h1 className="text-3xl md:text-4xl font-bold">BLOG</h1>
//           <p className="text-sm md:text-base leading-relaxed">
//             em ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vestibulum urna augue.
//             Duis sit maximus commodo hendrerit lorem maximus mi. em ipsum dolor sit amet, consectetur adipiscing elit.
//           </p>
//           <img src={leafIcon} alt="Leaf Icon" className="w-16 md:w-20 mt-4" />
//         </motion.div>

//         {/* Right Image (wrap + rounded + interactive) */}
//         <motion.div
//           className="md:w-1/2 flex justify-center mt-6 md:mt-0"
//           initial={{ opacity: 0, x: 100 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8 }}
//           viewport={{ once: true, amount: 0.2 }}
//         >
//           {/* fixed container to keep consistent size on mobile/desktop */}
//           <div className="rounded-2xl overflow-hidden shadow-lg w-[300px] sm:w-[320px] md:w-[350px] h-[210px] sm:h-[230px] md:h-[250px]">
//             <InteractiveImage src={blogImg1} alt="Blog Main" imgClass="w-full h-full object-cover" wrapperClass="" />
//           </div>
//         </motion.div>
//       </div>

//       {/* Recent Blogs */}
//       <div className="bg-[#FAF4EC] py-10 md:py-12 px-4 md:px-6">
//         {/* Title */}
//         <motion.div
//           className="flex justify-between items-center mb-8 md:mb-10"
//           initial={{ opacity: 0, y: -20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           viewport={{ once: true, amount: 0.2 }}
//         >
//           <img src={leafIcon} alt="Leaf" className="w-16 md:w-20" />
//           <h2 className="text-center text-base md:text-lg font-semibold">Recent Blogs</h2>
//           <img src={leafIcon} alt="Leaf" className="w-16 md:w-20" />
//         </motion.div>

//         {/* Blog Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-6xl mx-auto">
//           {[blogImg2, blogImg3, blogImg4].map((img, index) => (
//             <motion.div
//               key={index}
//               className="bg-white shadow-md rounded-2xl overflow-hidden"
//               initial={{ opacity: 0, y: 40 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: index * 0.12 }}
//               viewport={{ once: true, amount: 0.2 }}
//             >
//               {/* The InteractiveImage handles hover/tap/click */}
//               <InteractiveImage
//                 src={img}
//                 alt={`Recent Blog ${index + 1}`}
//                 imgClass="w-full h-56 sm:h-56 md:h-56 object-cover"
//                 wrapperClass=""
//               />

//               <div className="bg-[#5C6F58] text-white p-4 text-sm leading-relaxed">
//                 em ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vestibulum urna augue.
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }




import React from 'react'
import ProductCard from './ProductDetail2'
import Termsandconditions from './Termsandconditions';
import Exploreplans from './Exploreplans';

function Blog() {
  return (
    <div>   
      <ProductCard/>
<Termsandconditions/> 
<Exploreplans/>
    </div>
  )
}

export default Blog;