import { GqlCtx } from '../../../types'
import { Summoner } from '../../loaders/api/summoner'
import {
  CurrentGame,
  CurrentGameParticipant,
} from '../../loaders/api/current-game'

export const resolver = {
  Summoner: {
    currentGame: (obj: Summoner, __: any, ctx: GqlCtx) => {
      return ctx.apiLoaders.currentGame.load(obj.id)
    },
  },

  CurrentGame: {
    gameStartTime: (obj: CurrentGame) =>
      obj.gameStartTime && new Date(obj.gameStartTime),
  },

  CurrentGameParticipant: {
    summoner: (obj: CurrentGameParticipant, _: any, ctx: GqlCtx) => {
      return ctx.apiLoaders.summoner.load({ name: obj.summonerName })
    },

    champion: (obj: CurrentGameParticipant, _: any, ctx: GqlCtx) => {
      return ctx.dataLoaders.champion.load(obj.championId)
    },
  },
}
