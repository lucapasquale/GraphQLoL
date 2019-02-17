import { paginated } from '../helpers'

export const schema = `
  ${paginated('Match')}

  type Match {
    gameId: Int!
    lane: String!
    champion: Int!
    platformId: String!
    season: Int!
    queue: Int!
    role: String!
    timestamp: String!
  }

  input SummonerMatchesFilter {
    beginIndex: Int
    endIndex: Int
  }

  extend type Summoner {
    matches(filter: SummonerMatchesFilter): PaginatedMatch
  }
`

export const query = `
  match(matchId: String!): Match
`
