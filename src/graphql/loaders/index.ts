import axios from 'axios'
import * as Dataloader from 'dataloader'
import config from '../../config'

import matchLoader from './match'
import championLoader from './champion'
import summonerLoader from './summoner'
import summonerMatchLoader from './summoner-match'

const request = axios.create({
  baseURL: 'https://br1.api.riotgames.com/lol',
  headers: {
    'X-Riot-Token': config.LOL_KEY,
  },
})

export default function() {
  return {
    summoner: new Dataloader(summonerLoader(request)),
    champion: new Dataloader(championLoader()),

    match: new Dataloader(matchLoader(request)),
    summonerMatch: new Dataloader(summonerMatchLoader(request)),
  }
}
