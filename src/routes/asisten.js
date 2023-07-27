const express = require("express");
const router = express.Router();

const Authenticated = require("../middleware/authentication");
const Authorization = require("../middleware/authorization");
const AsistenController = require("../controllers/asistenController");

router.use(Authenticated);
router.use(Authorization.verifyLaboran);
router.post("/:daftarID", AsistenController.addAslabByDaftarID);
router.get("/", AsistenController.getAllAslab);
router.get("/:id", AsistenController.getAslabById);
router.put("/:id", AsistenController.updateAslabByID);
router.delete("/:id", AsistenController.deleteAslabByID);

module.exports = router;
