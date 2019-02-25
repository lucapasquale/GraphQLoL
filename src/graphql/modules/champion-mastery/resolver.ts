import { GqlCtx } from '../../../types'
import { Summoner } from '../../loaders/api/summoner'
import { ChampionMastery } from '../../loaders/api/champion-mastery'

export const resolver = {
  Summoner: {
    championMastery: (obj: Summoner, _: any, ctx: GqlCtx) => {
      return ctx.apiLoaders.championMastery.load(obj.id)
    },
  },

  ChampionMastery: {
    lastPlayTime: (obj: ChampionMastery) =>
      obj.lastPlayTime && new Date(obj.lastPlayTime),

    champion: (obj: ChampionMastery, _: any, ctx: GqlCtx) => {
      return ctx.dataLoaders.champion.load(obj.championId)
    },
  },
}
