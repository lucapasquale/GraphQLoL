import { GqlCtx } from '../../../types'
import { parseSeason } from '../helpers'
import { Summoner } from '../../loaders/api/summoner'

import { SummonerMatch } from '../../loaders/api/summoner-match'

type SummonerMatchesParams = {
  offset: number
  limit: number
  filter: {
    season: number
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
        offset: params.offset,
        limit: params.limit,
        ...params.filter,
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

    champion: (obj: SummonerMatch, _: any, ctx: GqlCtx) => {
      return ctx.dataLoaders.champion.load(obj.champion)
    },

    season: (obj: SummonerMatch) => parseSeason(obj.season),
  },
}
