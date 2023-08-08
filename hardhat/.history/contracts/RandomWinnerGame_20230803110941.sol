// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";

contract RandomWinnerGame is Ownable, VRFConsumerBase {
    uint256 public fee;
    uint256 public keyHash;

    address[] public players;
}
