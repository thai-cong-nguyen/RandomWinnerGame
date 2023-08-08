const hardhat = require("hardhat");
require("dotenv").config({ path: "../.env" });
const {
  FEE,
  VRF_COORDINATION,
  LINK_TOKEN,
  KEY_HASH,
} = require("../constants/index");

async function main() {
  const randomWinnerGame = await hardhat.ethers.deployContract(
    "RandomWinnerGame",
    [VRF_COORDINATION, LINK_TOKEN, KEY_HASH, FEE]
  );
  await randomWinnerGame.waitForDeployment();
  console.log("Verify Contract Address: ", randomWinnerGame.target);
  console.log("Slepping...");
  await sleep(20000);
  await hardhat.run("verify:verify", {
    address: randomWinnerGame.target,
    constructorArguments: [VRF_COORDINATION, LINK_TOKEN, KEY_HASH, FEE],
  });
}

function sleep(ms) {
  return new Promise((resolve, reject) => setTimeout(resolve, ms));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
