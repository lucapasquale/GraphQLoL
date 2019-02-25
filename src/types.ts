import loaders from './graphql/loaders'

type ThenArg<T> = T extends (...args: any[]) => Promise<infer U> ? U : T

export type GqlCtx = ThenArg<typeof loaders> & {}
