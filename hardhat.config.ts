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
    gas: 2000000, 
    gasPrice: 20000000000,
  },
 },
 etherscan: {
  apiKey: {
    sepolia: 'F8HVU3CJ6XK43C1Z2I76ZHAAZFRHIBW88T'
  }
}
};

export default config;
