const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;
const IV_LENGTH = 16;

exports.encrypt = async (fileBuffer) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(ENCRYPTION_KEY), iv);
  const encryptedBuffer = Buffer.concat([cipher.update(fileBuffer), cipher.final()]);
  return Buffer.concat([iv, encryptedBuffer]);
};

exports.decrypt = async (encryptedBuffer) => {
  const iv = encryptedBuffer.slice(0, 16);
  const encryptedData = encryptedBuffer.slice(16);
  const decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(ENCRYPTION_KEY), iv);
  const decryptedBuffer = Buffer.concat([decipher.update(encryptedData), decipher.final()]);
  return decryptedBuffer;
};


