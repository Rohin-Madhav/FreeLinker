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

module.exports = router;
