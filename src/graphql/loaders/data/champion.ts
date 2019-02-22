import { AxiosInstance } from 'axios'

export type Champion = {
  id: string
  key: string
  name: string
  title: string
  version: string
}

type ChampionsResponse = {
  version: string
  data: {
    [name: string]: Champion
  }
}

export default async function(api: AxiosInstance) {
  const response = await api.get<ChampionsResponse>('/champion.json')
  const champions = response.data.data

  return async (keys: number[]) => {
    return keys.map(key => {
      const champion = Object.keys(champions).find(name => {
        return champions[name].key === key.toString()
      })

      return champion && (champions[champion] as Champion)
    })
  }
}
