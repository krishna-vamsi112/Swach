import React from "react";
import { useNavigate } from "react-router-dom";

function LoginOptionsModal({ onClose }) {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-80">
        <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
          Choose Login Method
        </h2>

        <div className="flex flex-col space-y-4">
          <button
            onClick={() => {
              onClose();
              navigate("/login"); // Existing email login page
            }}
            className="bg-[#667D60] text-white py-2 rounded-md hover:bg-[#506147] transition"
          >
            Login with Email
          </button>

          <button
            onClick={() => {
              onClose();
              navigate("/login-phone"); // New phone login page
            }}
            className="bg-[#667D60] text-white py-2 rounded-md hover:bg-[#506147] transition"
          >
            Login with Phone
          </button>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 mt-2"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginOptionsModal                                                                                                                                                                                                                                        ;
