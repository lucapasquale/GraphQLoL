import { AxiosInstance } from 'axios'
import * as Bluebird from 'bluebird'

export type Match = {
  gameId: number
  platformId: string
  gameCreation: string
  gameDuration: number
  queueId: number
  mapId: number
  seasonId: number
  gameVersion: string
  gameMode: string
  gameType: string
  teams: MatchTeam[]
  participants: Participant[]
  participantIdentities: ParticipantIdentity[]
}

export type MatchTeam = {
  teamId: number
  win: 'Win' | 'Fail'
  bans: MatchTeamBan[]
}
export type MatchTeamBan = {
  championId: number
  pickTurn: number
}

export type Participant = {
  participantId: number
  teamId: number
  championId: number
  spell1Id: number
  spell2Id: number
  highestAchievedSeasonTier: string
}
export type ParticipantIdentity = {
  participantId: number
  player: {
    summonerName: string
    summonerId: string
    currentAccountId: string
  }
}

const cache = {}

export default function(api: AxiosInstance) {
  return async (matchIds: number[]) => {
    return Bluebird.map<number, Match>(matchIds, async matchId => {
      if (cache[matchId]) {
        return cache[matchId]
      }

      const { data } = await api.get(`match/v4/matches/${matchId}`)

      cache[matchId] = data
      return data
    })
  }
}
