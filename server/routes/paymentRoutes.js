const router = require("express").Router();
const paymentController = require("../controllers/paymentControllers");
const auth = require("../middilwares/auth");
const authorizeRoles = require("../middilwares/roles");

router.post(
  "/create-session/:jobId",
  auth,
  authorizeRoles("client"),
  paymentController.createSession
);

router.patch(
  "/release/:jobId",
  auth,
  authorizeRoles("client", "admin"),
  paymentController.releasePayment
);

module.exports = router;
