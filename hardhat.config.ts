import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-verify";
import "@nomicfoundation/hardhat-ethers";
import { HardhatUserConfig } from "hardhat/config";
import * as dotenv from "dotenv";

// Load .env.local explicitly
dotenv.config({ path: "./.env.local" });

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.19", // Downgraded from 0.8.20 for better compatibility
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    polygonAmoy: {
      url: process.env.POLYGON_AMOY_RPC_URL || "https://rpc-amoy.polygon.technology",
      accounts: process.env.DEPLOYER_PRIVATE_KEY ?
        [process.env.DEPLOYER_PRIVATE_KEY.startsWith('0x') ?
          process.env.DEPLOYER_PRIVATE_KEY :
          `0x${process.env.DEPLOYER_PRIVATE_KEY}`] :
        [],
      chainId: 80002,
    },
    polygon: {
      url: process.env.POLYGON_RPC_URL || "https://polygon-rpc.com",
      accounts: process.env.DEPLOYER_PRIVATE_KEY ?
        [process.env.DEPLOYER_PRIVATE_KEY.startsWith('0x') ?
          process.env.DEPLOYER_PRIVATE_KEY :
          `0x${process.env.DEPLOYER_PRIVATE_KEY}`] :
        [],
      chainId: 137,
    },
  },
  etherscan: {
    apiKey: {
      polygonAmoy: process.env.POLYGONSCAN_API_KEY || "",
      polygon: process.env.POLYGONSCAN_API_KEY || "",
    },
    customChains: [
      {
        network: "polygonAmoy",
        chainId: 80002,
        urls: {
          apiURL: "https://api-amoy.polygonscan.com/api",
          browserURL: "https://amoy.polygonscan.com",
        },
      },
      {
        network: "polygon",
        chainId: 137,
        urls: {
          apiURL: "https://api.polygonscan.com/api",
          browserURL: "https://polygonscan.com",
        },
      },
    ],
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
};

export default config;
