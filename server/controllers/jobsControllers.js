const Jobs = require("../models/jobs");

exports.createJobs = async (req, res) => {
  try {
    const { title, description, budget, deadline } = req.body;

    if (!title || !description || !budget || !deadline) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newjob = new Jobs({
      title,
      description,
      budget,
      deadline,
      clientId: req.user._id,
    });

    await newjob.save();
    return res.status(201).json(newjob);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getAllJobs = async (req, res) => {
  try {
    let jobs;

    if (req.user.role === "client") {
      jobs = await Jobs.find({ clientId: req.user._id });
    } else {
      jobs = await Jobs.find();
    }

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getJobsById = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Jobs.findById(jobId);
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateJobs = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, deadline } = req.body;

    const updatedJobs = await Jobs.findByIdAndUpdate(
      id,
      { description, deadline },
      { new: true }
    );

    if (!updatedJobs) {
      return res.status(404).json({ message: "Jobs not found" });
    }

    res.status(200).json(updatedJobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteJobs = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedJob = await Jobs.findByIdAndDelete(id);
    if (!deletedJob) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
