import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.jpg";
import { useLoginMutation } from "../services/apiService"; // <-- RTK Query hook
import {useEffect} from "react";

function Login() {
    useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();
  const [login, { isLoading, isError, error }] = useLoginMutation();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // ✅ state for login messages
  const [msgType, setMsgType] = useState(""); // ✅ success / error type

  const from = location.state?.from || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage(""); // clear old messages

    if (!email || !password) {
      setMessage("Please fill all fields!");
      setMsgType("error");
      return;
    }

    try {
      const res = await login({ email, password }).unwrap();

      if (res.success) {
        // ✅ store token, role & userId
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);
        localStorage.setItem("userId", res.data.userId);

        setMessage(res.message);
        setMsgType("success");

        setTimeout(() => {
          if (res.data.role === "admin") {
            navigate("/admin");
          } else {
            navigate(from, { replace: true });
          }
          window.location.reload();
        }, 1000); // small delay to show message
      } else {
        setMessage(res.message || "Login failed ❌");
        setMsgType("error");
      }
    } catch (err) {
      setMessage(err?.data?.message || "Invalid email or password ❌");
      setMsgType("error");
    }
  };

  return (
    <div className="flex items-center justify-center max-h-screen bg-[#667D60] px-4 w-screen">
      <div className="flex flex-col md:flex-row w-screen h-screen bg-[#667D60] shadow-lg overflow-hidden">
        {/* Left Logo Section */}
        <div className="hidden md:flex w-1/2 bg-[#667D60] items-center justify-center">
          <img src={logo} alt="Logo" className="w-64 h-64 object-contain" />
        </div>

        {/* Right Form Section */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            Welcome back to SWACCHH
          </h2>

          <form onSubmit={handleLogin} className="flex flex-col space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 rounded-md border border-gray-200 bg-[#f8f5ee] placeholder-gray-500 font-semibold"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 rounded-md border border-gray-200 bg-[#f8f5ee] placeholder-gray-500 font-semibold"
            />
            <p
              className="text-sm text-white cursor-pointer hover:underline self-end"
              onClick={() => setMessage("Forgot password clicked")}
            >
              Forgot Password?
            </p>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#f8f5ee] text-[#667D60] font-semibold py-3 rounded-md hover:bg-gray-100 transition"
            >
              {isLoading ? "Logging in..." : "Log In"}
            </button>

            {/* ✅ Show login messages */}
            {message && (
              <p
                className={`text-center font-semibold ${
                  msgType === "success" ? "text-green-500" : "text-red-500"
                }`}
              >
                {message}
              </p>
            )}

            {/* RTK error fallback */}
            {isError && !message && (
              <p className="text-red-500 text-center">
                {error?.data?.message || "Login failed"}
              </p>
            )}
          </form>

          <p className="mt-4 text-center text-white">
            Don't have an account?{" "}
            <span
              className="text-orange-500 cursor-pointer hover:underline"
              onClick={() => navigate("/register")}
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;