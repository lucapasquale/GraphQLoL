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
}
export type ParticipantIdentity = {
  participantId: number
  player: {
    summonerName: string
    summonerId: string
    currentAccountId: string
  }
}

export default function(api: AxiosInstance) {
  return async (matchIds: string[]) => {
    return Bluebird.map<string, Match>(matchIds, async matchId => {
      const { data } = await api.get(`match/v4/matches/${matchId}`)

      return data
    })
  }
}
