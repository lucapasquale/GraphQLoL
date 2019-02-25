import { AxiosInstance } from 'axios'
import * as Bluebird from 'bluebird'

export type LeaguePosition = {
  queueType: 'RANKED_SOLO_5x5' | 'RANKED_FLEX_SR' | 'RANKED_FLEX_TT'
  position: 'APEX' | 'TOP' | 'JUNGLE' | 'MIDDLE' | 'BOTTOM' | 'UTILITY' | 'NONE'
  tier:
    | 'IRON'
    | 'BRONZE'
    | 'SILVER'
    | 'GOLD'
    | 'PLATINUM'
    | 'DIAMOND'
    | 'MASTER'
    | 'GRANDMASTER'
    | 'CHALLENGER'
  rank: 'IV' | 'III' | 'II' | 'I'
  wins: number
  losses: number
  leaguePoints: number
  miniSeries: MiniSeries
  hotStreak: boolean
  veteran: boolean
  freshBlood: boolean
  leagueId: string
  leagueName: string
  summonerId: string
  summonerName: string
}

type MiniSeries = {
  progress: string
  losses: number
  wins: number
  target: number
}

export default function(api: AxiosInstance) {
  return async (summonerIds: string[]) => {
    return Bluebird.map<string, LeaguePosition[]>(summonerIds, async key => {
      const { data } = await api.get(`league/v4/positions/by-summoner/${key}`)

      return data
    })
  }
}
