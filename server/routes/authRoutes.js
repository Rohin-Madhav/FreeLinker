const router = require("express").Router();
const authControllers = require("../controllers/authControllers");
const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5,
  message: "Too many login attempts, please try again after 1 minutes",
});

const registerLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 3,
  message: "Too many registration attempts, please try again after 5 minutes",
});

router.post("/register", authControllers.registerUser);
router.post("/login", loginLimiter, authControllers.loginUser);

module.exports = router;
