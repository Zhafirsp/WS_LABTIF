const express = require("express");
const uploadImage = require("../config/uploadImage");
const router = express.Router();

const UserController = require("../controllers/userController");

// const Authenticated = require("../middleware/authentication");

router.post("/mahasiswa", UserController.addMahasiswaAsUser);
router.post(
  "/register",
  uploadImage.single("image_url"),
  UserController.addUser
);
router.get("/", UserController.getAllUser);
router.get("/:id", UserController.getUserById);
router.put(
  "/:id",
  uploadImage.single("image_url"),
  UserController.updateUserById
);
router.delete("/:id", UserController.deleteUserById);

module.exports = router;
