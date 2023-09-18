const express = require("express");
const router = express.Router();

const uploadImage = require("../middleware/uploadImage");
const ProfileController = require("../controllers/profileController");

const Authenticated = require("../middleware/authentication");

router.use(Authenticated);
router.get("/", ProfileController.getProfile);
router.put(
  "/",
  uploadImage.single("image_url"),
  ProfileController.updateProfile
);

module.exports = router;
