const mongoose = require("mongoose");

const proposalSchema = new mongoose.Schema({
  JobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Jobs",
  },
  freelancerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  bidAmount: {
    type: Number,
    required: true,
  },
  proposalText: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: [
      "pending",
      "accepted",
      "rejected",
      "in-progress",
      "completed",
      "cancelled",
    ],
    default: "pending",
  },
});

module.exports = mongoose.model("Proposal", proposalSchema);
