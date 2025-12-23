import React, { useEffect } from "react";

const ShippingPolicyPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#fffaf3] min-h-screen py-12 px-6 md:px-20">
      <h1 className="text-4xl font-bold text-[#667D60] mb-8 text-center">
        Shipping Policy
      </h1>
      <div className="text-gray-900 leading-relaxed space-y-4 max-w-5xl mx-auto text-justify">
        <p>
          Orders are shipped through registered domestic courier companies and/or speed post within 7 days from the date of order or payment, subject to courier/postal norms.
        </p>
        <p>
          Swacchh Products shall not be liable for delays by courier/postal authorities. Deliveries will be made to the address provided at purchase.
        </p>
        <p>
          Delivery confirmation will be sent via email. Shipping costs, if any, are non-refundable.
        </p>
      </div>
    </div>
  );
};

export default ShippingPolicyPage;
