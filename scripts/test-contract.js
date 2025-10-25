const hre = require("hardhat");

async function main() {
  const contractAddress = "0x91f38c15C6A91b937724Ac675245522290ca55B7";
  
  console.log("🔍 Testing LinkoProfile contract at:", contractAddress);
  console.log("=".repeat(60));
  
  // Get the contract
  const LinkoProfile = await hre.ethers.getContractAt("LinkoProfile", contractAddress);
  
  // Get signer
  const [signer] = await hre.ethers.getSigners();
  console.log("Testing with account:", signer.address);
  
  // Test 1: Check if contract exists
  console.log("\n✅ Contract exists and is accessible");
  
  // Test 2: Try to read profile (should return empty string if no profile)
  console.log("\n📖 Reading current profile...");
  const currentProfile = await LinkoProfile.getProfileCID(signer.address);
  console.log("Current profile CID:", currentProfile || "(empty)");
  
  // Test 3: Check if has profile
  const hasProfile = await LinkoProfile.hasProfile(signer.address);
  console.log("Has profile:", hasProfile);
  
  // Test 4: Try to set a test profile
  console.log("\n📝 Testing setProfileCID function...");
  const testCID = "QmTestCID123456789";
  
  try {
    console.log("Sending transaction to set CID:", testCID);
    const tx = await LinkoProfile.setProfileCID(testCID);
    console.log("Transaction hash:", tx.hash);
    console.log("Waiting for confirmation...");
    
    const receipt = await tx.wait();
    console.log("✅ Transaction confirmed in block:", receipt.blockNumber);
    console.log("Gas used:", receipt.gasUsed.toString());
    
    // Verify it was saved
    const savedCID = await LinkoProfile.getProfileCID(signer.address);
    console.log("Saved CID:", savedCID);
    
    if (savedCID === testCID) {
      console.log("\n🎉 SUCCESS! Contract is working perfectly!");
    } else {
      console.log("\n❌ ERROR: CID mismatch!");
    }
    
  } catch (error) {
    console.error("\n❌ ERROR setting profile:", error.message);
    if (error.data) {
      console.error("Error data:", error.data);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
