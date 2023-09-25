const express = require("express");
const router = express.Router();

const Authenticated = require("../middleware/authentication");
const Authorization = require("../middleware/authorization");

const ProgramController = require("../controllers/programController");

// router.use(Authenticated);
// Menampilkan data program
router.get("/", ProgramController.getAllProgram);
router.get("/:id", ProgramController.getProgramById);

// router.use(Authorization.verifyLaboran);
// Mengelola data program
router.post("/", ProgramController.addProgram);
router.put("/:id", ProgramController.updateProgramById);
router.delete("/:id", ProgramController.deleteProgramById);

module.exports = router;
