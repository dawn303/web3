import { ethers } from "hardhat";

async function main() {
  const accounts = await ethers.getSigners();

  for (let i in accounts) {
    console.log(`account: ${accounts[i].address}`);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
