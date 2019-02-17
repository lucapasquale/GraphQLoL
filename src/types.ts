import loaders from './graphql/loaders'

type GraphqlContext = {
  loaders: ReturnType<typeof loaders>
}

export type GqlCtx = GraphqlContext
