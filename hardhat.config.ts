import { HardhatUserConfig, vars, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-foundry";

const MNEMONIC = vars.get("MNEMONIC");
const ANKR_APIKEY = vars.get("ANKR_APIKEY");

const config: HardhatUserConfig = {
    defaultNetwork: "bsctest",
    networks: {
        hardhat: {},
        bsctest: {
            url: `https://rpc.ankr.com/bsc_testnet_chapel/${ANKR_APIKEY}`,
            accounts: {
                mnemonic: MNEMONIC,
                path: "m/44'/60'/0'/0",
                initialIndex: 0,
                count: 10,
                passphrase: "",
            },
        },
    },
    solidity: {
        version: "0.8.18",
        settings: {
            optimizer: {
                enabled: true,
                runs: 200,
            },
        },
    },
    paths: {
        sources: "./contracts",
        tests: "./test",
        cache: "./cache",
        artifacts: "./artifacts",
    },
    mocha: {
        timeout: 40000,
    },
};

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners();

    for (const account of accounts) {
        console.log(account.address);
    }
});

export default config;
