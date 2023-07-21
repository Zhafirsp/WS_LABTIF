const express = require("express");
const router = express.Router();

const UserController = require("../controllers/userController");

router.post("/mahasiswa", UserController.addMahasiswaAsUser);
router.post("/register", UserController.addUser);
router.get("/", UserController.getAllUser);
router.get("/:id", UserController.getUserById);
router.put("/:id", UserController.updateUserById);
router.delete("/:id", UserController.deleteUserById);

module.exports = router;
