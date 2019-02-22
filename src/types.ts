import loaders from './graphql/loaders'
// import loaders from './graphql/loaders/api'
// import staticData from './graphql/loaders/data'

type ThenArg<T> = T extends (...args: any[]) => Promise<infer U> ? U : T

type GraphqlContext = ThenArg<typeof loaders> & {}

export type GqlCtx = GraphqlContext
