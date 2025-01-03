const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
const { config } = require('dotenv');

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

module.exports = IocModule;