import { paginated } from '../helpers'

export const schema = `
  ${paginated('SummonerMatch')}

  type Match {
    gameId: Int!
    platformId: String!
    gameCreation: String!
    gameDuration: Int!
    queueId: Int!
    mapId: Int!
    seasonId: Int!
    gameVersion: String!
    gameMode: String!
    gameType: String!
    teams: [MatchTeam!]
    participants: [Participant!]
  }

  type MatchTeam {
    teamId: Int!
    winner: Boolean!
    bans: [MatchTeamBan!]!
  }
  type MatchTeamBan {
    pickTurn: Int!
    championId: Int!
    champion: Champion
  }

  type Participant {
    participantId: Int!
    teamId: Int!
    championId: Int!
    champion: Champion!
    summoner: Summoner
  }

  type Season {
    id: Int!
    name: String
  }

  type SummonerMatch {
    gameId: Int!
    lane: String!
    champion: Champion!
    platformId: String!
    queue: Int!
    role: String!
    timestamp: String!
    season: Season!
  }

  input SummonerMatchesFilter {
    beginIndex: Int
    endIndex: Int
    season: Int
  }

  extend type Summoner {
    matches(filter: SummonerMatchesFilter): PaginatedSummonerMatch
  }
`

export const query = `
  match(matchId: ID!): Match
`
