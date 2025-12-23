import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function PhoneLogin() {
  const navigate = useNavigate();
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [msgType, setMsgType] = useState("");

  const API_BASE_URL =  "https://swacchh.com/backend/api";

  // ✅ Step 1: Send OTP
  const handleSendOtp = async () => {
    if (!mobile) {
      setMessage("Please enter your phone number");
      setMsgType("error");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile }),
      });

      const data = await res.json();
      if (data.success) {
        setOtpSent(true);
        setMessage("OTP sent successfully ✅");
        setMsgType("success");
      } else {
        setMessage(data.message || "Failed to send OTP ❌");
        setMsgType("error");
      }
    } catch (error) {
      setMessage("Something went wrong ❌");
      setMsgType("error");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Step 2: Verify OTP
  const handleVerifyOtp = async () => {
    if (!otp) {
      setMessage("Please enter the OTP");
      setMsgType("error");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile, otp }),
      });

      const data = await res.json();
      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        localStorage.setItem("userId", data.userId);

        setMessage("Login successful ✅");
        setMsgType("success");

        setTimeout(() => {
          navigate("/"); // redirect to home or dashboard
          window.location.reload();
        }, 1000);
      } else {
        setMessage(data.message || "Invalid OTP ❌");
        setMsgType("error");
      }
    } catch (error) {
      setMessage("Something went wrong ❌");
      setMsgType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="flex items-center justify-center min-h-screen bg-gray-100 px-4"
    >
      <div className="bg-[#667D60] w-full max-w-md p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Login with Phone
        </h2>

        {!otpSent ? (
          <>
            <input
              type="tel"
              placeholder="Enter Mobile Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full p-3 rounded-md border border-gray-200 bg-[#f8f5ee] placeholder-gray-500 font-semibold mb-4"
            />
            <button
              onClick={handleSendOtp}
              disabled={loading}
              className="w-full bg-[#f8f5ee] text-[#667D60] font-semibold py-3 rounded-md hover:bg-gray-100 transition"
            >
              {loading ? "Sending OTP..." : "Get OTP"}
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-3 rounded-md border border-gray-200 bg-[#f8f5ee] placeholder-gray-500 font-semibold mb-4"
            />
            <button
              onClick={handleVerifyOtp}
              disabled={loading}
              className="w-full bg-[#f8f5ee] text-[#667D60] font-semibold py-3 rounded-md hover:bg-gray-100 transition"
            >
              {loading ? "Verifying..." : "Login"}
            </button>
          </>
        )}

        {message && (
          <p
            className={`mt-4 text-center font-semibold ${
              msgType === "success" ? "text-green-500" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        {otpSent && (
          <p
            className="mt-3 text-sm text-white cursor-pointer text-center hover:underline"
            onClick={() => setOtpSent(false)}
          >
            Back to Phone Number
          </p>
        )}
      </div>
    </motion.div>
  );
}

export default PhoneLogin;
