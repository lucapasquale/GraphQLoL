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

const cache = {}

export default function(api: AxiosInstance) {
  return async (keys: Key[]) => {
    return Bluebird.map<Key, Summoner>(keys, async key => {
      if (key.name) {
        return getSummonerByName(api, key.name)
      }

      return getSummonerByAccountId(api, key.accountId)
    })
  }
}

async function getSummonerByName(api: AxiosInstance, name: string) {
  if (cache[name]) {
    return cache[name]
  }

  const { data } = await api.get(`summoner/v4/summoners/by-name/${name}`)
  cache[name] = data

  return data
}

async function getSummonerByAccountId(api: AxiosInstance, accountId: string) {
  if (cache[accountId]) {
    return cache[accountId]
  }

  const { data } = await api.get(
    `summoner/v4/summoners/by-account/${accountId}`
  )
  cache[accountId] = data

  return data
}
