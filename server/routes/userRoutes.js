const router = require("express").Router();
const userController = require("../controllers/userControllers");
const auth = require("../middilwares/auth");
const authorizeRole = require("../middilwares/roles");

router.get("/", auth, authorizeRole("admin"), userController.getAllUsers);
router.patch(
  "/:id",
  auth,
 authorizeRole("admin"),
  userController.approveFreelancer
);

module.exports = router;
