import { AxiosInstance } from 'axios'
import * as Bluebird from 'bluebird'
import * as R from 'ramda'

export type SummonerMatch = {
  gameId: number
  lane: string
  champion: number
  platformId: string
  season: number
  queue: number
  role: string
  timestamp: string
}

type SummonerMatchKey = {
  accountId: string
  beginIndex?: number
  endIndex?: number
  season?: number
}
type AccountMatchesResponse = {
  matches: SummonerMatch[]
  totalGames: number
}

export default function(api: AxiosInstance) {
  return async (keys: SummonerMatchKey[]) => {
    return Bluebird.map<SummonerMatchKey, AccountMatchesResponse>(
      keys,
      async key => {
        const { data } = await api.get(
          `match/v4/matchlists/by-account/${key.accountId}`,
          {
            params: R.omit(['accountid'], key),
          }
        )

        return data
      }
    )
  }
}
