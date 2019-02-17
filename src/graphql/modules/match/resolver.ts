import { GqlCtx } from '../../../types'
import { Summoner } from '../../loaders/summoner'

type SummonerMatchesParams = {
  filter: {
    beginIndex: number
    endIndex: number
  }
}

export const resolver = {
  Summoner: {
    matches,
  },
}

async function matches(
  obj: Summoner,
  { filter }: SummonerMatchesParams,
  ctx: GqlCtx
) {
  const accountMatches = await ctx.loaders.accountMatches(obj.accountId, filter)
  return {
    totalCount: accountMatches.totalGames,
    nodes: accountMatches.matches,
  }
}
