import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-waffle";
import "hardhat-deploy";
import 'dotenv/config';

const ALCHEMY_APIKEY = process.env.ALCHEMY_APIKEY
const PRIVATE_KEY = process.env.PRIVATE_KEY

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
    },
    goerli: {
      url: `https://eth-goerli.g.alchemy.com/v2/${ALCHEMY_APIKEY}`,
      accounts: [`${PRIVATE_KEY}`]
    }
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 40000
  }
};

export default config;
