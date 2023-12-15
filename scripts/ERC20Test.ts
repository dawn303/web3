import { ethers } from "hardhat";

async function main() {
    const [signer] = await ethers.getSigners();
    console.log("signer: ", signer.address);

    console.log("Ether: ", ethers.parseEther("0.1").toString());

    // 300 00 0000 0000 0000 0000 n
    // 10 0000 0000 0000 0000 n

    // const erc20 = await ethers.deployContract("ERC20Test");
}

main().catch((error) => {
    console.log(error);
    process.exitCode = 1;
});
