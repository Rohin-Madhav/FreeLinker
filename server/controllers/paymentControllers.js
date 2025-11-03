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
