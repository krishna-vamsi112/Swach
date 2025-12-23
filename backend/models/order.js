import mongoose from "mongoose";
const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        productId: { type: String, required: true },
        name: { type: String, required: true },
        type: { type: String, required: true },
        qty: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    address: {
      name: String,
      mobile: String,
      pincode: String,
      locality: String,
      address: String,
      city: String,
      state: String,
      landmark: String,
      alternatePhone: String,
      addressType: String,
    },
    status: { type: String, default: "Pending" },
      coupon: {
      code: { type: String },         // actual coupon code user entered
      createdBy: { type: String },    // celebrity/creator name or ID
    },


    // 🆕 Razorpay fields
    razorpayPaymentId: { type: String },
    razorpayOrderId: { type: String },
    razorpaySignature: { type: String },

    // Tracking fields
    trackingId: { type: String },
    trackingUrl: { type: String },
  },
  
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
