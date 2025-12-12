const router = require("express").Router();
const reviwController = require("../controllers/reviewControllers");
const auth = require("../middilwares/auth");
const authorizeRoles = require("../middilwares/roles");

router.post(
  "/",
  auth,
  authorizeRoles("freelancer", "client"),
  reviwController.createReview
);

router.get("/:id",reviwController.getReviews)

module.exports = router;
