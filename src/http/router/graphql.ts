import { Context } from 'koa'
import { graphqlKoa } from 'apollo-server-koa'

import makeLoaders from '../../graphql/loaders'

export default async function(ctx: Context, next: () => void) {
  const loaders = makeLoaders()

  return graphqlKoa({
    schema: ctx.graphQLSchema,
    context: {
      loaders,
    },
  })(ctx, next)
}
