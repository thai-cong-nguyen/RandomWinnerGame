export function FETCH_CREATED_NAME() {
  return `query {
        games(orderBy:id, orderDirection:desc, first: 1) {
            id
            maxPlayers
            entryFee
            winner
            players
        }
    }`;
}
