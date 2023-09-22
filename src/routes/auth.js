const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/authController");
const Authenticated = require("../middleware/authentication");

// Register
// router.post("/register", AuthController.Register);
router.post("/login", AuthController.login);
router.get("/refresh", AuthController.refreshToken);
router.get("/logout", Authenticated, AuthController.logout);

module.exports = router;
