require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig*/
module.exports = {
  solidity: "0.8.28",
  networks: {
    localhost: {
      url: "http://127.0.0.1:57062",
      // Hardcoded externally owned accounts (EOAs) using account from 
      // https://github.com/ethpandaops/ethereum-package/blob/main/src/prelaunch_data_generator/genesis_constants/genesis_constants.star 
      // this account will pay the gas fees for deploying the smart contract
      accounts: ["5288e2f440c7f0cb61a9be8afdeb4295f786383f96f5e35eb0c94ef103996b64"],
    }
  }
};
