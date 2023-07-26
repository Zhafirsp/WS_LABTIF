const express = require("express");
const router = express.Router();

const Authenticated = require("../middleware/authentication");
const AsistenController = require("../controllers/asistenController");
const verifyLaboran = require("../middleware/verifyLaboran");

router.use(Authenticated);
router.use(verifyLaboran);
router.post("/:daftarID", AsistenController.addAslabByDaftarID);
router.get("/", AsistenController.getAllAslab);
router.get("/:id", AsistenController.getAslabById);
router.delete("/:id", AsistenController.deleteAslabByID);

module.exports = router;
