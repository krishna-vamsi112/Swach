import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
// import { CheckCircle } from "lucide-react";

// 🖼 Assets
import essentialImg from "../assets/2.jpg";
import advancedImg from "../assets/2.jpg";
import proImg from "../assets/2.jpg";
import premiumImg from "../assets/2.jpg";
import eliteImg from "../assets/2.jpg";
import { FaCheckCircle } from "react-icons/fa";

/* ============================================================
   NUMBER DROP ANIMATION (Triggers when in viewport)
============================================================ */
function DropNumber({ from, to, duration = 1500 }) {
  const ref = useRef(null);
  const [startAni, setStartAni] = useState(false);
  const [value, setValue] = useState(parseInt(from.replace(/[^0-9]/g, "")));

  const clean = (num) => parseInt(num.replace(/[^0-9]/g, ""));
  const start = clean(from);
  const end = clean(to);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStartAni(true);
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!startAni) return;

    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;

      const progress = Math.min((timestamp - startTime) / duration, 1);
      const currentValue = Math.floor(start - (start - end) * progress);

      setValue(currentValue);

      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [startAni]);

  return <span ref={ref}>₹{value.toLocaleString("en-IN")}</span>;
}

/* ============================
   PLANS DATA
============================ */
const plans = [
  {
    id: 1,
    title: "Essential Plan",
    description:
      "Your perfect start to IT — build strong fundamentals, explore in-demand tools, and kickstart your career with confidence.",
    marketPrice: "₹27,500",
    price: "₹13,748",
    discount: "₹5,499",
    content: "80+ hours of structured video lessons & practice materials",
    level: "Beginner",
    extras: "Quizzes, mini-projects, and doubt-clearing support",
    image: essentialImg,
    gradient: "white",
  },
  {
    id: 2,
    title: "Advanced Plan",
    description:
      "Gain real-world expertise in Cloud, DevOps, and advanced coding through hands-on projects designed to match industry standards.",
    marketPrice: "₹47,500",
    price: "₹23,748",
    discount: "₹9,499",
    content:
      "120+ hours of structured video lessons, labs, and guided projects",
    level: "Intermediate",
    extras: "Hands-on labs, case studies, and mentor-led support",
    image: advancedImg,
    gradient: "from-blue-100 to-indigo-50",
  },
  {
    id: 3,
    title: "Pro Plan",
    description:
      "Master advanced IT concepts and leadership skills — prepare for senior roles with enterprise systems and architecture.",
    marketPrice: "₹77,500",
    price: "₹38,748",
    discount: "₹15,499",
    content: "150+ hours of advanced video lessons and case studies",
    level: "Advanced",
    extras: "Capstone projects, real-world scenarios, mentor feedback",
    image: proImg,
    gradient: "from-purple-100 to-pink-50",
  },
  {
    id: 4,
    title: "Premium Plan",
    description:
      "Gain cutting-edge skills in SaaS, mobile, cloud security, and leadership. Designed for senior professionals.",
    marketPrice: "₹90,000",
    price: "₹44,998",
    discount: "₹17,999",
    content: "200+ hours of expert-level lessons, projects, and capstones",
    level: "Expert",
    extras: "Leadership workshops, networking, and mentorship",
    image: premiumImg,
    gradient: "from-orange-100 to-yellow-50",
  },
  {
    id: 5,
    title: "Elite Plan",
    description:
      "Unlock full access to all content plus exclusive perks for lifelong learners and senior consultants.",
    marketPrice: "₹1,25,000",
    price: "₹62,498",
    discount: "₹24,999",
    content: "250+ hours of beginner-to-expert lessons and masterclasses",
    level: "All Levels",
    extras: "Exclusive masterclasses, mentorship, and lifetime updates",
    image: eliteImg,
    gradient: "from-rose-100 to-pink-50",
  },
  {
    id: 6,
    title: "Ultimate Plan",
    description:
      "The all-in-one plan — includes everything plus our AAA Module for mastering AI-driven IT.",
    marketPrice: "₹1,33,000",
    price: "₹66,665",
    discount: "₹39,999",
    content:
      "300+ hours of complete IT, cloud, DevOps, leadership & AI-driven modules",
    level: "All Levels + AAA Module",
    extras: "AI projects, leadership mentoring, lifetime updates",
    image: eliteImg,
    gradient: "from-emerald-100 to-teal-50",
  },
];

