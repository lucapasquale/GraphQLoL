import axios from 'axios'

export type Champion = {
  id: string
  key: number
  name: string
  title: string
  version: string
}

let championsData = null

export default function() {
  return async (keys: number[]) => {
    if (!championsData) {
      await getChampionsData()
    }

    return keys.map(key => {
      const champion = Object.keys(championsData).find(name => {
        return championsData[name].key === key.toString()
      })

      return champion && (championsData[champion] as Champion)
    })
  }
}

async function getChampionsData() {
  const response = await axios.get(
    'http://ddragon.leagueoflegends.com/cdn/9.3.1/data/en_US/champion.json'
  )

  championsData = response.data.data
}
