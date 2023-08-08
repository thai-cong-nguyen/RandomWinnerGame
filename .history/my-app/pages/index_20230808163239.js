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
  const forceUpdate = React.useReducer(() => ({}), {})[1];

  const connectWallet = async () => {
    try {
      await getProviderOrSigner();
      setWalletConnected(true);
    } catch (error) {
      console.error(error);
    }
  };

  const getProviderOrSigner = async (needSigner = false) => {
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);

    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 80001) {
      window.alert("Change the network to Mumbai");
      throw new Error("Change the network to Mumbai");
    }
  };
}
