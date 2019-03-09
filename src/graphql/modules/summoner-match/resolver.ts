import { GqlCtx } from '../../../types'
import {
  parseSeasonId,
  parseSeasonName,
  parseQueueName,
  parseQueueId,
} from '../helpers'
import { Summoner } from '../../loaders/api/summoner'

import { SummonerMatch } from '../../loaders/api/summoner-match'

type SummonerMatchesParams = {
  offset: number
  limit: number
  filter: {
    champion?: number
    season?: string
    queue?: string
    beginTime?: Date
    endTime?: Date
  }
}

export const resolver = {
  Summoner: {
    matches: async (
      obj: Summoner,
      params: SummonerMatchesParams,
      ctx: GqlCtx
    ) => {
      const accountMatches = await ctx.apiLoaders.summonerMatch.load({
        accountId: obj.accountId,
        ...parseMatchesKey(params),
      })

      return {
        totalCount: accountMatches.totalGames,
        nodes: accountMatches.matches,
      }
    },
  },

  SummonerMatch: {
    match: (obj: SummonerMatch, _: any, ctx: GqlCtx) => {
      return ctx.apiLoaders.match.load(obj.gameId)
    },

    timestamp: (obj: SummonerMatch) => new Date(obj.timestamp),
    season: (obj: SummonerMatch) => parseSeasonId(obj.season),
    queue: (obj: SummonerMatch) => parseQueueId(obj.queue),

    champion: (obj: SummonerMatch, _: any, ctx: GqlCtx) => {
      return ctx.dataLoaders.champion.load(obj.champion)
    },
  },
}

function parseMatchesKey({ offset, limit, filter }: SummonerMatchesParams) {
  return {
    offset,
    limit,
    season: parseSeasonName(filter.season),
    queue: parseQueueName(filter.queue),
    beginTime: filter.beginTime && new Date(filter.beginTime).getTime(),
    endTime: filter.endTime && new Date(filter.endTime).getTime(),
  }
}
