const Proposal = require("../models/proposal");
const Jobs = require("../models/jobs");

exports.createProposal = async (req, res) => {
  try {
    const { bidAmount, proposalText } = req.body;

    if (!bidAmount || !proposalText) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const newProposal = new Proposal({
      bidAmount,
      proposalText,
      freelancerId: req.user._id,
    });
    await newProposal.save();
    return res.status(201).json(newProposal);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getProposal = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { role } = req.user;

    let query = {};

    if (jobId) {
      query.JobId = jobId;
    }

    if (role === "client") {
      const jobs = await Jobs.find({ clientId: req.user._id });
      const jobIds = jobs.map((job) => job._id);
      query.JobId = { $in: jobIds };
    } else if (role === "freelancer") {
      query.freelancerId = req.user._id;
    }

    const proposals = await Proposal.find(query)
      .populate("freelancerId", "username email")
      .populate("JobId", "title description");

    res.status(200).json(proposals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProposal = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
  
    const updateStatus = await Proposal.findByIdAndUpdate(
      id,
      { status: status },
      { new: true, runValidators: true }
    );

    if (!updateStatus) {
      return res.status(404).json({ message: "Proposal not found" });
    }
    
    return res.status(200).json(updateStatus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
