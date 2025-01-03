import { ethers } from "hardhat";
import axios from "axios";
import { config } from "dotenv";

config()

import Oracle from "./artifacts/contracts/Oracle.sol/Oracle.json";

async function isMalware(hash: string): Promise<boolean> {
    try {
        const resp = await axios({
            method: "GET",
            url: `https://www.virustotal.com/api/v3/files/${hash}`,
            headers: {
                "x-apikey": process.env.VIRUSTOTAL_API_KEY
            }
        })
        if (resp.status == 200) {
            return resp.data.data.attributes.last_analysis_stats.malicious >= 10;
        } else {
            return false;
        }
    } catch (_) {
        return false;
    }
}

async function main() {
    const [owner] = await ethers.getSigners();
    const oracleAddress = process.env.ORACLE_ADDRESS;
    if (!oracleAddress) {
        throw new Error("Oracle address not set");
    }

    const verificationOracle = new ethers.Contract(oracleAddress, Oracle.abi, owner);

    verificationOracle.on("Request", async (requestId, hash) => {
        console.log(`Received Request event: requestId=${requestId}, hash=${hash}`);
        const result = await isMalware(hash);
        await verificationOracle.responseCallback(requestId, result);
    });

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
