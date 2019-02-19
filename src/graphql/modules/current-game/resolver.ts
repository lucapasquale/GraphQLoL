import { GqlCtx } from '../../../types'
import { Summoner } from '../../loaders/summoner'
import { CurrentGame } from '../../loaders/current-game'

export const resolver = {
  Summoner: {
    currentGame: (obj: Summoner, __: any, ctx: GqlCtx) => {
      return ctx.loaders.currentGame.load(obj.id)
    },
  },

  CurrentGame: {
    gameStartTime: (obj: CurrentGame) => new Date(obj.gameStartTime),
  },
}
