import { AxiosInstance } from 'axios'
import * as Bluebird from 'bluebird'

type Key = {
  name?: string
  accountId?: string
}
export type Summoner = {
  id: string
  accountId: string
  puuid: string
  name: string
  profileIconId: number
  revisionDate: Date
  summonerLevel: number
}

export default function(api: AxiosInstance) {
  return async (keys: Key[]) => {
    return Bluebird.map<Key, Summoner>(keys, async key => {
      if (key.name) {
        const nameResponse = await api.get(
          `summoner/v4/summoners/by-name/${key.name}`
        )

        return nameResponse.data
      }

      const accountResponse = await api.get(
        `summoner/v4/summoners/by-account/${key.accountId}`
      )
      return accountResponse.data
    })
  }
}
