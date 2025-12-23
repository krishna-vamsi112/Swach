import React, { useEffect } from "react";

const ReturnPolicyPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#fffaf3] min-h-screen py-12 px-6 md:px-20">
      <h1 className="text-4xl font-bold text-[#667D60] mb-8 text-center">
        Return Policy
      </h1>
      <div className="text-gray-900 leading-relaxed space-y-4 max-w-5xl mx-auto text-justify">
        <p>
          We offer refund/exchange within 2 days from the date of purchase. If 2 days have passed, you will not be eligible for a return or refund.
        </p>
        <p>
          Items must be unused, in original packaging, and not purchased on sale. Only defective or damaged items are eligible for exchange.
        </p>
        <p>
          Certain products may be exempt from returns; such items will be marked at purchase.
        </p>
        <p>
          Once returned items are received and approved after quality check, the return/exchange will be processed as per policy.
        </p>
      </div>
    </div>
  );
};

export default ReturnPolicyPage;
