import { paginated } from '../helpers'

export const schema = `
  ${paginated('SummonerMatch')}

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

  input SummonerMatchesFilter {
    season: Int
    champion: Int
    queue: Int
    beginTime: DateTime
    endTime: DateTime
  }

  extend type Summoner {
    matches(offset: Int = 0, limit: Int = 10, filter: SummonerMatchesFilter): PaginatedSummonerMatch
  }
`
