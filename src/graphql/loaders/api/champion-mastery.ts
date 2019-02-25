import { AxiosInstance } from 'axios'
import * as Bluebird from 'bluebird'

export type ChampionMastery = {
  chestGranted: boolean
  championLevel: number
  championPoints: number
  championPointsSinceLastLevel: number
  championPointsUntilNextLevel: number
  championId: number
  lastPlayTime: string
  tokenEarned: number
  summonerId: string
}

export default function(api: AxiosInstance) {
  return async (summonerIds: string[]) => {
    return Bluebird.map<string, ChampionMastery[]>(summonerIds, async key => {
      const { data } = await api.get(
        `champion-mastery/v4/champion-masteries/by-summoner/${key}`
      )

      return data
    })
  }
}
