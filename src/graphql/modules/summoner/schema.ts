export const schema = `
  scalar DateTime

  type Summoner {
    id: String!
    accountId: String!
    puuid: String!
    name: String!
    profileIconId: Int!
    revisionDate: String
    summonerLevel: Int!
  }
`

export const query = `
  summoner(name: String): Summoner
`
