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

  MatchTeam: {
    winner: (obj: MatchTeam) => obj.win === 'Win',
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
    champion: (obj: SummonerMatch, _: any, ctx: GqlCtx) => {
      return ctx.loaders.champion.load(obj.champion)
    },

    season: (obj: SummonerMatch) => ({
      id: obj.season,
      name: parseSeason(obj.season),
    }),
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

type SummonerMatchesParams = {
  filter: {
    beginIndex: number
    endIndex: number
  }
}
async function matches(
  obj: Summoner,
  { filter }: SummonerMatchesParams,
  ctx: GqlCtx
) {
  const accountMatches = await ctx.loaders.summonerMatch.load({
    accountId: obj.accountId,
    ...filter,
  })

  return {
    totalCount: accountMatches.totalGames,
    nodes: accountMatches.matches,
  }
}

async function match(_: any, params: { matchId: string }, ctx: GqlCtx) {
  return ctx.loaders.match.load(params.matchId)
}
