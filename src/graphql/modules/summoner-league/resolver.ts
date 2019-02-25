import * as R from 'ramda'

import { GqlCtx } from '../../../types'
import { Summoner } from '../../loaders/api/summoner'

export const resolver = {
  Summoner: {
    leagues: async (obj: Summoner, _: any, ctx: GqlCtx) => {
      const leagues = await ctx.apiLoaders.league.load(obj.id)

      return {
        solo: leagues.find(R.propEq('queueType', 'RANKED_SOLO_5x5')),
        flex: leagues.find(R.propEq('queueType', 'RANKED_FLEX_SR')),
        tt: leagues.find(R.propEq('queueType', 'RANKED_FLEX_TT')),
      }
    },
  },
}
