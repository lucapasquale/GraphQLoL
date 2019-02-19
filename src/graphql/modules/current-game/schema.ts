export const schema = `
  type CurrentGame {
    gameId: Int!
    gameStartTime: DateTime!
    platformId: String
    gameMode: String
    mapId: Int!
    gameType: String
    gameLength: Int!
    gameQueueConfigId: Int!
  }

  extend type Summoner {
    currentGame: CurrentGame
  }
`
