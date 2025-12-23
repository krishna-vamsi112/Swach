import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },
    discount: {
      type: Number,
      required: true,
      min: 1,
      max: 100, // percentage discount
    },
    minAmount: {
      type: Number,
      required: true,
      default: 0,
    },
    expiry: {
      type: Date,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
      trim: true, // celebrity name
    },
  },
  { timestamps: true }
);

const Coupon = mongoose.model("Coupon", couponSchema);
export default Coupon;
