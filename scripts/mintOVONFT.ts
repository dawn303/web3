import { ethers } from "hardhat";
import { getMetadataByTokenId } from "./request";
import { NyatheesOVO } from "../typechain-types";
import configs from "../config.json";

async function main() {
    // Config
    const config = getMintConfig();
    if (config === undefined) {
        console.log("No such address needs mint");
        return;
    }

    // Minter
    const [minter, otherAccount] = await ethers.getSigners();
    console.log("Info: minter: %s, network: %s", minter.address, config.network);

    // Contract
    const token = await ethers.getContractAt("NyatheesOVO", config.tokenAddress);

    for (let target of config.list) {
        await sleep(10); // 暂停10秒，防止nonce too low等报错
        let tx;
        if (!config.onlyAttribute) {
            // Optional
            const addr = await getAddressByTokenId(token, target.tokenId);
            if (addr !== "") {
                console.log("Warning: %d already minted. At present holder is %s", target.tokenId, addr);
                continue;
            }

            // Minting
            tx = await token.safeMint(target.address, target.tokenId);
            console.log("Minting %d to %s", target.tokenId, target.address);
        }

        // Setting Rate
        const metadata = await getMetadataByTokenId(config.baseUrl, target.tokenId);
        console.log("Setting tokenId: ", target.tokenId);
        for (let attr of metadata.attributes) {
            switch (attr.trait_type) {
                case "level":
                    tx = await token.setLevel(target.tokenId, attr.value);
                    console.log("Set level to %d by transaction %s", attr.value, tx.hash);
                    break;
                case "Hash Rate":
                    tx = await token.setHashRate(target.tokenId, attr.value);
                    console.log("Set hashRate to %d by transaction %s", attr.value, tx.hash);
                    break;
                case "Bomb Rate":
                    tx = await token.setBombCardRate(target.tokenId, (attr.value as number) + 100);
                    console.log("Set bombRate to %d by transaction %s", (attr.value as number) + 100, tx.hash);
                    break;
                case "Vip Rate":
                    tx = await token.setVIPCardRate(target.tokenId, (attr.value as number) + 100);
                    console.log("Set vipRate to %d by transaction %s", (attr.value as number) + 100, tx.hash);
                    break;
                case "Boost Rate":
                    tx = await token.setBoostCardRate(target.tokenId, (attr.value as number) + 100);
                    console.log("Set boostRate to %d by transaction %s", (attr.value as number) + 100, tx.hash);
                    break;
            }
        }

        console.log(); // 给打印日志隔开一行
    }
}

function sleep(seconds: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, seconds * 1000);
    });
}

function getMintConfig() {
    for (let c of configs) {
        if (c.enabled) {
            return c;
        }
    }
}

function getAddressByTokenId(token: NyatheesOVO, tokenId: number) {
    return new Promise((resolve, reject) => {
        token
            .ownerOf(tokenId)
            .then((response) => {
                resolve(response);
            })
            .catch((reason) => {
                resolve("");
            });
    });
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
