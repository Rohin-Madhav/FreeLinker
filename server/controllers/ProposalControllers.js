const mongoose = require("mongoose");
const Proposal = require("../models/proposal");
const Jobs = require("../models/jobs");

exports.createProposal = async (req, res) => {
  try {
    const { bidAmount, proposalText, jobId } = req.body;

    if (!bidAmount || !proposalText || !jobId) {
      return res.status(400).json({
        message: "Missing required fields: bidAmount, proposalText, jobId",
      });
    }

    const job = await Jobs.findById(jobId).select("_id clientId");
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const newProposal = new Proposal({
      JobId: job._id,
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
    const { role, _id } = req.user;
    const query = {};

    if (jobId) {
      query.JobId = new mongoose.Types.ObjectId(jobId);
    }

    if (role === "client") {
      const jobs = await Jobs.find({ clientId: _id }).select("_id");
      const jobIds = jobs.map((job) => job._id.toString());

      if (jobId) {
        if (!jobIds.includes(jobId.toString())) {
          return res
            .status(403)
            .json({ message: "Not authorized to view proposals for this job" });
        }
      } else {
        query.JobId = { $in: jobIds };
      }
    } else if (role === "freelancer") {
      query.freelancerId = new mongoose.Types.ObjectId(_id);
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

    const proposal = await Proposal.findById(id);
    if (!proposal) {
      return res.status(404).json({ message: "Proposal not found" });
    }

    const job = await Jobs.findById(proposal.JobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (job.clientId.toString() !== req.user._id && req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Not authorized to update proposal" });
    }

    const updatedProposal = await Proposal.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (status === "accepted") {
      await Proposal.updateMany(
        { JobId: proposal.JobId, _id: { $ne: id } },
        { status: "rejected" }
      );

      await Jobs.findByIdAndUpdate(proposal.JobId, {
        assignedFreelancer: proposal.freelancerId,
        status: "assigned",
      });
    }

    res.status(200).json({
      message: `Proposal ${status} successfully`,
      proposal: updatedProposal,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.freelancerUpdateProposalStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!status) {
      return res
        .status(400)
        .json({ message: "Missing status in request body" });
    }

    const allowedStatuses = ["in-progress", "completed", "cancelled"];
    if (!allowedStatuses.includes(status)) {
      return res
        .status(400)
        .json({
          message: `Invalid status. Allowed: ${allowedStatuses.join(", ")}`,
        });
    }

    const proposal = await Proposal.findById(id);
    if (!proposal) {
      return res.status(404).json({ message: "Proposal not found" });
    }

    if (
      proposal.freelancerId.toString() !== req.user._id &&
      req.user.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this proposal" });
    }

    const updatedProposal = await Proposal.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (status === "in-progress") {
      const job = await Jobs.findById(proposal.JobId);
      if (job) {
        const jobUpdate = { status: "in-progress" };

        if (!job.assignedFreelancer)
          jobUpdate.assignedFreelancer = proposal.freelancerId;
        await Jobs.findByIdAndUpdate(proposal.JobId, jobUpdate, {
          new: true,
          runValidators: true,
        });
      }
    }

    res.status(201).json(updatedProposal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

