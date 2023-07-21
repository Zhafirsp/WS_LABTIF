const express = require("express");
const router = express.Router();

const ProgramController = require("../controllers/programController");

router.post("/", ProgramController.addProgram);
router.get("/", ProgramController.getAllProgram);
router.get("/:id", ProgramController.getProgramById);
router.put("/:id", ProgramController.updateProgramById);
router.delete("/:id", ProgramController.deleteProgramById);

module.exports = router;
