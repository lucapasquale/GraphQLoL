import { Context, Request } from 'koa'
import { graphqlKoa } from 'apollo-server-koa'

import graphQLSchema from '../../graphql'
import makeLoaders from '../../graphql/loaders'

export default async function(ctx: Context, next: () => void) {
  const riotKey = getRiotKey(ctx.request)

  const { apiLoaders, dataLoaders } = await makeLoaders(riotKey)

  return graphqlKoa({
    schema: graphQLSchema,
    context: {
      apiLoaders,
      dataLoaders,
    },
  })(ctx, next)
}

function getRiotKey(request: Request) {
  const riotKey = request.headers['x-riot-token']

  if (!riotKey) {
    throw new Error(
      'Please inform the Riot API key on the "X-Riot-Token" header'
    )
  }

  return riotKey
}
