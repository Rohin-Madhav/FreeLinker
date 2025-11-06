const express = require("express");
const cors = require("cors");
const morgan = require("morgan")
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const jobsRoutes = require("./routes/jobsRoutes");
const proposalRoutes = require("./routes/proposalRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const stripe = require("./utils/stripe");
const Jobs = require("./models/jobs");

const app = express();

app.post(
  "/api/payment/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object;
        // Update job payment status
        await Jobs.findOneAndUpdate(
          { paymentIntentId: paymentIntent.id },
          {
            paymentStatus: "paid",
            amountPaid: paymentIntent.amount / 100,
          }
        );
        break;
      case "payment_intent.payment_failed":
        const failedPayment = event.data.object;
        await Jobs.findOneAndUpdate(
          { paymentIntentId: failedPayment.id },
          { paymentStatus: "failed" }
        );
        break;
    }

    res.json({ received: true });
  }
);


const PORT = process.env.PORT || 3000;
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"))

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/jobs", jobsRoutes);
app.use("/api/proposal", proposalRoutes);
app.use("/api/payment", paymentRoutes);

app.listen(PORT, () => {
  console.log(`server is running :${PORT}`);
});
