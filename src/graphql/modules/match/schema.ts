import { paginated } from '../helpers'

export const schema = `
  ${paginated('SummonerMatch')}

  type Match {
    gameId: Int!
    platformId: String!
    gameCreation: DateTime!
    gameDuration: Int!
    queueId: Int!
    mapId: Int!
    seasonId: Int!
    gameVersion: String!
    gameMode: String!
    gameType: String!
    teams: [MatchTeam!]!
    participants: [Participant!]!
  }

  type MatchTeam {
    teamId: Int!
    win: String!
    bans: [MatchTeamBan!]!
  }
  type MatchTeamBan {
    pickTurn: Int!
    champion: Champion
  }

  type Participant {
    participantId: Int!
    teamId: Int!
    spell1Id: Int!
    spell1: Spell!
    champion: Champion!
    summoner: Summoner!
  }

  type SummonerMatch {
    gameId: Int!
    lane: String!
    champion: Champion!
    platformId: String!
    queue: Int!
    role: String!
    timestamp: DateTime!
    match: Match!
    season: Season!
  }
  type Season {
    id: Int!
    name: String
  }

  input SummonerMatchesFilter {
    season: Int
  }

  extend type Summoner {
    matches(offset: Int = 0, limit: Int = 10, filter: SummonerMatchesFilter): PaginatedSummonerMatch
  }
`

export const query = `
  match(matchId: ID!): Match
`
