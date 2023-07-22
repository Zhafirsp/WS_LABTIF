const express = require("express");
const router = express.Router();
const SevimaController = require("../controllers/sevimaController");

router.post("/update-all-data", SevimaController.updateAllDataFromSevima);

module.exports = router;
