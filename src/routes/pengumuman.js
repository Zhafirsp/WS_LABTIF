const express = require("express");
const router = express.Router();

const Authenticated = require("../middleware/authentication");
const uploadFile = require("../config/uploadFile");
const PengumumanController = require("../controllers/pengumumanController");
router.use(Authenticated);

router.post(
  "/",
  uploadFile.single("dokumen"),
  PengumumanController.addPengumuman
);
router.get("/", PengumumanController.getAllPengumuman);
router.get("/active", PengumumanController.getPengumumanActive);
router.get("/:id", PengumumanController.getPengumumanById);
router.put(
  "/:id",
  uploadFile.single("dokumen"),
  PengumumanController.updatePengumumanById
);
router.delete("/:id", PengumumanController.deletePengumumanById);

module.exports = router;
