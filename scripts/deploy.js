const hre = require("hardhat");

async function main() {
    const network = await hre.ethers.provider.getNetwork();
    const networkName = network.chainId === 137n ? "Polygon Mainnet" : 
                       network.chainId === 80002n ? "Polygon Amoy testnet" : 
                       `Unknown network (chainId: ${network.chainId})`;
    
    console.log(`Deploying LinkoProfile contract to ${networkName}...`);

    const signers = await hre.ethers.getSigners();
    console.log("Number of signers available:", signers.length);

    if (signers.length === 0) {
        throw new Error("No signers available. Check DEPLOYER_PRIVATE_KEY in .env.local");
    }

    const [deployer] = signers;
    console.log("Deploying with account:", deployer.address);

    const balance = await hre.ethers.provider.getBalance(deployer.address);
    console.log("Account balance:", hre.ethers.formatEther(balance), "MATIC");

    // Deploy the contract
    const LinkoProfile = await hre.ethers.getContractFactory("LinkoProfile");
    const linkoProfile = await LinkoProfile.deploy();

    await linkoProfile.waitForDeployment();

    const address = await linkoProfile.getAddress();
    console.log("LinkoProfile deployed to:", address);
    console.log("\n✅ Deployment successful!");
    console.log("\nNext steps:");
    console.log("1. Add this to your .env.local file:");
    console.log(`   NEXT_PUBLIC_CONTRACT_ADDRESS=${address}`);
    
    if (network.chainId === 137n) {
        console.log("\n2. Verify the contract on PolygonScan:");
        console.log(`   npx hardhat verify --network polygon ${address}`);
        console.log("\n3. View on PolygonScan:");
        console.log(`   https://polygonscan.com/address/${address}`);
    } else if (network.chainId === 80002n) {
        console.log("\n2. Verify the contract on PolygonScan:");
        console.log(`   npx hardhat verify --network polygonAmoy ${address}`);
        console.log("\n3. View on PolygonScan:");
        console.log(`   https://amoy.polygonscan.com/address/${address}`);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
