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
    participants: [CurrentGameParticipant!]!
  }

  type CurrentGameParticipant {
    bot: Boolean!
    teamId: Int!
    summonerId: String!
    summonerName: String!
    summoner: Summoner!
    profileIconId: Int!
    championId: Int!
    champion: Champion!
    spell2Id: Int!
    spell1Id: Int!
  }

  extend type Summoner {
    currentGame: CurrentGame
  }
`
