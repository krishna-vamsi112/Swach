import React, { useEffect } from "react";

const PrivacyPolicyPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#fffaf3] min-h-screen py-12 px-6 md:px-20">
      <h1 className="text-4xl font-bold text-[#667D60] mb-8 text-center">
        Privacy Policy
      </h1>
      <div className="text-gray-900 leading-relaxed space-y-4 max-w-5xl mx-auto text-justify">
        <p>
          This Privacy Policy describes how Swacchh Products and its affiliates (“we”, “our”, “us”) collect, use, share, protect or otherwise process your information/personal data through our website https://swacchh.com/ (“Platform”).
        </p>
        <p>
          By visiting this Platform or availing any product/service offered on it, you agree to be bound by the terms of this Privacy Policy and the laws of India.
        </p>
        <p>
          We collect personal data such as name, address, phone number, email, proof of identity, and sensitive information like bank account or payment instrument details, with your consent. We may track behaviour and preferences to improve services. Third-party partners collecting data are governed by their own policies.
        </p>
        <p>
          We use personal data to fulfil orders, resolve disputes, customize experiences, detect fraud, enforce terms, and communicate updates or offers.
        </p>
        <p>
          Data may be shared internally or with partners, sellers, or law enforcement agencies when required by law or for service provision.
        </p>
        <p>
          We adopt reasonable practices to protect data from unauthorized access, though online transmission cannot be completely secure.
        </p>
        <p>
          You may delete your account or request deletion, except when pending grievances exist. Data may be retained as required by law or for preventing fraud.
        </p>
        <p>
          You may access, rectify, and update your personal data anytime.
        </p>
        <p>
          By using our Platform, you consent to data collection and processing in accordance with this policy. You may withdraw consent by contacting the Grievance Officer.
        </p>
        <p>
          We may update this Privacy Policy periodically and notify you as per applicable laws.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
