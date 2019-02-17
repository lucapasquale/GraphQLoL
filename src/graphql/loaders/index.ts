import * as Dataloader from 'dataloader'

import * as matchLoader from './match'
import * as summonerLoader from './summoner'

// const request = axios.create({
//   baseURL: 'https://br1.api.riotgames.com/lol',
//   headers: {
//     'X-Riot-Token': config.LOL_KEY,
//   },
// })

export default function() {
  return {
    summoner: new Dataloader(summonerLoader.summoner),

    match: new Dataloader(matchLoader.match),
    accountMatches: matchLoader.accountMatches,
  }
}
