// src/pages/ProfilePage.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Pencil } from "lucide-react";
import { useGetUserByIdQuery, useUpdateUserMutation } from "../services/profileApi";
// import { useEffect } from "react";

function ProfilePage() {
    useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const userId = localStorage.getItem("userId"); // logged-in user ID
  const token = localStorage.getItem("token");   // JWT token

  const { data: userData, isLoading, error } = useGetUserByIdQuery(userId, {
    skip: !userId,
  });

  const [updateUser] = useUpdateUserMutation();

  const [user, setUser] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    photo: "",
    photoFile: null, // for uploading
  });
  const [isEditing, setIsEditing] = useState(false);

  // Load user data
  useEffect(() => {
    if (userData) {
      setUser({
        name: userData.name || "",
        phone: userData.addresses?.[0]?.mobile || "",
        email: userData.email || "",
        address: userData.addresses?.[0]?.address || "",
        photo: userData.photo || "",
        photoFile: null,
      });
    }
  }, [userData]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Handle photo selection
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUser({ ...user, photo: URL.createObjectURL(file), photoFile: file });
    }
  };

  // Submit updated profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) return alert("User ID missing");

    try {
      let payload;
      // If photoFile exists, use FormData for file upload
      if (user.photoFile) {
        payload = new FormData();
        payload.append("name", user.name);
        payload.append("email", user.email);
        payload.append("address", user.address);
        payload.append("mobile", user.phone);
        payload.append("photo", user.photoFile);
      } else {
        // fallback to JSON
        payload = {
          name: user.name,
          email: user.email,
          addresses: [{ address: user.address, mobile: user.phone }],
          photo: user.photo,
        };
      }

      const response = await updateUser({ id: userId, data: payload }).unwrap();

      alert("Profile updated ✅");
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      alert("Error updating profile ❌");
    }
  };

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Error loading profile</p>;
  if (!userId) return <p className="text-center mt-10 text-red-500">User not logged in</p>;

  return (
    <section className="min-h-screen bg-[#FFF7EC] flex items-center justify-center py-10 px-4">
      <motion.div
        className="bg-white rounded-3xl shadow-xl p-8 sm:p-10 max-w-xl w-full relative"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Edit / Cancel Button */}
        <button
          type="button"
          onClick={() => setIsEditing(!isEditing)}
          className="absolute top-4 right-4 flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#667D60] text-white font-medium hover:bg-[#4d5e49] transition"
        >
          <Pencil size={16} />
          {isEditing ? "Cancel" : "Edit"}
        </button>

        <motion.h2
          className="text-2xl font-bold text-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          User Profile
        </motion.h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Photo */}
          <div className="flex flex-col items-center relative">
            <motion.div
              className="relative group"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {user.photo && (
                <img
                  src={user.photo}
                  alt="Profile"
                  className="w-28 h-28 rounded-full border-4 border-[#FDF6ED] object-cover shadow-md"
                />
              )}
              {isEditing && (
                <>
                  <label
                    htmlFor="photoUpload"
                    className="absolute bottom-2 right-2 bg-[#667D60] p-2 rounded-full cursor-pointer shadow-md opacity-80 hover:opacity-100 transition-opacity duration-300"
                  >
                    <Pencil size={16} className="text-white" />
                  </label>
                  <input
                    type="file"
                    id="photoUpload"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                </>
              )}
            </motion.div>
          </div>

          {/* Name, Email, Phone */}
          {["name", "email", "phone"].map((field, i) => (
            <motion.div
              key={field}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
            >
              <label className="block text-gray-700 font-medium">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type={field === "email" ? "email" : "text"}
                name={field}
                value={user[field]}
                onChange={handleChange}
                disabled={!isEditing}
                className={`mt-1 w-full px-4 py-2 border rounded-xl ${
                  isEditing
                    ? "focus:outline-none focus:ring-2 focus:ring-[#667D60]"
                    : "bg-gray-100 cursor-not-allowed"
                }`}
                placeholder={`Enter your ${field}`}
                required={field === "name" || field === "email"}
              />
            </motion.div>
          ))}

          {/* Address */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <label className="block text-gray-700 font-medium">Address</label>
            <textarea
              name="address"
              value={user.address}
              onChange={handleChange}
              disabled={!isEditing}
              className={`mt-1 w-full px-4 py-2 border rounded-xl ${
                isEditing
                  ? "focus:outline-none focus:ring-2 focus:ring-[#667D60]"
                  : "bg-gray-100 cursor-not-allowed"
              }`}
              placeholder="Enter your address"
              rows="3"
            />
          </motion.div>

          {/* Save Button */}
          {isEditing && (
            <motion.div
              className="flex justify-between mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <button
                type="submit"
                className="px-6 py-2 rounded-full bg-[#667D60] text-white font-medium hover:bg-[#4d5e49] transition"
              >
                Save / Update
              </button>
            </motion.div>
          )}
        </form>
      </motion.div>
    </section>
  );
}

export default ProfilePage;
