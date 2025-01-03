const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
const { config } = require('dotenv');

config()

const IocFactoryModule = buildModule("IocFactoryModule", (m) => {
  const oracleAddress = process.env.ORACLE_ADDRESS;

  if (!oracleAddress) {
    throw new Error("ORACLE_ADDRESS environment variable is required");
  }

  console.log(`Deploying with oracle address: ${oracleAddress}`);

  const iocFactory = m.contract("IocFactory", [oracleAddress]);

  return { iocFactory };
});

module.exports = IocFactoryModule;