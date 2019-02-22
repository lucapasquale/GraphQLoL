import { AxiosInstance } from 'axios'
import * as Bluebird from 'bluebird'

export type CurrentGame = {
  gameId: number
  gameStartTime: number
  platformId: string
  gameMode: string
  mapId: number
  gameType: string
  gameLength: number
  gameQueueConfigId: number
  participants: CurrentGameParticipant[]
  observers: {
    encryptionKey: string
  }
}

export type BannedChampion = {
  pickTurn: number
  championId: number
  teamId: number
}

export type CurrentGameParticipant = {
  bot: boolean
  teamId: number
  summonerId: string
  summonerName: string
  profileIconId: number
  championId: number
  spell2Id: number
  spell1Id: number
  perks: any
  gameCustomizationObjects: any[]
}

export default function(api: AxiosInstance) {
  return async (keys: string[]) => {
    return Bluebird.map<string, CurrentGame>(keys, async summonerId => {
      try {
        const { data } = await api.get(
          `spectator/v4/active-games/by-summoner/${summonerId}`
        )

        return data
      } catch (err) {
        return null
      }
    })
  }
}
