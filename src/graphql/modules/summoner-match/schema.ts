import { paginated } from '../helpers'

export const schema = `
  ${paginated('SummonerMatch')}

  type SummonerMatch {
    gameId: Int!
    lane: String!
    champion: Champion!
    platformId: String!
    role: String!
    timestamp: DateTime!
    queue: QueueType
    season: SeasonType
    match: Match!
  }

  input SummonerMatchesFilter {
    champion: Int
    season: SeasonType
    queue: QueueType
    beginTime: DateTime
    endTime: DateTime
  }

  extend type Summoner {
    matches(offset: Int = 0, limit: Int = 10, filter: SummonerMatchesFilter): PaginatedSummonerMatch
  }
`
