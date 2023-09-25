const express = require("express");
const router = express.Router();

// const Authenticated = require("../middleware/authentication");

const AuthController = require("../controllers/authController");

router.post("/login", AuthController.login);
router.get("/refresh", AuthController.refreshToken);
router.get("/logout", Authenticated, AuthController.logout);

module.exports = router;
