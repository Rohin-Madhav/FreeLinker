const router = require("express").Router();
const proposalController = require("../controllers/ProposalControllers");
const auth = require("../middilwares/auth");
const authorizeRoles = require("../middilwares/roles");
const rateLimit = require("express-rate-limit");

const postLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: "Too many Proposal attempts, please try again after an hour",
});

router.post(
  "/create",
  auth,
  postLimiter,
  authorizeRoles("freelancer"),
  proposalController.createProposal
);
router.get(
  "/",
  auth,
  authorizeRoles("freelancer", "client", "admin"),
  proposalController.getProposal
);
router.patch(
  "/:id",
  auth,
  authorizeRoles("client", "admin"),
  proposalController.updateProposal
);
router.patch(
  "/:id/status",
  auth,
  authorizeRoles("freelancer"),
  proposalController.freelancerUpdateProposalStatus
);

module.exports = router;
