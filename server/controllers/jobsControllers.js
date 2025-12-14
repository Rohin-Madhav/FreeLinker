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
    const { JobId } = req.params;
    const job = await Jobs.findById(id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    } 
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  } 
};

exports.getjobByClientId = async (req, res) => {
  try {
    const { id } = req.params;

    
    const jobs = await Jobs.find({ clientId: id });

    if (!jobs || jobs.length === 0) {
      return res.status(404).json({ message: "No jobs found for this client" });
    }

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.myAssignedJobs = async (req,res) =>{
  try {
    const freelancerId = req.user._id

    const assignedJob = await Jobs.find({ assignedFreelancer: freelancerId })

    res.status(200).json(assignedJob)
    
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}

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
exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required." });
    }

    const job = await Jobs.findById(id);
    if (!job) {
      return res.status(404).json({ message: "Job not found." });
    }

    if (job.clientId.toString() !== req.user._id && req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Not authorized to update this job." });
    }

    job.status = status;
    await job.save();

    if (status === "completed") {
      await Proposal.updateOne(
        { JobId: id, status: "in-progress" },
        { status: "completed" }
      );
    }

    return res.status(200).json({
      message: `Job status updated to "${status}"`,
      job,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
