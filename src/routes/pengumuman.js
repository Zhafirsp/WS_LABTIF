const express = require("express");
const router = express.Router();

const PengumumanController = require("../controllers/pengumumanController");

router.post("/", PengumumanController.addPengumuman);
router.get("/", PengumumanController.getAllPengumuman);
router.get("/:id", PengumumanController.getPengumumanById);
router.put("/:id", PengumumanController.updatePengumumanById);
router.delete("/:id", PengumumanController.deletePengumumanById);

module.exports = router;
