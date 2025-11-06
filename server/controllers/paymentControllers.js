const stripe = require("../utils/stripe");
const Jobs = require("../models/jobs");

exports.createSession = async (req, res) => {
  try {
    const { jobId } = req.params;
    const job = await Jobs.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Create a payment intent first
    const paymentIntent = await stripe.paymentIntents.create({
      amount: job.budget * 100,
      currency: "usd",
      metadata: {
        jobId: job._id.toString(),
      },
    });

    // Store the payment intent ID in the job
    await Jobs.findByIdAndUpdate(jobId, {
      paymentIntentId: paymentIntent.id,
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      payment_intent_data: {
        payment_intent: paymentIntent.id,
      },
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: job.title,
            },
            unit_amount: job.budget * 100,
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.CLIENT_URL}/payment/success`,
      cancel_url: `${process.env.CLIENT_URL}/payment/cancel`,
    });

    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.releasePayment = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { status, paymentStatus } = req.body;

    const job = await Jobs.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (job.clientId.toString() !== req.user._id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (job.paymentStatus !== "paid") {
      return res.status(400).json({ message: "Payment not captured yet" });
    }

    if (job.status !== "completed") {
      return res.status(400).json({ message: "Work not yet verified" });
    }

    const updatedJob = await Jobs.findByIdAndUpdate(
      jobId,
      { status, paymentStatus },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      message: "Payment released successfully",
      job: updatedJob,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPayments = async (req, res) => {
  try {
    const { role, _id } = req.user;

    let filter = {};

    if (role === "client") {
      filter.clientId = _id;
    } else if (role === "freelancer") {
      filter.assignedFreelancer = _id;
    }

    const jobs = await Jobs.find(filter)
      .select(
        "title budget paymentStatus amountPaid paymentIntentId clientId assignedFreelancer createdAt"
      )
      .populate("clientId", "username email")
      .populate("assignedFreelancer", "username email");

    res.status(200).json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
