const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  description: {
    type: String,
    required: true,
  },
  budget: {
    type: Number,
    min: 0,
  },
  deadline: {
    type: String,
  },
  assignedFreelancer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "released", "failed"],
    default: "pending",
  },
  paymentIntentId: {
    type: String,
    default: null,
  },
  amountPaid: {
    type: Number,
    default: 0,
  },

  status: {
    type: String,
    enum: ["open", "assigned", "in-progress", "completed", "cancelled"],
    default: "open",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Jobs", jobSchema);
