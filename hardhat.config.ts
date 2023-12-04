import { HardhatUserConfig, task, vars } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const ANKR_APIKEY = vars.get("ANKR_APIKEY");
const MNEMONIC = vars.get("MNEMONIC");
const PASSPHRASE = vars.get("PASSPHRASE", "");

const config: HardhatUserConfig = {
    defaultNetwork: "hardhat", // default value is "hardhat"
    networks: {
        hardhat: {},
        bsctest: {
            url: `https://rpc.ankr.com/bsc_testnet_chapel/${ANKR_APIKEY}`,
            chainId: 97,
            // from: "", // Default sender. If not present the first account of the node is used.
            // gas: "auto", // Its value should be "auto" or a number.
            // gasPrice: "auto", // Its value should be "auto" or a number.
            // gasMultiplier: 1, // A number used to multiply the results of gas estimation to give it some slack due to the uncertainty of the estimation process. Default value: 1.
            accounts: {
                mnemonic: MNEMONIC,
                path: "m/44'/60'/1'/0",
                initialIndex: 1,
                count: 5,
                passphrase: PASSPHRASE,
            }, // "remote" or an array of hex-encoded private keys or an HD Wallet.
            // httpHeaders: undefined, // set extra HTTP Headers to be used when making JSON-RPC requests. Default value: undefined.
            // timeout: 20000, // Timeout in ms for requests sent to the JSON-RPC server. Default value: 40000 for the localhost network, 20000 for the rest.
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
