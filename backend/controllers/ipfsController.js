import encryptionService from "../services/encryptService.js";
import * as Signer from "@ucanto/principal/ed25519";
import {StoreMemory} from "@web3-storage/w3up-client/stores/memory";
import * as Client from "@web3-storage/w3up-client";
import * as Proof from '@web3-storage/w3up-client/proof'
import crypto from "crypto";
import axios from "axios";

export async function initializeWeb3Client() {
  const principal = Signer.parse(process.env.W3_KEY)
  const store = new StoreMemory()
  const client = await Client.create({ principal, store })
  const proof = await Proof.parse(process.env.PROOF_KEY)
  const space = await client.addSpace(proof)
  await client.setCurrentSpace(space.did())
  return client
}

const generateFileHash = (fileBuffer) => {
  return crypto.createHash("sha256").update(fileBuffer).digest("hex");
};

export const uploadFile = async (req, res) => {
  try {
    let web3StorageClient = await initializeWeb3Client();
    const { buffer, mimetype } = req.file;
    const hashedFileName = generateFileHash(buffer);
    const encryptedFileBuffer = await encryptionService.encryptFileToBuffer(buffer);
    const file = new File([encryptedFileBuffer], `${hashedFileName}`, {
      type: mimetype,
    });
    const cid = await web3StorageClient.uploadFile(file);
    res.status(200).json({ cid: cid.toString() });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ success: false, message: "File upload failed." });
  }
};

export const handleDownload = async (req, res) => {
  const { cid } = req.query;

  if (!cid) {
    return res.status(400).json({ success: false, message: "CID is required" });
  }

  try {
    const url = `https://${cid}.ipfs.w3s.link`;
    const response = await axios.get(url, { responseType: "arraybuffer" });
    const fileBuffer = Buffer.from(response.data);
    const decryptedFileBuffer = await encryptionService.decryptFileBuffer(fileBuffer);
    const hash = generateFileHash(decryptedFileBuffer);
    const contentType = response.headers["content-type"] || "application/octet-stream";
    res.set({
      "Content-Type": contentType,
      "Content-Disposition": `attachment; filename="${hash}"`,
    });

    res.send(decryptedFileBuffer);
  } catch (error) {
    console.error("Error fetching file from IPFS:", error.message);
    res.status(500).json({ success: false, message: "Failed to download file" });
  }
};



