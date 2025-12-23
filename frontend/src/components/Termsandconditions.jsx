import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PoliciesPreview = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);

  const policies = [
    {
      title: "Terms & Conditions",
      desc: "By using our services, you agree to abide by our terms and conditions, including guidelines for user conduct, payments, cancellations, and privacy.",
      link: "/TermsPage",
    },
    {
      title: "Privacy Policy",
      desc: "We are committed to safeguarding your personal data. Learn how we collect, use, and protect your information responsibly.",
      link: "/Privacypolicypage",
    },
    {
      title: "Refund & Cancellation Policy",
      desc: "Our refund and cancellation policy ensures fair processing of requests within a clear timeline and transparent procedure.",
      link: "/Refundpolicypage",
    },
    {
      title: "Return Policy",
      desc: "Understand our return process, eligibility criteria, and step-by-step guide to initiate a product return hassle-free.",
      link: "/Returnpolicypage",
    },
    {
      title: "Shipping Policy",
      desc: "Get insights into our delivery process, estimated timelines, and how we handle delays or shipping damages efficiently.",
      link: "/Shippingpolicypage",
    },
  ];

  const handleClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="bg-[#fffaf3] py-20 px-6 md:px-20 text-center min-h-screen">
      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-10 font-[cursive]">
        Our Policies
      </h2>

      {/* Pills Section */}
      <div className="bg-[#667D60]/10 rounded-3xl p-5 flex flex-wrap justify-center gap-4 max-w-6xl mx-auto shadow-sm border border-[#667D60]/20">
        {policies.map((policy, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className={`px-7 py-2.5 rounded-full font-medium text-base transition-all duration-300 border focus:outline-none
              ${
                activeIndex === index
                  ? "bg-[#667D60] text-[#fffaf3] border-[#667D60] shadow-md scale-105"
                  : "bg-[#fffaf3] text-[#667D60] border-[#667D60]/30 hover:bg-[#667D60] hover:text-[#fffaf3]"
              }`}
          >
            {policy.title}
          </button>
        ))}
      </div>

      {/* Render dropdown ONLY when activeIndex is not null */}
      {activeIndex !== null && (
        <div className="flex justify-center mt-10 animate-slideDown">
          <div className="bg-[#fffaf3] shadow-md rounded-3xl p-8 text-left border border-[#667D60]/30 max-w-5xl w-full">
            <h3 className="text-3xl font-semibold text-gray-900 mb-4">
              {policies[activeIndex].title}
            </h3>
            <p className="text-gray-900 text-lg leading-relaxed mb-6">
              {policies[activeIndex].desc}
            </p>
            <button
              onClick={() => navigate(policies[activeIndex].link)}
              className="bg-[#667D60] text-[#fffaf3] px-6 py-2.5 rounded-full font-medium shadow hover:opacity-90 transition-all duration-300"
            >
              Show More
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default PoliciesPreview;
