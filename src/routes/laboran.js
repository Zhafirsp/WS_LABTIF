const express = require("express");
const router = express.Router();

const LaboranController = require("../controllers/laboranController");

// router.get("/:username", LaboranController.addLaboranByUsername);
router.post("/:username", LaboranController.addLaboranByUsername);
router.get("/", LaboranController.getAllLaboran);
router.get("/:nip", LaboranController.getLaboranByNip);
router.put("/:nip", LaboranController.updateLaboranByNIP);
router.delete("/:nip", LaboranController.deleteLaboranByNIP);

module.exports = router;
