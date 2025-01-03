const express = require("express");
const multer = require("multer");
const router = express.Router();
const { uploadFile, handlePurchase } = require("../controllers/ipfsController");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 100 * 1024 * 1024 },
});

router.post("/upload", upload.single("file"), uploadFile);
router.post("/purchase", handlePurchase);

module.exports = router;
