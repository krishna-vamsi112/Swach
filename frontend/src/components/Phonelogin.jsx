import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  useSendOtpMutation,
  useVerifyOtpMutation,
} from "../services/apiService";

function PhoneLogin() {
  const navigate = useNavigate();
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState("");
  const [msgType, setMsgType] = useState("");

  const [
    sendOtp,
    {
      isLoading: isSendingOtp,
      isSuccess: isSendOtpSuccess,
      isError: isSendOtpError,
      error: sendOtpError,
    },
  ] = useSendOtpMutation();

  const [
    verifyOtp,
    {
      isLoading: isVerifyingOtp,
      isSuccess: isVerifyOtpSuccess,
      isError: isVerifyOtpError,
      error: verifyOtpError,
      data: verifyOtpData,
    },
  ] = useVerifyOtpMutation();

  // ✅ Step 1: Send OTP
  const handleSendOtp = async () => {
    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(mobile)) {
      setMessage("Please enter a valid 10-digit phone number");
      setMsgType("error");
      return;
    }
    try {
      await sendOtp({ mobile }).unwrap();
    } catch (err) {
      console.error("Failed to send OTP:", err);
    }
  };

  useEffect(() => {
    if (isSendOtpSuccess) {
      setOtpSent(true);
      setMessage("OTP sent successfully ✅");
      setMsgType("success");
    }
    if (isSendOtpError) {
      setMessage(sendOtpError?.data?.message || "Failed to send OTP ❌");
      setMsgType("error");
    }
  }, [isSendOtpSuccess, isSendOtpError, sendOtpError]);

  // ✅ Step 2: Verify OTP
  const handleVerifyOtp = async () => {
    const otpRegex = /^\d{6}$/; // Assuming 6-digit OTP
    if (!otpRegex.test(otp)) {
      setMessage("Please enter a valid 6-digit OTP");
      setMsgType("error");
      return;
    }
    try {
      await verifyOtp({ mobile, otp }).unwrap();
    } catch (err) {
      console.error("Failed to verify OTP:", err);
    }
  };

  useEffect(() => {
    if (isVerifyOtpSuccess && verifyOtpData) {
      localStorage.setItem("token", verifyOtpData.token);
      localStorage.setItem("role", verifyOtpData.role);
      localStorage.setItem("userId", verifyOtpData.userId);

      setMessage("Login successful ✅");
      setMsgType("success");

      setTimeout(() => {
        navigate("/"); // redirect to home or dashboard
        window.location.reload();
      }, 1000);
    }
    if (isVerifyOtpError) {
      setMessage(verifyOtpError?.data?.message || "Invalid OTP ❌");
      setMsgType("error");
    }
  }, [isVerifyOtpSuccess, isVerifyOtpError, verifyOtpData, verifyOtpError, navigate]);

  const loading = isSendingOtp || isVerifyingOtp;

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
