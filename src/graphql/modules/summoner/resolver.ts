import { GqlCtx } from '../../../types'

export const resolver = {
  Query: {
    summoner: (_: any, params: { name: string }, ctx: GqlCtx) => {
      return ctx.apiLoaders.summoner.load({ name: params.name })
    },
  },
}
