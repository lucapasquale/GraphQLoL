import { GqlCtx } from '../../../types'
import { Summoner } from '../../loaders/summoner'

import {
  Match,
  MatchTeam,
  MatchTeamBan,
  Participant,
  ParticipantIdentity,
} from '../../loaders/match'
import { SummonerMatch } from '../../loaders/summoner-match'

export const resolver = {
  Query: {
    match,
  },

  Summoner: {
    matches,
  },

  Match: {
    gameCreation: (obj: Match) => new Date(obj.gameCreation),

    participants: (obj: Match) => {
      return obj.participants.map(participant => {
        const identity = obj.participantIdentities.find(
          pi => pi.participantId === participant.participantId
        )

        return {
          ...participant,
          ...identity,
        }
      })
    },
  },

  MatchTeamBan: {
    champion: (obj: MatchTeamBan, _: any, ctx: GqlCtx) => {
      return ctx.loaders.champion.load(obj.championId)
    },
  },

  Participant: {
    champion: (obj: Participant, _: any, ctx: GqlCtx) => {
      return ctx.loaders.champion.load(obj.championId)
    },

    summoner: (obj: Participant & ParticipantIdentity, _: any, ctx: GqlCtx) => {
      const accountId = obj.player.currentAccountId
      return ctx.loaders.summoner.load({ accountId })
    },
  },

  SummonerMatch: {
    timestamp: (obj: SummonerMatch) => new Date(obj.timestamp),

    champion: (obj: SummonerMatch, _: any, ctx: GqlCtx) => {
      return ctx.loaders.champion.load(obj.champion)
    },

    season: (obj: SummonerMatch) => ({
      id: obj.season,
      name: parseSeason(obj.season),
    }),

    match: (obj: SummonerMatch, _: any, ctx: GqlCtx) => {
      return ctx.loaders.match.load(obj.gameId)
    },
  },
}

function parseSeason(seasonNumber: number) {
  const seasonNames = {
    0: 'PRESEASON 3',
    1: 'SEASON 3',
    2: 'PRESEASON 2014',
    3: 'SEASON 2014',
    4: 'PRESEASON 2015',
    5: 'SEASON 2015',
    6: 'PRESEASON 2016',
    7: 'SEASON 2016',
    8: 'PRESEASON 2017',
    9: 'SEASON 2017',
    10: 'PRESEASON 2018',
    11: 'SEASON 2018',
    12: 'PRESEASON 2019',
    13: 'SEASON 2019',
  }

  return seasonNames[seasonNumber] || null
}

async function match(_: any, params: { matchId: number }, ctx: GqlCtx) {
  return ctx.loaders.match.load(params.matchId)
}

type SummonerMatchesParams = {
  offset: number
  limit: number
  filter: {
    season: number
  }
}
async function matches(
  obj: Summoner,
  params: SummonerMatchesParams,
  ctx: GqlCtx
) {
  const accountMatches = await ctx.loaders.summonerMatch.load({
    accountId: obj.accountId,
    offset: params.offset,
    limit: params.limit,
    ...params.filter,
  })

  return {
    totalCount: accountMatches.totalGames,
    nodes: accountMatches.matches,
  }
}
