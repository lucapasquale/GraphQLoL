import * as R from 'ramda'
import { GqlCtx } from '../../../types'

import { Summoner } from '../../loaders/api/summoner'
import {
  CurrentGame,
  CurrentGameParticipant,
  CurrentGameBannedChampion,
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

    teams: (obj: CurrentGame) => {
      const teamParticipants = R.groupBy(R.prop('teamId'), obj.participants)
      const teamBans = R.groupBy(R.prop('teamId'), obj.bannedChampions)

      return Object.keys(teamParticipants).map(teamId => ({
        teamId,
        participants: teamParticipants[teamId],
        bans: teamBans[teamId],
      }))
    },
  },

  CurrentGameBan: {
    champion: (obj: CurrentGameBannedChampion, _: any, ctx: GqlCtx) => {
      return ctx.dataLoaders.champion.load(obj.championId)
    },
  },

  CurrentGameParticipant: {
    summoner: (obj: CurrentGameParticipant, _: any, ctx: GqlCtx) => {
      const name = encodeURI(obj.summonerName)
      return ctx.apiLoaders.summoner.load({ name })
    },

    champion: (obj: CurrentGameParticipant, _: any, ctx: GqlCtx) => {
      return ctx.dataLoaders.champion.load(obj.championId)
    },

    spell1: (obj: CurrentGameParticipant, _: any, ctx: GqlCtx) => {
      return ctx.dataLoaders.spell.load(obj.spell1Id)
    },
    spell2: (obj: CurrentGameParticipant, _: any, ctx: GqlCtx) => {
      return ctx.dataLoaders.spell.load(obj.spell2Id)
    },
  },
}
