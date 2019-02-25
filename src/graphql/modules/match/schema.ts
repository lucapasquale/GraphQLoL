export const schema = `
  type Match {
    gameId: Int!
    platformId: String!
    gameCreation: DateTime!
    gameDuration: Int!
    queueId: Int!
    mapId: Int!
    season: Season!
    gameVersion: String!
    gameMode: String!
    gameType: String!
    teams: [MatchTeam!]!
  }

  type MatchTeam {
    teamId: Int!
    win: String!
    bans: [MatchTeamBan!]!
    participants: [MatchParticipant!]!
  }

  type MatchTeamBan {
    pickTurn: Int!
    champion: Champion
  }

  type MatchParticipant {
    participantId: Int!
    teamId: Int!
    spell1: Spell!
    spell2: Spell!
    champion: Champion!
    summoner: Summoner!
  }
`

export const query = `
  match(matchId: ID!): Match
`
