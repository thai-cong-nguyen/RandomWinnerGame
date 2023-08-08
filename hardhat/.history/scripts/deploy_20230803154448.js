const hardhat = require("hardhat");
require("dotenv").config({ path: ".env" });
const {
  FEE,
  VRF_COORDINATION,
  LINK_TOKEN,
  KEY_HASH,
} = require("../constants/index");

async function main() {
  const randomWinnerGame = await ethers.deployContract("RandomWinnerGame", [
    VRF_COORDINATION,
    LINK_TOKEN,
    KEY_HASH,
    FEE,
  ]);
  await randomWinnerGame.waitForDeployment();
  console.log("Verify Contract Address: ", randomWinnerGame.target);
  console.log("Slepping...")
  await sleep(3000);
  await 
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
