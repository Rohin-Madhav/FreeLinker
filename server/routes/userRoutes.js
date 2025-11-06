const router = require("express").Router();
const userController = require("../controllers/userControllers");
const auth = require("../middilwares/auth");
const authorizeRole = require("../middilwares/roles");

router.patch(
  "/:id",
  auth,
 authorizeRole("admin"),
  userController.approveFreelancer
);
router.get("/", auth, authorizeRole("admin"), userController.getAllUsers);
router.post("/suspend/:userId",auth,authorizeRole("admin"),userController.suspendUser)


module.exports = router;
