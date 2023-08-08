require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: "env" });
/** @type import('hardhat/config').HardhatUserConfig */
const QUICKNODE_HTTP_URL = process.env.QUICKNODE_HTTP_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const POLYGONSCAN_KEY = process.env.POLYGONSCAN_KEY;
module.exports = {
  solidity: "0.8.19",
};
