const express = require("express");
const router = express.Router();

const ProfileController = require("../controllers/profileController");

const Authenticated = require("../middleware/authentication");

router.use(Authenticated);
router.get("/", ProfileController.getProfile);
router.put("/", ProfileController.updateProfile);

module.exports = router;
