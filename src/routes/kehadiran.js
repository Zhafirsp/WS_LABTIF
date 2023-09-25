const express = require("express");
const router = express.Router();

const Authenticated = require("../middleware/authentication");
const Authorization = require("../middleware/authorization");

const KehadiranController = require("../controllers/kehadiranController");

// router.use(Authenticated);
// router.use(Authorization.verifyLaboran);

// Menampilkan data kehadiran Asisten
router.get("/", KehadiranController.getAllKehadiranByPeriode);
router.get("/asisten/:aslabID", KehadiranController.getAllKehadiranByAslabID);
router.get("/:id", KehadiranController.getKehadiranById);

// Mengelola data kehadiran Asisten
router.post("/:piketID", KehadiranController.addKehadiranByPiketId);
router.put("/:id", KehadiranController.updateKehadiranById);

module.exports = router;
