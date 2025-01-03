import { ethers } from "hardhat";
import axios from "axios";
import { config } from "dotenv";

config()

import Oracle from "./artifacts/contracts/Oracle.sol/Oracle.json";

async function isMalware(hash: string): Promise<boolean> {
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
}

async function main() {
    const [dataProvider] = await ethers.getSigners();
    const oracleAddress = process.env.ORACLE_ADDRESS;
    if (!oracleAddress) {
        throw new Error("Oracle address not set");
    }

    const verificationOracle = new ethers.Contract(oracleAddress, Oracle.abi, dataProvider);

    verificationOracle.on("Request", async (requestId, hash) => {
        const result = await isMalware(hash);
        const responseCallbackTx = await verificationOracle.responseCallback(requestId, result);
        await responseCallbackTx.wait();
    });

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