const Exploreplans = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full bg-white py-20 flex flex-col items-center relative">
      {/* Heading */}
      <div className="max-w-3xl text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Explore Plans by Skill Level
        </h2>
        <p className="text-gray-600 text-base md:text-lg font-medium">
          Whether you're starting out or aiming for leadership, scroll through
          our curated IT plans designed for every skill level.
        </p>
      </div>

      {/* Scroll Wrapper */}
      <div className="relative w-full max-w-full h-[600vh]">
        {plans.map((plan, index) => {
          const isLeft = index % 2 === 0;

          return (
            <div
              key={plan.id}
              className="sticky top-0 h-screen flex items-center justify-center"
            >
              <motion.div
                initial={{ opacity: 0, y: 100, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, amount: 0.4 }}
                className={`absolute w-full flex ${
                  isLeft ? "justify-start" : "justify-end"
                } px-6 md:px-12`}
              >
                {/* CARD */}
                <motion.div
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 12px 30px rgba(0,0,0,0.18)",
                  }}
                  className={`w-full md:w-[48%] bg-gradient-to-br ${
                    plan.gradient
                  } 
                  rounded-3xl shadow-2xl flex flex-col md:flex-row ${
                    isLeft ? "" : "md:flex-row-reverse"
                  } overflow-hidden border border-gray-200`}
                >
                  {/* TEXT AREA */}
                  <div className="w-full md:w-2/3 px-8 py-10 flex flex-col justify-center">
                    <h3 className="text-3xl font-extrabold text-gray-900 mb-4">
                      {plan.title}
                    </h3>
                    <p className="text-gray-700 mb-5 text-base leading-relaxed">
                      {plan.description}
                    </p>

                    {/* Highlights */}
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-center text-gray-700">
                        <FaCheckCircle className="text-indigo-500 min-w-5 min-h-5 w-5 h-5 mr-2" />
                        {plan.level} Level
                      </li>

                      <li className="flex items-center text-gray-700">
                        <FaCheckCircle className="text-indigo-500 min-w-5 min-h-5 w-5 h-5 mr-2" />
                        {plan.content}
                      </li>

                      <li className="flex items-center text-gray-700">
                        <FaCheckCircle className="text-indigo-500 min-w-5 min-h-5 w-5 h-5 mr-2" />
                        {plan.extras}
                      </li>
                    </ul>

                    <button
                      onClick={() => navigate(`/plans/${plan.id}`)}
                      className="self-start px-6 py-2 bg-indigo-600 hover:bg-indigo-700 
                      text-white font-semibold rounded-xl text-lg shadow-md transition-all duration-300"
                    >
                      Know More
                    </button>
                  </div>

                  {/* IMAGE + PRICE AREA */}
                  <div className="w-full md:w-[48%] bg-white/70 backdrop-blur-sm flex flex-col items-center justify-between p-4">
                    {/* Image */}
                    <div className="w-full h-56 md:h-72 rounded-2xl overflow-hidden shadow-lg mb-5 hover:scale-105 transition-transform duration-300">
                      <img
                        src={plan.image}
                        alt={plan.title}
                        className="md:w-72 w-full h-full object-cover"
                      />
                    </div>

                    {/* Price Drop Animation */}
                    <div className="text-center space-y-1">
                      <span className="text-2xl font-bold text-indigo-700 block">
                        <DropNumber from={plan.marketPrice} to={plan.price} /> /
                        course
                      </span>

                      <span className="text-gray-500 line-through text-sm block">
                        {plan.marketPrice}
                      </span>

                      <span className="text-sm text-gray-600 font-medium block">
                        <DropNumber from={plan.price} to={plan.discount} />{" "}
                        (Discount)
                      </span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Exploreplans;
