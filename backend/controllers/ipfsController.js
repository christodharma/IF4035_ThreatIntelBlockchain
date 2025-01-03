import fs from "fs";
import encryptionService from "../services/encryptService.js";
import * as Signer from "@ucanto/principal/ed25519";
import {StoreMemory} from "@web3-storage/w3up-client/stores/memory";
import * as Client from "@web3-storage/w3up-client";
import * as Proof from '@web3-storage/w3up-client/proof'
import crypto from "crypto";


export async function initializeWeb3Client() {
  const principal = Signer.parse(process.env.W3_KEY)
  const store = new StoreMemory()
  const client = await Client.create({ principal, store })
  const proof = await Proof.parse(process.env.PROOF_KEY)
  const space = await client.addSpace(proof)
  await client.setCurrentSpace(space.did())
  return client
}

const generateFileHash = async (filePath) => {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash("sha256");
    const input = fs.createReadStream(filePath);

    input
      .on("data", (chunk) => hash.update(chunk))
      .on("end", () => resolve(hash.digest("hex")))
      .on("error", (err) => reject(err));
  });
};

export const uploadFile = async (req, res) => {
  try {
    let web3StorageClient = await initializeWeb3Client();
    const { originalname, path: filePath } = req.file;
    const hashedFileName = await generateFileHash(filePath);
    const encryptedFileBuffer = await encryptionService.encryptFileToBuffer(filePath);
    const file = new File([encryptedFileBuffer], `${hashedFileName}`, {
      type: req.file.mimetype,
    });
    const cid = await web3StorageClient.uploadFile(file);
    res.status(200).json({ cid: cid.toString() });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ success: false, message: 'File upload failed.' });
  }
};

export const handlePurchase = async (req, res) => {
  try {
    const { sampleId, buyerAddress } = req.body;
    const decryptedPath = await encryptionService.decryptFile(sampleId);
    const downloadLink = `http://......../uploads/${path.basename(decryptedPath)}`;
    res.status(200).json({ success: true, downloadLink });
  } catch (err) {
    console.error("Error handling purchase:", err);
    res.status(500).json({ success: false, message: "Purchase handling failed." });
  }
};

