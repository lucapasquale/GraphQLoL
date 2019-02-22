import { GqlCtx } from '../../../types'

export const resolver = {
  Query: {
    champion: (_: any, params: { key: number }, ctx: GqlCtx) => {
      return ctx.dataLoaders.champion.load(params.key)
    },
  },
}
