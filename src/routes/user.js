const express = require("express");
const router = express.Router();

const uploadImage = require("../middleware/uploadImage");
const UserController = require("../controllers/userController");

const Authenticated = require("../middleware/authentication");
const Authorization = require("../middleware/authorization");

// router.use(Authenticated);
// router.use(Authorization.verifyLaboran);

// ADD New User Otomatis untuk Mahasiswa Baru
router.post("/mahasiswa", UserController.addMahasiswaAsUser);

// ADD New User Manual
router.post(
  "/register",
  uploadImage.single("image_url"),
  UserController.addUser
);

// GET All User
router.get("/", UserController.getAllUser);

// GET User by ID
router.get("/:id", UserController.getUserById);

// UPDATE User by ID
router.put(
  "/:id",
  uploadImage.single("image_url"),
  UserController.updateUserById
);

// DELETE User by ID
router.delete("/:id", UserController.deleteUserById);

module.exports = router;
