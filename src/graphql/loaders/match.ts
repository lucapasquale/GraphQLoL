import axios from 'axios'
import * as Bluebird from 'bluebird'

import config from '../../config'

export type Match = {
  gameId: number
  lane: string
  champion: number
  platformId: string
  season: number
  queue: number
  role: string
  timestamp: string
}

export async function match(matchIds: string[]): Promise<Match[]> {
  return Bluebird.map(matchIds, async matchId => {
    const { data } = await axios.get(
      `https://br1.api.riotgames.com/lol/match/v4/matches/${matchId}`,
      {
        headers: { 'X-Riot-Token': config.LOL_KEY },
      }
    )

    return data as any
  })
}

type AccountMatchesFilter = {
  beginIndex?: number
  endIndex?: number
}
type AccountMatchesResponse = {
  matches: Match[]
  totalGames: number
}

export async function accountMatches(
  accountId: string,
  filter?: AccountMatchesFilter
) {
  const { data } = await axios.get(
    `https://br1.api.riotgames.com/lol/match/v4/matchlists/by-account/${accountId}`,
    {
      headers: { 'X-Riot-Token': config.LOL_KEY },
      params: {
        beginIndex: filter && filter.beginIndex,
        endIndex: filter && filter.endIndex,
      },
    }
  )

  return data as AccountMatchesResponse
}
