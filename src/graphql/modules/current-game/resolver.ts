import { GqlCtx } from '../../../types'
import { Summoner } from '../../loaders/summoner'
import { CurrentGame, CurrentGameParticipant } from '../../loaders/current-game'

export const resolver = {
  Summoner: {
    currentGame: (obj: Summoner, __: any, ctx: GqlCtx) => {
      return ctx.loaders.currentGame.load(obj.id)
    },
  },

  CurrentGame: {
    gameStartTime: (obj: CurrentGame) => new Date(obj.gameStartTime),
  },

  CurrentGameParticipant: {
    summoner: (obj: CurrentGameParticipant, _: any, ctx: GqlCtx) => {
      return ctx.loaders.summoner.load({ name: obj.summonerName })
    },

    champion: (obj: CurrentGameParticipant, _: any, ctx: GqlCtx) => {
      return ctx.loaders.champion.load(obj.championId)
    },
  },
}
