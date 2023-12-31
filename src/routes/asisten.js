const express = require("express");
const router = express.Router();

const Authenticated = require("../middleware/authentication");
const Authorization = require("../middleware/authorization");

const AsistenController = require("../controllers/asistenController");

// router.use(Authenticated);
// router.use(Authorization.verifyLaboran);

// Menampilkan data Asisten
router.get("/", AsistenController.getAllAslab);
router.get("/active", AsistenController.getAslabActive);
router.get("/:id", AsistenController.getAslabById);

// Mengelola data Asisten
router.put("/:id", AsistenController.updateAslabById);
router.delete("/:id", AsistenController.deleteAslabById);

module.exports = router;
