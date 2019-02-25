export const schema = `
  type SummonerLeagues {
    solo: SummonerLeague
    flex: SummonerLeague
    tt: SummonerLeague
  }

  type SummonerLeague {
    queueType: String!
    position: String!
    tier: String!
    rank: String!
    wins: Int!
    losses: Int!
    leaguePoints: Int!
    hotStreak: Boolean!
    veteran: Boolean!
    freshBlood: Boolean!
    leagueId: String!
    leagueName: String!
    summonerId: String!
    summonerName: String!
    miniSeries: SummonerLeagueMiniSeries
  }

  type SummonerLeagueMiniSeries {
    progress: String
    losses: Int!
    wins: Int!
    target: Int!
  }

  extend type Summoner {
    leagues: SummonerLeagues!
  }
`
