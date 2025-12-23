import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  purchaseId: String,
  buyer: String,
  invoice: String,
  date: String,
  amount: String,
  method: String,
  status: {
    type: String,
    enum: ["Completed", "Pending", "Cancel"],
    default: "Pending"
  }
});

export default mongoose.model("Transaction", transactionSchema);
