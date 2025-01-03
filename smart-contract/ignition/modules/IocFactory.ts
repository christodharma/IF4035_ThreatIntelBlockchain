import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { config } from 'dotenv';

config()

const IocFactoryModule = buildModule("IocFactoryModule", (m) => {
    const oracleAddress = process.env.ORACLE_ADDRESS;

    if (!oracleAddress) {
        throw new Error("Oracle address not set");
    }

    console.log("Oracle Address:", oracleAddress);

    const iocFactory = m.contract("IocFactory", [oracleAddress]);

    return { iocFactory };
});

export default IocFactoryModule;
