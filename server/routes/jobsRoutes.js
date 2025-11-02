const router = require("express").Router();
const jobsControllers = require("../controllers/jobsControllers");
const auth = require("../middilwares/auth");
const authorizeRoles = require("../middilwares/roles");

router.post(
  "/create",
  auth,
  authorizeRoles("client"),
  jobsControllers.createJobs
);
router.get(
  "/",
  auth,
  authorizeRoles("admin", "freelancer", "client"),
  jobsControllers.getAllJobs
);
router.get(
  "/:jobId",
  auth,
  authorizeRoles("admin", "freelancer", "client"),
  jobsControllers.getJobsById
);
router.patch(
  "/:id",
  auth,
  authorizeRoles("admin", "client"),
  jobsControllers.updateJobs
);
router.delete(
  "/:id",
  auth,
  authorizeRoles("admin", "client"),
  jobsControllers.deleteJobs
);
router.patch("/:id/complete",auth,authorizeRoles("client"),jobsControllers.updateStatus)

module.exports = router;
