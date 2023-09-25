const express = require("express");
const router = express.Router();

const Authenticated = require("../middleware/authentication");
const Authorization = require("../middleware/authorization");

const LaboranController = require("../controllers/laboranController");

// router.use(Authenticated);
// router.use(Authorization.verifyLaboran);
router.post("/:username", LaboranController.addLaboranByUsername);
router.get("/", LaboranController.getAllLaboran);
router.get("/:nip", LaboranController.getLaboranByNip);
router.put("/:nip", LaboranController.updateLaboranByNip);
router.delete("/:nip", LaboranController.deleteLaboranByNip);

module.exports = router;
