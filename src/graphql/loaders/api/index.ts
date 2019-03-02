import axios from 'axios'
import * as Dataloader from 'dataloader'

import matchLoader from './match'
import leagueLoader from './league'
import summonerLoader from './summoner'
import currentGameLoader from './current-game'
import summonerMatchLoader from './summoner-match'
import championMasteryLoader from './champion-mastery'

export default function(apiKey: string) {
  const request = axios.create({
    baseURL: 'https://br1.api.riotgames.com/lol',
    headers: { 'X-Riot-Token': apiKey },
  })

  return {
    match: new Dataloader(matchLoader(request)),
    league: new Dataloader(leagueLoader(request)),
    summoner: new Dataloader(summonerLoader(request)),
    currentGame: new Dataloader(currentGameLoader(request)),
    summonerMatch: new Dataloader(summonerMatchLoader(request)),
    championMastery: new Dataloader(championMasteryLoader(request)),
  }
}
