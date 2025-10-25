import { ethers } from "hardhat";

async function main() {
  console.log("Deploying LinkoProfile contract to Base Sepolia...");

  const [deployer] = await ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", ethers.formatEther(balance), "ETH");

  // Deploy the contract
  const LinkoProfile = await ethers.getContractFactory("LinkoProfile");
  const linkoProfile = await LinkoProfile.deploy();

  await linkoProfile.waitForDeployment();

  const address = await linkoProfile.getAddress();
  console.log("LinkoProfile deployed to:", address);
  console.log("\n✅ Deployment successful!");
  console.log("\nNext steps:");
  console.log("1. Add this to your .env.local file:");
  console.log(`   NEXT_PUBLIC_CONTRACT_ADDRESS=${address}`);
  console.log("\n2. Verify the contract on BaseScan:");
  console.log(`   npx hardhat verify --network baseSepolia ${address}`);
  console.log("\n3. View on BaseScan:");
  console.log(`   https://sepolia.basescan.org/address/${address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
