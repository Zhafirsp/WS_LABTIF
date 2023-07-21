const express = require("express");
const router = express.Router();

const AsistenController = require("../controllers/asistenController");

router.get("/", AsistenController.getAllAsisten);
router.get("/:id", AsistenController.getAsistenById);

module.exports = router;
