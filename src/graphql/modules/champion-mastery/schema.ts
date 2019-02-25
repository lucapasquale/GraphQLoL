export const schema = `
  type ChampionMastery {
    chestGranted: Boolean!
    championLevel: Int!
    championPoints: Int!
    championPointsSinceLastLevel: Int!
    championPointsUntilNextLevel: Int!
    championId: Int!
    champion: Champion!
    lastPlayTime: DateTime!
    tokenEarned: Int!
    summonerId: String!
  }

  extend type Summoner {
    championMastery: [ChampionMastery!]
  }
`
