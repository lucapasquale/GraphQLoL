import { Context } from 'koa'
import { graphqlKoa } from 'apollo-server-koa'

export default async function(ctx: Context, next: () => void) {
  return graphqlKoa({
    schema: ctx.graphQLSchema,
    context: {
      apiLoaders: ctx.apiLoaders,
      dataLoaders: ctx.dataLoaders,
    },
  })(ctx, next)
}
