import {BigInt} from "@graphprotocol/graph-ts";
import {
  PlayerJoined,
  GameEnded,
  GameStarted,
  OwnershipTransferred,
} from "./../generated/RandomWinnerGame/RandomWinnerGame";
import {Game} from "./../generated/schema";

export function handleGameEnded(event: GameEnded): void {
  let entity = Game.load(event.params.gameId.toString());
  if (!entity) {
    return;
  }

  entity.winner = event.params.winner;
  entity.requestId = event.params.requestId;
  entity.save();
}