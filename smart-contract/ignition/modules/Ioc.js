import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { config } from 'dotenv';

config()

const IocModule = buildModule("IocModule", (m) => {
  const oracleAddress = process.env.ORACLE_ADDRESS;

  if (!oracleAddress) {
    throw new Error("ORACLE_ADDRESS environment variable is required");
  }

  console.log(`Deploying with oracle address: ${oracleAddress}`);

  const ioc = m.contract("Ioc", [oracleAddress]);

  return { ioc };
});

export default IocModule;