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
    required: true,
  },
  status: {
    type: String,
    enum: ["open", "assigned", "completed"],
    default: "open",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Jobs", jobSchema);
