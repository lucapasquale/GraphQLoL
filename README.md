# GraphQLoL

A GraphQL wrapper for the League of Legends API.

#### Installation and usage

- Install dependencies (`npm install | yarn install | pnpm install`)
- Start the application with `npm start`
- Make a request to `/graphql` passing your [Riot API key](https://developer.riotgames.com/) in the "X-Riot-Token" header

#### GraphQL queries

- Summoner

  - Past matches
  - Current game
  - Champion mastery
  - Ranked information

- Match
  - Players divided by teams
  - Getting all summoners info

#### Why?

So if you can turn 22 queries into one! For example, getting your current game players level and their rank:

- Before

  - `/lol/summoner/v4/summoners/by-name/{summonerName}` to get your summonerId
  - `/lol/spectator/v4/active-games/by-summoner/{summonerId}` for current match
  - **10x** `/lol/summoner/v4/summoners/{summonerId}` to get the level of the match players technically 9 because you already queried your own summoner)
  - **10x** `/lol/league/v4/positions/by-summoner/{summonerId}` to get their current rank position

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
- [ ] Better caching (redis?)
- [x] Receiving api key from request headers instead of storing on server
