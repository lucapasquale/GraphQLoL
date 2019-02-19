import axios from 'axios'
import * as Dataloader from 'dataloader'
import config from '../../config'

import matchLoader from './match'
import championLoader from './champion'
import summonerLoader from './summoner'
import currentGameLoader from './current-game'
import summonerMatchLoader from './summoner-match'

const request = axios.create({
  baseURL: 'https://br1.api.riotgames.com/lol',
  headers: {
    'X-Riot-Token': config.LOL_KEY,
  },
})

export default function() {
  return {
    match: new Dataloader(matchLoader(request)),
    champion: new Dataloader(championLoader()),
    summoner: new Dataloader(summonerLoader(request)),
    currentGame: new Dataloader(currentGameLoader(request)),
    summonerMatch: new Dataloader(summonerMatchLoader(request)),
  }
}
