const router = require("express").Router();
const proposalController = require("../controllers/ProposalControllers");
const auth = require("../middilwares/auth");
const authorizeRoles = require("../middilwares/roles");


router.post("/create",auth,authorizeRoles("freelancer"),proposalController.createProposal)
router.get("/:jobId",auth,authorizeRoles("freelancer","client","admin"),proposalController.getProposal)
router.patch("/:id",auth,authorizeRoles("client","admin"),proposalController.updateProposal)

module.exports = router
