const { ethers } = require("hardhat");
require("dotenv").config({ path: ".env" });
const {
  FEE,
  VRF_COORDINATION,
  LINK_TOKEN,
  KEY_HASH,
} = require("../constants/index");
