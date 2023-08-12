const express = require("express");
const router = express.Router();

const KehadiranController = require("../controllers/kehadiranController");

router.post("/:piketID", KehadiranController.addKehadiranByPiketId);
router.get("/:aslabID", KehadiranController.getKehadiranByAslabID);
router.get("/", KehadiranController.getAllKehadiran);
router.get("/:id", KehadiranController.getKehadiranById);
router.put("/:id", KehadiranController.updateKehadiranById);

module.exports = router;
