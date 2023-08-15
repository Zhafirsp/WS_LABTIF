const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/authController");
const Authenticated = require("../middleware/authentication");

// Register
// router.post("/register", AuthController.Register);
router.post("/login", AuthController.Login);
router.get("/refresh", AuthController.refreshToken);
router.get("/logout", Authenticated, AuthController.Logout);

module.exports = router;
