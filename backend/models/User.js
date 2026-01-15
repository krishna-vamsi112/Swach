import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  pincode: { type: String, required: true },
  locality: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  landmark: { type: String },
  alternatePhone: { type: String },
  addressType: { type: String, enum: ["Home", "Work"], default: "Home" },
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobile: { type: String, unique: true, sparse: true }, // <-- Add this line
  addresses: [addressSchema],
  role: { type: String, enum: ["user", "admin"], default: "user" }, 
});

export default mongoose.models.User || mongoose.model("User", userSchema);


