import mongoose from "mongoose";

const LeadSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  subject: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Lead", LeadSchema);
