export const schema = `
  type CurrentGame {
    gameId: Int!
    gameStartTime: DateTime!
    gameLength: Int!
    queue: QueueType
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
