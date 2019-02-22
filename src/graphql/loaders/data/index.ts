import axios from 'axios'
import * as Dataloader from 'dataloader'

import championsLoader from './champion'

export default async function() {
  const version = await getCurrentVersion()

  const request = axios.create({
    baseURL: `http://ddragon.leagueoflegends.com/cdn/${version}/data/en_US`,
  })

  return {
    champion: new Dataloader(await championsLoader(request)),
  }
}

async function getCurrentVersion() {
  const { data } = await axios.get<string[]>(
    'https://ddragon.leagueoflegends.com/api/versions.json'
  )

  return data[0]
}
