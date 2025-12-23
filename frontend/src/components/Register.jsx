import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";
import { useSignupMutation } from "../services/apiService";
import { motion } from "framer-motion";
import { useEffect } from "react";

function Register() {
    useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  
  const navigate = useNavigate();
  const [signup, { isLoading, isError, error }] = useSignupMutation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // ✅ State for inline messages
  const [message, setMessage] = useState("");
  const [msgType, setMsgType] = useState(""); // "success" | "error"

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage(""); // clear old message

    if (!name || !email || !password || !confirmPassword) {
      setMessage("Please fill all fields!");
      setMsgType("error");
      return;
    }
    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
      setMsgType("error");
      return;
    }

    try {
      const res = await signup({ name, email, password }).unwrap();
      setMessage(res.message || "Registration successful ✅");
      setMsgType(res.success ? "success" : "error");

      if (res.success) {
        // ✅ Save user info in localStorage
        

        // ✅ Redirect to login page instead of profile
        setTimeout(() => navigate("/login"), 1500);
      }
    } catch (err) {
      console.log(err);
      setMessage(err?.data?.message || "Registration failed ❌");
      setMsgType("error");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="flex items-center justify-center min-h-screen bg-gray-100 px-4"
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col md:flex-row w-full max-w-6xl bg-[#667D60] shadow-lg overflow-hidden rounded-2xl"
      >
        {/* Left Logo Section */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="hidden md:flex w-1/2 bg-[#667D60] items-center justify-center"
        >
          <img src={logo} alt="Logo" className="w-64 h-64 object-contain" />
        </motion.div>

        {/* Right Form Section */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
            Register
          </h2>

          <form onSubmit={handleRegister} className="flex flex-col space-y-4">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-3 rounded-md border border-gray-200 bg-[#f8f5ee] placeholder-gray-500 font-semibold focus:outline-none focus:ring-2 focus:ring-[#4d5e49]"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 rounded-md border border-gray-200 bg-[#f8f5ee] placeholder-gray-500 font-semibold focus:outline-none focus:ring-2 focus:ring-[#4d5e49]"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 rounded-md border bg-[#f8f5ee] border-gray-200 placeholder-gray-500 font-semibold focus:outline-none focus:ring-2 focus:ring-[#4d5e49]"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="p-3 rounded-md border bg-[#f8f5ee] border-gray-200 placeholder-gray-500 font-semibold focus:outline-none focus:ring-2 focus:ring-[#4d5e49]"
            />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#f8f5ee] text-[#667D60] font-semibold py-3 rounded-md hover:bg-gray-100 transition"
            >
              {isLoading ? "Registering..." : "Register"}
            </motion.button>

            {/* ✅ Inline success/error messages */}
            {message && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-center font-semibold ${
                  msgType === "success" ? "text-green-500" : "text-red-500"
                }`}
              >
                {message}
              </motion.p>
            )}

            {/* RTK fallback error */}
            {isError && !message && (
              <p className="text-red-500 text-center">
                {error?.data?.message || "Something went wrong"}
              </p>
            )}

            <p className="mt-4 text-center text-white">
              Already have an account?{" "}
              <span
                className="text-orange-500 cursor-pointer hover:underline"
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            </p>
          </form>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default Register;
