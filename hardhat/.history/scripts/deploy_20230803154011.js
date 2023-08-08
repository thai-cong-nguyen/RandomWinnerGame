const { ethers } = require("hardhat");
require("dotenv").config({ path: ".env" });
const {
  FEE,
  VRF_COORDINATION,
  LINK_TOKEN,
  KEY_HASH,
} = require("../constants/index");

async function main() {}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
