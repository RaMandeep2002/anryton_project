import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
// const { API_URL, PRIVATE_KEY, ETHERSCAN_API_KEY } = process.env;

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks:{
  sepolia: {
    url: process.env.API_URL,
    accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    allowUnlimitedContractSize: true,
    gas: 2000000, 
    gasPrice: 20000000000,
  },
},
 etherscan: {
  apiKey: {
    sepolia: 'you api key'
  }
},
sourcify: {
  // Disabled by default
  // Doesn't need an API key
  enabled: true
}

};

export default config;
