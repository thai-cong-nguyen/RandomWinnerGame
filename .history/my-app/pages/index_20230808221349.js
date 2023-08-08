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
    if (needSigner) {
      const signer = await web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  };

  const startGame = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      const randomGameNFTContract = new Contract(
        RANDOM_GAME_NFT_CONTRACT_ADDRESS,
        abi,
        signer
      );
      setLoading(true);
      const tx = await randomGameNFTContract.startGame(maxPlayers, entryFee);
      await tx.wait();
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const joinGame = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      const randomGameNFTContract = new Contract(
        RANDOM_GAME_NFT_CONTRACT_ADDRESS,
        abi,
        signer
      );
      setLoading(true);
      const tx = await randomGameNFTContract.joinGame({ value: entryFee });
      await tx.wait();
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const checkIfGameStarted = async () => {
    try {
      const provider = await getProviderOrSigner();
      const randomGameNFTContract = new Contract(
        RANDOM_GAME_NFT_CONTRACT_ADDRESS,
        abi,
        provider
      );
      const _gameStarted = await randomGameNFTContract.gameStarted();
      const _gameArray = await subgraphQuery(FETCH_CREATED_NAME());
      const _game = _gameArray.games[0];
      let _logs = [];
      if (_gameStarted) {
        _logs = [`Game has started with ID: ${_game.id}`];
        if (_game.players && _game.players.length > 0) {
          _logs.push(
            `${_game.players.length} / ${_game.maxPlayers} already joined 👀 `
          );
          _game.players.forEach((player) => {
            _logs.push(`${player} joined 🏃‍♂️`);
          });
        }
        setEntryFee(BigNumber.from(_game.entryFee));
        setMaxPlayers(_game.maxPlayers);
      } else if (!gameStarted && _game.winner) {
        _logs = [
          `Last game has ended with ID: ${_game.id}`,
          `Winner is: ${_game.winner} 🎉 `,
          `Waiting for host to start new game....`,
        ];

        setWinner(_game.winner);
      }
      setLogs(_logs);
      setPlayers(_game.players);
      setGameStarted(_gameStarted);
      forceUpdate();
    } catch (error) {
      console.error(error);
    }
  };

  const getOwner = async () => {
    try {
      const provider = await getProviderOrSigner();
      const randomGameNFTContract = new Contract(
        RANDOM_GAME_NFT_CONTRACT_ADDRESS,
        abi,
        provider
      );
      const _owner = await randomGameNFTContract.owner();
      const signer = await getProviderOrSigner(true);
      const address = await signer.getAddress();
      if (address.toLowerCase() === _owner.toLowerCase()) {
        setIsOwner(true);
      }
    } catch (error) {
      console.error(error);
    }
  };
}
