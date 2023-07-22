const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/authController");

// Register
// router.post("/register", AuthController.Register);
router.post("/login", AuthController.Login);
router.get("/refresh", AuthController.refreshToken);

module.exports = router;
