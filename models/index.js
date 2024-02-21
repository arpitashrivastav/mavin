import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["user", "gymAdmin"],
    default: "user",
  },
});

const paymentPlanSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  duration: {
    type: String,
    enum: ["monthly", "quarterly", "yearly"],
    required: true,
  },
});

const membershipSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  planId: { type: mongoose.Schema.Types.ObjectId, ref: "Plan", required: true },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, required: true },
  status: { type: String, enum: ["active", "expired"], default: "active" },
});

export const User = mongoose.model("User", userSchema);
export const Plan = mongoose.model("Plan", paymentPlanSchema);
export const Membership = mongoose.model("Membership", membershipSchema);
