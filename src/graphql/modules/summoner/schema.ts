export const schema = `
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
