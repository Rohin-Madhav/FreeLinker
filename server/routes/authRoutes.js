const router = require("express").Router();
const authControllers = require("../controllers/authControllers");
const auth = require("../middilwares/auth");
const authorizeRoles = require("../middilwares/roles");

router.post("/register", authControllers.registerUser);
router.post("/login", authControllers.loginUser);

module.exports = router;
