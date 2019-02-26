# GraphQLoL

A GraphQL wrapper for the League of Legends API.

#### API endpoints

- Summoner

  - Ranked information
  - Past matches
  - Current game
  - Champion mastery

- Match

  - Players divided by teams
  - Getting all summoners info

#### Why?

So if you can turn 22 queries into one! For example, getting your current game players level and their rank:

- Before

  - `/lol/summoner/v4/summoners/by-name/{summonerName}` to get your summonerId
  - `/lol/spectator/v4/active-games/by-summoner/{summonerId}` for current match
  - 10x `/lol/summoner/v4/summoners/{summonerId}` to get the match players level (well, 9 actually because you already queryed your own summoner)
  - 10x `/lol/league/v4/positions/by-summoner/{summonerId}` to get their current rank position

- After

```graphql
{
  summoner(name: "Luca") {
    id
    currentGame {
      teams {
        participants {
          summoner {
            name
            summonerLevel
            leagues {
              solo {
                tier
                rank
              }
              flex {
                tier
                rank
              }
            }
          }
        }
      }
    }
  }
}
```

#### TODO

- [ ] All ranked endpoints
- [ ] Region-agnostic
- [ ] Receiving api key from request headers instead of direclty on server
- [ ] Better caching (redis?)
