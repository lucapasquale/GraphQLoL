import * as R from 'ramda'
import { GqlCtx } from '../../../types'
import { parseSeasonId, parseQueueId } from '../helpers'

import {
  Match,
  MatchTeam,
  MatchTeamBan,
  Participant,
  ParticipantIdentity,
} from '../../loaders/api/match'

export const resolver = {
  Query: {
    match: (_: any, params: { matchId: number }, ctx: GqlCtx) => {
      return ctx.apiLoaders.match.load(params.matchId)
    },
  },

  Match: {
    gameCreation: (obj: Match) => new Date(obj.gameCreation),
    queue: (obj: Match) => parseQueueId(obj.queueId),
    season: (obj: Match) => parseSeasonId(obj.seasonId),
    teams: (obj: Match) => {
      const participants = obj.participants.map(participant => {
        const identity = obj.participantIdentities.find(
          R.propEq('participantId', participant.participantId)
        )

        return {
          ...participant,
          ...identity,
        }
      })

      return obj.teams.map(team => ({ ...team, participants }))
    },
  },

  MatchTeam: {
    participants: (obj: MatchTeam & { participants: Participant[] }) => {
      return obj.participants.filter(R.propEq('teamId', obj.teamId))
    },
  },

  MatchTeamBan: {
    champion: (obj: MatchTeamBan, _: any, ctx: GqlCtx) => {
      return ctx.dataLoaders.champion.load(obj.championId)
    },
  },

  MatchParticipant: {
    spell1: (obj: Participant, _: any, ctx: GqlCtx) => {
      return ctx.dataLoaders.spell.load(obj.spell1Id)
    },
    spell2: (obj: Participant, _: any, ctx: GqlCtx) => {
      return ctx.dataLoaders.spell.load(obj.spell2Id)
    },

    champion: (obj: Participant, _: any, ctx: GqlCtx) => {
      return ctx.dataLoaders.champion.load(obj.championId)
    },
    summoner: (obj: Participant & ParticipantIdentity, _: any, ctx: GqlCtx) => {
      const accountId = obj.player.currentAccountId
      return ctx.apiLoaders.summoner.load({ accountId })
    },
  },
}
