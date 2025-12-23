import React, { useEffect } from "react";

const RefundPolicyPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#fffaf3] min-h-screen py-12 px-6 md:px-20">
      <h1 className="text-4xl font-bold text-[#667D60] mb-8 text-center">
        Refund & Cancellation Policy
      </h1>
      <div className="text-gray-900 leading-relaxed space-y-4 max-w-5xl mx-auto text-justify">
        <p>
          This refund and cancellation policy outlines how you can cancel or seek a refund for a product/service purchased through the Platform.
        </p>
        <ul className="list-disc ml-8 space-y-2">
          <li>Cancellations will only be considered if the request is made within 1 day of placing the order.</li>
          <li>Cancellations may not be entertained if the order has been shipped or is out for delivery.</li>
          <li>Swacchh Products does not accept cancellations for perishable products.</li>
          <li>Damaged or defective items must be reported within 1 day of receipt.</li>
          <li>Refunds, if approved, will take 3 days to process.</li>
        </ul>
      </div>
    </div>
  );
};

export default RefundPolicyPage;
