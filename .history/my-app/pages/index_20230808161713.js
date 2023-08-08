import { BigNumber, Contract, ethers, providers, utils } from "ethers";
import Head from "next/head";
import React, { useEffect, useState, useRef } from "react";
import Web3Modal from "web3modal";
import { abi, RANDOM_GAME_NFT_CONTRACT_ADDRESS } from "../constants";
