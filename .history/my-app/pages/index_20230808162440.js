import { BigNumber, Contract, ethers, providers, utils } from "ethers";
import Head from "next/head";
import React, { useEffect, useState, useRef } from "react";
import Web3Modal from "web3modal";
import { abi, RANDOM_GAME_NFT_CONTRACT_ADDRESS } from "../constants";
import { FETCH_CREATED_NAME } from "@/queries";
import styles from "@/styles/Home.module.css";
import { subgraphQuery } from "@/utils";

export default function Home() {
  const zero = BigNumber.from("0");
  const [walletConnected, setWalletConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [entryFee, setEntryFee] = useState(zero);
  const [maxPlayers, setMaxPlayers] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [player, setPlayer] = useState([]);
  const [winner, setWinner] = useState();
  const [logs, setLogs] = useState([]);
  
  const web3ModalRef = useRef();
  const forceUpdate = React.useReducer(https://snapshot.org/#/etherscoredao.eth/proposal/0xf826b191370b606016d3b4fc7703ab84722fc57c254780805447d8b6442b18ce)
}
