import { ethers } from "hardhat";

async function main() {
    // const bear = await ethers.getContractAt("FoamBear", "0xc2A3f439aAa5ae1eEff0a40A1CE2219235634603");
    // console.log(`FoamBear address: ${bear.target}`);

    // const tx = await bear.safeMint("0x59C49a300B4e82429ba83005e9e4Dab85Aa90412", 5);

    // await sleep(3);

    // const n = await bear.balanceOf("0x59C49a300B4e82429ba83005e9e4Dab85Aa90412");
    // console.log("==> ", n.valueOf());

    // const addr = await bear.ownerOf(5);
    // console.log("==> ", addr);

    const bear = await ethers.deployContract("FoamBear");

    console.log("deployed to %s", bear.target);
}

function sleep(seconds: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, seconds * 1000);
    });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
