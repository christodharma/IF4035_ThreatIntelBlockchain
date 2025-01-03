const multer = require("multer");
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ success: false, message: "File size exceeds 100 MB limit." });
    }
    return res.status(400).json({ success: false, message: `Multer error: ${err.message}` });
  }
  next(err);
};

module.exports = handleMulterError;
