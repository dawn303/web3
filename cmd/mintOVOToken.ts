import { ethers } from "hardhat";

async function main() {
  const [owner] = await ethers.getSigners();

  console.log("account:", await owner.getAddress());
  console.log("Account balance: %s", await owner.getBalance());

  const Token = await ethers.getContractFactory("NyatheesOVO");

  const token = await Token.attach(
    "0xc47732f33dFfDb8325311c9B374e271f3e925544"
  );

  const ownerBalance = await token.balanceOf(owner.getAddress());
  console.log(
    "Account balance:%s,  token address: %s",
    ownerBalance,
    token.address
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
