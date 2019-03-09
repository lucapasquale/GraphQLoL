export const schema = `
  scalar DateTime

  type Champion {
    id: String!
    key: Int!
    name: String!
    title: String!
  }

  type Spell {
    key: String!
    name: String!
  }

  enum QueueType {
    CUSTOM
    DRAFT_5V5
    RANKED_SOLO_5V5
    BLIND_5V5
    RANKED_FLEX_5V5
    ARAM
    BLIND_3V3
    RANKED_3V3
  }

  enum SeasonType {
    PRESEASON_3
    SEASON_3
    PRESEASON_2014
    SEASON_2014
    PRESEASON_2015
    SEASON_2015
    PRESEASON_2016
    SEASON_2016
    PRESEASON_2017
    SEASON_2017
    PRESEASON_2018
    SEASON_2018
    PRESEASON_2019
    SEASON_2019
  }
`
