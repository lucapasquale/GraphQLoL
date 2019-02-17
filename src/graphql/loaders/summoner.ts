import axios from 'axios'
import * as Bluebird from 'bluebird'

import config from '../../config'

export type Summoner = {
  id: string
  accountId: string
  puuid: string
  name: string
  profileIconId: number
  revisionDate: Date
  summonerLevel: number
}

export async function summoner(keys: string[]) {
  return Bluebird.map(keys, async key => {
    const { data } = await axios.get(
      `https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${key}`,
      {
        headers: { 'X-Riot-Token': config.LOL_KEY },
      }
    )

    return data
  })
}
