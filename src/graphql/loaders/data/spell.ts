import { AxiosInstance } from 'axios'

export type SummonerSpell = {
  id: string
  key: string
  name: string
  description: string
}

type SummonerSpellsResponse = {
  version: string
  data: {
    [name: string]: SummonerSpell
  }
}

export default async function(api: AxiosInstance) {
  const response = await api.get<SummonerSpellsResponse>('/summoner.json')
  const spells = response.data.data

  return async (keys: number[]) => {
    return keys.map(key => {
      const spell = Object.keys(spells).find(name => {
        return spells[name].key === key.toString()
      })

      return spell && spells[spell]
    })
  }
}
