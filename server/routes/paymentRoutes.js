const router = require("express").Router();
const paymentController = require("../controllers/paymentControllers");
const auth = require("../middilwares/auth");
const authorizeRoles = require("../middilwares/roles");
const rateLimit =require("express-rate-limit")

const paymentLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,  
  max: 2, 
  message: "Too many Payment attempts, please try again after 1 minute",
});

router.post(
  "/create-session/:jobId",
  auth,
  paymentLimiter,
  authorizeRoles("client"),
  paymentController.createSession
);

router.patch(
  "/release/:jobId",
  auth,
  authorizeRoles("client", "admin"),
  paymentController.releasePayment
);

router.get(
  "/",
  auth,
  authorizeRoles("admin", "client", "freelancer"),
  paymentController.getPayments
);

module.exports = router;
