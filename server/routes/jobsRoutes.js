const router = require("express").Router();
const jobsControllers = require("../controllers/jobsControllers");
const auth = require("../middilwares/auth");
const authorizeRoles = require("../middilwares/roles");
const rateLimit = require("express-rate-limit");

const postLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: "Too many job creation attempts, please try again after an hour",
});

router.get(
  "/my-assignment",
  auth,
  authorizeRoles("freelancer"),
  jobsControllers.myAssignedJobs
);
router.post(
  "/create",
  auth,
  postLimiter,
  authorizeRoles("client"),
  jobsControllers.createJobs
);
router.get(
  "/",
  auth,
  authorizeRoles("admin", "freelancer"),
  jobsControllers.getAllJobs
);
router.get(
  "/:jobId",
  auth,
  authorizeRoles("admin", "freelancer", "client"),
  jobsControllers.getJobsById
);

router.get(
  "/client/:id",
  auth,
  authorizeRoles("admin","client"),
  jobsControllers.getjobByClientId
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
router.patch(
  "/:id/complete",
  auth,
  authorizeRoles("client"),
  jobsControllers.updateStatus
);

module.exports = router;
