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
    teams: [CurrentGameTeam!]!
  }

  type CurrentGameTeam {
    teamId: Int!
    participants: [CurrentGameParticipant!]!
    bans: [CurrentGameBan!]!
  }

  type CurrentGameBan {
    pickTurn: Int!
    champion: Champion
  }

  type CurrentGameParticipant {
    bot: Boolean!
    summoner: Summoner!
    champion: Champion!
    spell1: Spell!
    spell2: Spell!
  }

  extend type Summoner {
    currentGame: CurrentGame
  }
`
