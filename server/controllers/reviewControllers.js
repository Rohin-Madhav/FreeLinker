const Review = require("../models/reviews");
const Jobs = require("../models/jobs");

exports.createReview = async (req, res) => {
  try {
    const { jobId, revieweeId, rating, comment } = req.body;
    const reviewerId = req.user._id;

    if (!jobId || !revieweeId || !rating) {
      return res
        .status(400)
        .json({ message: "Job ID, reviewee ID, and rating are required." });
    }

    const job = await Jobs.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found." });
    }

    if (job.status !== "completed" || job.paymentStatus !== "released") {
      return res
        .status(400)
        .json({ message: "You can only review after payment release." });
    }

    const existingReview = await Review.findOne({ jobId, reviewerId });
    if (existingReview) {
      return res
        .status(400)
        .json({ message: "You already reviewed this job." });
    }

    const review = await Review.create({
      jobId,
      reviewerId,
      revieweeId,
      rating,
      comment,
    });

    res.status(201).json({
      message: "Review submitted successfully.",
      review,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getReviews = async (req, res) => {
  try {
    const { userId: id } = req.params;
    const reviews = await Review.find({ revieweeId: id })
      .populate("reviewerId", "username role")
      .populate("jobId", "title");

    if (!reviews.length) {
      return res
        .status(404)
        .json({ message: "No reviews found for this user." });
    }

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
