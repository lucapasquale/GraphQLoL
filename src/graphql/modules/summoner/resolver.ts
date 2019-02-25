import { GqlCtx } from '../../../types'

export const resolver = {
  Query: {
    summoner: (_: any, params: { name: string }, ctx: GqlCtx) => {
      const name = encodeURI(params.name)
      return ctx.apiLoaders.summoner.load({ name })
    },
  },
}
