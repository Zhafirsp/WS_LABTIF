const express = require("express");
const router = express.Router();

const AsistenController = require("../controllers/asistenController");

router.post("/:daftarID", AsistenController.addAslabByDaftarID);
router.get("/", AsistenController.getAllAslab);
router.get("/:id", AsistenController.getAslabById);
router.delete("/:id", AsistenController.deleteAslabByID);

module.exports = router;
