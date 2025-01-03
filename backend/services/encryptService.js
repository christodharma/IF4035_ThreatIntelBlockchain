const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;
const IV_LENGTH = 16;

exports.encryptFileToBuffer = async (filePath) => {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(ENCRYPTION_KEY), iv);
  const input = fs.createReadStream(filePath);
  const chunks = [];
  return new Promise((resolve, reject) => {
    input
      .pipe(cipher)
      .on("data", (chunk) => chunks.push(chunk))
      .on("end", () => resolve(Buffer.concat([iv, ...chunks])))
      .on("error", (err) => reject(err));
  });
};
